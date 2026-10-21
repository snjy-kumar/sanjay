#!/usr/bin/env node
// Add the topic tags to the note branches.
//
// The note branches were written before the site had topics, so every note
// in them would publish with no topics and appear on no topic page. This
// adds the tags to the branch, in a commit of its own, and pushes it.
//
// The branch is not rewritten: the tags are a new commit on top, so the
// pull request keeps its history and its date.
//
//   node scripts/tag-note-branches.mjs            # every branch
//   node scripts/tag-note-branches.mjs --dry-run  # show what would happen

import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

const repo = process.cwd();
const dryRun = process.argv.includes('--dry-run');

const git = (...args) =>
  execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim();

/** The tags for each note. Kept in a file so the mapping is reviewable in
 *  one place rather than spread across commits. */
const map = JSON.parse(readFileSync('scripts/note-topics.json', 'utf8'));

// Only the branches that still have an open pull request. A branch whose
// note is already published needs nothing.
const open = execFileSync(
  'gh',
  ['pr', 'list', '--repo', 'snjy-kumar/sanjay', '--state', 'open', '--limit', '100', '--json', 'headRefName'],
  { encoding: 'utf8' },
);
const branches = JSON.parse(open)
  .map((pr) => pr.headRefName)
  .filter((branch) => branch.startsWith('note/'))
  .sort();

const done = [];
const skipped = [];

for (const branch of branches) {
  // The branch is note/<series>-<number>; the note is <series>/<number>.
  const name = branch.replace(/^note\//, '');
  const cut = name.lastIndexOf('-');
  const key = `${name.slice(0, cut)}/${name.slice(cut + 1)}`;
  const tags = map[key];

  if (!tags) {
    skipped.push(`${branch}: no tags mapped`);
    continue;
  }

  git('fetch', '--quiet', 'origin', branch);
  git('checkout', '--quiet', '--force', 'FETCH_HEAD');

  const file = `src/content/blog/${key}.md`;
  let source = await readFile(`${repo}/${file}`, 'utf8');

  if (source.includes('\ntags:')) {
    skipped.push(`${branch}: already tagged`);
    git('checkout', '--quiet', '--force', 'main');
    continue;
  }

  const list = '[' + tags.map((tag) => `'${tag}'`).join(', ') + ']';
  source = source.replace(/^(seriesOrder:\s*\d+\s*)$/m, `$1\ntags: ${list}`);
  await writeFile(`${repo}/${file}`, source);

  git('add', file);
  git('commit', '--quiet', '-m', `Add the topics for ${key}`);

  if (dryRun) {
    console.log(`would push ${branch} with tags: ${list}`);
  } else {
    git('push', '--quiet', 'origin', `HEAD:${branch}`);
    console.log(`pushed ${branch} — tags: ${list}`);
  }

  done.push(branch);
  git('checkout', '--quiet', '--force', 'main');
}

console.log(`\n${done.length} branch(es) ${dryRun ? 'would be' : 'were'} tagged.`);
for (const item of skipped) console.log(`skipped ${item}`);
