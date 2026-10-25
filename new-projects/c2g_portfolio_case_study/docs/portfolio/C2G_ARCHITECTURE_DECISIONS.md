# c2g — Architecture Decisions (Source-Grounded Record)

These records reconstruct decisions from source and milestone evidence. **“Alternative” does not imply that a formal benchmark or team design review occurred.** References use branch-relative paths; pin to a commit before publication.

## ADR-01 — Modernize P2PDocs instead of claiming a greenfield build

- **Context:** The supplied MIT-licensed P2PDocs archive already implemented Tkinter editing, character identities, and TCP/UDP modules but had documented correctness and lifecycle defects.
- **Decision:** Preserve upstream Git history and attribution; evolve through M0–M7 correctness and integration gates.
- **Consequence:** Historical author credit remains necessary; the contribution is the documented modernization and reengineering.
- **Evidence:** `README.md`; `docs/IMPLEMENTATION_PLAN.md`; original P2PDocs source archive.

## ADR-02 — A local replica per peer, without central edit sequencing

- **Context:** Direct LAN collaboration should not require a hosted document coordinator.
- **Decision:** Each process owns a CRDT replica and synchronizes with other peers using P2P connections.
- **Tradeoff:** Network membership and consistency recovery must be handled by each participant; no cloud relay or WAN NAT solution.
- **Evidence:** `ApplicationController`, `CRDTDocument`, `NetworkManager`; M4 and M7 reports.

## ADR-03 — UDP discovery and TCP operations

- **Context:** Announcing presence and exchanging reliable document state are different tasks.
- **Decision:** UDP broadcasts publish endpoint metadata; explicitly selected peers connect over TCP.
- **Tradeoff:** LAN broadcasts can be filtered and have no delivery guarantee; manual endpoint connection remains useful.
- **Evidence:** `c2g/network/discovery.py`, `c2g/network/manager.py`, M2 report.

## ADR-04 — Versioned, length-framed JSON application protocol

- **Context:** TCP is a byte stream, not message-structured; older handshakes were incompatible with richer CRDT state.
- **Decision:** Four-byte big-endian length + UTF-8 JSON, protocol-v2 HELLO and capabilities.
- **Tradeoff:** JSON overhead and bespoke protocol maintenance; easier debugging and deterministic parsing tests.
- **Evidence:** `NetworkManager.encode_frame`, `FrameDecoder`, `_validate_hello`.

## ADR-05 — Stable peer and document identity

- **Context:** TCP socket identity, replica ID and shared document identity have distinct meanings.
- **Decision:** Versioned HELLO carries peer/document UUID and explicit empty-document join; mismatched nonempty documents are rejected.
- **Tradeoff:** Joining requires clear user intent; accidental merges are prevented.
- **Evidence:** `NetworkManager._handshake`, M2 report, M5 joined-document tests.

## ADR-06 — Character-level RGA variant with right anchors

- **Context:** Simple sibling-ID sorting produced wrong head/middle placement.
- **Decision:** Store predecessor and optional right-side visual-gap anchor; deterministic topological linearization.
- **Tradeoff:** Ordering and cycle-handling algorithms are more complex than append-only text operations.
- **Evidence:** `CRDTDocument._linearized_ids`; M1 REG-01/02.

## ADR-07 — Pending causal state and deletion tombstones

- **Context:** Out-of-order delivery may bring a delete before insert, or a child before its predecessor.
- **Decision:** Keep unresolved operations and monotonic visibility; do not garbage-collect ancestry on delete.
- **Tradeoff:** History grows until bounded limits; compaction requires further reasoning.
- **Evidence:** `CRDTDocument.insert_remote`, `delete_remote`, `apply_full_state`; M1 tests.

## ADR-08 — Snapshot exchange at connection/reconnection

- **Context:** New or rejoining peers may have missed operations.
- **Decision:** Reciprocal FULL_SYNC with CRDT metadata and per-session queue to prevent live updates overtaking snapshot boundary.
- **Tradeoff:** Potentially large snapshots; state limits and frame cap apply.
- **Evidence:** `NetworkManager._handshake`, `PeerSession.pending`, M2 report.

## ADR-09 — Message-ID-based operation relay

- **Context:** Three-peer chains require forwarding; cycles require duplicate suppression.
- **Decision:** Relay OP envelopes with stable message IDs, source exclusion and bounded seen cache; M7 extends nonempty reconnect snapshot relay.
- **Tradeoff:** Finite cache, trusted peers only; no global consensus ordering.
- **Evidence:** `NetworkManager._handle`, `broadcast_message`; M7 three-peer regression.

## ADR-10 — Threaded peers with scoped locks

- **Context:** Multiple socket readers and UI events share one authoritative replica.
- **Decision:** Controller RLock, CRDT lock, peer-registry RLock and per-session send locks; avoid closing sockets under global lock.
- **Tradeoff:** Lock order and worker cleanup need integration tests.
- **Evidence:** `ApplicationController`, `CRDTDocument`, `PeerSession`, M4/M7.

## ADR-11 — Monaco as interface, Python as source of truth

- **Context:** A familiar code-editing surface must not independently overwrite distributed state.
- **Decision:** pywebview bridge validates versioned local edits, converts UTF-16 ranges, applies CRDT operations and patches remote UI changes incrementally.
- **Tradeoff:** Unicode conversion and transaction versioning add bridge complexity; native renderer requirements remain.
- **Evidence:** `web/src/main.js`, `c2g/ui/controller.py`, M3/M4 reports.

## ADR-12 — Validated JSON replaces automatic legacy pickle recovery

- **Context:** Untrusted pickle deserialization is unsafe and historical resume path was inadequate.
- **Decision:** Schema-versioned JSON, strict validation, isolated storage keys, stable identities and tombstones.
- **Tradeoff:** Schema migration burden and larger serialized state than plain text.
- **Evidence:** `JsonDocumentStore`, `PersistedCrdt`, M5 report.

## ADR-13 — Atomic save with previous valid backup

- **Context:** A failed commit must not remove the only recovery copy.
- **Decision:** Write temp + fsync; validate old primary before rotating backup; os.replace; best-effort directory fsync; retain invalid state for diagnosis.
- **Tradeoff:** Atomic replace is filesystem/platform dependent and not immunity to hardware faults.
- **Evidence:** `JsonDocumentStore.save`, M7 §11 fault-injection regression.

## ADR-14 — Native pywebview/PyInstaller onedir distribution

- **Context:** Keep local Python sockets and Monaco in a desktop app without requiring users to host a web service.
- **Decision:** Local Vite bundle, pywebview GTK renderer, PyInstaller onedir, checksum and offline worker checks.
- **Tradeoff:** Large folder, platform-native dependencies, platform-specific acceptance burden.
- **Evidence:** `c2g.spec`, `scripts/build_desktop.py`, `c2g/ui/resources.py`, M6/M7.

## ADR-15 — Trusted-LAN-only release boundary

- **Context:** Current protocol has no peer authentication or encryption.
- **Decision:** Describe and test only the trusted-LAN threat model, reject incompatible documents/frames and cap resources; do not expose P2P ports to the Internet.
- **Tradeoff:** Excludes public WAN collaboration until authenticated secure transport and relay/NAT design exist.
- **Evidence:** README networking limits; M7 security findings.

## ADR-16 — G6 PARTIAL instead of claiming cross-platform shipping

- **Context:** Linux automated artifact and loopback tests were successful, but Windows, physical LAN, Docker and complete human UI checks remained open.
- **Decision:** Describe a Linux acceptance candidate and record unresolved gates; do not auto-publish.
- **Tradeoff:** Less marketable release label, stronger factual confidence.
- **Evidence:** `docs/M7_FINAL_VALIDATION_REPORT.md` §§15–20.
