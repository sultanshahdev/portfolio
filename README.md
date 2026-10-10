# Sultan Shah — Software Engineering Portfolio

A React + Vite portfolio inspired by Michele Riva’s narrow, typography-led personal website. It uses original React components and CSS, local content files, Lora, and Source Sans 3. No reference-site runtime, personal text, photographs, or bundled assets are used.

## Run locally

Use Node.js 22.12 or later and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally **http://127.0.0.1:5173/sultandev/**. The server binds to loopback by default. For testing from another device on your local network, run `npm run dev -- --host 0.0.0.0` and use your computer’s LAN address.

```sh
npm run build
npm run preview
```

The production bundle is written to `dist/`. Preview normally serves it at **http://127.0.0.1:4173/sultandev/**. Rebuild after changes before using preview. Opening `dist/index.html` directly with `file://` is not supported.

## Pages and content

| Route | Purpose |
| --- | --- |
| `/` | Biography, four featured projects, learning, technical focus, education, community, contact |
| `/projects` | Eight source-reviewed projects and working category filters |
| `/projects/:slug` | Reusable engineering case studies |
| `/writing` | Writing index with two explicitly labeled sample drafts |
| `/writing/:slug` | Articles with optional contents, prose, lists, code, diagrams, images, and references |
| `/contact` | Configured professional links |
| Any unknown route or slug | Accessible 404 with recovery links |

Project descriptions are based on source inspection, not claims that those applications were executed or certified. Case studies link to the exact reviewed revisions. FinanceTracker retains Khadija and Sultan’s attribution. The Odin Project is identified as self-directed education. No personal phone number or private profile PDF is published. The profile currently contains a configured public email address; review it before publishing.

The sample writing has no invented publication dates and is marked `noindex` in the running application. Replace it with reviewed writing before presenting it as published work. A portrait and email address are currently configured; résumé and demo links remain unset.

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
  lib/assets.js           Deployment-aware public asset paths
  styles/                 Tokens, global rules, typography, layout
public/                   Original favicon, font license notices, host redirects
tests/                    Playwright navigation, responsive, and accessibility checks
docs/                     Reference analysis, source review, verification record
```

The app fetches no GitHub data at runtime. React Router handles navigation; React state is limited to category selection and mobile navigation. Content is rendered as structured React elements, without raw HTML injection or a Markdown runtime.

## Edit the profile

Update `src/data/profile.js` for the name, title, introduction, biography, social links, education, and contact introduction. Update `index.html`’s default title and social metadata if changing the site owner. Set learning and community entries in `src/data/experience.js`, and focus areas in `src/data/skills.js`.

The `socials` array supplies the header-adjacent links, contact page, and footer. Use public, confirmed URLs. **The supplied `profile.js` currently sets `email` to an address that will become public on deployment.** Set it to `null` if you do not want your address published.

The current portrait is at `public/images/profile-img.png` and is configured in `src/data/profile.js` as:

```js
portrait: { src: '/images/profile-img.png', objectPosition: 'center' },
```

The component provides appropriate alt text and applies a square crop. Leave `portrait: null` for a text-only layout. URLs are routed through `assetUrl()` and automatically respect the GitHub Pages base path.

For a résumé, add a reviewed public document at `public/documents/resume.pdf`, then set `resumeUrl: 'documents/resume.pdf'`. Review its private information first. **Do not point this field at the LinkedIn reference PDF.**

## Add or edit a project

Add an object to the `projects` array in `src/data/projects.js`. Use a unique `id` and URL-safe `slug`. There is no page component to copy.

```js
{
  id: 'my-project',
  slug: 'my-project',
  title: 'My Project',
  subtitle: 'Short distinguishing description',
  category: 'Backend',
  year: '2026', // Only use a verified year.
  featured: false,
  status: 'Prototype',
  summary: 'An accurate description of the implementation.',
  technologies: ['JavaScript'],
  repositoryUrl: 'https://github.com/OWNER/REPOSITORY',
  verification: 'draft', // Use source-reviewed only after reviewing the source.
  reviewedAt: null,
  sourceCommit: null,
  sourceFiles: [],
  demoUrl: null,
  image: null,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [{ type: 'prose', text: 'TODO: Add a source-verified overview.' }],
    },
  ],
}
```

Set `featured: true` for homepage selection; aim for approximately four. The project index preserves array order. Existing category names live in `projectCategories`; unused categories are hidden. For a new category, add its name there too. Supply `attribution` for collaborative work.

The starter data uses a `review()` helper to attach repository URLs, commit hashes, review dates, and source files. For new reviewed projects, use the same helper with the actual revision. Review dates describe source inspection, not project completion. Starter project years follow repository creation history, not invented employment dates.

Leave demo URLs unset until the actual deployment is verified. An optional project image is an object with `src`, descriptive `alt`, `width`, `height`, and optional `caption`.

## Case-study and article blocks

Each section has a unique `id`, an optional `title`, and `blocks`. Empty blocks and sections are hidden. Use stable section IDs for contents links.

| Type | Content fields |
| --- | --- |
| `prose` | `text` |
| `list` | `items: ['…']`, optional `ordered: true` |
| `code` | `code`, `language`, optional `caption` |
| `image` | `src`, `alt`, optional `width`, `height`, `caption` |
| `diagram` | `nodes: ['Input', 'Processing', 'Output']`, optional `caption` |
| `callout` | `title`, `text` |
| `metadata` | `items: [{ label: 'Runtime', value: 'Node.js' }]` |

Diagrams are lightweight, accessible flow lists. Use an image block for more involved diagrams. Code is rendered as escaped text in keyboard-scrollable blocks. Images load lazily. Keep code examples free of secrets.

## Add an article

Edit `src/data/writing.js`. Each item has `slug`, `title`, `category`, `status`, `publishedAt`, `abstract`, `showTableOfContents`, `sections`, and optional `references: [{ label, url }]`.

For published work, use `status: 'Published'` and its real ISO publication date (for example, `YYYY-MM-DD`). Drafts can leave `publishedAt: null`. `Sample draft` identifies demonstration content. Replace sample text and TODOs before changing its status. The same content blocks power both articles and project case studies.

## Colors and typography

Change `src/styles/tokens.css` for HSL colors, the 48rem content width, and font families. The reference palette is preserved, with muted text slightly darkened for small-text contrast. Typography and locally loaded font faces are in `typography.css`; responsive composition is in `layout.css`.

Only the Latin variable WOFF2 files for Lora and Source Sans 3 are bundled, with `font-display: swap`. Both come from Fontsource packages under the SIL Open Font License. Their complete notices ship in `public/licenses/`. No font was taken from the downloaded website. If adding other writing systems, load the appropriate licensed font subsets too.

## Verification

Build first; the browser tests use Vite’s production preview:

```sh
npm run build
npx playwright install chromium
npm test
```

Alternatively, reuse an installed compatible Chrome/Chromium:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npm test
```

Tests cover all pages and detail slugs at desktop and mobile sizes, resource/JavaScript errors, document titles, horizontal overflow, axe accessibility rules, keyboard filters, mobile navigation, history, direct-route reloads, draft labels, contact privacy defaults, and 404 recovery. Additional 320px checks cover code scrolling and reduced-motion preferences. These checks exercise this portfolio; they are **not test results for the featured repositories**. See `docs/VERIFICATION.md` for the executed results and limitations.

## Deploy to GitHub Pages

The production URL is https://sultanshahdev.github.io/sultandev/.
`vite.config.js` sets `base: '/sultandev/'`. The favicon, bundled fonts, scripts,
styles, and public asset helper use that base, including
`/sultandev/images/profile-img.png`.

The app uses `HashRouter`. Existing route definitions are unchanged; public URLs
include the hash, for example `/sultandev/#/projects/edith` and
`/sultandev/#/writing/where-a-module-should-end`. Direct visits and refreshes
request the site root, so GitHub Pages needs no SPA fallback. Article contents
links retain their route, for example `#/writing/where-a-module-should-end#example`.
The existing `public/_redirects` file is ignored by GitHub Pages and is not required.

In the repository's **Settings → Pages → Build and deployment**, set **Source**
to **GitHub Actions**. `.github/workflows/deploy.yml` installs locked dependencies
with `npm ci`, builds with Node.js 22, uploads only `dist/`, and deploys using the
official GitHub Pages Actions. It runs on pushes to `main` or manually from Actions.
It uses GitHub's automatic token; no personal token or environment secret is needed.

This archive is a working project tree without its original `.git` history. To publish it to the existing **empty** `sultanshahdev/sultandev` repository, extract the ZIP into a directory, open a terminal in that directory, then run:

```sh
npm ci
npm run build

git init
git branch -M main
git remote add origin https://github.com/sultanshahdev/sultandev.git

git status --short
# Inspect staged files and confirm no local secrets or references will be published.
git add .
git status --short
git commit -m "Deploy software engineering portfolio"
git push -u origin main
```

If this directory is already a Git repository and `origin` exists, use `git remote -v` to inspect the remote rather than reinitializing. To correct it, run `git remote set-url origin https://github.com/sultanshahdev/sultandev.git`. Do not create an additional misspelled `orign` remote. Never force-push over existing work without inspecting it first.

Do not include `references/`, your LinkedIn export PDF, `.env` files, `node_modules/`, `dist/`, or `test-results/` in commits. Push the **source project** to GitHub; the workflow publishes only the built `dist/` directory as your site.

After the workflow succeeds, verify the homepage and refresh a project and article
hash URL on the deployed site. Clean URLs such as `/sultandev/projects/edith` are
not supported by GitHub Pages.

`references/`, downloaded reference snapshots, local PDFs, `node_modules/`, `dist/`,
and `.env*` files are ignored. To publish a reviewed public résumé later, explicitly
adjust the PDF ignore rule for that one file. The GitHub Pages workflow deploys `dist/`, not the repository root.

Default title/description/Open Graph tags are in `index.html`; route-specific values update in the browser. Social crawlers that do not execute JavaScript see the defaults. Per-article social previews or server-generated HTTP 404 responses would require a prerendering/hosting addition. No public domain, canonical URL, or deployment is invented.

## Reference and content notes

Read `docs/REFERENCE_ANALYSIS.md` for the extracted design system and `docs/SOURCE_REVIEW.md` for source revisions, attribution, unresolved deployment information, and upstream remediation notes. `references/`, `.env*`, generated builds, and browser artifacts are excluded from Git.

Remaining editorial work is to replace sample drafts with your writing, review the configured public portrait and email, and optionally provide a résumé or verified demos. The site does not require résumé or demo assets.
