import { test, expect } from '@playwright/test';

const biography = [
  'I’m a Software Engineer focused on backend and distributed systems, with a systems-first approach to architecture, reliability, performance, and security.',
  'My technical focus spans Backend Engineering, Distributed Systems, System Design, Software Architecture, Linux, Networking, and Network Security. I see these disciplines as interconnected layers of a larger system.',
  'I’m drawn to engineering challenges involving architectural trade-offs, performance bottlenecks, concurrency, and fault tolerance, with an emphasis on building systems that remain scalable, maintainable, and secure.',
];
const labels = ['Frontend Engineering', 'Backend Engineering', 'Distributed Systems', 'Networking & Security'];
const node = (page, name) => page.getByRole('button', { name, exact: true });
const explanation = (page) => page.locator('.discipline-explanations > .is-active');

test('the introduction preserves the exact biography and connects to projects', async ({ page }) => {
  await page.goto('./#/');
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('From thoughtful interfaces to resilient systems.');
  await expect(page.locator('.intro-name')).toHaveText('Sultan Shah');
  await expect(page.locator('.intro-identity')).toHaveText('Software Engineer · Frontend Engineer');
  await expect(page.locator('.intro-architecture')).toContainText('Systems Architecture');
  await expect(page.locator('.intro-body > p')).toHaveText(biography);
  await expect(page.locator('.portrait-location')).toHaveText('Karachi, Sindh, Pakistan');
  const image = page.getByRole('img', { name: 'Portrait of Sultan Shah' });
  await expect(image).toHaveAttribute('src', '/portfolio/images/profile-img.png');
  await expect.poll(() => image.evaluate((element) => element.naturalWidth)).toBe(1206);
  await page.getByRole('link', { name: 'Explore My Projects' }).click();
  await expect(page).toHaveURL(/#\/projects$/);
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('.project-entry')).toHaveCount(4);
});

test('social links open their configured destinations in a separate tab', async ({ page, context }) => {
  await page.goto('./#/');
  // Test navigation mechanics without depending on either provider's bot policy.
  for (const [label, url] of [
    ['GitHub', 'https://github.com/sultanshahdev'],
    ['LinkedIn', 'https://www.linkedin.com/in/sultan-shah-dev/'],
  ]) {
    await context.route(url, (route) => route.fulfill({ body: '<title>Social destination</title>' }));
    const link = page.locator('.intro-socials').getByRole('link', { name: new RegExp(label) });
    await expect(link).toHaveAttribute('href', url);
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    const popupEvent = page.waitForEvent('popup');
    await link.click();
    const popup = await popupEvent;
    await expect(popup).toHaveURL(url);
    await popup.close();
  }
});

test('pointer previews return to the chosen discipline without moving the biography', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile', 'Fine pointer behavior is checked on desktop.');
  await page.goto('./#/');
  const diagram = page.locator('.engineering-disciplines');
  await node(page, 'Frontend Engineering').scrollIntoViewIfNeeded();
  const position = await page.locator('.intro-body').boundingBox();
  await node(page, 'Distributed Systems').hover();
  await expect(diagram).toHaveAttribute('data-active', 'distributed');
  await expect(explanation(page)).toContainText('communicate, coordinate, and recover');
  await expect(page.locator('[data-path="distributed"]')).toHaveCSS('stroke-dashoffset', '0px');
  await page.mouse.move(1, 1);
  await expect(diagram).toHaveAttribute('data-active', 'frontend');
  expect((await page.locator('.intro-body').boundingBox()).y).toBe(position.y);

  // Keyboard activation wins over a pointer left above another discipline.
  const backend = node(page, 'Backend Engineering');
  await backend.focus();
  await node(page, 'Networking & Security').hover();
  await expect(diagram).toHaveAttribute('data-active', 'security');
  await page.keyboard.press('Enter');
  await expect(backend).toHaveAttribute('aria-pressed', 'true');
  await expect(diagram).toHaveAttribute('data-active', 'backend');
  await expect(explanation(page)).toContainText('Application logic, data');
  await expect(explanation(page)).toHaveAttribute('id', await backend.getAttribute('aria-describedby'));
  await page.mouse.move(1, 1);
  await backend.blur();
  await expect(diagram).toHaveAttribute('data-active', 'backend');
});

test('keyboard focus previews paths and Enter and Space select explanations', async ({ page }) => {
  await page.goto('./#/');
  const diagram = page.locator('.engineering-disciplines');
  const frontend = node(page, 'Frontend Engineering');
  if (!test.info().project.use.hasTouch) await frontend.hover();
  await frontend.focus();
  await expect(frontend).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Tab');
  const backend = node(page, 'Backend Engineering');
  await expect(backend).toBeFocused();
  await expect(diagram).toHaveAttribute('data-active', 'backend');
  await page.keyboard.press('Enter');
  await expect(backend).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const security = node(page, 'Networking & Security');
  await expect(security).toBeFocused();
  await page.keyboard.press('Space');
  await expect(security).toHaveAttribute('aria-pressed', 'true');
  await expect(frontend).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.press('Tab');
  await expect(diagram).toHaveAttribute('data-active', 'security');
  await expect(explanation(page)).toContainText('trust boundaries');
});

test('touch selection works while every discipline remains visible', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Touch behavior uses the mobile project.');
  await page.goto('./#/');
  await page.evaluate(() => document.fonts.ready);
  const biographyTop = () => page.locator('.intro-body').evaluate((element) => element.getBoundingClientRect().top + scrollY);
  const top = await biographyTop();
  for (const label of labels) {
    await node(page, label).tap();
    await expect(node(page, label)).toHaveAttribute('aria-pressed', 'true');
    for (const visibleLabel of labels) await expect(node(page, visibleLabel)).toBeVisible();
    expect(await biographyTop()).toBeCloseTo(top, 1);
  }
  await expect(explanation(page)).toContainText('trust boundaries');
});

test('reduced motion keeps the introduction and final linework immediately available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/');
  await expect(page.locator('.intro-headline')).toHaveCSS('opacity', '1');
  await expect(page.locator('.intro-headline')).toHaveCSS('transform', 'none');
  expect(await page.locator('.intro-hero').evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
  await node(page, 'Networking & Security').focus();
  await expect(page.locator('[data-path="security"]')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-path="security"]')).toHaveCSS('transition-duration', '0s');
  await expect(page.locator('.intro-body > p')).toHaveText(biography);
});

for (const [width, height] of [[1440, 1000], [1280, 1000], [1024, 1000], [768, 1000], [390, 844], [360, 800]]) {
  test(`the engineering portrait is composed and readable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const portrait = await page.locator('.biography-portrait').boundingBox();
    expect(portrait.width).toBeGreaterThanOrEqual(width >= 1024 ? 280 : width >= 640 ? 248 : 208);
    const frame = await page.locator('.portrait-registration').boundingBox();
    const column = await page.locator('.intro-portrait-column').boundingBox();
    expect(frame.x).toBeGreaterThanOrEqual(column.x);
    expect(frame.x + frame.width).toBeLessThanOrEqual(column.x + column.width);
    const headline = page.locator('.intro-headline');
    expect(await headline.locator('span').evaluateAll((lines) => lines.every((line) => line.scrollWidth <= line.clientWidth && line.clientHeight < 70))).toBe(true);
    for (const label of labels) {
      const button = node(page, label);
      expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(44);
      await expect(button).toBeVisible();
    }
    if (width < 640) {
      // The biography starts within roughly one phone screen of the introduction.
      const start = await page.locator('.intro-composition').boundingBox();
      const reading = await page.locator('.intro-body').boundingBox();
      expect(reading.y - start.y).toBeLessThan(height * 1.15);
    }
    await testInfo.attach(`hero-${width}`, { body: await page.screenshot(), contentType: 'image/png' });
  });
}
