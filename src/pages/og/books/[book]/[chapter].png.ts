import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard } from '../../../../utils/og';
import { bookBySlug } from '../../../../data/books';
import { chapterBook, chapterLabel, chapterNumber } from '../../../../utils/chapters';

export const getStaticPaths: GetStaticPaths = async () => {
  const all = await getCollection('chapters');
  return all.map((chapter) => ({
    params: { book: chapterBook(chapter), chapter: chapterNumber(chapter.data.number) },
    props: { chapter },
  }));
};

// The share card for one chapter page: the chapter's title, and which book
// and chapter it is.
export const GET: APIRoute = async ({ params, props }) => {
  const book = bookBySlug(params.book ?? '');
  const chapter = (props as { chapter?: Parameters<typeof chapterLabel>[0] }).chapter;
  if (!book || !chapter) return new Response(null, { status: 404 });

  const png = await renderOgCard({
    title: chapter.data.title,
    kicker: `${book.title} · ${chapterLabel(chapter)}`,
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
