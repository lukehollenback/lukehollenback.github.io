import { defineConfig, envField } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { SITE } from './src/data/site.ts';
import { externalLinksPlugin } from './src/lib/external-links.ts';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  markdown: { processor: satteri({ hastPlugins: [externalLinksPlugin] }) },
  env: {
    schema: {
      PUBLIC_CONTACT_ENDPOINT: envField.string({ context: 'client', access: 'public', url: true }),
    },
  },
});
