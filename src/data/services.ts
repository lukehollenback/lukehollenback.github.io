/** Shown as a summary list on the home page and in full on the services page. */
export const SERVICES = [
  {
    num: '01',
    name: 'Product Strategy',
    tagline: 'Opinionated roadmaps.',
    shape: 'Often two to six weeks, fractional or project-based.',
    body: 'You have a product in market and a roadmap assembled from whoever asked loudest. I work through your support tickets, churn reasons, sales objections, the backlog, combine it with my market and industry awareness, and come back with a sequence you can argue for in a board meeting, plus the list of things you should stop doing.',
    deliverables: [
      'A written strategy memo, not a deck.',
      'Prioritized roadmap with the reasoning kept in.',
      'The explicit not-doing list.',
      'Working sessions with your PM and eng leads.',
    ],
  },
  {
    num: '02',
    name: 'Engineering & AI Advisory',
    tagline: 'Architecture reviews and honest scoping.',
    shape: 'Often a retainer, a few hours a week.',
    body: "First, I review the architecture you're about to commit to before it hardens — data model, platform boundaries, and stack layers. Then I tell you whether an AI feature is worth building, buying, or skipping. And finally, what the evaluation, guardrails, and failure handling need to look like. I have shipped AI into enterprise software where wrong answers had consequences.",
    deliverables: [
      'Architecture review with tradeoffs written down.',
      'AI feasibility call, with the case against included.',
      'Eval and guardrail design.',
      'Standing time with your senior engineers.',
    ],
  },
  {
    num: '03',
    name: 'Website Development',
    tagline: 'Built to be found, by people and agents.',
    shape: 'Often one to three weeks, fixed price.',
    body: "Buyers now arrive two ways: a search result, or an answer some model wrote about you. Both reward the same things — semantic markup, structured data, plain text a crawler can actually read, and pages that load fast. Static by default, content in files you control, hosted for pennies. No page builder you'll be fighting with.",
    deliverables: [
      'Design and build, mobile first.',
      'Markdown content pipeline you own.',
      'Structured data and machine-readable markup.',
      'Technical SEO, analytics, and handoff.',
    ],
  },
] as const;
