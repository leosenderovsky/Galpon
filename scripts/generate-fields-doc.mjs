import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const schemaFiles = ['brand.schema.json', 'catalog.schema.json', 'size-guide.schema.json'];
const rows = [];

function formatAsset(asset) {
  if (!asset) return '';
  return Object.entries(asset).map(([key, value]) => `${key}: ${value}`).join(', ');
}
function scalarRow(rows, node, fieldPath) {
  rows.push({ path: fieldPath, title: node.title || '', description: node.description || '', widget: node['x-widget'] || (node.type === 'boolean' ? 'boolean' : node.type === 'number' || node.type === 'integer' ? 'number' : 'text'), asset: formatAsset(node['x-asset']), example: node.examples?.[0] ?? '' });
}
function collect(schema, node, fieldPath, output) {
  if (!node) return;
  if (node.$ref) return collect(schema, schema.definitions?.[node.$ref.replace('#/definitions/', '')], fieldPath, output);
  if (node.type === 'object' && (node.properties || node.patternProperties)) {
    for (const [key, child] of Object.entries(node.properties ?? {})) collect(schema, child, fieldPath ? `${fieldPath}.${key}` : key, output);
    for (const [pattern, child] of Object.entries(node.patternProperties ?? {})) {
      const placeholder = pattern.includes('a-z0-9') ? '{categoryId}' : '{clave}';
      collect(schema, child, fieldPath ? `${fieldPath}.${placeholder}` : placeholder, output);
    }
  } else if (node.type === 'array' && node.items?.type === 'object') {
    collect(schema, node.items, `${fieldPath}[]`, output);
  } else if (node.type === 'array') scalarRow(output, node, fieldPath);
  else scalarRow(output, node, fieldPath);
}

for (const file of schemaFiles) {
  const schema = JSON.parse(await readFile(path.join(root, 'src/data', file), 'utf8'));
  const fields = [];
  collect(schema, schema, '', fields);
  rows.push({ section: schema.title || file, fields });
}

let md = '# Diccionario de campos editables\n\n';
md += 'Este documento se genera desde `brand.schema.json`, `catalog.schema.json` y `size-guide.schema.json`.\n\n';
for (const section of rows) {
  md += `## ${section.section}\n\n| Ruta | Título | Descripción | Widget | Asset | Ejemplo |\n|---|---|---|---|---|---|\n`;
  for (const row of section.fields) {
    const clean = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
    md += `| \`${row.path}\` | ${clean(row.title)} | ${clean(row.description)} | \`${row.widget}\` | ${clean(row.asset)} | ${clean(row.example)} |\n`;
  }
  md += '\n';
}
await writeFile(path.join(root, 'docs/CAMPOS.md'), md, 'utf8');
console.log(`wrote docs/CAMPOS.md (${rows.reduce((sum, section) => sum + section.fields.length, 0)} campos)`);
