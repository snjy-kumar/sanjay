import type { APIRoute } from 'astro';
import { renderOgCard } from '../../utils/og';
import { plans } from '../../data/plans';

// The card used when the plans index is shared.
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: 'The plans behind the learning path',
    kicker: 'Plans',
    meta: `${plans.length} plans`,
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
