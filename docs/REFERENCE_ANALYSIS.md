# Reference analysis

## Materials inspected

- `AGENTS.md` and `PORTFOLIO_SPEC.md`, read in full before implementation and reviewed after the interrupted session.
- The extracted HTML at `references/website/www.micheleriva.it/www.micheleriva.it/`: home, publications, writings, contact, and all eight article layouts.
- The compiled `d8aae3401ed750ca.css`, bundled font declarations, image inventory, and shared page wrappers.
- `references/Profile (8).pdf`, all three pages. Only professional education/program/community facts were used; contact information and uncorroborated achievement metrics were excluded.
- The ten public repositories named in the specification, reviewed at pinned revisions; see `SOURCE_REVIEW.md`.

The original ZIP and the alternate `Profile.pdf` filename named in AGENTS.md are absent. The extracted snapshot and `Profile (8).pdf` were available and sufficient. No reconstruction of the compiled Next.js runtime was needed.

## Observed visual system

| Element | Extracted reference | Portfolio implementation |
| --- | --- | --- |
| Main column | `max-w-3xl`, 48rem including padding | Same 48rem centered column |
| Gutters | 16px mobile, 24px from 640px | Same |
| Header | Full-width bottom rule; constrained identity and navigation | Same composition, four portfolio routes |
| Navigation | Source Sans 3; burgundy active link with underline | Same treatment, native links and keyboard focus |
| Mobile | Navigation switches at 640px | Labeled disclosure button with expanded state and Escape support |
| Body | Warm off-white `40 33% 97%` | Same |
| Primary | Deep navy `220 40% 20%` | Same |
| Accent | Burgundy `0 45% 35%` | Same |
| Border | Warm gray `40 15% 82%` | Same |
| Muted text | `220 10% 46%` | 42% lightness for stronger small-text contrast |
| Fonts | Lora 400–700, Source Sans 3 200–900 | Independently licensed Fontsource variable fonts |
| Brand | 20px mobile / 24px desktop | Same |
| Index heading | 24px mobile / 30px desktop | 26px mobile / 30px desktop |
| Section labels | 12px uppercase, tracked | Same hierarchy |
| Main padding | 32px mobile / 40px desktop | Same |
| Vertical sections | Around 40px | 40–44px |
| Links | Thin understated underlines and color changes | Same, plus visible keyboard focus |
| Footer | Thin top rule, small sans-serif text | Same |

The compiled stylesheet includes unrelated UI utility rules and a wider contact layout for an embed. Those do not define the core reading layout. The portfolio keeps contact narrow and removes the scheduling embed because only professional links were requested.

The downloaded HTML does not bind the generated font-variable classes on its root element. Its local rendering consequently falls back to Times New Roman even though the CSS declares Lora and Source Sans 3. The portfolio follows the intended font pairing required by the specification, rather than reproducing that snapshot defect.

## Content adaptations

Publications and patents become compact project entries. Author achievements and original writing are not copied. Project entries add a category, technologies, repository link, and case-study route. Case studies reuse the article reading column with technical lists, restrained diagrams, code blocks, and source references.

The homepage remains text-led, with an optional portrait rather than a substitute photograph. Education, self-directed learning, and community roles are explicitly separated. Writing uses two labeled samples without publication dates. Contact supports only configured accounts and optional public assets.

## Component architecture

The shared header, navigation, footer, and route behavior surround seven page components. Profile sections, project entries, and writing entries render local data. One structured-content renderer handles both project and article bodies and omits empty sections. Common labels, links, filters, and headings preserve consistency without a component framework or Tailwind.

No animation library, icon package, remote API dependency, stock portrait, or original author asset is required. The original favicon is a simple typographic initial.

Rendered comparison and browser verification are recorded separately in `VERIFICATION.md`.
