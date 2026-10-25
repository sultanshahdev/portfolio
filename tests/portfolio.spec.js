import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects } from '../src/data/projects.js';
import { writing } from '../src/data/writing.js';
import { profile } from '../src/data/profile.js';

const routes = [
  '/', '/projects', '/writing', '/contact',
  ...projects.map((project) => `/projects/${project.slug}`),
  ...writing.map((article) => `/writing/${article.slug}`),
  '/not-a-page', '/projects/unknown', '/writing/unknown',
];

for (const route of routes) {
  test(`loads, fits, and is accessible: ${route}`, async ({ page }) => {
    const failures = [];
    page.on('pageerror', (error) => failures.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
    await page.goto(`./#${route}`);
    await expect(page.locator('main h1')).toHaveCount(1);
    await page.reload();
    await expect(page.locator('main h1')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveTitle(/Sultan Shah/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(failures).toEqual([]);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('filters work with keyboard and reset to all projects', async ({ page }) => {
  await page.goto('./#/projects');
  await expect(page.locator('.project-entry')).toHaveCount(projects.length);
  for (const category of [...new Set(projects.map((project) => project.category))]) {
    const button = page.getByRole('button', { name: category, exact: true });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    const expected = projects.filter((project) => project.category === category);
    await expect(page.locator('.project-entry')).toHaveCount(expected.length);
    expect(await page.locator('.project-entry').evaluateAll((entries) => entries.map((entry) => entry.dataset.category))).toEqual(expected.map((project) => project.category));
  }
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('.project-entry')).toHaveCount(projects.length);
});

test('navigation, case studies, history, and focus work', async ({ page }, testInfo) => {
  await page.goto('./#/');
  await page.getByRole('link', { name: 'Read case study: c2g — Code 2gether — Decentralized Collaborative Editor' }).click();
  await expect(page).toHaveURL(/\/projects\/c2g$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('c2g');
  await expect(page.locator('main')).toBeFocused();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('c2g');
  await page.getByRole('link', { name: '← All projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/projects\/c2g$/);
  if (testInfo.project.name === 'mobile') {
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.click();
    await expect(page.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page');
  }
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact');
});

test('sample articles, contents links, code, and configured contact links', async ({ page }) => {
  await page.goto('./#/writing');
  await expect(page.getByText(/not published articles/)).toBeVisible();
  await page.getByRole('heading', { name: 'Where a module should end' }).getByRole('link').click();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await page.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: 'An illustrative boundary' }).click();
  await expect(page).toHaveURL(/#example$/);
  await expect(page.locator('pre')).toContainText('async function listActivities');
  await page.goto('./#/contact');
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(profile.email ? 1 : 0);
  await expect(page.locator('a[href$=".pdf"]')).toHaveCount(profile.resumeUrl ? 1 : 0);
  await expect(page.getByRole('main').getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/sultanshahdev');
});

test('small screens and long code do not overflow the page', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 780 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/writing/where-a-module-should-end');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  // A short code sample may fit even at 320px. Verify overflow is supported when needed.
  expect(await page.locator('pre').evaluate((element) => getComputedStyle(element).overflowX)).toBe('auto');
  await page.goto('./#/projects');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('404 recovers through a working home link', async ({ page }) => {
  await page.goto('./#/projects/missing');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page isn’t here.');
  await page.getByRole('link', { name: 'Back to home', exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio\/#\/$/);
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible();
});


test('production portrait and skip link preserve the current route', async ({ page }) => {
  await page.goto('./#/');
  const portrait = page.locator('.biography-portrait');
  await expect(portrait).toHaveAttribute('src', '/portfolio/images/profile-img.png');
  await expect.poll(() => portrait.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await page.goto('./#/projects');
  // Browser initial focus after programmatic navigation differs across engines.
  // The skip link must accept keyboard focus and Enter without changing the route.
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/projects#main-content$/);
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('.project-entry')).toHaveCount(projects.length);
});
