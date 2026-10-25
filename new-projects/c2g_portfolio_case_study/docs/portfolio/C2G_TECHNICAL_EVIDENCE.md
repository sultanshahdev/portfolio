# c2g — Technical Evidence and Claim Register

**Purpose.** Trace the portfolio narrative to actual source, tests and dated reports. **Evidence cutoff:** M7 report dated 2026-10-24. This register was assembled through the GitHub repository content connector and the earlier P2PDocs source archive supplied in the project context; the reporter **did not execute the c2g repository or its test suite in this environment**. Reported test output is identified as report evidence, not a newly independently rerun result.

**Status keys:** `CODE` source inspected; `REPORT` result recorded in an engineering report; `OWNER` reported manually by developer; `PENDING` unexecuted acceptance; `INFERENCE` explanatory synthesis.

| ID | Claim | Implementation reference | Evidence | Status and limitation |
|---|---|---|---|---|
| E01 | c2g modernizes MIT-licensed P2PDocs rather than originating as greenfield | `README.md`, `LICENSE`, Git history, earlier P2PDocs archive | README attribution; M0 plan | CODE/REPORT; preserve upstream credits |
| E02 | Each peer keeps a separate CRDT replica | `c2g/ui/controller.py`, `c2g/crdt/document.py` | M4 architecture; M7 two-peer restart | CODE/REPORT; no central collaboration authority |
| E03 | UDP broadcasting discovers LAN participants | `c2g/network/discovery.py:PeerDiscovery` | M2 discovery validation tests | CODE/REPORT; two-machine broadcast PENDING |
| E04 | Discovery does not auto-connect peers | `c2g/network/discovery.py`, `c2g/ui/controller.py` | M2 report | CODE/REPORT; manual Connect required |
| E05 | UDP default discovery port 5001 | `PeerDiscovery.discovery_port` | `c2g/network/discovery.py` | CODE; host firewall may block broadcasts |
| E06 | TCP uses a four-byte big-endian length prefix | `c2g/network/manager.py:encode_frame` | M2 frame tests | CODE/REPORT |
| E07 | Fragmentation/coalescing handled in buffered decode | `c2g/network/manager.py:FrameDecoder.feed` | M2 network tests | CODE/REPORT |
| E08 | Protocol v2 validates version, capabilities and identity | `NetworkManager._hello`, `_validate_hello`, `_handshake` | M2/M7 reports | CODE/REPORT; not cryptographic authentication |
| E09 | Empty join may adopt existing document UUID | `NetworkManager._handshake`, `ApplicationController._persist_joined_document_id` | M2/M5 tests | CODE/REPORT; unrelated nonempty documents rejected |
| E10 | Peer sessions bound by locking and capacity limits | `PeerSession`, `_accept_peers`, `_send`, `_drop` | M2/M7 tests | CODE/REPORT; hostile-network safety not proven |
| E11 | Limits: 16 peers, 16 handshakes, 12 MiB frames | `MAX_PEERS`, `MAX_HANDSHAKES`, `MAX_FRAME_SIZE` | M7 security section | CODE/REPORT; values are limits, not scalability benchmark |
| E12 | Operations are relayed with stable IDs and bounded cache | `NetworkManager._handle`, `broadcast_message`, `_remember` | M2 chain/cycle tests | CODE/REPORT |
| E13 | 20,000 seen IDs; 1,000 session pending packets | `MAX_SEEN_MESSAGES`, `MAX_PENDING_OUTBOUND` | M2 report | CODE/REPORT; finite cache |
| E14 | Rejoin full snapshots propagate to connected neighbors | `NetworkManager._handle` FULL_SYNC branch | M7 three-peer regression | CODE/REPORT; implemented during M7 |
| E15 | Character identity uses client ID and Lamport clock | `c2g/crdt/types.py`, `CRDTDocument` | M1 report | CODE/REPORT |
| E16 | CRDT stores predecessor and optional right anchor | `c2g/crdt/document.py` | M1 REG-01/02 | CODE/REPORT; implementation-specific RGA variant |
| E17 | Rendering uses deterministic ancestry and gap ordering | `CRDTDocument._linearized_ids` | M1 convergence results | CODE/REPORT; no formal proof |
| E18 | Missing parents and pending deletes are retained | `CRDTDocument.pending_by_predecessor`, `pending_deletes`, `delete_remote` | M1 regressions | CODE/REPORT |
| E19 | Tombstones are false-dominant in full-state merge | `CRDTDocument.apply_full_state` | M1 tests | CODE/REPORT |
| E20 | CRDT batch insert preserves per-character records | `CRDTDocument.insert_local_batch` | M3 feasibility | CODE/REPORT |
| E21 | M3 10,003-character in-memory paste reported 0.179s apply | `insert_local_batch`; M3 report | M3 measurement | REPORT; scoped in-memory spike, not wire performance |
| E22 | Monaco uses UTF-16 offsets, Python code points | `c2g/ui/controller.py:utf16_to_codepoint`, `codepoint_to_utf16` | M3/M4 tests | CODE/REPORT |
| E23 | Bridge/controller own transaction and remote patch flow | `c2g/ui/bridge.py`, `c2g/ui/controller.py` | M4 report | CODE/REPORT |
| E24 | Startup picker New/Resume activates a persisted replica | `c2g/ui/app.py:DesktopApplication` | M5 report, M7 native smoke | CODE/REPORT; source currently has `debug=True`, avoid claiming release-mode flag |
| E25 | JSON schema validates document state | `c2g/storage/json_store.py:validate_state` | M5 JSON tests | CODE/REPORT |
| E26 | Same-directory temp + fsync + replace protect save | `JsonDocumentStore.save` | M5/M7 persistence tests | CODE/REPORT; storage/hardware guarantees bounded |
| E27 | Corrupt-primary backup rotation defect fixed | `JsonDocumentStore.save` primary validation | M7 P0 fault-injection regression | CODE/REPORT |
| E28 | Owner locking and a bounded autosave writer | `c2g/storage/recovered_document.py`, other storage helpers | M5 lifecycle report | CODE/REPORT; exact platform-specific lock mechanism in M5 |
| E29 | Cyclic resume cleans up ownership resources | CRDT full-state validation and `PersistedCrdt` construction path | M7 P1 subprocess regression | REPORT; no newer field results asserted |
| E30 | Final Python suite 68 passed, 12.22 seconds | `tests/`, `docs/M7_FINAL_VALIDATION_REPORT.md` | M7 §3 | REPORT; no live rerun here |
| E31 | 100 seeded three-replica histories of 30 generated edits each | CRDT randomized test, M7 §4 | M7 §4 | REPORT; not formal universal proof |
| E32 | Real two-/three-peer TCP integration and restart convergence | M7 network tests, `NetworkManager` | M7 §§5–6 | REPORT; loopback rather than physical LAN |
| E33 | GTK and frozen automated checks passed | `scripts/validate_desktop.py` | M7 §7 | REPORT; physical clipboard, file dialog PENDING |
| E34 | 96 bundled Vite assets and Monaco workers | `scripts/build_desktop.py`, `c2g.spec`, `c2g/ui/resources.py` | M7 §14 | REPORT; full onedir folder required |
| E35 | Local asset server binds loopback, P2P listener LAN | `c2g/ui/app.py`, `NetworkManager.start_listening` | M7 §12 | CODE/REPORT; pywebview Bottle loopback exists |
| E36 | Production npm audit zero vulnerabilities at test time | `web/package.json`, `web/vite.config.js` | M7 §13 | REPORT; not full security guarantee |
| E37 | DOMPurify 3.4.17 in inspected bundle | `web/package.json`, Vite resolver | M7 §13 | REPORT; verified shipped bundle at M7 |
| E38 | G6 remained PARTIAL; no public release approved | `README.md`, M7 §§18–20 | M7 gate | REPORT; verify for any future release announcement |
| E39 | Windows build/runtime not verified | `.github/workflows/tests.yml` | M7 §8 | PENDING; CI configuration alone is insufficient |
| E40 | Docker execution not verified | `Dockerfile.tests` | M7 §9 | PENDING; denied access to daemon |
| E41 | Two-machine physical LAN discovery not verified | `PeerDiscovery`, M7 §10 | M7 §10 | PENDING; loopback is not broadcast evidence |
| E42 | No encryption/authentication in P2P transport | `c2g/network/manager.py` | M2/M7 security sections | CODE/REPORT; trusted-LAN-only |

## Source inventory

The core references are relative to the [c2g repository](https://github.com/sultanshahdev/c2g): `README.md`, `c2g/network/{manager,discovery}.py`, `c2g/crdt/{document,types,message}.py`, `c2g/ui/{app,bridge,controller,resources}.py`, `c2g/storage/{json_store,recovered_document}.py`, `web/src/main.js`, `docs/M{1,2,3,4,5,6,7}_*.md`, `tests/`, and `scripts/validate_desktop.py`. Consult the repository's live tree for precise filenames and source lines before pinning links to a commit.

## Source-of-truth and conflict resolution

1. Latest inspected code describes **implementation**.
2. Dated M7 report describes **observed tests and release status**.
3. Earlier milestone reports describe **the development sequence**, even where final code later changed.
4. Original P2PDocs archive identifies **inherited functionality**.
5. Project-owner confirmations are **owner reports**, not independently observed manual tests.
6. Hypothetical CRDT example text, teaching diagrams and UI placement are **illustrations**, not transcripts of instrumented network traffic.

## Further verification required before public case-study publication

- Run physical two-machine TCP/UDP LAN smoke and retain screenshots/logs.
- Exercise actual clipboard and native export dialog by hand.
- Run Windows build and WebView2 runtime if that platform is to be claimed.
- Run Docker tests only with authorized daemon access; do not mark as passed merely because Dockerfile exists.
- Select a reviewed immutable Git commit for permalinks and record new test versions if code changes.
- Capture original screenshots from current Linux artifact instead of creating fictional product evidence.
