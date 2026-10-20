import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard } from '../../../utils/og';
import { series } from '../../../data/series';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => {
    const [seriesId, slug] = post.id.split('/');
    return { params: { series: seriesId, slug }, props: { post } };
  });
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

// One share card per note, so a post of it on LinkedIn or X shows the note
// instead of a blank image.
export const GET: APIRoute = async ({ props }) => {
  const post = props.post;
  const seriesName = series.find((s) => s.id === post.data.series)?.name ?? post.data.series;

  const png = await renderOgCard({
    title: post.data.title,
    kicker: seriesName,
    meta: dateFormatter.format(post.data.date),
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
