export interface SeriesPost {
  date: string;
  dateShort: string;
  title: string;
  slug?: string;
  published: boolean;
}

export interface Series {
  id: string;
  name: string;
  dateRange: string;
  publishedCount: number;
  scheduledCount: number;
  posts: SeriesPost[];
}

type SeriesInput = Omit<Series, 'publishedCount' | 'scheduledCount'>;

// Derive the published/scheduled counts from the posts array so the rail
// counts can never drift out of sync with the journey list again.
function defineSeries(input: SeriesInput): Series {
  return {
    ...input,
    publishedCount: input.posts.filter((p) => p.published).length,
    scheduledCount: input.posts.filter((p) => !p.published).length,
  };
}

export const series: Series[] = [
  defineSeries({
    id: 'typescript',
    name: 'TypeScript',
    dateRange: '27 Sep – 12 Oct 2026',
    posts: [
      { date: '2026-09-27', dateShort: '27 Sep', title: 'Basic types treated too casually', slug: '01', published: true },
      { date: '2026-09-28', dateShort: '28 Sep', title: 'interface vs type', slug: '02', published: true },
      { date: '2026-09-29', dateShort: '29 Sep', title: 'Union types', slug: '03', published: true },
      { date: '2026-09-30', dateShort: '30 Sep', title: 'null/undefined + optional props', slug: '04', published: true },
      { date: '2026-10-01', dateShort: '1 Oct', title: 'Arrays vs tuples', slug: '05', published: true },
      { date: '2026-10-02', dateShort: '2 Oct', title: 'Typing functions properly', slug: '06', published: true },
      { date: '2026-10-03', dateShort: '3 Oct', title: 'The `any` trap', slug: '07', published: true },
      { date: '2026-10-04', dateShort: '4 Oct', title: 'Type narrowing', slug: '08', published: true },
      { date: '2026-10-05', dateShort: '5 Oct', title: 'Generics I actually use', slug: '09', published: true },
      { date: '2026-10-06', dateShort: '6 Oct', title: 'Partial / Pick / Omit', slug: '10', published: true },
      { date: '2026-10-07', dateShort: '7 Oct', title: 'Discriminated unions (advanced)', slug: '11', published: true },
      { date: '2026-10-08', dateShort: '8 Oct', title: 'unknown + validation (advanced)', slug: '12', published: true },
      { date: '2026-10-09', dateShort: '9 Oct', title: 'Mapped types / strict config objects (advanced)', slug: '13', published: true },
      { date: '2026-10-10', dateShort: '10 Oct', title: 'Learning one TS feature from a real bug', slug: '14', published: false },
      { date: '2026-10-11', dateShort: '11 Oct', title: 'What honest TypeScript signals in a portfolio', slug: '15', published: false },
      { date: '2026-10-12', dateShort: '12 Oct', title: 'TypeScript: 30 Wrong vs Right Cards', slug: '16', published: false },
    ],
  }),
  defineSeries({
    id: 'react',
    name: 'React',
    dateRange: '15–30 Oct 2026',
    posts: [
      { date: '2026-10-15', dateShort: '15 Oct', title: 'Derived state (store fullName vs derive)', slug: '01', published: false },
      { date: '2026-10-16', dateShort: '16 Oct', title: 'useEffect used as an event handler', slug: '02', published: false },
      { date: '2026-10-17', dateShort: '17 Oct', title: 'Missing/unstable list keys', slug: '03', published: false },
      { date: '2026-10-18', dateShort: '18 Oct', title: 'Lifting state too high too early', slug: '04', published: false },
      { date: '2026-10-19', dateShort: '19 Oct', title: 'Controlled inputs done wrong (fighting the DOM)', slug: '05', published: false },
      { date: '2026-10-20', dateShort: '20 Oct', title: 'Stale closures in handlers/effects', slug: '06', published: false },
      { date: '2026-10-21', dateShort: '21 Oct', title: 'Breaking rules of hooks / conditional hooks', slug: '07', published: false },
      { date: '2026-10-22', dateShort: '22 Oct', title: 'useMemo/useCallback cargo cult', slug: '08', published: false },
      { date: '2026-10-23', dateShort: '23 Oct', title: 'Context for every prop', slug: '09', published: false },
      { date: '2026-10-24', dateShort: '24 Oct', title: 'Ignoring loading / error / empty UI states', slug: '10', published: false },
      { date: '2026-10-25', dateShort: '25 Oct', title: 'One giant form state blob', slug: '11', published: false },
      { date: '2026-10-26', dateShort: '26 Oct', title: 'Over-abstracting components too early', slug: '12', published: false },
      { date: '2026-10-27', dateShort: '27 Oct', title: 'Fetch waterfalls / no cleanup on unmount', slug: '13', published: false },
      { date: '2026-10-28', dateShort: '28 Oct', title: 'ref vs state confusion', slug: '14', published: false },
      { date: '2026-10-29', dateShort: '29 Oct', title: 'What honest React looks like in a portfolio component', slug: '15', published: false },
      { date: '2026-10-30', dateShort: '30 Oct', title: 'React: 30 Wrong vs Right Cards', slug: '16', published: false },
    ],
  }),
  defineSeries({
    id: 'javascript',
    name: 'JavaScript',
    dateRange: '1 Nov – 1 Dec 2026',
    posts: [
      { date: '2026-11-01', dateShort: '1 Nov', title: 'var / let / const', slug: '01', published: false },
      { date: '2026-11-02', dateShort: '2 Nov', title: '== vs ===', slug: '02', published: false },
      { date: '2026-11-03', dateShort: '3 Nov', title: 'Truthy / falsy traps', slug: '03', published: false },
      { date: '2026-11-04', dateShort: '4 Nov', title: 'typeof null', slug: '04', published: false },
      { date: '2026-11-05', dateShort: '5 Nov', title: 'Type coercion', published: false },
      { date: '2026-11-06', dateShort: '6 Nov', title: 'Scope and hoisting myths', published: false },
      { date: '2026-11-07', dateShort: '7 Nov', title: 'Closures basics', published: false },
      { date: '2026-11-08', dateShort: '8 Nov', title: 'Array methods misuse', published: false },
      { date: '2026-11-09', dateShort: '9 Nov', title: 'Objects vs Maps', published: false },
      { date: '2026-11-10', dateShort: '10 Nov', title: 'JSON.parse pitfalls', published: false },
      { date: '2026-11-11', dateShort: '11 Nov', title: 'this binding', published: false },
      { date: '2026-11-12', dateShort: '12 Nov', title: 'Prototypes vs classes', published: false },
      { date: '2026-11-13', dateShort: '13 Nov', title: 'Async vs await error handling', published: false },
      { date: '2026-11-14', dateShort: '14 Nov', title: 'Promise.all vs Promise.allSettled', published: false },
      { date: '2026-11-15', dateShort: '15 Nov', title: 'Event loop misconceptions', published: false },
      { date: '2026-11-16', dateShort: '16 Nov', title: 'Debouncing', published: false },
      { date: '2026-11-17', dateShort: '17 Nov', title: 'Module vs script', published: false },
      { date: '2026-11-18', dateShort: '18 Nov', title: 'Destructuring defaults', published: false },
      { date: '2026-11-19', dateShort: '19 Nov', title: 'Optional chaining overuse', published: false },
      { date: '2026-11-20', dateShort: '20 Nov', title: 'structuredClone vs JSON clone', published: false },
      { date: '2026-11-21', dateShort: '21 Nov', title: 'innerHTML and XSS', published: false },
      { date: '2026-11-22', dateShort: '22 Nov', title: 'Event delegation', published: false },
      { date: '2026-11-23', dateShort: '23 Nov', title: 'preventDefault vs stopPropagation', published: false },
      { date: '2026-11-24', dateShort: '24 Nov', title: 'Layout thrashing', published: false },
      { date: '2026-11-25', dateShort: '25 Nov', title: 'IntersectionObserver', published: false },
      { date: '2026-11-26', dateShort: '26 Nov', title: 'fetch abort and cleanup', published: false },
      { date: '2026-11-27', dateShort: '27 Nov', title: 'localStorage sync traps', published: false },
      { date: '2026-11-28', dateShort: '28 Nov', title: 'FormData', published: false },
      { date: '2026-11-29', dateShort: '29 Nov', title: 'URLSearchParams', published: false },
      { date: '2026-11-30', dateShort: '30 Nov', title: 'CustomEvent and honest JS in a portfolio snippet', published: false },
      { date: '2026-12-01', dateShort: '1 Dec', title: 'JavaScript: 30 Wrong vs Right Cards', published: false },
    ],
  }),
];

export const typescriptSeries = series.find(s => s.id === 'typescript')!;
export const reactSeries = series.find(s => s.id === 'react')!;
export const javascriptSeries = series.find(s => s.id === 'javascript')!;
