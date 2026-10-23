// How a book's citations read on a page, and where they link.

import type { Book, BookCite } from '../data/books';
import { books } from '../data/books';
import { planById } from '../data/plans';
import { withBase } from './base';

/** The three roadmaps, in the order the books are worked through. */
export const roadmapOrder = [
  'traditional-software-developer',
  'software-developer',
  'software-ai-developer',
] as const;

const unitWord = (planId: string): string => {
  if (planId === 'underrated-fundamentals') return 'lens';
  if (planId === 'books-that-still-matter') return 'book';
  return 'phase';
};

/** "The traditional core, phase 1" or "The books that still matter". */
export function citeLabel(cite: BookCite): string {
  const plan = planById(cite.plan);
  const name = plan ? plan.label : cite.plan;
  return cite.phase === undefined ? name : `${name}, ${unitWord(cite.plan)} ${cite.phase}`;
}

/** "phase 1" or "lens 8", or "" when the plan names the book without a phase. */
export function citeShort(cite: BookCite): string {
  return cite.phase === undefined ? '' : `${unitWord(cite.plan)} ${cite.phase}`;
}

export const planHref = (planId: string): string => withBase(`/plans/${planId}/`);

/** The plans that cite a book, once each, with every phase that cites it. */
export function citingPlans(book: Book): { plan: string; label: string; phases: string[] }[] {
  const byPlan = new Map<string, string[]>();
  for (const cite of book.cited) {
    const list = byPlan.get(cite.plan) ?? [];
    const short = citeShort(cite);
    if (short && !list.includes(short)) list.push(short);
    byPlan.set(cite.plan, list);
  }
  return [...byPlan.entries()].map(([plan, phases]) => ({
    plan,
    label: planById(plan)?.label ?? plan,
    phases,
  }));
}

/** The roadmaps (of the three) that cite a book. */
export const roadmapsCiting = (book: Book): string[] =>
  roadmapOrder.filter((id) => book.cited.some((cite) => cite.plan === id));

/** The books one roadmap cites, ordered by the first phase that cites them. */
export function booksForRoadmap(planId: string): { book: Book; phases: number[] }[] {
  return books
    .map((book) => ({
      book,
      phases: book.cited
        .filter((cite) => cite.plan === planId && cite.phase !== undefined)
        .map((cite) => cite.phase!)
        .sort((a, b) => a - b),
      cites: book.cited.some((cite) => cite.plan === planId),
    }))
    .filter((row) => row.cites)
    .sort((a, b) => (a.phases[0] ?? 99) - (b.phases[0] ?? 99))
    .map(({ book, phases }) => ({ book, phases }));
}

/** Throw if the books data disagrees with itself or with the pages. */
export function checkBooks(pageSlugs: string[]): void {
  const seen = new Set<string>();
  for (const book of books) {
    if (seen.has(book.slug)) throw new Error(`books.ts: "${book.slug}" is listed twice.`);
    seen.add(book.slug);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(book.slug)) throw new Error(`books.ts: "${book.slug}" is not a slug.`);
    if (book.cited.length === 0) throw new Error(`books.ts: "${book.slug}" is cited by no plan.`);
    for (const cite of book.cited) {
      if (!planById(cite.plan)) throw new Error(`books.ts: "${book.slug}" cites unknown plan "${cite.plan}".`);
    }
  }
  for (const slug of pageSlugs) {
    if (!seen.has(slug)) {
      throw new Error(`src/content/books/${slug}.mdx has no entry in src/data/books.ts.`);
    }
  }
}
