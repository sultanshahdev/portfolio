# c2g — Dedicated Portfolio Case-Study Page Specification

This is a presentation plan for translating `C2G_ENGINEERING_CASE_STUDY.md` into the developer's website. It does **not** assume any particular website framework, and does not create or fake screenshots. Deep implementation details remain backed by `C2G_TECHNICAL_EVIDENCE.md` and editable Mermaid sources in `diagrams/`.

## Editorial goals

- A visitor should understand the product in under 30 seconds: **desktop collaboration over a trusted LAN without a central coordination server**.
- A technical recruiter should find the **networking and distributed-state architecture** by their second scroll.
- A distributed-systems engineer should have access to protocol framing, handshake diagrams, CRDT examples, concurrency boundaries, test methodology and primary source links.
- The page should not imply a fully released product when the latest recorded gate is **G6 PARTIAL**.
- Give primary attention to actual architecture, not to platform-themed decorative illustrations.

## Page skeleton / suggested top navigation

1. **Hero:** product name, one-line value, true stack, GitHub link, native application screenshot.
2. **Verified highlights:** framed TCP v2, UDP discovery, RGA CRDT, M7 test result, Linux candidate status.
3. **The problem:** one relatable concurrent-edit example; why transport alone cannot resolve conflicts.
4. **Architecture:** decentralized three-peer network diagram, then one-peer component diagram.
5. **Behind the protocol:** expandable discovery, HELLO, framing, snapshots, relay and reconnection chapters.
6. **How the CRDT works:** interactive-ready or stepwise insert/tombstone/convergence figures.
7. **Building the desktop:** Monaco bridge, Unicode coordinate conversion, persistence and native packaging.
8. **Milestones:** M0–M7 vertical timeline / accordion with key acceptance gates.
9. **Three debugging stories:** CRDT visual-gap error, three-peer snapshot bug, recovery backup loss. Link to remaining bugs below.
10. **Quality and limits:** tests, security boundaries, Linux support matrix, G6 PARTIAL.
11. **Reflection / future:** tradeoffs, lessons, known next steps, original attribution.
12. **Source appendix:** inline links to code, reports, GitHub, preserved P2PDocs attribution.

The full long-form case study is an authoring master, not a mandate that every subheading occupy equal space on the homepage. Keep the website page narrative anchored in the problem and reveal protocol details on demand.

## Hero design

- **Title:** c2g — Code 2gether
- **Subtitle:** A decentralized collaborative editor built around TCP/UDP networking and an RGA-style CRDT.
- **One sentence:** Edit the same document with peers on a trusted local network; each desktop process keeps and reconciles its own replica.
- **Metadata line:** Python • TCP/UDP • CRDT • Monaco • pywebview • Linux acceptance candidate • Oct 2026.
- **Links:** GitHub and an anchor to “How the architecture works”; do not show a Download button until an actual release exists.
- **Visual:** genuine two-peer app screenshot; one principal shot is stronger than several simulated UI renders.
- **Status:** low-emphasis plain text “M7: Linux acceptance candidate; other platforms pending validation”; avoid a bright success badge saying production-ready.

## Section-to-visual mapping

| Placement | Visual | Why it helps | Source or capture requirement | Caption idea |
|---|---|---|---|---|
| Hero | Native desktop screenshot | Immediate recognition of the software | Actual running latest Linux build | “Monaco desktop UI with peer connections” |
| Problem | Simple `AB` + simultaneous X/Y insert stepper | Makes concurrency intuitive | Construct from documented CRDT behavior, label illustrative | “Both edits must survive asynchronous delivery” |
| Architecture | `01_decentralized_topology.mmd` | Shows no central coordinator | Source diagram generated from application design | “Every peer has its own replica and storage” |
| Architecture detail | `02_single_peer_components.mmd` | Reveals subsystem boundaries | Source-verified class/modules | “Python CRDT remains authoritative” |
| Process | `03_milestones.mmd` | Makes scope and sequencing visible | Implementation plan M0–M7 | “Correctness before interface modernization” |
| Networking | `04_discovery_connection.mmd` | UDP/TCP split | `PeerDiscovery`, `NetworkManager` | “Discovery is not automatic connection” |
| Protocol | `06_tcp_frame.mmd` | Shows binary framing | `encode_frame`, `FrameDecoder` | “TCP needs explicit message boundaries” |
| Handshake | `05_hello_handshake.mmd` | Shows identity and capability checks | `NetworkManager._handshake` | “Document identity is validated before sync” |
| Live editing | `07_edit_propagation.mmd` | Shows JS ↔ Python ↔ network | `controller.py`/`bridge.py` | “One UI change becomes a CRDT operation” |
| CRDT | `08_crdt_concurrent_inserts.mmd` | Explains conflict semantics | M1 design, abstract illustrative example | “Concurrent inserts retain stable identity” |
| CRDT | `09_tombstone_pending.mmd` | Explains late delete | M1 pending tombstone behavior | “Delete intent survives message reordering” |
| Reliability | `10_three_peer_cycle.mmd` | Explains deduplication | M2/M7 topology tests | “Stable message IDs suppress relay loops” |
| Reliability | `11_reconnect_reconciliation.mmd` | Explains missed state repair | M7 real TCP tests | “Peers exchange full CRDT state on rejoin” |
| Concurrency | `13_concurrency_ownership.mmd` | Documents lock boundaries | M4 controller / M2 sessions | “Sockets and editor state have separate owners” |
| Persistence | `14_atomic_save_recovery.mmd` | Makes fault injection concrete | `JsonDocumentStore.save` | “Preserve a valid backup if commit fails” |
| Distribution | `16_build_release.mmd` | Clarifies desktop deployment | M6/M7 tooling reports | “Bundled assets, not a cloud-hosted frontend” |
| Testing | `17_testing_layers.mmd` | Shows evidence hierarchy | M7 report | “Real sockets, native automation, human gates” |
| Security | `18_security_boundary.mmd` | Prevents overclaiming | M7 threat model | “Trusted-LAN boundary; no peer encryption” |

## Interaction recommendations

- **Sticky desktop TOC** with active-section indication and collapse controls for protocol, CRDT and persistence subchapters.
- **Mobile TOC** in a compact “On this page” accordion, not a second sticky column.
- **CRDT stepper** may be implemented later as accessible HTML/React state, but keep the source model static and truthful. Example actions: insert X between A/B, insert Y at same gap, deliver in different orders, show same final deterministic order *only after using actual source ordering*.
- **Network timeline** with tabs for “Discover”, “Connect”, “HELLO”, “Sync”, “Edit”, and “Reconnect”; each view reveals its corresponding Mermaid SVG and a 50–100 word explanation.
- **Expandable evidence chips** beside key assertions can link to the function and test evidence ledger. They should not silently imply code review stronger than it was.
- **Code snippets** should default to 8–20 meaningful lines with a “view source” link, rather than dumping entire files.
- **Diagrams:** render Mermaid to inline accessible SVG for the production page if build tooling permits; preserve editable `.mmd` sources in the repository.

## Design system and readable typography

- One quiet canvas and one restrained accent color; avoid bright multi-card SaaS dashboard styling.
- Limit reading column to roughly 68–78 characters, use a wider breakout container for diagrams and tables.
- A compact metadata row is more useful than a wall of icon badges.
- Typography hierarchy: H1 title, H2 main narrative, H3 technical subchapters, clear labels for illustrative examples.
- Show code in a legible monospace face with optional copy control. Avoid tiny fonts on mobile.
- Diagram containers should allow horizontal scroll at narrow widths rather than shrinking text into illegibility.
- Tables should become horizontally scrollable, or transform into vertical cards on small screens.
- Keep visible test claims next to their qualification (“M7 report”, “loopback”, “at time of audit”).

## Screenshot capture checklist

Obtain genuine screenshots from a disposable C2G_STORAGE_ROOT profile. Do not show credentials or private document text.

1. **Hero:** working Monaco main view and peer sidebar with clear window title.
2. **New/Resume:** picker with one saved example document; demonstrate it does not obstruct editor after selection.
3. **Two-peer:** Alice and Bob windows displaying the same collaboratively edited text; caption only after both genuinely connected.
4. **After reconnect:** two instances with synchronized text, ideally supported by demo log or short terminal caption.
5. **Save status:** visible “Saved locally” state; use real UI not an invented status label.
6. **Export:** native file-dialog interaction only after physical user acceptance; do not reuse synthetic test as proof.
7. **Terminal:** a short real `pytest -q` result if rerun on final committed revision; screenshots of terminal logs are secondary to a textual test table.
8. **GitHub:** screenshot of Windows CI only if the Windows desktop-build job has actually run; do not fabricate a green check.

Use neutral sample text and crop unrelated machine UI. Include `alt` text capturing the UI state and the significance for a screen reader. Provide image width/height metadata and keep compressed previews accessible.

## Suggested figure accessibility text

- Decentralized topology: “Three desktop nodes, each with its own CRDT replica, connected directly by TCP; dotted UDP broadcasts announce presence.”
- Frame decoder: “Four-byte length followed by UTF-8 JSON payload; a buffering decoder reconstructs complete messages.”
- CRDT tombstone: “A delete reaches Bob before an insert; Bob stores the pending delete and hides the character when the insert later arrives.”
- Atomic save: “A temporary validated state replaces the primary only after flushing; an invalid primary is not rotated over a valid recovery backup.”

Do not rely on node color as the only channel for distinguishing transports or outcomes. Use solid versus dashed arrows and textual labels.

## Search/SEO and social preview metadata

- **Title tag:** `c2g — Peer-to-Peer Collaborative Editor | Engineering Case Study`
- **Meta description:** `A source-grounded engineering case study of a Python collaborative editor built with framed TCP, UDP LAN discovery, RGA-style CRDT replication, Monaco, and recoverable JSON storage.`
- **Suggested URL slug:** `/projects/c2g`
- **Open Graph type:** `article`
- **Preview image:** crop an **actual running app screenshot**, overlay only factual project title/short architecture label if desired.
- **Canonical link:** use the eventual portfolio page URL after deployment; none is assumed in this guide.
- **Structured data:** `SoftwareSourceCode` only if it accurately reflects public source; avoid claimed downloads, reviews, or prices.

## Proposed file mapping for a website implementation

These are illustrative paths, **not** existing files in the user's portfolio repository:

```text
site-project/
  public/projects/c2g/
    hero-real.png
    screenshot-new-resume.png
    screenshot-two-peers.png
    diagrams/*.svg
  src/content/projects/c2g.md[x]
  src/components/case-study/
    SectionNav
    Figure
    SourceEvidence
    CrdtStepper (optional)
```

Keep the long master case study in `docs/portfolio` and copy or transform its reviewed content into the website project. Avoid maintaining two inconsistent independent sources of facts.

## Launch readiness checklist for the page itself

- The opening explains the product and highlights P2P and CRDT within the first screen.
- All displayed screenshots are real captures and all diagrams are source-consistent.
- Source links resolve on an existing repository revision; pinned commit preferred.
- No “download” or “cross-platform” claim without current artifact evidence.
- M7 status and security boundary are visible in plain language.
- Mobile diagrams scroll/accessibly resize; keyboard navigation and focus rings work.
- Captions and `alt` text make every visualization comprehensible without color.
- Mermaid source remains independently editable.
- Attribution to original P2PDocs contributors and MIT license remains visible.
