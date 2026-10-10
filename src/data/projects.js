const repository = (name) => `https://github.com/sultanshahdev/${name}`;
const prose = (id, title, ...paragraphs) => ({ id, title, blocks: paragraphs.map((text) => ({ type: 'prose', text })) });
const list = (id, title, items) => ({ id, title, blocks: [{ type: 'list', items }] });
const review = (repo, commit, files) => ({
  repositoryUrl: repository(repo),
  verification: 'source-reviewed',
  reviewedAt: '2026-10-11',
  sourceCommit: commit,
  sourceFiles: files,
  demoUrl: null,
  image: null,
});

export const projectCategories = ['Backend', 'Applications', 'Systems and Tools', 'AI and Data', 'Experiments'];

export const projects = [
  {
    id: 'activity-node', slug: 'activity-tracker-node', title: 'Activity Tracker', subtitle: 'Node.js & MongoDB',
    category: 'Backend', year: '2026', featured: true, status: 'Learning project',
    summary: 'A console application for querying activity records, with separate layers for orchestration, MongoDB access, domain objects, and formatted output.',
    technologies: ['Node.js', 'JavaScript', 'MongoDB'],
    ...review('activity-tracker-web-js', 'bbca1f5a50ef5b0c9c30e89af91550a502735300', ['src/ApplicationMangager.js', 'src/DatabaseHandler.js', 'src/ActivityBuilder.js', 'src/ActivityLogger.js', 'ARCHITECTURE.md', 'package.json']),
    sections: [
      prose('overview', 'Overview', 'An activity-record reader built with Node.js ES modules and MongoDB. Its entry point starts an interactive readline session, loads activity records, and supports queries by activity type, date range, and total time. Despite the repository name, the reviewed application runs in the console.'),
      prose('problem', 'Problem', 'The implementation brings database records, several activity types, and a text-based query interface together. Its useful design question is where to separate storage access, record conversion, and display behavior.'),
      {
        id: 'architecture', title: 'Architecture', blocks: [
          { type: 'prose', text: 'ApplicationManager coordinates input and query execution. DatabaseHandler owns MongoDB access. ActivityBuilder converts records into type-specific activity objects; a parallel set of logger classes prepares their output.' },
          { type: 'diagram', nodes: ['Console query', 'ApplicationManager', 'DatabaseHandler', 'MongoDB'], caption: 'Query request path. Returned records pass through ActivityBuilder and activity-specific loggers before being displayed.' },
        ],
      },
      list('implementation', 'Implementation', [
        'DatabaseHandler uses MongoDB find operations for all records, activity-type equality, and inclusive date ranges.',
        'ActivityBuilder maps type names to constructors and normalizes dates and ISO duration strings.',
        'Activity and logger subclasses distinguish walking, running, cycling, and swimming.',
        'The database URI comes from environment configuration, with a localhost default. A separate seed script supplies sample records.',
      ]),
      prose('decisions', 'Engineering decisions', 'The class hierarchy separates common activity attributes from type-specific calculations. Database queries remain in one module, while the application manager coordinates the interaction. These are visible implementation boundaries; they do not establish a production architecture or a formal singleton pattern.'),
      list('limitations', 'Limitations & next steps', [
        'The total-time path reloads records without clearing the existing array, so repeated queries can accumulate duplicates. Correct this before relying on totals.',
        'Unknown activity types and invalid dates need stronger validation. The builder mutates the supplied record during normalization.',
        'The reviewed DatabaseHandler has read operations, not a complete CRUD interface. Some architecture-document claims exceed the implementation.',
        'Connection cleanup and duration aggregation beyond hours and minutes need further attention.',
      ]),
      prose('testing', 'Testing', 'The package’s test command is a failing placeholder. No automated test suite was found in the reviewed snapshot, and this application was not executed as part of the portfolio review. Useful future checks include repeated total-time queries, empty query results, invalid activity types, and date boundaries.'),
      prose('outcome', 'Outcome', 'The repository implements a console query workflow, MongoDB reads, activity conversion, and formatted output. It provides a concrete basis for discussing module responsibilities, while validation and regression coverage remain unfinished.'),
    ],
  },
  {
    id: 'edith', slug: 'edith', title: 'EDITH', subtitle: 'AI consultation application',
    category: 'AI and Data', year: '2026', featured: true, status: 'Prototype',
    summary: 'A Streamlit consultation interface that separates Gemini API access, prompt construction, short-term conversation memory, and response handling.',
    technologies: ['Python', 'Streamlit', 'Google Gemini API'],
    ...review('edith-consultation-chatbot', '200ea18e0aaa21e99be5ea2667018d1fb003e755', ['app.py', 'core/gemini_client.py', 'core/prompt_manager.py', 'core/memory_manager.py', 'core/response_handler.py', 'config/settings.py']),
    sections: [
      prose('overview', 'Overview', 'EDITH is a Python consultation-chat prototype with a Streamlit interface and Google’s Gemini API. A user’s message is combined with recent conversation context and a system prompt, then passed to the model through a dedicated client.'),
      {
        id: 'architecture', title: 'Architecture', blocks: [
          { type: 'diagram', nodes: ['Streamlit UI', 'Prompt + context', 'Gemini client', 'Response handler'], caption: 'After display, the conversation-memory object records the user message and response.' },
          { type: 'prose', text: 'The UI holds chat messages and a ConversationMemory instance in Streamlit session state. PromptManager builds the request text; GeminiClient calls the external service; ResponseHandler strips output whitespace and provides an empty-response fallback.' },
        ],
      },
      list('implementation', 'Implementation', [
        'ConversationMemory retains the five most recent exchanges by default, dropping the oldest when the limit is exceeded.',
        'GeminiClient logs API exceptions and returns a fallback message. Initialization failures stop the Streamlit interface with a configuration message.',
        'The source selects gemini-3.1-flash-lite-preview. This describes the inspected code, not a guarantee of current API availability.',
        'The prompt requests business-strategy advice, while parts of the UI still refer to career questions. The product wording needs alignment.',
      ]),
      prose('decisions', 'Engineering decisions', 'Keeping prompt construction, API communication, and response handling outside the UI makes those responsibilities easier to inspect independently. The memory window is bounded by exchanges, not by token count; the separate UI message history continues to grow during a session.'),
      list('limitations', 'Limitations & next steps', [
        'Session memory is not durable storage. Authentication, persistent histories, and response streaming are not implemented in the reviewed source.',
        'The settings file declares a memory limit, but app.py constructs ConversationMemory with its default rather than importing that setting.',
        'API failures share a broad fallback and are added to conversation history. Error classification and recovery need further work.',
        'The README names a different model and two different deployments. Neither live application could be verified during review, so no demo link is presented.',
      ]),
      prose('testing', 'Testing', 'No automated tests were found in the reviewed files. No Gemini requests or deployed-app tests were run. Memory eviction, empty responses, missing configuration, and API failures are useful validation targets.'),
      prose('outcome', 'Outcome', 'The source connects a chat interface to modular prompt, memory, API, and response components. It is presented as a prototype, with no claim of production readiness or reliable consultation accuracy.'),
    ],
  },
  {
    id: 'finance', slug: 'finance-tracker', title: 'FinanceTracker', subtitle: 'Desktop expense tracking',
    category: 'Applications', year: '2025', featured: true, status: 'Collaborative learning project',
    summary: 'A Java Swing application for weekly budgets, daily expenses, and savings, backed by a MySQL schema and JDBC prepared statements.',
    technologies: ['Java', 'Swing', 'JDBC', 'MySQL'], attribution: 'A collaborative project by Khadija and Sultan.',
    ...review('finance-tracker', 'bf0440cb12c7a86b34227deef099d6e8fcff94c3', ['FinanceTracker.java', 'FinanceTracker.sql', 'README.md']),
    sections: [
      prose('overview', 'Overview', 'FinanceTracker is a desktop application for allocating weekly pocket money, recording daily expenses, and viewing a summary. Both the README and application credit Khadija and Sultan. Individual contributions are not assigned here because the reviewed documentation does not separate them.'),
      prose('architecture', 'Architecture', 'Swing frame classes implement account creation, daily tracking, and summary views. A DB helper encapsulates JDBC calls. The accompanying SQL file creates users and expenses tables, linked through a user identifier.'),
      list('implementation', 'Implementation', [
        'Prepared statements bind user and expense values for inserts, updates, and queries.',
        'The UI validates positive amounts and checks spending against the daily budget.',
        'The DB helper retrieves savings, sums expenses, and updates leftover savings.',
        'The account-creation flow follows the application’s 50–30–20 allocation rule. This is application behavior, not a financial recommendation.',
      ]),
      prose('decisions', 'Engineering decisions', 'Separating the DB helper from the frame classes gives persistence operations a recognizable boundary, although the classes share one Java source file. Database calls occur inside UI flows, so a slow operation can block the interface.'),
      {
        id: 'limitations', title: 'Limitations & next steps', blocks: [
          { type: 'callout', title: 'Credential remediation required', text: 'The upstream Java source embeds a database password. Remove it from source, rotate any credential that is still used, and load configuration from the environment or a local file excluded from version control. The credential is intentionally not reproduced here.' },
          { type: 'list', items: ['Currency is stored with floating-point types; decimal representations would be more appropriate for precise money calculations.', 'Connection handling could use try-with-resources, and UI database work could be moved off the Swing event thread.', 'Category totals are queried by user and category without a weekly date boundary. The summary should be checked against the intended reporting period.'] },
        ],
      },
      prose('testing', 'Testing', 'No automated test files were present in the reviewed three-file repository. The desktop application and database were not run during this review. Budget boundaries, SQL failures, and summary periods need explicit validation.'),
      prose('outcome', 'Outcome', 'A desktop UI, database schema, and JDBC persistence implementation are present. Security configuration, calculation precision, and testing remain important follow-up work.'),
    ],
  },
  {
    id: 'activity-java', slug: 'activity-tracker-java', title: 'Activity Tracker', subtitle: 'Java command-line application',
    category: 'Systems and Tools', year: '2026', featured: true, status: 'Learning project',
    summary: 'A file-based activity tracker built around Java interfaces, collections, and separate query classes for types, dates, and accumulated duration.',
    technologies: ['Java', 'Collections', 'File I/O'],
    ...review('activity-tracker-general-cli', '362a304a6e497c86314c541f5d9598211726a557', ['ApplicationManager.java', 'ActivityInterface.java', 'ActivityIdentifier.java', 'QueryProcessor.java', 'BetweenTimeQuery.java', 'TotalTimeQuery.java']),
    sections: [
      prose('overview', 'Overview', 'This Java command-line application reads activity records from a user-selected file and lets the user query the resulting collection. It is a separate implementation from the Node.js and MongoDB project.'),
      prose('architecture', 'Architecture', 'ApplicationManager coordinates file loading and interaction. ActivityIdentifier parses text into activity objects. ActivityInterface exposes shared behavior, while QueryProcessor selects dedicated query classes.'),
      list('implementation', 'Implementation', ['Input lines are collected in a HashSet before conversion to an ArrayList of activity objects.', 'Activity types represent walking, running, cycling, and swimming with common and type-specific fields.', 'TOTAL-TIME aggregates Duration values; ACTIVITY filters by type; BETWEEN uses LocalDate comparisons.', 'The interactive loop exits on the exact command EXIT.']),
      prose('decisions', 'Engineering decisions', 'Shared interfaces let the query classes work across different activity types. The HashSet removes duplicate input lines but does not preserve file order. Date-range filtering is exclusive of the start and end dates in the inspected code.'),
      list('limitations', 'Limitations & next steps', ['The file-open error path prints a message but does not stop the following read, which can encounter a null scanner.', 'Malformed records, missing query arguments, and unknown activity types need explicit validation.', 'Duration output uses hour and minute parts, so multi-day totals need careful handling.']),
      prose('testing', 'Testing', 'A small demo file exists, but no automated assertion-based suite was found. The application was not compiled or executed during the portfolio review. File failures, duplicate lines, exact date boundaries, and multi-day durations are sensible future tests.'),
      prose('outcome', 'Outcome', 'The implementation provides a useful study of interfaces, collections, input parsing, and query responsibilities. It is presented as foundational software-design work, without unverified claims about advanced design patterns.'),
    ],
  },
  {
    id: 'tic-tac-toe', slug: 'tic-tac-toe', title: 'Tic-Tac-Toe', subtitle: 'Modular JavaScript',
    category: 'Applications', year: '2026', featured: false, status: 'Learning project',
    summary: 'A browser game with separate modules for board state, input events, tile mapping, and win-or-draw detection, bundled with Webpack.',
    technologies: ['JavaScript', 'ES Modules', 'Webpack', 'HTML & CSS'],
    ...review('tic-tac-toe', '40e9e9a88ec003361366ccad8bd24926bf4bf462', ['GameState.js', 'GameStateManager.js', 'EventHandler.js', 'WinningStateChecker.js', 'webpack.config.js', 'package.json']),
    sections: [
      prose('overview', 'Overview', 'A browser-based, two-player game organized as JavaScript modules. GameState holds the board and players; GameStateManager updates tiles, switches players, and resets rounds.'),
      prose('architecture', 'Architecture', 'EventHandler connects DOM interactions with state operations. Tile-mapping modules translate interface positions, while WinningStateChecker checks rows, columns, diagonals, and a full board.'),
      prose('decisions', 'Engineering decisions', 'The modules have distinct responsibilities but share a mutable game-state object. This keeps a small game straightforward while making explicit reset behavior important.'),
      prose('implementation', 'Implementation', 'Webpack builds the entry module and copies HTML, CSS, fonts, and images to a docs directory. Its HTML transform corrects the script reference for that output location. A deployment-oriented build is present; no live demo is asserted here.'),
      prose('testing', 'Testing', 'The inspected package contains build and development scripts, but no test command or automated test suite was found. The profile’s test-coverage claim is therefore not repeated. Round reset, win detection, and draws are useful regression targets.'),
    ],
  },
  {
    id: 'data-structures', slug: 'javascript-data-structures', title: 'JavaScript Data Structures', subtitle: 'Learning exercises',
    category: 'Experiments', year: '2026', featured: false, status: 'Exercises',
    summary: 'Implementations and exercises exploring linked lists, hash maps, recursion, and merge sort in plain JavaScript.',
    technologies: ['JavaScript', 'Data structures', 'Algorithms'],
    ...review('datastructures-js', '9053acda924bde09117084f1c1f13fb97a93e089', ['linkedList.js', 'hashMap.js', 'mergeSort.js', 'fibbanoci.js', 'test.js']),
    sections: [
      prose('overview', 'Overview', 'A collection of small JavaScript exercises covering linked lists, hash maps, sorting, and recursion. These are learning materials rather than a packaged data-structure library.'),
      prose('implementation', 'Implementation', 'The repository keeps each topic in a standalone script. Console examples exercise selected operations, including array merging and hash-map access.'),
      prose('testing', 'Testing & limitations', 'The file named test.js prints an array-merging example; it is not an automated assertion-based suite. No package or test-runner configuration is present in the reviewed snapshot. Completeness and correctness have not been established by execution.'),
    ],
  },
  {
    id: 'compiler-lab', slug: 'expression-parsing', title: 'Expression Parsing', subtitle: 'Compiler construction lab',
    category: 'Systems and Tools', year: '2026', featured: false, status: 'Academic exercise',
    summary: 'A JavaScript lab exercise using operator-precedence comparisons and a stack to construct postfix expressions.',
    technologies: ['JavaScript', 'Stacks', 'Parsing'],
    ...review('comp-sci-compiler-construction-lab', '2af7f623b8d9dcaf2a4c2729d0d58c6e25b0cc55', ['precendenceChecker.js']),
    sections: [
      prose('overview', 'Overview', 'A compiler-construction exercise from Sukkur IBA University. The inspected script contains an operator-precedence helper and a postfix generator, each organized as a module-like closure.'),
      prose('implementation', 'Implementation', 'The generator splits input into characters, writes operands to an output buffer, and uses a stack to manage operators and parentheses. It exposes functions for setting input, generating output, and resetting state.'),
      prose('testing', 'Testing & limitations', 'This is an academic exercise, not a complete compiler or general expression parser. The character-by-character operand check does not parse multi-character identifiers or numbers. No automated suite was found and runtime correctness was not verified.'),
    ],
  },
  {
    id: 'ml-lab', slug: 'python-data-labs', title: 'Python & Data Labs', subtitle: 'Machine learning coursework',
    category: 'AI and Data', year: '2026', featured: false, status: 'Academic exercises',
    summary: 'Coursework exploring Python fundamentals, NumPy arrays, pandas data operations, and plotting with Matplotlib.',
    technologies: ['Python', 'NumPy', 'pandas', 'Matplotlib'],
    ...review('comp-sci-machine-learning-lab', '78795ff88d10b40b89ffae7840259116d345896c', ['README.md']),
    sections: [
      prose('overview', 'Overview', 'A repository of machine-learning course exercises at Sukkur IBA University. The inspected Python lab covers language fundamentals, array manipulation, tabular data, and visualization.'),
      prose('implementation', 'Implementation', 'Examples include array reshaping, masking, normalization, aggregations, and DataFrame operations. The archive also contains a churn-model notebook, whose results are not assessed in this case study.'),
      prose('testing', 'Testing & limitations', 'The portfolio makes no claim about model performance or deployed machine-learning systems. The Python source was read but not executed. TODO: add an author-reviewed account of a specific experiment, its dataset, validation method, and reproducible results.'),
    ],
  },
];
