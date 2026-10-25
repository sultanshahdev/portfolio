# c2g Engineering Case Study — Portable Documentation Bundle

This archive contains a source-grounded long-form engineering case study for the c2g portfolio page. It was generated separately from the developer's local repository; **no source code, local Git history, commits, remote branches or releases were modified**.

## Contents

```text
docs/portfolio/
  C2G_ENGINEERING_CASE_STUDY.md      # ~6.8k narrative words; 19 embedded Mermaid diagrams
  C2G_TECHNICAL_EVIDENCE.md         # evidence ledger, limitations and cross-checks
  C2G_ARCHITECTURE_DECISIONS.md     # 16 architecture decision records
  C2G_PAGE_PRESENTATION.md          # website layout / screenshot / accessibility plan
  DIAGRAM_INDEX.md                  # source diagram index
  diagrams/*.mmd                    # 19 independently editable Mermaid sources
```

## Add to an existing c2g checkout

From the directory containing this extracted folder, copy `docs/portfolio/` into the c2g repository's existing `docs/` directory. Example:

```bash
cp -a c2g_portfolio_case_study/docs/portfolio /home/sultan/Desktop/repos/c2g/docs/
```

Review the diff before committing. The files are documentation only. **Do not use the unverified cross-platform items as proof of public release.**

## Verification notes

- Source content and reports were read from GitHub's c2g repository connector; the historical P2PDocs ZIP available in conversation was also examined.
- **The original tests and desktop app were not executed anew** in the documentation-generation environment. Their reported results come from `docs/M7_FINAL_VALIDATION_REPORT.md` dated 2026-10-24.
- All 19 `.mmd` files are also embedded in the main Markdown. They can be extracted, edited or rendered separately.
- The Mermaid command-line renderer was not installed in this environment; textual source/diagram consistency checks were performed, but full diagram rendering should be checked in the portfolio website build.
- There are no fabricated product screenshots. The presentation guide explains which genuine screenshots to capture.
- GitHub links use mutable `main` branch URLs. Pin them to the exact reviewed commit after incorporating these files.

## Suggested next step

Use this document package as the **content source** for an implementation prompt in the portfolio website repository. Render Mermaid diagrams, add real screenshots, and design an accessible page. Do not ask the website tool to infer or invent missing c2g technical facts.
