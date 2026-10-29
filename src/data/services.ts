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
    name: 'Speaking & Writing',
    tagline: 'Talks and essays on shipping AI.',
    shape: 'Keynotes, panels, briefings, and essays. Scoped per event.',
    body: "I talk and write about what it actually takes to ship AI into enterprise software: the architecture decisions, the organizational ones, and the features that should never have been built. I'm a fit for smaller conferences that want a practitioner on stage, and for investment firms that want a closed-door session with their partners or portfolio companies. Everything I say in public is tested against things I've shipped.",
    deliverables: [
      'Keynotes and panels at conferences.',
      'Closed-door briefings for investment firms and their portfolio companies.',
      'Podcast and interview appearances.',
      'Guest essays and columns, with samples on the Writing page.',
    ],
  },
] as const;
