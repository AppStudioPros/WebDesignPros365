// Capture full-page screenshots for portfolio additions
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const sites = [
  { slug: 'phylaxone', url: 'https://www.phylaxone.com/' },
  { slug: 'yourworkforce', url: 'https://www.yourworkforce.ai/' },
  { slug: 'adaptivecompoundintelligence', url: 'https://www.adaptivecompoundintelligence.com/' },
  { slug: 'acusightpro', url: 'https://www.acusightpro.com/' },
  { slug: 'marqetcore', url: 'https://marqetcore.com/' },
  { slug: 'motherlodecmi', url: 'https://www.motherlodecmi.com/' },
  { slug: 'aetheraci', url: 'https://www.aetheraci.com/' },
];

const OUT = path.resolve('public/portfolio');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
  userAgent:
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
});

for (const site of sites) {
  const out = path.join(OUT, `${site.slug}.png`);
  console.log(`Capturing ${site.url} -> ${out}`);
  const page = await ctx.newPage();
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 });
    // Let animations settle
    await page.waitForTimeout(1500);
    // Auto-scroll once to trigger lazy-load
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let total = 0;
        const step = 400;
        const t = setInterval(() => {
          window.scrollBy(0, step);
          total += step;
          if (total >= document.body.scrollHeight) {
            clearInterval(t);
            resolve();
          }
        }, 80);
      });
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: out, fullPage: true });
    console.log(`  ✅ ${site.slug}`);
  } catch (err) {
    console.error(`  ❌ ${site.slug}: ${err.message}`);
  }
  await page.close();
}

await browser.close();
console.log('Done.');
