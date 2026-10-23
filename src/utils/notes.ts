// One place that knows how to read the blog collection.
//
// Every page that shows notes — the homepage, the series pages, the topic
// pages, the path page, the feed — needs the same handful of lookups. Doing
// them here means a note is read one way, and a rule like "a note belongs to
// a series in series.ts" is enforced in one place.

import type { CollectionEntry } from 'astro:content';
import { series } from '../data/series';
import { topics } from '../data/tags';
import { withBase } from './base';

export type Note = CollectionEntry<'blog'>;

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** "27 Sep" — built by hand so the output does not depend on the build
 *  machine's locale (Intl gives "27 Sept" for en-GB and "Sep 27" for
 *  en-US). */
export function shortDate(date: Date): string {
  return `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]}`;
}

/** "27 September 2026" */
export function longDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "September 2026" */
export function monthLabel(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** A note in a dedicated series: no date, released when it is merged. */
export function isUndated(note: Note): boolean {
  return note.data.undated || !note.data.date;
}

/** The notes that have a day: the daily series. Only these go into the
 *  timeline, the month groups and the counters. */
export function datedNotes(notes: Note[]): (Note & { data: { date: Date } })[] {
  return notes.filter((note) => !isUndated(note)) as (Note & { data: { date: Date } })[];
}

/** The undated notes, series by series in series.ts order, then by their
 *  number in the series. That order is stable: it never depends on when a
 *  note was merged. */
export function undatedNotes(notes: Note[]): Note[] {
  const order = (id: string) => series.findIndex((s) => s.id === id);
  return notes
    .filter(isUndated)
    .sort((a, b) =>
      order(a.data.series) - order(b.data.series) || a.data.seriesOrder - b.data.seriesOrder,
    );
}

/** Newest first. Undated notes have no day, so they come after every dated
 *  one, in series and then note order. */
export function byDateDesc(a: Note, b: Note): number {
  const aDate = a.data.date;
  const bDate = b.data.date;
  if (aDate && bDate && !isUndated(a) && !isUndated(b)) return bDate.valueOf() - aDate.valueOf();
  if (!isUndated(a)) return -1;
  if (!isUndated(b)) return 1;
  const order = (id: string) => series.findIndex((s) => s.id === id);
  return order(a.data.series) - order(b.data.series) || a.data.seriesOrder - b.data.seriesOrder;
}

/** What a list row shows where a dated note shows its day: "Note 03". */
export function undatedLabel(note: Note): string {
  return `Note ${String(note.data.seriesOrder).padStart(2, '0')}`;
}

/** In series order — the order the series reads in. */
export function bySeriesOrder(a: Note, b: Note): number {
  return a.data.seriesOrder - b.data.seriesOrder;
}

/** The path to a note. */
export function noteHref(note: Note): string {
  const [seriesId, slug] = note.id.split('/');
  return withBase(`/posts/${seriesId}/${slug}/`);
}

/** The path to a series' own page. */
export function seriesHref(seriesId: string): string {
  return withBase(`/posts/${seriesId}/`);
}

/** The path to a topic's page. */
export function topicHref(slug: string): string {
  return withBase(`/topics/${slug}/`);
}

export function seriesOf(seriesId: string) {
  return series.find((s) => s.id === seriesId);
}

export function seriesName(seriesId: string): string {
  return seriesOf(seriesId)?.name ?? seriesId;
}

/** The notes of one series, in the order the series reads. */
export function notesInSeries(notes: Note[], seriesId: string): Note[] {
  return notes
    .filter((note) => note.data.series === seriesId)
    .sort(bySeriesOrder);
}

/** The notes carrying a topic, newest first. */
export function notesWithTopic(notes: Note[], slug: string): Note[] {
  return notes.filter((note) => note.data.tags.includes(slug)).sort(byDateDesc);
}

/** The topics that at least one published note uses, in vocabulary order. */
export function usedTopics(notes: Note[]): string[] {
  const used = new Set<string>();
  for (const note of notes) {
    for (const tag of note.data.tags) used.add(tag);
  }
  return topics.filter((topic) => used.has(topic.slug)).map((topic) => topic.slug);
}

/** How many notes of a series are published. */
export function publishedIn(notes: Note[], seriesId: string): number {
  return notes.filter((note) => note.data.series === seriesId).length;
}

/** The notes this one points at through `related`. Anything that does not
 *  resolve is dropped here; the build check catches it separately. */
export function relatedNotes(note: Note, notes: Note[]): Note[] {
  const ids = note.data.related ?? [];
  return ids
    .map((id) => notes.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is Note => Boolean(candidate));
}

export interface Counters {
  notes: number;
  series: number;
  /** Days between the first and the last note, inclusive. */
  days: number;
  weeks: number;
  /** Notes published in the seven days up to the last one. */
  thisWeek: number;
  /** Consecutive days of publishing, counting back from the last note. */
  streak: number;
  first: Date | null;
  last: Date | null;
}

const DAY = 86_400_000;

/** The numbers the path page and the homepage quote. Every one is derived
 *  from the collection at build time, so none of them can go stale. */
export function counters(all: Note[]): Counters {
  // The streak, the days and the weeks are about the daily series, so the
  // undated notes are counted in `notes` and `series` but have no day.
  const notes = datedNotes(all);
  if (all.length === 0 || notes.length === 0) {
    return {
      notes: all.length, series: new Set(all.map((note) => note.data.series)).size,
      days: 0, weeks: 0, thisWeek: 0, streak: 0,
      first: null, last: null,
    };
  }

  const times = notes.map((note) => note.data.date.valueOf()).sort((a, b) => a - b);
  const first = new Date(times[0]);
  const last = new Date(times[times.length - 1]);
  const dayOf = (time: number) => Math.floor(time / DAY);

  // Consecutive publishing days, counting back from the last note.
  const days = new Set(times.map(dayOf));
  let streak = 0;
  for (let day = dayOf(last.getTime()); days.has(day); day -= 1) streak += 1;

  const lastWeek = dayOf(last.getTime()) - 6;
  const thisWeek = times.filter((time) => dayOf(time) >= lastWeek).length;

  return {
    notes: all.length,
    series: new Set(all.map((note) => note.data.series)).size,
    days: dayOf(last.getTime()) - dayOf(first.getTime()) + 1,
    weeks: Math.ceil(
      (dayOf(last.getTime()) - dayOf(first.getTime()) + 1) / 7,
    ),
    thisWeek,
    streak,
    first,
    last,
  };
}

/** The dated notes grouped by the month they were published in, newest
 *  month first. Undated notes have no month and are left out. */
export function notesByMonth(notes: Note[]): { month: string; notes: Note[] }[] {
  const sorted = [...datedNotes(notes)].sort(byDateDesc);
  const groups: { month: string; notes: Note[] }[] = [];
  for (const note of sorted) {
    const label = monthLabel(note.data.date!);
    const last = groups[groups.length - 1];
    if (last && last.month === label) last.notes.push(note);
    else groups.push({ month: label, notes: [note] });
  }
  return groups;
}
