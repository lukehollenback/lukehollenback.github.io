import { BIO_HEADING, BIO_PARAGRAPHS, PATENTS, TIMELINE, bioParagraphText } from '../data/bio';
import { SERVICES, serviceTextMarkdown } from '../data/services';
import { NAV_ITEMS, SITE, absoluteUrl } from '../data/site';
import type { Entry } from './entries';
import { canonicalSourceFor, entryPath, formatMonthYear, sourceLabelFor, standaloneMarkdown, type EntryKind } from './writing';

const PAGE_NOTES: Record<string, string> = {
  '/bio': 'Career story, résumé, and patent filings.',
  '/services': 'The three ways Luke works with founders, with what each engagement delivers.',
  '/writing': 'Articles on AI, platforms, and engineering leadership.',
  '/projects': 'Personal projects: an iOS app, games, and open source tools.',
  '/contact': `Contact form. Email: ${SITE.email}.`,
};

/** One entry as self-contained Markdown: what `/writing/:slug.md` and `/projects/:slug.md` serve and what llms-full.txt embeds. */
export function entryMarkdown(kind: EntryKind, entry: Entry, headingLevel = 1): string {
  const { data } = entry;
  const facts = [`Published: ${formatMonthYear(data.date)}`];
  if (data.tags.length > 0) facts.push(`Tags: ${data.tags.join(', ')}`);
  if (data.sourceUrl) facts.push(`${sourceLabelFor(kind)}: ${data.sourceUrl}`);

  const sections = [`${'#'.repeat(headingLevel)} ${data.title}`, `> ${data.summary}`, facts.join('  \n')];
  const body = standaloneMarkdown(entry.body ?? '');
  if (body) sections.push(headingLevel === 1 ? body : demoteHeadings(body, headingLevel));
  return `${sections.join('\n\n')}\n`;
}

/** Keeps an embedded entry's own headings beneath the heading it is nested under. */
function demoteHeadings(markdown: string, by: number): string {
  return markdown.replace(/^(#{1,5}) /gm, (_, hashes: string) => `${'#'.repeat(Math.min(6, hashes.length + by - 1))} `);
}

function entryLinks(kind: EntryKind, entries: Entry[]): string {
  return entries.map(({ id, data }) => `- [${data.title}](${absoluteUrl(`${entryPath(kind, id)}.md`)}): ${data.summary}`).join('\n');
}

/** llmstxt.org index: a short map of the site for agents, linking to Markdown wherever it exists. */
export function llmsIndex(articles: Entry[], projects: Entry[]): string {
  const pages = NAV_ITEMS.map((item) => `- [${item.label}](${absoluteUrl(item.href)}): ${PAGE_NOTES[item.href]}`).join('\n');
  const sections = [
    `# ${SITE.name}`,
    `> ${SITE.description}`,
    `${SITE.tagline} Based in ${SITE.location}. The complete text of this site is available as one file at ${absoluteUrl('/llms-full.txt')}.`,
    `## Pages\n\n${pages}`,
    `## Articles\n\n${entryLinks('writing', articles)}`,
    `## Projects\n\n${entryLinks('projects', projects)}`,
    `## Optional\n\n- [RSS feed](${absoluteUrl('/rss.xml')})\n- [Sitemap](${absoluteUrl('/sitemap-index.xml')})\n- [LinkedIn](${SITE.linkedin})\n- [GitHub](${SITE.github})`,
  ];
  return `${sections.join('\n\n')}\n`;
}

/** The whole site as one Markdown document. */
export function llmsFull(articles: Entry[], projects: Entry[]): string {
  const resume = TIMELINE.map((job) => `- ${job.years}: ${job.role}. ${job.org}`).join('\n');
  const patents = PATENTS.map((patent) => `- [${patent.title}](${patent.href}) (${patent.number})`).join('\n');
  const services = SERVICES.map((service) =>
    [
      `### ${service.name}`,
      `${service.tagline} ${service.shape}`,
      serviceTextMarkdown(service.body),
      `What you get:\n\n${service.deliverables.map((deliverable) => `- ${serviceTextMarkdown(deliverable)}`).join('\n')}`,
    ].join('\n\n'),
  ).join('\n\n');

  const sections = [
    `# ${SITE.name}`,
    `> ${SITE.description}`,
    `${SITE.tagline} ${SITE.statement} Based in ${SITE.location}. Contact: ${SITE.email} or ${absoluteUrl('/contact')}.`,
    `## Bio\n\n${BIO_HEADING}\n\n${BIO_PARAGRAPHS.map(bioParagraphText).join('\n\n')}`,
    `### Résumé\n\n${resume}`,
    `### Patent Filings\n\n${patents}`,
    `## Services\n\n${services}`,
    `## Writing\n\n${articles.map((article) => entryMarkdown('writing', article, 3)).join('\n')}`,
    `## Projects\n\n${projects.map((project) => entryMarkdown('projects', project, 3)).join('\n')}`,
  ];
  return `${sections.join('\n\n').trim()}\n`;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function rssFeed(articles: Entry[]): string {
  const items = articles
    .map(({ id, data }) => {
      const url = absoluteUrl(entryPath('writing', id));
      return `    <item>
      <title>${escapeXml(data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${data.date.toUTCString()}</pubDate>
      <description>${escapeXml(data.summary)}</description>
${data.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

export function sitemapIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${absoluteUrl('/sitemap-0.xml')}</loc></sitemap>
</sitemapindex>
`;
}

/** Only pages that are their own canonical: listing a cross-post here would contradict the canonical it points elsewhere. */
export function sitemap(articles: Entry[], projects: Entry[]): string {
  const paths = [
    '/',
    ...NAV_ITEMS.map((item) => item.href),
    ...articles.filter(({ data }) => !canonicalSourceFor('writing', data.sourceUrl)).map(({ id }) => entryPath('writing', id)),
    ...projects.map(({ id }) => entryPath('projects', id)),
  ];
  const urls = paths.map((path) => `  <url><loc>${escapeXml(absoluteUrl(path))}</loc></url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
