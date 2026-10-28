import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { controlRoom } from '../src/data/controlRoom.js';
import { profile } from '../src/data/profile.js';

const room = page => page.locator('.engineering-control-room');
const display = page => page.locator('.discipline-code-console');
const button = (page, id) => page.getByRole('button', { name: profile.disciplines.find(item => item.id === id).label, exact: true });
const completeCode = page => page.locator('pre[aria-label="Completed code example"]');
const count = page => display(page).getAttribute('data-code-count').then(Number);

async function show(page) {
  await page.goto('./#/');
  await room(page).scrollIntoViewIfNeeded();
}

// Watch only this feature's documented delays; leave all other site timers alone.
async function trackClock(page) {
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-01-01T00:00:01Z'));
  await page.addInitScript(() => {
    const schedule = window.setTimeout;
    const cancel = window.clearTimeout;
    window.controlTimers = new Set();
    window.setTimeout = (callback, delay, ...args) => {
      let timer;
      timer = schedule(() => { window.controlTimers.delete(timer); callback(...args); }, delay);
      if ([34, 2800, 450].includes(delay)) window.controlTimers.add(timer);
      return timer;
    };
    window.clearTimeout = timer => { window.controlTimers.delete(timer); cancel(timer); };
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => Boolean(window.controlDocumentHidden) });
  });
}

test('the four layers coordinate selection, explanations, paths and completed examples', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await show(page);
  await expect(room(page).getByRole('group', { name: 'Engineering disciplines' }).getByRole('button')).toHaveCount(4);
  const documentHeight = await page.evaluate(() => document.body.scrollHeight);
  for (const discipline of profile.disciplines) {
    await button(page, discipline.id).click();
    await expect(room(page)).toHaveAttribute('data-active', discipline.id);
    await expect(button(page, discipline.id)).toHaveAttribute('aria-pressed', 'true');
    await expect(room(page).locator('.discipline-explanations .is-active')).toHaveText(discipline.description);
    await expect(completeCode(page)).toHaveText(controlRoom[discipline.id].examples[0].source);
    await expect(room(page).locator(`[data-path="${discipline.id}"]`)).toHaveCSS('stroke-dashoffset', '0px');
    expect(await page.evaluate(() => document.body.scrollHeight)).toBe(documentHeight);
  }
  await expect(page.locator('.discipline-resident [data-character="pixel"]')).toHaveAttribute('data-pose', 'workstation');
  await expect(room(page).locator('.pixel-work-hand')).toHaveCount(2);
  await expect(room(page).locator('.mascot-cameo button, .mascot-cameo a')).toHaveCount(0);
  const audit = await new AxeBuilder({ page }).include('.engineering-control-room').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
});

test('keyboard preview stays stable while tabbing into its console', async ({ page }, info) => {
  await show(page);
  await button(page, 'security').focus();
  await page.keyboard.press('Tab');
  const pause = page.getByRole('button', { name: 'Pause code animation' });
  await expect(pause).toBeFocused();
  await expect(room(page)).toHaveAttribute('data-active', 'security');
  if (info.project.name === 'desktop') {
    await button(page, 'backend').hover();
    await expect(pause).toBeFocused();
    await expect(room(page)).toHaveAttribute('data-active', 'security');
  }
  await page.keyboard.press('Tab');
  await expect(page.getByRole('region', { name: 'Scrollable illustrative code' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(pause).toBeFocused();
  const outside = page.getByRole('link', { name: 'Explore My Projects', exact: true });
  await outside.focus();
  await expect(outside).toBeFocused();
  await expect(room(page)).toHaveAttribute('data-active', 'frontend');
});

test('an explicit choice remains active when the pointer explores other layers', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'Pointer previews use a fine pointer.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await show(page);
  await button(page, 'distributed').hover();
  await expect(room(page)).toHaveAttribute('data-active', 'distributed');
  await page.mouse.move(1, 1);
  await expect(room(page)).toHaveAttribute('data-active', 'frontend');
  await button(page, 'backend').click();
  await button(page, 'security').hover();
  await expect(room(page)).toHaveAttribute('data-active', 'backend');
  await expect(completeCode(page)).toHaveText(controlRoom.backend.examples[0].source);
});

test('the code types, holds for reading and loops within the selected layer', async ({ page }) => {
  await show(page);
  await display(page).scrollIntoViewIfNeeded();
  await expect(display(page)).toHaveAttribute('data-code-running', 'true');
  await expect.poll(() => count(page)).toBeGreaterThan(0);
  expect(await count(page)).toBeGreaterThan(0);
  expect(await count(page)).toBeLessThan(controlRoom.frontend.examples[0].source.length);
  await expect(display(page)).toHaveAttribute('data-code-phase', 'holding', { timeout: 8000 });
  const complete = await count(page);
  // Measure the actual reading pause; React schedules each next character in
  // a passive effect, so bulk virtual-time jumps do not model the typing loop.
  await page.waitForTimeout(1800);
  expect(await count(page)).toBe(complete);
  await expect(page.locator('.control-code-file')).toHaveText('field.jsx', { timeout: 5000 });
  await expect(button(page, 'frontend')).toHaveAttribute('aria-pressed', 'true');
  // Record the new display's initial buffer at mount, before time can elapse
  // between a real click and the following assertion.
  await page.evaluate(() => {
    window.controlRestartCounts = [];
    const observer = new MutationObserver(records => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node instanceof Element && node.matches('.discipline-code-console')) {
          window.controlRestartCounts.push(Number(node.dataset.codeCount));
          observer.disconnect();
        }
      }
    });
    observer.observe(document.querySelector('.control-room-instrument'), { childList: true });
  });
  await button(page, 'frontend').click();
  await expect(page.locator('.control-code-file')).toHaveText('interface.jsx');
  expect(await page.evaluate(() => window.controlRestartCounts)).toEqual([0]);
});

test('pause and resume retain the buffer and pause persists across discipline changes', async ({ page }) => {
  await trackClock(page);
  await show(page);
  await display(page).scrollIntoViewIfNeeded();
  await expect(display(page)).toHaveAttribute('data-code-running', 'true');
  await page.clock.runFor(500);
  const pause = page.getByRole('button', { name: 'Pause code animation' });
  await pause.focus();
  await pause.press('Enter');
  await expect(display(page)).toHaveAttribute('data-code-running', 'false');
  const frozen = await count(page);
  await page.clock.runFor(10000);
  expect(await count(page)).toBe(frozen);
  expect(await page.evaluate(() => window.controlTimers.size)).toBe(0);
  await page.getByRole('button', { name: 'Resume code animation' }).press('Space');
  await page.clock.runFor(500);
  expect(await count(page)).toBeGreaterThan(frozen);
  await page.getByRole('button', { name: 'Pause code animation' }).click();
  await button(page, 'security').click();
  await expect(page.getByRole('button', { name: 'Resume code animation' })).toHaveAttribute('aria-pressed', 'true');
  await expect(completeCode(page)).toHaveText(controlRoom.security.examples[0].source);
});

test('leaving the viewport or hiding the document suspends playback and route changes release its timer', async ({ page }) => {
  await trackClock(page);
  await page.goto('./#/');
  await expect(display(page)).toHaveAttribute('data-code-running', 'false');
  await page.clock.runFor(1000);
  expect(await count(page)).toBe(0);
  await display(page).scrollIntoViewIfNeeded();
  await expect(display(page)).toHaveAttribute('data-code-running', 'true');
  await page.clock.runFor(400);
  await page.evaluate(() => { window.controlDocumentHidden = true; document.dispatchEvent(new Event('visibilitychange')); });
  await expect(display(page)).toHaveAttribute('data-code-running', 'false');
  const hidden = await count(page);
  await page.clock.runFor(5000);
  expect(await count(page)).toBe(hidden);
  expect(await page.evaluate(() => window.controlTimers.size)).toBe(0);
  await page.evaluate(() => { window.controlDocumentHidden = false; document.dispatchEvent(new Event('visibilitychange')); });
  await expect(display(page)).toHaveAttribute('data-code-running', 'true');
  await page.clock.runFor(400);
  expect(await count(page)).toBeGreaterThan(hidden);
  await page.evaluate(() => scrollTo(0, 0));
  await expect(display(page)).toHaveAttribute('data-code-running', 'false');
  const outside = await count(page);
  await page.clock.runFor(5000);
  expect(await count(page)).toBe(outside);
  await display(page).scrollIntoViewIfNeeded();
  await expect(display(page)).toHaveAttribute('data-code-running', 'true');
  await page.goto('./#/contact');
  await expect(display(page)).toHaveCount(0);
  expect(await page.evaluate(() => window.controlTimers.size)).toBe(0);
});

test('reduced motion immediately completes the code and stops every continuous gesture', async ({ page }) => {
  await show(page);
  await display(page).scrollIntoViewIfNeeded();
  await expect(display(page)).toHaveAttribute('data-code-running', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(display(page)).toHaveAttribute('data-code-running', 'false');
  await expect(page.locator('.control-code-visual')).toContainText('ProjectLink');
  await expect(page.getByRole('button', { name: 'Pause code animation' })).toBeDisabled();
  expect(await room(page).evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
  await button(page, 'backend').focus();
  await button(page, 'backend').press('Enter');
  await expect(completeCode(page)).toHaveText(controlRoom.backend.examples[0].source);
  await expect(room(page).locator('[aria-live]')).toHaveCount(0);
  await expect(page.locator('.control-code-visual')).toHaveAttribute('aria-hidden', 'true');
});

for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  test(`control room is readable and contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await show(page);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const boxes = await room(page).locator('.discipline-node').evaluateAll(nodes => nodes.map(node => {
      const box = node.getBoundingClientRect();
      return { x: box.x, y: box.y, w: box.width, h: box.height };
    }));
    expect(boxes.every(box => box.w >= 140 && box.h >= 44)).toBe(true);
    if (width < 640) {
      expect(boxes[0].y).toBe(boxes[1].y);
      expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
    } else expect(boxes[0].y).toBe(boxes[3].y);
    const code = page.locator('.control-code-visual');
    expect(await code.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(13);
    expect(await room(page).evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    await expect(page.getByRole('img', { name: 'Portrait of Sultan Shah' })).toHaveAttribute('src', '/portfolio/images/profile-img.png');
  });
}
