import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';

// Local production-build review. No external services are required.
const base = process.env.REVIEW_URL || 'http://127.0.0.1:4173/portfolio/';
const directory = 'artifacts/engineering-lab';
await fs.mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const errors = [];
const results = [];
const hiddenChrome = '.site-header, .page-progress, .section-index, .lab-dialog-header { visibility: hidden; }';

try {
  for (const [width, height] of [[1440, 1000], [768, 1000], [390, 844], [320, 780]]) {
    const page = await browser.newPage({ viewport: { width, height }, isMobile: width < 640, hasTouch: width < 640, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(`${base}#/`);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('.biography-portrait').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => {}))));
    await page.screenshot({ path: `${directory}/hero-${width}.png`, animations: 'disabled' });
    async function capture(selector, name) {
      const element = page.locator(selector);
      await element.scrollIntoViewIfNeeded();
      await element.screenshot({ path: `${directory}/${name}-${width}.png`, animations: 'disabled', style: hiddenChrome });
    }
    await capture('.lab-entry', 'workshop');
    await page.getByRole('button', { name: 'Send a packet', exact: true }).click();
    await expect(page.locator('.engineering-lab')).toHaveAttribute('data-lab-phase', 'complete');
    if (width === 1440 || width === 390) {
      for (const slug of ['c2g', 'clara', 'soar-lite', 'codecraft']) {
        const project = page.locator(`[data-project="${slug}"]`);
        await project.getByRole('button').click();
        await capture(`[data-project="${slug}"]`, slug);
      }
      await page.getByRole('button', { name: 'DEVOPS & INFRASTRUCTURE', exact: true }).click();
      await capture('.technical-expertise', 'skills');
      await page.locator('.study-workbench summary').click();
      await capture('.education-learning', 'education');
      for (const [selector, name] of [['.community-leadership', 'community'], ['.contact-section', 'contact'], ['.site-footer', 'footer']]) await capture(selector, name);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const projects = await page.locator('.project-entry--showcase').count();
    const categories = await page.locator('.expertise-trigger').count();
    await page.getByRole('button', { name: 'Open Lab', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Compression Lab', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Compress text', exact: true }).click();
    await expect(page.locator('.instrument-status')).toContainText('Round trip verified');
    await page.getByRole('textbox', { name: 'Portfolio command' }).fill('projects');
    await page.getByRole('textbox', { name: 'Portfolio command' }).press('Enter');
    await page.locator('.lab-dialog').evaluate(dialog => { dialog.scrollTop = 0; });
    await page.getByRole('textbox', { name: 'Portfolio command' }).blur();
    await page.screenshot({ path: `${directory}/instruments-${width}.png`, animations: 'disabled' });
    if (width < 900) {
      await capture('.compression-lab', 'compression');
      await capture('.engineering-console', 'console');
    }
    await page.locator('.engineering-blueprint summary').click();
    await capture('.engineering-blueprint', 'blueprint');
    await page.locator('.artifact-cabinet summary').click();
    await capture('.artifact-cabinet', 'artifacts');
    const overflow = await page.locator('.lab-dialog').evaluate(dialog => dialog.scrollWidth > dialog.clientWidth);
    await page.getByRole('button', { name: 'Close lab' }).click();
    await expect(page.getByRole('button', { name: 'Open Lab', exact: true })).toBeFocused();
    results.push({ viewport: `${width}x${height}`, projects, categories, overflow, console: 'projects', compression: 'gzip round trip verified', focusRestored: true });
    await page.close();
  }
  await fs.writeFile(`${directory}/review-results.json`, JSON.stringify({ results, errors }, null, 2) + '\n');
  console.log(JSON.stringify({ results, errors }, null, 2));
  if (errors.length || results.some(result => result.overflow)) throw new Error('Rendered review found a regression.');
} finally {
  await browser.close();
}
