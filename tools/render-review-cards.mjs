// Render docs/reviews/card.html and sign.html to print-ready PDFs and PNG previews.
// Needs Playwright with Chromium:  node tools/render-review-cards.mjs
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
// require() honours NODE_PATH, so a globally installed Playwright works too.
const { chromium } = createRequire(import.meta.url)('playwright');
import { dirname, join } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'reviews');
const jobs = [
  { file: 'card.html', w: 3.5, h: 2, out: 'review-card' },
  { file: 'sign.html', w: 5, h: 7, out: 'review-sign-5x7' },
];
const browser = await chromium.launch();
for (const j of jobs) {
  const page = await browser.newPage({ viewport: { width: Math.round(j.w * 96), height: Math.round(j.h * 96) }, deviceScaleFactor: 3 });
  await page.goto('file://' + join(dir, j.file), { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(400);
  await page.pdf({ path: join(dir, j.out + '.pdf'), width: `${j.w}in`, height: `${j.h}in`, printBackground: true, pageRanges: '1' });
  await page.screenshot({ path: join(dir, j.out + '.png') });
  await page.close();
  console.log('wrote', j.out + '.pdf', '+', j.out + '.png');
}
await browser.close();
