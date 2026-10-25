import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const output = 'artifacts/redesign';
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const desktopPage = await browser.newPage();
const touchPage = await browser.newPage({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 } });
let page = desktopPage;
const base = process.env.REVIEW_URL || 'http://127.0.0.1:5174/portfolio/';
const report = [];
const errors = [];
for (const current of [desktopPage, touchPage]) current.on('pageerror', error => errors.push(error.message));
async function ready(route, width, height = 1000) {
  page = width < 640 ? touchPage : desktopPage;
  await page.setViewportSize({ width, height });
  const target = `${base}#${route}`;
  if (page.url() === target) await page.reload();
  else await page.goto(target);
  await page.evaluate(() => document.fonts.ready);
  if (route.startsWith('/projects/')) await page.locator('#publication-sources').waitFor({ state: 'attached' });
  for (const image of await page.locator('img[loading="lazy"]').all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(img => img.decode().catch(() => {}));
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(650);
}
for (const width of [1536, 1440, 1280, 1024, 768, 390, 360]) {
  await ready('/', width, width < 640 ? 844 : 1000);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  const artifact = `home-${width}.png`;
  await page.screenshot({ animations: 'disabled', path: `${output}/${artifact}`, fullPage: true });
  await page.screenshot({ animations: 'disabled', path: `${output}/hero-${width}.png` });
  report.push({ viewport: `${width}x${width < 640 ? 844 : 1000}`, artifact, overflow });
  if (width === 390) {
    await page.getByRole('button', { name: 'Menu' }).tap();
    await page.screenshot({ animations: 'disabled', path: `${output}/mobile-menu.png` });
    report.push({ route: '/', width, state: 'mobile menu open', overflow: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth) });
    await page.getByRole('button', { name: 'Close' }).tap();
  }
}
await ready('/', 1440);
await page.locator('.technical-expertise').getByRole('button').first().click();
await page.waitForTimeout(500);
await page.locator('.technical-expertise').screenshot({ animations: 'disabled', path: `${output}/skills-expanded.png`, style: '.site-header, .page-progress, .section-index { visibility: hidden; }' });
await page.locator('.community-leadership').screenshot({ animations: 'disabled', path: `${output}/community-desktop.png`, style: '.site-header, .page-progress, .section-index { visibility: hidden; }' });
await page.locator('.site-footer').screenshot({ animations: 'disabled', path: `${output}/footer-desktop.png`, style: '.site-header, .page-progress, .section-index { visibility: hidden; }' });
for (const width of [1440, 390]) {
  await ready('/', width, width < 640 ? 844 : 1000);
  const style = '.site-header, .page-progress, .section-index { visibility: hidden; }';
  for (const slug of ['c2g', 'clara', 'soar-lite', 'codecraft']) {
    await page.locator(`.project-entry--showcase[data-project="${slug}"]`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await page.locator(`.project-entry--showcase[data-project="${slug}"]`).screenshot({ animations: 'disabled', path: `${output}/exhibit-${slug}-${width}.png`, style });
  }
  if (width === 390) {
    await page.locator('.community-leadership').screenshot({ animations: 'disabled', path: `${output}/community-mobile.png`, style });
    await page.locator('.technical-expertise').getByRole('button').first().tap();
    await page.waitForTimeout(500);
    await page.screenshot({ animations: 'disabled', path: `${output}/skills-mobile.png` });
  }
}

for (const [route, name] of [['/projects','archive'],['/projects/clara','case-study'],['/writing','writing'],['/contact','contact']]) {
  for (const width of [1440, 390]) {
    await ready(route, width, width < 640 ? 844 : 1000);
    await page.screenshot({ animations: 'disabled', path: `${output}/${name}-${width}.png`, fullPage: route !== '/projects/clara' });
    report.push({ route, width, overflow: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth) });
    if (route === '/projects/clara') {
      await page.locator('.technical-diagram').first().scrollIntoViewIfNeeded();
      await page.screenshot({ animations: 'disabled', path: `${output}/case-diagram-${width}.png` });
    }
  }
}
await fs.writeFile(`${output}/layout-results.json`, JSON.stringify({ report, errors }, null, 2));
console.log(JSON.stringify({ report, errors }));
await browser.close();
if (errors.length || report.some(entry => entry.overflow)) throw new Error('Visual QA found a runtime error or horizontal overflow; inspect layout-results.json.');
