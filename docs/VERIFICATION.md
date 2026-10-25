# Verification record

## Project migration — 25 October 2026

The four-project migration is complete. `npm run content:build`, `npm run test:content` (7 passed), `npm run build`, and `npm test` (62 passed across desktop/mobile Chromium) succeeded. All 54 SVGs decoded and all 12 original Markdown downloads returned HTTP 200 under `/portfolio/`. The full report, source mapping, changed-file map, responsive/visual checks and limitations are in [PROJECT_MIGRATION.md](PROJECT_MIGRATION.md). GitHub Pages configuration and non-project content are preserved. No public deployment was performed.

## Historical verification — 11 October 2026

The following is the earlier implementation record. Its old project collection, asset sizes and optional-content configuration describe that historical snapshot, not the current migration.

Completed 2026-10-11 against the local application. The repository’s required production build was executed successfully. Existing work was retained after the interrupted sessions; the Vite font imports, optional-content handling, and route-focus behavior were repaired rather than rebuilding the application.

## Executed checks

| Check | Result |
| --- | --- |
| `npm run build` | Passed; Vite production assets generated in `dist/` |
| Full Playwright suite | 44 passed across desktop and mobile |
| Final route-focus regression check | 6 passed after the final focus change |
| axe WCAG 2 A/AA and 2.1 AA rules | No violations reported on the 17 tested paths at both viewport sizes |
| Additional responsive sweep | 35 combinations passed: five pages at 320, 390, 640, 768, 1024, 1440, and 1920px |
| Local font loading | Both variable fonts loaded; no external resource requests in the responsive sweep |
| Keyboard skip link | Visible on Tab and moves focus to the main content |
| Malformed URL fragment | Page remains functional without a JavaScript exception |
| Source/build privacy scan | No upstream FinanceTracker credential or extracted private PDF email values found |
| Reference-content scan | No reference author content or Next.js runtime found in application source/build |
| Git exclusions | `references/`, `node_modules/`, `dist/`, and test artifacts remain ignored |
| Local servers | Portfolio at 5173 and reference snapshot at 5174 respond with HTTP 200 |

The full suite covers home, projects, writing, contact, all eight project pages, both article samples, and three unknown-route cases. Interactive checks exercise keyboard-operated category filters, reset to all projects, case-study links, browser history, deep-link reloads, active navigation, mobile menu state/Escape, article contents links, scrollable code, private-contact defaults, and 404 recovery. Reduced-motion preferences and 320px layouts are included.

The final targeted command was:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome npm test -- --workers=1 --grep 'navigation, case studies|sample articles|404 recovers'
```

A concurrent verification attempt encountered two Chrome page-setup timeouts before its test bodies ran. Running those final checks sequentially passed all six. No application workaround was added for that browser-startup issue. An early ad hoc responsive script also queried the page before React mounted; the corrected sweep waits for its heading and completed all 35 combinations.

## Visual comparison

Inspected rendered screenshots of the reference and portfolio at 1440px and 390px. Also inspected the portfolio project index, Node.js case study, sample article, contact page, and mobile menu.

| Measurement | Reference | Portfolio |
| --- | --- | --- |
| Main outer width at 1440px | 768px | 768px |
| Main left edge at 1440px | 336px | 336px |
| Main top/side padding, desktop | 40px / 24px | 40px / 24px |
| Main top/side padding, mobile | 32px / 16px | 32px / 16px |
| Page background | `rgb(250, 248, 245)` | Same |
| Horizontal page overflow at comparison sizes | None | None |

The column alignment, warm colors, small metadata, serif hierarchy, fine dividers, understated links, and footer match the reference’s editorial approach. New content uses the same visual vocabulary. The portfolio has additional project metadata and readable technical blocks; it has no oversized hero, dashboard grid, decorative animation, or stock imagery.

The local reference snapshot falls back to Times New Roman because its root does not bind the CSS font variables. The portfolio intentionally fixes that discrepancy with the required Lora and Source Sans 3 pairing. Its header is a few pixels taller to accommodate font metrics and the accessible mobile button.

Screenshots were kept in `/tmp/` for local review, not copied into the application or committed from the reference directory.

## Build footprint

The final production build reports approximately 303.3 kB JavaScript (96.4 kB gzip), 13.0 kB CSS (3.3 kB gzip), and two locally hosted font files totaling 66.5 kB. Font license notices are included. These are build-file sizes, not measured network performance scores.

## Limits and remaining editorial work

- Automated browser coverage used local Chrome/Chromium. Safari, Firefox, physical devices, and screen-reader sessions were not tested. axe results are not a complete accessibility certification.
- Featured upstream applications were source-reviewed, not executed. Their testing sections state that distinction. The FinanceTracker credential still requires remediation in its own repository; this task did not alter upstream projects.
- EDITH’s conflicting deployment links could not be verified, so no live demo is advertised.
- Writing consists of two clearly labeled sample drafts. The Python/data lab case study includes an explicit TODO for a reviewed experiment. Replace these with author-approved content when available.
- Portrait, public email, résumé, and demo links are supported but unset. No private reference PDF is published.
- No public deployment was performed. Static-host routing instructions are in the README. Route-specific social metadata requires JavaScript; prerendered social previews and true server-side 404 statuses would be separate hosting enhancements.
- The reference ZIP was not available; the extracted HTML/CSS/assets supplied the design evidence.
