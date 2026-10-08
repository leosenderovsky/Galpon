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

let blocked = false;
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
if (!commitMatches) blocked = true;

const rows = [
  {
    Dato: 'Commit publicado vs main',
    Valor: `${publishedCommit || '(faltante)'} vs ${mainCommit}`,
    Estado: commitMatches ? 'OK' : 'DESACTUALIZADO'
  },
  { Dato: 'Contexto', Valor: buildInfo.context || '(faltante)', Estado: buildInfo.context ? 'OK' : 'FALTANTE' },
  { Dato: 'URL', Valor: buildInfo.siteUrl || '(vacía)', Estado: buildInfo.siteUrl ? 'OK' : 'FALTANTE' },
  { Dato: 'Fuente URL', Valor: buildInfo.siteUrlSource || '(faltante)', Estado: 'INFO' },
  ...['VITE_SITE_URL', 'VITE_DEMO_BRAND_NAME', 'VITE_DEMO_BRAND_URL'].map((name) => ({
    Dato: name,
    Valor: typeof buildInfo.env?.[name] === 'boolean' ? String(buildInfo.env[name]) : '(faltante)',
    Estado: typeof buildInfo.env?.[name] === 'boolean' ? 'OK' : 'FALTANTE'
  }))
];

if (!buildInfo.context || !buildInfo.siteUrl || !buildInfo.siteUrlSource) blocked = true;
if (['VITE_SITE_URL', 'VITE_DEMO_BRAND_NAME', 'VITE_DEMO_BRAND_URL']
  .some((name) => typeof buildInfo.env?.[name] !== 'boolean')) {
  blocked = true;
}

if (buildInfo.context === 'production' && buildInfo.siteUrlSource === 'DEPLOY_PRIME_URL') {
  rows.push({ Dato: 'Selección URL producción', Valor: 'DEPLOY_PRIME_URL', Estado: 'ATENCIÓN' });
}
if (buildInfo.siteUrlSource === 'none') blocked = true;

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
  {
    name: 'canonical',
    match: html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i)
  },
  {
    name: 'og:image',
    match: html.match(/<meta\b(?=[^>]*\bproperty=["']og:image["'])(?=[^>]*\bcontent=["']([^"']+)["'])[^>]*>/i)
  }
];

for (const { name, match } of metadata) {
  const value = match?.[1];
  let status = 'FALTANTE';
  if (value) {
    try {
      const response = await fetch(new URL(value, siteUrl));
      status = String(response.status);
      if (response.status !== 200) blocked = true;
    } catch (error) {
      status = `ERROR: ${error.message}`;
      blocked = true;
    }
  } else {
    blocked = true;
  }
  rows.push({ Dato: `GET ${name}`, Valor: value || '(no encontrado)', Estado: status });
}

console.table(rows);
if (blocked) process.exitCode = 1;
