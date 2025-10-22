// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap({
    filter: (page) => !page.endsWith('/panier') && !page.endsWith('/success')
  })],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'static',
  adapter: vercel(),
  site: 'https://www.kraze.fr',

});
