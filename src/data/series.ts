export interface SeriesPost {
  date: string;
  dateShort: string;
  title: string;
}

export interface Series {
  id: string;
  name: string;
  dateRange: string;
  posts: SeriesPost[];
}

// Dates and titles for the home timeline. A row is linked only when a note
// file exists in the blog collection at the same series and seriesOrder
// (1-based position in this list). Publishing a note is adding that file.
export const series: Series[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    dateRange: '27 Sep – 12 Oct 2026',
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
];

export const typescriptSeries = series.find(s => s.id === 'typescript')!;
export const reactSeries = series.find(s => s.id === 'react')!;
export const javascriptSeries = series.find(s => s.id === 'javascript')!;
