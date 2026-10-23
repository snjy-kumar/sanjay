# Writing a chapter page

Every chapter of every book the plans cite gets **its own page**, written
like a chapter of a real textbook: deep, broad and fully explained. A book is
no longer one long page with a few hundred words per chapter. This guide is
the standard for one chapter page. The finished example is
[`src/content/chapters/introduction-to-algorithms/02.mdx`](../src/content/chapters/introduction-to-algorithms/02.mdx)
(Introduction to Algorithms, chapter 2, "Getting Started"): copy its shape
and its depth.

Sanjay's words: *"Each chapter should have its own page... just like a
regular book with the extensive knowledge, broad knowledge, and full detailed
explanation... I want deep, explained contents."* If a reader could learn the
chapter's ideas from the page alone, well enough to do the exercises, the
page is deep enough. If they would need the book to make sense of it, it is
not.

## 1. Where things live

| What | File | Address |
|------|------|---------|
| The book's overview, learning strategy and contents | `src/content/books/<book>.mdx` | `/books/<book>/` |
| One chapter | `src/content/chapters/<book>/<nn>.mdx` | `/books/<book>/<nn>-<chapter-slug>/` |
| The chapter route | `src/pages/books/[book]/[chapter].astro` | |
| The chapter shell | `src/layouts/ChapterLayout.astro` | |
| The chapter's share card | `src/pages/og/books/[book]/[chapter].png.ts` | `/og/books/<book>/<nn>.png` |

- `<book>` is the slug in [`src/data/books.ts`](../src/data/books.ts). A
  folder that is not a book slug stops the build.
- `<nn>` is the chapter number, two digits: `02.mdx`, `11.mdx`. It must
  match `number` in the frontmatter. Chapter 0 (a prologue) is `00.mdx`.
- The address is made from the number and the title:
  "Getting Started" becomes `02-getting-started`. Never change a title
  after the page is published; that changes the address.
- Appendices continue the numbering after the last chapter (CLRS has 35
  chapters, so appendix A is `36.mdx`) and set `label: "Appendix A"`.

### The book page, once chapters exist

The book's `.mdx` becomes the **overview, strategy and contents page only**:

1. `## Why this book`
2. `## How I would learn it` (first person, with its `<Timeline>`)
3. `## How the book is laid out` (one `<Layers>` of the book's parts)
4. `## What I learn from it` (the full checklist, chapter by chapter, one
   line each)
5. `## Misreadings to avoid`
6. `## Done with this book when`

No chapter bodies and no `<Levels>` on the book page: the route adds the
**Chapters** list under the MDX, every chapter page linked, grouped by
`part`. Move any chapter text that is on the book page today into its
chapter file, then expand it to this guide's depth; do not leave it in both
places. A book with chapter pages and no `.mdx` yet still gets a book page
(the chapter list alone), so a chapter is never orphaned.

Books with no chapter files keep rendering the old way, from the book
`.mdx` alone, until their chapters are written.

## 2. Frontmatter

```yaml
---
book: introduction-to-algorithms        # the slug; must match the folder
number: 2                               # must match the file name
title: "Getting Started"                # the book's own chapter title
description: "<One sentence, 120–160 characters, specific to this chapter.>"
part: "Part I, Foundations"             # optional; groups the contents list
# label: "Appendix A"                   # optional; replaces "Chapter <n>"
date: "2026-10-23"
---
```

- **title** is the chapter title exactly as the book has it, checked
  against the same contents source as the book page (`tocSources`). If you
  cannot verify the exact title, use a plain descriptive title ("Sorting in
  linear time") rather than inventing one that sounds official, and say so
  in the opening section.
- **description** is unique on the site. Say what the chapter teaches, not
  "Chapter 2 of ...". The page's `<title>` becomes
  `<chapter title> · <book title>, chapter <n>`, which is unique by
  construction.
- The schema is the `chapters` collection in
  [`src/content.config.ts`](../src/content.config.ts).

## 3. What the route adds, so the body never repeats it

The crumb (Books / the book / the chapter), the one `<h1>` (the title), the
part, the authors, the reading time and word count, the description as the
lead, the rail of the book's chapters, the sticky **Overview** of every `##`
section, the previous and next chapter on the bottom bar (and
`rel="prev"`/`rel="next"`), the canonical URL, the share card, structured
data and the sitemap entry. Never write a `#` heading.

## 4. Section order of the body

```text
## What this chapter is about        orientation, prerequisites, a map
## <n.1 The book's first section>    one ## per section of the chapter,
## <n.2 The book's next section>     numbered and named as the book does
   ### <concept>                     one ### per concept in that section
## The chapter through the nine levels
## Mistakes and misreadings
## Exercises and self-check          (required; the build checks it)
## How I'd study this chapter        (required; the build checks it)
```

The `##` headings are the sticky overview on the right, so keep them to the
chapter's real sections: usually six to twelve.

### What this chapter is about

Three to six paragraphs. The problem the chapter exists to solve, in plain
words, before any notation. What I can do after it that I could not before.
What it assumes (link the earlier chapter page or the plan phase). One
diagram that maps the chapter: a `<Flow>` or `<Layers>` of its sections and
how they lead into each other.

### One `##` per section of the chapter

This is the textbook. For **every** section and **every** concept in it:

1. **Start from first principles.** Why does the problem exist? What would
   a smart person try first, and why does that fall short? Then the idea.
   Define every term the first time it appears, in plain words, before its
   symbol.
2. **Explain the idea in prose, fully.** Several paragraphs, not a bullet
   list. Say what it is, why it works, and when it does not.
3. **Work an example by hand, step by step.** Real numbers or real inputs.
   Use a `<Trace>` table for anything that runs in steps (a loop, a
   recursion, a protocol, a query plan): one row per step, one column per
   thing that changes.
4. **Show small, runnable code** where the topic allows it: TypeScript or
   JavaScript first (it is what I write every day), otherwise the book's
   language. Show the output or the error the reader would actually see.
5. **Draw it.** A diagram wherever a picture explains more than a sentence.
6. **Name the trap.** The common mistake with this concept, what it looks
   like, and the fix.
7. **Prove or justify it** where the book does: loop invariants,
   recurrences, correctness arguments, trade-offs. Re-derive in my own
   words; never copy the book's proof text.

Do not skip a section because it is "easy" or "just notation". If the book
spends a section on it, the page explains it.

### The chapter through the nine levels

One `<Levels>` block for the whole chapter, under its own `##`, with
`depth={3}` on every `<Level>` so the headings run h2, h3. (A long chapter
may instead give each major section its own block, each under a `###`
heading, with the default `depth`.) The levels and their order are fixed,
in [`src/data/levels.ts`](../src/data/levels.ts):

| # | Level | What it must contain on a chapter page |
|---|-------|----------------------------------------|
| 1 | Beginner | The smallest working version of the chapter's main idea, explained to someone who has never seen it. A worked example. |
| 2 | Intermediate | How the chapter's pieces combine in a real program. Code, with its output. |
| 3 | Advanced | What happens underneath and the exact rules: the proof, the cost model, the precise definition. |
| 4 | Edge cases | Specific single boundaries: empty input, one element, the maximum, null, zero, duplicates. Each with what happens and why. |
| 5 | Corner cases | Two boundaries at once, or a boundary plus a side effect. Specific inputs, not "be careful". |
| 6 | Production level | What breaks when this runs for real, for other people: scale, latency, memory, libraries, observability. |
| 7 | Mindset | The habit of thought the chapter teaches, and how it shows up outside the chapter. |
| 8 | System design | Where this decision sits in a larger system, with a concrete system as the example. |
| 9 | Strategy | How I learn it and how I know I have. Ends with a checkable "Done when ...". |

Every level is real teaching: **several paragraphs**, at least one concrete
example (code where the topic allows), and a common mistake with its fix.
No level is a one-liner. `npm run check` fails a block that skips, repeats
or reorders a level.

### Mistakes and misreadings

The wrong lessons people take from this chapter, each with why it is wrong
and what the right reading is. A `<Compare>` (wrong reading / right reading)
works well here.

### Exercises and self-check

My own exercises, never the book's (do not copy or closely paraphrase the
book's exercise text; point to "the exercises at the end of section 2.1"
instead if useful). Three tiers:

- **Warm-up**: can I do it by hand?
- **Build**: write and test code.
- **Stretch**: change the problem and reason about the consequence.

Then a self-check: five to ten questions, each with its answer in a
`<details>` element so the reader can test themselves first. The answers
are in the static HTML, so search engines and screen readers get them too.

### How I'd study this chapter

First person, my voice, concrete: how long, in what order, with what open,
what I build, what I test, what I write down, and a "Done when ..." line I
can check. Link the plan phase that cites the book.

## 5. Depth: the floor and the target

| | Floor (the build fails below it) | Target |
|---|---|---|
| Words in the chapter body | 8,000 | 10,000–15,000+, more for big chapters |
| Diagrams (`Flow`, `Layers`, `Compare`, `Timeline`, `Figure`, `Trace`) | 6 | 10 or more |
| Nine-level blocks | 1, complete | 1 per chapter, or 1 per major section |
| Sections | every section the book's chapter has | |

The word floor is a floor, not a goal. An 8,000-word page that skips a
section of the chapter is not done. A big chapter (a long proof-heavy
algorithms chapter, a chapter that introduces a whole subsystem) should run
well past 15,000 words.

Deeper means more teaching, not padding. Every subsection of the book's
chapter gets its own `###` with: the idea from first principles, why it
matters, at least two worked examples (one simple, one realistic), a
step-by-step trace or derivation where the book has one (proofs walked line
by line in plain words), the common mistake and its fix, and how it shows up
in real production systems. Add a short FAQ of the questions a reader would
actually ask. Each of the nine levels runs several paragraphs with its own
example, never a one-liner.

The check counts the words between the lead and the closing note, code
included, and the diagram components (`<figure class="dia ...">`).

## 6. Diagrams

No images. Every picture is HTML and CSS in the site's ink, muted and line
colours, from `src/components/book/`:

| Component | Use it for | Props |
|-----------|-----------|-------|
| `Flow` | a pipeline, a sequence of states, a decision path | `steps: string[]`, `caption` |
| `Layers` | a stack: abstractions, memory, a call path, the chapter's map | `layers: { name, note? }[]`, `caption` |
| `Compare` | two columns: wrong and right, before and after, A versus B | `left`, `right`, `rows: [string, string][]`, `caption` |
| `Timeline` | an order of events, a study schedule | `items: { when, what }[]`, `caption` |
| `Figure` | box drawing in a `<pre>`: trees, arrays, recursion, state machines | `art` (template string), `caption` |
| `Trace` | a step-by-step run: one row per step | `columns: string[]`, `rows: string[][]`, `caption` |

```mdx
<Trace
  columns={["j", "key", "array after the step"]}
  rows={[
    ["2", "2", "2 5 4 6 1 3"],
    ["3", "4", "2 4 5 6 1 3"],
  ]}
  caption="Insertion sort on 5 2 4 6 1 3: each row is one pass of the outer loop."
/>
```

Every diagram has a caption that says what to look at. Keep `Figure` art
under about 76 columns: the chapter column is narrower than the book page.
For trees, recursion and state machines, `Figure` is the tool: draw the
nodes with `+--+`, `|`, `/` and `\`.

MDX gotchas: outside backticks and code fences, `<`, `>`, `{` and `}` are
JSX. Put code in backticks, and spell comparisons out in prose ("less than",
not `<`) or put them in backticks. Leave a blank line after `<Level ...>`
and before `</Level>`, and the same around `<details>` content.

## 7. Copyright and honesty

- **Paraphrase only.** Every explanation, example, trace, exercise and
  diagram is my own. No passages from the book, no copied exercises, no
  reproduced figures or pseudocode listings. Write my own code, in my own
  language, with my own names.
- A quotation, if one is really needed, is a short phrase, attributed, and
  rare. Never invent one.
- No page numbers. No invented statistics, benchmark numbers or claims
  about what the authors think. Describe the concept; attribute an opinion
  or example to the authors only if their contents page or their own site
  shows it.
- Section titles follow the book's contents as checked on the book page's
  `tocSources`. If a section title cannot be checked, use a descriptive
  heading instead of guessing.

## 8. Voice

Sanjay, a graduated engineer and a curious builder, writing what he would
want to read. Plain words, short sentences where they help, first person in
"How I'd study this chapter". Never "student". No mention of any studio,
agency or company work. No LinkedIn or X links.

## 9. Before committing

```sh
export PATH=$HOME/node22/bin:$PATH   # Node 22.12 or later
npm run build
npm run check
```

`npm run check` fails a chapter page with: a broken or missing nine-level
block, fewer than 6 diagrams, fewer than 8,000 words, no "Exercises and
self-check" section, no "How I'd study this chapter" section, an in-page
link that lands on no heading, a duplicate title, no canonical, more than
one h1, or a missing sitemap entry or share card. Then open
`dist/books/<book>/<nn>-<slug>/index.html` and look at it in
`npx astro preview` at desktop and phone widths.

## 10. Commits

- **One chapter per commit**: `Add Introduction to Algorithms chapter 2,
  Getting Started, on its own page`, or similar, in plain words.
- Turning a book `.mdx` into the overview page is its own commit, before the
  chapters.
- Author: `Sanjay Kumar <sanjay17126@gmail.com>`. No squash, no rewriting
  history, no push, no pull request. Work on your own branch; the branches
  are combined later.
- Every chapter of every book. None skipped, none summarised as "see the
  book".
