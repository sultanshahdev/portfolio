import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { technicalExpertise } from '../src/data/skills.js';

test.describe('technical skills deepening', () => {
  const section = (page) => page.locator('.technical-expertise');
  const trigger = (page, index) => section(page).getByRole('button', { name: technicalExpertise[index].title, exact: true });
  const category = (page, index) => section(page).locator('.expertise-category').nth(index);
  const panel = (page, index) => category(page, index).locator('.expertise-reveal');
  const finePointer = (page) => page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches);

  test.beforeEach(async ({ page }) => {
    await page.goto('./#/');
    await page.evaluate(() => document.fonts.ready);
  });

  test('all identities and all 512 original skills are preserved, initially concealed', async ({ page }) => {
    await expect(section(page).getByRole('heading', { level: 2 })).toHaveText('TECHNICAL EXPERTISE & SKILLS');
    await expect(section(page)).toContainText('Languages, systems, and the practices behind the software.');
    await expect(section(page)).toContainText('23 categories');
    await expect(section(page).getByRole('button')).toHaveText(technicalExpertise.map((entry, index) => `${entry.title}${String(index + 1).padStart(2, '0')}`));
    await expect(section(page).locator('.expertise-category .expertise-icon')).toHaveCount(23);
    await expect(section(page).locator('button[aria-expanded="true"]')).toHaveCount(0);
    await expect(section(page).getByRole('list')).toHaveCount(0);
    await expect(section(page).locator('.expertise-skills li')).toHaveText(technicalExpertise.flatMap((entry) => entry.skills));
    expect(technicalExpertise.reduce((sum, entry) => sum + entry.skills.length, 0)).toBe(512);
    for (const reveal of await section(page).locator('.expertise-reveal').all()) {
      await expect(reveal).toBeHidden();
      await expect(reveal).toHaveAttribute('aria-hidden', 'true');
      await expect(reveal).toHaveAttribute('inert', '');
      expect((await reveal.boundingBox())?.height ?? 0).toBe(0);
    }
  });

  test('every category exposes its complete ordered list through the associated trigger', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const [index, entry] of technicalExpertise.entries()) {
      const button = trigger(page, index);
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(button).toHaveAttribute('aria-controls', `expertise-${entry.id}-content`);
      await expect(panel(page, index)).toHaveAttribute('id', `expertise-${entry.id}-content`);
      await expect(panel(page, index)).toHaveAttribute('aria-hidden', 'false');
      await expect(panel(page, index)).not.toHaveAttribute('inert');
      await expect(panel(page, index).getByRole('listitem')).toHaveText(entry.skills);
      await expect(section(page).locator('button[aria-expanded="true"]')).toHaveCount(1);
    }
    const results = await new AxeBuilder({ page }).include('.technical-expertise').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
  });

  test('hover previews include their content and pinning survives pointer exit', async ({ page }) => {
    test.skip(!(await finePointer(page)), 'Hover previews require an actual fine hover pointer.');
    await trigger(page, 0).hover();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await panel(page, 0).getByRole('list').hover();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await page.mouse.move(20, 100);
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'false');
    await expect(panel(page, 0)).toBeHidden();
    await trigger(page, 0).click();
    await expect(panel(page, 0)).toContainText('Kept open');
    await page.mouse.move(20, 100);
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await trigger(page, 12).hover();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger(page, 12)).toHaveAttribute('aria-expanded', 'false');
    await trigger(page, 12).click();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger(page, 12)).toHaveAttribute('aria-expanded', 'true');
    await trigger(page, 12).click();
    await expect(trigger(page, 12)).toHaveAttribute('aria-expanded', 'false');
    await expect(panel(page, 12)).toBeHidden();
    let box = await trigger(page, 12).boundingBox();
    await page.mouse.move(box.x + box.width / 2 + 1, box.y + box.height / 2 + 1);
    await expect(trigger(page, 12)).toHaveAttribute('aria-expanded', 'false');
    await page.mouse.move(20, 100);
    await trigger(page, 12).hover();
    await expect(trigger(page, 12)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    box = await trigger(page, 12).boundingBox();
    await page.mouse.move(box.x + box.width / 2 - 1, box.y + box.height / 2 - 1);
    await expect(trigger(page, 12)).toHaveAttribute('aria-expanded', 'false');
  });

  test('Enter, Space, Tab and Escape work without moving focus', async ({ page }) => {
    await trigger(page, 0).focus();
    await expect(trigger(page, 0)).toHaveCSS('outline-style', 'solid');
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Enter');
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(trigger(page, 1)).toBeFocused();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Space');
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger(page, 1)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(trigger(page, 1)).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger(page, 1)).toBeFocused();
    await page.keyboard.press('Space');
    await expect(trigger(page, 1)).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Space');
    await expect(trigger(page, 1)).toHaveAttribute('aria-expanded', 'false');
  });

  test('touch uses taps and never depends on simulated hover', async ({ page }) => {
    test.skip(!(await page.evaluate(() => navigator.maxTouchPoints > 0)), 'Tap behavior runs in the touch project.');
    await expect(section(page).locator('.expertise-hint-touch')).toBeVisible();
    await expect(section(page).locator('.expertise-hint-hover')).toBeHidden();
    await category(page, 0).dispatchEvent('pointermove', { pointerType: 'touch' });
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'false');
    await trigger(page, 0).tap();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await trigger(page, 0).tap();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'false');
    await trigger(page, 1).tap();
    await trigger(page, 0).tap();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
    await expect(trigger(page, 1)).toHaveAttribute('aria-expanded', 'false');
  });

  test('rapid pointer switching settles without stuck layers or hover-driven scrolling', async ({ page }) => {
    test.skip(!(await finePointer(page)), 'Pointer stress testing requires a fine hover pointer.');
    await section(page).scrollIntoViewIfNeeded();
    const scrollBefore = await page.evaluate(() => scrollY);
    for (const index of [0, 12, 1, 13, 0, 2, 12, 0]) {
      const box = await trigger(page, index).boundingBox();
      await page.mouse.move(box.x + 35, box.y + 20, { steps: 2 });
      expect(await section(page).locator('button[aria-expanded="true"]').count()).toBeLessThanOrEqual(1);
    }
    await page.mouse.move(20, 100);
    await expect(section(page).locator('button[aria-expanded="true"]')).toHaveCount(0);
    await expect.poll(() => section(page).locator('.expertise-reveal').evaluateAll((panels) => panels.every((element) => element.getBoundingClientRect().height === 0 && getComputedStyle(element).visibility === 'hidden'))).toBe(true);
    expect(await page.evaluate(() => scrollY)).toBe(scrollBefore);
    await trigger(page, 0).click();
    await expect(trigger(page, 0)).toHaveAttribute('aria-expanded', 'true');
  });

  test('motion traces a rule, unfolds, staggers and then settles', async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await trigger(page, 0).focus();
    await page.keyboard.press('Enter');
    const samples = await category(page, 0).evaluate(async (element) => {
      const panel = element.querySelector('.expertise-reveal');
      const items = panel.querySelectorAll('li');
      const start = performance.now();
      const rows = [];
      do {
        rows.push({ time: performance.now() - start, height: panel.getBoundingClientRect().height, first: Number(getComputedStyle(items[0]).opacity), last: Number(getComputedStyle(items[items.length - 1]).opacity) });
        await new Promise(requestAnimationFrame);
      } while (performance.now() - start < 550);
      return rows;
    });
    await testInfo.attach('motion samples', { body: JSON.stringify(samples), contentType: 'application/json' });
    const settled = samples.at(-1);
    expect(samples.some((row) => row.height > 0 && row.height < settled.height - 1)).toBe(true);
    expect(samples.some((row) => row.first > row.last + 0.1)).toBe(true);
    expect(settled.first).toBe(1);
    expect(settled.last).toBe(1);
    const rule = await category(page, 0).evaluate((element) => getComputedStyle(element, '::before').transform);
    expect(rule).toBe('matrix(1, 0, 0, 1, 0, 0)');
    await page.keyboard.press('Escape');
    await expect(panel(page, 0)).toBeHidden();
  });

  test('reduced motion reveals everything immediately without decorative movement', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await trigger(page, 0).focus();
    await page.keyboard.press('Enter');
    await expect(panel(page, 0)).toBeVisible();
    await expect(panel(page, 0)).toHaveCSS('transition-duration', '0s');
    await expect(panel(page, 0).locator('li').last()).toHaveCSS('opacity', '1');
    await expect(panel(page, 0).locator('li').last()).toHaveCSS('transform', 'none');
    await expect(category(page, 0).locator('.expertise-icon')).toHaveCSS('transform', 'none');
    expect(await category(page, 0).evaluate((element) => getComputedStyle(element, '::before').display)).toBe('none');
    await page.keyboard.press('Escape');
    await expect(panel(page, 0)).toBeHidden();
    expect((await panel(page, 0).boundingBox())?.height ?? 0).toBe(0);
  });

  for (const width of [1440, 1280, 1024, 768, 390, 360]) {
    test(`stable columns and complete reveals fit at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const columns = section(page).locator('.expertise-column');
      await expect(columns.nth(0).locator('.expertise-title')).toHaveText(technicalExpertise.slice(0, 12).map((entry) => entry.title));
      await expect(columns.nth(1).locator('.expertise-title')).toHaveText(technicalExpertise.slice(12).map((entry) => entry.title));
      const membership = await columns.evaluateAll((elements) => elements.map((column) => [...column.querySelectorAll('h3')].map((heading) => heading.id)));
      const rightBefore = await trigger(page, 12).boundingBox();
      await trigger(page, 0).click();
      const rightAfter = await trigger(page, 12).boundingBox();
      if (width >= 640) expect(rightAfter.x).toBe(rightBefore.x);
      else expect(rightAfter.x).toBe((await trigger(page, 0).boundingBox()).x);
      expect(await columns.evaluateAll((elements) => elements.map((column) => [...column.querySelectorAll('h3')].map((heading) => heading.id)))).toEqual(membership);
      await expect(panel(page, 0).getByRole('listitem')).toHaveCount(34);
      expect(await panel(page, 0).locator('.expertise-clip').evaluate((element) => element.scrollHeight <= element.clientHeight + 1)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const button of await section(page).getByRole('button').all()) expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
      await trigger(page, 0).click();
      expect((await section(page).boundingBox()).height).toBeLessThan(width < 640 ? 1800 : 1000);
    });
  }
});
