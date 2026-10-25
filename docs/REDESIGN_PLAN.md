# The Living Systems Portfolio — design and architecture

## M0 audit (2026-10-26)
- Initial working tree: clean. Read AGENTS.md, every page, layout/profile/project/UI component, content data, tokens/styles, asset helper, test suite, Vite/Playwright configurations and existing design/source documentation.
- PORTFOLIO_SPEC.md, references/website/ and the professional PDF are absent from this checkout (including alternate filenames). Existing REFERENCE_ANALYSIS.md records their earlier review. Use current source-backed content as authority; do not recreate private material. The current redesign brief supersedes AGENTS.md's universal narrow layout and restricted motion requirements.
- Rendered baseline: artifacts/redesign/before-desktop.png. The same 48rem column constrains almost everything; tiny diagrams, repeated entries and oversized square emblems suppress hierarchy. Palette and fonts already work.
- Retain HashRouter, route focus/meta, accessible mobile navigation, filtering, all canonical data, the skills reducer/keyboard/touch model, organization fallbacks, lazy case-study loader, Markdown rendering, source diagrams/downloads/tables/appendices and content build checks.
- Replace the hero composition, small homepage project signatures and page compositions. Refactor shared navigation/footer and journey presentation. Extend case-study presentation without editing source documents or generated content.

## Design contract
Purpose: help visitors understand Sultan's frontend and systems practice, inspect four real projects and start a conversation. Primary action: explore case studies; secondary: GitHub/LinkedIn.
Tone: independent engineering studio; warm editorial typography meets precise schematic drawing. Memorable detail: BIT (a bracket-bodied terminal assistant) and PACKET (a port-equipped network companion), original SVGs sharing navy linework and a single burgundy signal.
Hierarchy: expressive identity → interactive disciplines and exact biography → four large engineering exhibits → 23-category knowledge index → formal/self-directed learning → alternating geographic community journal → contact.
Canvases: wide 80rem, standard 66rem, reading 46rem; fluid gutters and intentional breakouts. Prose remains measured; tablet diagrams stack before they become cramped; mobile keeps every illustration with compact typography.
Palette/fonts: unchanged HSL tokens; tonal surfaces derive from them. Lora / Source Sans 3, locally hosted. No new dependencies.
Motion: one short entry per observed section, finite explanatory diagram runs, user replay, active section index and accurate page progress. Default content is visible. Motion media query changes are respected, observers/listeners/timers cleaned up. No pinning, loops, scroll interception or backend.

## Component architecture
- StudioMascot: reusable accessible BIT/PACKET vector artwork.
- StudioSchematic: hero technical illustration and portrait composition.
- ScrollExperience: route-scoped reveal observation, passive rAF progress and IntersectionObserver section awareness.
- ProjectExhibitDiagram: four responsive original SVG exhibits with accessible native replay/approval buttons and persistent captions/status.
- ProjectEntry/ProjectList: preserve metadata/links; alternate homepage exhibits, compact archive rows.
- SectionHeading: editorial heading plus number/kicker. Existing skills disclosures stay intact.
- Retained education/community components receive a new standard-width composition and organization-specific optical sizing metadata.
- Supporting pages use wide headers / readable text; case-study reader uses measured content and wide diagram breakouts with a sticky desktop contents rail.

## Interaction states
- Diagram idle → activate (viewport or button) → finite illustrated run → settled; replay available. SOAR remains explicitly simulated and manual approval stays a distinct step.
- Skills closed → hover preview → click/tap pinned → Escape/second activation closes. Keep original single active category semantics.
- Archive filter → matching source-backed entries and live result count. Existing empty state retained.
- Asset error → existing monogram / complete Mermaid fallback. Lazy route loading retains a status message. Unknown route retains recovery link.
- No authentication, permission prompt, remote runtime data or submission state is applicable to this static portfolio.

## Validation contract
Widths: 1536, 1440, 1280, 1024, 768, 390, 360. Capture homepage, archive, representative case study, expanded skills, community, footer and contact. Inspect images directly and refine. Verify keyboard/touch, all routes, all 23 categories/512 skill entries, logos, no overflow, reduced motion, finite diagrams and route cleanup. Run build, npm test, test:content and git diff --check. Save local screenshot/evidence artifacts; do not commit, push or change references/.
