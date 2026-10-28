# Engineering Control Room

Purpose: make the existing discipline strip a coherent technical exhibit while
preserving the surrounding portfolio and all prior uncommitted lab work.

The four native button nodes reuse `profile.disciplines`. Original filled SVG
schematics show an interface, a service enclosure, three replicas, and a policy
gateway. Fine orthogonal connections retain the existing burgundy path states.
A shared workstation contains an editorial explanation, Pixel at a keyboard,
and a navy display. Desktop/tablet keep four nodes across; narrow screens use
an intentional 2×2 system diagram. Body type remains Lora and Source Sans 3.

The active discipline is derived once from selection and deliberate previews.
Before a choice, pointer hover can preview and restore the previous discipline.
An explicit click/tap pins the choice against further pointer previews. Keyboard
focus remains exploratory; Enter and Space commit a choice. Every commit restarts
the display cleanly, including selecting the current discipline again. Automatic
playback cycles through two examples within that discipline; it never changes
the selected layer. Pause persists across discipline changes.

Examples are original illustrations, not copied project excerpts. The c2g-inspired
helper models local `merge` calls and is labeled conceptual JavaScript; c2g's
actual Python/TCP implementation is not presented as running in the browser.
The Express route names its required app context. The ownership and URL examples
state their limited checks. Nothing in the code strings is executed.

The display types at 34ms per character, holds a completed example for 2.8s,
then clears for 450ms. A single pending timeout is canceled on pause, unmount,
discipline changes, document hiding and viewport exit. React character updates
stay inside the display. Pixel's hands/LED and the cursor share this playback
state via CSS; the existing MascotMotion system retains its finite tile gestures.
No global animation framework or new dependency was introduced.

Completed code is always available separately to assistive technology. The
animated copy is aria-hidden, with no live region per character. A native pause
button and keyboard-scrollable code region remain available. Reduced motion
immediately displays full code, stops continuous work and leaves all four nodes
interactive. Description/title/caption space is reserved to prevent layout shifts.

Target viewports: 1440×1000, 1280×1000, 1024×1000, 768×1000, 390×844, 360×844.

State contract:
- Loading: not applicable; local examples and drawings are synchronously bundled.
- Empty: brief intentional start/gap with a cursor; completed accessible code remains.
- Partial: characters are visibly typed; pausing freezes exactly that buffer.
- Success: completed example holds before continuing; status reports display state.
- Error: no input, execution or network operation; no fallible service to recover.
- Permission: no privileged operation, external connection or arbitrary execution.

Verification includes real-time screenshots and deterministic clock tests for
cycling, pauses, visibility, cleanup, preference changes and clean restarts;
keyboard/touch checks, Axe, six layouts and the existing full regression suite.
`preservation-results.json` compares every pre-existing source, test, public asset,
package and deployment file to the task-start hashes. Only the discipline
component, Pixel's pose dispatch and the related mascot test changed. The hero
captures at 1440px and 390px are pixel-identical to the previous lab captures.
