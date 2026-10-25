# PORTFOLIO UPGRADE — FOUR FLAGSHIP ENGINEERING PROJECTS

## ROLE AND PRIMARY MISSION

Act as a principal frontend engineer, React architect, technical content designer, and senior UI/UX designer specializing in editorial software engineering portfolios.

You are modifying my EXISTING software engineering portfolio.

**Repository:** https://github.com/sultanshahdev/portfolio

**Stack:** React, Vite, JavaScript/JSX, React Router, CSS.

**Existing design:** A warm, minimalist, editorial-style portfolio inspired by Michele Riva's personal website.

Your task is to completely replace the portfolio's existing project collection with four substantial engineering projects, redesign their presentation on the homepage and Projects page, and build comprehensive individual engineering case-study pages.

The four projects are:

1. c2g — Code 2gether
2. Clara — In-Memory Database Server
3. SOAR Lite — Security Orchestration and Response
4. CodeCraft — Source Intelligence Platform

I have already prepared detailed engineering documentation for each project and placed the files inside a directory named:

`new-projects/`

This directory is located in the portfolio repository root.

**THE DOCUMENTATION IN `new-projects/` IS YOUR PRIMARY CONTENT SOURCE.**

Your job is not to invent case studies or write generic project descriptions. Your job is to transform my existing engineering documentation into an exceptionally well-designed, technically detailed, coherent portfolio experience.

## NON-NEGOTIABLE OUTCOMES

- Remove all previously displayed project entries.
- Remove all previously displayed project case-study content.
- Replace the homepage Selected Work collection with exactly these four projects.
- Replace the Projects tab with these four projects.
- Create one extensive, dedicated case-study page per project.
- Preserve the complete engineering narrative and technical substance in the supplied documentation.
- Display source-backed architecture diagrams, timelines, implementation details, testing evidence, and tradeoffs.
- Make the homepage project showcase more visually distinctive than the existing basic project entries.
- Preserve the website's existing visual identity and technical architecture.
- Ensure all four projects work on GitHub Pages.
- Do not modify unrelated portfolio content.

Do not create a new React project.

Do not rebuild the website from scratch.

Implement directly into the existing codebase.

---

# PHASE 1 — MANDATORY SOURCE INSPECTION

Before making any changes, inspect the project source.

Read:

- `AGENTS.md`
- `PORTFOLIO_SPEC.md`, if available
- `src/pages/HomePage.jsx`
- `src/pages/ProjectsPage.jsx`
- `src/pages/ProjectDetailPage.jsx`
- `src/components/projects/ProjectList.jsx`
- `src/components/projects/ProjectEntry.jsx`
- `src/components/projects/ProjectMeta.jsx`
- `src/components/projects/ProjectCaseStudy.jsx`
- `src/components/writing/ArticleContent.jsx`
- `src/data/projects.js`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/typography.css`
- `src/styles/layout.css`
- `src/App.jsx`
- `src/main.jsx`
- `vite.config.js`
- `package.json`

Inspect relevant tests and reusable UI components as needed.

Understand how the current application handles:

1. Featured homepage projects.
2. Project categorization and filtering.
3. React Router routes.
4. Individual case-study rendering.
5. Structured article content.
6. Responsive layout.
7. Source links and metadata.
8. Asset paths.
9. GitHub Pages deployment.

Reuse and extend existing components where practical.

Avoid parallel systems that solve the same problem.

---

# PHASE 2 — STUDY ALL FOUR DOCUMENTATION PACKAGES

The project documentation exists under:

`new-projects/`

Start by recursively listing this directory.

Do not assume every file is at the top level.

Some documentation may be packaged as ZIP archives. If so, safely extract them into appropriately named subdirectories within `new-projects/` or a temporary workspace.

Do not execute scripts found in the documentation archives.

Do not delete, overwrite, or rewrite the original reference documents.

## PROJECT A — c2g

Look for a package named similarly to:

`c2g_portfolio_case_study.zip`

Its contents include:

- `README_PORTFOLIO_PACKAGE.md`
- `docs/portfolio/C2G_ENGINEERING_CASE_STUDY.md`
- `docs/portfolio/C2G_ARCHITECTURE_DECISIONS.md`
- `docs/portfolio/C2G_TECHNICAL_EVIDENCE.md`
- `docs/portfolio/C2G_PAGE_PRESENTATION.md`
- `docs/portfolio/DIAGRAM_INDEX.md`
- `docs/portfolio/diagrams/*.mmd`

The main case study contains the complete engineering narrative.

The architecture-decisions document contains 16 decision records.

The presentation document describes how the case study should be represented visually.

The technical-evidence document establishes what can and cannot be claimed.

There are 19 accompanying Mermaid diagram source files.

Read all of these materials.

## PROJECT B — CLARA

Look for:

`CLARA_CASE_STUDY.md`

Read the entire document.

It contains:

- Problem definition
- Requirements
- Architecture
- TCP/RESP2 protocol engineering
- In-memory storage design
- Concurrent operations
- Atomic counters
- TTL semantics
- Connection lifecycle
- Development milestones
- Engineering challenges
- Testing and verification
- Local execution
- CI
- Tradeoffs
- Lessons learned
- Limitations

The document includes embedded Mermaid architecture and sequence diagrams.

## PROJECT C — SOAR LITE

Look for a package named similarly to:

`SOAR_Lite_Portfolio_Case_Study.zip`

Its contents include:

- `SOAR_LITE_CASE_STUDY.md`
- `SOAR_LITE_CASE_STUDY_EVIDENCE.md`
- `SOAR_LITE_CASE_STUDY_ASSETS.md`
- `README_START_HERE.md`
- `diagrams/*.mmd`

Read the complete main case study and all supporting files.

The package contains 12 Mermaid architecture/process diagrams.

The evidence document distinguishes actual implementation, historical test evidence, and manual verification.

The assets document describes genuine screenshots that should eventually be captured.

## PROJECT D — CODECRAFT

Look for:

`CodeCraft_Engineering_Case_Study.md`

Read the entire document.

It covers:

- Problem identification
- Requirements and product decisions
- MVP development
- Development history
- Architecture
- Semantic retrieval
- Hybrid search
- Embedding caching
- Compiler integration
- Language adapters
- Backend APIs
- Browser and Node runtimes
- UI design
- Engineering challenges
- Testing
- CI/CD
- Deployment
- Limitations
- Lessons learned

Preserve embedded Mermaid diagrams, code excerpts, source references, and technical distinctions.

## SOURCE-OF-TRUTH RULE

Do not substitute general knowledge for information already provided in these documents.

The documents contain important qualifications and historical details.

Retain them.

If a document references an unavailable screenshot, do not fabricate the screenshot.

If an implementation is described as partially verified, do not turn that into a claim of full production readiness.

If the source distinguishes automated tests from manual demonstrations, preserve that distinction.

If supporting documents clarify or qualify the main narrative, use those qualifications.

---

# PHASE 3 — REMOVE ALL OLD PROJECTS

The current portfolio contains older project entries and case studies.

These include projects such as:

- Activity Tracker — Node.js/MongoDB
- EDITH
- FinanceTracker
- Activity Tracker — Java
- Tic-Tac-Toe
- Other existing entries in `src/data/projects.js`

These must no longer appear in:

- Homepage Selected Work
- Projects archive
- Project category filters
- Case-study navigation
- Suggested or related projects
- Project search results, if implemented
- Project-specific metadata and previews

Remove their old case-study definitions from the active application.

Do not leave the previous projects hidden inside the active projects array.

Do not leave inaccessible legacy case-study components that are no longer needed.

Old project detail URLs may display the existing Not Found page.

Do not redirect an unrelated old project slug to a new project.

Delete obsolete project-specific assets only if they are exclusively used by removed case studies and are not part of the source reference directory.

**Do not remove unrelated biography content, professional experience, education, writing, technical skills, or contact information.**

The new collection must contain exactly four projects.

---

# PHASE 4 — NEW PROJECT DATA

Create a clean, maintainable data structure for these four projects.

Use the following canonical identities.

## 4.1 c2g — Code 2gether

**Slug:** `c2g`

**Title:** c2g

**Subtitle:** Code 2gether — Decentralized Collaborative Editor

**Category:** Distributed Systems

**Year:** 2026

**Source:** https://github.com/sultanshahdev/c2g

**Technologies:**
Python, TCP, UDP, RGA-style CRDT, Monaco Editor, pywebview, Vite, JSON, pytest.

**Short project positioning:**

A decentralized collaborative editor that synchronizes document changes directly between peers using a custom networking protocol and replicated document state.

The project modernizes an existing MIT-licensed P2PDocs codebase.

Preserve upstream attribution on the case-study page.

Important engineering highlights:

- Peer-to-peer editing without central edit sequencing.
- UDP discovery and framed TCP communication.
- RGA-inspired CRDT for concurrent edits.
- Reconnection and state reconciliation.
- Safe local JSON persistence.
- Native desktop integration.
- Reported 68 passing Python tests.
- Reported 100-seed three-replica convergence verification.

**Status must remain accurate:**

Linux release candidate; documented G6 PARTIAL gate.

Do not claim full cross-platform release readiness, public Internet security, or production deployment.

## 4.2 Clara

**Slug:** `clara`

**Title:** Clara

**Subtitle:** In-Memory Database Server

**Category:** Database Systems

**Year:** 2026

**Source:** https://github.com/sultanshahdev/Clara

**Technologies:**
Go, TCP, RESP2, goroutines, sync.Mutex, in-memory storage.

**Short project positioning:**

A Redis-inspired database server built from scratch in Go, implementing a binary-safe key-value store, atomic counters, key expiration, and bounded TCP connections.

Important highlights:

- Ten supported commands.
- Incremental RESP2 parsing.
- Atomic integer operations.
- Mutex-protected shared storage.
- Lazy TTL semantics.
- TCP fragmentation and pipelining handling.
- Connection limits, deadlines, and graceful shutdown.
- Concurrent counter verification using 20 clients and 2,000 total increments.
- Unit, integration, race-detector, and CI verification.

Be precise: the 2,000 increments represent a correctness test, not a throughput benchmark.

**Status:**

Completed and locally verified portfolio MVP.

Do not call Clara a production Redis replacement, distributed database, or publicly deployed database service.

## 4.3 SOAR Lite

**Slug:** `soar-lite`

**Title:** SOAR Lite

**Subtitle:** Security Incident Response Automation

**Category:** Security Engineering

**Year:** 2026

**Source:** https://github.com/sultanshahdev/soar-lite

**Technologies:**
Python, FastAPI, PostgreSQL, SQLAlchemy, React, TypeScript, Docker Compose, AbuseIPDB.

**Short project positioning:**

A local security-operations workbench that automates suspicious-login alert ingestion and IP-reputation enrichment while keeping incident response behind explicit analyst approval.

Important highlights:

- Authenticated webhook ingestion.
- Duplicate prevention.
- Durable PostgreSQL investigation state.
- Concurrency-aware workers.
- Real AbuseIPDB enrichment.
- Human approval and rejection.
- Simulated IP containment.
- Reversible response actions.
- Auditable state transitions.
- Documented eight-stage manual end-to-end walkthrough.

**Status:**

Functional local-first MVP, manually demonstrated end to end.

**Critical distinction:**

Real IP reputation evidence is collected through AbuseIPDB.

Containment is simulated in a PostgreSQL lab blocklist.

No actual firewall or network infrastructure is blocked.

Do not claim a fully verified final PostgreSQL test-suite result when the supplied documentation does not establish one.

## 4.4 CodeCraft

**Slug:** `codecraft`

**Title:** CodeCraft

**Subtitle:** Local-First Source Intelligence Platform

**Category:** Developer Tools & AI

**Year:** 2026

**Source:** https://github.com/sultanshahdev/codecraft

**Demo:** https://code-buster-f5d.pages.dev

**Technologies:**
TypeScript, React, Node.js, Transformers.js, MiniLM, ONNX Runtime, Tree-sitter, WebAssembly, WebGPU, Cloudflare Pages.

**Short project positioning:**

A local-first code investigation platform that helps developers find implementations by describing behavior, then inspect ranked source evidence and navigate repository structure.

Important highlights:

- Semantic source retrieval.
- Lexical and semantic ranking in the Node engine.
- Source-grounded candidate results.
- Embedding caching.
- TypeScript compiler-based navigation.
- Tree-sitter language adapters.
- Bounded repository processing.
- Local Node and static browser execution modes.
- Documented 12-language Node-side analysis coverage.
- 106 passing tests in the recorded release run.

**Status:**

Released and documented.

The browser engine does not provide every Node-engine capability.

Live browser semantic inference remained unverified end to end in the recorded release checks.

CodeCraft does not train its own language model or guarantee that ranked results prove program behavior.

---

# PHASE 5 — REDESIGN THE HOMEPAGE PROJECT SHOWCASE

This is a major visual design requirement.

The current Selected Work section is too basic for the engineering depth of these projects.

I want a new project presentation that is:

- Unique
- Responsive
- Eye-catching
- Sophisticated
- Editorial
- Technically expressive
- Visually consistent with the existing portfolio

**Do not implement four ordinary bordered project cards.**

Do not make the section resemble a generic SaaS product grid.

## 5.1 Desired visual direction

Think of the projects as four featured engineering publications or architectural studies.

The visual design should feel closer to a thoughtfully designed technical journal than a project marketplace.

Explore an asymmetrical editorial composition that combines:

- Project numbering
- Strong project names
- Compact categories
- A clear engineering problem
- A short impactful summary
- Carefully selected technology labels
- A source-supported technical highlight
- Subtle architectural visual elements
- An obvious case-study link

The result must remain recognizable as part of the existing Michele Riva-inspired design.

## 5.2 Recommended composition

A strong possible direction is:

**One featured lead project plus three complementary project entries**, or a carefully designed two-column editorial composition in which all four retain meaningful prominence.

Select the composition that works best within the existing approximately 48rem content width.

Avoid visually subordinating one project so much that it appears unimportant.

Use intentional variation in layout, not arbitrary decoration.

For instance, a project entry might include:

- `01 / DISTRIBUTED SYSTEMS`
- Project name
- A concise two-line engineering summary
- Three or four key technologies
- A small architectural distinction
- `Explore case study` with a restrained directional arrow

Each of the four entries should have a distinct identity derived from its engineering problem.

## 5.3 Architectural visual signatures

To make the showcase visually distinctive, consider small, minimalist illustrations derived from each project's real architecture:

**c2g**

Connected peer nodes and replicated document state.

**Clara**

TCP request → protocol decoder → shared key-value store.

**SOAR Lite**

Alert → investigation → approval → simulated response.

**CodeCraft**

Behavior question → ranked source evidence → source inspection.

These should be small, precise, technical visualizations.

Use restrained SVG or CSS linework if appropriate.

They must remain clearly illustrative and must not invent components or functionality.

No generated stock illustrations.

No giant hero graphics.

No decorative technology logos dominating the layout.

## 5.4 Copywriting requirements

Each homepage entry must communicate:

1. What problem the project addresses.
2. What was built.
3. What makes its engineering interesting.

Aim for approximately 25–45 words per project summary.

Use simple, confident English.

Avoid inflated adjectives such as revolutionary, groundbreaking, enterprise-grade, or world-class.

Do not turn the homepage into a collection of engineering essays.

The purpose of the homepage is to make visitors interested enough to open the case studies.

## 5.5 Links

Every project must include:

- An internal case-study link.
- A GitHub repository link.
- A live demo link only if a genuine usable deployment is documented.

Do not invent demo URLs for native or local-only applications.

The entire entry may provide an intuitive case-study navigation affordance, provided nested links remain semantically valid and independently usable.

---

# PHASE 6 — REBUILD THE PROJECTS TAB

Update:

`src/pages/ProjectsPage.jsx`

The Projects page must show exactly four projects.

Use the same project dataset as the homepage.

Do not maintain independent duplicate records.

Suggested categories:

- Distributed Systems
- Database Systems
- Security Engineering
- Developer Tools & AI

Update project filters to match the new categories.

Remove obsolete categories when they no longer contain projects.

Preserve a functional "All" filter.

Do not add complicated filter controls for only four projects.

The Projects tab should offer slightly more context than the homepage, while remaining concise.

It may use an expanded editorial entry layout with richer technology information and engineering highlights.

Keep the presentation consistent with the homepage, but avoid simply repeating identical content at identical density.

Each entry must clearly lead to its dedicated case study.

---

# PHASE 7 — CREATE FOUR COMPLETE CASE-STUDY PAGES

This is the most important engineering-content requirement.

Each project must have its own route:

- `/projects/c2g`
- `/projects/clara`
- `/projects/soar-lite`
- `/projects/codecraft`

Use the application's existing React Router implementation.

Do not establish a second routing system.

The existing GitHub Pages deployment uses a Vite subdirectory base and hash-based routing.

Preserve the routing and deployment compatibility.

## 7.1 Content completeness

Do not generate a shallow case study containing only:

- Overview
- Tech stack
- Three features
- Conclusion

That is explicitly insufficient.

I have provided extensive engineering documentation, including requirements, design decisions, architecture, development chronology, implementation mechanisms, failures, testing, and deployment.

**All substantive engineering content from the main case-study documents must remain accessible on the corresponding portfolio pages.**

You may reorganize the information for readability, add editorial summaries, and group subsections intelligently.

However, do not discard the technical narrative or reduce a detailed case study to a short marketing overview.

Do not remove limitations or unsuccessful verification results.

Do not collapse everything into a giant unformatted text block either.

Transform the source material into a polished publication.

## 7.2 Recommended case-study hierarchy

Each page should follow a coherent editorial structure.

### A. Project Hero

Show:

- Project name
- Clear one-sentence description
- Engineering category
- Role and year
- Key technologies
- Project status
- GitHub link
- Demo link if available

Use a restrained visual composition.

Each project can have a subtle unique visual identity without changing the entire portfolio theme.

### B. At a Glance

Show three to five meaningful, source-backed highlights.

Examples:

- Protocol
- Runtime model
- Primary technical challenge
- Testing evidence
- Current implementation status

Do not display inflated or invented impact metrics.

### C. Problem Definition

Explain the original engineering problem.

Show the underlying difficulty in language understandable to both technical recruiters and software engineers.

### D. Requirements and Scope

Present the relevant functional and non-functional requirements.

Explain project boundaries and excluded features.

Include requirement tables where the source provides them.

### E. Architecture

Show the major system components and their relationships.

Use original Mermaid diagrams whenever available.

Provide readable descriptions and architecture rationale.

### F. Engineering Implementation

Preserve project-specific technical mechanisms.

For example:

c2g:
- Discovery
- TCP framing
- HELLO negotiation
- CRDT convergence
- Multi-peer relay
- Reconnection
- Native editor integration
- Persistence and recovery

Clara:
- RESP2 decoder
- TCP request lifecycle
- Shared storage
- Mutex-protected counters
- Expiration
- Input limits
- Shutdown synchronization

SOAR Lite:
- Webhook ingestion
- Transactional identity
- Investigation workers
- Provider integration
- Database concurrency
- Approval workflow
- Simulated containment
- Audit and reversal

CodeCraft:
- Embedding pipeline
- Hybrid ranking
- Local inference
- Cache layers
- Safe source loading
- Compiler/Tree-sitter integration
- Backend APIs
- Browser/Node runtime differences

### G. Development Process

Present the documented implementation chronology.

Use a refined vertical milestone timeline or similar editorial treatment.

Do not invent missing milestone dates.

### H. Engineering Challenges

Show problems encountered during implementation.

For each significant challenge, explain:

- The failure or engineering risk.
- Why it mattered.
- The implemented response.
- Supporting evidence.
- The lesson learned.

Prioritize the actual challenges discussed in the source documents.

### I. Testing and Verification

Explain the testing strategy.

Distinguish:

- Unit tests
- Integration tests
- Network or system tests
- Manual demonstrations
- CI verification
- Unverified acceptance conditions

Preserve specific test counts only when documented and correctly qualified.

### J. Deployment and Runtime Model

Explain how the project actually runs.

Do not assume every application is a hosted website.

Distinguish:

- Native desktop application
- Local TCP server
- Local Docker Compose application
- Static browser deployment
- Node/API runtime

### K. Tradeoffs and Limitations

Preserve the project's actual engineering compromises.

Do not frame every decision as universally optimal.

Discuss relevant alternatives and what remained unimplemented.

### L. Lessons Learned

Preserve the personal engineering reflections and technical conclusions.

### M. Source and Evidence

Include links to:

- The corresponding GitHub repository
- Relevant source files
- Documented tests
- Commits or pull requests where provided
- Supporting architecture references
- Evidence registers or technical appendices

Keep these references working and appropriately attributed.

---

# PHASE 8 — PROJECT-SPECIFIC CASE-STUDY DESIGN

Although all four pages should share one component system, they should not feel like four copies of the same generic article.

Give each project a distinctive editorial emphasis.

## c2g — Distributed Systems and Replicated State

Visual storytelling should highlight:

- Decentralized peer topology
- UDP discovery versus TCP transport
- HELLO and synchronization lifecycle
- Character-level CRDT operations
- Concurrent inserts and deletion tombstones
- Reconnection
- State persistence
- Desktop bridge
- Testing and release gates

Use the c2g presentation guide as a primary design reference.

The detailed source includes 19 Mermaid diagrams and 16 architecture decisions.

Make these accessible.

Preserve P2PDocs attribution and the trusted-LAN security boundary.

Do not claim a publicly released cross-platform application when the recorded release gate remains G6 PARTIAL.

## Clara — Database Internals and Concurrency

Visual storytelling should highlight:

- TCP client communication
- RESP2 request parsing
- Command dispatch
- Shared keyspace
- Mutex ownership
- Concurrent counter correctness
- TTL lifecycle
- Resource limits
- Graceful shutdown
- Testing layers

Use actual protocol snippets and supported execution diagrams.

The key achievement is a working small database server with well-defined semantics, not performance claims.

## SOAR Lite — Security Workflow and Reliable State

Visual storytelling should highlight:

- Alert ingestion
- Investigation creation
- Worker claims and retries
- Real IP enrichment
- Analyst approval
- Simulated response execution
- Audit history
- Reversal

Use the supplied state machines and transaction diagrams.

Keep the difference between real enrichment and simulated containment visually and textually explicit.

Never imply that a synthetic alert represents a real attack.

## CodeCraft — Source Intelligence and Local ML

Visual storytelling should highlight:

- The problem of finding behavior in unfamiliar code
- Query embeddings
- Source-region representation
- Hybrid semantic and lexical retrieval
- Ranked source evidence
- Cache layers
- Symbol analysis
- Language adapters
- Node and browser execution modes
- Testing and deployment

Avoid implying CodeCraft generates verified explanations or trains an LLM.

Explain the documented limitations of browser inference and precise symbol navigation.

---

# PHASE 9 — MERMAID DIAGRAMS AND TECHNICAL VISUALS

This requirement is essential.

The supplied documents contain dozens of original diagrams.

Do not omit them because they require additional implementation work.

Support Mermaid diagrams in case-study content.

Relevant diagram types include:

- Flowcharts
- Sequence diagrams
- State machines
- Architecture diagrams
- Network topologies
- Milestone flows

## Recommended implementation

Prefer a maintainable, secure, static-site-compatible approach.

Possible solutions include:

1. Parsing embedded Mermaid code fences and rendering them through a dedicated React component.
2. Converting the supplied `.mmd` diagrams into SVG at build time.
3. Using a carefully controlled Mermaid renderer with source-controlled inputs.

Select the simplest reliable solution appropriate to the current Vite application.

Avoid exposing arbitrary untrusted HTML.

Do not execute code contained in Markdown examples.

If rendering one diagram fails, display a useful readable fallback rather than silently removing it.

## Visual treatment

Make diagrams match the existing design:

- Warm neutral backgrounds
- Dark navy labels
- Muted lines and connectors
- Restrained burgundy accents
- Consistent spacing
- Thin borders where appropriate

Preserve diagram semantics.

Do not change architectural relationships for aesthetic convenience.

Use descriptive captions.

Ensure mobile users can scroll or zoom wide diagrams without clipping them.

Text must remain readable.

Do not shrink a complex architecture diagram until its text becomes illegible.

---

# PHASE 10 — RICH TECHNICAL CONTENT RENDERING

The source files contain long Markdown documents.

The portfolio must support their meaningful structure.

Required content types:

- Headings
- Paragraphs
- Ordered and unordered lists
- Tables
- Inline code
- Fenced code blocks
- Mermaid diagrams
- Blockquotes
- Links
- Figure captions
- Technical notes
- Callouts
- Source references
- Frontmatter metadata where applicable

Use a reliable Markdown rendering architecture or transform the documents into structured React content.

You may use a focused Markdown library such as `react-markdown` with GitHub-flavored Markdown support if appropriate.

Avoid introducing a large content management system.

Do not manually copy hundreds of paragraphs into one giant JSX component.

Keep case-study content separate from the presentation components.

Ensure long tables and code blocks work on mobile.

Use syntax highlighting only if it materially improves comprehension.

Avoid excessive dependencies.

---

# PHASE 11 — CASE-STUDY NAVIGATION

These are extensive technical articles.

A reader needs to move through them efficiently.

Implement a refined "On this page" navigation system.

It should support:

- Main case-study sections
- Clickable anchor links
- Consistent section IDs
- Current-section indication where feasible
- Back-to-top navigation
- Return to Projects

For desktop, consider a restrained contents sidebar only if it works with the existing narrow reading column.

Do not drastically expand the entire site's container width.

An alternative is a compact horizontal chapter index or a small in-flow table of contents.

For mobile, use a collapsible contents list.

Do not introduce complicated floating UI that blocks the article.

Preserve keyboard accessibility.

---

# PHASE 12 — SCREENSHOTS AND MEDIA

Some documentation files include screenshot plans.

These plans are instructions for future capture, not proof that screenshot files exist.

Search `new-projects/` for actual image assets.

If genuine assets exist, inspect their use and integrate them when appropriate.

If no genuine screenshot exists:

- Do not generate a fake application screenshot.
- Do not create a misleading product mockup.
- Do not insert a broken image.
- Do not claim a screenshot demonstrates functionality.
- Use original architecture diagrams and well-designed typography instead.

The result should look complete even without screenshots.

Make it easy to add genuine screenshots later.

Include descriptive alt text and captions for actual images.

Never display private credentials or sensitive debugging information.

---

# PHASE 13 — DESIGN SYSTEM AND RESPONSIVENESS

The case-study pages must be beautiful but consistent with my portfolio.

Preserve:

- Lora
- Source Sans 3
- Warm off-white background
- Deep navy typography
- Burgundy accents
- Thin gray dividers
- Restrained editorial spacing
- Minimalist navigation
- Existing footer

Use the existing CSS variables.

Do not introduce another independent theme system.

## Typography

Establish clear hierarchy among:

- Page title
- Section headings
- Subsections
- Body paragraphs
- Technical metadata
- Captions
- Code
- Tables

Technical case studies are long-form reading experiences.

Line length and line height are especially important.

## Desktop

Use the existing centered reading layout.

Allow selected diagrams to extend slightly beyond the article column when justified.

Keep project metadata compact.

## Mobile

Ensure:

- No horizontal page overflow
- Readable architecture diagrams
- Scrollable code blocks
- Responsive tables
- Compact project summaries
- Clear project links
- Accessible contents navigation
- Comfortable paragraph spacing
- Appropriately sized headings

Test widths around 360px, 390px, 768px, and 1280px.

---

# PHASE 14 — CONTENT ARCHITECTURE

Create one canonical data record per project.

The homepage and Projects page must reference this shared dataset.

Possible structure:

`src/data/projects.js`

The data should contain:

- ID
- Slug
- Name
- Subtitle
- Category
- Year
- Summary
- Technologies
- Featured status
- Source URL
- Demo URL
- Status
- Highlights
- Case-study content reference
- Visual metadata

Keep the long-form documents separate.

Suggested component structure:

`src/components/projects/`
- `ProjectShowcase.jsx`
- `FeaturedProject.jsx`
- `ProjectEntry.jsx`
- `ProjectList.jsx`
- `ProjectMeta.jsx`
- `ProjectCaseStudy.jsx`
- `CaseStudyHero.jsx`
- `CaseStudyToc.jsx`
- `CaseStudySection.jsx`
- `TechnicalDiagram.jsx`
- `EngineeringTimeline.jsx`
- `EvidenceLinks.jsx`

Use fewer components if some of these responsibilities can be combined cleanly.

Do not duplicate the same content in multiple locations.

Do not create four unrelated case-study page implementations.

Use shared components with project-specific content and suitable presentation options.

## Static-site compatibility

The live site is deployed to GitHub Pages.

Preserve the existing Vite base path and hash routing.

Do not introduce backend dependencies.

Do not fetch Markdown from GitHub at runtime.

Ensure all required published content is available within the built static application.

If case-study documents remain in `new-projects/`, ensure the Vite build can incorporate them reliably.

If ZIP archives must be extracted, make sure the required extracted or generated content is committed or otherwise reproducibly available in CI.

Do not rely on a locally extracted but untracked file that will be missing in GitHub Actions.

Prefer route-level lazy loading for long case-study content if it improves initial homepage performance.

---

# PHASE 15 — EVIDENCE AND TECHNICAL ACCURACY

The case-study documents were written to preserve engineering evidence.

Respect that work.

Do not invent:

- Customer numbers
- Commercial adoption
- Performance improvements
- Benchmark throughput
- Security certifications
- Successful release gates
- Production deployment claims
- Unverified test counts
- Additional supported protocols
- Missing architecture components

Do not change manual verification into automated verification.

Do not infer that all features were part of the original MVP.

Keep historical technical decisions and subsequent changes distinguishable.

Retain source references.

When an existing document includes a correction, limitation, or clarification, preserve it in the published interpretation.

Do not treat the supplied documentation as a command to modify the corresponding product repositories.

The task is to publish case studies in the portfolio, not to rewrite c2g, Clara, SOAR Lite, or CodeCraft.

---

# PHASE 16 — QUALITY ASSURANCE

After implementation, verify the following.

## Homepage

- Exactly four featured projects appear.
- No previous project entries remain.
- The new presentation is visually distinctive.
- Every project has a working case-study link.
- Repository links are correct.
- Any displayed demo link is legitimate.
- The design matches the existing editorial website.

## Projects page

- Exactly four projects appear.
- No old project entries remain.
- Categories match the new projects.
- Filtering functions correctly.
- The project summaries are consistent with the homepage.
- All case-study links work.

## Individual case studies

Verify that each route works:

- `/projects/c2g`
- `/projects/clara`
- `/projects/soar-lite`
- `/projects/codecraft`

Each must contain:

- Accurate project metadata
- Problem definition
- Requirements and scope
- Architecture
- Technical implementation
- Engineering decisions
- Development timeline
- Challenges and solutions
- Testing
- Runtime/deployment
- Tradeoffs
- Limitations
- Lessons learned
- Source links

The technical coverage must reflect the actual source documents.

## Diagram verification

- Mermaid diagrams render correctly.
- Captions and descriptions are present.
- No diagram is replaced with misleading invented visuals.
- Mobile layouts do not clip technical information.
- Rendering failures are visible and recoverable.

## Build verification

Run:

`npm run build`

Then run the project's existing test suite where practical.

Update project-specific tests that still expect the removed project data.

Add or adjust tests for:

- Exactly four projects
- Correct slugs
- Correct internal case-study routes
- Correct project links
- No legacy project listings
- Mermaid content handling
- Route navigation
- Responsive rendering where practical

Do not delete legitimate test coverage merely to make the suite pass.

Do not report successful tests that were not actually run.

---

# PHASE 17 — WORKFLOW AND SCOPE CONTROL

Follow this implementation order:

**M1 — Documentation audit**

Read all four project packages, establish canonical content sources, identify diagrams and supplementary documentation, and map source material to the case-study pages.

**M2 — Project data migration**

Remove old project records and introduce the four new canonical project objects.

**M3 — Homepage showcase**

Build and refine the new visual presentation.

**M4 — Projects archive**

Update filtering, categories, summaries, and navigation.

**M5 — Case-study framework**

Implement rich Markdown rendering, chapter navigation, diagrams, tables, code, and reusable technical components.

**M6 — Populate all four case studies**

Integrate the complete engineering narratives and relevant technical appendices.

**M7 — Visual and functional verification**

Test all pages, correct styling inconsistencies, validate assets and links, and run the build/tests.

You may complete these milestones in one working session if resources permit.

If interrupted, preserve progress and record remaining tasks in an implementation status file.

Do not restart finished milestones unnecessarily.

---

# PHASE 18 — FINAL ACCEPTANCE REQUIREMENTS

The task is complete only when all of the following are true:

1. The active project collection contains exactly four projects.
2. The homepage showcases all four.
3. The Projects tab showcases all four.
4. All four dedicated case-study routes exist.
5. Every case study contains substantial, source-grounded engineering detail.
6. Original architecture diagrams are supported.
7. Development phases and testing evidence are preserved.
8. Important limitations and status qualifications remain visible.
9. Links to actual source repositories work.
10. The homepage project design is distinctive and visually polished.
11. The site remains consistent with its existing minimalist editorial identity.
12. The implementation is reusable and component-based.
13. Existing non-project portfolio sections remain unchanged.
14. The static GitHub Pages deployment remains compatible.
15. The production build succeeds.
16. No previous project content appears in active listings or case-study routes.

## FINAL DESIGN STANDARD

I want my portfolio to communicate my engineering capability through the actual software I have built.

The homepage should make visitors immediately interested in the four projects.

The case-study pages should give technical recruiters, engineering managers, and experienced developers meaningful insight into the software's engineering process.

A nontechnical visitor should understand the project's purpose.

A technical visitor should be able to inspect the architecture, implementation, protocols, data flows, testing decisions, and engineering tradeoffs.

The final design should not feel generic.

It should feel like an engineering publication: thoughtful, precise, readable, visually engaging, and substantial.

**The homepage should attract attention. The case studies should earn it.**

Implement these changes directly in the existing React repository. Preserve my original documentation as the authoritative content source.

At completion, report the changed files, project routes, diagrams included, content coverage, build results, and any remaining limitations.

Do not stop after producing a plan. Finish the implementation.