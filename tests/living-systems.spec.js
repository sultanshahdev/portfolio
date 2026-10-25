import { test, expect } from '@playwright/test';

const slugs = ['c2g', 'clara', 'soar-lite', 'codecraft'];
const exhibit = (page, slug) => page.locator(`.project-entry--showcase[data-project="${slug}"] .project-exhibit`);

test('the studio uses original named companions and three intentional canvas widths', async ({ page }, info) => {
  await page.goto('./#/');
  await expect(page.getByRole('img', { name: 'BIT, a bracket-shaped engineering assistant' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'PACKET, a network companion' })).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Step inside Selected Work' })).toHaveAttribute('href', '#/#work');
  if (info.project.name === 'desktop') {
    const wide = await page.locator('.selected-work').boundingBox();
    const standard = await page.locator('.technical-expertise').boundingBox();
    const prose = await page.locator('.intro-body').boundingBox();
    expect(wide.width).toBeGreaterThan(standard.width);
    expect(standard.width).toBeGreaterThan(prose.width);
    expect(prose.width).toBeLessThanOrEqual(800);
    const index = page.getByRole('navigation', { name: 'Explore this page' });
    await index.getByRole('link', { name: 'Work', exact: true }).click();
    await expect(index.getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'location');
  }
});

test('progress reflects the scroll range and the footer returns keyboard focus to the page', async ({ page }) => {
  await page.goto('./#/');
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight / 2));
  await expect.poll(async () => page.evaluate(() => {
    const measured = new DOMMatrix(getComputedStyle(document.querySelector('.page-progress > span')).transform).a;
    const expected = scrollY / (document.documentElement.scrollHeight - innerHeight);
    return Math.abs(measured - expected);
  })).toBeLessThan(0.01);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Back to top' }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await expect(page.locator('main')).toBeFocused();
});

test('all project illustrations are finite, replayable and keyboard operable', async ({ page }) => {
  await page.goto('./#/');
  for (const slug of slugs) {
    const figure = exhibit(page, slug);
    await figure.scrollIntoViewIfNeeded();
    if (slug === 'soar-lite') {
      await expect(figure).toHaveAttribute('data-phase', 'idle');
      await expect(figure).toContainText('No firewall or network traffic is blocked.');
      await expect(figure).toContainText('Awaiting human approval');
    } else {
      await expect(figure).toHaveAttribute('data-phase', 'complete');
    }
    const button = figure.getByRole('button');
    await button.focus();
    await expect(button).toHaveCSS('outline-style', 'solid');
    await page.keyboard.press('Enter');
    await expect(figure).toHaveAttribute('data-phase', 'running');
    await expect(button).toBeDisabled();
    await expect(figure).toHaveAttribute('data-phase', 'complete');
    await expect(button).toBeEnabled();
    await expect.poll(() => figure.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length)).toBe(0);
  }
});

test('reduced motion responds immediately and can change during a diagram run', async ({ page }) => {
  await page.goto('./#/');
  const figure = exhibit(page, 'clara');
  await figure.scrollIntoViewIfNeeded();
  await expect(figure).toHaveAttribute('data-phase', 'complete');
  await figure.getByRole('button').click();
  await expect(figure).toHaveAttribute('data-phase', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(figure).toHaveAttribute('data-phase', 'complete');
  for (const slug of slugs) {
    const current = exhibit(page, slug);
    await current.getByRole('button').click();
    await expect(current).toHaveAttribute('data-phase', 'complete');
    expect(await current.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
  }
  await expect(page.locator('main h1')).toHaveCSS('opacity', '1');
});

test('changing routes disconnects old observed elements and cancels pending diagram work', async ({ page }) => {
  await page.addInitScript(() => {
    const NativeObserver = window.IntersectionObserver;
    window.observedElements = new Set();
    window.IntersectionObserver = class extends NativeObserver {
      targets = new Set();
      observe(target) { this.targets.add(target); window.observedElements.add(target); super.observe(target); }
      unobserve(target) { this.targets.delete(target); window.observedElements.delete(target); super.unobserve(target); }
      disconnect() { for (const target of this.targets) window.observedElements.delete(target); this.targets.clear(); super.disconnect(); }
    };
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./#/');
  await exhibit(page, 'soar-lite').getByRole('button').click();
  await expect(exhibit(page, 'soar-lite')).toHaveAttribute('data-phase', 'running');
  await page.goto('./#/contact');
  await expect(page.locator('h1')).toHaveText('Contact');
  expect(await page.evaluate(() => [...window.observedElements].every(el => el.isConnected))).toBe(true);
  await page.waitForTimeout(1700);
  expect(errors).toEqual([]);
  await expect(page.locator('.project-exhibit')).toHaveCount(0);
});

test('mobile schematics retain readable stage labels and both character silhouettes', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'Compact stage keys are designed for touch screens.');
  await page.goto('./#/');
  await page.getByRole('button', { name: 'Menu' }).tap();
  // Mobile overflow can inflate innerWidth; compare with the configured viewport.
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
  await page.getByRole('button', { name: 'Close' }).tap();
  for (const slug of slugs) {
    const figure = exhibit(page, slug);
    await figure.scrollIntoViewIfNeeded();
    await expect(figure.locator('svg').first()).toBeVisible();
    const stages = figure.getByRole('list', { name: 'Illustrated stages' });
    await expect(stages).toBeVisible();
    await expect(stages.getByRole('listitem')).toHaveCount(4);
    expect(await stages.getByRole('listitem').first().evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(12);
  }
  await expect(exhibit(page, 'c2g').getByRole('img', { name: /PACKET/ })).toBeVisible();
});
