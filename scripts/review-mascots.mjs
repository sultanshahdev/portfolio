import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const base = process.env.REVIEW_URL || 'http://127.0.0.1:5174/portfolio/';
const directory = 'artifacts/mascots';
const baseline = JSON.parse(await fs.readFile(`${directory}/baseline-layout.json`, 'utf8'));
const browser = await chromium.launch();
const desktop = await browser.newPage();
const mobile = await browser.newPage({ isMobile: true, hasTouch: true });
const errors = [];
for (const page of [desktop, mobile]) page.on('pageerror', error => errors.push(error.message));
let page = desktop;
const results = [];
const captureStyle = '.site-header, .page-progress, .section-index { visibility: hidden; }';
async function ready(width, route = '/') {
  page = width < 640 ? mobile : desktop;
  await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const url = `${base}#${route}`;
  if (page.url() === url) await page.reload(); else await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator('img[loading="lazy"]').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(img => img.decode().catch(() => {}));
  }
  await page.evaluate(() => scrollTo(0, 0));
}
async function section(selector, filename) {
  const target = page.locator(selector);
  await target.scrollIntoViewIfNeeded();
  await target.screenshot({ path: `${directory}/${filename}.png`, animations: 'disabled', style: captureStyle });
}
for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  await ready(width);
  const measurements = await page.evaluate(() => ({
    height: document.body.scrollHeight,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    sections: [...document.querySelectorAll('main > section')].map(element => ({ id: element.id || element.getAttribute('aria-labelledby'), height: element.offsetHeight })),
    cameos: [...document.querySelectorAll('[data-character]')].map(element => ({ character: element.dataset.character, width: element.getBoundingClientRect().width, hidden: !!element.closest('[aria-hidden="true"]') })),
  }));
  const before = baseline.find(item => item.width === width);
  results.push({ width, ...measurements, growth: measurements.height - before.height, growthPercent: (measurements.height - before.height) / before.height * 100, sectionDelta: measurements.sections.map((entry, i) => ({ id: entry.id, delta: entry.height - before.sections[i].height })) });
  await page.screenshot({ path: `${directory}/hero-${width}.png`, animations: 'disabled' });
  await page.screenshot({ path: `${directory}/home-${width}.png`, animations: 'disabled', fullPage: true });
  if ([1440, 390].includes(width)) {
    for (const slug of ['c2g', 'clara', 'soar-lite', 'codecraft']) await section(`[data-project="${slug}"]`, `${slug}-${width}`);
    for (const [selector, name] of [['.education-learning','education'], ['.community-leadership','community'], ['.contact-section','contact'], ['.site-footer','footer']]) await section(selector, `${name}-${width}`);
    await page.locator('.expertise-trigger').filter({ hasText: 'BACKEND FRAMEWORKS' }).click();
    await section('.technical-expertise', `skills-${width}`);
    await ready(width, '/contact');
    await page.screenshot({ path: `${directory}/contact-page-${width}.png`, fullPage: true, animations: 'disabled' });
  }
}
await fs.writeFile(`${directory}/layout-results.json`, JSON.stringify({ results, errors }, null, 2));
console.log(JSON.stringify({ results: results.map(({ width, growth, growthPercent, overflow, sectionDelta }) => ({ width, growth, growthPercent, overflow, sectionDelta })), errors }, null, 2));
await browser.close();
if (errors.length || results.some(result => result.overflow)) throw new Error('Mascot QA found a page error or horizontal overflow.');
