import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourcePath = path.join(projectRoot, 'public', 'assets', 'hero', 'hero-1.jpg');
const outputPath = path.join(projectRoot, 'public', 'assets', 'misc', 'og-image.jpg');
const maximumBytes = 200 * 1024;
let imageBuffer;

for (const quality of [85, 80, 75, 70, 65, 60]) {
  imageBuffer = await sharp(sourcePath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  if (imageBuffer.length <= maximumBytes) break;
}

if (imageBuffer.length > maximumBytes) {
  throw new Error(`La imagen OG pesa ${(imageBuffer.length / 1024).toFixed(1)} KB; el máximo es 200 KB.`);
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, imageBuffer);
console.log(`Generada public/assets/misc/og-image.jpg: ${(imageBuffer.length / 1024).toFixed(1)} KB`);
