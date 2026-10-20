#!/usr/bin/env node
// Forward the addresses the old hand-written site used.
//
// The site was a set of HTML files before the Astro rewrite. Those pages
// lived at /posts/<series>/<number>.html and are now at
// /posts/<series>/<number>/, so the old addresses are forwarded. Anything
// shared from the old site — a LinkedIn post, a message, a bookmark — still
// lands on the note.
//
// GitHub Pages serves static files and cannot send a 301, so each old address
// gets a small page that sends the reader on: a meta refresh for the usual
// case, a script for the rest, and a visible link if both are blocked.
//
// This runs after `astro build` and before the site is deployed.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve(process.cwd(), 'dist');
const base = '/sanjay';
const site = 'https://snjy-kumar.github.io';

const legacyPaths = [
  { from: 'posts/typescript/01.html', to: 'posts/typescript/01/' },
  { from: 'posts/typescript/02.html', to: 'posts/typescript/02/' },
  { from: 'posts/typescript/03.html', to: 'posts/typescript/03/' },
  { from: 'posts/typescript/04.html', to: 'posts/typescript/04/' },
  { from: 'posts/typescript/05.html', to: 'posts/typescript/05/' },
  { from: 'posts/typescript/06.html', to: 'posts/typescript/06/' },
  { from: 'posts/typescript/07.html', to: 'posts/typescript/07/' },
];

function page(to) {
  const target = `${base}/${to}`;
  const absolute = `${site}${target}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Moved</title>
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="${absolute}" />
    <script>location.replace(${JSON.stringify(target)});</script>
  </head>
  <body>
    <p>This note moved. <a href="${target}">${target}</a></p>
  </body>
</html>
`;
}

let written = 0;

for (const { from, to } of legacyPaths) {
  const file = path.join(dist, from);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(to));
  written += 1;
}

console.log(`legacy redirects: ${written} address(es) forwarded`);
