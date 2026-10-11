import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { findLogoSource, generateIconBuffers } from './make-icons.mjs';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const logoPath = await findLogoSource();
if (!logoPath) throw new Error('No se encontró el logo para verificar los íconos.');

const outputDirectory = path.dirname(logoPath);
const expectedIcons = await generateIconBuffers(logoPath);
let hasOutdatedIcons = false;

for (const [fileName, expectedBuffer] of expectedIcons) {
  const iconPath = path.join(outputDirectory, fileName);
  let actualBuffer;
  try {
    actualBuffer = await readFile(iconPath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (!actualBuffer || !actualBuffer.equals(expectedBuffer)) {
    console.error(`Ícono faltante o desactualizado: ${path.relative(projectRoot, iconPath)}`);
    hasOutdatedIcons = true;
  }
}

const appleTouchIconPath = path.join(outputDirectory, 'apple-touch-icon.png');
try {
  const metadata = await sharp(appleTouchIconPath).metadata();
  if (metadata.width !== 180 || metadata.height !== 180) {
    console.error(`apple-touch-icon.png debe medir 180x180 px (actual: ${metadata.width}x${metadata.height}).`);
    hasOutdatedIcons = true;
  }
  const { data, info } = await sharp(appleTouchIconPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let alphaIndex = 3; alphaIndex < data.length; alphaIndex += info.channels) {
    if (data[alphaIndex] !== 255) {
      console.error('apple-touch-icon.png debe ser opaco.');
      hasOutdatedIcons = true;
      break;
    }
  }

  // Validaciones de margen y tamaño del logo
  const width = info.width;
  const height = info.height;
  const marginSize = Math.round(width * 0.02); // 2% del borde exterior

  let minX = width, maxX = 0, minY = height, maxY = 0;
  const bgR = data[0], bgG = data[1], bgB = data[2];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * info.channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];

      if (r !== bgR || g !== bgG || b !== bgB) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Verificar que no toque el margen del 2%
  if (minX < marginSize || maxX >= width - marginSize || minY < marginSize || maxY >= height - marginSize) {
    console.error('apple-touch-icon.png: el logo está cortando o tocando el borde exterior (debe dejar un margen mínimo del 2%).');
    hasOutdatedIcons = true;
  }

  // Verificar tamaño ocupado (70% - 95% del lado mayor)
  const contentWidth = maxX - minX + 1;
  const contentHeight = maxY - minY + 1;
  const maxDimension = Math.max(contentWidth, contentHeight);
  const fillRatio = maxDimension / width;

  if (fillRatio < 0.70 || fillRatio > 0.95) {
    console.error(`apple-touch-icon.png: el logo ocupa ${Math.round(fillRatio * 100)}% del lienzo; debe estar entre 70% y 95%.`);
    hasOutdatedIcons = true;
  }

} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  hasOutdatedIcons = true;
}

if (hasOutdatedIcons) {
  console.error('íconos desactualizados: ejecutá npm run make:icons');
  process.exitCode = 1;
} else {
  console.log('✅ Íconos actualizados; apple-touch-icon.png es opaco, mide 180x180 px, con margen válido y tamaño correcto.');
}
