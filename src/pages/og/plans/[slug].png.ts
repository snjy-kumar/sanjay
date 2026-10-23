import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgCard } from '../../../utils/og';
import { planById, planGroups } from '../../../data/plans';

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await getCollection('plans');
  return entries.map((entry) => ({ params: { slug: entry.id } }));
};

// The share card for one plan: its short name, its group and how long it
// takes, so a shared link says which plan it is.
export const GET: APIRoute = async ({ params }) => {
  const plan = planById(params.slug ?? '');
  if (!plan) return new Response(null, { status: 404 });
  const group = planGroups.find((g) => g.id === plan.group)!;

  const png = await renderOgCard({
    title: plan.label,
    kicker: `Plan · ${group.name}`,
    meta: plan.length.split(',')[0],
    footer: 'Sanjay Kumar Thakur',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
