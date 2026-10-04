import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceRoot = path.join(projectRoot, 'src');
const assetsRoot = path.join(projectRoot, 'public', 'assets');
const brandConfigPath = path.join(sourceRoot, 'brand.config.ts');
const strict = process.argv.includes('--strict');
const allowedPlaceholders = new Set(['/assets/video/como-comprar.mp4']);
const sourceExtensions = /\.(?:[cm]?[jt]sx?|vue|svelte|html)$/i;
const assetLiteral = /(['"`])(\/assets\/[^'"`\s$]+)\1/g;

async function listFiles(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

const sourceFiles = (await listFiles(sourceRoot)).filter((file) => sourceExtensions.test(file));
const referencedAssets = new Set();
for (const sourceFile of sourceFiles) {
  const content = await readFile(sourceFile, 'utf8');
  for (const match of content.matchAll(assetLiteral)) {
    referencedAssets.add(match[2]);
  }
}

const brandConfig = await readFile(brandConfigPath, 'utf8');
const prototypeBrandingMatch = brandConfig.match(/assetsWithPrototypeBranding:\s*\[([\s\S]*?)\]/);
if (!prototypeBrandingMatch) {
  throw new Error('No se encontró BRAND.assetsWithPrototypeBranding en src/brand.config.ts');
}
const prototypeBrandingAssets = new Set(
  [...prototypeBrandingMatch[1].matchAll(/(['"])(\/assets\/[^'"]+)\1/g)].map((match) => match[2])
);

const referencedFiles = new Set();
const missingAssets = [];
const placeholders = [];

console.log('Assets referenciados:');
for (const assetPath of [...referencedAssets].sort()) {
  const relativePath = assetPath.slice('/assets/'.length);
  const resolvedPath = path.resolve(assetsRoot, relativePath);
  if (!resolvedPath.startsWith(`${assetsRoot}${path.sep}`)) {
    missingAssets.push(assetPath);
    console.error(`FALTANTE ${assetPath} (ruta fuera de public/assets)`);
    continue;
  }

  try {
    const fileInfo = await stat(resolvedPath);
    if (!fileInfo.isFile()) throw new Error('no es un archivo');
    referencedFiles.add(resolvedPath);
    console.log(`OK ${assetPath}`);
  } catch (error) {
    if (error.code !== 'ENOENT' && error.message !== 'no es un archivo') throw error;
    if (allowedPlaceholders.has(assetPath)) {
      placeholders.push(assetPath);
      console.warn(`PLACEHOLDER ${assetPath}`);
    } else {
      missingAssets.push(assetPath);
      console.error(`FALTANTE ${assetPath}`);
    }
  }
}

const assetFiles = (await listFiles(assetsRoot)).filter((file) => !path.basename(file).startsWith('.'));
const unreferencedFiles = assetFiles.filter((file) => !referencedFiles.has(file));
console.log('\nArchivos sin referencia:');
if (unreferencedFiles.length === 0) {
  console.log('Ninguno');
} else {
  for (const file of unreferencedFiles.sort()) {
    console.log(path.relative(projectRoot, file).replaceAll(path.sep, '/'));
  }
}

const heavyFiles = [];
for (const file of assetFiles) {
  const size = (await stat(file)).size;
  const extension = path.extname(file).toLowerCase();
  const isHeavyImage = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'].includes(extension) && size > 300 * 1024;
  const isHeavyVideo = ['.mp4', '.mov', '.webm'].includes(extension) && size > 15 * 1024 * 1024;
  if (isHeavyImage || isHeavyVideo) {
    heavyFiles.push(`${path.relative(projectRoot, file).replaceAll(path.sep, '/')} (${(size / 1024 / 1024).toFixed(2)} MB)`);
  }
}

console.log('\nArchivos pesados:');
if (heavyFiles.length === 0) {
  console.log('Ninguno');
} else {
  for (const file of heavyFiles) console.warn(file);
}

console.log('\nMARCA DEL PROTOTIPO:');
if (prototypeBrandingAssets.size === 0) {
  console.log('Ninguna');
} else {
  for (const assetPath of [...prototypeBrandingAssets].sort()) {
    const message = `${assetPath} — regenerar sin la marca ficticia o con la del cliente`;
    if (strict) {
      console.error(`ERROR ${message}`);
    } else {
      console.warn(`ADVERTENCIA ${message}`);
    }
  }
}

if (
  missingAssets.length > 0
  || (strict && (placeholders.length > 0 || prototypeBrandingAssets.size > 0))
) {
  process.exitCode = 1;
}
