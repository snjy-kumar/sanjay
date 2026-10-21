// What is coming next, but not yet scheduled.
//
// A series in series.ts is a committed curriculum with dated notes. A track
// here is an intention: the plan exists, the notes do not. Keeping them apart
// stops the learning path from claiming more than it has done.
//
// The path page shows these under the published series, so the strategy is
// visible without pretending the work is done.

export interface RoadmapTrack {
  id: string;
  name: string;
  /** Why this track is next, in a sentence. */
  why: string;
  /** Roughly how many notes it will hold. */
  size: string;
  topics: string[];
}

export const roadmap: RoadmapTrack[] = [
  {
    id: 'node',
    name: 'Node and APIs',
    why:
      'Every project on my GitHub is Express, Prisma and Postgres, and none of it is written up yet. The notes I write are frontend; the work I do is full-stack.',
    size: 'about 16 notes',
    topics: ['architecture', 'security', 'testing', 'debugging'],
  },
  {
    id: 'testing',
    name: 'Testing',
    why:
      'A test is the part of the work that keeps its value after the feature is forgotten. Reducers are easy to test; components and APIs are where the discipline actually shows.',
    size: 'about 8 notes',
    topics: ['testing', 'debugging', 'architecture'],
  },
  {
    id: 'tooling',
    name: 'How this site works',
    why:
      'This site runs a daily publish bot, a build gate, a share-card renderer and a feed. Nobody sees that work in a screenshot, and it is most of what I have learned about shipping.',
    size: 'about 8 notes',
    topics: ['tooling', 'performance'],
  },
  {
    id: 'bugs',
    name: 'Bugs I fixed',
    why:
      'A note that starts from a real failure teaches more than one that starts from documentation. Symptom, cause, fix, and the rule I kept so it does not come back.',
    size: 'one or two a month',
    topics: ['debugging', 'testing'],
  },
];
