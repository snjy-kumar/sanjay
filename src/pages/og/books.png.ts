import type { APIRoute } from 'astro';
import { renderOgCard } from '../../utils/og';
import { books } from '../../data/books';

// The card used when the books index is shared.
export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: 'The books behind the learning path',
    kicker: 'Books',
    meta: `${books.length} books, chapter by chapter`,
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
