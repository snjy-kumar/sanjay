# Writing an undated note

The site has two kinds of note.

- **Dated notes** belong to the daily series: TypeScript, React,
  JavaScript and Redux. Each one has a day. It waits as a draft pull
  request until `scripts/publish-due-notes.mjs` merges it on that day, so
  a note whose day has not come is not in the collection and is invisible.
  Nothing in this guide changes that.
- **Undated notes** belong to the eight dedicated series: UI and design
  systems, Backend and data, Craft and architecture, Tools and delivery,
  Packages and supply chain, AI engineering, Agents and automation, and
  Use cases and products. They have **no date**. A note is live as soon
  as its file is merged, and it appears in its own series, never in the
  dated timeline.

This guide is the standard for an undated note. It follows the notes'
own shell (the Reference layout, the series rail, the overview on the
right) at the depth and with the reader-friendly structure of
[CHAPTER_PAGE_GUIDE.md](CHAPTER_PAGE_GUIDE.md). The finished example is
[`src/content/blog/ui/01.mdx`](../src/content/blog/ui/01.mdx).

## 1. Where things live

| What | File | Address |
|------|------|---------|
| The note | `src/content/blog/<series>/<nn>.mdx` | `/posts/<series>/<nn>/` |
| Its row, title and plan phase | `planned` in [`src/data/series.ts`](../src/data/series.ts) | |
| The series page | `src/pages/posts/[series]/index.astro` | `/posts/<series>/` |
| The share card | `src/pages/og/[series]/[slug].png.ts` | `/og/<series>/<nn>.png` |

- `<series>` is the series id in `series.ts` (`ui`, `backend`, `craft`,
  `tools`, `packages`, `ai`, `agents`, `use-cases`). Those series have
  `undated: true`.
- `<nn>` is the note's position in that series' `planned` list, two
  digits, starting at `01`. It must equal `seriesOrder`.
- The title must be **exactly** the row's title in `planned`. The build
  stops if the file name, `seriesOrder`, title or date disagree with
  `series.ts`. To rename a note, change the row and the note together,
  before it is published.

## 2. Frontmatter

```yaml
---
title: "Semantic HTML, landmarks and one h1"   # the planned row, exactly
series: "ui"
seriesOrder: 1                                  # the row's position, = file name
undated: true                                   # and no `date:` at all
readTime: "about 35 min"                        # words / 220, rounded
description: "<One sentence, 120–160 characters, specific to this note.>"
tags: ['accessibility', 'design-systems']       # slugs from src/data/tags.ts
related: ['react/05']                           # optional; ids that exist
---
```

`date` and `undated: true` are mutually exclusive: the schema
(`src/content.config.ts`) rejects a note with both, and a note with
neither. Never give an undated note a date "to sort it": the order is
the series order.

## 3. How undated notes behave

| Where | What an undated note does |
|-------|---------------------------|
| Its page | Meta line "Note 03 · about 35 min · Undated". No `datePublished` in the structured data. The overview on the right lists the note's own `##` sections. The previous and next links walk the series in `seriesOrder`. |
| The series page | Every row of `planned`, in order. Written rows link to the note with its read time and description; the rest say "not written yet". |
| Home, path, plan pages | The "Dedicated series" lists, through `PlannedNotes.astro`, with the same linked / not written yet rows. The path also has an "Undated, by series" list under "Everything, in order". |
| Timeline, month groups, streak, days | Left out: they are about the daily series. The note still counts in the number of notes and series. |
| Topic pages | Listed with "Note 03" where a dated note shows its day, after the dated notes. |
| RSS | In the feed, after the dated items, with title, link, description and categories, **no pubDate and no full text**. A reader dates the item by when it first sees it, which is when the note was merged. |
| Sitemap, share card | Like any note. The card says "Note 03" where a dated card shows the day. |

## 4. Section order of the body

Never write a `#` heading: the layout adds the one `h1`. Use these `##`
headings, in this order and with these names:

```text
<lead paragraph: two or three plain sentences, no heading>
## Before you start            what you'll be able to do (3–6 items),
                               what you should know first, reading time
## Note map                    one diagram of the note's parts
## <Part 1>                    one ## per part of the topic (usually 3–6)
   ### In one sentence
   ### The idea                first principles, short paragraphs
   ### Worked example          simple first, then realistic
   ### Step by step            a trace, derivation or walk-through
   ### Common mistake          the wrong way, why it fails, the fix
   ### In real systems         where it shows up in production
   ### Check yourself          1–3 questions, answers in <details>
## <Part 2> ...
## From beginner to strategy   the nine-level block
## Questions people ask
## Key takeaways               5–10 one-sentence bullets
## Glossary                    every term the note introduced
## Practice                    warm-up, build, stretch
```

### The nine levels

One `<Levels>` block under `## From beginner to strategy`, every
`<Level>` with `depth={3}`. The order is fixed (`src/data/levels.ts`):
Beginner, Intermediate, Advanced, Edge cases, Corner cases, Production
level, Mindset, System design, Strategy. Each level is several paragraphs
with its own concrete example and a mistake with its fix. Edge cases are
single specific boundaries; corner cases are two at once. Strategy ends
with a checkable "Done when ...".

## 5. Depth

| | Floor (`npm run check` fails below it) | Target |
|---|---|---|
| Words in the note body | 5,000 | 6,000–9,000 |
| Diagrams (`Flow`, `Layers`, `Compare`, `Timeline`, `Figure`, `Trace`) | 5 | 7+ |
| Nine-level block | 1, complete and in order | |
| Worked code (a fenced block) | at least 1 | one per part |
| `Check yourself` | at least 1 | one per part |
| `## Key takeaways`, `## Glossary` | required | |

**Worked code that you run.** Every code block that claims an output must
have been run, and the output on the page is the real one. Keep scratch
files out of the repo (`/workspace/scratch/...`). Prefer TypeScript or
JavaScript; HTML and CSS are fine for UI notes. Blocks under about 25
lines; split longer code and explain each piece.

## 6. Components and imports

The note is MDX. Import what you use from `src/components/book/`:

```mdx
import Compare from '../../../components/book/Compare.astro';
import Figure from '../../../components/book/Figure.astro';
import Flow from '../../../components/book/Flow.astro';
import Layers from '../../../components/book/Layers.astro';
import Level from '../../../components/book/Level.astro';
import Levels from '../../../components/book/Levels.astro';
import Timeline from '../../../components/book/Timeline.astro';
import Trace from '../../../components/book/Trace.astro';
```

Props are in CHAPTER_PAGE_GUIDE.md section 6. Monochrome only, every
diagram captioned, `Figure` art under about 76 columns. MDX gotchas:
outside backticks and code fences, `<`, `>`, `{` and `}` are JSX; leave a
blank line after `<Level ...>` and before `</Level>`, and around the
content of a `<details>`.

## 7. Style, voice and honesty

- The site's note voice: Sanjay, a graduated engineer and a curious
  builder, first person where it is his practice. Start from the mistake
  or the failure where there is one. Never "student". No studio, agency
  or company work. No LinkedIn or X links.
- Paragraphs of four sentences or fewer; define every term the first time
  it appears; one idea per paragraph; tables for comparisons.
- No invented statistics, quotes, benchmark numbers or claims about what
  someone said. Standards (HTML, WCAG, HTTP RFCs) are described in my own
  words and may be linked.

## 8. Before committing

```sh
export PATH=$HOME/node22/bin:$PATH
npm run build
npm run check
```

`npm run check` fails an undated note with: no nine-level block or a
broken one, fewer than 5 diagrams, fewer than 5,000 words, no code block,
no "Check yourself", no "Key takeaways", no "Glossary", an in-page link
that lands on no heading, a duplicate title, a missing share card,
canonical or sitemap entry, or an unknown topic or related note. The
build itself stops on a note whose date, file name, number or title
disagrees with `series.ts`.

## 9. Commits

One note per commit (`Add the UI and design systems note 03, Component
APIs: props, variants and composition`), authored as Sanjay Kumar
<sanjay17126@gmail.com>. No squash, no push; work on your own branch.
