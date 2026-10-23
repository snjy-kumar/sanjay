import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard } from '../../../utils/og';
import { bookBySlug } from '../../../data/books';

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection('books');
  return pages.map((page) => ({ params: { slug: page.id } }));
};

// The share card for one book page: the title, the author, and that it is
// read chapter by chapter.
export const GET: APIRoute = async ({ params }) => {
  const book = bookBySlug(params.slug ?? '');
  if (!book) return new Response(null, { status: 404 });

  const png = await renderOgCard({
    title: book.title,
    kicker: 'Books · chapter by chapter',
    meta: book.author,
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
