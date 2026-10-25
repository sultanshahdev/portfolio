import { test, expect } from '@playwright/test';

const family = ['archie', 'daemon', 'forge', 'keeper', 'pixel', 'relay', 'scout', 'sentinel'];
const projects = { c2g: 'relay', clara: 'keeper', 'soar-lite': 'sentinel', codecraft: 'scout' };

async function settled(cameo) {
  await expect(cameo).not.toHaveAttribute('data-mascot-state', 'acting');
}

test('eight residents occupy their intended sections without adding focus stops', async ({ page }) => {
  await page.goto('./#/');
  expect(await page.locator('[data-character]').evaluateAll(elements => [...new Set(elements.map(el => el.dataset.character))].sort())).toEqual(family);
  await expect(page.getByRole('img', { name: 'Archie, a software architecture companion' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Pixel, a frontend engineering companion' })).toBeVisible();
  for (const [slug, character] of Object.entries(projects)) {
    await expect(page.locator(`[data-project="${slug}"] [data-character="${character}"]`)).toHaveCount(1);
  }
  await expect(page.locator('.education-learning [data-character="archie"]')).toHaveAttribute('data-pose', 'reading');
  await expect(page.locator('.community-leadership [data-character="relay"]')).toHaveAttribute('data-pose', 'community');
  await expect(page.locator('.site-footer [data-character="forge"]')).toHaveAttribute('data-pose', 'resting');
  await expect(page.locator('.mascot-cameo button, .mascot-cameo a, .mascot-cameo [tabindex]')).toHaveCount(0);
  for (const svg of await page.locator('.engineering-mascot').all()) await expect(svg).toHaveAttribute('focusable', 'false');
  const titles = await page.locator('.engineering-mascot title').evaluateAll(elements => elements.map(el => el.id));
  expect(new Set(titles).size).toBe(titles.length);
  for (const svg of await page.locator('.project-resident svg').all()) await expect(svg).toHaveAttribute('aria-hidden', 'true');
});

test('each domain has a finite accessory action and hover can replay it', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'Real hover actions run with a fine pointer.');
  await page.goto('./#/');
  const cases = [
    ['pixel', '.discipline-resident .mascot-cameo', 'pixel-arrange-a'],
    ['archie', '.hero-resident .mascot-cameo', 'archie-unfold'],
    ['relay', '[data-project="c2g"] .mascot-cameo', 'relay-deliver'],
    ['keeper', '[data-project="clara"] .mascot-cameo', 'keeper-open'],
    ['sentinel', '[data-project="soar-lite"] .mascot-cameo', 'sentinel-inspect'],
    ['scout', '[data-project="codecraft"] .mascot-cameo', 'scout-inspect'],
    ['daemon', '.expertise-category [data-character="daemon"]', 'daemon-request', 'BACKEND FRAMEWORKS'],
    ['forge', '.expertise-category [data-character="forge"]', 'forge-tighten', 'DEVOPS & INFRASTRUCTURE'],
  ];
  for (const [character, selector, animation, category] of cases) {
    if (category) await page.getByRole('button', { name: category, exact: true }).click();
    const cameo = page.locator(selector);
    await cameo.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await settled(cameo);
    await cameo.hover();
    await expect(cameo).toHaveAttribute('data-mascot-state', 'acting');
    expect(await cameo.evaluate(el => el.getAnimations({ subtree: true }).map(item => item.animationName)), character).toContain(animation);
    await settled(cameo);
    expect(await cameo.evaluate(el => el.getAnimations({ subtree: true }).filter(item => item.playState === 'running').length)).toBe(0);
  }
});

test('genuine contact links animate the pair through keyboard focus', async ({ page }) => {
  for (const route of ['/', '/contact']) {
    await page.goto(`./#${route}`);
    const scope = page.locator(route === '/' ? '.contact-section' : '.contact-page');
    await scope.scrollIntoViewIfNeeded();
    const residents = scope.locator('.mascot-cameo');
    await expect(residents).toHaveCount(2);
    for (const cameo of await residents.all()) await settled(cameo);
    await scope.getByRole('link').first().focus();
    for (const cameo of await residents.all()) await expect(cameo).toHaveAttribute('data-mascot-state', 'acting');
    await page.keyboard.press('Tab');
    await expect(scope.getByRole('link').nth(1)).toBeFocused();
    await expect(scope.locator('.mascot-scene')).toHaveAttribute('aria-hidden', 'true');
  }
});

test('reduced motion cancels an action and keeps complete static illustrations', async ({ page }) => {
  await page.goto('./#/');
  const scope = page.locator('.contact-section');
  await scope.scrollIntoViewIfNeeded();
  for (const cameo of await scope.locator('.mascot-cameo').all()) await settled(cameo);
  await scope.getByRole('link').first().focus();
  await expect(scope.locator('[data-character="relay"]')).toHaveAttribute('data-mascot-state', 'acting');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const cameo of await scope.locator('.mascot-cameo').all()) {
    await settled(cameo);
    await expect(cameo).toBeVisible();
  }
  expect(await page.locator('.mascot-cameo').evaluateAll(elements => elements.reduce((count, el) => count + el.getAnimations({ subtree: true }).length, 0))).toBe(0);
  await page.getByRole('button', { name: 'BACKEND FRAMEWORKS', exact: true }).click();
  await expect(page.locator('.expertise-category [data-character="daemon"]')).toBeVisible();
  await expect(page.locator('.site-footer [data-character="forge"]')).toHaveAttribute('data-mascot-motion', 'off');
});

test('filtering and navigation release observed mascot elements', async ({ page }) => {
  await page.addInitScript(() => {
    const Native = window.IntersectionObserver;
    window.mascotObservers = [];
    window.IntersectionObserver = class extends Native {
      targets = new Set();
      constructor(...args) { super(...args); window.mascotObservers.push(this); }
      observe(element) { this.targets.add(element); super.observe(element); }
      unobserve(element) { this.targets.delete(element); super.unobserve(element); }
      disconnect() { this.targets.clear(); super.disconnect(); }
    };
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./#/projects');
  for (const category of ['Security Engineering', 'All']) {
    await page.getByRole('button', { name: category, exact: true }).click();
    await expect.poll(() => page.evaluate(() => window.mascotObservers.flatMap(observer => [...observer.targets]).filter(element => element.dataset.character).every(element => element.isConnected))).toBe(true);
  }
  await page.goto('./#/contact');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contact');
  await expect.poll(() => page.evaluate(() => window.mascotObservers.flatMap(observer => [...observer.targets]).filter(element => element.dataset.character).every(element => element.isConnected))).toBe(true);
  expect(errors).toEqual([]);
});

for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  test(`residents stay inside ${width}px and leave controls and headings clear`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const collisions = await page.evaluate(() => {
      const controls = [...document.querySelectorAll('main a, main button, footer a, footer button')].filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden').map(el => ({ name: el.textContent.trim(), rect: el.getBoundingClientRect() }));
      const text = [...document.querySelectorAll('.intro-headline, .intro-name, .section-heading h2, .academic-title, .leadership-title')].flatMap(el => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        const boxes = [];
        while (walker.nextNode()) {
          const range = document.createRange(); range.selectNodeContents(walker.currentNode);
          boxes.push(...[...range.getClientRects()].map(rect => ({ name: el.textContent.trim(), rect })));
        }
        return boxes;
      });
      const hits = [];
      for (const cameo of document.querySelectorAll('.mascot-cameo')) {
        if (cameo.closest('[inert]')) continue;
        const rect = cameo.querySelector('svg > g').getBoundingClientRect();
        if (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1) hits.push(`${cameo.dataset.character}: outside viewport`);
        for (const target of [...controls, ...text]) {
          const overlapX = Math.min(rect.right, target.rect.right) - Math.max(rect.left, target.rect.left);
          const overlapY = Math.min(rect.bottom, target.rect.bottom) - Math.max(rect.top, target.rect.top);
          if (overlapX > 2 && overlapY > 2) hits.push(`${cameo.dataset.character}: ${target.name}`);
        }
      }
      return hits;
    });
    expect(collisions).toEqual([]);
  });
}
