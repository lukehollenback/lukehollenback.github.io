import { BIO_HEADING, BIO_PARAGRAPHS, PATENTS, TIMELINE, bioParagraphText } from '../data/bio';
import { SERVICES } from '../data/services';
import { NAV_ITEMS, SITE, absoluteUrl } from '../data/site';
import type { Article } from './articles';
import { formatMonthYear, isProject, sourceLabelFor, standaloneMarkdown } from './writing';

const PAGE_NOTES: Record<string, string> = {
  '/bio': 'Career story, résumé, and patent filings.',
  '/services': 'The three ways Luke works with founders, with what each engagement delivers.',
  '/writing': 'Articles on AI, platforms, and engineering leadership, plus personal projects.',
  '/contact': `Contact form. Email: ${SITE.email}.`,
};

/** One entry as self-contained Markdown: what `/writing/:slug.md` serves and what llms-full.txt embeds. */
export function entryMarkdown(article: Article, headingLevel = 1): string {
  const { data } = article;
  const facts = [`Published: ${formatMonthYear(data.date)}`];
  if (data.tags.length > 0) facts.push(`Tags: ${data.tags.join(', ')}`);
  if (data.sourceUrl) facts.push(`${sourceLabelFor(data.tags)}: ${data.sourceUrl}`);

  const sections = [`${'#'.repeat(headingLevel)} ${data.title}`, `> ${data.summary}`, facts.join('  \n')];
  const body = standaloneMarkdown(article.body ?? '');
  if (body) sections.push(headingLevel === 1 ? body : demoteHeadings(body, headingLevel));
  return `${sections.join('\n\n')}\n`;
}

/** Keeps an embedded entry's own headings beneath the heading it is nested under. */
function demoteHeadings(markdown: string, by: number): string {
  return markdown.replace(/^(#{1,5}) /gm, (_, hashes: string) => `${'#'.repeat(Math.min(6, hashes.length + by - 1))} `);
}

function entryLinks(articles: Article[]): string {
  return articles
    .map(({ id, data }) => `- [${data.title}](${absoluteUrl(`/writing/${id}.md`)}): ${data.summary}`)
    .join('\n');
}

/** llmstxt.org index: a short map of the site for agents, linking to Markdown wherever it exists. */
export function llmsIndex(articles: Article[]): string {
  const pages = NAV_ITEMS.map((item) => `- [${item.label}](${absoluteUrl(item.href)}): ${PAGE_NOTES[item.href]}`).join('\n');
  const sections = [
    `# ${SITE.name}`,
    `> ${SITE.description}`,
    `${SITE.tagline} Based in ${SITE.location}. The complete text of this site is available as one file at ${absoluteUrl('/llms-full.txt')}.`,
    `## Pages\n\n${pages}`,
    `## Articles\n\n${entryLinks(articles.filter(({ data }) => !isProject(data.tags)))}`,
    `## Projects\n\n${entryLinks(articles.filter(({ data }) => isProject(data.tags)))}`,
    `## Optional\n\n- [RSS feed](${absoluteUrl('/rss.xml')})\n- [Sitemap](${absoluteUrl('/sitemap-index.xml')})\n- [LinkedIn](${SITE.linkedin})\n- [GitHub](${SITE.github})`,
  ];
  return `${sections.join('\n\n')}\n`;
}

/** The whole site as one Markdown document. */
export function llmsFull(articles: Article[]): string {
  const resume = TIMELINE.map((job) => `- ${job.years}: ${job.role}. ${job.org}`).join('\n');
  const patents = PATENTS.map((patent) => `- [${patent.title}](${patent.href}) (${patent.number})`).join('\n');
  const services = SERVICES.map((service) =>
    [
      `### ${service.name}`,
      `${service.tagline} ${service.shape}`,
      service.body,
      `What you get:\n\n${service.deliverables.map((deliverable) => `- ${deliverable}`).join('\n')}`,
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
    `## Writing and Projects\n\n${articles.map((article) => entryMarkdown(article, 3)).join('\n')}`,
  ];
  return `${sections.join('\n\n').trim()}\n`;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function rssFeed(articles: Article[]): string {
  const items = articles
    .map(({ id, data }) => {
      const url = absoluteUrl(`/writing/${id}`);
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
