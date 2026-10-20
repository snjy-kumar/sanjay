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

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) note(`${rel}: no <title>`);

  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1]?.trim();
  if (!description) note(`${rel}: no meta description`);

  if (!/<link rel="canonical" href="[^"]+"/.test(html)) note(`${rel}: no canonical link`);

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) note(`${rel}: ${h1s} <h1> elements, expected exactly 1`);

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

console.log(`check: ${htmlFiles.length} pages, links, feed and sitemap all fine`);
