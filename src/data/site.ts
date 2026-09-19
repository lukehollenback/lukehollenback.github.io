export const SITE = {
  name: 'Luke Hollenback',
  email: 'hello@lukehollenback.me',
  linkedin: 'https://www.linkedin.com/in/lukehollenback',
  github: 'https://github.com/lukehollenback',
  location: 'Denver, Colorado',
} as const;

export const NAV_ITEMS = [
  { label: 'Bio', href: '/bio' },
  { label: 'Services', href: '/services' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
] as const;

export const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Luke Hollenback',
  jobTitle: 'Vice President of Product Development',
  worksFor: { '@type': 'Organization', name: 'Nextworld' },
  address: { '@type': 'PostalAddress', addressLocality: 'Denver', addressRegion: 'CO', addressCountry: 'US' },
  description:
    'Product and engineering leader. Independent advisor to founders on product strategy, architecture, and AI initiatives.',
  knowsAbout: [
    'Product strategy',
    'Enterprise software',
    'No-code platforms',
    'Machine learning',
    'Agentic AI',
    'Engineering leadership',
  ],
  sameAs: [SITE.linkedin, SITE.github],
};
