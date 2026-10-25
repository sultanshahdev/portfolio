# Sultan Shah — Software Engineering Portfolio

A React + Vite portfolio inspired by Michele Riva’s narrow, typography-led personal website. It uses original React components and CSS, local content files, Lora, and Source Sans 3. No reference-site runtime, personal text, photographs, or bundled assets are used.

## Run locally

Use Node.js 22.12 or later and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally **http://127.0.0.1:5173/portfolio/**. The server binds to loopback by default. For testing from another device on your local network, run `npm run dev -- --host 0.0.0.0` and use your computer’s LAN address.

```sh
npm run build
npm run preview
```

The production bundle is written to `dist/`. Preview normally serves it at **http://127.0.0.1:4173/portfolio/**. Rebuild after changes before using preview. Opening `dist/index.html` directly with `file://` is not supported.

## Pages and content

| Route | Purpose |
| --- | --- |
| `/` | Biography, four featured projects, learning, technical focus, education, community, contact |
| `/projects` | Four flagship projects and working category filters |
| `/projects/:slug` | Reusable engineering case studies |
| `/writing` | Writing index with two explicitly labeled sample drafts |
| `/writing/:slug` | Articles with optional contents, prose, lists, code, diagrams, images, and references |
| `/contact` | Configured professional links |
| Any unknown route or slug | Accessible 404 with recovery links |

The active collection contains **c2g, Clara, SOAR Lite, and CodeCraft**. All four appear on the homepage and Projects page. Old detail slugs return the existing Not Found page. Full case studies preserve the supplied documents, historical evidence, limitations, code excerpts, and source links. The portfolio does not rerun the featured applications' test suites.

c2g credits the MIT-licensed P2PDocs upstream and retains G6 PARTIAL. Clara's concurrent counter totals describe correctness tests. SOAR Lite distinguishes real reputation lookup from simulated containment and manual verification from automated tests. CodeCraft distinguishes Node and browser capabilities and retains the live browser inference verification gap. Only CodeCraft has a documented public demo.

The sample writing has no invented publication dates and is marked `noindex` in the running application. Replace it with reviewed writing before presenting it as published work. A portrait and email address are currently configured; the résumé link remains unset.

## Organization

```text
src/
  App.jsx                 Route table and shared page layout
  main.jsx                React entry point and router base path
  components/
    layout/               Header, navigation, footer, route focus, metadata
    ui/                   Links, headings, category filters, empty states
    profile/              Biography, learning, education, focus, contact
    projects/             Project list, metadata, entry, case-study sources
    writing/              Writing entry and shared structured-content renderer
  pages/                  Page-level composition and route lookup
  data/                   Editable profile, projects, writing, experience, skills
  content/projects/       Generated, independently lazy-loaded publications
  lib/assets.js           Deployment-aware public asset paths
  styles/                 Tokens, global rules, typography, layout
scripts/                  Publication generator and source-integrity tests
new-projects/             Authoritative original project documentation
public/                   Favicon, font licenses, redirects, generated SVGs/sources
tests/                    Playwright navigation, responsive, and accessibility checks
docs/                     Reference analysis, source review, verification record
```

The app fetches no GitHub data at runtime. React Router handles navigation. Existing writing retains its structured-content renderer. Project publications use react-markdown with GitHub-flavored Markdown; raw HTML is skipped. Mermaid runs only during content generation and ships as static SVG images, with original source and a readable fallback. Neither Mermaid nor the long-form reader is loaded by the homepage.

## Edit the profile

Update `src/data/profile.js` for the name, title, introduction, biography, social links, education, and contact introduction. Update `index.html`’s default title and social metadata if changing the site owner. Set learning and community entries in `src/data/experience.js`, and focus areas in `src/data/skills.js`.

The `socials` array supplies the header-adjacent links, contact page, and footer. Use public, confirmed URLs. **The supplied `profile.js` currently sets `email` to an address that will become public on deployment.** Set it to `null` if you do not want your address published.

The current portrait is at `public/images/profile-img.png` and is configured in `src/data/profile.js` as:

```js
portrait: { src: '/images/profile-img.png', objectPosition: 'center' },
```

The component provides appropriate alt text and applies a square crop. Leave `portrait: null` for a text-only layout. URLs are routed through `assetUrl()` and automatically respect the GitHub Pages base path.

For a résumé, add a reviewed public document at `public/documents/resume.pdf`, then set `resumeUrl: 'documents/resume.pdf'`. Review its private information first. **Do not point this field at the LinkedIn reference PDF.**

## Edit projects and case studies

`src/data/projects.js` is the canonical collection. Its four records supply both listings and detail heroes: title, slug, subtitle, category, year, summary, technologies, role, status, verification qualification, highlights, repository/demo links, and an illustrative architecture signature. Filters derive from that collection. Keep every factual claim grounded in the supplied documents.

Edit the authoritative Markdown under `new-projects/`, then regenerate the publication:

```sh
npx playwright install chromium
npm run content:build
npm run test:content
npm run build
```

An installed Chromium can also be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Generation does not execute any code examples or project scripts. `scripts/build-case-studies.mjs` declares narrative, appendix, and supporting-document paths. It parses frontmatter, creates stable chapter IDs, retains the complete narrative, moves screenshot/authoring instructions to a disclosure, and publishes c2g's 16 architecture decisions and both evidence registers as appendices. Chronology tables become vertical milestones with their original text and source links.

The four generated `src/content/projects/*.json` files contain the publication and diagram manifest. `public/projects/<slug>/` contains rendered SVGs, original `.mmd` sources, and unchanged downloadable Markdown. **Commit the original `new-projects/` inputs, generated JSON, and generated public assets together.** These are publication sources/assets, not private `references/` material. No extracted ZIP or external service is required in CI.

`npm run build` runs `content:check` before Vite. It checks input/generator/renderer fingerprints and required generated artifacts. A stale or missing publication fails with a regeneration instruction. A normal clean-checkout Pages build uses committed SVGs and requires no installed browser. Mermaid syntax failures retain a readable source fallback and make generation fail. Sequence-label semicolons are escaped only for rendering, and source-specific colors are normalized to the portfolio palette; original source text remains unchanged.

To add another project later, add its metadata plus an input mapping to the generator, then regenerate. A shared lazy reader handles all projects; do not copy a page component. Main chapter IDs derive from headings (with duplicate suffixes), so changing a heading changes its deep link. Hash routes retain the chapter fragment, for example `/portfolio/#/projects/c2g#the-decentralized-architecture`.

There are no supplied product screenshots. Add only authentic reviewed captures, with descriptive alt text, captions and explicit dimensions; the Markdown renderer already supports images. Do not turn screenshot plans into invented product evidence. Wide diagrams and tables scroll independently; figures offer full-size SVG and source downloads. Their captions and full source are available if an image fails.

## Case-study and article blocks

Existing writing remains unchanged. Each structured article section has a unique `id`, an optional `title`, and `blocks`. Empty blocks and sections are hidden. Use stable section IDs for contents links.

| Type | Content fields |
| --- | --- |
| `prose` | `text` |
| `list` | `items: ['…']`, optional `ordered: true` |
| `code` | `code`, `language`, optional `caption` |
| `image` | `src`, `alt`, optional `width`, `height`, `caption` |
| `diagram` | `nodes: ['Input', 'Processing', 'Output']`, optional `caption` |
| `callout` | `title`, `text` |
| `metadata` | `items: [{ label: 'Runtime', value: 'Node.js' }]` |

Structured writing diagrams remain lightweight, accessible flow lists. Project diagrams use the separate static SVG publication pipeline described above. Code is rendered as escaped text in keyboard-scrollable blocks. Images load lazily. Keep code examples free of secrets.

## Add an article

Edit `src/data/writing.js`. Each item has `slug`, `title`, `category`, `status`, `publishedAt`, `abstract`, `showTableOfContents`, `sections`, and optional `references: [{ label, url }]`.

For published work, use `status: 'Published'` and its real ISO publication date (for example, `YYYY-MM-DD`). Drafts can leave `publishedAt: null`. `Sample draft` identifies demonstration content. Replace sample text and TODOs before changing its status. These structured blocks power writing; project case studies use the supplied Markdown documents.

## Colors and typography

Change `src/styles/tokens.css` for HSL colors, the 48rem content width, and font families. The reference palette is preserved, with muted text slightly darkened for small-text contrast. Typography and locally loaded font faces are in `typography.css`; responsive composition is in `layout.css`. Project-specific publication and showcase styles are scoped in `projects.css`.

Only the Latin variable WOFF2 files for Lora and Source Sans 3 are bundled, with `font-display: swap`. Both come from Fontsource packages under the SIL Open Font License. Their complete notices ship in `public/licenses/`. No font was taken from the downloaded website. If adding other writing systems, load the appropriate licensed font subsets too.

## Verification

Build first; the browser tests use Vite’s production preview:

```sh
npm run build
npx playwright install chromium
npm run test:content
npm test
```

Alternatively, reuse an installed compatible Chrome/Chromium:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npm test
```

Content tests check every substantive source block, unchanged downloads, unique anchors, all 54 generated diagrams, and the 31 standalone diagram sources. Browser tests cover the four canonical projects, legacy 404s, repository/demo links, chapter navigation/reload, appendices, timelines, image-failure fallback, and 360/390/768/1280px layouts, plus all pages and detail slugs at desktop and mobile sizes, resource/JavaScript errors, document titles, horizontal overflow, axe accessibility rules, keyboard filters, mobile navigation, history, direct-route reloads, draft labels, contact privacy defaults, and 404 recovery. Additional 320px checks cover code scrolling and reduced-motion preferences. These checks exercise this portfolio; they are **not test results for the featured repositories**. See `docs/VERIFICATION.md` for the executed results and limitations.

## Deploy to GitHub Pages

The production URL is https://sultanshahdev.github.io/portfolio/.
`vite.config.js` sets `base: '/portfolio/'`. The favicon, bundled fonts, scripts,
styles, and public asset helper use that base, including
`/portfolio/images/profile-img.png`.

The app uses `HashRouter`. Existing route definitions are unchanged; public URLs
include the hash, for example `/portfolio/#/projects/c2g` and
`/portfolio/#/writing/where-a-module-should-end`. Direct visits and refreshes
request the site root, so GitHub Pages needs no SPA fallback. Article contents
links retain their route, for example `#/writing/where-a-module-should-end#example`.
The existing `public/_redirects` file is ignored by GitHub Pages and is not required.

In the repository's **Settings → Pages → Build and deployment**, set **Source**
to **GitHub Actions**. `.github/workflows/deploy.yml` installs locked dependencies
with `npm ci`, builds with Node.js 22, uploads only `dist/`, and deploys using the
official GitHub Pages Actions. It runs on pushes to `main` or manually from Actions.
It uses GitHub's automatic token; no personal token or environment secret is needed.

The existing repository is `sultanshahdev/portfolio`. The workflow and Vite base remain unchanged by the case-study migration. Commit and push reviewed source changes through your usual Git workflow; this implementation does not push or publish changes automatically.

Do not include `references/`, your LinkedIn export PDF, `.env` files, `node_modules/`, `dist/`, or `test-results/` in commits. Push the **source project** to GitHub; the workflow publishes only the built `dist/` directory as your site.

After the workflow succeeds, verify the homepage and refresh a project and article
hash URL on the deployed site. Clean URLs such as `/portfolio/projects/c2g` are
not supported by GitHub Pages.

`references/`, downloaded reference snapshots, local PDFs, `node_modules/`, `dist/`,
and `.env*` files are ignored. To publish a reviewed public résumé later, explicitly
adjust the PDF ignore rule for that one file. The GitHub Pages workflow deploys `dist/`, not the repository root.

Default title/description/Open Graph tags are in `index.html`; route-specific values update in the browser. Social crawlers that do not execute JavaScript see the defaults. Per-article social previews or server-generated HTTP 404 responses would require a prerendering/hosting addition. No public domain, canonical URL, or deployment is invented.

## Reference and content notes

Read `docs/REFERENCE_ANALYSIS.md` for the extracted design system, `docs/PROJECT_MIGRATION.md` for the current source mapping and milestone/verification report, and `docs/SOURCE_REVIEW.md` for the historical review of the replaced collection. `references/`, `.env*`, generated builds, and browser artifacts are excluded from Git.

Optional future editorial work includes authentic project screenshots, author-written articles and a public résumé. The site does not require résumé or demo assets.
