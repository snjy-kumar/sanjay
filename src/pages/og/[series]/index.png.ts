import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard } from '../../../utils/og';
import { series } from '../../../data/series';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return series
    .filter((s) => posts.some((post) => post.data.series === s.id))
    .map((s) => ({ params: { series: s.id } }));
};

// The share card for a series' own page, so a link to /posts/typescript/
// shows the series rather than a blank image.
export const GET: APIRoute = async ({ params }) => {
  const current = series.find((s) => s.id === params.series);
  if (!current) return new Response(null, { status: 404 });

  const posts = await getCollection('blog');
  const count = posts.filter((post) => post.data.series === current.id).length;

  const png = await renderOgCard({
    title: `${current.name} notes`,
    kicker: 'Series',
    meta: `${count} ${count === 1 ? 'note' : 'notes'}`,
    footer: current.dateRange,
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
