import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    series: z.string(),
    seriesOrder: z.number(),
    date: z.coerce.date(),
    readTime: z.string(),
    description: z.string(),
  }),
});

export const collections = { blog };
