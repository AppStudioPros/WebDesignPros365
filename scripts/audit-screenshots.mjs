// Capture above-the-fold + 2 more viewports per page for visual audit
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const pages = [
  { slug: 'home',         path: '/' },
  { slug: 'services',     path: '/services' },
  { slug: 'platform-eng', path: '/platform-engineering' },
  { slug: 'portfolio',    path: '/portfolio' },
  { slug: 'about',        path: '/about' },
  { slug: 'contact',      path: '/contact' },
  { slug: 'partnerships', path: '/partnerships' },
  { slug: 'pricing',      path: '/pricing' },
];

const OUT = path.resolve('/tmp/wdp365-audit');
fs.mkdirSync(OUT, { recursive: true });
// clean old
for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const p of pages) {
  const url = `https://www.webdesignpros365.com${p.path}`;
  console.log(`Capturing ${url}`);
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);

    // Get total page height
    const h = await page.evaluate(() => document.body.scrollHeight);
    const vp = 900;
    const slices = Math.min(5, Math.ceil(h / vp));

    for (let i = 0; i < slices; i++) {
      const y = i * vp;
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(600);
      await page.screenshot({
        path: path.join(OUT, `${p.slug}-${String(i + 1).padStart(2, '0')}.png`),
        clip: { x: 0, y: 0, width: 1440, height: vp },
      });
    }
    console.log(`  ✅ ${p.slug} (${slices} slices)`);
  } catch (err) {
    console.error(`  ❌ ${p.slug}: ${err.message}`);
  }
  await page.close();
}

await browser.close();
console.log('Done. Files in', OUT);
