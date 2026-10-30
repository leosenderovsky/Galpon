import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const data = JSON.parse(await readFile(path.join(root, 'src/data/catalog.json'), 'utf8'));
const config = JSON.parse(await readFile(new URL('./check-coupling.config.json', import.meta.url), 'utf8'));
const exceptions = config.exceptions ?? {};
const forbidden = [...data.categories.map((category) => category.id)];
const findings = [];
const sourceExtensions = /\.(?:[cm]?[jt]sx?)$/i;

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await filesIn(full));
    else if (sourceExtensions.test(entry.name)) result.push(full);
  }
  return result;
}

for (const file of await filesIn(path.join(root, 'src'))) {
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  if (relative.startsWith('src/data/') || relative.startsWith('src/generated/') || relative === 'src/catalog.ts') continue;
  const content = await readFile(file, 'utf8');
  for (const id of forbidden) {
    if (exceptions[id]) continue;
    const pattern = new RegExp(`(?<![A-Za-z0-9_-])${id}(?![A-Za-z0-9_-])`, 'g');
    for (const match of content.matchAll(pattern)) {
      const line = content.slice(0, match.index).split('\n').length;
      findings.push(`${relative}:${line}: aparece el id de categoría "${id}"; motivo para excepción: ninguno`);
    }
  }
}

if (findings.length) {
  console.error(`check:coupling encontró ${findings.length} acoplamientos:`);
  for (const finding of findings) console.error(`  ✖ ${finding}`);
  process.exit(1);
}
console.log('check:coupling OK: no hay ids de categorías escritos en el código.');
