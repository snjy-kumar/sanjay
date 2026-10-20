import type { APIRoute } from 'astro';
import { renderOgCard } from '../../utils/og';

// The card used when the homepage itself is shared.
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: 'Software engineer',
    kicker: 'Pune',
    meta: 'Portfolio',
    footer: 'Sanjay Kumar Thakur · React, TypeScript, Node',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
