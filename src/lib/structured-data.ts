import { SERVICES } from '../data/services';
import { SITE, absoluteUrl } from '../data/site';

export type JsonLdNode = Record<string, unknown>;

const PERSON_REF = { '@id': absoluteUrl('/#person') };
const WEBSITE_REF = { '@id': absoluteUrl('/#website') };

/** The person and the site appear once per page; every other node points at them by @id. */
export function siteGraph(pageNodes: JsonLdNode[]): JsonLdNode {
  return { '@context': 'https://schema.org', '@graph': [personNode(), websiteNode(), ...pageNodes] };
}

function personNode(): JsonLdNode {
  return {
    '@type': 'Person',
    ...PERSON_REF,
    name: SITE.name,
    url: SITE.url,
    email: `mailto:${SITE.email}`,
    jobTitle: 'Vice President of Product Development',
    description:
      'Product and engineering leader. Independent advisor to founders on product strategy, architecture, and AI initiatives.',
    worksFor: { '@type': 'Organization', name: 'Nextworld', url: 'https://www.nextw.com' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Seattle Pacific University' },
    address: { '@type': 'PostalAddress', addressLocality: 'Denver', addressRegion: 'CO', addressCountry: 'US' },
    knowsAbout: [
      'Product strategy',
      'Enterprise software',
      'No-code platforms',
      'Machine learning',
      'Agentic AI',
      'Engineering leadership',
    ],
    sameAs: [SITE.linkedin, SITE.github, SITE.itch],
    mainEntityOfPage: absoluteUrl('/bio'),
  };
}

function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    ...WEBSITE_REF,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: 'en',
    publisher: PERSON_REF,
  };
}

/** `trail` is the path below Home; Home is always the first crumb. */
export function breadcrumbNode(trail: { name: string; path: string }[]): JsonLdNode {
  const crumbs = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function profilePageNode(path: string, name: string, description: string): JsonLdNode {
  return { '@type': 'ProfilePage', url: absoluteUrl(path), name, description, isPartOf: WEBSITE_REF, mainEntity: PERSON_REF };
}

export function serviceNodes(): JsonLdNode[] {
  return SERVICES.map((service) => ({
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.body,
    url: absoluteUrl('/services'),
    provider: PERSON_REF,
    areaServed: 'Worldwide',
  }));
}

export function entryListNode(entries: { title: string; path: string }[]): JsonLdNode {
  return {
    '@type': 'ItemList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.title,
      url: absoluteUrl(entry.path),
    })),
  };
}

interface EntryFacts {
  path: string;
  title: string;
  summary: string;
  date: Date;
  tags: string[];
  project: boolean;
  wordCount: number;
  sourceUrl?: string;
}

/** A cross-posted article is based on its source; a project is the same thing as its home. */
export function entryNode(entry: EntryFacts): JsonLdNode {
  const shared = {
    url: absoluteUrl(entry.path),
    description: entry.summary,
    datePublished: entry.date.toISOString(),
    keywords: entry.tags,
    inLanguage: 'en',
    author: PERSON_REF,
    isPartOf: WEBSITE_REF,
    image: absoluteUrl(SITE.shareImage.path),
  };

  if (entry.project) {
    return { '@type': 'CreativeWork', name: entry.title, ...shared, ...(entry.sourceUrl && { sameAs: entry.sourceUrl }) };
  }

  return {
    '@type': 'BlogPosting',
    headline: entry.title,
    ...shared,
    wordCount: entry.wordCount,
    publisher: PERSON_REF,
    mainEntityOfPage: absoluteUrl(entry.path),
    ...(entry.sourceUrl && { isBasedOn: entry.sourceUrl }),
  };
}
