import type { APIRoute } from 'astro';
import { renderOgCard } from '../../utils/og';

// The card used when the learning path itself is shared.
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: 'The learning path',
    kicker: 'Learning log',
    meta: 'Every note, in order',
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
