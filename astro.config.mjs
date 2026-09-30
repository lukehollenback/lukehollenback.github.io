import { readdirSync } from 'node:fs';
import { defineConfig, envField } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { SITE } from './src/data/site.ts';
import { externalLinksPlugin } from './src/lib/external-links.ts';

// Projects lived at /writing/:slug until 2026-09-29 and those URLs went to search engines, so each keeps a redirect page.
const projectsDir = process.env.PROJECTS_DIR ?? './content/projects';
const projectRedirects = Object.fromEntries(
  readdirSync(projectsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, ''))
    .map((slug) => [`/writing/${slug}`, `/projects/${slug}`]),
);

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  redirects: projectRedirects,
  markdown: { processor: satteri({ hastPlugins: [externalLinksPlugin] }) },
  env: {
    schema: {
      PUBLIC_CONTACT_ENDPOINT: envField.string({ context: 'client', access: 'public', url: true }),
    },
  },
});
