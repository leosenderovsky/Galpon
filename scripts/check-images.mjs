import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { imageDimensionsAreCurrent, isDimensionImage } from './image-dimensions.mjs';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const assetsRoot = path.join(projectRoot, 'public', 'assets');
const strict = process.argv.includes('--strict');
const imageExtensions = new Set(['.avif', '.bmp', '.gif', '.jpeg', '.jpg', '.png', '.tif', '.tiff', '.webp']);
const expectedProductRatio = 1;
const ratioTolerance = 0.01;

async function listImages(directory) {
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
      files.push(...await listImages(fullPath));
    } else if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function classifyImage(filePath) {
  const assetPath = path.relative(assetsRoot, filePath).replaceAll(path.sep, '/');
  if (assetPath === 'hero/hero-1.jpg' || assetPath === 'hero/como-comprar-1.jpg') {
    return { minimumSize: 1600 };
  }
  if (assetPath.startsWith('products/')) return { minimumSize: 900, checkProductRatio: true };
  return null;
}

const images = await listImages(assetsRoot);
const records = [];
let hasFindings = false;

console.log('Informe de imágenes (ancho y alto mínimos: hero/poster 1600 px; productos 900 px; ratio tarjeta producto 1:1):');

for (const filePath of images.sort()) {
  const relativePath = path.relative(projectRoot, filePath).replaceAll(path.sep, '/');
  const imageBytes = await readFile(filePath);
  const fileStats = await stat(filePath);
  const metadata = await sharp(imageBytes).metadata();
  const category = classifyImage(filePath);
  const width = metadata.width;
  const height = metadata.height;
  const ratio = width / height;
  const flags = [];

  if (category && width < category.minimumSize) {
    flags.push('BAJA RESOLUCIÓN');
  }
  if (category?.checkProductRatio && Math.abs(ratio - expectedProductRatio) / expectedProductRatio > ratioTolerance) {
    flags.push('RATIO DISTINTO');
  }

  records.push({
    filePath,
    relativePath,
    bytes: fileStats.size,
    hash: createHash('md5').update(imageBytes).digest('hex'),
    width,
    height,
    flags
  });

  const resolution = `${width}x${height}`;
  const size = `${(fileStats.size / 1024).toFixed(1)} KB`;
  const reportFlags = flags.length > 0 ? flags.join(', ') : 'OK';
  if (flags.length > 0) hasFindings = true;
  console.log(`${relativePath} | ${resolution} | ${size} | ${reportFlags}`);
}

const dimensionEntries = records
  .filter((record) => isDimensionImage(record.filePath))
  .map((record) => [
    `/assets/${path.relative(assetsRoot, record.filePath).replaceAll(path.sep, '/')}`,
    { width: record.width, height: record.height }
  ])
  .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
const dimensionsCurrent = await imageDimensionsAreCurrent(projectRoot, Object.fromEntries(dimensionEntries));
if (!dimensionsCurrent) {
  const message = 'imageDimensions.json no coincide con las imágenes reales; ejecutá npm run generate:image-dimensions';
  if (strict) console.error(`ERROR ${message}`);
  else console.warn(`ADVERTENCIA ${message}`);
  hasFindings = true;
}

const duplicateGroups = new Map();
for (const record of records) {
  const group = duplicateGroups.get(record.hash) ?? [];
  group.push(record);
  duplicateGroups.set(record.hash, group);
}

const duplicateSets = [...duplicateGroups.values()].filter((group) => group.length > 1);
console.log('\nDuplicados MD5:');
if (duplicateSets.length === 0) {
  console.log('Ninguno');
} else {
  hasFindings = true;
  for (const group of duplicateSets) {
    for (const record of group) {
      if (!record.flags.includes('DUPLICADA')) record.flags.push('DUPLICADA');
      console.log(`${record.relativePath} | DUPLICADA | md5 ${record.hash}`);
    }
  }
}

console.log('\nImágenes con observaciones:');
const flaggedImages = records.filter((record) => record.flags.length > 0);
if (flaggedImages.length === 0) {
  console.log('Ninguna');
} else {
  for (const record of flaggedImages) {
    console.log(`${record.relativePath}: ${record.flags.join(', ')}`);
  }
}

if (strict && hasFindings) process.exitCode = 1;
