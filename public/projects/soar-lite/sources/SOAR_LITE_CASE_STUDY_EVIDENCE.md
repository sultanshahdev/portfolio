# SOAR Lite — Evidence and Claim Traceability

This is an editorial verification appendix for the portfolio case study. It separates current source facts, historical tests, and user-reported live verification. It is not a security certification or a report of tests performed by this writer.

**Source repository:** https://github.com/sultanshahdev/soar-lite

**Research basis:** Current repository files read through the connected GitHub repository; `README.md`, `architecture.md`, `context.md`, `AGENTS.md`, API and domain code, persistence models, worker and connector code, Compose and helper scripts, test fixtures, and the lifecycle acceptance test. Historical development log entries are retrospective evidence, not executable proof. The full repository was not cloned or run in this environment.

## Requirement and implementation mapping

| Claim ID | Claim supported in case study | Evidence path(s) / check | Confidence and boundary |
| --- | --- | --- | --- |
| E01 | Project is a local-first modular monolith | `README.md`, `architecture.md`, `AGENTS.md`, `infra/compose.yaml` | Current architecture documentation and Compose support it |
| E02 | API, worker, React, PostgreSQL are separate processes | `infra/compose.yaml`, `backend/app/workers/main.py` | Direct implementation |
| E03 | Webhook bearer credential and analyst X-API-Key are separate | `backend/app/security/auth.py` | Direct implementation; shared analyst key is not per-user auth |
| E04 | Placeholder credentials fail closed | `backend/app/security/auth.py` | Direct implementation |
| E05 | Incoming event schema validates type, severity, timezone, canonical IP | `backend/app/domain/alerts/schemas.py` | Direct implementation |
| E06 | JSON content-type and declared Content-Length guard | `backend/app/api/alerts.py` | Direct implementation; no claim of streaming hard-limit enforcement |
| E07 | Transactional alert, incident, and optional investigation persistence | `backend/app/domain/alerts/service.py` | Direct implementation |
| E08 | Duplicate source/event ID returns existing alert and incident | `backend/app/domain/alerts/service.py`, `backend/app/persistence/models.py`, `backend/tests/test_end_to_end_acceptance_postgres.py` | Direct logic and acceptance assertions |
| E09 | Only `suspicious_login` with global IP queues investigation | `backend/app/domain/alerts/service.py` | Direct implementation |
| E10 | Provider lookup uses AbuseIPDB v2 HTTPS, normalizes fields | `backend/app/connectors/abuseipdb.py` | Direct implementation; separate live test for real connectivity |
| E11 | Evidence saved with investigation and JSONB result | `backend/app/workers/investigations.py`, `backend/app/persistence/models.py` | Direct implementation |
| E12 | Investigation job claims use `SKIP LOCKED`, owner, lease token and expiry | `backend/app/workers/investigations.py` | Direct implementation; PostgreSQL integration tests historically exercised it |
| E13 | Claims commit before outbound provider I/O | `backend/app/workers/investigations.py`, `architecture.md` | Direct implementation |
| E14 | Token-fenced stale completion; bounded retry/backoff | `backend/app/workers/investigations.py`, `backend/tests/test_investigation_worker_postgres.py` | Direct implementation and integration-test source |
| E15 | Provider calls are not exactly once across crashes | `backend/app/workers/investigations.py`, `architecture.md` | Architectural limitation acknowledged |
| E16 | Proposal requires completed incident-linked investigation and matching global IP | `backend/app/api/responses.py` | Direct implementation |
| E17 | Duplicate active response proposals limited by partial unique index | `backend/app/persistence/models.py` | Direct schema definition |
| E18 | Approve/reject transitions are proposed-only conditional updates | `backend/app/api/responses.py` | Direct implementation |
| E19 | Response worker claims approved or expired executing jobs | `backend/app/workers/responses.py` | Direct implementation |
| E20 | Simulated block, executed state and audit committed together | `backend/app/workers/responses.py`, `backend/app/connectors/lab_response.py` | Direct implementation; no real firewall effect |
| E21 | Block is unique to response action; reversal selective | `backend/app/connectors/lab_response.py`, `backend/app/persistence/models.py`, `backend/app/api/responses.py` | Direct implementation |
| E22 | Response audit event fields and status history | `backend/app/persistence/models.py`, `backend/app/api/responses.py`, `backend/app/workers/responses.py` | Direct implementation; **not** tamper-proof |
| E23 | SOC Overview, Incidents, Investigations, Responses, Blocklist views | `frontend/src/App.tsx`, `frontend/src/api.ts` | Current React source |
| E24 | Analyst key remains in-memory; Vite proxy | `frontend/src/App.tsx`, `frontend/src/api.ts`, `frontend/vite.config.ts` | Direct implementation; not full identity solution |
| E25 | Localhost ports, internal database, migrations on backend startup | `infra/compose.yaml` | Direct deployment configuration |
| E26 | Setup/start/demo helper scripts exist and avoid deliberate secret printing | `scripts/setup.sh`, `scripts/start.sh`, `scripts/demo-alert.sh` | Source-verified; no claim scripts were runtime-tested here |
| E27 | Acceptance path exercises actual API+workers+PostgreSQL with mocked provider | `backend/tests/test_end_to_end_acceptance_postgres.py` | Test source confirmed; final suite pass not independently confirmed |
| E28 | Integration test schema reset and per-test truncation | `backend/tests/conftest.py`, `context.md` | Test-fixture source confirmed; destructive only on explicitly disposable DB |
| E29 | Early successful 24/0/0 PostgreSQL test run | `context.md` Task 3C.1 entry | Historical development-log result for then-current scope, not final suite |
| E30 | 8/8 completed live walkthrough including actual AbuseIPDB evidence | Current conversation's manual step-by-step confirmation | User-reported live behavior; not performed by the document author |
| E31 | Final 34 passing tests | **No independently confirmed final passing run supplied** | **Do not claim as achieved**; last recorded test isolation fix described an expected result |
| E32 | Screenshot media | `README.md` says screenshots pending; portfolio brief requests authentic captures | No current screenshot set verified; use placeholders/asset plan |

## Historical development evidence

The repository's `context.md` records implementation steps and intermediate testing outcomes. It documents foundation and test-client compatibility work, migration/schema isolation, an investigation connector and leased worker, response proposal and lab response phases, React dashboard phases, disposable PostgreSQL acceptance testing, and the final README/setup/architecture effort. The specific milestone names and historical results in the narrative are grounded in that log.

**Important nuance:** `context.md` contains time-local statements such as "not implemented" in *early* task entries. These describe what was true **at that milestone**, not current repository limitations. The final source and latest documentation govern present functionality.

## Verification taxonomy for the published page

- **Source verified:** behavior can be traced to an implementation file or schema definition.
- **Test specified:** assertions exist in tests, but this writer did not execute the suite.
- **Historically verified:** a recorded earlier run succeeded for the test set that existed at that point.
- **Manually confirmed:** user reported observing the result in the running UI and backend.
- **Unverified:** final test suite, live script executions under Codex sandbox, performance benchmarking, customer adoption, production deployment.

Do not blend "has a test" with "the test passed in the latest build". Do not blend "local Compose deployment" with "cloud production deployment". Do not blend "real IP-reputation lookup" with "the example IP is malicious".

## Useful source URLs

- [Architecture](https://github.com/sultanshahdev/soar-lite/blob/main/architecture.md)
- [README and setup](https://github.com/sultanshahdev/soar-lite/blob/main/README.md)
- [Alert service](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/domain/alerts/service.py)
- [Alert schema](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/domain/alerts/schemas.py)
- [Authentication](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/security/auth.py)
- [Database models](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/persistence/models.py)
- [Investigation worker](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/workers/investigations.py)
- [Response worker](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/workers/responses.py)
- [AbuseIPDB connector](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/connectors/abuseipdb.py)
- [Simulated response adapter](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/connectors/lab_response.py)
- [Response endpoints](https://github.com/sultanshahdev/soar-lite/blob/main/backend/app/api/responses.py)
- [PostgreSQL test fixtures](https://github.com/sultanshahdev/soar-lite/blob/main/backend/tests/conftest.py)
- [Lifecycle acceptance test](https://github.com/sultanshahdev/soar-lite/blob/main/backend/tests/test_end_to_end_acceptance_postgres.py)
- [Docker Compose configuration](https://github.com/sultanshahdev/soar-lite/blob/main/infra/compose.yaml)
- [Development history](https://github.com/sultanshahdev/soar-lite/blob/main/context.md)
