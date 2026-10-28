import { chromium, expect } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
const root = 'artifacts/control-room';
const results = [];
const errors = [];
try {
  for (const width of [1440, 1280, 1024, 768, 390, 360]) {
    const page = await browser.newPage({ viewport: { width, height: width < 640 ? 844 : 1000 }, hasTouch: width < 640, isMobile: width < 640, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/portfolio/#/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${root}/hero-${width}.png` });
    const room = page.locator('.engineering-control-room');
    await room.scrollIntoViewIfNeeded();
    await room.screenshot({ path: `${root}/room-${width}.png`, style: '.site-header,.section-index,.page-progress{visibility:hidden}' });
    for (const name of ['Backend Engineering', 'Networking & Security']) {
      await page.getByRole('button', { name, exact: true }).click();
      if ([1440, 390].includes(width)) await room.screenshot({ path: `${root}/${name.startsWith('Backend') ? 'backend' : 'security'}-${width}.png`, style: '.site-header,.section-index,.page-progress{visibility:hidden}' });
    }
    const measures = await room.evaluate(element => ({
      height: element.getBoundingClientRect().height,
      pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      codeWidth: element.querySelector('.control-code-viewport').clientWidth,
      codeFont: getComputedStyle(element.querySelector('.control-code-visual')).fontSize,
      pixel: element.querySelector('.discipline-resident').getBoundingClientRect().toJSON(),
    }));
    results.push({ width, ...measures });
    await page.close();
  }
  console.log(JSON.stringify({ results, errors }, null, 2));
  await fs.writeFile(`${root}/review-results.json`, JSON.stringify({ results, errors }, null, 2) + '\n');
} finally { await browser.close(); }
