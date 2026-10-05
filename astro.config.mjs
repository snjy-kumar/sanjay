// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // GitHub project pages serve from https://snjy-kumar.github.io/sanjay/
  // (confirmed via the repo's Pages settings) — every asset and internal
  // link must live under this base path.
  site: 'https://snjy-kumar.github.io',
  base: '/sanjay',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), mdx()]
});
