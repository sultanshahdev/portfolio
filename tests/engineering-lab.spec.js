import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { artifactCatalog, compressionSample } from '../src/data/lab.js';
import { projects } from '../src/data/projects.js';

const openLab = async page => {
  await page.getByRole('button', { name: 'Open Lab', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Compression Lab', exact: true })).toBeVisible();
};
const inputText = page => page.getByRole('textbox', { name: /Input text/ });
const compress = page => page.getByRole('button', { name: 'Compress text', exact: true });

test('the workbench loads on demand, traps focus and restores it on close', async ({ page }) => {
  const chunks = [];
  page.on('request', request => { if (/\/assets\/LabDrawer-.*\.js/.test(request.url())) chunks.push(request.url()); });
  await page.goto('./#/');
  expect(chunks).toEqual([]);
  await page.getByRole('button', { name: 'Open Lab', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(compress(page)).toBeVisible();
  expect(chunks.length).toBe(1);
  await expect(page.getByRole('button', { name: 'Close lab' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.activeElement.closest('dialog') !== null)).toBe(true);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close lab' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open Lab', exact: true })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  await openLab(page);
  await page.getByRole('button', { name: 'Close lab' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
  await openLab(page);
  expect(chunks.length).toBe(1);
});

test('gzip reports measured UTF-8 bytes, expansion, reduction and the empty stream', async ({ page }) => {
  await page.goto('./#/');
  await openLab(page);
  for (const value of [compressionSample, 'x', '', '🌍 دنیا'.repeat(10)]) {
    await inputText(page).fill(value);
    await expect(page.locator('[data-measure="compressed"]')).toHaveText('—');
    await compress(page).click();
    await expect(page.locator('.instrument-status')).toContainText('Round trip verified');
    const expected = await page.evaluate(async text => {
      const bytes = new TextEncoder().encode(text);
      const encoded = await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
      return { original: bytes.length, compressed: encoded.byteLength };
    }, value);
    await expect(page.locator('[data-measure="original"]')).toHaveText(`${expected.original} B`);
    await expect(page.locator('[data-measure="compressed"]')).toHaveText(`${expected.compressed} B`);
    await expect(page.locator('[data-measure="difference"]')).toContainText(`${Math.abs(expected.original - expected.compressed)} B ${expected.original >= expected.compressed ? 'smaller' : 'larger'}`);
    if (!value) await expect(page.locator('[data-measure="difference"]')).toContainText('Percentage undefined');
  }
  await page.getByRole('button', { name: 'Reset sample' }).click();
  await expect(inputText(page)).toHaveValue(compressionSample);
  await expect(page.locator('[data-measure="compressed"]')).toHaveText('—');
});

test('an unsupported browser shows accurate available information', async ({ page }) => {
  await page.addInitScript(() => { window.CompressionStream = undefined; });
  await page.goto('./#/');
  await openLab(page);
  await expect(compress(page)).toBeDisabled();
  await inputText(page).fill('🌍');
  await expect(page.locator('[data-measure="original"]')).toHaveText('4 B');
  await expect(page.locator('[data-measure="compressed"]')).toHaveText('—');
  await expect(page.locator('.instrument-status')).toContainText('Gzip is unavailable');
});

test('compression errors are recoverable and stale work cannot overwrite edited text', async ({ page }) => {
  await page.addInitScript(() => {
    window.NativeCompressionStream = window.CompressionStream;
    window.CompressionStream = class { constructor() { throw new Error('test unavailable'); } };
  });
  await page.goto('./#/');
  await openLab(page);
  await compress(page).click();
  await expect(page.locator('.instrument-status')).toContainText('Compression failed');
  await expect(page.locator('[data-measure="compressed"]')).toHaveText('—');
  await page.evaluate(() => {
    window.CompressionStream = class {
      constructor(format) {
        const native = new window.NativeCompressionStream(format);
        const delay = new TransformStream({ async transform(chunk, controller) {
          await new Promise(resolve => { window.releaseCompression = resolve; });
          controller.enqueue(chunk);
        } });
        return { writable: native.writable, readable: native.readable.pipeThrough(delay) };
      }
    };
  });
  await compress(page).click();
  await expect(page.getByRole('button', { name: 'Compressing…' })).toBeDisabled();
  await expect.poll(() => page.evaluate(() => typeof window.releaseCompression)).toBe('function');
  await inputText(page).fill('new input');
  await page.evaluate(() => window.releaseCompression());
  await expect(page.locator('[data-measure="compressed"]')).toHaveText('—');
  await expect(page.locator('.instrument-status')).toContainText('Ready.');
  await page.evaluate(() => { window.CompressionStream = window.NativeCompressionStream; });
  await compress(page).click();
  await expect(page.locator('.instrument-status')).toContainText('Round trip verified');
});

test('console commands are accurate, safe, keyboard operable and clearable', async ({ page }) => {
  await page.goto('./#/');
  await openLab(page);
  const command = page.getByRole('textbox', { name: 'Portfolio command' });
  const output = page.getByRole('log', { name: 'Console output' });
  for (const value of ['help', 'projects', 'skills', 'architecture', 'about']) {
    await command.fill(value);
    await command.press('Enter');
    await expect(command).toBeFocused();
  }
  for (const project of projects) await expect(output).toContainText(`${project.title} — ${project.subtitle}`);
  await expect(output).toContainText('23 categories / 512 listed skills');
  await expect(output).toContainText('HashRouter');
  await expect(output).toContainText('Sultan Shah');
  await command.press('ArrowUp');
  await expect(command).toHaveValue('about');
  await command.press('ArrowDown');
  await expect(command).toHaveValue('');
  await command.fill('<img src=x onerror=alert(1)>');
  await command.press('Enter');
  await expect(output).toContainText('Unknown command');
  await expect(output.locator('img, script')).toHaveCount(0);
  await command.fill('clear');
  await command.press('Enter');
  await expect(output).toBeEmpty();
});

test('all ten original artifacts, the blueprint and the workbench are accessible', async ({ page }) => {
  await page.goto('./#/');
  await openLab(page);
  await page.getByText('Parts drawer', { exact: true }).click();
  for (const artifact of artifactCatalog) {
    const svg = page.locator('.artifact-catalog').getByRole('img', { name: artifact.name, exact: true });
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute('viewBox', '0 0 160 160');
    await expect(svg).toHaveAttribute('focusable', 'false');
    const bounds = await svg.evaluate(element => {
      const box = element.querySelector('.artifact-glyph').getBBox();
      return { x: box.x, y: box.y, right: box.x + box.width, bottom: box.y + box.height };
    });
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(160);
    expect(bounds.bottom).toBeLessThanOrEqual(160);
  }
  const summary = page.locator('.engineering-blueprint > summary');
  await summary.focus();
  await summary.press('Enter');
  await expect(page.locator('.blueprint-body')).toBeVisible();
  await expect(page.locator('.blueprint-body')).toContainText('GitHub Pages');
  const audit = await new AxeBuilder({ page }).include('.lab-dialog').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
});

test('scene delivery settles, replays, and responds to a changed motion preference', async ({ page }) => {
  await page.goto('./#/');
  const scene = page.locator('.engineering-lab');
  const activate = page.getByRole('button', { name: 'Send a packet', exact: true });
  await activate.focus();
  await activate.press('Enter');
  await expect(scene).toHaveAttribute('data-lab-phase', 'running');
  await expect(activate).toBeDisabled();
  await expect(scene).toHaveAttribute('data-lab-phase', 'complete');
  await expect(scene.getByRole('status')).toContainText('Packet delivered');
  expect(await scene.evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length)).toBe(0);
  await activate.click();
  await expect(scene).toHaveAttribute('data-lab-phase', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(scene).toHaveAttribute('data-lab-phase', 'complete');
  await activate.click();
  await expect(scene).toHaveAttribute('data-lab-phase', 'complete');
  expect(await scene.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
});

test('new project hardware follows existing controls without duplicate interactions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/');
  for (const project of projects) {
    const exhibit = page.locator(`[data-project="${project.slug}"] .project-exhibit`);
    await expect(exhibit.getByRole('button')).toHaveCount(1);
    await expect(exhibit.locator('.exhibit-art > svg')).toBeVisible();
    if (project.slug === 'soar-lite') await expect(exhibit.locator('.project-lab-bench')).toHaveAttribute('data-bench-phase', 'idle');
    await exhibit.getByRole('button').click();
    await expect(exhibit.locator('.project-lab-bench')).toHaveAttribute('data-bench-phase', 'complete');
    expect(await exhibit.evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0);
    await expect(page.locator(`[data-project="${project.slug}"]`).getByRole('link', { name: /^Read case study:/ })).toHaveAttribute('href', `#/projects/${project.slug}`);
  }
  await expect(page.locator('.bench-clara [data-character="daemon"]')).toBeVisible();
  await expect(page.locator('.bench-codecraft mark')).toHaveText('return store.get(key);');
  await expect(page.locator('.bench-soar-lite')).toContainText('simulated response');
});

test('small discoveries decode meaningful information using native keyboard controls', async ({ page }) => {
  await page.goto('./#/');
  await page.locator('.study-workbench > summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.study-workbench-body')).toContainText('semantic analysis');
  const binary = page.locator('.binary-note > summary');
  await binary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.binary-note p')).toContainText('build — five UTF-8 bytes');
});

for (const width of [1440, 1280, 1024, 768, 390, 360, 320]) {
  test(`the workshop and optional instruments fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await expect(page.locator('.lab-world > svg')).toBeVisible();
    await openLab(page);
    for (const selector of ['.lab-dialog', '.compression-lab', '.engineering-console']) {
      expect(await page.locator(selector).evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    }
    await compress(page).click();
    await expect(page.locator('.instrument-status')).toContainText('Round trip verified');
    const failures = await page.evaluate(() => performance.getEntriesByType('resource').filter(entry => entry.name.includes(location.origin) && !new URL(entry.name).pathname.startsWith('/portfolio/')).map(entry => entry.name));
    expect(failures).toEqual([]);
  });
}
