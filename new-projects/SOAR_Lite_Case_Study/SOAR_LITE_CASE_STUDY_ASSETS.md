# SOAR Lite — Case Study Visual Asset Plan

This is an editorial shot list, **not a claim that screenshots have been taken**. Use genuine captures from the current local application. The LinkedIn workflow graphic may be used as an *illustration* only, not proof of actual UI or behavior.

## Capture standard

- Start the documented Compose stack on a development machine and submit a **synthetic** alert through `bash scripts/demo-alert.sh`.
- Use a dedicated demo data set. The default `8.8.8.8` is **Google Public DNS**, not a verified attacker; label all data synthetic and never imply real threat attribution.
- Do not display any API keys, webhook secrets, `.env` values, browser password-manager suggestions, developer tools with authorization headers, or raw provider credentials.
- Scrub unrelated hostnames, email addresses, account identifiers, and personally identifying fields if present. UUIDs of synthetic demo records are not inherently sensitive but may be replaced for a tidy public screenshot.
- Use consistent browser width (for example 1440px) and neutral zoom, capture PNG/WebP, and check that the actual app can still be read at 360–390px viewport on the portfolio page. Provide responsive image sizes as needed.
- Do not modify screenshots to fake execution statuses, intelligence scores, or audit events. Redactions should remove information only, not create misleading state.
- Every image should have a short caption, descriptive alt text, and a label such as **Synthetic demonstration — local SOAR Lite environment**.
- Do not commit screenshot assets into the SOAR Lite repository until reviewed; they can instead live in the portfolio's media assets directory.

## Recommended captures

| Proposed asset filename | Case-study placement | Show this exact evidence | Suggested caption | Suggested alt text |
| --- | --- | --- | --- | --- |
| `soar-overview.webp` | Hero / Analyst experience | React Overview with recent incidents and status tiles | "SOAR Lite analyst workspace displaying the local demonstration data." | "Dark SOAR Lite Overview showing incident counts and recent investigations." |
| `soar-incidents.webp` | Ingestion | Newly received synthetic incident, severity, and linked alert | "The synthetic alert becomes a persistent incident record." | "Incident Explorer with a selected suspicious-login incident and related alert." |
| `soar-investigation-evidence.webp` | Investigation deep dive | Newest **completed** investigation, provider `abuseipdb`, returned fields and result | "A background worker collected and saved real IP-reputation evidence." | "Completed investigation details with normalized AbuseIPDB evidence fields." |
| `soar-proposal.webp` | Approval design | Proposed action for the completed investigation, before approval | "Containment remains proposed until an analyst approves it." | "Response Actions showing a proposed simulated block awaiting approval." |
| `soar-executed-audit.webp` | Response and auditing | Executed action and persisted proposal, approval, execution timeline | "Approval and execution are separate, auditable state changes." | "Executed response action with approval and execution events in audit history." |
| `soar-active-blocklist.webp` | Response safety | Active lab entry, target IP, related action, simulation notice | "The response produces a PostgreSQL lab entry, not a live firewall rule." | "SOAR Lite Lab Blocklist showing an active simulated IP block with action ownership." |
| `soar-reverted.webp` | Reversal and test evidence | Reverted action and reversal audit event | "The analyst reversed the response and preserved its audit history." | "Reverted response with a reversal event in the audit timeline." |
| `soar-inactive-blocklist.webp` | Reversal result | Same action-owned entry now inactive, or filtered inactive listing | "Reversal deactivated only this response action's lab block." | "Inactive lab blocklist entry associated with the reverted response action." |
| `soar-test-output.webp` | Testing evidence, optional | User-captured final real-PostgreSQL suite output **only if actually passing** | "Final integration suite verification on disposable PostgreSQL." | "Terminal output from a verified PostgreSQL test run." |

## Diagram catalog

Twelve Mermaid diagrams are embedded in `SOAR_LITE_CASE_STUDY.md` and exported as editable `.mmd` source in `diagrams/`:

1. `01-workflow-comparison.mmd` — Manual versus automated workflow.
2. `02-milestone-timeline.mmd` — Engineering phases.
3. `03-system-architecture.mmd` — Service and provider boundaries.
4. `04-end-to-end-sequence.mmd` — Alert through reversal.
5. `05-data-relationships.mmd` — Actual model cardinalities.
6. `06-alert-ingestion.mmd` — Authorization and event idempotency.
7. `07-investigation-state-machine.mmd` — Status and recovery.
8. `08-competing-worker-sequence.mmd` — Locks and lease token fencing.
9. `09-investigation-retry.mmd` — Transient/permanent errors.
10. `10-response-state-machine.mmd` — Human authorization and execution.
11. `11-security-trust-boundaries.mmd` — External/internal interfaces.
12. `12-local-deployment.mmd` — Four-service Compose topology.

### Diagram treatment for the portfolio

Use a restrained color palette: charcoal text, pale neutral backgrounds or dark cards aligned with the portfolio, a single muted blue accent for data flow, and a distinct neutral gray for out-of-scope boundaries. A diagram should have a readable title and a one-sentence takeaway. On mobile, allow horizontal scroll or switch to a zoomable image rather than shrinking labels below legibility. If the portfolio already renders Mermaid safely, retain the source. Otherwise render its Markdown sources to SVG with a vetted Mermaid renderer during the site build; do not embed runtime untrusted Mermaid input.

## Media organization example

```text
portfolio/public/projects/soar-lite/
  overview.webp
  incidents.webp
  investigation-evidence.webp
  response-proposal.webp
  executed-audit.webp
  active-blocklist.webp
  reverted-response.webp
  inactive-blocklist.webp
```

These filenames are suggestions, **not existing verified paths**. Adapt them to the portfolio's routing and asset pipeline. Maintain the original local screenshots outside publicly committed assets until reviewed.

## Publishing checklist

- [ ] All images come from the real application, not generated mockups.
- [ ] Synthetic incident data is labeled as synthetic.
- [ ] No credentials, `.env`, or private telemetry are visible.
- [ ] Each claim shown in a caption matches the actual screenshot.
- [ ] Text is legible on mobile and screenshots are compressed appropriately.
- [ ] Mermaid diagrams render in the target portfolio's build.
- [ ] Screenshot references resolve after uploading the assets.
- [ ] No unverified final-test pass count is shown in a screenshot or caption.
