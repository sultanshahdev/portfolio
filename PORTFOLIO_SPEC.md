# MASTER PROMPT
## Build Sultan Shah's Software Engineering Portfolio
### React + Vite | Editorial Minimalism | Michele Riva Design Reference

You are a senior frontend architect, React engineer, UI/UX specialist, and technical portfolio designer.

Your mission is to **analyze an existing website's source code and rebuild its visual language as a complete, modular, minimalist software engineering portfolio** for Sultan Shah.

The result must be a functional React + Vite application with reusable components, clean data architecture, well-organized styling, responsive layouts, and editable project content.

This task has three distinct priorities:

1. **Design fidelity:** Preserve the elegance, simplicity, typography, layout, spacing, and editorial appearance of the reference website.
2. **Professional relevance:** Adapt the website into a convincing portfolio for a software engineer focused on backend engineering, software architecture, distributed systems, Linux, networking, and security.
3. **Engineering quality:** Build an extensible React application whose pages, sections, project entries, and visual patterns are composed from reusable components.

Do not build a generic developer portfolio.

Do not begin by selecting a premade React portfolio template.

Do not replace the reference's design philosophy with a conventional SaaS aesthetic.

---

# PHASE 1 — SOURCE CODE ANALYSIS

## 1.1 Provided materials

You will receive:

**Reference website ZIP:**

`www.micheleriva.it.zip`

Original website:

https://www.micheleriva.it/

**Professional profile PDF:**

`Profile (8).pdf`

**LinkedIn:**

https://www.linkedin.com/in/sultan-shah-dev/

**GitHub:**

https://github.com/sultanshahdev

The website ZIP is a downloaded snapshot of a Next.js website. It contains rendered HTML, compiled CSS, JavaScript bundles, and assets, rather than an ordinary editable Next.js source repository.

You must **reverse-engineer the observable design and page structure**, then implement that design in a clean React + Vite architecture.

Never transplant or depend on the compiled Next.js runtime.

## 1.2 Inspect the reference

Analyze these pages:

- `index.html`
- `writings.html`
- `publications.html`
- `contact.html`
- Individual articles within `writings/`

Inspect the compiled CSS to extract:

- Color variables
- Fonts and type hierarchy
- Container widths
- Navigation layouts
- Mobile breakpoints
- Section spacing
- Dividers
- Borders
- Link treatments
- Heading styles
- List presentations
- Hover interactions
- Responsive behavior

Inspect the actual HTML structure to identify shared layout patterns.

Pay particular attention to how the website uses typography and whitespace to establish hierarchy without visual clutter.

Determine which structural features can become reusable components.

Before implementing, briefly explain:

1. What the reference's design language consists of.
2. Which design patterns you will preserve.
3. Which content sections require adaptation.
4. Which subtle additions are necessary for software engineering projects.
5. How you will organize the new React application.

Then proceed to the actual implementation.

Do not stop after analysis.

---

# PHASE 2 — DESIGN SYSTEM

## 2.1 Essential aesthetic

The portfolio must look like an elegant personal website belonging to a technically sophisticated engineer.

The visual language should be:

- Editorial
- Minimalist
- Typography-driven
- Warm and understated
- Precise
- Thoughtful
- Professional
- Accessible
- Consistent

The original website's personality should remain recognizable.

Avoid making the result excessively modern, overly corporate, futuristic, or dashboard-like.

## 2.2 Color system

The reference's CSS defines these light-theme color values:

```css
:root {
  --background: 40 33% 97%;
  --foreground: 220 20% 18%;
  --card: 40 25% 95%;
  --primary: 220 40% 20%;
  --secondary: 40 15% 92%;
  --muted: 40 10% 90%;
  --muted-foreground: 220 10% 46%;
  --accent: 0 45% 35%;
  --border: 40 15% 82%;
  --radius: 0.25rem;
}
```

Use these as the starting design tokens, preferably via CSS custom properties and `hsl(var(--token))`.

Inspect the original stylesheet for additional values and inconsistencies before implementation.

These colors correspond broadly to:

- Warm off-white backgrounds
- Deep navy primary colors
- Dark neutral text
- Muted warm-gray surfaces
- A subtle burgundy accent
- Soft borders

Do not introduce saturated blue buttons, colorful gradients, neon accents, or prominent decorative color blocks.

The color system should remain restrained.

## 2.3 Typography

The original website uses:

- **Lora:** Literary and editorial typography
- **Source Sans 3:** Navigation and interface typography

Retain this pairing.

Use Lora for selected headings, personal descriptions, and longer editorial passages.

Use Source Sans 3 for:

- Navigation
- Metadata
- Categories
- Dates
- Labels
- Buttons
- Technical tags
- Compact interface elements

Typography must establish hierarchy naturally.

Avoid oversized hero headlines.

The user's name should feel like a personal signature or editorial heading, not a startup product announcement.

## 2.4 Layout

Preserve the narrow reading-oriented composition.

Use a maximum main-content width of approximately `48rem`, adjusting only where inspection of the reference indicates a better value.

Keep the main column centered.

Use generous but controlled vertical whitespace.

Preserve consistent alignment across pages.

On larger screens, the website should remain relatively narrow rather than stretching across the viewport.

Do not introduce large full-width dashboard grids.

Use occasional wider layouts only when justified by diagrams or technical content.

## 2.5 Minimalist details

Preserve:

- Thin section dividers
- Compact uppercase section labels
- Consistent heading spacing
- Subtle underlines
- Text-focused links
- Small metadata labels
- Elegant lists
- Limited icon usage
- Simple navigation
- Understated footer
- Responsive content width

Allow carefully chosen enhancements:

- Small project-category labels
- Compact technology metadata
- Subtle arrows on project links
- Refined focus and hover states
- Optional technical diagrams
- Small project screenshots
- Elegant code excerpts
- Reusable technical callouts

These additions should feel native to the original design.

## 2.6 Strict visual exclusions

Do not use:

- Gradient hero sections
- Glassmorphism
- Large floating cards
- Animated particles
- Fake terminal interfaces
- Oversized technology logos
- Skill progress bars
- Artificial experience counters
- Excessive shadows
- Parallax scrolling
- Mandatory hero photographs
- Huge pill-shaped buttons
- A typical agency-style landing page

Minimalism is a core requirement, not an optional styling preference.

---

# PHASE 3 — PROFESSIONAL POSITIONING

## 3.1 Identity

**Name:** Sultan Shah

**Primary title:** Software Engineer

**Professional focus:**

- Backend Engineering
- Distributed Systems
- System Design
- Software Architecture
- Linux
- Computer Networking
- Network Security
- Full-Stack Development

**Education:**

BS Computer Science, Sukkur IBA University, 2024–2028.

**GitHub:**

https://github.com/sultanshahdev

**LinkedIn:**

https://www.linkedin.com/in/sultan-shah-dev/

## 3.2 Professional narrative

The portfolio should reflect an engineer interested in the systems behind software: architecture, maintainability, performance, networking, reliability, and secure communication between components.

The introduction should communicate an engineering mindset rather than simply list programming languages.

Use concise, technically grounded language.

Potential introductory direction:

"I'm Sultan Shah, a software engineer working across backend development, software architecture, and systems-oriented engineering. I enjoy understanding how software components communicate, how applications are structured, and how engineering decisions affect reliability and maintainability."

This is provisional copy. Make it editable.

Do not write exaggerated claims about working at global technology companies, architecting internet-scale systems, or maintaining enterprise production infrastructure.

Professional confidence should come from demonstrated work.

## 3.3 Experience representation

Use the LinkedIn PDF to extract verified experience entries.

Separate:

- Software development and technical projects
- Educational development programs
- Community and technical-event leadership
- Formal education

Do not imply that completing The Odin Project is equivalent to employment at the organization.

Do not invent employers, employment dates, business metrics, or professional credentials.

Maintain accurate attribution for collaborative projects.

---

# PHASE 4 — REAL GITHUB PROJECTS

Unlike a generic dummy portfolio, this website should be architected around actual repositories.

However, the codebase must remain completely reusable.

The following repositories are recommended starting points.

## 4.1 Activity Tracker — Node.js and MongoDB

Repository:

https://github.com/sultanshahdev/activity-tracker-web-js

This project is currently documented as a console-based activity management application.

Relevant technologies include:

- Node.js
- JavaScript ES Modules
- MongoDB
- Object-oriented application design

The repository includes:

- `ApplicationMangager.js`
- `DatabaseHandler.js`
- `ActivityBuilder.js`
- Activity classes
- Activity logger classes
- Query-related application logic
- `ARCHITECTURE.md`

Read these files and verify their implementations.

Potential case-study themes:

- Separating application orchestration from database operations
- Object-oriented domain modeling
- Query processing
- Activity data transformation
- Application dependency flow
- Data persistence

Do not describe this project as a REST API, React application, or browser-based dashboard unless verified by its actual source.

Do not claim automated tests exist without evidence.

## 4.2 EDITH — AI Consultation Application

Repository:

https://github.com/sultanshahdev/edith-consultation-chatbot

Relevant technologies:

- Python
- Streamlit
- Google Gemini API
- Modular application design

The repository contains modules for:

- API communication
- Prompt construction
- Conversation memory
- Response handling
- Logging and error handling

Read the actual implementation before writing the case study.

Potential engineering discussion:

- Layered application architecture
- Separating external API communication from UI logic
- Maintaining conversational context
- Error handling
- Configuration management
- Deployment considerations

The README contains inconsistent model-version and deployment-link references.

Resolve these against actual source files and live deployment information, if accessible.

Do not reproduce the README's "production-grade" or "production-ready" assertions without validation.

## 4.3 FinanceTracker — Java and MySQL

Repository:

https://github.com/sultanshahdev/finance-tracker

Technologies:

- Java
- Java Swing
- JDBC
- MySQL
- SQL

The repository includes a Java desktop application and database schema.

Potential topics:

- Database connectivity
- Prepared SQL statements
- Desktop UI integration
- Data persistence
- Expense tracking
- Application organization

The README credits Khadija and Sultan.

Preserve collaboration attribution.

**Security requirement:** The Java source contains an embedded database password. Do not copy this credential into the portfolio, examples, screenshots, documentation, or generated code. Flag the issue for remediation, and recommend externalizing credentials. Do not claim the credential is secure merely because the repository is publicly visible.

## 4.4 Activity Tracker — Java CLI

Repository:

https://github.com/sultanshahdev/activity-tracker-general-cli

Technologies:

- Java
- Object-oriented programming
- Collections
- File I/O

Relevant source concepts:

- Activity interfaces
- Class hierarchies
- File input processing
- Application management
- Query processing
- Type-specific behavior

This project can demonstrate foundational software design principles.

Explain what the code actually implements, rather than attributing advanced design patterns without evidence.

## 4.5 Tic-Tac-Toe — Modular JavaScript

Repository:

https://github.com/sultanshahdev/tic-tac-toe

Technologies:

- JavaScript
- ES Modules
- Webpack
- HTML
- CSS

The source separates responsibilities across game state, event handling, mapping, and winning-state logic.

Potential discussion:

- Module boundaries
- Managing application state
- Separating game logic from presentation
- Build tooling
- Deployment configuration

This project may be featured in the archive rather than the main homepage, depending on available space.

## 4.6 Additional projects

Also inspect:

- `datastructures-js`
- `weather-app-js`
- `comp-sci-operating-systems-lab`
- `comp-sci-machine-learning-lab`
- `comp-sci-compiler-construction-lab`
- Other repositories that demonstrate relevant engineering ability

Treat small exercises and academic labs differently from substantial engineering projects.

Do not automatically feature projects solely because they exist.

### Project selection rules

Prioritize:

1. Engineering substance
2. Relevance to professional positioning
3. Meaningful design decisions
4. Implementation completeness
5. Source-code quality
6. Documentation
7. Demonstrable functionality
8. Honest attribution

Recommend approximately four featured projects for the homepage.

Place additional verified projects in the archive.

If source details are unavailable, use editable placeholders instead of inventing claims.

---

# PHASE 5 — WEBSITE STRUCTURE

Build the following pages.

## 5.1 Homepage — `/`

The homepage must be visually closest to the original reference.

Recommended order:

### Introduction

Display:

- Sultan Shah
- Software Engineer
- Concise biographical description
- Optional portrait
- Optional location
- Subtle professional links

The introductory component should be elegant and text-driven.

Portrait rendering must be optional.

### About

Use a brief editorial biography.

Discuss engineering interests and technical direction.

Avoid long keyword-heavy paragraphs.

### Selected Work

Show approximately four featured projects.

Use the reference's compact publications-style visual language.

Project entries should feel like carefully curated work, not oversized promotional cards.

Each entry supports:

- Title
- Year
- Category
- Description
- Technologies
- Repository link
- Case-study link
- Optional live demo link

### Experience

Show relevant development experience and educational programs.

Use concise descriptions.

### Technical Focus

Show meaningful categories:

- Backend Engineering
- Software Architecture
- Systems and Infrastructure
- Web Development
- Data and Tooling

Avoid percentage ratings or false expertise levels.

### Education

Include Sukkur IBA University.

### Community and Leadership

Support optional experience from technical events, hackathons, coordination, public speaking, and community initiatives.

Keep this section visually compact.

### Contact

A quiet final section with professional contact links.

---

## 5.2 Projects — `/projects`

Adapt the reference site's publications page into a project index.

Each entry should have:

- Project title
- Year
- Category
- Technical summary
- Relevant technology metadata
- GitHub link
- Optional demo
- Case-study link

Include optional filtering by:

- All
- Backend
- Applications
- Systems and Tools
- AI and Data
- Experiments

Only display filters supported by actual project data.

Filters must work using React state.

The initial project data should include real repositories with verified high-level descriptions.

Where detailed engineering information is missing, use clearly marked placeholders.

Avoid screenshots unless they genuinely improve comprehension.

---

## 5.3 Project Details — `/projects/:slug`

Create reusable engineering case-study pages.

Suggested structure:

**Overview**

What does the project do?

**Problem**

What engineering problem motivated the implementation?

**Architecture**

How is the application structured?

**Implementation**

Which significant components and mechanisms exist?

**Engineering Decisions**

Which trade-offs are visible in the implementation or documented by its author?

**Challenges**

Which difficulties or limitations can be demonstrated or documented?

**Testing**

What tests or validation mechanisms actually exist?

**Outcome**

What was implemented, and what remains incomplete?

**Source**

GitHub and verified demo links.

Do not require every section for every project.

Hide empty sections gracefully.

Support images, architecture diagrams, code excerpts, and technical lists.

Use clean article-style formatting.

Do not use marketing-style case-study cards.

---

## 5.4 Writing — `/writing`

Adapt the reference site's writings index into an engineering writing section.

This area should support future technical articles.

Categories may include:

- Software Engineering
- Backend Systems
- Architecture
- Linux and Networking
- Engineering Notes

Use the same editorial presentation as the original writing index.

Until actual articles are supplied, use a small number of explicitly labeled draft/sample entries.

Do not fabricate published articles or publication dates.

---

## 5.5 Article Details — `/writing/:slug`

Create a reusable long-form article layout.

Support:

- Title
- Publication date
- Category
- Abstract
- Headings
- Paragraphs
- Lists
- Code examples
- Images
- References
- Optional table of contents

Use typography suitable for sustained technical reading.

Include readable, scrollable code blocks.

---

## 5.6 Contact — `/contact`

Keep this page extremely simple.

Include:

- GitHub
- LinkedIn
- Email only if explicitly configured
- Optional résumé link

Do not expose phone numbers by default.

Do not invent social accounts.

Do not add a backend-dependent contact form.

---

# PHASE 6 — REACT APPLICATION ARCHITECTURE

## 6.1 Required stack

Use:

- React
- Vite
- JavaScript / JSX
- React Router
- CSS custom properties
- Modern CSS
- Minimal dependencies

Do not use Next.js.

Do not use a large UI framework.

Do not use Tailwind unless specifically requested.

The original website's CSS and visual patterns should be reimplemented cleanly rather than being pasted wholesale.

## 6.2 Suggested folder structure

```text
src/
├── main.jsx
├── App.jsx
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── MobileNavigation.jsx
│   │   ├── Footer.jsx
│   │   └── Container.jsx
│   │
│   ├── ui/
│   │   ├── SectionHeading.jsx
│   │   ├── SectionDivider.jsx
│   │   ├── TextLink.jsx
│   │   ├── MetaLabel.jsx
│   │   ├── CategoryFilter.jsx
│   │   └── EmptyState.jsx
│   │
│   ├── profile/
│   │   ├── Intro.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   └── TechnicalFocus.jsx
│   │
│   ├── projects/
│   │   ├── ProjectEntry.jsx
│   │   ├── ProjectList.jsx
│   │   ├── ProjectMeta.jsx
│   │   └── ProjectCaseStudy.jsx
│   │
│   └── writing/
│       ├── WritingEntry.jsx
│       └── ArticleContent.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── ProjectsPage.jsx
│   ├── ProjectDetailPage.jsx
│   ├── WritingPage.jsx
│   ├── ArticlePage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
│
├── data/
│   ├── profile.js
│   ├── projects.js
│   ├── experience.js
│   ├── skills.js
│   └── writing.js
│
├── styles/
│   ├── tokens.css
│   ├── global.css
│   ├── typography.css
│   └── layout.css
│
└── assets/
```

Improve the structure where justified, without unnecessary abstraction.

## 6.3 Component rules

Every major section must be a React component.

All repeated content must be data-driven.

Projects must be defined in a central data file.

Use `.map()` for project lists, experience entries, and other collections.

Avoid duplicated markup.

Avoid monolithic components.

Keep presentation separate from content.

Use props and composition appropriately.

Do not introduce Redux or another global state manager for a static portfolio.

Use React state only where interaction is necessary.

Do not use effects unnecessarily.

---

# PHASE 7 — CONTENT DATA MODEL

Create a flexible project schema.

A project should support:

```js
{
  id: "project-id",
  slug: "project-slug",
  title: "Project Title",
  category: "Backend",
  year: "2026",
  summary: "Verified short summary.",
  technologies: [],
  featured: true,
  status: "completed",
  repositoryUrl: "",
  demoUrl: null,
  image: null,
  verified: true,
  sections: []
}
```

Use an appropriate alternative to `verified` if the application needs finer distinctions between verified, draft, and sample content.

Project details should be driven by structured content rather than large blocks of hardcoded JSX.

For detailed content, support section types such as:

- Prose
- Lists
- Code
- Images
- Diagrams
- Technical metadata

Allow users to add or remove projects without editing the page components.

## 7.1 Verified and placeholder content

The initial website should use real project titles and known technologies where verified.

Missing case-study details should use clearly marked placeholder fields.

For example:

`TODO: Add verified performance measurements.`

Never invent performance numbers, customer counts, production deployments, test results, or security guarantees.

Dummy content must demonstrate the reusable component system without being mistaken for actual achievements.

---

# PHASE 8 — RESPONSIVENESS

The website must function across:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors

Preserve the reference's narrow content presentation.

Use appropriately fluid typography and spacing.

Implement accessible mobile navigation.

Prevent horizontal page overflow.

Ensure long technical identifiers and code blocks do not break the layout.

Project metadata should wrap gracefully.

Do not rely on hover interactions for critical functionality.

Respect reduced-motion settings.

---

# PHASE 9 — ACCESSIBILITY

Implement:

- Semantic HTML
- Accessible navigation
- Proper heading hierarchy
- Visible keyboard focus indicators
- Appropriate contrast
- Accessible buttons and links
- Descriptive image alternatives
- Keyboard-operable project filters
- Correct mobile navigation state
- Functional 404 pages
- Appropriate active-link styling

Use native HTML behavior when possible.

Do not use unnecessary ARIA attributes where native semantics are sufficient.

---

# PHASE 10 — PERFORMANCE AND SEO

Keep the application lightweight.

Include:

- Clean document metadata
- Sensible page titles
- Open Graph metadata
- Correct viewport configuration
- Lazy-loaded secondary images
- Optimized typography loading
- Minimal dependencies
- Production Vite build configuration
- Static-host-compatible routing guidance

Do not add runtime GitHub API dependencies to render project data.

Use local project data files by default.

Do not unnecessarily request data on each page load.

---

# PHASE 11 — ASSET AND SOURCE HANDLING

The original Michele Riva website is a design reference.

Do not reuse:

- Michele Riva's name or biography
- Portraits
- Personal achievements
- Original articles
- Private information
- Publication text

Do not assume that images or bundled fonts can be redistributed merely because they appear in the downloaded archive.

Use appropriately licensed fonts and original placeholder assets.

Reconstruct the design in your own React components and CSS.

Preserve the visual design principles without depending on the original site.

---

# PHASE 12 — DELIVERABLES

Generate a complete project containing:

1. Vite configuration.
2. Package dependencies.
3. React entry point.
4. Application layout.
5. All pages and routes.
6. Reusable React components.
7. Centralized content data.
8. Responsive styling.
9. Project listing and case-study support.
10. Writing index and article pages.
11. Functional mobile navigation.
12. Functional project filters.
13. Verified starter project entries.
14. Editable placeholders where needed.
15. A useful README.

The README must explain:

- Installation
- Development server
- Production build
- Folder structure
- Editing biography information
- Adding projects
- Editing project case studies
- Adding articles
- Changing colors and typography
- Replacing the portrait
- Setting social links
- Adding the résumé
- Deployment instructions

The application must be maintainable by someone comfortable with React fundamentals.

---

# PHASE 13 — EXECUTION AND VERIFICATION

Do not merely provide theoretical code snippets.

If filesystem access is available:

1. Inspect the reference ZIP.
2. Inspect the supplied LinkedIn export.
3. Review the relevant GitHub repository source.
4. Create the actual React + Vite project.
5. Implement components and pages.
6. Populate verified starter data.
7. Add editable placeholders.
8. Implement responsive styling.
9. Test navigation and filtering.
10. Run the production build.
11. Fix build failures.
12. Inspect the rendered pages if browser access is available.

When a visual browser is available, compare the finished site against the original reference at desktop and mobile widths.

Check typography, background colors, whitespace, dividers, and component hierarchy.

Do not claim a test has passed unless it was executed.

---

# PHASE 14 — FINAL QUALITY STANDARD

The completed website must satisfy all of these principles:

**It looks like the reference website belongs to a software engineer.**

Its design is quiet, precise, warm, and editorial.

Its navigation is simple.

Its typography is carefully controlled.

Its projects are presented with substance rather than decoration.

Its engineering case studies reflect actual implementations.

Its components are reusable.

Its content is independently editable.

Its styles are maintainable.

Its layout works on mobile.

Its repository links are accurate.

Its placeholder data is clearly distinguishable from verified information.

Its technical claims are credible.

Its implementation does not require Next.js or proprietary template assets.

**Most importantly: the website should feel intentionally engineered, rather than assembled from generic portfolio components.**

Begin with a brief reference-analysis report, then build the application to completion.
