import { execFileSync } from 'node:child_process';

const siteArgument = process.argv[2];
if (!siteArgument) {
  console.error('Uso: npm run verify:deploy -- https://<sitio>.netlify.app');
  process.exit(1);
}

let siteUrl;
try {
  siteUrl = new URL(siteArgument);
  if (!['http:', 'https:'].includes(siteUrl.protocol)) throw new Error('La URL debe usar HTTP o HTTPS');
} catch (error) {
  console.error(`URL del sitio inválida: ${error.message}`);
  process.exit(1);
}

let hasErrors = false;
let buildInfo;
try {
  const response = await fetch(new URL('/build-info.json', siteUrl));
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  buildInfo = await response.json();
} catch (error) {
  console.error(`No se pudo leer build-info.json: ${error.message}`);
  process.exit(1);
}

let mainCommit;
try {
  const remoteRef = execFileSync(
    'git',
    ['ls-remote', 'origin', 'refs/heads/main'],
    { encoding: 'utf8' }
  ).trim();
  mainCommit = remoteRef.split(/\s+/)[0];
  if (!mainCommit) throw new Error('origin no devolvió refs/heads/main');
} catch (error) {
  console.error(`No se pudo obtener el commit de main: ${error.message}`);
  process.exit(1);
}

const publishedCommit = typeof buildInfo.commit === 'string' ? buildInfo.commit : '';
const commitMatches = publishedCommit.toLowerCase() === mainCommit.toLowerCase();

const rows = [];

// Commit publicado
rows.push({
  Verificación: 'Commit publicado vs main',
  Estado: commitMatches ? 'OK' : 'ERROR',
  Detalle: commitMatches ? 'Coincide con el último commit de main' : `Publicado: ${publishedCommit?.substring(0, 7) || '(faltante)'} | main: ${mainCommit.substring(0, 7)}`
});
if (!commitMatches) hasErrors = true;

// Contexto
rows.push({
  Verificación: 'Contexto de deploy',
  Estado: 'OK',
  Detalle: buildInfo.context || '(sin contexto)'
});

// URL pública
if (buildInfo.siteUrl) {
  rows.push({
    Verificación: 'URL pública',
    Estado: 'OK',
    Detalle: buildInfo.siteUrl
  });
} else {
  const isProduction = buildInfo.context === 'production';
  rows.push({
    Verificación: 'URL pública',
    Estado: isProduction ? 'ERROR' : 'INFO',
    Detalle: 'URL no definida'
  });
  if (isProduction) hasErrors = true;
}

// Fuente URL
rows.push({
  Verificación: 'Fuente de URL',
  Estado: buildInfo.context === 'production' && buildInfo.siteUrlSource === 'DEPLOY_PRIME_URL' ? 'ATENCIÓN' : 'OK',
  Detalle: buildInfo.siteUrlSource || '(sin fuente)'
});

// Variables de entorno
for (const name of ['VITE_SITE_URL', 'VITE_DEMO_BRAND_NAME', 'VITE_DEMO_BRAND_URL']) {
  const isDefined = typeof buildInfo.env?.[name] === 'boolean';
  rows.push({
    Verificación: name,
    Estado: isDefined ? 'OK' : 'INFO',
    Detalle: isDefined ? String(buildInfo.env[name]) : 'Variable no establecida'
  });
}

let html;
try {
  const response = await fetch(siteUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  html = await response.text();
} catch (error) {
  console.error(`No se pudo leer el HTML del sitio: ${error.message}`);
  process.exit(1);
}

const metadata = [
  { name: 'canonical', match: html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i) },
  { name: 'og:image', match: html.match(/<meta\b(?=[^>]*\bproperty=["']og:image["'])(?=[^>]*\bcontent=["']([^"']+)["'])[^>]*>/i) }
];

for (const { name, match } of metadata) {
  const value = match?.[1];
  if (!value) {
    rows.push({
      Verificación: `Recurso ${name}`,
      Estado: 'ERROR',
      Detalle: 'No encontrado en el HTML'
    });
    hasErrors = true;
    continue;
  }

  try {
    const response = await fetch(new URL(value, siteUrl), { method: 'HEAD' });
    if (response.status === 200) {
      rows.push({
        Verificación: `Recurso ${name}`,
        Estado: 'OK',
        Detalle: value
      });
    } else {
      rows.push({
        Verificación: `Recurso ${name}`,
        Estado: 'ERROR',
        Detalle: `${value} (HTTP ${response.status})`
      });
      hasErrors = true;
    }
  } catch (error) {
    rows.push({
      Verificación: `Recurso ${name}`,
      Estado: 'ERROR',
      Detalle: `${value} (${error.message})`
    });
    hasErrors = true;
  }
}

console.table(rows);
process.exitCode = hasErrors ? 1 : 0;
