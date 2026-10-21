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
  group: 'TypeScript' | 'React' | 'JavaScript' | 'Across the stack';
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
];

export const topicBySlug = (slug: string): Topic | undefined =>
  topics.find((topic) => topic.slug === slug);

export const topicGroups: Topic['group'][] = [
  'TypeScript',
  'React',
  'JavaScript',
  'Across the stack',
];
