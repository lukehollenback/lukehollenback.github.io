import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { externalLinksPlugin } from './src/lib/external-links.ts';

export default defineConfig({
  site: 'https://lukehollenback.me',
  trailingSlash: 'never',
  build: { format: 'file' },
  markdown: { processor: satteri({ hastPlugins: [externalLinksPlugin] }) },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') })],
  env: {
    schema: {
      PUBLIC_CONTACT_ENDPOINT: envField.string({ context: 'client', access: 'public', url: true }),
    },
  },
});
