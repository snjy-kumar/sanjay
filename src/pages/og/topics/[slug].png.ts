import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard } from '../../../utils/og';
import { topicBySlug } from '../../../data/tags';
import { usedTopics } from '../../../utils/notes';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return usedTopics(posts).map((slug) => ({ params: { slug } }));
};

// The share card for a topic page, so a link to /topics/immutability/
// shows the topic rather than a blank image.
export const GET: APIRoute = async ({ params }) => {
  const topic = topicBySlug(params.slug ?? '');
  if (!topic) return new Response(null, { status: 404 });

  const posts = await getCollection('blog');
  const count = posts.filter((post) => post.data.tags.includes(topic.slug)).length;

  const png = await renderOgCard({
    title: topic.label,
    kicker: 'Topic',
    meta: `${count} ${count === 1 ? 'note' : 'notes'}`,
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
