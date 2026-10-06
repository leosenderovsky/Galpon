import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicRoot = path.join(projectRoot, 'public');
const logoCandidates = [
  path.join(publicRoot, 'assets', 'logo', 'logo.png'),
  path.join(publicRoot, 'assets', 'logo.png')
];

export async function findLogoSource() {
  for (const candidate of logoCandidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  return undefined;
}

export async function generateIconBuffers(sourcePath) {
  const buffers = new Map();
  for (const [fileName, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
    const logo = await sharp(sourcePath)
      .resize(size - 4, size - 4, { fit: 'contain', background: '#ffffff' })
      .png()
      .toBuffer();
    const buffer = await sharp({
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
      .toBuffer();
    buffers.set(fileName, buffer);
  }
  return buffers;
}

async function makeIcons() {
  const sourcePath = await findLogoSource();
  if (!sourcePath) {
    console.warn('No se encontró el logo en public/assets/logo/logo.png ni public/assets/logo.png; no se generaron iconos.');
    return;
  }

  const outputDirectory = path.dirname(sourcePath);
  await mkdir(outputDirectory, { recursive: true });
  const buffers = await generateIconBuffers(sourcePath);
  for (const [fileName, buffer] of buffers) {
    const outputPath = path.join(outputDirectory, fileName);
    await writeFile(outputPath, buffer);
    console.log(`Generado ${path.relative(projectRoot, outputPath)}`);
  }
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  await makeIcons();
}
