export const SITE = {
  url: 'https://lukehollenback.me',
  name: 'Luke Hollenback',
  tagline: 'Independent product, engineering, and AI advisory.',
  statement: "I've shipped enough to know what to cut.",
  description:
    'Luke Hollenback is Vice President of Product Development at Nextworld and an independent advisor to founders on product strategy, architecture, and AI initiatives. Twelve years building enterprise software; three patent filings.',
  email: 'hello@lukehollenback.me',
  linkedin: 'https://www.linkedin.com/in/lukehollenback',
  github: 'https://github.com/lukehollenback',
  itch: 'https://lukehollenback.itch.io',
  location: 'Denver, Colorado',
  shareImage: { path: '/og-image.png', width: 1200, height: 630 },
} as const;

export const NAV_ITEMS = [
  { label: 'Bio', href: '/bio' },
  { label: 'Services', href: '/services' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
] as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
