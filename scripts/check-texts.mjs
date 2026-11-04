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
const completeObjectReferences = new Map();
const resolvePath = (object, fieldPath) => fieldPath.split('.').reduce((value, key) => value?.[key], object);
for (const entry of usedByTooling) {
  if (resolvePath(brandData, entry.path) === undefined) {
    throw new Error(`scripts/check-texts.config.json: usedByTooling "${entry.path}" no existe en brand.json.`);
  }
}

const ARRAY_STRING_MEMBERS = new Set([
  'at', 'charAt', 'charCodeAt', 'codePointAt', 'concat', 'copyWithin', 'entries', 'every', 'fill',
  'filter', 'find', 'findIndex', 'findLast', 'findLastIndex', 'flat', 'flatMap', 'forEach',
  'includes', 'indexOf', 'join', 'keys', 'lastIndexOf', 'length', 'localeCompare', 'map',
  'match', 'matchAll', 'normalize', 'padEnd', 'padStart', 'pop', 'push', 'reduce', 'reduceRight',
  'repeat', 'replace', 'replaceAll', 'reverse', 'search', 'shift', 'slice', 'some', 'sort',
  'splice', 'split', 'startsWith', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
  'toLowerCase', 'toString', 'toUpperCase', 'trim', 'trimEnd', 'trimStart', 'unshift', 'values',
]);

function normalizeBrandReference(reference) {
  const finalProperty = reference.at(-1);
  return finalProperty && ARRAY_STRING_MEMBERS.has(finalProperty)
    ? reference.slice(0, -1)
    : reference;
}

function getBrandReference(node, aliases) {
  if (!node || typeof node !== 'object') return undefined;
  if (node.type === 'Identifier') {
    if (['BRAND', 'brandJson'].includes(node.name)) return [];
    return aliases.get(node.name);
  }
  if (node.type !== 'MemberExpression' && node.type !== 'OptionalMemberExpression') return undefined;
  const parent = getBrandReference(node.object, aliases);
  if (!parent) return undefined;
  const property = node.computed
    ? node.property?.type === 'StringLiteral' ? node.property.value : undefined
    : node.property?.name;
  return property ? [...parent, property] : parent;
}

function addBrandReference(reference, node, rel, asCompleteObject = false) {
  const fieldPath = reference.join('.');
  brandReferences.add(fieldPath);
  if (asCompleteObject) {
    const key = `${rel}:${node.loc.start.line}:${fieldPath}`;
    completeObjectReferences.set(key, { rel, line: node.loc.start.line, fieldPath: fieldPath || '(raíz BRAND)' });
  }
}

function isObjectReference(reference) {
  const value = reference.reduce((current, key) => current?.[key], brandData);
  return value !== null && typeof value === 'object';
}

function isWholeObjectContext(node, parent, grandParent) {
  if (parent?.type === 'SpreadElement' && parent.argument === node) return true;
  if (parent?.type === 'JSXSpreadAttribute' && parent.argument === node) return true;
  if (parent?.type === 'CallExpression' && parent.arguments.includes(node)) return true;
  return parent?.type === 'JSXExpressionContainer'
    && grandParent?.type === 'JSXAttribute'
    && grandParent.value === parent;
}

function isIdentifierReference(node, parent) {
  if (!parent) return true;
  if ((parent.type === 'MemberExpression' || parent.type === 'OptionalMemberExpression')
    && parent.property === node && !parent.computed) return false;
  if ((parent.type === 'ObjectProperty' || parent.type === 'ObjectMethod')
    && parent.key === node && !parent.computed && !parent.shorthand) return false;
  if (parent.type === 'VariableDeclarator' && parent.id === node) return false;
  if ((parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression'
    || parent.type === 'ClassDeclaration' || parent.type === 'ClassExpression')
    && parent.id === node) return false;
  if ((parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression'
    || parent.type === 'ArrowFunctionExpression') && parent.params.includes(node)) return false;
  if (parent.type === 'ImportSpecifier' || parent.type === 'ImportDefaultSpecifier'
    || parent.type === 'ImportNamespaceSpecifier' || parent.type === 'ExportSpecifier') return false;
  return true;
}

function bindPattern(pattern, reference, aliases) {
  if (!pattern || !reference) return;
  if (pattern.type === 'Identifier') {
    aliases.set(pattern.name, reference);
    return;
  }
  if (pattern.type === 'AssignmentPattern') {
    bindPattern(pattern.left, reference, aliases);
    return;
  }
  if (pattern.type === 'RestElement') {
    bindPattern(pattern.argument, reference, aliases);
    return;
  }
  if (pattern.type === 'ObjectPattern') {
    for (const property of pattern.properties) {
      if (property.type === 'RestElement') {
        bindPattern(property.argument, reference, aliases);
        continue;
      }
      const key = property.computed
        ? property.key?.type === 'StringLiteral' ? property.key.value : undefined
        : property.key?.name ?? property.key?.value;
      if (key !== undefined) bindPattern(property.value, [...reference, String(key)], aliases);
    }
    return;
  }
  if (pattern.type === 'ArrayPattern') {
    pattern.elements.forEach((element, index) => {
      if (element) bindPattern(element, [...reference, String(index)], aliases);
    });
  }
}

function clearPattern(pattern, aliases) {
  if (!pattern) return;
  if (pattern.type === 'Identifier') {
    aliases.delete(pattern.name);
    return;
  }
  if (pattern.type === 'AssignmentPattern' || pattern.type === 'RestElement') {
    clearPattern(pattern.left ?? pattern.argument, aliases);
    return;
  }
  if (pattern.type === 'ObjectPattern') {
    for (const property of pattern.properties) {
      clearPattern(property.type === 'RestElement' ? property.argument : property.value, aliases);
    }
    return;
  }
  if (pattern.type === 'ArrayPattern') pattern.elements.forEach((element) => clearPattern(element, aliases));
}

function collectBrandReferences(root, rel) {
  function visit(node, parent, grandParent, aliases) {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'VariableDeclarator') {
      clearPattern(node.id, aliases);
      const reference = getBrandReference(node.init, aliases);
      if (reference !== undefined) {
        bindPattern(node.id, normalizeBrandReference(reference), aliases);
      } else {
        visit(node.init, node, parent, aliases);
      }
      return;
    }

    if (node.type === 'ImportDeclaration') {
      node.specifiers.forEach((specifier) => aliases.delete(specifier.local.name));
      return;
    }

    if (node.type === 'MemberExpression' || node.type === 'OptionalMemberExpression') {
      if ((parent?.type === 'MemberExpression' || parent?.type === 'OptionalMemberExpression') && parent.object === node) return;
      const reference = getBrandReference(node, aliases);
      if (reference !== undefined) {
        const normalized = normalizeBrandReference(reference);
        const complete = isWholeObjectContext(node, parent, grandParent) && isObjectReference(normalized);
        addBrandReference(normalized, node, rel, complete);
        return;
      }
    } else if (node.type === 'Identifier') {
      const reference = getBrandReference(node, aliases);
      if (reference !== undefined && isIdentifierReference(node, parent)) {
        const complete = isWholeObjectContext(node, parent, grandParent) && isObjectReference(reference);
        if (!['BRAND', 'brandJson'].includes(node.name) || complete) {
          addBrandReference(reference, node, rel, complete);
          return;
        }
      }
    }

    if (node.type === 'Program' || node.type === 'BlockStatement'
      || node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression'
      || node.type === 'ArrowFunctionExpression' || node.type === 'CatchClause') {
      aliases = new Map(aliases);
    }
    if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression'
      || node.type === 'ArrowFunctionExpression') {
      clearPattern(node.id, aliases);
      node.params.forEach((parameter) => clearPattern(parameter, aliases));
    }
    if (node.type === 'CatchClause') clearPattern(node.param, aliases);

    for (const [key, value] of Object.entries(node)) {
      if (['loc', 'leadingComments', 'trailingComments'].includes(key)) continue;
      if (Array.isArray(value)) value.forEach((child) => visit(child, node, parent, aliases));
      else if (value && typeof value === 'object') visit(value, node, parent, aliases);
    }
  }
  visit(root, null, null, new Map());
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
  const coversPath = (references) => [...references].some((reference) => (
    !reference || fieldPath === reference || fieldPath.startsWith(`${reference}.`) || fieldPath.startsWith(`${reference}[`)
  ));
  const usedInSource = coversPath(brandReferences);
  const usedByTooling = coversPath(toolingPaths);
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
  collectBrandReferences(ast.program, rel);
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
if (completeObjectReferences.size) {
  console.log('Referencias a objeto completo (revisar):');
  for (const reference of completeObjectReferences.values()) {
    console.log(`  ${reference.rel}:${reference.line} [referencia a objeto completo] "${reference.fieldPath}"`);
  }
}
if (findings.length) {
  const unusedKeys = findings.filter((finding) => finding.kind === 'clave sin uso');
  const textFindings = findings.filter((finding) => finding.kind !== 'clave sin uso');
  textFindings.forEach((f) => console.error(`  ERROR ${f.rel}:${f.line} [${f.kind}] "${f.text.slice(0, 100)}"`));
  if (unusedKeys.length) {
    const grouped = new Map();
    for (const finding of unusedKeys) {
      const [route, ...rest] = finding.text.split('.');
      if (!grouped.has(route)) grouped.set(route, []);
      grouped.get(route).push(rest.join('.') || '(raíz)');
    }
    console.error('Claves sin uso agrupadas por ruta:');
    for (const [route, keys] of grouped) console.error(`  ${route}: ${keys.join(', ')}`);
  }
  console.error(`\n${findings.length} texto(s) escrito(s) en el código. Movelos al JSON correspondiente de src/data/ y a su esquema para que sean editables,`);
  console.error('o, si es un dato técnico, agregalo a "allowStrings" en scripts/check-texts.config.json.');
  process.exit(1);
}
console.log('No hay textos visibles escritos en los componentes.');
