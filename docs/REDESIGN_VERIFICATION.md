# Living Systems redesign — verification

## Delivered

The homepage uses an 80rem studio canvas, a 66rem supporting canvas and a measured 46rem reading canvas. The hero combines editorial typography, a large grayscale portrait, technical linework and original SVG character BIT. PACKET accompanies the peer network and closing contact invitation. Both are reusable accessible vectors.

The four source-backed projects each have a distinct exhibit: replicated state, database request flow, a security approval gate and question-to-source retrieval. Interactions run once on entry and can be replayed; SOAR waits for explicit human activation and keeps its simulated response boundary visible. Mobile keeps the illustrations, adds readable stage keys and uses touch controls.

The existing 23-category / 512-skill disclosure model remains intact. Education leads with the degree, followed by The Odin Project. Community preserves the required institutional order and alternating logo placement, with organization-specific optical sizing. The project archive, reading pages, writing index, contact page, header and footer share the new visual language.

## Content and deployment integrity

- Project metadata, biographies, writing drafts, qualifications, technology names, source documents and generated case-study JSON were not rewritten.
- All 84 main case-study chapters, 54 source diagrams, tables, appendices, evidence notes, source downloads and documented limitations remain available.
- Organization assets remain genuine, grayscale and uncropped, with explicit intrinsic dimensions and existing monogram recovery.
- HashRouter, base `/portfolio/`, asset URL handling and the GitHub Pages workflow are unchanged. No backend or runtime API was introduced.
- No new dependency, animation framework, generated portrait, commit or push.
- The original PORTFOLIO_SPEC.md, extracted reference website and professional PDF are absent from this checkout. Existing reference/source review documents and current canonical content supplied the available evidence. No private material was reconstructed or added.

## Verification

- `npm run build`: passes, including generated content freshness checks. Main bundle: approximately 348 kB / 112 kB gzip; case studies remain lazy chunks. Fonts and assets are local.
- `npm test -- --reporter=line`: final complete suite passes 136 tests with six device-specific skips after all refinements.
- `npm run test:content`: all seven pass.
- `git diff --check`: passes.
- Frontend design-evidence checker: passes; local record and rendered observations are in `artifacts/redesign/design-evidence.json`.
- Existing route/axe checks cover homepage, archive, all four studies, writing and both sample articles, contact and recovery routes. They also cover history/focus, keyboard navigation, filters, skills content/order, hover/pin/Escape/touch, grayscale asset loading/fallbacks, diagrams/downloads/deep links/tables, small-screen overflow and reduced motion.
- New `living-systems.spec.js` covers named mascots, three canvas widths, section awareness, progress accuracy, footer focus, finite/replayable diagram states, explicit security approval, live reduced-motion changes, observer cleanup on navigation and readable mobile stage keys.
- Hero tests now check one intended line per span against computed line height and a bounded gap into the mobile biography. The touch layout measurement uses reduced motion to isolate reflow from the independent scroll reveal transform; it also passed three consecutive repeats. All original content, portrait-size, keyboard and no-overflow assertions remain.
- Manually delayed the lazy page module: visible “Loading project…” status, followed by the complete study and contents navigation.

The six skips are intentional platform distinctions: desktop touch selection and touch skills, the mobile stage-key test in the desktop project, plus mobile fine-pointer discipline previews, skills hover and pointer stress. Equivalent behavior is exercised in its applicable device project.

## Rendered review

Ran `scripts/review-redesign.mjs` against the production preview with separate desktop and touch browser contexts. Captures at 1536, 1440, 1280, 1024, 768, 390 and 360px showed no horizontal page overflow or runtime errors. Reviewed desktop and mobile project exhibits, archive, representative Clara case study and source diagram, writing index, expanded skills, community, contact and footer. Finite reveal animations are allowed to settle before section captures.

Refinements made from screenshots: restored primary-button contrast; enlarged portraits at 1024/360px; removed colliding tablet annotations; added readable mobile schematic keys; retained PACKET in the mobile peer exhibit; adjusted logo optical sizes and standardized outer frames; fixed open-menu viewport overflow and added a strict configured-width regression check (mobile innerWidth can itself inflate on overflow). Long prose remains measured while visuals use the wider canvas. Mobile retains meaningful illustrations and all content.

Representative local artifacts:

- [Desktop opening](../artifacts/redesign/hero-1440.png), [tablet opening](../artifacts/redesign/hero-768.png), [mobile opening](../artifacts/redesign/hero-390.png)
- [Complete desktop homepage](../artifacts/redesign/home-1440.png), [complete mobile homepage](../artifacts/redesign/home-390.png)
- [Security exhibit](../artifacts/redesign/exhibit-soar-lite-1440.png), [mobile peer exhibit](../artifacts/redesign/exhibit-c2g-390.png)
- [Expanded skills](../artifacts/redesign/skills-expanded.png), [touch skills](../artifacts/redesign/skills-mobile.png)
- [Community](../artifacts/redesign/community-desktop.png), [mobile community](../artifacts/redesign/community-mobile.png)
- [Archive](../artifacts/redesign/archive-1440.png), [case study](../artifacts/redesign/case-study-1440.png), [source diagram](../artifacts/redesign/case-diagram-1440.png)
- [Mobile menu](../artifacts/redesign/mobile-menu.png), [Writing](../artifacts/redesign/writing-1440.png), [contact](../artifacts/redesign/contact-390.png), [footer](../artifacts/redesign/footer-desktop.png)

These checks verify the portfolio presentation and preservation of supplied engineering evidence. Upstream product tests are retained as reported evidence and were not rerun. Browser checks use Chromium desktop/touch emulation; no physical-device or additional browser-engine testing is claimed.
