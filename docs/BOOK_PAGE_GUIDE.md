# Writing a book page

> **Books are now one page per chapter.** Each chapter is its own file,
> `src/content/chapters/<book>/<nn>.mdx`, written to textbook depth by
> [`CHAPTER_PAGE_GUIDE.md`](CHAPTER_PAGE_GUIDE.md). Once a book has chapter
> files, its `src/content/books/<slug>.mdx` is the overview, learning
> strategy and contents page only (section 1 of that guide): no `###`
> chapter bodies and no `<Levels>` on it. The rest of this guide still holds
> for the book page's frontmatter, the table-of-contents check, diagrams,
> copyright and commits; section 3, step 4 and section 4's chapter levels
> apply only to books that have no chapter files yet.

One page per book the plans cite, at `/books/<slug>/`. This guide is for
whoever writes the next one. The finished example is
[`src/content/books/c-programming-a-modern-approach.mdx`](../src/content/books/c-programming-a-modern-approach.mdx):
copy its shape.

Work roadmap by roadmap, in this order: the traditional core, then the
modern software developer, then the software AI developer. A book the
fundamentals or the books plan cite is written inside the roadmap that cites
it (the list on `/books/` shows which).

## 1. Find the book in the data

Every book is already listed in [`src/data/books.ts`](../src/data/books.ts)
with its slug, title, author, shelf and the plans and phases that cite it.

- Use the slug that is there. The page's file name **is** the slug:
  `src/content/books/<slug>.mdx`. A file whose name is not in `books.ts`
  stops the build.
- Do not add a book that no plan cites. If a plan does cite a book that is
  missing, add it to `books.ts` in its own commit first.
- "Where it sits", the plan links, the share card, the books index and the
  "Books this plan cites" list on each plan page all come from `books.ts`.
  The page body never repeats them by hand.

## 2. Frontmatter

```yaml
---
title: "<Book title>, chapter by chapter"   # unique on the site; becomes <title> and the h1
description: "<One sentence, 120–160 characters, specific to this book.>"
edition: "second edition (W. W. Norton, 2008)"   # the edition the chapters follow
tocVerified: true            # false if no official contents page could be found
tocSources:                  # publisher, author or library catalogue pages you checked
  - "https://..."
notes: []                    # published note ids that go with it, e.g. "typescript/07"
date: "2026-10-23"
---
```

The schema is in [`src/content.config.ts`](../src/content.config.ts) (the
`books` collection). The page title must not be reused anywhere: `npm run
check` fails on a duplicate title.

## 3. Section order

The route ([`src/pages/books/[slug].astro`](../src/pages/books/%5Bslug%5D.astro))
adds the crumb, the one `<h1>`, the lead, "Where it sits", the contents
list (built from your `##` and `###` headings) and the footer links. The
MDX body, in order:

1. `## Why this book` — where it sits in the roadmap, in a sentence or two,
   and why I am reading it. Link the citing plans with
   `<a href={withBase('/plans/<id>/')}>`.
2. `## How I would learn it` — first person, my voice: how I would read it,
   with what open, in what order, and how I know I am done. One `<Timeline>`
   that maps chapters to the plan's weeks or phases.
3. `## <The book's parts>` — one `<Layers>` showing the book's own parts.
4. One `##` per part of the book, and one `###` per chapter under it,
   numbered as the book numbers them: `### 11. Pointers`. Each chapter is:
   - `**Covers:**` one line, in my own words, of what the chapter covers.
   - At most one diagram, where a picture explains more than a sentence.
   - One `<Levels>` block with the nine levels (section 4).
5. Appendices or reference parts, if the book has them: a short paragraph,
   no levels.
6. `## Misreadings to avoid` — the wrong lessons people take from it.
7. `## Done with this book when` — a checklist tied to the plan's gate.

Headings: `##` for sections, `###` for chapters. The levels render `<h4>`
themselves. Never write a `#` heading; the page has exactly one `<h1>`.

## 4. The level progression

Every chapter, and every plan phase's learning strategy, climbs the same
nine levels, in this order:

| # | Level | The question it answers |
|---|-------|--------------------------|
| 1 | Beginner | What is it, and what is the smallest thing that works? |
| 2 | Intermediate | How do the pieces combine in a real program? |
| 3 | Advanced | What does it do underneath, and what are its exact rules? |
| 4 | Edge cases | Where does it behave differently at the boundaries? |
| 5 | Corner cases | What happens when two boundaries meet? |
| 6 | Production level | What breaks when it runs for real, for other people? |
| 7 | Mindset | What habit of thought does this teach? |
| 8 | System design | Where does this decision sit in a larger system? |
| 9 | Strategy | How do I learn it, and how do I know I have? |

The names and order live in [`src/data/levels.ts`](../src/data/levels.ts).

```mdx
<Levels label="Chapter 11, Pointers">
<Level name="Beginner">

A pointer holds an address. `int *p = &x;` makes `p` point at `x`.

</Level>
<Level name="Intermediate">

...

</Level>
... all nine ...
</Levels>
```

- Leave a blank line after `<Level ...>` and before `</Level>`, or the
  markdown inside is not parsed.
- All nine, every time, in order. `npm run check` reads the built page and
  fails on a block that skips, repeats or reorders a level. An unknown
  level name stops the build.
- Edge cases are one boundary (zero, empty, the maximum, a null). Corner
  cases are two boundaries at once, or a boundary plus a side effect.
- Strategy ends with a "Done when ..." sentence: something checkable.
- Use real code (fenced, with a language) where it explains the level; the
  build makes it monochrome. TypeScript or JavaScript contrasts are welcome
  where they help me, since that is the language I write every day.

### Plan phases

A plan's phase-by-phase strategy goes under the plan's own text, never into
it. Do not edit `src/content/plans/*.md`. Write one file per phase:

```
src/content/phases/<plan id>/<nn>.mdx      e.g. phases/traditional-software-developer/01.mdx
```

```mdx
---
plan: traditional-software-developer
phase: 1
# title: optional; defaults to the phase focus in src/data/plans.ts
---

import Levels from '../../../components/book/Levels.astro';
import Level from '../../../components/book/Level.astro';

<Levels label="Phase 1, programming from first principles">
<Level name="Beginner">

...

</Level>
... all nine ...
</Levels>
```

The plan page renders them in phase order under "Learning strategy, phase
by phase". A phase number the plan does not have stops the build.

## 5. Diagrams

No images. Every picture is HTML and CSS, in the site's ink, muted and line
colours only. Import what you use from `src/components/book/`:

| Component | Use it for | Props |
|-----------|-----------|-------|
| `Flow` | a pipeline or a sequence of states | `steps: string[]`, `caption` |
| `Layers` | a stack: abstractions, memory, a call path | `layers: { name, note? }[]`, `caption` |
| `Compare` | two columns: wrong and right, before and after | `left`, `right`, `rows: [string, string][]`, `caption` |
| `Timeline` | a reading schedule, an order of events | `items: { when, what }[]`, `caption` |
| `Figure` | a box-drawing diagram in a `<pre>` | `art` (a template string), `caption` |

```mdx
<Figure art={`
  +-----+      +---------+
  |  5  | <----| &x      |
  +-----+      +---------+
`} caption="A pointer holds the address of another box." />
```

Every diagram needs a caption that says what to see in it. Keep `Figure`
art under about 80 columns so it does not scroll on a laptop.

MDX gotchas: outside backticks and code fences, `<`, `>`, `{` and `}` are
JSX. Put code in backticks, and spell comparisons out in prose.

## 6. Copyright

- **Paraphrase, always.** Everything is my explanation and my examples.
  No passages from the book, no copied exercises, no reproduced figures.
- A quotation, if one is really needed, is a short phrase, attributed, and
  rare. Never invent a quote.
- No page numbers. The contents pages list them; the book page does not.
- No claims about what the book says that you have not checked. Describe the
  concept; do not attribute a specific opinion or example to the author
  unless the contents page or the author's own site shows it.
- The page says, in its "Where it sits" note, that it is a paraphrase.

## 7. Checking the table of contents

Before writing a chapter, check the chapter list against an official
source, in this order: the author's site, the publisher's page, a library
catalogue (the Library of Congress `catdir.loc.gov` contents records are
good), then a university reading list. Put the pages you used in
`tocSources`.

If no official contents can be found, set `tocVerified: false`, list what
you looked at in `tocSources`, and organise the page by the book's known
parts instead of guessing chapter titles. The page then says so on its own.

## 8. Before committing

```sh
export PATH=$HOME/node22/bin:$PATH   # Node 22.12 or later
npm run build
npm run check
```

Then open `dist/books/<slug>/index.html` and check:

- one `<h1>`, the title and description you wrote, a canonical URL;
- the share card exists at `dist/og/books/<slug>.png`;
- the page is in `dist/sitemap-0.xml`;
- `/books/` now links the book instead of saying "page not written yet",
  and so does each citing plan page;
- every contents link lands on a heading (the check does this too).

Look at it in `npx astro preview` at desktop and phone widths.

## 9. Commits and branches

- One book per commit: `Add <Book title>, chapter by chapter` or similar,
  in plain words. A data fix in `books.ts` is its own commit, before it.
- Author: `Sanjay Kumar <sanjay17126@gmail.com>`.
- Work on your own branch, cut from `learning-path-plans`. Do not merge
  into `main` and do not open a pull request; the branches are combined
  later.
- Never touch `src/content/blog`, `src/content/log`, `promo/` or a plan's
  markdown text. Never write a note that is not yet published.
- No LinkedIn or X links on these pages.
