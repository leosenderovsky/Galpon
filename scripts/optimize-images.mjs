import { copyFile, mkdir, readdir, rename, stat, unlink } from 'node:fs/promises';
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
    const temporary = `${input}.tmp`;
    let optimized;
    let quality = 82;
    while (quality >= 35) {
      await sharp(input).jpeg({ quality, mozjpeg: true }).toFile(temporary);
      optimized = await stat(temporary);
      if (optimized.size <= maxKB * 1024) break;
      await unlink(temporary);
      quality -= 7;
    }
    if (!optimized || optimized.size > maxKB * 1024) {
      throw new Error(`${relative}: no se pudo reducir a ${maxKB} KB conservando las dimensiones.`);
    }
    await rename(temporary, input);
    console.log(`optimized ${relative}: ${(info.size / 1024).toFixed(1)} KB -> ${(optimized.size / 1024).toFixed(1)} KB (calidad ${quality})`);
  }
}
