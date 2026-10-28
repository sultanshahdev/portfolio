# The Hacker Hostel Lab

## Preservation baseline / M0

The earlier milestone notes recorded a clean initial baseline and a desktop hero
capture. This continuation began with the unfinished lab implementation already
in the working tree; its additions were reviewed and retained. Read AGENTS.md,
the homepage, routes, profile, layout, project, mascot, studio and disclosure
components, data, tokens, styles, asset helper, case-study renderer and tests. The
production build passes. No files in `references/` were created or modified.

PORTFOLIO_SPEC.md and references/ (including the website snapshot and profile PDF)
are absent from this checkout. docs/REFERENCE_ANALYSIS.md and docs/SOURCE_REVIEW.md
record the earlier source audit. They and the current canonical data supply the
preservation baseline. No personal profile details are imported or changed.

## Art direction

An editorial workshop: warm paper, navy enclosures, burgundy signal paths,
slate side panels, etched labels, fine contours and contact shadows. Hardware
uses a shared 2.5D projection with shallow top planes and right-side depth.
Ports, vents, screws, disk bays and board traces distinguish the objects from
outline UI icons. Existing character silhouettes and materials remain intact.
All artwork is original SVG. No show imagery, brands, fictional algorithms or
affiliation claims. Existing diagrams and evidence remain the authority.

| Surface / visitor task | Primary action and hierarchy | Evidence / constraint |
| --- | --- | --- |
| Hero / meet the engineer | Existing headline, portrait and project link first | Keep current composition and text; add a separate low lab shelf near introduction |
| Lab shelf / discover the workshop | Send a packet; open experiments | Small connected machines, explicit illustrated delivery, one finite cycle |
| Work / understand four projects | Existing case-study and source links | Keep diagrams and their controls; hardware bench uses the same phase |
| Experiments / try an algorithm | Edit text, compress, read measured byte counts | Native gzip and UTF-8; no invented measurements |
| Console / explore the portfolio | Enter a whitelisted command | Read canonical data; fixed local responses; no execution |
| Skills / explore categories | Original 23 disclosure controls | Preserve data and controller, add compact domain artwork in existing panels |
| Education / read qualifications | Institutional links | Small CS study annotation after content, logos retain prominence |
| Community / read activities | Institutional links | Only a restrained connection annotation; no additional scene |
| Contact / follow links | Existing contact links | Relay carries an envelope to Pixel's component window |

## Component boundaries

- `illustrations/EngineeringArtifact`: ten reusable drawings, separate from layout
  and interaction; exports a glyph for composing the scene without nested SVGs.
- `lab/EngineeringLabScene`: illustrated workstation → switch → server → storage,
  finite delivery cycle and a terminal receipt, Daemon operates the rack.
- `lab/LabEntry`: scene, small introduction and native experiment launcher.
- `experiments/LabDrawer`: lazy-loaded dialog content, native modal semantics,
  Escape, contained focus and focus restoration. Compression, console, blueprint
  and an inspectable artifact shelf live here; code loads on first opening.
- `lib/compression`: testable native gzip measurement and lossless round trip.
- `lib/labCommands`: deterministic parser, generated project/skills responses.
- `lab/ProjectLabBench`: project-specific objects and truthful annotations; reuses
  the existing exhibit phase/control and project resident (no second simulator).
  Operators overlap their workstations: Relay dispatches at Peer A, Keeper tends
  the store, Sentinel inspects at the gateway, Scout examines the source board.
  Clara's bench separately labels Client → TCP → RESP2 → Store; memory and mutex
  annotations sit at the shared keyspace rather than becoming protocol stages.
- `lab/EngineeringEasterEgg`: native disclosure for UTF-8 decoding / real blueprint.
- `data/lab`: labels, samples and illustration metadata; no duplicated project facts.

## Interaction and state contract

| State | Trigger / feedback / next action |
| --- | --- |
| Loading | First open loads the optional module; stable dialog and status; close remains available. Compression exposes busy state and disables its submit control |
| Empty | Empty input is valid UTF-8 (0 bytes); explicitly measured gzip framing overhead; console clear empties history and retains the prompt |
| Error | Native compression failure clears measurements and gives an actionable retry message |
| Partial | No CompressionStream: original bytes remain available, compressed size is unavailable with a clear browser-support explanation |
| Success | Sizes, signed difference and reduction/expansion from the actual bytes; verified decompression when available; console shows accurate data |
| Permission | Not applicable: local static interactions have no privileged actions or remote service |

Target viewports: **1440x1000**, **768x1000**, **390x844**, **320x780**.
No global palette or deployment changes. No dependencies. Optional panels have
contained dark screens, not a dark page. Native dialog and details provide keyboard
behavior. All motion is finite, responds to a preference change, and has an
equivalent static final state. No animation frames or timers run continuously.
The biography's existing entrance fades without translation so discipline previews
cannot coincide with moving reading text. The rest of the scroll system is intact.

## Verification contract

Production build and all existing tests must pass unchanged. Add behavior tests
for gzip (UTF-8, overhead, lossless output, unavailable API, errors and stale data),
console parsing and canonical data, lazy loading, modal keyboard behavior,
illustration accessibility/finite motion, responsive layouts and static base-path
asset loading. Review screenshots of every requested section and experiment.
Keep visual evidence and record refinements in ENGINEERING_LAB_PROGRESS.md.
