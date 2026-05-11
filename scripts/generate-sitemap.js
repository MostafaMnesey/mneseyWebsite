#!/usr/bin/env node
/**
 * generate-sitemap.js
 * Generates public/sitemap.xml from the static route list before every build.
 *
 * Run:  node scripts/generate-sitemap.js
 * Auto: Added as "prebuild" in package.json
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.mentholatumarabia.com';
const OUTPUT  = path.resolve(__dirname, '../public/sitemap.xml');

// ── Static routes (dynamic slugs are excluded — generate via API if needed) ───
const staticRoutes = [
  { loc: '/',            changefreq: 'weekly',  priority: '1.0' },
  { loc: '/brands',     changefreq: 'weekly',  priority: '0.9' },
  { loc: '/shop',       changefreq: 'weekly',  priority: '0.9' },
  { loc: '/about',      changefreq: 'monthly', priority: '0.8' },
  { loc: '/blogs',      changefreq: 'daily',   priority: '0.8' },
  { loc: '/environment',changefreq: 'monthly', priority: '0.7' },
  { loc: '/contact',    changefreq: 'monthly', priority: '0.7' },
  { loc: '/dax',        changefreq: 'monthly', priority: '0.7' },
  { loc: '/symptom-checker-v2', changefreq: 'monthly', priority: '0.6' },
  { loc: '/terms',      changefreq: 'yearly',  priority: '0.4' },
  { loc: '/privacy',    changefreq: 'yearly',  priority: '0.4' },
];

const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

function buildSitemap(routes) {
  const urls = routes
    .map(
      ({ loc, changefreq, priority }) => `
  <url>
    <loc>${DOMAIN}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls}
</urlset>
`;
}

fs.writeFileSync(OUTPUT, buildSitemap(staticRoutes), 'utf8');
console.log(`✅ Sitemap written to ${OUTPUT} (${staticRoutes.length} URLs)`);
