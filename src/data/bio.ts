/** A run of bio text. Highlighted runs get the pine underline; there are exactly four, by design. */
export type BioSegment = string | { highlight: string };

export const BIO_HEADING = 'I like problems bigger than code.';

export const BIO_PARAGRAPHS: BioSegment[][] = [
  [
    'I started in avionics, writing embedded software that had to work every time. Standards compliance, real-time constraints, and a certification process that created shelves full of paperwork. ',
    { highlight: 'I learned to design for the failure case first.' },
  ],
  [
    "After a few consulting projects in the fintech and non-profit sectors, I moved on to Nextworld, a Denver-area startup. I've spent most of my career here building a no-code development platform that abstracts the hardest technical concepts for citizen developers with real business problems.",
  ],
  [
    'I came up through that organization, from engineer to senior director. Now I run product development as VP. ',
    { highlight: "I set the direction for Nextworld's AI-native evolution and shipped it" },
    ". Our Agentic Development product — an agentic software shop that builds enterprise-grade applications — was my call, and it took convincing Nextworld's founders to jump.",
  ],
  [
    'But ',
    { highlight: 'some machines are made of people, not code' },
    ". I've run an organization at 70 people and at 12. I've led teams through awkward sizes, painful eras, AI-induced identity crises, tight market-driven deadlines, and exciting launches. I can coach a team and roll up my own sleeves. I've hired well and badly, and I know where to focus my energy and when to trust my leaders.",
  ],
  [
    "I work with founders directly. Often they have a working product and a roadmap they don't trust, or an AI initiative that needs someone to say out loud whether it's real. ",
    { highlight: "I'm at my best early, when the vision is still blurry." },
  ],
];

export function bioParagraphText(segments: BioSegment[]): string {
  return segments.map((segment) => (typeof segment === 'string' ? segment : segment.highlight)).join('');
}

export const TIMELINE = [
  { years: '2026 — Present', role: 'Independent Consultant', org: 'Product, engineering, and AI advisory for founders.' },
  { years: '2025 — Present', role: 'Vice President of Product Development', org: 'Nextworld · Leading the creation of an AI-native enterprise platform.' },
  { years: '2018 — 2025', role: 'Engineering & Product Leadership', org: 'Nextworld · Built the platform layer — a real-time cubing engine, a constraint planning system, a no-code ML workbench. Three patent filings.' },
  { years: '2015 — 2018', role: 'Software Engineer', org: 'Astronics Ballard Technology · Embedded avionics platforms.' },
  { years: '2013 — 2017', role: 'B.S. Computer Science', org: 'Seattle Pacific University · Focus on machine learning research.' },
] as const;

export const PATENTS = [
  { title: 'Realtime Data Summarization and Aggregation with Cubes', number: 'US12505084B2 · Granted', href: 'https://patents.google.com/patent/US12505084B2/en' },
  { title: 'Building and Executing Machine Learning Models via a No-Code Toolkit', number: 'US20240220910A1', href: 'https://patents.google.com/patent/US20240220910A1/en' },
  { title: 'Metadata-Driven Constraint Planning Engine', number: 'US20210248531A1', href: 'https://patents.google.com/patent/US20210248531A1/en' },
] as const;
