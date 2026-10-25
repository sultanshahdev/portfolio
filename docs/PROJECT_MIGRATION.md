# Project migration implementation record

## M1 — Documentation audit: complete

Read AGENTS.md, the complete migration specification, all 12 Markdown files and all 31 standalone Mermaid files recursively under new-projects/. Also inspected existing React pages, components, styles, data, tests, build and Pages workflow. The deleted PORTFOLIO_SPEC.md was read from HEAD without restoring it. Original reference HTML/archive/profile are absent in this checkout; docs/REFERENCE_ANALYSIS.md and docs/SOURCE_REVIEW.md preserve the prior review. Existing typography/layout remain authoritative for this migration.

| Project | Narrative | Supporting material | Embedded diagrams |
| --- | --- | --- | --- |
| c2g | c2g_portfolio_case_study/docs/portfolio/C2G_ENGINEERING_CASE_STUDY.md | 16 ADRs, evidence register, presentation guide, index, package README; 19 standalone diagrams | 19 |
| Clara | CLARA_CASE_STUDY.md | Requirements, milestones, source/test links and recorded CI inside narrative | 7 |
| SOAR Lite | SOAR_Lite_Case_Study/SOAR_LITE_CASE_STUDY.md | Evidence register, asset plan, package README; 12 standalone diagrams | 12 |
| CodeCraft | CodeCraft_Engineering_Case_Study.md | Pinned source/PR references, release qualifications and screenshot plan inside narrative | 16 |

No screenshots or archives require extraction. Source documentation remains unchanged. Full narratives, protocol/code excerpts, requirements/tradeoff tables, testing distinctions, history and limitations are published. Authoring/media instructions will be accessible separately from the narrative. c2g ADRs and both evidence registers will be navigable appendices.

## Milestone results

| Milestone | Result |
| --- | --- |
| M1 — Documentation audit | Complete; canonical sources and qualifications mapped above |
| M2 — Data migration | Exactly four shared records; all eight old records and their active case-study content removed; old slugs use Not Found |
| M3 — Homepage | Asymmetrical editorial showcase, numbered studies, compact technologies, architectural linework, independent repository/case-study/demo links |
| M4 — Archive | Expanded entries from the same data; four supported categories and keyboard-operable All filter |
| M5 — Reader | Shared lazy reader, GFM Markdown, stable chapter/deep links, active chapter indication, mobile contents disclosure, milestones, tables, code and appendix disclosures |
| M6 — Publication | All four full narratives, c2g's 16 ADRs, both evidence registers, 54 SVG figures, source fallbacks, 54 Mermaid downloads and 12 original-document downloads |
| M7 — Verification | Production build, content-integrity tests, browser tests, viewport sweep and visual review completed; results below |

The publications contain 21 c2g, 20 Clara, 20 SOAR Lite and 23 CodeCraft chapters, plus appendices. Counts include introductory and source/evidence chapters. Every substantive non-heading Markdown block in each main document is checked against the generated publication. Original headings become chapter titles; frontmatter is parsed into publication metadata. Screenshot/editorial directions remain accessible in dedicated appendices. The standalone diagram sources are checked against the embedded diagrams so none are omitted.

## Published routes and content coverage

| Route (after /portfolio/#) | Diagrams | Emphasis |
| --- | --- | --- |
| /projects/c2g | 19 | UDP discovery, TCP framing/HELLO, CRDT anchors/tombstones/convergence, multi-peer relay, reconnect, Unicode bridge, persistence/recovery, M0–M7 history, test/release gates, trusted LAN, upstream attribution; 16 ADRs and full evidence register |
| /projects/clara | 7 | Requirements, binary-safe storage, RESP2, mutex-owned counters, lazy TTL, connection limits/deadlines/shutdown, M0–M8 history, correctness tests, local runtime/CI, tradeoffs and limitations |
| /projects/soar-lite | 12 | Transactional intake, duplicate identity, PostgreSQL claims/leases/fencing/retries, real AbuseIPDB enrichment, analyst decisions, simulated response/audit/reversal, development history, testing distinctions and local Compose deployment; evidence register |
| /projects/codecraft | 16 | Requirements/history, Node hybrid ranking, embeddings/caches, source budgets, compiler/Tree-sitter adapters, APIs, browser/Node distinctions, runtime detection, testing/CI/Cloudflare deployment, limitations and future experiments |

All source code excerpts, substantive tables, historical/unsuccessful verification, source/PR/commit references and engineering lessons are retained. No product code or product repository was changed.

## Changed-file map

- `src/data/projects.js`: the four canonical identities and summaries, technologies, role/status/qualifications, evidence, highlights and architectural signatures.
- `src/pages/HomePage.jsx`, `ProjectsPage.jsx`, `ProjectDetailPage.jsx`: showcase selection, archive wording/filtering, shared detail hero and publication composition.
- `src/components/projects/ProjectEntry.jsx`, `ProjectList.jsx`, `ProjectMeta.jsx`, `ProjectCaseStudy.jsx`: reusable project presentation and lazy publication loading.
- `src/components/projects/ArchitectureSignature.jsx`, `CaseStudyMarkdown.jsx`, `CaseStudyToc.jsx`, `EngineeringTimeline.jsx`, `TechnicalDiagram.jsx`: architecture illustrations, safe Markdown, chapter navigation, original chronology cells and recoverable SVG figures.
- `src/App.jsx`, `src/main.jsx`, `src/styles/projects.css`: lazy detail route and scoped project styling.
- `src/styles/layout.css`: one mobile identity-width rule to fix the existing 320px header overflow; text unchanged.
- `scripts/build-case-studies.mjs`: deterministic content transformation and build-time Mermaid rendering. Sequence-message semicolons are escaped for rendering, source-specific paint is neutralized, and a classic style/wider labels preserve readability. Original documents/diagram text are unchanged.
- `src/content/projects/{c2g,clara,soar-lite,codecraft}.json`: four generated publication manifests.
- `public/projects/`: 54 SVGs, 54 original Mermaid sources, and 12 byte-identical original Markdown downloads (120 public assets).
- `package.json`, `package-lock.json`: focused Markdown dependencies, development-only renderer/parser, generation/check/integrity scripts.
- `playwright.config.js`, `tests/portfolio.spec.js`, `tests/projects.spec.js`, `scripts/tests/case-studies.test.mjs`: correct existing /portfolio/ test base and retained/expanded regression coverage.
- `README.md`, this record, `docs/VERIFICATION.md`: current content workflow, deployment guidance, source mapping and verification results.

The supplied `new-projects/` tree and `PROJECT_CASE_STUDIES_SPEC.md` remain unchanged. The pre-existing deletion of `PORTFOLIO_SPEC.md` was preserved. Generated outputs and authoritative inputs must be committed together for CI; the task did not create a commit or push.

## Executed verification (25 October 2026)

- `npm run content:build`: all 54 diagrams rendered successfully. Render failures fail generation and retain readable original source.
- `npm run test:content`: **7 passed**. Canonical identities, complete substantive narrative blocks, unique anchors, original download SHA-256 values, valid generated SVGs and all 31 separately supplied diagram sources checked.
- `npm run build`: **passed**. Source fingerprints and generated artifact presence validated before the Vite production build.
- `npm test`: **62 passed** across desktop and mobile Chromium. Includes the retained accessibility/navigation/writing/contact tests plus canonical collection/links, all legacy 404s, source downloads, diagrams/fit controls, milestones, chapter focus/history/reload, c2g ADRs/evidence, image-failure fallback, and every project at 360/390/768/1280px. Existing 320px/reduced-motion tests retained and passing.
- axe WCAG 2 A/AA and 2.1 AA checks: no violations on the 13 current route cases at both default viewports.
- Additional asset check: **all 54 SVGs decoded successfully in Chromium**, and **all 12 original-document downloads returned HTTP 200** from the production preview under `/portfolio/`.
- Visual review: desktop/mobile showcase, all four architecture figures and milestone timelines, mobile detail hero, readable-size and fitted diagram views. Diagrams preserve native label size by default, scroll horizontally and offer a full-size SVG. Fit width is an explicit overview option. Wide flowcharts open around their first source node.
- Repository links: all four canonical GitHub repository pages resolved. The documented CodeCraft demo returned HTTP 200; this was an availability check, not a new end-to-end product inference test.
- `npm audit --omit=dev`: zero vulnerabilities reported at check time. `git diff --check`: passed.
- Scope check: Vite config, GitHub Pages workflow, profile/experience/skills/writing data, writing renderer, footer, tokens, global styles and typography are byte-identical to HEAD. Homepage changes affect only Selected Work. No references/ content was added or committed.

The build emits separate publication chunks and a lazy Markdown reader; Mermaid is absent from the runtime application bundle. A clean CI build validates the committed generated artifacts without launching Chromium. Current initial JS is about 312.9 kB (101.9 kB gzip), the lazy reader about 169.5 kB (52.1 kB gzip), and each publication about 51.0–103.3 kB before gzip. These are build sizes, not performance benchmarks.

## Remaining limitations

No implementation milestone remains open. Authentic product screenshots were not supplied; original diagrams provide complete visual content, and screenshot plans remain available for future capture. c2g's G6 PARTIAL/trusted-LAN boundary, Clara's local-only/no-durability scope, SOAR Lite's simulated containment/unconfirmed final database suite and CodeCraft's browser inference/capability gap remain explicit. Product test suites were not rerun by the portfolio task. Some upstream references use mutable main-branch links, retained from the supplied documents.

Browser verification used Chromium, not Safari, Firefox, physical devices or a screen reader. Public deployment was not performed. The existing `/portfolio/` base, HashRouter and Pages workflow are preserved; the preview is a static production build.
