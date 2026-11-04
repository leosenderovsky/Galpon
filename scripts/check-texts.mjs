#!/usr/bin/env node
/**
 * Garantiza que ningún texto visible esté escrito en los componentes: los datos editables viven en src/data/.
 * Recorre los componentes con un analizador sintáctico (@babel/parser) y marca:
 *   - texto dentro de JSX (<p>Hola</p>),
 *   - atributos visibles o accesibles (aria-label, alt, title, placeholder, label, value…),
 *   - cadenas y plantillas de texto en el código (mensajes, avisos, etiquetas).
 * Se ignoran los identificadores técnicos (clases de Tailwind, claves, comparaciones, errores de desarrollo y consola).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '@babel/parser';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/check-texts.config.json'), 'utf8'));
const exclude = new Set(cfg.excludeFiles ?? []);
const allowStrings = new Set((cfg.allowStrings ?? []).map((s) => s.trim()));
const usedByTooling = cfg.usedByTooling ?? [];
const brandData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand.json'), 'utf8'));
const brandSchema = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/brand.schema.json'), 'utf8'));
const toolingPaths = new Set();
for (const entry of usedByTooling) {
  if (!entry || typeof entry.path !== 'string' || typeof entry.reason !== 'string' || !entry.reason.trim()) {
    throw new Error('scripts/check-texts.config.json: cada usedByTooling debe tener path y un motivo.');
  }
  toolingPaths.add(entry.path);
}

const SKIP_ATTRS = new Set(['className', 'style', 'id', 'key', 'type', 'href', 'src', 'srcSet', 'rel', 'target', 'name', 'htmlFor', 'role', 'inputMode', 'autoComplete', 'loading', 'decoding', 'fetchPriority', 'sizes', 'method', 'viewBox', 'd', 'fill', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'xmlns', 'width', 'height', 'mode', 'variant', 'size', 'as', 'to', 'step', 'min', 'max', 'pattern', 'accept', 'lang', 'dir', 'tabIndex', 'crossOrigin', 'referrerPolicy', 'media', 'color', 'align', 'aria-modal', 'aria-hidden', 'aria-live', 'aria-busy', 'aria-haspopup', 'aria-orientation', 'aria-selected', 'aria-checked', 'aria-pressed', 'aria-expanded', 'aria-current', 'aria-controls', 'aria-describedby', 'aria-labelledby', 'data-testid']);
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (/\.(tsx?|jsx?)$/.test(f.name)) files.push(p); } })(path.join(ROOT, 'src'));

const looksLikeText = (s) => {
  const t = s.trim();
  if (!t || !/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,}/.test(t)) return false;
  if (allowStrings.has(t)) return false;
  if (/^(\/|https?:|#|\.|data:|[\w.-]+\.(png|jpe?g|webp|svg|json|css|mjs|ts|tsx))/i.test(t)) return false;
  const tokens = t.split(/\s+/);
  const tailwind = tokens.every((k) => /^[\w\-:/[\].%#&!()>*,=@'"+_]+$/.test(k) && !/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/.test(k)) && tokens.some((k) => /[-:[\]]/.test(k) && k.length > 1);
  if (tailwind) return false;
  if (/^[a-z][a-zA-Z0-9_-]*$/.test(t)) return false;                       // identificador (catalog, cart, all)
  if (/^[A-Z0-9_]+$/.test(t) && !/\s/.test(t) && t.length < 14) return false; // CONSTANTE
  return /[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+|\s|[áéíóúñ¿¡]/.test(t);
};

const findings = [];
const brandReferences = new Set();
const resolvePath = (object, fieldPath) => fieldPath.split('.').reduce((value, key) => value?.[key], object);
for (const entry of usedByTooling) {
  if (resolvePath(brandData, entry.path) === undefined) {
    throw new Error(`scripts/check-texts.config.json: usedByTooling "${entry.path}" no existe en brand.json.`);
  }
}

function getBrandReference(node) {
  if (!node || typeof node !== 'object') return undefined;
  if (node.type === 'Identifier' && ['BRAND', 'brandJson'].includes(node.name)) return [];
  if (node.type !== 'MemberExpression' && node.type !== 'OptionalMemberExpression') return undefined;
  const parent = getBrandReference(node.object);
  if (!parent) return undefined;
  const property = node.computed
    ? node.property?.type === 'StringLiteral' ? node.property.value : undefined
    : node.property?.name;
  return property ? [...parent, property] : parent;
}

function collectBrandReferences(node) {
  if (!node || typeof node !== 'object') return;
  const reference = getBrandReference(node);
  if (reference?.length) brandReferences.add(reference.join('.'));
  for (const [key, value] of Object.entries(node)) {
    if (['loc', 'leadingComments', 'trailingComments'].includes(key)) continue;
    if (Array.isArray(value)) value.forEach(collectBrandReferences);
    else if (value && typeof value === 'object') collectBrandReferences(value);
  }
}

function collectTextFields(schemaNode, dataNode, fieldPath = '', inheritedWidget = '') {
  if (!schemaNode || dataNode === undefined || dataNode === null) return;
  const widget = schemaNode['x-widget'] ?? inheritedWidget;
  if (schemaNode['x-skipMarkers']) return;
  if (schemaNode.type === 'object' && dataNode && typeof dataNode === 'object' && !Array.isArray(dataNode)) {
    for (const [key, childData] of Object.entries(dataNode)) {
      collectTextFields(schemaNode.properties?.[key], childData, fieldPath ? `${fieldPath}.${key}` : key);
    }
    return;
  }
  if (schemaNode.type === 'array' && Array.isArray(dataNode)) {
    for (const [index, item] of dataNode.entries()) {
      collectTextFields(schemaNode.items, item, `${fieldPath}[${index}]`, widget);
    }
    return;
  }
  if (typeof dataNode !== 'string' || !['text', 'textarea', 'whatsapp', 'list'].includes(widget)) return;
  const usedInSource = [...brandReferences].some((reference) => fieldPath === reference || fieldPath.startsWith(`${reference}.`) || fieldPath.startsWith(`${reference}[`));
  const usedByTooling = [...toolingPaths].some((toolingPath) => fieldPath === toolingPath || fieldPath.startsWith(`${toolingPath}.`) || fieldPath.startsWith(`${toolingPath}[`));
  if (!usedInSource && !usedByTooling) {
    findings.push({ rel: 'src/data/brand.json', line: 1, kind: 'clave sin uso', text: fieldPath });
  }
}

for (const file of files) {
  const rel = path.relative(ROOT, file).replaceAll('\\', '/');
  if (exclude.has(rel)) continue;
  const code = fs.readFileSync(file, 'utf8');
  let ast;
  try { ast = parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'] }); } catch (e) { console.error(`check:texts ERROR - no se pudo analizar ${rel}: ${e.message}`); process.exit(1); }
  collectBrandReferences(ast.program);
  const add = (kind, node, text) => { if (looksLikeText(text)) findings.push({ rel, line: node.loc.start.line, kind, text: text.replace(/\s+/g, ' ').trim() }); };
  (function visit(node, parent, ctx) {
    if (!node || typeof node.type !== 'string') return;
    switch (node.type) {
      case 'ImportDeclaration': case 'ExportAllDeclaration': case 'TSLiteralType': case 'TSTypeAnnotation': case 'TSTypeAliasDeclaration': case 'TSInterfaceDeclaration': return;
      case 'ThrowStatement': return;                                         // mensajes de error de desarrollo
      case 'CallExpression': if (node.callee?.object?.name === 'console') return; break;
      case 'JSXText': add('texto', node, node.value); return;
      case 'JSXAttribute': {
        const n = node.name.name; const v = node.value;
        if (v && v.type === 'StringLiteral' && !SKIP_ATTRS.has(n)) add(`atributo ${n}`, v, v.value);
        if (v && v.type === 'JSXExpressionContainer' && (!SKIP_ATTRS.has(n) || n === 'href')) visit(v.expression, node, { attr: n });
        return;
      }
      case 'StringLiteral':
        if (parent?.type === 'ObjectProperty' && parent.key === node) return;
        if (parent?.type === 'BinaryExpression' && ['===', '!==', '==', '!='].includes(parent.operator)) return;
        if (parent?.type === 'SwitchCase') return;
        add(ctx?.attr ? `atributo ${ctx.attr}` : 'cadena', node, node.value); return;
      case 'TemplateLiteral': add('plantilla', node, node.quasis.map((q) => q.value.cooked).join('{}')); node.expressions.forEach((e) => visit(e, node, ctx)); return;
    }
    for (const k of Object.keys(node)) { if (['loc', 'leadingComments', 'trailingComments'].includes(k)) continue; const v = node[k]; if (Array.isArray(v)) v.forEach((c) => visit(c, node, ctx)); else if (v && typeof v.type === 'string') visit(v, node, ctx); }
  })(ast.program, null, null);
}

collectTextFields(brandSchema, brandData);

function reportUnschematizedText(schemaNode, dataNode, fieldPath = '') {
  if (dataNode === null || dataNode === undefined) return;
  if (Array.isArray(dataNode)) {
    dataNode.forEach((item, index) => reportUnschematizedText(schemaNode?.items, item, `${fieldPath}[${index}]`));
    return;
  }
  if (typeof dataNode === 'object') {
    for (const [key, value] of Object.entries(dataNode)) {
      reportUnschematizedText(schemaNode?.properties?.[key], value, fieldPath ? `${fieldPath}.${key}` : key);
    }
    return;
  }
  if (typeof dataNode === 'string' && !schemaNode) {
    findings.push({ rel: 'src/data/brand.json', line: 1, kind: 'clave sin esquema', text: fieldPath });
  }
}

reportUnschematizedText(brandSchema, brandData);

console.log(`check:texts - ${files.length - exclude.size} archivos revisados`);
if (findings.length) {
  findings.forEach((f) => console.error(`  ERROR ${f.rel}:${f.line} [${f.kind}] "${f.text.slice(0, 100)}"`));
  console.error(`\n${findings.length} texto(s) escrito(s) en el código. Movelos al JSON correspondiente de src/data/ y a su esquema para que sean editables,`);
  console.error('o, si es un dato técnico, agregalo a "allowStrings" en scripts/check-texts.config.json.');
  process.exit(1);
}
console.log('No hay textos visibles escritos en los componentes.');
