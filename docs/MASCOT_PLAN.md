# Tiny residents of a software system

## Preservation contract
The approved Living Systems layout is the baseline. Preserve its content, typography, tokens, portrait, diagrams, source-backed project evidence, all 23 skill categories, logos, routes and static hosting configuration. The working tree already contains the previous redesign; do not reset or commit it. Baseline source hashes and viewport geometry are in artifacts/mascots/, with a source copy in /tmp/portfolio-before-mascots/.

AGENTS.md was read; its original PORTFOLIO_SPEC.md/reference/PDF paths remain absent. No factual content work is needed. Existing BIT/PACKET are simple stroke-only robots in the portrait, c2g exhibit and contact; replace their artwork and placements with the illustrated family. Browser connection has no available instance; use the existing local Playwright installation.

## Art direction / M1
Purpose: let the existing technical publication feel inhabited without competing with its engineering content. Audience: visitors reading real project evidence. Primary actions remain case-study links, skills disclosures and genuine contact links.

160×160 drawing space; substantial silhouettes, 1.8-unit navy contours, warm paper highlights, overlapping gray side planes, soft elliptical contact shadows, burgundy signatures, oval eyes with pin highlights, distinct brows and small mouth gestures. Flat vector layers create depth without filters or raster assets. Preserve silhouette recognition at 64px. No famous mascots, emoji or generic icon bodies.

| Character | Silhouette / personality | Prop / finite action |
| --- | --- | --- |
| Pixel | Tilted layered display; delighted and exacting | Floating layout tiles align |
| Daemon | Low, sturdy server chassis; calm and reliable | Request envelope in, response out |
| Relay | Leaning bean-shaped courier, antenna and cable tail; sociable | Envelope delivery and network signal |
| Keeper | Rounded cylinder stack; careful and organized | Key, data cube and compartment |
| Sentinel | Soft shield body and visor; alert and thoughtful | Scan a packet, raise approval badge |
| Archie | Folded parchment, spectacles and pencil crest; analytical | Unfold and assemble blueprint; reading variant |
| Scout | Flared explorer coat, peaked cap and large lens; inquisitive | Inspect source sheet and highlight a line |
| Forge | Tool-belt builder with broad hard hat; practical | Join pipeline segments; resting footer variant |

## Architecture / placement
Separate eight artwork components from shared MascotFrame, Face and palette primitives. A registry wrapper selects artwork/pose/size; no duplicated drawings. One route-aware motion controller observes cameos and delegates pointer/focus/click events. Finite 1.1-second actions, one entrance per cameo, no stateful timer per React render, no new focus stops, media-change and route cleanup.

Archie replaces the portrait cameo; Pixel sits beside the discipline label. Four project header corners host Relay/Keeper/Sentinel/Scout without entering the diagram drawing or controls. Selected skill categories receive tiny 40px cameos inside existing reveal panels, preserving row height and exact trigger text. Education/community heading margins host reading Archie and flag-bearing Relay. A restrained Relay/Pixel pair inhabits the existing contact space; resting Forge lives in the footer connection line.

Do not grow page height appreciably. Reuse reserved heading/corner spaces and the existing contact column. Art may extend into safe section gaps but must not collide with text or controls. Target widths: 1440, 1280, 1024, 768, 390, 360.

## Verification
Capture baseline and after geometry; original data/assets/tokens must remain byte-identical. Review family plates at 128px and 64px, all eight silhouettes, poses, hero, each exhibit, skills, education, community, contact/footer and touch homepage. Assert no viewport overflow or mascot/text/control intersections, stable section heights, preserved case-study/skills navigation and original logos. Test decorative/accessibly named modes, finite domain actions, real-link focus reactions, route cleanup and live reduced-motion preference. Build, full Playwright suite, content tests and diff checks before completion.

Loading/empty/error/partial/permission UI is unchanged: illustrations are local inline SVGs with no data fetching or privileged actions. Success means all eight drawings are visible, existing controls work and reduced-motion static poses remain complete.
