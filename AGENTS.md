## SEO is the #1 priority — the king of this project

Any optimization (performance, DX, refactors, client-side routing, scripts,
dependencies, styling changes) is recommended **only if SEO is not hurt** —
and whenever you touch anything, look for ways to **improve** SEO instead.
If an optimization conflicts with SEO, SEO wins. Never trade a ranking factor
for convenience.

Rules to follow on every task:

- **Full content in static HTML.** Every page must render its complete text,
  headings, and links at build time. Never move content behind client-side
  rendering, hydration, or JS-only fetches — crawlers and the reader both get
  the same HTML.
- **Real links only.** Use semantic `<a href="...">` navigation (the
  ClientRouter may enhance clicks, but the href and target HTML must always
  work without JS). Never replace links with `onclick` handlers.
- **Headings & semantics.** Exactly one `<h1>` per page, logical heading
  order (h1 → h2 → h3), semantic landmarks (`main`, `nav`, `aside`,
  `article`), descriptive anchor text (avoid "click here").
- **Unique metadata per page.** Unique `<title>` and
  `<meta name="description">`, plus canonical and Open Graph tags (provided
  by `BaseLayout`) — keep them accurate when adding pages. When adding a new
  route, make sure its title/description say something specific about that page.
- **Sitemap stays in sync.** `@astrojs/sitemap` generates
  `sitemap-index.xml` from the built routes; verify it after adding routes
  and keep `site` in `astro.config.mjs` correct (it feeds canonical URLs and
  the sitemap).
- **No harmful scripts.** No render-blocking third-party JS, no cloaking or
  hidden text, no link schemes, no analytics that intercept or rewrite links.
- **Verify before you finish.** Run `npm run build`, then sanity-check the
  built HTML in `dist/` for the pages you touched: title, description,
  canonical, single h1, real links. Read
  [Google's starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
  when unsure.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
