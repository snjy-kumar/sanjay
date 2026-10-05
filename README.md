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
│   │   └── series.ts         # Single source of truth for series journeys
│   ├── layouts/
│   │   ├── BaseLayout.astro  # <html>/<head>, global.css, optional bodyClass
│   │   └── PostLayout.astro  # Post shell: rail, overview TOC, pager
│   ├── pages/
│   │   ├── index.astro       # Homepage (work + LinkedIn series journey)
│   │   └── posts/[series]/[slug].astro
│   ├── styles/
│   │   └── global.css        # Homepage + post styles (post rules scoped
│   │                         #   under body.post-page)
│   └── content.config.ts     # Blog collection schema (zod)
├── astro.config.mjs          # site URL, Tailwind vite plugin, sitemap, MDX
└── AGENT_POST_GUIDELINES.md  # Post format/template — read before writing posts
```

## Deployment (GitHub Actions → GitHub Pages)

On every push to `main`, [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):

1. checks out the repo, installs deps (`npm ci`, Node 22), runs `npm run build`;
2. uploads `dist/` — a **plain static HTML/CSS/JS site**, exactly what a static
   host serves (no server-side runtime);
3. publishes it to GitHub Pages via `actions/deploy-pages`.

The site lives at **`https://snjy-kumar.github.io/sanjay/`** — a project page,
so `base: '/sanjay'` is set in `astro.config.mjs` and all internal links go
through `withBase()` (`src/utils/base.ts`). Never hardcode root-absolute paths.

Pages source must be set to **GitHub Actions** (Settings → Pages → Source).
Check runs under the `github-pages` environment; the run log shows the final
URL. Preview any build locally with `npm run preview`.

## Writing posts

1. Read [AGENT_POST_GUIDELINES.md](./AGENT_POST_GUIDELINES.md) — it defines the
   frontmatter schema, the canonical 7-section structure, and the code block
   markup every post follows.
2. Create `src/content/blog/<series>/<number>.md`
   (series: `typescript` | `react` | `javascript`; routes are
   `/posts/<series>/<number>/`).
3. Mark the post as published in `src/data/series.ts`
   (`published: true`, add its `slug`). Published/scheduled counts in the
   post rail are derived from this file automatically.
4. `npm run build` must pass.

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
