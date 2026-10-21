#!/usr/bin/env node
// Check the built site before it goes out.
//
// The daily notes are merged by a workflow, without anyone reading them
// first, so the build has to catch what a reader would otherwise trip over:
// a link that goes nowhere, a page without a title or a heading, a feed that
// came out empty. It runs on every build, and a failure fails the deploy.

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.cwd(), 'dist');
const base = '/sanjay';
const site = 'https://snjy-kumar.github.io';

const problems = [];
const note = (message) => problems.push(message);

// A warning does not fail the build. It is printed so it is seen, but it
// does not stop a note from publishing.
const warnings = [];
const warn = (message) => warnings.push(message);

// Page titles, so two pages cannot quietly end up with the same one.
const titlesSeen = new Map();

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, filter, found = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, filter, found);
    else if (filter(entry.name)) found.push(full);
  }
  return found;
}

const htmlFiles = await walk(dist, (name) => name.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('check: no HTML was built');
  process.exit(1);
}

// Every page needs the basics a search engine reads.
for (const file of htmlFiles) {
  const rel = path.relative(dist, file);
  const html = await readFile(file, 'utf8');

  // A forwarded old address is not a page: it is a redirect, and it is not
  // in the sitemap on purpose.
  const isRedirect = html.includes('http-equiv="refresh"');

  if (!isRedirect) {
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
    if (!title) note(`${rel}: no <title>`);

    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim();
    if (!description) note(`${rel}: no meta description`);

    if (!/<link rel="canonical" href="[^"]+"/.test(html)) note(`${rel}: no canonical link`);

    const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
    if (h1s !== 1) note(`${rel}: ${h1s} <h1> elements, expected exactly 1`);
  }

  // Internal links have to resolve to something that was built.
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of new Set(refs)) {
    if (!ref.startsWith('/')) continue;
    if (!ref.startsWith(base + '/') && ref !== base) {
      note(`${rel}: link "${ref}" is outside the base path`);
      continue;
    }
    const clean = decodeURIComponent(ref.slice(base.length)).split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(dist, clean);
    const ok = (await exists(target)) || (await exists(path.join(target, 'index.html')));
    if (!ok) note(`${rel}: link "${ref}" has no file in the build`);
  }

  // The share card has to exist too, or the link previews blank.
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (ogImage) {
    const url = new URL(ogImage);
    const file = path.join(dist, decodeURIComponent(url.pathname.slice(base.length)));
    if (!(await exists(file))) note(`${rel}: share card "${ogImage}" is missing`);
  }

  // Two pages with the same title is the quietest way to lose a ranking:
  // the search engine picks one and the other never gets seen.
  if (!isRedirect) {
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
    if (title) {
      const seen = titlesSeen.get(title);
      if (seen) note(`${rel}: the title "${title}" is already used by ${seen}`);
      else titlesSeen.set(title, rel);
    }
  }
}

// The pages that hold the learning path together. Each one is a hub, so a
// missing one breaks the links into it.
//
// A note branch may predate these pages — the JavaScript notes were
// written before the series pages existed. The check only demands what the
// branch can actually build, so an older branch still merges.
const hasSeriesPages = await exists(path.join('src', 'pages', 'posts', '[series]', 'index.astro'));
const hasPathPage = await exists(path.join('src', 'pages', 'path.astro'));
const hasLogPage = await exists(path.join('src', 'pages', 'log.astro'));
const hasTopicPages = await exists(path.join('src', 'pages', 'topics', 'index.astro'));

if (hasPathPage && !(await exists(path.join(dist, 'path', 'index.html')))) {
  note('path/index.html: the page is missing');
}
if (hasLogPage && !(await exists(path.join(dist, 'log', 'index.html')))) {
  note('log/index.html: the page is missing');
}
if (hasTopicPages && !(await exists(path.join(dist, 'topics', 'index.html')))) {
  note('topics/index.html: the page is missing');
}

// Every note has to be reachable from its series' page, and every series
// that has notes has to have that page. A note nothing links to is a page
// nobody finds.
const postsDir = path.join(dist, 'posts');
if (hasSeriesPages && (await exists(postsDir))) {
  for (const seriesId of await readdir(postsDir, { withFileTypes: true })) {
    if (!seriesId.isDirectory()) continue;
    const seriesDir = path.join(postsDir, seriesId.name);
    const indexFile = path.join(seriesDir, 'index.html');

    const notes = (await readdir(seriesDir, { withFileTypes: true })).filter(
      (entry) => entry.isDirectory() && /^\d+$/.test(entry.name),
    );
    if (notes.length === 0) continue;

    if (!(await exists(indexFile))) {
      note(`posts/${seriesId.name}/: ${notes.length} notes but no series page`);
      continue;
    }

    const seriesHtml = await readFile(indexFile, 'utf8');
    for (const note of notes) {
      const href = `${base}/posts/${seriesId.name}/${note.name}/`;
      if (!seriesHtml.includes(href)) {
        note(`posts/${seriesId.name}/${note.name}/: not linked from the series page`);
      }
    }
  }
}

// The topic vocabulary is closed: a tag that is not in src/data/tags.ts has
// no page of its own, and a "related" note that does not exist is a dead
// link in the making.
const tagSource = await readFile(path.join('src', 'data', 'tags.ts'), 'utf8').catch(() => null);
const knownTags = new Set(
  tagSource ? [...tagSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]) : [],
);

const contentDir = path.join('src', 'content', 'blog');
if (await exists(contentDir)) {
  const noteIds = new Set();
  const noteFiles = [];
  for (const seriesId of await readdir(contentDir, { withFileTypes: true })) {
    if (!seriesId.isDirectory()) continue;
    for (const file of await readdir(path.join(contentDir, seriesId.name))) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      noteFiles.push(path.join(contentDir, seriesId.name, file));
      noteIds.add(`${seriesId.name}/${file.replace(/\.mdx?$/, '')}`);
    }
  }

  for (const file of noteFiles) {
    const source = await readFile(file, 'utf8');
    const frontmatter = source.split('---')[1] ?? '';
    const rel = path.relative('src/content/blog', file);

    const tagLine = frontmatter.match(/^tags:\s*\[(.*)\]/m)?.[1];
    const tags = tagLine
      ? [...tagLine.matchAll(/'([^']+)'/g)].map((m) => m[1])
      : [];
    if (tags.length === 0) {
      warn(`${rel}: the note has no topics, so it will not appear on a topic page`);
    }
    for (const tag of tags) {
      if (knownTags.size > 0 && !knownTags.has(tag)) {
        note(`${rel}: the topic "${tag}" is not in src/data/tags.ts`);
      }
    }

    const relatedLine = frontmatter.match(/^related:\s*\[(.*)\]/m)?.[1];
    const related = relatedLine
      ? [...relatedLine.matchAll(/'([^']+)'/g)].map((m) => m[1])
      : [];
    for (const id of related) {
      if (!noteIds.has(id)) note(`${rel}: the related note "${id}" does not exist`);
    }
  }
}

// The feed is what people subscribe with.
const feed = await readFile(path.join(dist, 'rss.xml'), 'utf8').catch(() => null);
if (!feed) {
  note('rss.xml: the feed was not built');
} else {
  const items = feed.match(/<item>/g)?.length ?? 0;
  if (items === 0) note('rss.xml: the feed has no items');
  for (const link of [...feed.matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1])) {
    if (!link.startsWith(site + base)) {
      note(`rss.xml: link "${link}" is not on this site`);
      continue;
    }
    const file = path.join(dist, decodeURIComponent(new URL(link).pathname.slice(base.length)));
    const ok = (await exists(file)) || (await exists(path.join(file, 'index.html')));
    if (!ok) note(`rss.xml: link "${link}" has no file in the build`);
  }
}

// The sitemap should list every page that was built.
const sitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8').catch(() => null);
if (!sitemap) {
  note('sitemap-0.xml: the sitemap was not built');
} else {
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const file of htmlFiles) {
    const name = path.basename(file);
    // The 404 page is not a page to list, and it is built as a flat file.
    if (name === '404.html') continue;
    // A forwarded old address is a redirect, not a page.
    if ((await readFile(file, 'utf8')).includes('http-equiv="refresh"')) continue;
    const rel = path.relative(dist, file).replace(/index\.html$/, '');
    const url = site + base + '/' + rel;
    if (!listed.has(url)) note(`sitemap-0.xml: ${url} is not listed`);
  }
}

if (problems.length > 0) {
  console.error(`check: ${problems.length} problem(s) in the build`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

if (warnings.length > 0) {
  console.warn(`check: ${warnings.length} warning(s)`);
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

console.log(`check: ${htmlFiles.length} pages, links, feed and sitemap all fine`);
