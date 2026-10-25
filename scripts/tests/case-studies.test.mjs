import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { projects, projectCategories } from '../../src/data/projects.js';

const root = new URL('../../', import.meta.url);
const parser = unified().use(remarkParse).use(remarkGfm);
const counts = { c2g: 19, clara: 7, 'soar-lite': 12, codecraft: 16 };
const read = (path) => readFile(new URL(path, root), 'utf8');

test('canonical collection has exactly four projects and only the documented demo', () => {
  assert.deepEqual(projects.map((p) => p.slug), Object.keys(counts));
  assert.equal(projectCategories.length, 4);
  assert.ok(projects.every((p) => p.featured && p.year === '2026'));
  assert.deepEqual(projects.filter((p) => p.demoUrl).map((p) => p.demoUrl), ['https://code-buster-f5d.pages.dev']);
});

for (const project of projects) {
  test(`${project.slug}: complete narrative, original sources and rendered diagrams`, async () => {
    const data = JSON.parse(await read(`src/content/projects/${project.slug}.json`));
    const chapters = [...data.chapters, ...data.appendices.flatMap((a) => a.chapters)];
    const published = chapters.map((chapter) => chapter.markdown).join('\n\n');
    const ids = [...chapters.map((c) => c.id), ...data.appendices.map((a) => a.id)];
    assert.equal(new Set(ids).size, ids.length, 'chapter anchors are unique');
    for (const source of data.sources) {
      const original = await read(source.original);
      assert.equal(await read(`public/${source.url}`), original, 'download is the unchanged original');
      assert.equal(createHash('sha256').update(original).digest('hex'), source.sha256);
    }
    const main = (await read(data.sources[0].original)).replace(/^---\n[\s\S]*?\n---\n/, '');
    for (const node of parser.parse(main).children) {
      // Headings become chapter titles. All substantive block content remains
      // verbatim, even media/editorial instructions moved into an appendix.
      if (node.type === 'heading' || node.type === 'thematicBreak') continue;
      const block = main.slice(node.position.start.offset, node.position.end.offset).trim();
      assert.ok(published.includes(block), `source block retained: ${block.slice(0, 100)}`);
    }
    assert.equal(data.diagrams.length, counts[project.slug]);
    for (const diagram of data.diagrams) {
      assert.ok(diagram.src && !diagram.error, diagram.error || 'missing SVG');
      const svg = await read(`public/${diagram.src}`);
      assert.match(svg, /<svg/);
      assert.doesNotMatch(svg, /Syntax error|<script|foreignObject/);
      assert.ok(diagram.width > 0 && diagram.height > 0);
      assert.equal((await read(`public/${diagram.sourcePath}`)).trim(), diagram.source.trim());
    }
    assert.ok(data.chapters.some((chapter) => chapter.timeline), 'source chronology receives timeline presentation');
  });
}

for (const [slug, directory] of [
  ['c2g', 'new-projects/c2g_portfolio_case_study/docs/portfolio/diagrams/'],
  ['soar-lite', 'new-projects/SOAR_Lite_Case_Study/diagrams/'],
]) {
  test(`${slug}: every separately supplied .mmd diagram is represented`, async () => {
    const data = JSON.parse(await read(`src/content/projects/${slug}.json`));
    const originals = await readdir(new URL(directory, root));
    for (const name of originals) {
      const source = (await read(`${directory}${name}`)).trim();
      assert.ok(data.diagrams.some((d) => d.source.trim() === source), `${name} is included`);
    }
  });
}
