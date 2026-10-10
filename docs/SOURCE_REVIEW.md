# Source review and content decisions

Reviewed 2026-10-11. Repository metadata and source snapshots were retrieved from the public GitHub API and codeload endpoints. Files were read rather than executing untrusted project code. Commits below pin the evidence; future repository changes may differ.

| Repository | Reviewed revision | Selection |
| --- | --- | --- |
| [activity-tracker-web-js](https://github.com/sultanshahdev/activity-tracker-web-js) | `bbca1f5a50ef5b0c9c30e89af91550a502735300` | Featured |
| [edith-consultation-chatbot](https://github.com/sultanshahdev/edith-consultation-chatbot) | `200ea18e0aaa21e99be5ea2667018d1fb003e755` | Featured |
| [finance-tracker](https://github.com/sultanshahdev/finance-tracker) | `bf0440cb12c7a86b34227deef099d6e8fcff94c3` | Featured, collaborative |
| [activity-tracker-general-cli](https://github.com/sultanshahdev/activity-tracker-general-cli) | `362a304a6e497c86314c541f5d9598211726a557` | Featured |
| [tic-tac-toe](https://github.com/sultanshahdev/tic-tac-toe) | `40e9e9a88ec003361366ccad8bd24926bf4bf462` | Archive |
| [datastructures-js](https://github.com/sultanshahdev/datastructures-js) | `9053acda924bde09117084f1c1f13fb97a93e089` | Archive, exercises |
| [weather-app-js](https://github.com/sultanshahdev/weather-app-js) | `59cd3c71b8456382dad964c6717e7e50230a3d23` | Reviewed, omitted |
| [comp-sci-operating-systems-lab](https://github.com/sultanshahdev/comp-sci-operating-systems-lab) | `3de7b8ae0a0319f802e158254867bfabe9cbd9a6` | Reviewed, omitted |
| [comp-sci-machine-learning-lab](https://github.com/sultanshahdev/comp-sci-machine-learning-lab) | `78795ff88d10b40b89ffae7840259116d345896c` | Archive, academic exercises |
| [comp-sci-compiler-construction-lab](https://github.com/sultanshahdev/comp-sci-compiler-construction-lab) | `2af7f623b8d9dcaf2a4c2729d0d58c6e25b0cc55` | Archive, academic exercise |

## Activity Tracker — Node.js

Read the application manager, database handler, activity builder, duration helpers, activity/logger classes, package configuration, and architecture document. `npm start` runs a Node console entry point. No REST API or working browser dashboard is claimed.

DatabaseHandler implements reads with MongoDB filters. The architecture document describes broader CRUD behavior, a singleton, an absent test file, and in-memory filtering that are not supported by the inspected implementation. Case-study descriptions follow code instead. The total-time flow appends freshly loaded records without clearing the array; this is a source-level finding, not a reproduced test failure. The test script is a failing placeholder.

## EDITH

Read the Streamlit entry point, Gemini client, prompt construction, memory, response handler, logger, exception class, and settings. The source model identifier is `gemini-3.1-flash-lite-preview`; the README advertises `gemini-2.5-flash-lite`. The portfolio names the source identifier while explicitly avoiding a claim about current API availability.

The source mixes business-consulting prompts with career-oriented UI wording. Memory keeps five exchanges by default; the settings constant is not wired into construction in `app.py`. UI message history is distinct from the bounded prompt context. No durable history, authentication, response streaming, or automated tests were found.

The README links both `consult-edith.streamlit.app` and `consultation-chatbot.streamlit.app`. Neither live application could be accessed for verification through the available web tool. No demo is linked and no deployment health is asserted. Its clone instructions also point to another account; sole authorship is not asserted beyond the repository’s attribution.

## FinanceTracker

Read the Java Swing implementation, JDBC helper, SQL schema, and README. Preserve **Khadija and Sultan** attribution. Individual contributions are unspecified. Prepared SQL statements exist; they do not imply the complete application is secure.

**Upstream remediation:** the Java source embeds a database credential. Remove it, rotate any still-used credential, externalize configuration, and exclude local secrets from version control. No credential value is included in this portfolio or documentation. Moving JDBC work off the Swing event thread, using decimal currency types, scoped weekly totals, and try-with-resources are follow-up work. No automated tests were found or run.

## Activity Tracker — Java

Read application management, file-input parsing, the activity interface and construction logic, query dispatch, and total/type/date query implementations. A HashSet deduplicates text records before an ArrayList holds activities. BETWEEN uses exclusive date boundaries. File-open recovery and malformed-input handling are incomplete. These are foundational classes and interfaces, not evidence of undocumented advanced patterns or a tested production system.

## Archive and omitted repositories

- **Tic-Tac-Toe:** state management, event handling, mapping, win/draw checks, package scripts, and Webpack configuration support the description. No automated test suite backs the PDF’s coverage claim, so it is omitted. A docs build exists; a working live deployment is not asserted.
- **Data structures:** standalone linked-list, hash-map, recursion, and sorting exercises. `test.js` is a console demonstration rather than an assertion-based suite. No correctness or performance claim is made.
- **Compiler construction:** the precedence/postfix script demonstrates stack-oriented expression work. It is not a complete compiler; character-level tokenization has limitations.
- **Machine learning:** inspected the Python fundamentals, NumPy, pandas, and plotting exercise script. The notebook’s model results were not evaluated, so there are no accuracy metrics or experiment claims. A clearly marked TODO invites an author-reviewed experiment later.
- **Weather application:** inspected the API request, data transformation, and DOM updates. Omitted because of incomplete/error-prone handling and a client-side credential in the source. Review provider restrictions and rotate or remove exposed credentials where applicable; no value is reproduced.
- **Operating systems lab:** the reviewed C files are small introductory exercises, including an incomplete file and pointer-type issues. They do not establish implemented scheduling, process management, or networking systems. Omitted from the portfolio selection.

## Professional profile

Education is BS Computer Science at Sukkur IBA University, 2024–2028, marked in progress. The Odin Project entry is presented as a self-directed learning program rather than employment. Two technical-event/public-speaking roles are included separately as community activity. Unsupported project counts, coverage percentages, scale claims, and personal contact details are not carried into the site. Public GitHub and LinkedIn URLs come from the specification.

The writing samples are newly written layout demonstrations, not copied articles or claimed publications. Project applications were not executed; verification of the portfolio itself is documented in `VERIFICATION.md`.
