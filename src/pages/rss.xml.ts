import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';
import type { APIContext } from 'astro';
import { series } from '../data/series';
import { topicBySlug } from '../data/tags';
import { withBase } from '../utils/base';

const seriesName = (id: string) => series.find((s) => s.id === id)?.name ?? id;

// One item per published note, newest first, so the daily series can be
// followed in a reader instead of checked by hand.
//
// Undated notes (the dedicated series) are in the feed too, after the dated
// ones, in series and note order. They carry no pubDate, because they have
// no day: a reader dates an item by when it first sees it, which is when the
// note was merged, so a new undated note still shows up as new and an old one
// never jumps back to the top. They carry the description and the link, not
// the full text: they run to thousands of words each, and with dozens of
// them the feed would stop being something a reader can poll.
export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const container = await experimental_AstroContainer.create();
  const seriesOrder = (id: string) => series.findIndex((s) => s.id === id);
  const dated = posts.filter((post) => !post.data.undated && post.data.date);
  const undated = posts
    .filter((post) => post.data.undated || !post.data.date)
    .sort((a, b) =>
      seriesOrder(a.data.series) - seriesOrder(b.data.series)
      || a.data.seriesOrder - b.data.seriesOrder,
    );

  const items = [];
  for (const post of dated) {
    const [seriesId, slug] = post.id.split('/');
    // The full note, so a reader can read it without leaving the feed.
    const { Content } = await render(post);
    const content = await container.renderToString(Content);

    items.push({
      title: post.data.title,
      link: withBase(`/posts/${seriesId}/${slug}/`),
      pubDate: post.data.date,
      description: post.data.description,
      content,
      // The topics a reader can follow from a feed reader.
      categories: [
        seriesName(seriesId),
        ...post.data.tags.map((tag) => topicBySlug(tag)?.label ?? tag),
      ],
    });
  }

  items.sort((a, b) => b.pubDate!.valueOf() - a.pubDate!.valueOf());

  const undatedItems = undated.map((post) => {
    const [seriesId, slug] = post.id.split('/');
    return {
      title: post.data.title,
      link: withBase(`/posts/${seriesId}/${slug}/`),
      description: post.data.description,
      categories: [
        seriesName(seriesId),
        ...post.data.tags.map((tag) => topicBySlug(tag)?.label ?? tag),
      ],
    };
  });

  return rss({
    title: 'Sanjay Kumar Thakur',
    description:
      'Notes on React, TypeScript and JavaScript — the wrong way, the right way, one a day.',
    // The site is served from the /sanjay base path, so the channel link has
    // to point at the homepage there rather than at the domain root.
    site: new URL(withBase('/'), context.site ?? 'https://snjy-kumar.github.io').href,
    items: [...items, ...undatedItems],
    customData: '<language>en</language>',
  });
}
