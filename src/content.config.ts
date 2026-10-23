import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    series: z.string(),
    seriesOrder: z.number(),
    date: z.coerce.date(),
    readTime: z.string(),
    description: z.string(),
    /** Topic slugs from src/data/tags.ts. Every one of them gets a page at
     *  /topics/<slug>/, so the vocabulary is closed on purpose. */
    tags: z.array(z.string()).default([]),
    /** A link to the code the note came from — a file or a commit in one of
     *  my repositories. It is the evidence that the note is not theory. */
    source: z.string().optional(),
    /** Ids of related notes, in the form "<series>/<number>". Cross-series
     *  on purpose: the same mistake often shows up in two languages. */
    related: z.array(z.string()).default([]),
  }),
});

// The raw log. One file per session, short and unedited — the note is the
// polished version of this, and this is the evidence that it happened.
const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    date: z.coerce.date(),
    /** What the session was. */
    session: z.string(),
    /** What I was learning, in one line. */
    focus: z.string().optional(),
  }),
});

// The plans behind a series. A curriculum is not a note, but it is worth
// publishing: it shows the strategy behind the notes, and it is the plan
// the series was written from.
const plans = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plans' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** The series this plan belongs to. */
    series: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

// One page per book the plans cite. The slug is the file name and must be a
// slug in src/data/books.ts; the page draws its shelf and its citing plans
// from there. See docs/BOOK_PAGE_GUIDE.md before writing one.
const books = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/books' }),
  schema: z.object({
    /** The page title: the book's title, then what the page is. */
    title: z.string(),
    /** The meta description, unique to this page. */
    description: z.string(),
    /** The edition the chapter breakdown follows. */
    edition: z.string(),
    /** Whether the chapter list was checked against an official table of
     *  contents. If it was not, the page says so and is organised by the
     *  book's known parts instead of invented chapters. */
    tocVerified: z.boolean(),
    /** Where the chapter list was checked: publisher, author or library
     *  catalogue pages. */
    tocSources: z.array(z.string().url()).min(1),
    /** Ids of published notes that relate, "<series>/<number>". Only the
     *  ones that exist are shown. */
    notes: z.array(z.string()).default([]),
    date: z.coerce.date(),
  }),
});

export const collections = { blog, log, plans, books };
