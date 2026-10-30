import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const originalRoot = path.join(root, '.image-originals');
const targets = [
  [path.join(root, 'public/assets/products'), 250],
  [path.join(root, 'public/assets/hero'), 350],
];
for (const [directory, maxKB] of targets) {
  for (const name of await readdir(directory)) {
    if (!name.toLowerCase().endsWith('.jpg')) continue;
    const input = path.join(directory, name);
    const info = await stat(input);
    if (info.size <= maxKB * 1024) continue;
    const relative = path.relative(root, input);
    const original = path.join(originalRoot, relative);
    await mkdir(path.dirname(original), { recursive: true });
    try { await stat(original); } catch { await copyFile(input, original); }
    const image = sharp(input);
    const metadata = await image.metadata();
    await image.jpeg({ quality: 82, mozjpeg: true }).resize(metadata.width, metadata.height, { fit: 'fill' }).toFile(`${input}.tmp`);
    const optimized = await stat(`${input}.tmp`);
    if (optimized.size < info.size) {
      await copyFile(`${input}.tmp`, input);
      console.log(`optimized ${relative}: ${(info.size / 1024).toFixed(1)} KB -> ${(optimized.size / 1024).toFixed(1)} KB`);
    }
    const { unlink } = await import('node:fs/promises');
    await unlink(`${input}.tmp`);
  }
}
