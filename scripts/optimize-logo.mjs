import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const logoPath = path.join(projectRoot, 'public', 'assets', 'logo', 'logo.png');
const originalPath = path.join(projectRoot, '.image-originals', 'logo.png');
const maximumBytes = 120 * 1024;
const currentStats = await stat(logoPath);
const currentMetadata = await sharp(logoPath).metadata();
const currentPixels = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let hasTransparentPixels = false;
for (let alphaIndex = 3; alphaIndex < currentPixels.data.length; alphaIndex += currentPixels.info.channels) {
  if (currentPixels.data[alphaIndex] < 255) {
    hasTransparentPixels = true;
    break;
  }
}

if (currentStats.size <= maximumBytes && currentMetadata.width <= 800 && currentMetadata.hasAlpha && hasTransparentPixels) {
  console.log('ya optimizado');
} else {
  const optimizedBuffer = await sharp(logoPath)
    .resize({ width: 800, withoutEnlargement: true })
    .png({ palette: true, quality: 90, effort: 10 })
    .toBuffer();
  const optimizedMetadata = await sharp(optimizedBuffer).metadata();

  if (optimizedBuffer.length > maximumBytes) {
    throw new Error(`El logo optimizado pesa ${(optimizedBuffer.length / 1024).toFixed(1)} KB; el máximo es 120 KB.`);
  }
  if (currentMetadata.hasAlpha && !optimizedMetadata.hasAlpha) {
    throw new Error('La optimización eliminó la transparencia del logo.');
  }
  if (hasTransparentPixels) {
    const optimizedPixels = await sharp(optimizedBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let optimizedHasTransparency = false;
    for (let alphaIndex = 3; alphaIndex < optimizedPixels.data.length; alphaIndex += optimizedPixels.info.channels) {
      if (optimizedPixels.data[alphaIndex] < 255) {
        optimizedHasTransparency = true;
        break;
      }
    }
    if (!optimizedHasTransparency) throw new Error('La optimización eliminó la transparencia del logo.');
  }

  await mkdir(path.dirname(originalPath), { recursive: true });
  try {
    await copyFile(logoPath, originalPath, constants.COPYFILE_EXCL);
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
  await writeFile(logoPath, optimizedBuffer);
  console.log(`Logo optimizado: ${(optimizedBuffer.length / 1024).toFixed(1)} KB`);
}
