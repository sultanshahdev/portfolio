import { test, expect } from '@playwright/test';
import { projects } from '../src/data/projects.js';

const slugs = ['c2g', 'clara', 'soar-lite', 'codecraft'];
const legacy = ['activity-tracker-node', 'edith', 'finance-tracker', 'activity-tracker-java', 'tic-tac-toe', 'javascript-data-structures', 'expression-parsing', 'python-data-labs'];

test('homepage and archive publish exactly the canonical projects and links', async ({ page }) => {
  expect(projects.map((p) => p.slug)).toEqual(slugs);
  for (const route of ['/', '/projects']) {
    await page.goto(`./#${route}`);
    const collection = page.locator('.project-list');
    await expect(collection.locator('.project-entry')).toHaveCount(4);
    expect(await collection.locator('.project-entry').evaluateAll((entries) => entries.map((e) => e.dataset.project))).toEqual(slugs);
    for (const project of projects) {
      const entry = collection.locator(`[data-project="${project.slug}"]`);
      await expect(entry.getByRole('link', { name: /^Read case study:/ })).toHaveAttribute('href', `#/projects/${project.slug}`);
      await expect(entry.getByRole('link', { name: /^GitHub source:/ })).toHaveAttribute('href', project.repositoryUrl);
      await expect(entry.getByRole('link', { name: /Live demo/ })).toHaveCount(project.demoUrl ? 1 : 0);
    }
    await expect(collection.getByText(/EDITH|Activity Tracker|FinanceTracker|Tic-Tac-Toe/)).toHaveCount(0);
  }
});

test('old detail slugs use the existing not found page', async ({ page }) => {
  for (const slug of legacy) {
    await page.goto(`./#/projects/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page isn’t here.');
  }
});

for (const project of projects) {
  test(`${project.slug}: diagrams, source downloads, milestones and chapter navigation`, async ({ page }, testInfo) => {
    await page.goto(`./#/projects/${project.slug}`);
    const toc = page.getByRole('navigation', { name: 'On this page' });
    await expect(toc).toBeVisible();
    await expect(page.locator('.project-qualification')).toContainText(project.status);
    await expect(page.locator('.project-qualification')).toContainText(project.qualification);
    await expect(page.locator('.engineering-timeline > li').first()).toBeAttached();
    await expect(page.locator('.technical-diagram')).toHaveCount({ c2g: 19, clara: 7, 'soar-lite': 12, codecraft: 16 }[project.slug]);
    const details = toc.locator('details');
    if (testInfo.project.name === 'mobile') {
      await expect(details).not.toHaveAttribute('open', '');
      await details.locator('summary').focus();
      await page.keyboard.press('Enter');
    }
    const architecture = toc.getByRole('link').filter({ hasText: /architecture|System architecture/i }).first();
    const target = (await architecture.getAttribute('href')).split('#').at(-1);
    await architecture.click();
    await expect(page).toHaveURL(new RegExp(`/projects/${project.slug}#${target}$`));
    await expect(page.locator(`[id="${target}"]`)).toBeFocused();
    await expect(architecture).toHaveAttribute('aria-current', 'location');
    await page.reload();
    await expect(page.locator(`[id="${target}"]`)).toBeFocused();
    const diagram = page.locator('.technical-diagram').first();
    await diagram.scrollIntoViewIfNeeded();
    const image = diagram.locator('img');
    await expect.poll(() => image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
    await expect(diagram.locator('.diagram-scroll')).toHaveCSS('overflow-x', 'auto');
    const fit = diagram.getByRole('button', { name: 'Fit width' });
    await fit.click();
    await expect(fit).toHaveAttribute('aria-pressed', 'true');
    expect(await image.evaluate((img) => img.getBoundingClientRect().width <= img.parentElement.clientWidth)).toBeTruthy();
    await fit.click();
    await expect(fit).toHaveAttribute('aria-pressed', 'false');
    const source = diagram.getByText('Read diagram source', { exact: true });
    await source.click();
    await expect(diagram.locator('pre')).toContainText(/flowchart|sequenceDiagram|stateDiagram|erDiagram/);
    const download = page.locator('.publication-sources .source-files a').first();
    const response = await page.request.get(await download.getAttribute('href'));
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain(project.title === 'Clara' ? '# Clara' : project.title);
    await page.getByRole('link', { name: 'Back to top' }).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${project.slug}#case-study-top$`));
  });
}

test('c2g decisions and evidence stay accessible through deep links', async ({ page }) => {
  await page.goto('./#/projects/c2g#architecture-decisions-16-records');
  const appendix = page.locator('.case-study-appendix').first();
  await expect(appendix).toHaveAttribute('open', '');
  await expect(appendix.getByRole('heading', { name: /ADR-/ })).toHaveCount(16);
  await expect(appendix).toContainText('G6 PARTIAL');
  const evidenceLink = page.getByRole('navigation', { name: 'On this page' }).getByRole('link', { name: /Technical evidence register/ });
  if (!(await evidenceLink.isVisible())) await page.locator('.case-study-toc summary').click();
  await evidenceLink.click();
  await expect(page.locator('.case-study-appendix').nth(1)).toHaveAttribute('open', '');
});

test('an unavailable SVG displays readable source and download recovery', async ({ page }) => {
  await page.route('**/projects/clara/diagrams/*.svg', (route) => route.abort());
  await page.goto('./#/projects/clara');
  const diagram = page.locator('.technical-diagram').first();
  await diagram.scrollIntoViewIfNeeded();
  await expect(diagram.getByRole('status')).toContainText('complete Mermaid source');
  await expect(diagram.locator('pre')).toBeVisible();
  await expect(diagram.locator('pre')).toContainText('flowchart LR');
  await expect(diagram.getByRole('link', { name: 'Download Mermaid source' })).toBeVisible();
});

for (const width of [360, 390, 768, 1280]) {
  test(`all projects fit at ${width}px with scrollable technical content`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/projects', ...slugs.map((slug) => `/projects/${slug}`)]) {
      await page.goto(`./#${route}`);
      await expect(page.locator('main h1')).toHaveCount(1);
      if (route.startsWith('/projects/')) await expect(page.locator('#publication-sources')).toBeAttached();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const scroll of await page.locator('.technical-table, .diagram-scroll').all()) await expect(scroll).toHaveCSS('overflow-x', 'auto');
    }
  });
}
