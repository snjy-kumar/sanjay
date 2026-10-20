import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';
import type { APIContext } from 'astro';
import { series } from '../data/series';
import { withBase } from '../utils/base';

const seriesName = (id: string) => series.find((s) => s.id === id)?.name ?? id;

// One item per published note, newest first, so the daily series can be
// followed in a reader instead of checked by hand.
export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const container = await experimental_AstroContainer.create();

  const items = [];
  for (const post of posts) {
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
      categories: [seriesName(seriesId), post.data.readTime],
    });
  }

  items.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Sanjay Kumar Thakur',
    description:
      'Notes on React, TypeScript and JavaScript — the wrong way, the right way, one a day.',
    // The site is served from the /sanjay base path, so the channel link has
    // to point at the homepage there rather than at the domain root.
    site: new URL(withBase('/'), context.site ?? 'https://snjy-kumar.github.io').href,
    items,
    customData: '<language>en</language>',
  });
}
