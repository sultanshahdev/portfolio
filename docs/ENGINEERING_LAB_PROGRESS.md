# Engineering lab progress

- [x] M0 — Audit and creative specification. Preservation baseline and unfinished
  additions reviewed; production build passes.
  Missing original specification/references documented in ENGINEERING_LAB_DESIGN.md.
- [x] M1 — Ten original 2.5D SVG artifacts with shared materials and contours.
- [x] M2 — Miniature workstation, switch, server and storage near the preserved
  hero; keyboard-triggered packet delivery and a finite device response.
- [x] M3 — Lazy-loaded native dialog, actual UTF-8/gzip measurements and verified
  decompression; deterministic console with canonical project/skills/profile data.
- [x] M4 — Four project benches share the existing exhibit controls and state.
  Clara explicitly labels Client → TCP → RESP2 → Store. SOAR approval stays manual.
- [x] M5 — Existing residents operate the machines; no replacement characters.
  Added contact packet/component window, skill hardware and blueprint gestures.
- [x] M6 — Six custom technical glyphs, inspectable binary, real frontend blueprint,
  parts drawer, meaningful framing annotations and a compiler study note.
- [x] M7 — Responsive and reduced-motion refinement. Inspected desktop, tablet,
  390px and 320px captures. All flows settle, respond to preference changes and
  retain a static completed state. The biography no longer translates on entry.
- [x] M8 — Rendered review, tests and production verification. Final build,
  content/algorithm suite, full Playwright suite and diff check pass.

No commits or pushes requested. Case-study content, canonical profile data,
institutional assets and deployment configuration are preservation boundaries.

## Continuation / current state

Resumed existing uncommitted lab code; did not restart milestones. The original
specification/reference files remain absent. Reviewed the earlier source-audit
notes and all current canonical profile/project data instead.

Initial build and all 16 content/algorithm tests passed. The first browser run
identified a 13px biography entrance translation during discipline hover; changed
only that entrance to opacity so the text stays stationary. No test assertions
were relaxed. The existing mascot test targets Keeper explicitly because Clara
now also contains Daemon.

`scripts/review-engineering-lab.mjs` captures the production site at 1440×1000,
768×1000, 390×844 and 320×780, including projects, skills, education, community,
contact, instruments, blueprint and artifacts. First review had no overflow,
JavaScript errors or missing local resources; gzip round trips and focus restoration
worked at all four sizes. Refined project operators from a separate fourth column
into their machine stations. Rebuilt and repeated the visual review successfully.

The mobile skill motion recorder previously started after keyboard activation
returned, missing most of the animation. Armed it before activation; all original
assertions remain unchanged. Three repeated runs of both affected regression tests
passed (nine applicable tests, three existing platform skips).

The design evidence record passes the frontend-design-direction skill's local
checker. Screenshot observations and content-state checks are recorded in
`artifacts/engineering-lab/design-evidence.json`; automated viewport measurements
are in `review-results.json`. The final full Playwright run passed and logs
to `playwright-results.txt`. No further implementation changes are pending.

## Final verification

- `npm run build`: passed, including generated case-study integrity checks.
- `npm run test:content`: all 16 content/algorithm tests passed.
- `npm test`: **189 passed, 7 existing platform-specific skips**, no failures.
  Both configured Chromium projects (desktop and touch/mobile) completed.
- `git diff --check`: passed.
- Design evidence checker: passed. Actual screenshots inspected for hero/workshop,
  all four exhibits, compression, console, artwork, skills, education, community,
  contact and the blueprint. Target viewports: 1440×1000, 768×1000, 390×844, 320×780.
- No page overflow, JavaScript errors or missing local assets in the review.
- No changes to profile/project facts, generated narratives, portrait, logos,
  dependencies, palette tokens, Vite base or deployment workflows.
- Optional lab JavaScript is a separate ~11.5 kB chunk (~4.1 kB gzip), requested
  only on opening. No external API, animation engine or backend was added.

The original specification and reference archive/PDF remain unavailable in this
checkout; existing source-audit notes and canonical content were preserved.
All requested milestones are complete. Nothing was committed or pushed.

## Reproduce the review

```sh
npm run build
npm run test:content
npm test
git diff --check
```

For screenshot review, keep `npm run preview -- --port 4173 --strictPort` running
in one terminal and run `node scripts/review-engineering-lab.mjs` in another. The
script writes local screenshots and measurements; it does not publish or deploy.
