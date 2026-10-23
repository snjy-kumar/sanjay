export interface SeriesPost {
  date: string;
  dateShort: string;
  title: string;
}

export interface Series {
  id: string;
  name: string;
  dateRange: string;
  /** The meta description for the series' own page. */
  description: string;
  /** One paragraph in my own words. This is the introduction on the series'
   *  own page, and it is the reason that page is worth reading on its own
   *  instead of being a list of links. */
  blurb: string;
  /** The topics this series covers. They link to the topic pages. */
  topics: string[];
  /** Where the code behind the series lives. */
  repo?: string;
  /** The dated notes. Empty means the series is planned: it has a slot and a
   *  description, but nothing is written or scheduled yet. */
  posts: SeriesPost[];
  /** For a dedicated series: the notes it holds, in order. They have no
   *  dates. A row links to its note once the file exists in the blog
   *  collection (src/content/blog/<series>/<nn>.mdx, seriesOrder = the
   *  row's position, 1-based) and says "not written yet" until then, so
   *  the site never claims a note that is not written. */
  planned?: PlannedNote[];
  /** For a series that is never planned ahead, one sentence on why. */
  plannedNote?: string;
  /** A dedicated series: its notes have no dates. Each one is released as
   *  soon as its file is merged, numbered by its place in `planned`. The
   *  daily series (TypeScript, React, JavaScript, Redux) never set this. */
  undated?: boolean;
}

/** A note a plan calls for, before it has a date. `plan` and `phase` say
 *  which phase of which plan in src/data/plans.ts it comes from. */
export interface PlannedNote {
  title: string;
  plan?: string;
  phase?: number;
}

// Dates and titles for the home timeline. A series with no posts is a planned
// slot: it has a name and a description, but no dates or titles yet. A row is
// linked only when a note file exists in the blog collection at the same
// series and seriesOrder (1-based position in this list). Publishing a note is
// adding that file.
export const series: Series[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    dateRange: '27 Sep – 12 Oct 2026',
    description:
      'Sixteen notes on the TypeScript type system, written in the order I needed them: unions, narrowing, generics, utility types, and the bugs that taught me each one.',
    blurb:
      'Sixteen notes on the type system, written in the order I needed them. Every one of them starts from a bug or a confusing error rather than from the handbook, because the features I kept are the ones a failure named. The last note is the same list as thirty cards, so the series can be read in one sitting.',
    topics: [
      'types', 'unions', 'narrowing', 'generics',
      'utility-types', 'nullability', 'inference', 'readonly',
    ],
    posts: [
      { date: '2026-09-27', dateShort: '27 Sep', title: 'Basic types treated too casually' },
      { date: '2026-09-28', dateShort: '28 Sep', title: 'interface vs type' },
      { date: '2026-09-29', dateShort: '29 Sep', title: 'Union types' },
      { date: '2026-09-30', dateShort: '30 Sep', title: 'null/undefined + optional props' },
      { date: '2026-10-01', dateShort: '1 Oct', title: 'Arrays vs tuples' },
      { date: '2026-10-02', dateShort: '2 Oct', title: 'Typing functions properly' },
      { date: '2026-10-03', dateShort: '3 Oct', title: 'The `any` trap' },
      { date: '2026-10-04', dateShort: '4 Oct', title: 'Type narrowing' },
      { date: '2026-10-05', dateShort: '5 Oct', title: 'Generics I actually use' },
      { date: '2026-10-06', dateShort: '6 Oct', title: 'Partial / Pick / Omit' },
      { date: '2026-10-07', dateShort: '7 Oct', title: 'Discriminated unions (advanced)' },
      { date: '2026-10-08', dateShort: '8 Oct', title: 'unknown + validation (advanced)' },
      { date: '2026-10-09', dateShort: '9 Oct', title: 'Mapped types / strict config objects (advanced)' },
      { date: '2026-10-10', dateShort: '10 Oct', title: 'Learning one TS feature from a real bug' },
      { date: '2026-10-11', dateShort: '11 Oct', title: 'What honest TypeScript signals in a portfolio' },
      { date: '2026-10-12', dateShort: '12 Oct', title: 'TypeScript: 30 Wrong vs Right Cards' },
    ],
  },
  {
    id: 'react',
    name: 'React',
    dateRange: '15–30 Oct 2026',
    description:
      'Sixteen notes on React, written around the mistakes: derived state, effects used as event handlers, unstable list keys, stale closures, and the rules of hooks.',
    blurb:
      'Sixteen notes on React, written around the mistakes rather than the API. The recurring question in each one is the same: what should this component have known, and when? Most of the fixes are less code than the version they replace, which is usually the point.',
    topics: [
      'state', 'effects', 'hooks', 'lists',
      'forms', 'composition', 'context', 'memoization',
    ],
    posts: [
      { date: '2026-10-15', dateShort: '15 Oct', title: 'Derived state (store fullName vs derive)' },
      { date: '2026-10-16', dateShort: '16 Oct', title: 'useEffect used as an event handler' },
      { date: '2026-10-17', dateShort: '17 Oct', title: 'Missing/unstable list keys' },
      { date: '2026-10-18', dateShort: '18 Oct', title: 'Lifting state too high too early' },
      { date: '2026-10-19', dateShort: '19 Oct', title: 'Controlled inputs done wrong (fighting the DOM)' },
      { date: '2026-10-20', dateShort: '20 Oct', title: 'Stale closures in handlers/effects' },
      { date: '2026-10-21', dateShort: '21 Oct', title: 'Breaking rules of hooks / conditional hooks' },
      { date: '2026-10-22', dateShort: '22 Oct', title: 'useMemo/useCallback cargo cult' },
      { date: '2026-10-23', dateShort: '23 Oct', title: 'Context for every prop' },
      { date: '2026-10-24', dateShort: '24 Oct', title: 'Ignoring loading / error / empty UI states' },
      { date: '2026-10-25', dateShort: '25 Oct', title: 'One giant form state blob' },
      { date: '2026-10-26', dateShort: '26 Oct', title: 'Over-abstracting components too early' },
      { date: '2026-10-27', dateShort: '27 Oct', title: 'Fetch waterfalls / no cleanup on unmount' },
      { date: '2026-10-28', dateShort: '28 Oct', title: 'ref vs state confusion' },
      { date: '2026-10-29', dateShort: '29 Oct', title: 'What honest React looks like in a portfolio component' },
      { date: '2026-10-30', dateShort: '30 Oct', title: 'React: 30 Wrong vs Right Cards' },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    dateRange: '1 Nov – 1 Dec 2026',
    description:
      'Thirty-one notes on the language underneath React and TypeScript — values, functions, closures, the event loop, the DOM, and the trap in each.',
    blurb:
      'Thirty-one notes on the language underneath React and TypeScript. The order follows the language rather than the framework: values first, then functions, then the browser. By the end the parts React hides are no longer hidden.',
    topics: [
      'objects', 'arrays', 'functions', 'async', 'closures',
      'dom', 'events', 'coercion', 'modules',
    ],
    posts: [
      { date: '2026-11-01', dateShort: '1 Nov', title: 'var / let / const' },
      { date: '2026-11-02', dateShort: '2 Nov', title: '== vs ===' },
      { date: '2026-11-03', dateShort: '3 Nov', title: 'Truthy / falsy traps' },
      { date: '2026-11-04', dateShort: '4 Nov', title: 'typeof null' },
      { date: '2026-11-05', dateShort: '5 Nov', title: 'Type coercion' },
      { date: '2026-11-06', dateShort: '6 Nov', title: 'Scope and hoisting myths' },
      { date: '2026-11-07', dateShort: '7 Nov', title: 'Closures basics' },
      { date: '2026-11-08', dateShort: '8 Nov', title: 'Array methods misuse' },
      { date: '2026-11-09', dateShort: '9 Nov', title: 'Objects vs Maps' },
      { date: '2026-11-10', dateShort: '10 Nov', title: 'JSON.parse pitfalls' },
      { date: '2026-11-11', dateShort: '11 Nov', title: 'this binding' },
      { date: '2026-11-12', dateShort: '12 Nov', title: 'Prototypes vs classes' },
      { date: '2026-11-13', dateShort: '13 Nov', title: 'Async vs await error handling' },
      { date: '2026-11-14', dateShort: '14 Nov', title: 'Promise.all vs Promise.allSettled' },
      { date: '2026-11-15', dateShort: '15 Nov', title: 'Event loop misconceptions' },
      { date: '2026-11-16', dateShort: '16 Nov', title: 'Debouncing' },
      { date: '2026-11-17', dateShort: '17 Nov', title: 'Module vs script' },
      { date: '2026-11-18', dateShort: '18 Nov', title: 'Destructuring defaults' },
      { date: '2026-11-19', dateShort: '19 Nov', title: 'Optional chaining overuse' },
      { date: '2026-11-20', dateShort: '20 Nov', title: 'structuredClone vs JSON clone' },
      { date: '2026-11-21', dateShort: '21 Nov', title: 'innerHTML and XSS' },
      { date: '2026-11-22', dateShort: '22 Nov', title: 'Event delegation' },
      { date: '2026-11-23', dateShort: '23 Nov', title: 'preventDefault vs stopPropagation' },
      { date: '2026-11-24', dateShort: '24 Nov', title: 'Layout thrashing' },
      { date: '2026-11-25', dateShort: '25 Nov', title: 'IntersectionObserver' },
      { date: '2026-11-26', dateShort: '26 Nov', title: 'fetch abort and cleanup' },
      { date: '2026-11-27', dateShort: '27 Nov', title: 'localStorage sync traps' },
      { date: '2026-11-28', dateShort: '28 Nov', title: 'FormData' },
      { date: '2026-11-29', dateShort: '29 Nov', title: 'URLSearchParams' },
      { date: '2026-11-30', dateShort: '30 Nov', title: 'CustomEvent and honest JS in a portfolio snippet' },
      { date: '2026-12-01', dateShort: '1 Dec', title: 'JavaScript: 30 Wrong vs Right Cards' },
    ],
  },
  {
    id: 'redux',
    name: 'Redux',
    dateRange: '3–18 Dec 2026',
    description:
      'Sixteen notes that learn Redux the old way first — hand-built stores, action constants, switch reducers, a manually written async lifecycle — then let Redux Toolkit remove all of it.',
    blurb:
      'Sixteen notes that learn Redux the old way first — hand-built stores, action constants, switch statements, manually written async lifecycles — and only then let Redux Toolkit take all of it away. The plan is in the repository and was written before the first note; this series is that plan, condensed to the parts that changed how I write state.',
    topics: [
      'architecture', 'state', 'types', 'migration',
      'performance', 'debugging',
    ],
    posts: [
      { date: '2026-12-03', dateShort: '3 Dec', title: 'Why state management exists (prop drilling, counted)' },
      { date: '2026-12-04', dateShort: '4 Dec', title: 'The three principles' },
      { date: '2026-12-05', dateShort: '5 Dec', title: 'One-way data flow, drawn from memory' },
      { date: '2026-12-06', dateShort: '6 Dec', title: 'createStore, dispatch, getState, subscribe' },
      { date: '2026-12-07', dateShort: '7 Dec', title: 'Actions and action type constants' },
      { date: '2026-12-08', dateShort: '8 Dec', title: 'Action creators' },
      { date: '2026-12-09', dateShort: '9 Dec', title: 'Reducers and switch statements' },
      { date: '2026-12-10', dateShort: '10 Dec', title: 'Immutability and spread' },
      { date: '2026-12-11', dateShort: '11 Dec', title: 'combineReducers' },
      { date: '2026-12-12', dateShort: '12 Dec', title: 'A hand-built store (checkpoint)' },
      { date: '2026-12-13', dateShort: '13 Dec', title: 'Why reducers cannot be async' },
      { date: '2026-12-14', dateShort: '14 Dec', title: 'redux-thunk' },
      { date: '2026-12-15', dateShort: '15 Dec', title: 'The manual async lifecycle (the pain)' },
      { date: '2026-12-16', dateShort: '16 Dec', title: 'createSlice and extraReducers' },
      { date: '2026-12-17', dateShort: '17 Dec', title: 'useSelector, useDispatch, createSelector' },
      { date: '2026-12-18', dateShort: '18 Dec', title: 'Migrating legacy Redux to RTK, one feature at a time' },
    ],
  },
  {
    id: 'ui',
    name: 'UI and design systems',
    dateRange: 'Undated',
    undated: true,
    description:
      'The interface layer: design tokens, component APIs, loading, error and empty states, forms, accessibility, and the line between a component library and a design system.',
    blurb:
      'The React series is about how components work. This one is about what makes them usable: the tokens, states and accessibility rules that decide whether a screen survives a real user. It builds on the React series, and each note goes live as soon as it is written.',
    topics: ['accessibility', 'design-systems', 'composition', 'forms', 'performance', 'testing'],
    posts: [],
    planned: [
      { title: 'Semantic HTML, landmarks and one h1', plan: 'software-ai-developer', phase: 2 },
      { title: 'Design tokens before components', plan: 'software-developer', phase: 2 },
      { title: 'Component APIs: props, variants and composition', plan: 'software-ai-developer', phase: 2 },
      { title: 'Loading, error, empty and stale states', plan: 'software-ai-developer', phase: 2 },
      { title: 'Forms: validation, errors and submission feedback', plan: 'software-ai-developer', phase: 2 },
      { title: 'A keyboard and screen-reader pass', plan: 'software-developer', phase: 2 },
      { title: 'Responsive CSS: flexbox, grid and container queries', plan: 'software-ai-developer', phase: 2 },
      { title: 'A component library is not a design system', plan: 'software-ai-developer', phase: 2 },
    ],
  },
  {
    id: 'backend',
    name: 'Backend and data',
    dateRange: 'Undated',
    undated: true,
    description:
      'The other half of the stack: Node, HTTP, APIs, Postgres, schema design, auth, validation, queues, caching, and the failures that only appear under real load.',
    blurb:
      'The notes so far are frontend; the work is full-stack. This series follows one request from the browser to the database and back: routing, validation, auth, transactions, and the errors a demo never shows.',
    topics: ['http', 'databases', 'auth', 'security', 'performance', 'architecture'],
    posts: [],
    planned: [
      { title: 'One request, from the click to the row and back', plan: 'software-developer', phase: 3 },
      { title: 'HTTP methods, status codes and idempotency', plan: 'software-ai-developer', phase: 3 },
      { title: 'A router and middleware without a framework', plan: 'software-ai-developer', phase: 1 },
      { title: 'Validating at the boundary, not trusting the client', plan: 'software-ai-developer', phase: 3 },
      { title: 'Error shapes, pagination and OpenAPI', plan: 'software-ai-developer', phase: 3 },
      { title: 'SQL: joins, aggregates, CTEs and window functions', plan: 'software-ai-developer', phase: 4 },
      { title: 'Schema design, keys and constraints', plan: 'software-ai-developer', phase: 4 },
      { title: 'Indexes and reading a query plan', plan: 'software-ai-developer', phase: 4 },
      { title: 'Transactions, isolation levels and anomalies', plan: 'traditional-software-developer', phase: 8 },
      { title: 'Migrations, rollbacks and backfills', plan: 'software-ai-developer', phase: 4 },
      { title: 'Sessions, cookies and password hashing', plan: 'software-developer', phase: 3 },
      { title: 'Authorization: ownership checks and tenant isolation', plan: 'software-ai-developer', phase: 3 },
      { title: 'Background jobs, retries and dead-letter queues', plan: 'software-ai-developer', phase: 3 },
      { title: 'Caching and invalidation', plan: 'software-ai-developer', phase: 3 },
      { title: 'Rate limits, quotas and abuse', plan: 'software-ai-developer', phase: 3 },
      { title: 'A backup and a restore drill', plan: 'software-ai-developer', phase: 4 },
    ],
  },
  {
    id: 'craft',
    name: 'Craft and architecture',
    dateRange: 'Undated',
    undated: true,
    description:
      'The judgment layer: testing, security, performance, observability, migration, debugging, and the architectural decisions that are expensive to reverse.',
    blurb:
      'This is what separates a working demo from a system you can operate. The notes start from incidents, performance numbers and migrations rather than from definitions.',
    topics: ['testing', 'debugging', 'security', 'performance', 'architecture', 'migration'],
    posts: [],
    planned: [
      { title: 'The test pyramid as a heuristic, not a law', plan: 'traditional-software-developer', phase: 11 },
      { title: 'Tests that check behaviour, not implementation', plan: 'software-developer', phase: 4 },
      { title: 'Debugging: reproduce, bisect, prove the fix', plan: 'underrated-fundamentals', phase: 8 },
      { title: 'Threat-modelling one feature', plan: 'software-ai-developer', phase: 6 },
      { title: 'OWASP basics: injection, XSS, CSRF and SSRF', plan: 'software-developer', phase: 4 },
      { title: 'Secrets: storage, scanning and a leaked-key drill', plan: 'software-ai-developer', phase: 6 },
      { title: 'Measure before optimizing: profiles and p95', plan: 'software-developer', phase: 4 },
      { title: 'Timeouts, circuit breakers and graceful degradation', plan: 'software-ai-developer', phase: 10 },
      { title: 'A modular monolith before microservices', plan: 'software-ai-developer', phase: 10 },
      { title: 'Design docs, ADRs and a failure matrix', plan: 'software-ai-developer', phase: 10 },
      { title: 'Migrating a system one boundary at a time', plan: 'software-ai-developer', phase: 10 },
      { title: 'A postmortem for a real failure', plan: 'software-developer', phase: 4 },
    ],
  },
  {
    id: 'tools',
    name: 'Tools and delivery',
    dateRange: 'Undated',
    undated: true,
    description:
      'The build, the checks and the deploy: Git, Vite, Vitest, Playwright, GitHub Actions, Lighthouse, observability, and the scripts that make a site shippable.',
    blurb:
      'Nobody sees this work in a screenshot, and it is most of what shipping feels like. These notes document the tools around the code: the build, the gate, the deploy, and the failure that made each one necessary.',
    topics: ['tooling', 'delivery', 'observability', 'testing', 'performance'],
    posts: [],
    planned: [
      { title: 'The terminal and the tools nobody teaches', plan: 'traditional-software-developer', phase: 0 },
      { title: 'Git: small commits and a readable history', plan: 'software-ai-developer', phase: 1 },
      { title: 'What the build actually does', plan: 'software-developer', phase: 4 },
      { title: 'Vitest for units, Playwright for journeys', plan: 'software-developer', phase: 4 },
      { title: 'A CI gate that blocks a bad change', plan: 'software-developer', phase: 4 },
      { title: 'Lighthouse and a performance budget in CI', plan: 'software-ai-developer', phase: 2 },
      { title: 'Deploy, preview and rollback', plan: 'software-ai-developer', phase: 5 },
      { title: 'Error tracking, logs and traces in production', plan: 'software-ai-developer', phase: 5 },
    ],
  },
  {
    id: 'packages',
    name: 'Packages and supply chain',
    dateRange: 'Undated',
    undated: true,
    description:
      'How code is distributed and trusted: npm, semver, lockfiles, dependency graphs, bundle size, licences, audits, publishing, and the supply chain behind every install.',
    blurb:
      'Every project is mostly code other people wrote. This series learns the package layer properly: what a version range means, how a lockfile protects a build, and what it takes to publish something small and keep it maintainable.',
    topics: ['dependencies', 'modules', 'security', 'tooling'],
    posts: [],
    planned: [
      { title: 'What a version range actually allows', plan: 'software-ai-developer', phase: 6 },
      { title: 'Lockfiles and reproducible installs', plan: 'software-ai-developer', phase: 6 },
      { title: 'Reading the dependency graph and the bundle it ships', plan: 'software-developer', phase: 4 },
      { title: 'Audits, provenance and licences', plan: 'traditional-software-developer', phase: 11 },
      { title: 'Publishing one small package' },
      { title: 'Keeping a package maintained' },
    ],
  },
  {
    id: 'ai',
    name: 'AI engineering',
    dateRange: 'Undated',
    undated: true,
    description:
      'LLM APIs, prompting as specification, structured output, embeddings, retrieval, RAG, evals, cost, privacy, and the difference between a demo and a feature you can keep.',
    blurb:
      'Every app now has a model in it somewhere. The useful skill is not the API call; it is retrieval, evaluation, cost, and knowing when a model makes the product worse. This series builds one feature and measures it.',
    topics: ['llms', 'retrieval', 'evals', 'security', 'performance'],
    posts: [],
    planned: [
      { title: 'Tokens, context windows and sampling', plan: 'software-ai-developer', phase: 7 },
      { title: 'Prompting as a specification', plan: 'software-developer', phase: 5 },
      { title: 'Structured output with JSON Schema and Zod', plan: 'software-developer', phase: 5 },
      { title: 'What embeddings can and cannot represent', plan: 'software-ai-developer', phase: 7 },
      { title: 'Chunking and metadata', plan: 'software-developer', phase: 5 },
      { title: 'A vector store is not a search engine', plan: 'software-ai-developer', phase: 4 },
      { title: 'RAG over my own notes', plan: 'software-developer', phase: 5 },
      { title: 'Reranking and citations', plan: 'software-developer', phase: 5 },
      { title: 'An eval set worth keeping', plan: 'software-developer', phase: 5 },
      { title: 'Measuring retrieval separately from generation', plan: 'software-developer', phase: 5 },
      { title: 'Saying “I don’t know”: refusal and grounding', plan: 'software-developer', phase: 5 },
      { title: 'Cost and latency budgets', plan: 'software-ai-developer', phase: 7 },
      { title: 'Caching, streaming and model routing', plan: 'software-ai-developer', phase: 7 },
      { title: 'Prompt injection, and model output as untrusted input', plan: 'software-ai-developer', phase: 6 },
      { title: 'What gets sent to the provider', plan: 'software-ai-developer', phase: 8 },
      { title: 'When a model is the wrong tool', plan: 'software-ai-developer', phase: 8 },
    ],
  },
  {
    id: 'agents',
    name: 'Agents and automation',
    dateRange: 'Undated',
    undated: true,
    description:
      'Tool calling, MCP, planning loops, memory, sandboxing, guardrails, traces, agent evals, and the discipline of giving a model a bounded job with an approval gate.',
    blurb:
      'An agent is a loop with tools, a budget and a stop condition. This series builds one for this repository — read, check, propose, never merge — and explains why most jobs should stay deterministic scripts.',
    topics: ['agents', 'llms', 'evals', 'security', 'observability'],
    posts: [],
    planned: [
      { title: 'Automation is not an agent', plan: 'software-developer', phase: 6 },
      { title: 'The loop: observe, plan, act, check, stop', plan: 'software-developer', phase: 6 },
      { title: 'Tool calling and tool schemas', plan: 'software-ai-developer', phase: 9 },
      { title: 'MCP: discovery, permissions and transport', plan: 'software-ai-developer', phase: 9 },
      { title: 'Least privilege for tools', plan: 'software-ai-developer', phase: 9 },
      { title: 'Sandboxing the filesystem and the network', plan: 'software-ai-developer', phase: 9 },
      { title: 'Approval gates and a human in the loop', plan: 'software-developer', phase: 6 },
      { title: 'Traces: every tool call, cost and decision', plan: 'software-developer', phase: 6 },
      { title: 'Budgets, timeouts and a kill switch', plan: 'software-ai-developer', phase: 9 },
      { title: 'Memory: the context versus a long-term store', plan: 'software-ai-developer', phase: 9 },
      { title: 'The limits of planning and replanning', plan: 'software-ai-developer', phase: 9 },
      { title: 'Agent evals: task success and trajectory', plan: 'software-developer', phase: 6 },
      { title: 'Failure modes: loops, drift and tool abuse', plan: 'software-ai-developer', phase: 9 },
      { title: 'Idempotency, retries and compensation', plan: 'software-developer', phase: 6 },
      { title: 'Multi-agent, and when it is worth the coordination', plan: 'software-ai-developer', phase: 9 },
      { title: 'A maintainer agent for this repository: read, check, propose, never merge', plan: 'software-developer', phase: 6 },
    ],
  },
  {
    id: 'use-cases',
    name: 'Use cases and products',
    dateRange: 'Undated',
    undated: true,
    description:
      'The product layer: problem framing, user interviews, scope, analytics, SEO, onboarding, billing, support, and the iterations that turn a demo into something people use.',
    blurb:
      'A use case is the top of the stack; it chooses the technologies. This series takes one small product from a problem to ten users, and writes down what the users changed.',
    topics: ['product', 'seo', 'architecture'],
    posts: [],
    planned: [
      { title: 'Problem framing and a one-page spec', plan: 'underrated-fundamentals', phase: 9 },
      { title: 'User interviews without leading questions', plan: 'software-ai-developer', phase: 11 },
      { title: 'The smallest version that tests the riskiest assumption', plan: 'software-ai-developer', phase: 11 },
      { title: 'SEO, analytics and the one metric', plan: 'software-ai-developer', phase: 11 },
      { title: 'Onboarding, billing and support', plan: 'software-ai-developer', phase: 11 },
      { title: 'Ten users, three iterations and a case study', plan: 'software-developer', phase: 7 },
    ],
  },
  {
    id: 'bugs',
    name: 'Bugs I fixed',
    dateRange: 'Ongoing',
    description:
      'One or two notes a month: the symptom, the cause, the fix, and the rule that keeps the bug from coming back.',
    blurb:
      'A note that starts from a real failure teaches more than one that starts from documentation. These are short, specific, and written while the fix is still fresh.',
    topics: ['debugging', 'testing'],
    posts: [],
    plannedNote:
      'Nothing here is planned ahead. An entry is written only when a real bug is fixed: the symptom, the cause, the fix and the rule it left behind.',
  },
];

export const typescriptSeries = series.find(s => s.id === 'typescript')!;
export const reactSeries = series.find(s => s.id === 'react')!;
export const javascriptSeries = series.find(s => s.id === 'javascript')!;
export const reduxSeries = series.find(s => s.id === 'redux')!;
