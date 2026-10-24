// What is coming next, but not yet shaped into a series.
//
// A series in series.ts can be active, scheduled, or planned. A planned
// series has a name, a description, and a slot, but no notes yet. A track
// here is an intention that has not earned a series slot: the plan exists,
// the shape does not yet.
//
// The path page shows these under the dedicated series, so the strategy is
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
    id: 'career',
    name: 'Career and open source',
    why:
      'The last phase of the path: case studies, open-source contributions, interviews, and choosing a specialization. These are notes about the work around the code.',
    size: 'about 6 notes',
    topics: ['architecture', 'testing', 'debugging'],
  },
];
