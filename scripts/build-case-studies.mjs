import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { parse as parseYaml } from 'yaml';
import { projects } from '../src/data/projects.js';

const root = new URL('../', import.meta.url);
const parser = unified().use(remarkParse).use(remarkGfm);
const c2g = 'new-projects/c2g_portfolio_case_study/docs/portfolio/';
const soar = 'new-projects/SOAR_Lite_Case_Study/';
const inputs = {
  c2g: { main: `${c2g}C2G_ENGINEERING_CASE_STUDY.md`, appendices: [`${c2g}C2G_ARCHITECTURE_DECISIONS.md`, `${c2g}C2G_TECHNICAL_EVIDENCE.md`], supporting: [`${c2g}C2G_PAGE_PRESENTATION.md`, `${c2g}DIAGRAM_INDEX.md`, 'new-projects/c2g_portfolio_case_study/README_PORTFOLIO_PACKAGE.md'] },
  clara: { main: 'new-projects/CLARA_CASE_STUDY.md', appendices: [] },
  'soar-lite': { main: `${soar}SOAR_LITE_CASE_STUDY.md`, appendices: [`${soar}SOAR_LITE_CASE_STUDY_EVIDENCE.md`], supporting: [`${soar}SOAR_LITE_CASE_STUDY_ASSETS.md`, `${soar}README_START_HERE.md`] },
  codecraft: { main: 'new-projects/CodeCraft_Engineering_Case_Study.md', appendices: [] },
};
export const digest = (value) => createHash('sha256').update(value).digest('hex');
const slugify = (value) => value.toLowerCase().replace(/^\d+[.\s]+/, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
const plain = (node) => node.value ?? (node.children || []).map(plain).join('');
let browser;
let page;
let failed = 0;
const checkOnly = process.argv.includes('--check');
const refresh = process.argv.includes('--refresh');
const generatorHash = digest(await readFile(new URL(import.meta.url)));
const mermaidVersion = JSON.parse(await readFile(new URL('node_modules/mermaid/package.json', root))).version;

async function renderDiagram(source, id) {
  if (!browser) {
    browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}) });
    page = await browser.newPage();
    await page.setContent('<!doctype html><html><body></body></html>');
    await page.addScriptTag({ path: new URL('node_modules/mermaid/dist/mermaid.min.js', root).pathname });
    await page.evaluate(() => window.mermaid.initialize({
      startOnLoad: false, securityLevel: 'strict', theme: 'base', look: 'classic', deterministicIds: true,
      fontFamily: 'Arial, sans-serif', htmlLabels: false,
      themeVariables: {
        fontSize: '16px', primaryColor: '#f3f0ea', primaryTextColor: '#1f304b',
        primaryBorderColor: '#9c9790', secondaryColor: '#f3edea', tertiaryColor: '#faf8f5',
        lineColor: '#706c67', textColor: '#1f304b', mainBkg: '#f3f0ea',
        nodeBorder: '#9c9790', clusterBkg: '#faf8f5', clusterBorder: '#c6c0b7',
        actorBkg: '#f3f0ea', actorBorder: '#9c9790', actorTextColor: '#1f304b',
        signalColor: '#706c67', signalTextColor: '#1f304b', labelBoxBkgColor: '#f3f0ea',
        labelTextColor: '#1f304b', noteBkgColor: '#f1e8e4', noteBorderColor: '#bda8a2',
        noteTextColor: '#1f304b', edgeLabelBackground: '#faf8f5',
      },
      flowchart: { htmlLabels: false, useMaxWidth: false, wrappingWidth: 260, padding: 18 },
      sequence: { useMaxWidth: false, wrap: true },
    }));
  }
  // Override only source-specific paint; relationships and labels are unchanged.
  let neutralSource = source.replace(/classDef (\w+) [^;]+;/g, 'classDef $1 fill:#f3edea,stroke:#8a514e,color:#1f304b;');
  // Mermaid sequence labels require entity-escaped semicolons. Keep originals
  // in the downloadable source; this changes neither label text nor topology.
  if (source.startsWith('sequenceDiagram')) neutralSource = neutralSource.replaceAll(';', '#59;');
  return page.evaluate(async ({ source, id }) => {
    const { svg } = await window.mermaid.render(id, source);
    const parsed = new DOMParser().parseFromString(svg, 'image/svg+xml').documentElement;
    const box = parsed.getAttribute('viewBox').split(/[ ,]+/).map(Number);
    parsed.removeAttribute('style');
    parsed.setAttribute('width', Math.ceil(box[2]));
    parsed.setAttribute('height', Math.ceil(box[3]));
    // Start wide flowcharts at their first source node, which can be far from
    // the canvas midpoint in asymmetric architectures. This keeps the entry
    // point visible on narrow screens without shrinking any labels.
    document.body.append(parsed);
    const entry = parsed.querySelector('g.node');
    const entryBox = entry?.getBoundingClientRect();
    const svgBox = parsed.getBoundingClientRect();
    const focusX = entryBox ? (entryBox.left + entryBox.width / 2 - svgBox.left) / svgBox.width : 0.5;
    const output = new XMLSerializer().serializeToString(parsed);
    parsed.remove();
    return { svg: output, width: Math.ceil(box[2]), height: Math.ceil(box[3]), focusX };
  }, { source: neutralSource, id });
}

function publication(source) {
  let metadata = {};
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (frontmatter) { metadata = parseYaml(frontmatter[1]); source = source.slice(frontmatter[0].length); }
  const notes = [];
  // Keep authoring instructions available, outside the engineering narrative.
  source = source.replace(/^(?:> \*\*Hero asset:|\*\*(?:Hero media:|Featured visual:|Evidence assets to add:|Suggested portfolio evidence:|Publishing checklist:))[^\n]*(?:\n|$)/gm, (note) => { notes.push(note.trim()); return ''; });
  source = source.replace(/^### Screenshot plan for the portfolio page\n[\s\S]*?(?=^## |^---\s*$)/m, (note) => { notes.push(note.trim()); return ''; });
  // The React hero supplies the only h1; retain all introductory body content.
  source = source.replace(/^# [^\n]+\n/m, '');
  return { metadata, markdown: source.trim(), notes };
}

try {
  for (const project of projects) {
    const input = inputs[project.slug];
    const paths = [input.main, ...input.appendices, ...(input.supporting || [])];
    const originals = await Promise.all(paths.map((path) => readFile(new URL(path, root), 'utf8')));
    const fingerprint = digest(JSON.stringify({ originals, generatorHash, mermaidVersion }));
    const output = new URL(`src/content/projects/${project.slug}.json`, root);
    let previous;
    try { previous = JSON.parse(await readFile(output, 'utf8')); } catch { /* First generation. */ }
    if (!refresh && previous?.fingerprint === fingerprint) {
      const artifacts = [
        ...previous.diagrams.flatMap((d) => [d.sourcePath, ...(d.src ? [d.src] : [])]),
        ...previous.sources.map((source) => source.url),
      ];
      const present = await Promise.all(artifacts.map(async (path) => { try { await access(new URL(`public/${path}`, root)); return true; } catch { return false; } }));
      if (present.every(Boolean) && previous.diagrams.every((diagram) => !diagram.error)) {
        console.log(`${project.slug}: ${previous.chapters.length} chapters, ${previous.diagrams.length} cached SVG diagrams`);
        continue;
      }
    }
    if (checkOnly) throw new Error(`${project.slug}: generated publication is stale or missing. Run npm run content:build and commit generated content/assets.`);
    const main = publication(originals[0]);
    const diagrams = [];
    const usedIds = new Set();
    const uniqueId = (title) => {
      const base = slugify(title) || 'chapter';
      let id = base;
      let index = 2;
      while (usedIds.has(id)) id = `${base}-${index++}`;
      usedIds.add(id);
      return id;
    };
    function chapters(markdown, appendix = false) {
      const nodes = parser.parse(markdown).children;
      const headings = nodes.filter((node) => node.type === 'heading' && node.depth === 2);
      const result = [];
      const add = (title, start, end) => {
        const body = markdown.slice(start, end).trim();
        if (!body) return;
        const id = uniqueId(title);
        result.push({ id, title: title.replace(/^\d+\.\s*/, ''), markdown: body, appendix,
          timeline: /development (?:chronology|history|strategy)|planning the engineering work/i.test(title) });
      };
      add('Introduction', 0, headings[0]?.position.start.offset ?? markdown.length);
      headings.forEach((heading, i) => add(plain(heading), heading.position.end.offset, headings[i + 1]?.position.start.offset ?? markdown.length));
      return result;
    }
    const narrative = chapters(main.markdown);
    const appendices = originals.slice(1, 1 + input.appendices.length).map((source, i) => {
      const clean = publication(source);
      const title = i === 0 && project.slug === 'c2g' ? 'Architecture decisions — 16 records' : 'Technical evidence register';
      return { id: uniqueId(title), title, chapters: chapters(clean.markdown, true) };
    });
    if (main.notes.length) appendices.push({ id: uniqueId('Media and editorial notes'), title: 'Media and editorial notes', chapters: chapters(main.notes.join('\n\n'), true) });
    const allChapters = [...narrative, ...appendices.flatMap((a) => a.chapters)];
    for (const chapter of allChapters) {
      const nodes = parser.parse(chapter.markdown).children;
      let heading = chapter.title;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.type === 'heading') heading = plain(node);
        if (node.type !== 'code' || node.lang !== 'mermaid') continue;
        const key = digest(node.value.trim()).slice(0, 16);
        if (diagrams.some((d) => d.key === key)) continue;
        const number = diagrams.length + 1;
        const following = nodes[i + 1];
        const caption = following?.type === 'paragraph' && /^Figure\s+\d/.test(plain(following)) ? plain(following) : `${heading} — source architecture / process diagram ${number}`;
        const base = `projects/${project.slug}/diagrams/${String(number).padStart(2, '0')}-${key}`;
        const diagram = { key, number, caption, source: node.value, sourcePath: `${base}.mmd`, src: null };
        await mkdir(new URL(`public/projects/${project.slug}/diagrams/`, root), { recursive: true });
        await writeFile(new URL(`public/${diagram.sourcePath}`, root), `${node.value}\n`);
        try {
          const rendered = await renderDiagram(node.value, `${project.slug.replaceAll('-', '')}Diagram${number}`);
          diagram.src = `${base}.svg`;
          diagram.width = rendered.width;
          diagram.height = rendered.height;
          diagram.focusX = rendered.focusX;
          await writeFile(new URL(`public/${diagram.src}`, root), rendered.svg);
        } catch (error) {
          diagram.error = String(error.message).slice(0, 350);
          console.error(`${project.slug} diagram ${number}: ${diagram.error}`);
          failed++;
        }
        diagrams.push(diagram);
      }
    }
    const sources = [];
    await mkdir(new URL(`public/projects/${project.slug}/sources/`, root), { recursive: true });
    for (let i = 0; i < paths.length; i++) {
      const filename = paths[i].split('/').at(-1);
      const url = `projects/${project.slug}/sources/${filename}`;
      await writeFile(new URL(`public/${url}`, root), originals[i]);
      sources.push({ filename, url, sha256: digest(originals[i]), original: paths[i] });
    }
    const data = { fingerprint, metadata: main.metadata, chapters: narrative, appendices, diagrams, sources };
    await writeFile(output, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`${project.slug}: ${narrative.length} chapters, ${appendices.length} appendices, ${diagrams.length} diagrams`);
  }
} finally { await browser?.close(); }
if (failed) { process.exitCode = 1; console.error(`${failed} diagrams need correction. Readable source fallbacks are preserved.`); }
