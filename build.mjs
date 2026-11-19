#!/usr/bin/env node
// Static site build: renders src/pages.mjs with src/data/site.json into dist/.
// No dependencies. Run: node build.mjs   (or npm run build)
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout } from './src/templates/layout.mjs';
import pages from './src/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const site = JSON.parse(readFileSync(join(root, 'src/data/site.json'), 'utf8'));

// Allow the live domain to be supplied at deploy time without editing the JSON.
if (process.env.SITE_URL) site.siteUrl = process.env.SITE_URL;
const siteUrl = (site.siteUrl || '').replace(/\/$/, '');
// BASE_PATH serves the site from a sub-folder (GitHub Pages preview: /premier-motors).
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
// PREVIEW=1 keeps a test deployment out of Google until the real domain is live.
const preview = process.env.PREVIEW === '1';
const withBase = (html) => (base ? html.replace(/\b(href|src|action|content)="\/(?!\/)/g, `$1="${base}/`) : html);
const buildId = Date.now().toString(36);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });
cpSync(join(root, 'src/assets/img/favicon.ico'), join(out, 'favicon.ico'));

const list = pages(site);
for (const page of list) {
  const html = withBase(layout(site, { ...page, buildId, noindex: page.noindex || preview }, page.body));
  const file = join(out, page.out);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log('  ✓', page.path);
}

writeFileSync(
  join(out, 'site.webmanifest'),
  JSON.stringify(
    {
      name: site.legalName,
      short_name: site.name,
      start_url: `${base}/`,
      display: 'standalone',
      background_color: '#0a0a0a',
      theme_color: '#0a0a0a',
      icons: [
        { src: `${base}/assets/img/icon-192.png`, sizes: '192x192', type: 'image/png' },
        { src: `${base}/assets/img/icon-512.png`, sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
);

writeFileSync(
  join(out, 'robots.txt'),
  preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
);

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = list
    .filter((p) => p.sitemap !== false && !p.noindex)
    .map(
      (p) => `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority || '0.7'}</priority></url>`,
    )
    .join('\n');
  writeFileSync(
    join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  console.log('  ✓ sitemap.xml');
} else {
  console.warn(
    '\n  ! siteUrl is empty in src/data/site.json (or SITE_URL env).\n' +
      '    Canonical tags, hreflang, absolute OG image and sitemap.xml are skipped until the domain is set.\n',
  );
}
if (preview) console.log('  · preview build: every page is noindex');
if (base) console.log(`  · base path: ${base}`);
console.log(`\nBuilt ${list.length} pages → dist/`);
