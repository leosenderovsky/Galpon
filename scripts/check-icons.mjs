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
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  hasOutdatedIcons = true;
}

if (hasOutdatedIcons) {
  console.error('íconos desactualizados: ejecutá npm run make:icons');
  process.exitCode = 1;
} else {
  console.log('Íconos actualizados; apple-touch-icon.png es opaco y mide 180x180 px.');
}
