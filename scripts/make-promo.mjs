#!/usr/bin/env node
// Write the ready-to-paste social post for every published note.
//
// The daily series is worth nothing if it is not shared, and writing a post
// for each note is the part that stops happening. This generates one file
// per note in promo/, so the job is: open the file, paste it, post it.
//
//   node scripts/make-promo.mjs            # every published note
//   node scripts/make-promo.mjs react/07   # one note
//
// The copy is a starting point, not a finished post. Edit the first line so
// it says what the note actually taught — the rest is scaffolding.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = (process.env.SITE_URL ?? 'https://snjy-kumar.github.io/sanjay').replace(/\/$/, '');

const hashtags = {
  typescript: '#typescript #webdev #frontend',
  react: '#react #webdev #frontend',
  javascript: '#javascript #webdev #frontend',
  redux: '#redux #react #webdev',
};

const seriesName = {
  typescript: 'TypeScript',
  react: 'React',
  javascript: 'JavaScript',
  redux: 'Redux',
};

// Read the notes straight out of the content directory — the same files the
// site is built from.
const contentDir = path.join('src', 'content', 'blog');
const seriesDir = path.join(contentDir, 'typescript');

const { readdir } = await import('node:fs/promises');
const seriesIds = (await readdir(contentDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

const only = process.argv[2];

const written = [];

for (const id of seriesIds) {
  const dir = path.join(contentDir, id);
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const key = `${id}/${file.replace(/\.md$/, '')}`;
    if (only && only !== key) continue;

    const source = await readFile(path.join(dir, file), 'utf8');
    const frontmatter = source.split('---')[1] ?? '';
    const title = frontmatter.match(/^title:\s*['"]?(.*?)['"]?\s*$/m)?.[1];
    const description = frontmatter.match(/^description:\s*['"]?(.*?)['"]?\s*$/m)?.[1];
    const readTime = frontmatter.match(/^readTime:\s*['"]?(.*?)['"]?\s*$/m)?.[1];
    if (!title || !description) {
      console.warn(`skipping ${key}: no title or description`);
      continue;
    }

    const url = `${siteUrl}/posts/${key}/`;
    const name = seriesName[id] ?? id;
    const tags = hashtags[id] ?? '#webdev';

    const body = `Note ${file.replace(/\.md$/, '')} of the ${name} series: ${title}.

${description}

→ ${url}

${tags}
`;

    const file2 = path.join('promo', `${id}-${file.replace(/\.md$/, '')}.md`);
    await mkdir('promo', { recursive: true });
    await writeFile(
      file2,
      `<!--\nSeries: ${name} · Note ${file.replace(/\.md$/, '')}\nURL: ${url}\nRead time: ${readTime ?? ''}\n-->\n\n${body}`,
    );
    written.push(key);
  }
}

console.log(`promo: ${written.length} post(s) written to promo/`);
