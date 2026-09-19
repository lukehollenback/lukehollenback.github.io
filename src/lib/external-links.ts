import type { HastPluginDefinition } from 'satteri';

const EXTERNAL_HREF = /^https?:\/\//;

/** Markdown has no syntax for link targets, so external links in article bodies get theirs at build time. */
export const externalLinksPlugin: HastPluginDefinition = {
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== 'string' || !EXTERNAL_HREF.test(href)) return;
      ctx.setProperty(node, 'target', '_blank');
      ctx.setProperty(node, 'rel', 'noopener');
    },
  },
};
