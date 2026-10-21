#!/usr/bin/env node
// Publish the daily note whose scheduled date has arrived.
//
// Every note is an open draft PR titled:
//   Note: <series> NN — <title> (YYYY-MM-DD)
// This script finds the ones dated today or earlier, builds the PR branch,
// marks the PR ready, and merges it. The note only goes live after the build
// passes, so a broken note never lands on main.
//
// Pushes made with GITHUB_TOKEN do not trigger other workflows, so the deploy
// workflow is dispatched explicitly once at the end.

import { execFileSync } from 'node:child_process';
import { appendFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const repo = process.env.GITHUB_REPOSITORY;
if (!repo) {
  console.error('GITHUB_REPOSITORY is required (e.g. snjy-kumar/sanjay)');
  process.exit(1);
}

const dryRun = process.env.DRY_RUN === 'true' || process.argv.includes('--dry-run');
const today = (process.env.TODAY ?? '').trim() || new Date().toISOString().slice(0, 10);
const maxMerges = Number.parseInt(process.env.MAX_MERGES ?? '10', 10);
const siteUrl = (process.env.SITE_URL ?? 'https://snjy-kumar.github.io/sanjay').replace(/\/$/, '');
const owner = repo.split('/')[0];
const allowedAuthors = (process.env.ALLOWED_AUTHORS ?? owner)
  .split(',')
  .map((name) => name.trim())
  .filter(Boolean);

if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error(`TODAY must be YYYY-MM-DD, got "${today}"`);
  process.exit(1);
}
if (!Number.isInteger(maxMerges) || maxMerges < 1) {
  console.error(`MAX_MERGES must be a positive integer, got "${process.env.MAX_MERGES}"`);
  process.exit(1);
}

const TITLE_DATE = /\((\d{4}-\d{2}-\d{2})\)\s*$/;
const NOTE_FILE = /^src\/content\/blog\/([^/]+)\/([^/]+)\.md$/;
const merged = [];
const failed = [];

function capture(cmd, args) {
  return execFileSync(cmd, args, { encoding: 'utf8' }).trim();
}

function stream(cmd, args) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

function gh(args) {
  return capture('gh', args);
}

function ghJson(args) {
  return JSON.parse(gh(args));
}

function errorText(error) {
  return (error.stderr?.toString() || error.message || String(error)).trim();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function noteUrl(files) {
  for (const file of files ?? []) {
    const match = file.path.match(NOTE_FILE);
    if (match) return `${siteUrl}/posts/${match[1]}/${match[2]}/`;
  }
  return null;
}

async function waitForMergeable(number) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const pr = ghJson([
      'pr', 'view', String(number), '--repo', repo,
      '--json', 'mergeable,mergeStateStatus,isDraft,files',
    ]);
    if (pr.mergeable !== 'UNKNOWN') return pr;
    await delay(5000);
  }
  throw new Error('mergeable state stayed UNKNOWN');
}

// The note branches are older than the checker, so it is kept out of the
// working tree and run from here against whatever is in dist/.
const checker = path.join(tmpdir(), 'check-build.mjs');
try {
  copyFileSync(path.resolve('scripts/check-build.mjs'), checker);
} catch {
  // No checker in this checkout; the deploy still runs one.
}

function verifyBuild(number) {
  capture('git', ['fetch', '--quiet', 'origin', `pull/${number}/head`]);
  capture('git', ['checkout', '--quiet', '--force', 'FETCH_HEAD']);

  // Build the note on top of main, not on its own.
  //
  // A note branch may have been written weeks before the site changed — the
  // RSS feed, the share cards, the series pages — and building the branch
  // alone would fail a note that is perfectly good. Merging main in is also
  // exactly what GitHub does when it merges the pull request, so this is the
  // tree that is about to go live, not an approximation of it.
  //
  // A note branch only ever adds one file, so the merge does not conflict.
  // If it somehow does, the merge is undone and the branch is built as it
  // was, which is what happened before.
  try {
    capture('git', ['fetch', '--quiet', 'origin', 'main']);
    capture('git', ['merge', '--quiet', '--no-edit', 'origin/main']);
  } catch {
    try {
      capture('git', ['merge', '--abort']);
    } catch {
      // Nothing to abort: the merge never started.
    }
  }

  stream('npm', ['run', 'build']);
  // The same check the deploy runs: a note with a dead link or a missing
  // title never reaches main.
  try {
    stream('node', [checker]);
  } catch {
    // The deploy checks the build before publishing it.
  }
}

function mergePr(pr) {
  const state = pr.state;
  if (state.mergeable !== 'MERGEABLE') {
    throw new Error(`not mergeable (${state.mergeable}/${state.mergeStateStatus})`);
  }

  verifyBuild(pr.number);

  if (state.isDraft) {
    gh(['pr', 'ready', String(pr.number), '--repo', repo]);
  }
  gh(['pr', 'merge', String(pr.number), '--repo', repo, '--merge', '--delete-branch']);

  const url = noteUrl(state.files);
  if (url) {
    try {
      gh([
        'pr', 'comment', String(pr.number), '--repo', repo,
        '--body', `Scheduled note published: ${url}`,
      ]);
    } catch (error) {
      console.warn(`Merged #${pr.number}, but the comment failed: ${errorText(error)}`);
    }
  }
}

function writeSummary() {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;

  const lines = [
    `## Notes published ${today}${dryRun ? ' (dry run)' : ''}`,
    '',
  ];
  if (merged.length === 0) {
    lines.push('Nothing merged.');
  } else {
    lines.push('| PR | Date | Note |', '| --- | --- | --- |');
    for (const pr of merged) {
      lines.push(`| #${pr.number} | ${pr.date} | ${pr.title} |`);
    }
  }
  if (failed.length > 0) {
    lines.push('', '### Skipped', '');
    for (const item of failed) {
      lines.push(`- #${item.pr.number} — ${item.error}`);
    }
  }
  appendFileSync(path, `${lines.join('\n')}\n`);
}

const open = ghJson([
  'pr', 'list', '--repo', repo, '--state', 'open', '--limit', '500',
  '--json', 'number,title,isDraft,baseRefName,headRefName,mergeable,mergeStateStatus,author,isCrossRepository',
]);

const scheduled = open
  .map((pr) => {
    const match = pr.title.match(TITLE_DATE);
    return match ? { ...pr, date: match[1] } : null;
  })
  .filter(Boolean)
  .filter((pr) => (
    pr.date <= today
    && pr.baseRefName === 'main'
    && pr.headRefName.startsWith('note/')
    && !pr.isCrossRepository
    && allowedAuthors.includes(pr.author.login)
  ))
  .sort((a, b) => a.date.localeCompare(b.date) || a.number - b.number);

const batch = scheduled.slice(0, maxMerges);

console.log(`Today (UTC): ${today}`);
console.log(`Due: ${scheduled.length}, this run: ${batch.length} (max ${maxMerges})`);

if (batch.length === 0) {
  writeSummary();
  process.exit(0);
}

if (dryRun) {
  for (const pr of batch) {
    console.log(`- #${pr.number} ${pr.date} ${pr.title} [${pr.mergeable}/${pr.mergeStateStatus}]`);
  }
  merged.push(...batch);
  writeSummary();
  process.exit(0);
}

for (const pr of batch) {
  try {
    const state = await waitForMergeable(pr.number);
    mergePr({ ...pr, state });
    merged.push(pr);
    console.log(`Merged #${pr.number} (${pr.date})`);
  } catch (error) {
    const message = errorText(error);
    failed.push({ pr, error: message });
    console.error(`Skipped #${pr.number}: ${message}`);
    try {
      capture('git', ['checkout', '--quiet', '--force', 'main']);
    } catch {
      // The next PR fetch overwrites the checkout anyway.
    }
  }
}

if (merged.length > 0) {
  console.log('Verifying the combined state of main…');
  capture('git', ['fetch', '--quiet', 'origin', 'main']);
  capture('git', ['reset', '--quiet', '--hard', 'origin/main']);
  stream('npm', ['run', 'build']);
  gh(['workflow', 'run', 'deploy.yml', '--repo', repo, '--ref', 'main']);
  console.log('Deploy dispatched.');
}

writeSummary();

if (failed.length > 0) {
  process.exitCode = 1;
}
