#!/usr/bin/env node
/**
 * Valida src/data/brand.json contra brand.schema.json y revisa imágenes, URLs, colores, WhatsApp y variables de texto.
 * Con --strict además exige reemplazar los datos de ejemplo y rechaza los marcadores de prototype-markers.json.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const root = fileURLToPath(new URL('../', import.meta.url));
const dataPath = path.join(root, 'src/data/brand.json');
const schemaPath = path.join(root, 'src/data/brand.schema.json');
const catalogPath = path.join(root, 'src/data/catalog.json');
const catalogSchemaPath = path.join(root, 'src/data/catalog.schema.json');
const sizeGuidePath = path.join(root, 'src/data/size-guide.json');
const sizeGuideSchemaPath = path.join(root, 'src/data/size-guide.schema.json');
const markersPath = path.join(root, 'src/data/prototype-markers.json');
const publicDir = path.join(root, 'public');
const strict = process.argv.includes('--strict');
const validAssetKeys = new Set(['path', 'minWidth', 'maxWidth', 'ratio', 'ratios', 'ratioTolerance', 'maxKB']);
const ratioPattern = /^\d+:\d+$/;
const croppableAssetFields = new Map([
  ['brand.schema.json', new Set(['seo.socialImage', 'logo.favicon32', 'logo.appleTouchIcon', 'hero.backgroundImage', 'howToBuy.posterUrl'])],
  ['catalog.schema.json', new Set(['products[].images[]'])],
]);
/** Rutas de brand.json que deben contener solo dígitos (número de WhatsApp para wa.me). */
const DIGIT_FIELDS = (await readFile(new URL('./check-config.fields.json', import.meta.url), 'utf8').then(JSON.parse).catch(() => ({ digits: [] }))).digits;

const errors = [];
const warnings = [];
const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
const data = JSON.parse(await readFile(dataPath, 'utf8'));
const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const catalogSchema = JSON.parse(await readFile(catalogSchemaPath, 'utf8'));
const sizeGuide = JSON.parse(await readFile(sizeGuidePath, 'utf8'));
const sizeGuideSchema = JSON.parse(await readFile(sizeGuideSchemaPath, 'utf8'));
const markers = JSON.parse(await readFile(markersPath, 'utf8'));

function checkAsset(asset, schemaName, fieldPath) {
  const location = `${schemaName} ${fieldPath}.x-asset`;
  if (!asset || typeof asset !== 'object' || Array.isArray(asset)) {
    errors.push(`${location}: debe ser un objeto`);
    return;
  }
  for (const key of Object.keys(asset)) {
    if (!validAssetKeys.has(key)) errors.push(`${location}.${key}: clave no permitida`);
  }
  if (typeof asset.path !== 'string' || asset.path.length === 0) errors.push(`${location}.path: es obligatorio y debe ser texto no vacío`);
  for (const key of ['minWidth', 'maxWidth', 'maxKB']) {
    if (asset[key] !== undefined && (typeof asset[key] !== 'number' || !Number.isFinite(asset[key]) || asset[key] < 0)) {
      errors.push(`${location}.${key}: debe ser un número mayor o igual que cero`);
    }
  }
  if (asset.ratio !== undefined && (typeof asset.ratio !== 'string' || !ratioPattern.test(asset.ratio))) {
    errors.push(`${location}.ratio: debe tener el formato "W:H" con enteros`);
  }
  if (asset.ratios !== undefined && (!Array.isArray(asset.ratios) || asset.ratios.length === 0 || asset.ratios.some((ratio) => typeof ratio !== 'string' || !ratioPattern.test(ratio)))) {
    errors.push(`${location}.ratios: debe ser una lista no vacía de proporciones "W:H" con enteros`);
  }
  if (asset.ratio !== undefined && asset.ratios !== undefined) errors.push(`${location}: ratio y ratios son excluyentes`);
  if (asset.ratioTolerance !== undefined && (typeof asset.ratioTolerance !== 'number' || !Number.isFinite(asset.ratioTolerance) || asset.ratioTolerance < 0)) {
    errors.push(`${location}.ratioTolerance: debe ser un número mayor o igual que cero`);
  }
  if (croppableAssetFields.get(schemaName)?.has(fieldPath) && asset.ratio === undefined && asset.ratios === undefined) {
    errors.push(`${location}: falta ratio o ratios para una imagen recortable`);
  }
}

function walkSchemaAssets(node, schemaName, fieldPath = '') {
  if (!node || typeof node !== 'object') return;
  if (Object.hasOwn(node, 'x-asset')) checkAsset(node['x-asset'], schemaName, fieldPath || '/');
  for (const [key, child] of Object.entries(node.properties ?? {})) walkSchemaAssets(child, schemaName, fieldPath ? `${fieldPath}.${key}` : key);
  for (const [pattern, child] of Object.entries(node.patternProperties ?? {})) {
    const placeholder = pattern.includes('a-z0-9') ? '{categoryId}' : '{clave}';
    walkSchemaAssets(child, schemaName, fieldPath ? `${fieldPath}.${placeholder}` : placeholder);
  }
  if (node.items) walkSchemaAssets(node.items, schemaName, `${fieldPath}[]`);
}

const schemaDirectory = path.join(root, 'src/data');
for (const file of (await readdir(schemaDirectory)).filter((file) => file.endsWith('.schema.json')).sort()) {
  const schemaValue = JSON.parse(await readFile(path.join(schemaDirectory, file), 'utf8'));
  walkSchemaAssets(schemaValue, file);
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);
if (!validate(data)) for (const err of validate.errors ?? []) errors.push(`brand.json ${err.instancePath || '/'}: ${err.message}${err.params?.additionalProperty ? ` (${err.params.additionalProperty})` : ''}`);
for (const [name, value, schemaValue] of [['catalog.json', catalog, catalogSchema], ['size-guide.json', sizeGuide, sizeGuideSchema]]) {
  const check = ajv.compile(schemaValue);
  if (!check(value)) for (const err of check.errors ?? []) errors.push(`${name} ${err.instancePath || '/'}: ${err.message}`);
}

function checkSchemaTitles(node, schemaName, fieldPath = '') {
  if (!node || typeof node !== 'object') return;
  if (typeof node.title === 'string') {
    const location = `${schemaName} ${fieldPath || '/'}`;
    if (/^[a-záéíóúüñ]/.test(node.title)) {
      errors.push(`${location}: el título debe comenzar con mayúscula ("${node.title}")`);
    }
    if (/^[^:]+:\s+\S+/.test(node.title)) {
      errors.push(`${location}: el título no debe repetir la sección ("${node.title}")`);
    }
  }
  for (const [key, child] of Object.entries(node.properties ?? {})) {
    checkSchemaTitles(child, schemaName, fieldPath ? `${fieldPath}.${key}` : key);
  }
  for (const [key, child] of Object.entries(node.patternProperties ?? {})) {
    checkSchemaTitles(child, schemaName, fieldPath ? `${fieldPath}.${key}` : key);
  }
  if (node.items) checkSchemaTitles(node.items, schemaName, `${fieldPath}[]`);
}

for (const [name, schemaValue] of [
  ['brand.schema.json', schema],
  ['catalog.schema.json', catalogSchema],
  ['size-guide.schema.json', sizeGuideSchema],
]) {
  checkSchemaTitles(schemaValue, name);
}

const defaultSizeEnum = catalogSchema.properties?.settings?.properties?.defaultSize?.enum;
if (JSON.stringify(defaultSizeEnum) !== JSON.stringify(catalog.availableSizes)) {
  errors.push('catalog.schema.json settings.defaultSize.enum: debe coincidir y mantener el orden de catalog.json availableSizes');
}

const categoryIds = new Set(catalog.categories.map((category) => category.id));
for (const [guideId, guide] of Object.entries(sizeGuide.guides ?? {})) {
  if (!categoryIds.has(guideId)) errors.push(`size-guide.json guides.${guideId}: no existe en catalog.json categories[].id`);
  if (guide.category !== guideId) errors.push(`size-guide.json guides.${guideId}.category: debe coincidir con la clave "${guideId}"`);
}
const productIds = new Set();
for (const [index, product] of catalog.products.entries()) {
  const p = `catalog.json products[${index}]`;
  if (productIds.has(product.id)) errors.push(`${p}.id: id duplicado "${product.id}"`);
  productIds.add(product.id);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.id)) errors.push(`${p}.id: debe estar en kebab-case ("${product.id}")`);
  if (!categoryIds.has(product.category)) errors.push(`${p}.category: categoría inexistente "${product.category}"`);
  if (!(product.price > 0)) errors.push(`${p}.price: debe ser mayor que cero`);
  if (product.compareAtPrice !== undefined && !(product.compareAtPrice > product.price)) errors.push(`${p}.compareAtPrice: debe ser mayor que price`);
  for (const [imageIndex, image] of product.images.entries()) {
    try { await stat(path.join(publicDir, image.replace(/^\//, ''))); } catch { errors.push(`${p}.images[${imageIndex}]: la imagen no existe en public/: ${image}`); }
  }
}
const referencedProductImages = new Set(catalog.products.flatMap((product) => product.images.map((image) => path.basename(image))));
const productsDir = path.join(publicDir, 'assets', 'products');
try {
  for (const file of await (await import('node:fs/promises')).readdir(productsDir)) {
    if (!referencedProductImages.has(file)) warnings.push(`public/assets/products/${file}: no está asociado a ningún producto`);
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }

const getPath = (obj, p) => p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

function colorToLinear(value) {
  const channel = Number.parseInt(value, 16) / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(color) {
  if (typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) return undefined;
  const channels = color.slice(1).match(/.{2}/g);
  if (!channels || channels.length !== 3) return undefined;
  const [red, green, blue] = channels.map(colorToLinear);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first, second) {
  const firstLuminance = luminance(first);
  const secondLuminance = luminance(second);
  if (firstLuminance === undefined || secondLuminance === undefined) return undefined;
  const light = Math.max(firstLuminance, secondLuminance);
  const dark = Math.min(firstLuminance, secondLuminance);
  return (light + 0.05) / (dark + 0.05);
}

function checkThemeContrast(schemaNode, themeData, themePath = '') {
  if (!schemaNode || !schemaNode.properties || !themeData) return;
  for (const [token, childSchema] of Object.entries(schemaNode.properties)) {
    const contrastToken = childSchema['x-contrastWith'];
    const ratio = contrastToken && contrastRatio(themeData[token], themeData[contrastToken]);
    if (ratio !== undefined && ratio < 4.5) {
      warnings.push(
        `brand.json ${themePath}${token}: contraste ${ratio.toFixed(2)}:1 con ${contrastToken}; se recomienda al menos 4,5:1 para texto normal`,
      );
    }
    if (childSchema.properties) checkThemeContrast(childSchema, themeData[token], `${themePath}${token}.`);
  }
}

checkThemeContrast(schema.properties?.theme, data.theme, 'theme.');

// Recorrido paralelo esquema ↔ datos
async function walk(sNode, dNode, p) {
  if (!sNode || dNode === undefined || dNode === null) return;
  if (sNode.type === 'object' && sNode.properties && typeof dNode === 'object') {
    for (const [k, child] of Object.entries(sNode.properties)) await walk(child, dNode[k], p ? `${p}.${k}` : k);
    return;
  }
  if (sNode.type === 'array' && Array.isArray(dNode)) {
    for (const [i, item] of dNode.entries()) await walk(sNode.items, item, `${p}[${i}]`);
    return;
  }
  if (typeof dNode !== 'string') return;
  const widget = sNode['x-widget'];
  if (widget === 'image' && dNode) {
    try { await stat(path.join(publicDir, dNode.replace(/^\//, ''))); } catch { errors.push(`brand.json ${p}: la imagen no existe en public/: ${dNode}`); }
  }
  if (widget === 'url' && dNode && !/^https?:\/\//i.test(dNode)) errors.push(`brand.json ${p}: la URL debe empezar con http:// o https:// ("${dNode}")`);
  if (widget === 'color' && !/^#[0-9a-fA-F]{6}$/.test(dNode)) errors.push(`brand.json ${p}: color inválido "${dNode}" (usar #RRGGBB)`);
  // variables {x}: solo las declaradas en el esquema
  const allowed = new Set(sNode['x-vars'] ?? []);
  for (const m of dNode.matchAll(/\{(\w+)\}/g)) if (!allowed.has(m[1])) errors.push(`brand.json ${p}: variable desconocida {${m[1]}} (permitidas: ${[...allowed].map((v) => `{${v}}`).join(', ') || 'ninguna'})`);
  if (strict && sNode['x-exampleData'] && Array.isArray(sNode.examples) && sNode.examples.includes(dNode)) errors.push(`[strict] brand.json ${p}: sigue el texto de ejemplo ("${dNode.slice(0, 60)}")`);
}
await walk(schema, data, '');

async function checkExamples(schemaNode, dataNode, fileName, fieldPath = '') {
  if (!schemaNode || dataNode === undefined || dataNode === null) return;
  if (schemaNode['x-exampleData'] && Array.isArray(schemaNode.examples) && schemaNode.examples.includes(dataNode)) {
    errors.push(`[strict] ${fileName} ${fieldPath}: sigue el texto de ejemplo ("${String(dataNode).slice(0, 60)}")`);
  }
  if (Array.isArray(dataNode)) {
    for (const [index, item] of dataNode.entries()) {
      await checkExamples(schemaNode.items, item, fileName, `${fieldPath}[${index}]`);
    }
    return;
  }
  if (typeof dataNode !== 'object') return;
  for (const [key, childData] of Object.entries(dataNode)) {
    const childSchema = schemaNode.properties?.[key]
      ?? Object.entries(schemaNode.patternProperties ?? {}).find(([pattern]) => new RegExp(pattern).test(key))?.[1]
      ?? schemaNode.additionalProperties;
    if (childSchema && typeof childSchema === 'object') {
      await checkExamples(childSchema, childData, fileName, fieldPath ? `${fieldPath}.${key}` : key);
    }
  }
}

if (strict) {
  await checkExamples(catalogSchema, catalog, 'catalog.json');
  await checkExamples(sizeGuideSchema, sizeGuide, 'size-guide.json');
}

for (const field of DIGIT_FIELDS) {
  const v = getPath(data, field);
  if (typeof v === 'string' && !/^\d+$/.test(v)) errors.push(`brand.json ${field}: debe contener solo dígitos ("${v}")`);
}

if (strict) {
  const skip = new Set();
  (function collect(n, p) { if (!n || typeof n !== 'object') return; if (n['x-skipMarkers'] && p) skip.add(p); for (const [k, c] of Object.entries(n.properties ?? {})) collect(c, p ? `${p}.${k}` : k); if (n.items) collect(n.items, p); })(schema, '');
  (function checkMarkers(node, p) {
    if (node == null) return;
    const base = p.replace(/\[\d+\]/g, '');
    if ([...skip].some((s) => base === s || base.startsWith(`${s}.`))) return;
    if (typeof node === 'string') { const lower = node.toLowerCase(); for (const m of markers.strings ?? []) if (lower.includes(m.toLowerCase())) errors.push(`[strict] brand.json ${p}: contiene el marcador de prototipo "${m}"`); }
    else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) checkMarkers(v, p ? `${p}.${k}` : k);
  })(data, '');
  (function checkCatalogMarkers(node, p) {
    if (node == null) return;
    if (typeof node === 'string') {
      const lower = node.toLowerCase();
      for (const m of markers.strings ?? []) if (lower.includes(m.toLowerCase())) errors.push(`[strict] ${p}: contiene el marcador de prototipo "${m}"`);
    } else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) checkCatalogMarkers(v, p ? `${p}.${k}` : k);
  })(catalog, 'catalog.json');
  (function checkSizeGuideMarkers(node, p) {
    if (node == null) return;
    if (typeof node === 'string') {
      const lower = node.toLowerCase();
      for (const m of markers.strings ?? []) if (lower.includes(m.toLowerCase())) errors.push(`[strict] ${p}: contiene el marcador de prototipo "${m}"`);
    } else if (typeof node === 'object') for (const [k, v] of Object.entries(node)) checkSizeGuideMarkers(v, p ? `${p}.${k}` : k);
  })(sizeGuide, 'size-guide.json');
}

if (warnings.length) { console.warn(`\nAdvertencias (${warnings.length}):`); warnings.forEach((w) => console.warn(`  ⚠ ${w}`)); }
if (errors.length) { console.error(`\nErrores de configuración (${errors.length}):`); errors.forEach((e) => console.error(`  ✖ ${e}`)); process.exit(1); }
console.log(strict ? 'check:config:strict OK: brand.json no conserva datos de ejemplo.' : 'check:config OK: brand.json es válido.');
