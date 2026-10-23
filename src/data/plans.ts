// The plans behind the site, as data.
//
// Each plan is a page in src/content/plans/. The markdown is the plan in
// full; this file is the part the site needs to wire it in: which group it
// belongs to, which plans it sits next to, and, phase by phase, what the
// phase must produce and where its notes will go — a series slot in
// series.ts or a track in roadmap.ts.
//
// `notes` lists note ids (series/order, e.g. 'typescript/08') that cover a
// phase. A page only shows the ones that exist in the blog collection, so a
// scheduled note appears here on the day it is published and not before.
//
// The phase rows are copied from the tables in each plan. If a plan's table
// changes, change it here too; checkPlans() below fails the build if a
// planned note, a series or a track points at something that is not here.

import { series } from './series';
import { roadmap } from './roadmap';

export type PlanGroup =
  | 'traditional'
  | 'modern'
  | 'ai-era'
  | 'fundamentals'
  | 'books'
  | 'series';

export interface PlanGroupInfo {
  id: PlanGroup;
  name: string;
  /** One sentence: what this kind of plan is for. */
  summary: string;
}

export const planGroups: PlanGroupInfo[] = [
  {
    id: 'traditional',
    name: 'Traditional core',
    summary:
      'The computer science roadmap: how computation, memory, networks and data actually work. The part that does not change when the framework does.',
  },
  {
    id: 'modern',
    name: 'Modern software developer',
    summary:
      'The zero-to-shipped route: language, UI, backend, craft, AI features, agents and users, each phase ending in something deployed.',
  },
  {
    id: 'ai-era',
    name: 'Software AI developer',
    summary:
      'The applied full-stack route for owning an AI-native product end to end: the model treated as one component of a system that has to be operated.',
  },
  {
    id: 'fundamentals',
    name: 'Underrated fundamentals',
    summary:
      'Ten lenses that sit under every phase of every roadmap, with a ten-week practice plan of one artifact a week.',
  },
  {
    id: 'books',
    name: 'Books',
    summary:
      'A short reading list and a twelve-month sequence, each book tied to one thing to apply it to.',
  },
  {
    id: 'series',
    name: 'Series plans',
    summary:
      'The step-by-step plan for one series, and how its steps became the notes.',
  },
];

export interface PlanPhase {
  n: number;
  /** When, in the plan's own unit: '1–2' weeks, '2–3' months, '01–03' steps. */
  when: string;
  focus: string;
  /** What the phase must produce before the next one starts. */
  gate: string;
  /** The separate assessment gate, where a plan has one. */
  check?: string;
  /** Series slots the phase's notes belong to. */
  series: string[];
  /** Roadmap tracks the phase's notes belong to, where no slot holds them. */
  tracks: string[];
  /** Note ids that already cover part of the phase, published or scheduled. */
  notes: string[];
}

export interface Plan {
  /** The file name in src/content/plans/, and the URL. */
  id: string;
  group: PlanGroup;
  /** A short name for lists and crumbs. */
  label: string;
  /** The one question the plan answers. */
  question: string;
  bestFor: string;
  /** How long it takes, as the plan says. */
  length: string;
  /** Column headings for the phase table. */
  unit: string;
  gateLabel: string;
  phases: PlanPhase[];
  /** Other plans, in the order a reader should open them. */
  related: string[];
}

const SD = 'software-developer';
const AI = 'software-ai-developer';
const TR = 'traditional-software-developer';
const UF = 'underrated-fundamentals';
const BK = 'books-that-still-matter';
const RX = 'redux';

export const plans: Plan[] = [
  {
    id: TR,
    group: 'traditional',
    label: 'The traditional core',
    question: 'How does computation actually work?',
    bestFor: 'Fundamentals, systems, interviews, confidence',
    length: '14 months, 58 weeks',
    unit: 'Weeks',
    gateLabel: 'Gate',
    phases: [
      { n: 0, when: '1–2', focus: 'Setup, study system, baseline', gate: 'A public repo and a study log', series: ['tools'], tracks: [], notes: [] },
      { n: 1, when: '3–5', focus: 'Programming from first principles', gate: 'A tested CLI tool', series: ['craft', 'bugs'], tracks: [], notes: ['javascript/06', 'javascript/07', 'typescript/06'] },
      { n: 2, when: '6–9', focus: 'Discrete mathematics', gate: 'Proofs and a probability simulation', series: [], tracks: ['theory'], notes: [] },
      { n: 3, when: '10–16', focus: 'Data structures', gate: 'A from-scratch library', series: [], tracks: ['dsa'], notes: ['javascript/09', 'typescript/05'] },
      { n: 4, when: '17–23', focus: 'Algorithms', gate: 'Unseen problems and benchmarks', series: [], tracks: ['dsa'], notes: [] },
      { n: 5, when: '24–28', focus: 'Architecture and C', gate: 'A memory-safe C project', series: [], tracks: ['machine'], notes: [] },
      { n: 6, when: '29–33', focus: 'Operating systems', gate: 'A shell and a thread pool', series: [], tracks: ['machine'], notes: [] },
      { n: 7, when: '34–37', focus: 'Networks', gate: 'An HTTP server and a DNS client', series: ['backend'], tracks: [], notes: ['javascript/26'] },
      { n: 8, when: '38–41', focus: 'Databases', gate: 'A tuned schema and a migration', series: ['backend'], tracks: [], notes: [] },
      { n: 9, when: '42–45', focus: 'Theory and compilers', gate: 'A small interpreter or compiler', series: [], tracks: ['theory'], notes: ['typescript/08', 'typescript/11'] },
      { n: 10, when: '46–50', focus: 'Distributed systems', gate: 'A replicated key-value store', series: ['backend'], tracks: [], notes: [] },
      { n: 11, when: '51–53', focus: 'Software engineering and security', gate: 'A threat model and a CI gate', series: ['craft', 'tools', 'packages'], tracks: [], notes: ['javascript/21'] },
      { n: 12, when: '54–58', focus: 'Capstone', gate: 'A system with evidence', series: ['craft'], tracks: ['career'], notes: [] },
    ],
    related: [SD, AI, UF, BK],
  },
  {
    id: SD,
    group: 'modern',
    label: 'The real path to becoming a software developer',
    question: 'How do I go from zero to shipped features?',
    bestFor: 'Beginners and career changers',
    length: '18 months, 78 weeks',
    unit: 'Weeks',
    gateLabel: 'Ship',
    phases: [
      { n: 0, when: '1–2', focus: 'Orientation: terminal, Git, HTTP, deploy', gate: 'A static page, public', series: ['tools'], tracks: [], notes: [] },
      { n: 1, when: '3–10', focus: 'JavaScript and TypeScript', gate: 'A vanilla app, no framework', check: 'Build a todo app from scratch, no framework. Pass: it works, persists, and you can explain every function.', series: ['javascript', 'typescript'], tracks: [], notes: ['typescript/03', 'typescript/07', 'typescript/08', 'typescript/09', 'typescript/12', 'javascript/07', 'javascript/13', 'javascript/15'] },
      { n: 2, when: '11–18', focus: 'React, UI systems, accessibility', gate: 'A multi-page React app', check: 'Explain why a React component re-renders. Pass: fix a stale closure and a derived-state bug.', series: ['react', 'redux', 'ui'], tracks: [], notes: ['react/01', 'react/02', 'react/03', 'react/05', 'react/06', 'react/07', 'react/08', 'react/09'] },
      { n: 3, when: '19–26', focus: 'Node, APIs, Postgres, auth', gate: 'A full-stack app', check: 'Design a multi-user schema. Pass: auth, authorization, migrations, and a test that proves isolation.', series: ['backend'], tracks: [], notes: [] },
      { n: 4, when: '27–32', focus: 'Testing, CI, security, performance', gate: 'A hardened app', check: 'Make a failing test pass. Pass: add CI, find a security bug, read a flame graph.', series: ['craft', 'tools', 'packages'], tracks: [], notes: ['javascript/21', 'javascript/24'] },
      { n: 5, when: '33–40', focus: 'AI engineering: RAG, evals, cost', gate: 'An AI feature with citations', check: 'Build a RAG feature. Pass: measure retrieval and generation; show a refusal.', series: ['ai'], tracks: [], notes: [] },
      { n: 6, when: '41–46', focus: 'Agents: tools, MCP, guardrails', gate: 'A bounded maintainer agent', check: 'Build a tool-using agent. Pass: approval gate, trace, budget, kill switch.', series: ['agents'], tracks: [], notes: [] },
      { n: 7, when: '47–56', focus: 'Product, users, iteration', gate: 'A product with 10 users', check: 'Ship to ten users. Pass: three iterations and a postmortem.', series: ['use-cases'], tracks: [], notes: [] },
      { n: 8, when: '57–78', focus: 'Career: portfolio, open source, interviews', gate: 'Interviews or paid work', check: 'Present three case studies. Pass: a stranger can explain what you would be trusted with.', series: [], tracks: ['career'], notes: ['typescript/15', 'react/15', 'javascript/30'] },
    ],
    related: [TR, AI, UF, BK, RX],
  },
  {
    id: AI,
    group: 'ai-era',
    label: 'The software AI developer',
    question: 'Can I own an AI-native product end to end?',
    bestFor: 'Working developers going deep',
    length: '16–18 months, 68 weeks',
    unit: 'Weeks',
    gateLabel: 'Gate',
    phases: [
      { n: 0, when: '1–2', focus: 'Orientation and baseline', gate: 'A deployed app and a study log', series: ['tools'], tracks: [], notes: [] },
      { n: 1, when: '3–6', focus: 'Core programming from first principles', gate: 'A router and JSON parser from scratch', series: ['javascript', 'typescript', 'backend', 'tools'], tracks: [], notes: ['javascript/09', 'javascript/10', 'javascript/15', 'typescript/12'] },
      { n: 2, when: '7–12', focus: 'Frontend engineering', gate: 'An accessible, fast, tested UI', series: ['react', 'ui', 'tools'], tracks: [], notes: ['react/05', 'react/10', 'react/11', 'react/13'] },
      { n: 3, when: '13–18', focus: 'Backend engineering', gate: 'An API with auth, jobs, and limits', series: ['backend'], tracks: [], notes: [] },
      { n: 4, when: '19–24', focus: 'Databases and data', gate: 'A tuned schema and a restore drill', series: ['backend', 'ai'], tracks: [], notes: [] },
      { n: 5, when: '25–30', focus: 'DevOps and production', gate: 'A pipeline, dashboards, and a rollback', series: ['tools'], tracks: [], notes: [] },
      { n: 6, when: '31–34', focus: 'Security and privacy', gate: 'A threat model and real fixes', series: ['craft', 'packages', 'ai'], tracks: [], notes: ['javascript/21'] },
      { n: 7, when: '35–42', focus: 'AI engineering foundations', gate: 'A RAG app with an eval suite', series: ['ai'], tracks: [], notes: [] },
      { n: 8, when: '43–50', focus: 'RAG and AI product engineering', gate: 'A production AI feature', series: ['ai'], tracks: [], notes: [] },
      { n: 9, when: '51–56', focus: 'Agents and automation', gate: 'A bounded agent with approvals', series: ['agents'], tracks: [], notes: [] },
      { n: 10, when: '57–60', focus: 'Architecture and system design', gate: 'A design doc and a failure matrix', series: ['craft'], tracks: [], notes: [] },
      { n: 11, when: '61–62', focus: 'Product, users, and market', gate: 'Ten users and three iterations', series: ['use-cases'], tracks: [], notes: [] },
      { n: 12, when: '63–68', focus: 'Capstone', gate: 'An operated AI-native product', series: ['use-cases'], tracks: ['career'], notes: [] },
    ],
    related: [TR, SD, UF, BK],
  },
  {
    id: UF,
    group: 'fundamentals',
    label: 'The underrated fundamentals',
    question: 'What stays true after the framework, the language and the model change?',
    bestFor: 'Anyone on any of the three roadmaps',
    length: '10 weeks of practice, one artifact a week',
    unit: 'Week',
    gateLabel: 'Artifact',
    phases: [
      { n: 1, when: '1', focus: 'Memory', gate: 'A dynamic array in C, with a memory diagram and a sanitizer run', series: [], tracks: ['machine', 'fundamentals'], notes: ['javascript/20'] },
      { n: 2, when: '2', focus: 'State', gate: 'A state machine for a login or order flow, with invariants and property tests', series: ['react', 'redux'], tracks: ['fundamentals'], notes: ['typescript/11', 'react/01', 'react/04'] },
      { n: 3, when: '3', focus: 'Concurrency', gate: 'A producer–consumer queue with a deterministic race test', series: ['backend'], tracks: ['machine', 'fundamentals'], notes: ['javascript/14', 'javascript/15'] },
      { n: 4, when: '4', focus: 'Failure', gate: 'An endpoint with retries, idempotency keys, and a failure matrix', series: ['backend', 'craft'], tracks: ['fundamentals'], notes: ['javascript/13'] },
      { n: 5, when: '5', focus: 'Contracts', gate: 'An OpenAPI schema, boundary validation, and contract tests', series: ['backend'], tracks: ['fundamentals'], notes: ['typescript/12'] },
      { n: 6, when: '6', focus: 'Cost', gate: 'A benchmark, a profile, and a latency budget for one endpoint', series: ['craft'], tracks: ['fundamentals'], notes: ['react/08', 'javascript/24'] },
      { n: 7, when: '7', focus: 'Trust', gate: 'A threat model, a cross-tenant test, and a deny-by-default permission check', series: ['craft', 'backend'], tracks: ['fundamentals'], notes: ['javascript/21'] },
      { n: 8, when: '8', focus: 'Investigation', gate: 'A debugging write-up of an unfamiliar repository, including git bisect', series: ['craft', 'bugs'], tracks: ['fundamentals'], notes: ['typescript/14'] },
      { n: 9, when: '9', focus: 'Framing', gate: 'A one-page spec, a pre-mortem, and five user interviews', series: ['use-cases'], tracks: ['fundamentals'], notes: [] },
      { n: 10, when: '10', focus: 'Communication', gate: 'An ADR, a postmortem, and a one-page design doc', series: ['craft'], tracks: ['fundamentals'], notes: [] },
    ],
    related: [TR, SD, AI, BK],
  },
  {
    id: BK,
    group: 'books',
    label: 'The books that still matter',
    question: 'What is worth reading, in what order, and what is it for?',
    bestFor: 'A JavaScript and TypeScript developer in the AI era',
    length: '12 months, one book at a time',
    unit: 'Months',
    gateLabel: 'Apply it to',
    phases: [
      { n: 1, when: '1', focus: 'A Philosophy of Software Design', gate: 'Name the complexity in one file you own', series: ['craft'], tracks: ['reading'], notes: ['react/12'] },
      { n: 2, when: '1', focus: 'Debugging', gate: 'Write reproduction steps before your next fix', series: ['bugs'], tracks: ['reading'], notes: ['typescript/14'] },
      { n: 3, when: '2–3', focus: 'Effective TypeScript', gate: 'Turn on strict mode and remove every any', series: ['typescript'], tracks: ['reading'], notes: ['typescript/07'] },
      { n: 4, when: '4–5', focus: 'Use the Index, Luke', gate: 'Read the query plan for your slowest endpoint', series: ['backend'], tracks: ['reading'], notes: [] },
      { n: 5, when: '6', focus: 'High Performance Browser Networking', gate: 'Measure one page load and fix one network cost', series: ['craft'], tracks: ['reading'], notes: ['react/13'] },
      { n: 6, when: '7', focus: 'The Linux Command Line', gate: 'Deploy and debug on a server without a GUI', series: ['tools'], tracks: ['reading'], notes: [] },
      { n: 7, when: '8', focus: 'Unit Testing', gate: 'Rewrite one test suite around behavior', series: ['craft'], tracks: ['reading'], notes: [] },
      { n: 8, when: '9', focus: "The Programmer's Brain", gate: 'Read an unfamiliar repository end to end', series: ['craft'], tracks: ['reading'], notes: [] },
      { n: 9, when: '10', focus: 'On Writing Well', gate: 'Write one design doc and one postmortem', series: ['craft'], tracks: ['reading'], notes: [] },
      { n: 10, when: '11–12', focus: 'Designing Data-Intensive Applications', gate: 'Map each chapter to a system you have run', series: ['backend'], tracks: ['reading'], notes: [] },
    ],
    related: [SD, AI, TR, UF],
  },
  {
    id: RX,
    group: 'series',
    label: 'The Redux plan',
    question: 'How does Redux work, legacy first, and when is it not needed?',
    bestFor: 'The Redux series',
    length: '36 steps, 16 notes',
    unit: 'Steps',
    gateLabel: 'Checkpoint',
    phases: [
      { n: 0, when: '01–03', focus: 'Foundations', gate: 'Draw the one-way data flow from memory', series: ['redux'], tracks: [], notes: ['redux/01', 'redux/02', 'redux/03'] },
      { n: 1, when: '04–10', focus: 'Legacy Redux core', gate: 'A hand-built store (step 10)', series: ['redux'], tracks: [], notes: ['redux/04', 'redux/05', 'redux/06', 'redux/07', 'redux/08', 'redux/09'] },
      { n: 2, when: '11–14', focus: 'Async in legacy Redux', gate: 'The manual async lifecycle, felt', series: ['redux'], tracks: [], notes: ['redux/10', 'redux/11'] },
      { n: 3, when: '15–19', focus: 'React bindings (react-redux)', gate: 'connect and hooks, side by side', series: ['redux', 'react'], tracks: [], notes: ['redux/15'] },
      { n: 4, when: '20–24', focus: 'Redux Toolkit core', gate: 'The same store, in RTK', series: ['redux'], tracks: [], notes: ['redux/12', 'redux/13'] },
      { n: 5, when: '25–27', focus: 'Async the RTK way', gate: 'A full async CRUD feature (step 26)', series: ['redux'], tracks: [], notes: ['redux/14'] },
      { n: 6, when: '28', focus: 'Data fetching (RTK Query)', gate: 'Knowing when it replaces a thunk', series: ['redux'], tracks: [], notes: [] },
      { n: 7, when: '29–33', focus: 'Migration legacy → RTK', gate: 'A mixed store, cleaned up (step 33)', series: ['redux'], tracks: [], notes: ['redux/16'] },
      { n: 8, when: '34–36', focus: 'TypeScript, testing, and “do I even need Redux?”', gate: 'A typed, tested slice, and a reason to skip Redux', series: ['redux', 'typescript'], tracks: [], notes: ['redux/16'] },
    ],
    related: [SD, AI],
  },
];

export const planById = (id: string): Plan | undefined =>
  plans.find((plan) => plan.id === id);

export const plansInGroup = (group: PlanGroup): Plan[] =>
  plans.filter((plan) => plan.group === group);

/** The plans with a phase that feeds a series, in plan order. */
export const plansForSeries = (seriesId: string): Plan[] =>
  plans.filter((plan) => plan.phases.some((phase) => phase.series.includes(seriesId)));

/** The plans with a phase that feeds a roadmap track. */
export const plansForTrack = (trackId: string): Plan[] =>
  plans.filter((plan) => plan.phases.some((phase) => phase.tracks.includes(trackId)));

/** The three roadmaps the path page compares, in reading order. */
export const roadmapPlans: Plan[] = [TR, SD, AI].map((id) => planById(id)!);

/**
 * Fails the build if the data disagrees with itself: a phase pointing at a
 * series or track that does not exist, a planned note naming a plan phase
 * that is not here, or a related plan that is missing.
 */
export function checkPlans(planIds: string[]): void {
  const problems: string[] = [];
  const seriesIds = new Set(series.map((s) => s.id));
  const trackIds = new Set(roadmap.map((t) => t.id));

  for (const id of planIds) {
    if (!planById(id)) problems.push(`src/content/plans/${id}.md has no entry in plans.ts`);
  }
  for (const plan of plans) {
    if (!planIds.includes(plan.id)) problems.push(`plans.ts: ${plan.id} has no page in src/content/plans/`);
    for (const rel of plan.related) {
      if (!planById(rel)) problems.push(`plans.ts: ${plan.id} relates to unknown plan ${rel}`);
    }
    for (const phase of plan.phases) {
      for (const s of phase.series) {
        if (!seriesIds.has(s)) problems.push(`plans.ts: ${plan.id} phase ${phase.n} feeds unknown series ${s}`);
      }
      for (const t of phase.tracks) {
        if (!trackIds.has(t)) problems.push(`plans.ts: ${plan.id} phase ${phase.n} feeds unknown track ${t}`);
      }
    }
  }
  for (const s of series) {
    for (const note of s.planned ?? []) {
      if (!note.plan) continue;
      const phase = planById(note.plan)?.phases.find((p) => p.n === note.phase);
      if (!phase) problems.push(`series.ts: "${note.title}" names ${note.plan} phase ${note.phase}, which is not in plans.ts`);
      else if (!phase.series.includes(s.id)) problems.push(`series.ts: "${note.title}" is in ${s.id}, but ${note.plan} phase ${note.phase} does not feed ${s.id}`);
    }
  }
  for (const track of roadmap) {
    for (const p of track.plans) {
      if (!planById(p)) problems.push(`roadmap.ts: ${track.id} names unknown plan ${p}`);
      else if (!planById(p)!.phases.some((ph) => ph.tracks.includes(track.id))) problems.push(`roadmap.ts: ${track.id} names ${p}, but no phase of it feeds the track`);
    }
  }
  if (problems.length > 0) {
    throw new Error(`The plans disagree with the series and roadmap:\n  ${problems.join('\n  ')}`);
  }
}
