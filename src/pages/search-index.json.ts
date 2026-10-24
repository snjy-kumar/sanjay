import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { series } from '../data/series';
import { topics } from '../data/tags';
import { withBase } from '../utils/base';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const plans = await getCollection('plans');

  const items = [];

  for (const post of posts) {
    const [seriesId, slug] = post.id.split('/');
    const s = series.find((item) => item.id === seriesId);
    items.push({
      type: 'Note',
      title: post.data.title,
      url: withBase(`/posts/${seriesId}/${slug}/`),
      category: s?.name ?? seriesId,
      description: post.data.description,
      tags: post.data.tags ?? [],
    });
  }

  for (const plan of plans) {
    items.push({
      type: 'Curriculum',
      title: plan.data.title,
      url: withBase(`/plans/${plan.id}/`),
      category: 'Roadmap',
      description: plan.data.description,
      tags: [],
    });
  }

  for (const s of series) {
    if (posts.some((p) => p.data.series === s.id)) {
      items.push({
        type: 'Series',
        title: `${s.name} Series`,
        url: withBase(`/posts/${s.id}/`),
        category: 'Series Hub',
        description: s.description,
        tags: s.topics,
      });
    }
  }

  for (const t of topics) {
    items.push({
      type: 'Topic',
      title: t.label,
      url: withBase(`/topics/${t.slug}/`),
      category: 'Topic Hub',
      description: t.definition,
      tags: [t.slug],
    });
  }

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
