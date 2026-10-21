# sanjay — Astro blog

A learning log, built with [Astro](https://docs.astro.build). Every note is
published as it is written, the notes are grouped by series and by topic, and
the whole path is readable as one page at `/path/`. This repository is the
site — the legacy hand-written HTML/CSS/JS version has been fully migrated
and removed (it remains available in git history).

## Commands

All commands run from the repository root:

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start the dev server (`localhost:4321`)    |
| `npm run build`   | Build the production site into `./dist/`   |
| `npm run check`   | Check the built site (links, metadata, feed) |
| `npm run promo`   | Write the ready-to-paste post for each note |
| `npm run preview` | Preview the production build locally     |

For background development server management (used by agents), see
[AGENTS.md](./AGENTS.md).

The dev server serves the site under its base path, so it is at
`http://localhost:4321/sanjay/`.

## Project structure

```text
/
├── public/
│   ├── fonts/               # Self-hosted IBM Plex (SIL OFL license included)
│   └── favicon.svg / ico
├── promo/                   # One ready-to-paste social post per note
├── src/
│   ├── components/
│   │   ├── CodeBlock.astro  # Labeled code block helper
│   │   └── WhenTable.astro  # "When to use which" table helper
│   ├── content/
│   │   ├── blog/<series>/   # Posts: 01.md, 02.md, ... per series
│   │   ├── log/             # The raw, unedited session log
│   │   └── plans/           # The curriculum behind a series
│   ├── data/
│   │   ├── series.ts        # Single source of truth for series journeys
│   │   ├── tags.ts          # The closed topic vocabulary
│   │   ├── roadmap.ts       # What is planned next, but not written
│   │   ├── seriesMarks.ts   # The mark drawn next to each series name
│   │   └── site.ts          # Name, role, email, profiles, list, analytics
│   ├── layouts/
│   │   ├── BaseLayout.astro  # <html>/<head>, global.css, optional bodyClass
│   │   ├── PostLayout.astro  # Note shell: rail, overview TOC, pager
│   │   └── SiteLayout.astro  # Site shell: header, footer, clock
│   ├── pages/
│   │   ├── index.astro       # Homepage (work + the learning log)
│   │   ├── path.astro        # The whole learning path, in one page
│   │   ├── log.astro         # The raw session log
│   │   ├── topics/           # The topic index and one page per topic
│   │   ├── plans/[slug]      # A published curriculum
│   │   ├── posts/[series]/   # The series page and one page per note
│   │   ├── rss.xml.ts        # Feed: every note, newest first, full text
│   │   └── og/               # Share cards, one PNG per page
│   ├── fonts/                # IBM Plex TTFs, used only to draw the cards
│   ├── styles/
│   │   └── global.css        # Every page's styles (post rules scoped
│   │                         #   under body.post-page)
│   ├── utils/
│   │   ├── base.ts           # withBase() — every internal link goes through it
│   │   ├── notes.ts          # One place that knows how to read the collection
│   │   └── og.ts             # Share card renderer
│   └── content.config.ts     # Collections and their schemas (zod)
├── scripts/
│   ├── publish-due-notes.mjs # The publishing bot, run by the workflow
│   ├── make-promo.mjs        # Writes the social post for each note
│   ├── focus-code-blocks.mjs # Makes scrollable code blocks keyboard reachable
│   ├── legacy-redirects.mjs  # Forwards the addresses the old site used
│   └── check-build.mjs       # Checks the built site before it is published
├── astro.config.mjs          # site URL, Tailwind vite plugin, sitemap, MDX
├── AGENT_POST_GUIDELINES.md  # Post format/template — read before writing posts
└── promo/                    # One file per note: the post to paste
```

## The pages

| Page | Route | What it is |
| :--- | :--- | :--- |
| Homepage | `/` | The work, and the learning log with every series' timeline |
| Note | `/posts/<series>/<number>/` | One note, with its topics and the notes it relates to |
| Series | `/posts/<series>/` | Every note in a series, in order, with the topics it covers |
| Topic | `/topics/<slug>/` | Every note that mentions a subject, grouped by series |
| Topics | `/topics/` | The whole vocabulary, with how many notes carry each one |
| Learning path | `/path/` | Every note ever, in order, with the counters and what is next |
| Log | `/log/` | The raw, unedited session log behind the notes |
| Plan | `/plans/<slug>/` | The curriculum a series was written from |

Every one of them is built from the content collection at build time. Adding
a note file adds it to all of them — nothing is hand-maintained.

## Deployment (GitHub Actions → GitHub Pages)

On every push to `main`, [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. checks out the repo, installs deps (`npm ci`, Node 22), runs `npm run build`;
2. uploads `dist/` — a **plain static HTML/CSS/JS site**, exactly what a static
   host serves (no server-side runtime);
3. runs `npm run check`, which fails the deploy if an internal link goes
   nowhere, a page is missing a title, a description, a canonical link or its
   single `h1`, two pages share a title, a note is not linked from its series
   page, a topic is not in the vocabulary, the feed is empty, or a share card
   is missing;
4. publishes it to GitHub Pages via `actions/deploy-pages`.

The same check runs before the bot merges a note, so a broken note never
reaches `main`.

The build also writes a forwarding page for each address the old
hand-written site used (`/posts/typescript/01.html` and so on), so links
shared from before the rewrite still land on the note. GitHub Pages cannot
send a 301, so those pages forward with a meta refresh.

The site also publishes an **RSS feed** at `/rss.xml` (one item per note,
newest first, with the whole note in it, the series and the topics as
categories) and a **share card** per page at `/og/…`, generated at build time
with the site's own typeface. The feed is linked from the head of every page
and from the footer.

The site lives at **`https://snjy-kumar.github.io/sanjay/`** — a project page,
so `base: '/sanjay'` is set in `astro.config.mjs` and all internal links go
through `withBase()` (`src/utils/base.ts`). Never hardcode root-absolute paths.

Pages source must be set to **GitHub Actions** (Settings → Pages → Source).
Check runs under the `github-pages` environment; the run log shows the final
URL. Preview any build locally with `npm run preview`.

## The daily series

The series is published one note a day, and it is automated.

Every note is an **open draft pull request** on a `note/<series>-<number>`
branch, titled:

```text
Note: <series> NN — <title> (YYYY-MM-DD)
```

The date in the title is the day the note is due.
[`.github/workflows/publish-notes.yml`](./.github/workflows/publish-notes.yml)
runs at **11:00 IST** (05:30 UTC), finds the pull requests whose date has
arrived, **builds the branch first** so a broken note never reaches `main`,
then marks them ready and merges them. The deploy workflow is dispatched
afterwards, so the note, the homepage row, the feed and its share card all go
live together.

Nothing has to be done by hand. To see what would be published without
publishing it, run the workflow by hand with `dry_run` and an optional
`date`.

### Adding a note

1. Read [AGENT_POST_GUIDELINES.md](./AGENT_POST_GUIDELINES.md) — it defines the
   frontmatter schema, the canonical 7-section structure, the topic
   vocabulary, and the code block markup every post follows.
2. Add `src/content/blog/<series>/<number>.md`
   (series: `typescript` | `react` | `javascript` | `redux`; routes are
   `/posts/<series>/<number>/`).
3. Add the title and date to the matching series in `src/data/series.ts`.
   That file is the single source of truth for the homepage timeline; a note
   is linked on the site and in the feed as soon as its file exists.
4. `npm run build` and `npm run check` must both pass.
5. Run `npm run promo` to write the social post for the note.
6. Open a **draft** pull request from a `note/<series>-<number>` branch with
   the title format above, and the bot publishes it on its date.

## Topics

`src/data/tags.ts` is a closed vocabulary: about thirty subjects, each with
a one-paragraph definition. A note's `tags` must come from it — the build
check fails a note that uses a slug outside the vocabulary. Every topic a
published note uses gets its own page, so the notes stay discoverable by
subject as well as by series.

## Optional services

Two things are wired but switched off, so the site loads nothing third-party
by default. Set them in `src/data/site.ts`:

| Setting | What it turns on |
| :--- | :--- |
| `buttondown` | The email list form in the footer (a plain form post — no script) |
| `analytics` | A deferred, cookie-free Cloudflare Web Analytics beacon |

## Styling notes

`global.css` carries every page's styles because every page ships one
stylesheet. Post-specific rules are scoped to `body.post-page` (applied by
`PostLayout`), and homepage rules are neutralized on post pages via
`:where(.post-page)` selectors — keep that pattern when adding styles.

## Navigation

`BaseLayout` renders Astro's `<ClientRouter />`, so internal links navigate
client-side (no full page refresh), like a Next.js app router. Scripts must
therefore re-initialize after each navigation — hook them up with the
`astro:page-load` event (see the clock in `SiteLayout` and the TOC scrollspy
in `PostLayout` for the pattern: init once, guard with a `window` flag,
clean up previous listeners).

`astro:page-load` is dispatched on **`document`** and does not bubble, so it
has to be listened for on `document` — a listener on `window` never fires it.
