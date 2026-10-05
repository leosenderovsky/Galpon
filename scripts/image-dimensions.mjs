import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export function isDimensionImage(filePath) {
  return imageExtensions.has(path.extname(filePath).toLowerCase());
}

export async function listDimensionImages(directory) {
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
      files.push(...await listDimensionImages(fullPath));
    } else if (entry.isFile() && isDimensionImage(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function getImageDimensions(projectRoot) {
  const assetsRoot = path.join(projectRoot, 'public', 'assets');
  const files = (await listDimensionImages(assetsRoot)).sort();
  const entries = await Promise.all(files.map(async (filePath) => {
    const metadata = await sharp(filePath).metadata();
    if (!metadata.width || !metadata.height) {
      throw new Error(`No se pudieron leer las dimensiones de ${filePath}`);
    }
    const assetPath = path.relative(assetsRoot, filePath).replaceAll(path.sep, '/');
    return [`/assets/${assetPath}`, { width: metadata.width, height: metadata.height }];
  }));

  return Object.fromEntries(entries);
}

export async function imageDimensionsAreCurrent(projectRoot, actualDimensions) {
  const jsonPath = path.join(projectRoot, 'src', 'generated', 'imageDimensions.json');
  let generatedDimensions;
  try {
    generatedDimensions = JSON.parse(await readFile(jsonPath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) return false;
    throw error;
  }

  return JSON.stringify(generatedDimensions) === JSON.stringify(actualDimensions);
}
