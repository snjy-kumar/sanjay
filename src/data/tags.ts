// The controlled topic vocabulary.
//
// Every note carries two or three topic slugs in its frontmatter, and every
// topic that a published note uses gets its own page at /topics/<slug>/.
// The definition is what makes that page worth reading on its own — without
// it, a topic page is a bare list of links and reads like one.
//
// The vocabulary is deliberately small. Thirty-odd topics across four series
// means each page can hold real prose and a handful of notes, instead of
// forty pages holding one link each.

export interface Topic {
  slug: string;
  label: string;
  /** One or two sentences, in my own words. This is the page's own content. */
  definition: string;
  group:
    | 'TypeScript'
    | 'React'
    | 'JavaScript'
    | 'Across the stack'
    | 'Interface'
    | 'Backend and data'
    | 'AI and agents'
    | 'Product';
}

export const topics: Topic[] = [
  // ---- TypeScript ----
  {
    slug: 'types',
    label: 'Types',
    definition:
      'The basic vocabulary of the language: what a value is allowed to be, and how strict I keep that. Most "TypeScript problems" turn out to be a type that was written too loosely.',
    group: 'TypeScript',
  },
  {
    slug: 'unions',
    label: 'Unions',
    definition:
      'A value that can be one of several shapes. The first tool for saying "this is not always this", and the start of most honest domain models.',
    group: 'TypeScript',
  },
  {
    slug: 'narrowing',
    label: 'Narrowing',
    definition:
      'Letting the compiler follow the shape of a value instead of me asserting it. Where the type system stops describing the code and starts checking it.',
    group: 'TypeScript',
  },
  {
    slug: 'generics',
    label: 'Generics',
    definition:
      'Types that take an argument and give one back. Used for containers and helpers — the point is that the caller keeps their type, not that the signature looks clever.',
    group: 'TypeScript',
  },
  {
    slug: 'utility-types',
    label: 'Utility types',
    definition:
      'The built-in Partial, Pick, Omit, Record and their relatives. How to change a type without writing a new one, and when writing a new one is the better answer.',
    group: 'TypeScript',
  },
  {
    slug: 'nullability',
    label: 'Nullability',
    definition:
      'null, undefined, optional properties, and what happens when a value is missing at the edge of the system. The subject of more real bugs than any other type topic.',
    group: 'TypeScript',
  },
  {
    slug: 'inference',
    label: 'Inference',
    definition:
      'When the compiler works out the type for me, and when I should stop it from guessing. Mostly about knowing which of the two I am actually reading.',
    group: 'TypeScript',
  },
  {
    slug: 'readonly',
    label: 'Readonly',
    definition:
      'Types that refuse to be changed. The cheapest way to stop a bug before it exists, and a cheap way to stop a colleague from changing your object.',
    group: 'TypeScript',
  },

  // ---- React ----
  {
    slug: 'state',
    label: 'State',
    definition:
      'Where a value lives, who owns it, and when it should have been derived instead of stored. Most state bugs are really ownership bugs.',
    group: 'React',
  },
  {
    slug: 'effects',
    label: 'Effects',
    definition:
      'Syncing with the outside world — and the many times an effect was the wrong tool for the job. Effects are for synchronising, not for running things.',
    group: 'React',
  },
  {
    slug: 'hooks',
    label: 'Hooks',
    definition:
      'The rules of hooks, and what actually breaks when they are broken. Two rules, both about not lying to the renderer about when things happen.',
    group: 'React',
  },
  {
    slug: 'lists',
    label: 'Lists',
    definition:
      'Rendering collections: keys, order, and the re-renders nobody asked for. A list is where a state bug becomes visible.',
    group: 'React',
  },
  {
    slug: 'forms',
    label: 'Forms',
    definition:
      'Controlled inputs, validation, and the fights with the DOM. The place where the browser and React each insist on being the source of truth.',
    group: 'React',
  },
  {
    slug: 'composition',
    label: 'Composition',
    definition:
      'Building a component out of smaller parts, and knowing when to stop splitting. Composition over configuration is the rule that keeps components readable.',
    group: 'React',
  },
  {
    slug: 'context',
    label: 'Context',
    definition:
      'Passing values down the tree, and the re-render bill that comes with it. A tool for sharing values, not a state manager.',
    group: 'React',
  },
  {
    slug: 'memoization',
    label: 'Memoization',
    definition:
      'useMemo, useCallback and React.memo — when the cost is worth it and when it is cargo cult. Memoisation is a performance decision, not a default.',
    group: 'React',
  },

  // ---- JavaScript ----
  {
    slug: 'objects',
    label: 'Objects',
    definition:
      'Objects, property access, and the difference between a value and a reference. Also where optional chaining and the nullish operator earn their keep.',
    group: 'JavaScript',
  },
  {
    slug: 'arrays',
    label: 'Arrays',
    definition:
      'The array methods, what each one actually does to the original array, and the ones I reach for out of habit instead of for a reason.',
    group: 'JavaScript',
  },
  {
    slug: 'functions',
    label: 'Functions',
    definition:
      'Arguments, returns, scope, and the difference between a function and a value. Also: why default parameters are not the same as defaults.',
    group: 'JavaScript',
  },
  {
    slug: 'async',
    label: 'Async',
    definition:
      'Promises, async/await, and the order things actually happen in. What is queued, what is microtask, and why await inside a loop is a smell.',
    group: 'JavaScript',
  },
  {
    slug: 'closures',
    label: 'Closures',
    definition:
      'Functions that remember where they were made. The source of most stale-value bugs, and the reason a loop variable needs its own copy.',
    group: 'JavaScript',
  },
  {
    slug: 'dom',
    label: 'The DOM',
    definition:
      'Reading and changing the page, and the cost of doing it badly. Layout thrashing, and why the browser is often faster than the framework.',
    group: 'JavaScript',
  },
  {
    slug: 'events',
    label: 'Events',
    definition:
      'Listeners, delegation, and the difference between stopping an event and preventing one. Also the difference between bubbling and capturing.',
    group: 'JavaScript',
  },
  {
    slug: 'coercion',
    label: 'Coercion',
    definition:
      'How JavaScript converts types behind your back. The rules behind ===, +, and the truthy values that quietly make a condition true.',
    group: 'JavaScript',
  },
  {
    slug: 'modules',
    label: 'Modules',
    definition:
      'How code is split and loaded, and what each file can see. Imports, exports, hoisting, and why a circular dependency is a design problem.',
    group: 'JavaScript',
  },

  // ---- Across the stack ----
  {
    slug: 'debugging',
    label: 'Debugging',
    definition:
      'Finding the real cause of a failure instead of the nearest suspicious line. The method that turns a bug into a rule I keep.',
    group: 'Across the stack',
  },
  {
    slug: 'testing',
    label: 'Testing',
    definition:
      'What to test, what to skip, and how to write a test that fails for the right reason. A test is evidence, so it has to be worth keeping.',
    group: 'Across the stack',
  },
  {
    slug: 'performance',
    label: 'Performance',
    definition:
      'Measuring first, then deciding what to make faster. Most performance work is a wasted afternoon unless something was measured.',
    group: 'Across the stack',
  },
  {
    slug: 'tooling',
    label: 'Tooling',
    definition:
      'The build, the checks, and the scripts around the code. The part of the work nobody sees in a screenshot, and the part that makes the rest possible.',
    group: 'Across the stack',
  },
  {
    slug: 'architecture',
    label: 'Architecture',
    definition:
      'How the pieces fit together: the shape of an app, where state lives, and which decisions are worth reversing later.',
    group: 'Across the stack',
  },
  {
    slug: 'security',
    label: 'Security',
    definition:
      'The mistakes that leak data and the small habits that stop them. Boundaries, secrets, and what a cast at the edge of the system really costs.',
    group: 'Across the stack',
  },
  {
    slug: 'migration',
    label: 'Migration',
    definition:
      'Moving code from one way to another without breaking it on the way. Order of operations, what stays compatible, and how to know the move is done.',
    group: 'Across the stack',
  },
  // ---- The planned series ----
  //
  // These are the topics of the series that have a slot and a plan but no
  // notes yet. A topic still only gets a page once a published note carries
  // it, so adding a slug here creates nothing on the site by itself.

  // Interface
  {
    slug: 'accessibility',
    label: 'Accessibility',
    definition:
      'Landmarks, labels, focus, contrast and the keyboard. Whether a person who does not use a mouse can finish the flow, which is a feature and not a chore.',
    group: 'Interface',
  },
  {
    slug: 'design-systems',
    label: 'Design systems',
    definition:
      'Tokens, primitives, variants and the documentation that holds them together. The line between a folder of components and a system other people can build with.',
    group: 'Interface',
  },

  // Backend and data
  {
    slug: 'http',
    label: 'HTTP',
    definition:
      'Methods, status codes, headers, cookies, caching and CORS. The contract every request signs, whether or not the code underneath knows it.',
    group: 'Backend and data',
  },
  {
    slug: 'databases',
    label: 'Databases',
    definition:
      'Schemas, constraints, indexes, query plans, transactions and migrations. Most applications are a database with a UI, so this is where most of the slow and the wrong comes from.',
    group: 'Backend and data',
  },
  {
    slug: 'auth',
    label: 'Auth',
    definition:
      'Authentication is who you are; authorization is what you may do. Sessions, tokens, password hashing, ownership checks and tenant isolation.',
    group: 'Backend and data',
  },
  {
    slug: 'observability',
    label: 'Observability',
    definition:
      'Logs, metrics and traces: the way to find out what a running system is actually doing, instead of what I assumed it was doing.',
    group: 'Backend and data',
  },
  {
    slug: 'delivery',
    label: 'Delivery',
    definition:
      'The path from a commit to production and back: CI gates, previews, deploys and rollbacks. Shipping is a skill of its own.',
    group: 'Backend and data',
  },
  {
    slug: 'dependencies',
    label: 'Dependencies',
    definition:
      'Semver ranges, lockfiles, audits, licences and publishing. Every project is mostly code other people wrote, and this is how it is trusted.',
    group: 'Backend and data',
  },

  // AI and agents
  {
    slug: 'llms',
    label: 'LLMs',
    definition:
      'Tokens, context windows, sampling, structured output and cost. The model treated as a component with a contract, not as the architecture.',
    group: 'AI and agents',
  },
  {
    slug: 'retrieval',
    label: 'Retrieval',
    definition:
      'Embeddings, chunking, search, reranking and citations. A RAG system is a search system with a language model at the end, and it is measured like one.',
    group: 'AI and agents',
  },
  {
    slug: 'evals',
    label: 'Evals',
    definition:
      'Golden sets, regression checks and pass conditions for a probabilistic feature. A change ships only if it does not regress the eval.',
    group: 'AI and agents',
  },
  {
    slug: 'agents',
    label: 'Agents',
    definition:
      'A loop with tools, a budget and a stop condition. Tool schemas, permissions, approvals, traces and the discipline of using a script when the steps are known.',
    group: 'AI and agents',
  },

  // Product
  {
    slug: 'product',
    label: 'Product',
    definition:
      'Problem framing, users, scope and iteration. The part that decides whether anything else was worth building.',
    group: 'Product',
  },
  {
    slug: 'seo',
    label: 'SEO',
    definition:
      'Titles, descriptions, canonicals, sitemaps, structured data and content in the HTML. How a page is found by someone who does not already know it exists.',
    group: 'Product',
  },
];

export const topicBySlug = (slug: string): Topic | undefined =>
  topics.find((topic) => topic.slug === slug);

export const topicGroups: Topic['group'][] = [
  'TypeScript',
  'React',
  'JavaScript',
  'Across the stack',
  'Interface',
  'Backend and data',
  'AI and agents',
  'Product',
];
