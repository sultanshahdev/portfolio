import { test, expect } from '@playwright/test';

test('homepage presents formal education, independent learning, then all four community roles', async ({ page }) => {
  await page.goto('./#/');
  const sections = await page.locator('main > section').evaluateAll((entries) => entries.map((entry) => entry.getAttribute('aria-labelledby')));
  expect(sections.slice(-3)).toEqual(['education', 'community', 'get-in-touch']);
  await expect(page.getByRole('heading', { name: 'Experience & learning', exact: true })).toHaveCount(0);
  const education = page.getByRole('region', { name: 'Education & learning' });
  await expect(education.getByRole('heading', { level: 3 })).toHaveText([
    'Bachelor of Science in Computer Science', 'Full-Stack Development',
  ]);
  await expect(education).toContainText('2024–2028');
  await expect(education).toContainText('In progress · Expected 2028');
  const odin = education.getByRole('article', { name: 'Full-Stack Development' });
  await expect(odin).toContainText('Self-directed learning program');
  await expect(odin).toContainText('October 2025–Present');
  await expect(odin.locator('.location-meta')).toHaveCount(0);
  const community = page.getByRole('region', { name: 'Community & leadership' });
  await expect(community.getByRole('heading', { level: 3 })).toHaveText([
    'Case Competition Participant', 'Campus Ambassador',
    'Technical Events & Hackathons Coordinator', 'MUN & Public Speaking Programs Organizer',
  ]);
  await expect(community.locator('.location-meta strong')).toHaveText(['Lahore', 'Karachi', 'Sukkur', 'Sukkur']);
  await expect(community.locator('.journey-date')).toHaveText([
    'February 2026 1 month', 'January 2025 – February 2025 2 months',
    'September 2025 – May 2026 9 months', 'August 2025 – May 2026 10 months',
  ]);
  await expect(community.locator('.journey-description')).toHaveText([
    'Participated in the LUMS Case Competition alongside more than 200 teams from Pakistan and abroad during a four-day case challenge.',
    'Served as an official Brand Ambassador of Sukkur IBA University at a national-level event organized by FAST-NUCES Karachi.',
    'Organized and executed hackathons, e-sports competitions, and technical events for student communities.',
    'Organized a province-level Model United Nations event, managing planning and logistics in coordination with multiple institutions.',
  ]);
  await expect(community.locator('.leadership-highlights')).toHaveCount(3);
  await expect(community.locator('.leadership-highlights > li')).toHaveText([
    'Worked collaboratively to analyze complex business scenarios and develop strategic recommendations under time constraints.',
    'Presented and defended the team’s solution before consulting professionals.',
    'Introduced ideas and process improvements to strengthen event structure and participation.',
    'Collaborated with team members to deliver engaging, well-managed experiences and contributed to increasing student involvement in technology-driven initiatives.',
    'Led sponsorship outreach, engaging companies for partnerships and event support.',
    'Contributed to public speaking competitions and book club initiatives encouraging communication and critical thinking.',
  ]);
  const ambassador = community.getByRole('article', { name: 'Campus Ambassador' });
  await expect(ambassador.locator('.leadership-organization')).toHaveText('Event host · FAST-NUCES, Karachi Campus');
  await expect(ambassador.locator('.leadership-emphasis')).toHaveText('Representing Sukkur IBA University');
});

test('verified institutional images load from the deployment base and keep their monochrome treatment', async ({ page }) => {
  await page.goto('./#/');
  const images = page.locator('.education-learning img, .community-leadership img');
  await expect(images).toHaveCount(6);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveAttribute('src', /^\/portfolio\/images\/organizations\//);
    await expect(image).toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
    expect(await image.evaluate((img) => getComputedStyle(img).filter)).toContain('grayscale(1)');
    await expect(image).toHaveCSS('object-fit', 'contain');
  }
  await expect(page.locator('.organization-logo--sukkur-iba-cs img')).toHaveAttribute('src', '/portfolio/images/organizations/cs.png');
  await expect(page.locator('.organization-logo--pslc img')).toHaveAttribute('src', '/portfolio/images/organizations/pslc.jpeg');
  await expect(page.locator('.community-leadership .organization-monogram')).toHaveCount(0);
});

test('a missing organization image preserves its identity and academic layout', async ({ page }) => {
  await page.route('**/images/organizations/sukkur-iba.png', (route) => route.abort());
  await page.goto('./#/');
  const education = page.getByRole('region', { name: 'Education & learning' });
  await education.scrollIntoViewIfNeeded();
  await expect(education.locator('.organization-monogram')).toHaveText('IBA');
  await expect(education.getByRole('link', { name: 'Sukkur IBA University' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const width of [1440, 1280, 768, 390, 360]) {
  test(`education and community remain readable and keyboard accessible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/');
    await page.evaluate(() => document.fonts.ready);
    for (const selector of ['.education-learning', '.community-leadership']) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      expect(await section.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      for (const heading of await section.getByRole('heading', { level: 3 }).all()) {
        await expect(heading).toBeVisible();
        expect(await heading.evaluate((element) => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(20);
      }
    }
    const entries = await page.locator('.leadership-entry').all();
    for (const [index, entry] of entries.entries()) {
      const insignia = await entry.locator('.leadership-insignia').boundingBox();
      const content = await entry.locator('.leadership-content').boundingBox();
      expect(insignia.width).toBeGreaterThanOrEqual(128);
      if (width >= 640) {
        if (index % 2 === 0) expect(insignia.x + insignia.width).toBeLessThanOrEqual(content.x);
        else expect(content.x + content.width).toBeLessThanOrEqual(insignia.x);
      } else {
        expect(insignia.y + insignia.height).toBeLessThanOrEqual(content.y);
      }
      await expect(entry.locator('.leadership-content')).toHaveCSS('text-align', 'start');
    }
    const link = page.getByRole('region', { name: 'Education & learning' }).getByRole('link', { name: 'Sukkur IBA University' });
    await link.focus();
    await page.keyboard.press('Tab');
    const odin = page.getByRole('link', { name: 'The Odin Project', exact: true });
    await expect(odin).toBeFocused();
    await expect(odin).toHaveCSS('outline-style', 'solid');
    expect((await odin.boundingBox()).height).toBeGreaterThanOrEqual(width < 640 ? 44 : 32);
    expect(await odin.evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
