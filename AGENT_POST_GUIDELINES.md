# Content Guidelines & Post Template for AI Agents

This repository follows a strict editorial, typographical, and structural format for all blog posts. Any agent generating new posts (whether for TypeScript, React, or JavaScript series) **must** adhere to the guidelines and template defined in this document.

---

## 1. Directory & File Naming Conventions

Posts are organized by series under `src/content/blog/<series>/`:

- TypeScript posts: `src/content/blog/typescript/<number>.md` (e.g., `01.md`, `02.md`, ..., `15.md`)
- React posts: `src/content/blog/react/<number>.md` (e.g., `01.md`, `02.md`, ..., `16.md`)
- JavaScript posts: `src/content/blog/javascript/<number>.md` (e.g., `01.md`, `02.md`, ..., `31.md`)

Each post corresponds to a route: `/posts/<series>/<number>/` (e.g. `/posts/typescript/01/`).

---

## 2. Frontmatter Schema

Every post file must begin with YAML frontmatter containing these fields:

```yaml
---
title: "Precise title of the post"
series: "typescript" # "typescript" | "react" | "javascript" | "redux"
seriesOrder: 1 # Integer: sequential order in the series
date: "2026-09-27" # ISO format YYYY-MM-DD
readTime: "about 5 min" # "about X min"
description: "Short SEO description of the topic and problem solved."
tags: ['types', 'narrowing'] # Topic slugs — see below. At least one.
related: ['typescript/08'] # Ids of related notes, "<series>/<number>"
source: "https://github.com/.../file.ts#L10-L20" # Optional: the code this came from
---
```

### Tags

`tags` is the discovery mechanism. Each slug in it gets a page at
`/topics/<slug>/`, and the slug must already exist in
[`src/data/tags.ts`](./src/data/tags.ts) — the vocabulary is closed, and the
build check fails a note that uses a slug outside it.

- Pick two or three. A note about React state is `['state']`; a note about
  state that also teaches closures is `['state', 'closures']`.
- Tags are cross-series on purpose: the same mistake often shows up in two
  languages, and the topic page is where a reader sees that.
- A note with no tags gets a warning from the build check and will not show
  up on any topic page. That is why it is a warning and not an error — but
  every note should have at least one.

### Related

`related` lists the notes this one connects to, by id (`<series>/<number>`).
Cross-series links are encouraged: `react/06` → `typescript/14` is a more
useful link than two notes in the same series. Every id must resolve to a
note that exists, or the build check fails.

### Source

`source` is the evidence: a link to the file or commit the note came from,
in one of the project repositories. It appears next to "view source" at the
end of the note. Use it whenever the note is about a real bug or a real
piece of code — it is what makes the note proof of work rather than an
opinion.
```

---

## 3. Canonical 7-Section Document Architecture

Every post strictly follows this 7-section structure. Every section ID and heading icon must remain identical across all posts.

### Section 1: `#what-it-is`
Explains the concept, common traps, and edge cases.
```html
<section class="section" id="what-it-is">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.75"/><path d="M7 6.35v3.45"/><path d="M7 4.4v.02" stroke-width="1.8"/></svg>
What it is
</h2>
<p>Context and explanation paragraph...</p>
</section>
```

### Section 2: `#the-code`
Walks through the buggy pattern and the refined solution using labeled code blocks.
```html
<section class="section" id="the-code">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M4.9 3.5 2.35 7l2.55 3.5"/><path d="M9.1 3.5 11.65 7 9.1 10.5"/></svg>
The code
</h2>
<p>Explanation of the problem snippet...</p>

<!-- Labeled code block format -->
<div class="codeblock">
<div class="codeblock-label">
<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="#555" stroke-width="1.2"><path d="M2.5 1.5h5L10 4v6.5H2.5z"/><path d="M7.5 1.5V4H10"/></svg>
loose.ts
</div>
<pre><code><div class="line"><span class="ln">1</span><span class="src"><span class="kw">type</span> User = {</span></div>
<div class="line"><span class="ln">2</span><span class="src">  id: string;</span></div>
<div class="line"><span class="ln">3</span><span class="src">};</span></div></code></pre>
</div>

<p>Explanation of the clean solution...</p>

<div class="codeblock">
<div class="codeblock-label">
<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="#555" stroke-width="1.2"><path d="M2.5 1.5h5L10 4v6.5H2.5z"/><path d="M7.5 1.5V4H10"/></svg>
parse.ts
</div>
<pre><code><div class="line"><span class="ln">1</span><span class="src"><span class="kw">type</span> Status = &quot;draft&quot; | &quot;published&quot;;</span></div></code></pre>
</div>
</section>
```

### Section 3: `#old`
Explores the wrong approach with Best case / Worst case analysis and "Before" code block.
```html
<div class="stack" id="old">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="4.75"/><path d="M7 4.15V7.15l2.15 1.35"/></svg>
Old
</h2>
<p><strong>Wrong approach: summary of the bad pattern</strong></p>
<p><strong>Best case.</strong> When it might accidentally work or look benign...</p>
<p><strong>Worst case.</strong> The failure mode when this code runs in production...</p>
<p>Before: explanation of the code...</p>

<div class="codeblock">
<div class="codeblock-label">
<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="#555" stroke-width="1.2"><path d="M2.5 1.5h5L10 4v6.5H2.5z"/><path d="M7.5 1.5V4H10"/></svg>
before.ts
</div>
<pre><code><div class="line"><span class="ln">1</span><span class="src"><span class="kw">function</span> saveUser(input: User): User {</span></div>
<div class="line"><span class="ln">2</span><span class="src">  <span class="kw">return</span> input;</span></div>
<div class="line"><span class="ln">3</span><span class="src">}</span></div></code></pre>
</div>
</div>
```

### Section 4: `#new`
Explores the right approach with Best case / Worst case analysis and "After" code block.
```html
<div class="stack" id="new">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2.15 11.7 7 7 11.85 2.3 7z"/></svg>
New
</h2>
<p><strong>Right approach: summary of the good pattern</strong></p>
<p><strong>Best case.</strong> Advantages, safety guarantees, compiler behavior...</p>
<p><strong>Worst case.</strong> Over-engineering trap to avoid...</p>
<p>After: explanation of the verified code...</p>

<div class="codeblock">
<div class="codeblock-label">
<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="#555" stroke-width="1.2"><path d="M2.5 1.5h5L10 4v6.5H2.5z"/><path d="M7.5 1.5V4H10"/></svg>
after.ts
</div>
<pre><code><div class="line"><span class="ln">1</span><span class="src"><span class="kw">function</span> saveUser(input: UserInput): User {</span></div>
<div class="line"><span class="ln">2</span><span class="src">  <span class="kw">return</span> { id: input.id };</span></div>
<div class="line"><span class="ln">3</span><span class="src">}</span></div></code></pre>
</div>
</div>
```

### Section 5: `#when`
Rule of thumb followed by a structured decision table.
```html
<section class="section" id="when">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M3.6 2.4v9.2"/><path d="M3.6 6.4h4.35"/><path d="M7.95 6.4 11.15 3.5"/><path d="M7.95 6.4 11.15 9.3"/></svg>
When to use which
</h2>
<p>Rule of thumb explanation...</p>

<div class="when">
<div class="when-row"><span>Scenario or condition description</span><span class="when-choice">choice-1</span></div>
<div class="when-row"><span>Another scenario or condition</span><span class="when-choice">choice-2</span></div>
<div class="when-row"><span>Boundary / external input case</span><span class="when-choice">parse at the edge</span></div>
</div>
</section>
```

### Section 6: `#practice`
Hands-on prompt with starter code to refactor.
```html
<section class="section" id="practice">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M8.55 2.25 11.75 5.45 5.05 12.15H1.85V8.95z"/><path d="M7.35 3.45 10.55 6.65"/></svg>
Practice
</h2>
<p class="prompt">Prompt describing the exercise to solve...</p>

<div class="codeblock">
<div class="codeblock-label">
<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none" stroke="#555" stroke-width="1.2"><path d="M2.5 1.5h5L10 4v6.5H2.5z"/><path d="M7.5 1.5V4H10"/></svg>
exercise.ts
</div>
<pre><code><div class="line"><span class="ln">1</span><span class="src"><span class="kw">type</span> Starter = string;</span></div></code></pre>
</div>
</section>
```

### Section 7: `#sources`
Official documentation and MDN references.
```html
<section class="section" id="sources">
<h2>
<svg class="ico" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="#111" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5.35 3.15H3.15v7.7h7.7V8.65"/><path d="M7.35 6.65 11.55 2.45"/><path d="M8.35 2.45h3.2v3.2"/></svg>
Sources
</h2>
<ul class="sources">
<li><a href="https://www.typescriptlang.org/docs/...">Official Doc Link</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/...">MDN Reference Link</a></li>
</ul>
</section>
```

---

## 4. Typography & Syntax Highlighting Rules

- Code spans in paragraphs must use `<code>...</code>` or Markdown backticks.
- In pre blocks:
  - `.ln`: Line number (`<span class="ln">1</span>`)
  - `.src`: Source code line (`<span class="src">...</span>`)
  - `.kw`: Keyword styling (`<span class="kw">type</span>`, `<span class="kw">const</span>`, `<span class="kw">function</span>`)
  - `.cm`: Comments (`<span class="cm">// comment</span>`)
- Never use unescaped raw curly braces (`{` or `}`) inside expressions if using MDX. In `.md` files with HTML blocks, standard HTML entities (`&quot;`, `&#39;`) or direct text are safely handled.

---

## 5. Adding New Posts Workflow

When creating a new post:
1. Identify the series (`typescript`, `react`, `javascript`, or `redux`).
2. Update `src/data/series.ts` — add the title and date to the matching
   series, at the right position. The position matters: `seriesOrder` is
   the 1-based index in that list, so a note added out of order breaks the
   series. `blurb`, `description` and `topics` are already filled in for
   each series — leave them alone.
3. Create `src/content/blog/<series>/<number>.md` following the template
   above, with `tags` (at least one) and `related` (optional).
4. `npm run build` must pass, and `npm run check` must pass. The check
   fails a note that uses an unknown topic, points at a note that does not
   exist, is not linked from its series page, or reuses another page's
   title.
5. Open a **draft** pull request from a `note/<series>-<number>` branch with
   the title format above, and the bot publishes it on its date.

## 6. The pages a note appears on

Adding a note file adds it to more than one page. None of them need
editing — they are built from the collection:

| Page | Route | What it shows |
| :--- | :--- | :--- |
| The note | `/posts/<series>/<number>/` | The note itself |
| The series page | `/posts/<series>/` | The series' notes in order, with the topics it covers |
| The topic pages | `/topics/<slug>/` | Every note carrying that topic, grouped by series |
| The learning path | `/path/` | Every note ever, in order, with the counters |
| The homepage | `/` | The series timelines, with the note linked once it is published |
| The feed | `/rss.xml` | The note, with the series and topics as categories |

The series page, the topic pages, the path and the feed all read the
collection at build time. Nothing there is hand-maintained, so a published
note appears on all of them automatically.
