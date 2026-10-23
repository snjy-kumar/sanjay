// What is coming next, but not yet shaped into a series.
//
// A series in series.ts can be active, scheduled, or planned. A planned
// series has a name, a description, and a slot, but no notes yet. A track
// here is an intention that has not earned a series slot: the plan exists,
// the shape does not yet.
//
// The path page shows these under the dedicated series, so the strategy is
// visible without pretending the work is done. Every phase of every plan
// lands either in a series slot or in one of these tracks; plans.ts says
// which.

export interface RoadmapTrack {
  id: string;
  name: string;
  /** Why this track is next, in a sentence. */
  why: string;
  /** Roughly how many notes it will hold. */
  size: string;
  topics: string[];
  /** The plans in src/data/plans.ts this track comes from. */
  plans: string[];
}

export const roadmap: RoadmapTrack[] = [
  {
    id: 'career',
    name: 'Career and open source',
    why:
      'The last phase of the path: case studies, open-source contributions, interviews, and choosing a specialization. These are notes about the work around the code.',
    size: 'about 6 notes',
    topics: ['architecture', 'testing', 'debugging'],
    plans: ['software-developer', 'software-ai-developer'],
  },
  {
    id: 'theory',
    name: 'Discrete maths, theory and compilers',
    why:
      'Phases 2 and 9 of the traditional core: logic, proofs, probability, automata, parsing and a small interpreter. It is the layer under the type checker and the build tools, and none of the series slots holds it.',
    size: 'about 8 notes',
    topics: ['types', 'inference', 'tooling'],
    plans: ['traditional-software-developer'],
  },
  {
    id: 'dsa',
    name: 'Data structures and algorithms',
    why:
      'Phases 3 and 4 of the traditional core: a from-scratch library, then unseen problems and benchmarks. Each note asks the same five questions of one structure or technique: representation, operations, complexity, tradeoff, and when not to use it.',
    size: 'about 14 notes',
    topics: ['arrays', 'objects', 'performance'],
    plans: ['traditional-software-developer'],
  },
  {
    id: 'machine',
    name: 'The machine: C, memory and operating systems',
    why:
      'Phases 5 and 6 of the traditional core, and the memory and concurrency lenses of the fundamentals: pointers, caches, processes, threads and a small shell. The layer one below the JavaScript runtime.',
    size: 'about 10 notes',
    topics: ['performance', 'async', 'debugging'],
    plans: ['traditional-software-developer', 'underrated-fundamentals'],
  },
  {
    id: 'fundamentals',
    name: 'The underrated fundamentals',
    why:
      'One note per lens from the ten-week practice plan: memory, state, concurrency, failure, contracts, cost, trust, investigation, framing and communication. Each note is written after its artifact exists, not before.',
    size: '10 notes',
    topics: ['debugging', 'architecture', 'security', 'performance'],
    plans: ['underrated-fundamentals'],
  },
  {
    id: 'reading',
    name: 'Reading log',
    why:
      'The twelve-month book sequence, one note per book: what it changed and the thing I applied it to. A book counts only when the application is done.',
    size: 'about 10 notes',
    topics: ['architecture', 'debugging', 'testing'],
    plans: ['books-that-still-matter'],
  },
];
