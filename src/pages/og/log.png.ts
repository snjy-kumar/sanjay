import type { APIRoute } from 'astro';
import { renderOgCard } from '../../utils/og';

// The card used when the raw log is shared.
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: 'The log',
    kicker: 'Learning log',
    meta: 'The unedited sessions',
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
