# sanjay — Astro blog

The tech blog, built with [Astro](https://docs.astro.build). This repository
is the site — the legacy hand-written HTML/CSS/JS version has been fully
migrated and removed (it remains available in git history).

## Commands

All commands run from the repository root:

| Command         | Action                                     |
| :-------------- | :----------------------------------------- |
| `npm install`   | Install dependencies                       |
| `npm run dev`   | Start the dev server (`localhost:4321`)    |
| `npm run build` | Build the production site into `./dist/`   |
| `npm run check` | Check the built site (links, metadata, feed) |
| `npm run preview` | Preview the production build locally     |

For background development server management (used by agents), see
[AGENTS.md](./AGENTS.md).

## Project structure

```text
/
├── public/
│   ├── fonts/               # Self-hosted IBM Plex (SIL OFL license included)
│   └── favicon.svg / ico
├── src/
│   ├── components/
│   │   ├── CodeBlock.astro  # Labeled code block helper
│   │   └── WhenTable.astro  # "When to use which" table helper
│   ├── content/
│   │   └── blog/<series>/   # Posts: 01.md, 02.md, ... per series
│   ├── data/
│   │   ├── series.ts         # Single source of truth for series journeys
│   │   └── site.ts           # Name, role, email, profiles
│   ├── layouts/
│   │   ├── BaseLayout.astro  # <html>/<head>, global.css, optional bodyClass
│   │   └── PostLayout.astro  # Post shell: rail, overview TOC, pager
│   ├── pages/
│   │   ├── index.astro       # Homepage (work + LinkedIn series journey)
│   │   ├── posts/[series]/[slug].astro
│   │   ├── rss.xml.ts        # Feed: every note, newest first, full text
│   │   └── og/               # Share cards, one PNG per note
│   ├── fonts/                # IBM Plex TTFs, used only to draw the cards
│   ├── styles/
│   │   └── global.css        # Homepage + post styles (post rules scoped
│   │                         #   under body.post-page)
│   ├── utils/
│   │   ├── base.ts           # withBase() — every internal link goes through it
│   │   └── og.ts             # Share card renderer
│   └── content.config.ts     # Blog collection schema (zod)
├── scripts/
│   ├── publish-due-notes.mjs # The publishing bot, run by the workflow
│   ├── focus-code-blocks.mjs # Makes scrollable code blocks keyboard reachable
│   └── check-build.mjs       # Checks the built site before it is published
├── astro.config.mjs          # site URL, Tailwind vite plugin, sitemap, MDX
└── AGENT_POST_GUIDELINES.md  # Post format/template — read before writing posts
```

## Deployment (GitHub Actions → GitHub Pages)

On every push to `main`, [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. checks out the repo, installs deps (`npm ci`, Node 22), runs `npm run build`;
2. uploads `dist/` — a **plain static HTML/CSS/JS site**, exactly what a static
   host serves (no server-side runtime);
3. runs `npm run check`, which fails the deploy if an internal link goes
   nowhere, a page is missing a title, a description, a canonical link or its
   single `h1`, the feed is empty, or a share card is missing;
4. publishes it to GitHub Pages via `actions/deploy-pages`.

The same check runs before the bot merges a note, so a broken note never
reaches `main`.

The site also publishes an **RSS feed** at `/rss.xml` (one item per note,
newest first, with the whole note in it) and a **share card** per note at
`/og/<series>/<number>.png`, generated at build time with the site's own
typeface. The feed is linked from the head of every page and from the footer.

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
   frontmatter schema, the canonical 7-section structure, and the code block
   markup every post follows.
2. Add `src/content/blog/<series>/<number>.md`
   (series: `typescript` | `react` | `javascript`; routes are
   `/posts/<series>/<number>/`).
3. Add the title and date to the matching series in `src/data/series.ts`.
   That file is the single source of truth for the homepage timeline; a note
   is linked on the site and in the feed as soon as its file exists.
4. `npm run build` must pass.
5. Open a **draft** pull request from a `note/<series>-<number>` branch with
   the title format above, and the bot publishes it on its date.

## Styling notes

`global.css` carries both the homepage and the post styles because every page
ships one stylesheet. Post-specific rules are scoped to `body.post-page`
(applied by `PostLayout`), and homepage rules are neutralized on post pages
via `:where(.post-page)` selectors — keep that pattern when adding styles.

## Navigation

`BaseLayout` renders Astro's `<ClientRouter />`, so internal links navigate
client-side (no full page refresh), like a Next.js app router. Scripts must
therefore re-initialize after each navigation — hook them up with the
`astro:page-load` event (see the clock in `index.astro` and the TOC scrollspy
in `PostLayout.astro` for the pattern: init once, guard with a `window` flag,
clean up previous listeners).

`astro:page-load` is dispatched on **`document`** and does not bubble, so it
has to be listened for on `document` — a listener on `window` never fires it.
