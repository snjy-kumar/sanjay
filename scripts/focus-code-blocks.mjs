#!/usr/bin/env node
// Code blocks in the notes are written as raw HTML, so the markdown pipeline
// never sees them and no plugin can mark them. A scrollable region that
// cannot be focused cannot be scrolled with the keyboard, so every <pre> in
// the built pages gets tabindex="0".
//
// This runs after `astro build` and before the site is deployed.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.cwd(), 'dist');

// <pre> without a tabindex of its own.
const PRE = /<pre(?![^>]*\stabindex)/g;

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

let changed = 0;
let count = 0;

for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  const matches = html.match(PRE);
  if (!matches) continue;
  count += matches.length;
  await writeFile(file, html.replace(PRE, '<pre tabindex="0"'));
  changed += 1;
}

console.log(`focusable code blocks: ${count} <pre> elements in ${changed} file(s)`);
