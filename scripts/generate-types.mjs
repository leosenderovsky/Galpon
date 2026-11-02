import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileFromFile } from 'json-schema-to-typescript';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const schemas = [
  ['brand.schema.json', 'brand.types.ts'],
  ['catalog.schema.json', 'catalog.types.ts'],
  ['size-guide.schema.json', 'size-guide.types.ts'],
];

await mkdir(path.join(projectRoot, 'src/generated'), { recursive: true });
for (const [schemaFile, outputFile] of schemas) {
  const schemaPath = path.join(projectRoot, 'src/data', schemaFile);
  const outPath = path.join(projectRoot, 'src/generated', outputFile);
  const types = await compileFromFile(schemaPath, {
    cwd: path.join(projectRoot, 'src/data'),
    bannerComment: `/* Types generated from src/data/${schemaFile}. Do not edit by hand. */`,
    additionalProperties: false,
    unknownAny: false,
  });
  await writeFile(outPath, types, 'utf8');
  console.log(`wrote ${path.relative(projectRoot, outPath).replaceAll('\\', '/')}`);
}
