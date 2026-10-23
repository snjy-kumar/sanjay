// One page per chapter: how a chapter's address is made, the order the
// chapters of a book come in, and the checks that keep the files honest.
// See docs/CHAPTER_PAGE_GUIDE.md.

import type { CollectionEntry } from 'astro:content';
import { bookBySlug } from '../data/books';
import { withBase } from './base';

export type ChapterEntry = CollectionEntry<'chapters'>;

/** "Getting Started" becomes "getting-started"; "I/O & Files" becomes "i-o-and-files". */
export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** The two-digit number the file and the address start with. */
export const chapterNumber = (n: number): string => String(n).padStart(2, '0');

/** The last part of the address: "02-getting-started". */
export const chapterSlug = (chapter: ChapterEntry): string =>
  `${chapterNumber(chapter.data.number)}-${slugify(chapter.data.title)}`;

/** The book's slug, taken from the folder the file sits in. */
export const chapterBook = (chapter: ChapterEntry): string => chapter.id.split('/')[0];

export const chapterHref = (chapter: ChapterEntry): string =>
  withBase(`/books/${chapterBook(chapter)}/${chapterSlug(chapter)}/`);

/** "Chapter 2" or, for an appendix, its own label: "Appendix A". */
export const chapterLabel = (chapter: ChapterEntry): string =>
  chapter.data.label ?? `Chapter ${chapter.data.number}`;

/** A book's chapters, in the book's order. */
export const chaptersOf = (all: ChapterEntry[], bookSlug: string): ChapterEntry[] =>
  all
    .filter((chapter) => chapterBook(chapter) === bookSlug)
    .sort((a, b) => a.data.number - b.data.number);

/** The chapters grouped by the book's parts, in order. Chapters with no
 *  part go in a group with an empty name. */
export function chaptersByPart(chapters: ChapterEntry[]): { part: string; chapters: ChapterEntry[] }[] {
  const groups: { part: string; chapters: ChapterEntry[] }[] = [];
  for (const chapter of chapters) {
    const part = chapter.data.part ?? '';
    const last = groups[groups.length - 1];
    if (last && last.part === part) last.chapters.push(chapter);
    else groups.push({ part, chapters: [chapter] });
  }
  return groups;
}

/** Throw if a chapter file disagrees with its folder, its name or another
 *  chapter. The build stops, so a broken address never ships. */
export function checkChapters(all: ChapterEntry[]): void {
  const seen = new Map<string, string>();
  for (const chapter of all) {
    const file = `src/content/chapters/${chapter.id}.mdx`;
    const parts = chapter.id.split('/');
    if (parts.length !== 2) {
      throw new Error(`${file}: chapters live at src/content/chapters/<book slug>/<nn>.mdx.`);
    }
    const [folder, name] = parts;
    if (!bookBySlug(folder)) throw new Error(`${file}: the folder "${folder}" is not a book slug in src/data/books.ts.`);
    if (chapter.data.book !== folder) {
      throw new Error(`${file}: frontmatter book "${chapter.data.book}" does not match the folder "${folder}".`);
    }
    if (name !== chapterNumber(chapter.data.number)) {
      throw new Error(`${file}: the file name must be the chapter number, "${chapterNumber(chapter.data.number)}".`);
    }
    if (!slugify(chapter.data.title)) throw new Error(`${file}: the title makes an empty address.`);
    const key = `${folder}/${chapter.data.number}`;
    if (seen.has(key)) throw new Error(`${file}: chapter ${chapter.data.number} is already ${seen.get(key)}.`);
    seen.set(key, file);
  }
}

/** Every book that has a page: a written overview, chapter pages, or both. */
export function bookPageSlugs(bookPages: { id: string }[], all: ChapterEntry[]): Set<string> {
  return new Set([...bookPages.map((page) => page.id), ...all.map(chapterBook)]);
}
