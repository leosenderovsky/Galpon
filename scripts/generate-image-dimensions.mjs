import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getImageDimensions } from './image-dimensions.mjs';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputPath = path.join(projectRoot, 'src', 'generated', 'imageDimensions.json');
const imageDimensions = await getImageDimensions(projectRoot);

await mkdir(path.dirname(outputPath), { recursive: true });
// Commit this generated map so copied client sites and deployed builds always have image dimensions available.
await writeFile(outputPath, `${JSON.stringify(imageDimensions, null, 2)}\n`, 'utf8');
