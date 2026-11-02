import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const data = JSON.parse(await readFile(path.join(root, 'src/data/catalog.json'), 'utf8'));
const sizeGuide = JSON.parse(await readFile(path.join(root, 'src/data/size-guide.json'), 'utf8'));
const config = JSON.parse(await readFile(new URL('./check-coupling.config.json', import.meta.url), 'utf8'));
const exceptions = config.exceptions ?? {};
const configuredValues = new Set([
  ...data.categories.map((category) => category.id),
  ...Object.keys(sizeGuide.guides ?? {}),
  ...Object.values(sizeGuide.guides ?? {}).map((guide) => guide.category),
]);

function collectUnits(value, key = '') {
  if (Array.isArray(value)) {
    if (/^(?:unit|units|unitOptions|measurementUnits)$/i.test(key)) {
      for (const item of value) if (typeof item === 'string') configuredValues.add(item);
    }
    for (const item of value) collectUnits(item);
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [childKey, child] of Object.entries(value)) {
    if (/^(?:unit|units|unitOptions|measurementUnits)$/i.test(childKey)) {
      if (typeof child === 'string') configuredValues.add(child);
      if (Array.isArray(child)) {
        for (const item of child) if (typeof item === 'string') configuredValues.add(item);
      }
    }
    collectUnits(child, childKey);
  }
}

collectUnits(data);
collectUnits(sizeGuide);
const forbidden = [...configuredValues].filter((value) => value.length > 1);
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
    const exception = exceptions[id];
    if (exception) {
      if (typeof exception !== 'string' || !exception.trim()) {
        throw new Error(`scripts/check-coupling.config.json: la excepción "${id}" debe incluir un motivo.`);
      }
      continue;
    }
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(?<![A-Za-z0-9_-])${escaped}(?![A-Za-z0-9_-])`, 'giu');
    for (const match of content.matchAll(pattern)) {
      const line = content.slice(0, match.index).split('\n').length;
      findings.push(`${relative}:${line}: aparece el valor configurable "${id}"; motivo para excepción: ninguno`);
    }
  }
}

if (findings.length) {
  console.error(`check:coupling encontró ${findings.length} acoplamientos de categorías o unidades:`);
  for (const finding of findings) console.error(`  ✖ ${finding}`);
  process.exit(1);
}
console.log('check:coupling OK: no hay categorías ni unidades configurables escritas en el código.');
