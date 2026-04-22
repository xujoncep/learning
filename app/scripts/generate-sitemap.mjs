#!/usr/bin/env node
// Generate sitemap.xml and robots.txt based on .mdx files in src/content/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT = path.resolve(__dirname, '..', 'src', 'generated', 'content');
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const SITE_URL = process.env.SITE_URL || 'https://learning-hub-3gw.pages.dev';

function walk(dir, filter = () => true) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

function xmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function main() {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  const mdxFiles = walk(CONTENT, (f) => f.endsWith('.mdx'));
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
  ];

  const sectionIds = new Set();
  for (const f of mdxFiles) {
    const rel = path.relative(CONTENT, f).replace(/\\/g, '/').replace(/\.mdx$/, '');
    const parts = rel.split('/');
    if (parts.length > 1) sectionIds.add(parts[0]);
    urls.push({
      loc: `/docs/${rel}`,
      changefreq: 'monthly',
      priority: '0.7',
    });
  }

  for (const section of sectionIds) {
    urls.push({
      loc: `/sections/${section}`,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }

  const body = urls
    .map(
      (u) => `  <url>
    <loc>${xmlEscape(SITE_URL + u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log(`✓ sitemap.xml (${urls.length} URLs)`);

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  console.log('✓ robots.txt');
}

main();
