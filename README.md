# lukehollenback.me

Static site built with [Astro](https://astro.build), hosted on GitHub Pages. No backend.

- Spec → `docs/specs/site.md`
- Design reference and copy deck → `design/Portfolio.dc.html` (see `HANDOFF.md`)

## Develop

```bash
cp .env.example .env   # then set PUBLIC_CONTACT_ENDPOINT
npm install
npm run dev
```

`npm test` builds the site against fixture articles and asserts on the output. `npm run check`
type-checks.

## Write an article

Add a Markdown file to `content/writing/` named `yyyy-mm-dd-slug.md`. The date prefix keeps the
folder sorted and must match the front-matter `date`; the URL is just `/writing/slug`. Open that folder in
Obsidian if you like; commit and push to publish.

```markdown
---
title: What a platform should refuse to do
date: 2026-07-14
summary: One or two sentences. Shown on the index, under the title, and as the meta description.
tags: [engineering, platforms]
sourceUrl: https://example.com/original   # optional → 'First published at' card + canonical URL
sourceName: Example Blog                  # optional → defaults to the host of sourceUrl
draft: true                               # optional → visible in dev, never built
---
```

Read time is computed. Invalid front-matter fails the build. External links open in a new tab. Images go in
`content/writing/assets/` and are referenced as `./assets/name.png`.

### Projects

A project is an entry tagged `project`. Keep them all the same shape: one-line `summary`,
`sourceUrl` + `sourceName` for its primary home (the card reads 'Project home' and the canonical
URL stays on this site), an optional short body that does not repeat the summary, screenshots,
then any secondary links on a closing line. A body is optional.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` (check → test → build → Pages).

One-time setup:

1. Create a form at Formspree and copy its endpoint URL.
2. Repo → Settings → Secrets and variables → Actions → Variables → add
   `PUBLIC_CONTACT_ENDPOINT` with that URL.
3. Repo → Settings → Pages → Source: GitHub Actions. Custom domain: `lukehollenback.me`
   (`public/CNAME` already declares it).
