import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicRoot = path.resolve('public');
const logoCandidates = [
  path.join(publicRoot, 'assets', 'logo', 'logo.png'),
  path.join(publicRoot, 'assets', 'logo.png')
];

let sourcePath;
for (const candidate of logoCandidates) {
  try {
    if ((await stat(candidate)).isFile()) {
      sourcePath = candidate;
      break;
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

if (!sourcePath) {
  console.warn('No se encontró el logo en public/assets/logo/logo.png ni public/assets/logo.png; no se generaron iconos.');
} else {
  const outputDirectory = path.dirname(sourcePath);
  await mkdir(outputDirectory, { recursive: true });
  for (const [fileName, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
    const logo = await sharp(sourcePath)
      .resize(size - 4, size - 4, { fit: 'contain', background: '#ffffff' })
      .png()
      .toBuffer();
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: '#ffffff'
      }
    })
      .composite([{ input: logo, gravity: 'centre' }])
    .flatten({ background: '#ffffff' })
    .removeAlpha()
    .png()
    .toFile(path.join(outputDirectory, fileName));
    console.log(`Generado ${path.relative(process.cwd(), path.join(outputDirectory, fileName))}`);
  }
}
