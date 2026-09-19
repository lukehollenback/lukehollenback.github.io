# lukehollenback.me

Static site built with [Astro](https://astro.build), hosted on GitHub Pages. No backend.

- Spec → `docs/specs/site.md`

## Develop

```bash
cp .env.example .env   # then set PUBLIC_CONTACT_ENDPOINT
npm install
npm run dev
```

`npm test` builds the site against fixture articles and asserts on the output. `npm run check`
type-checks.

## Write an Article

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

### The Source Card

Setting `sourceUrl` gives an entry a source card under its summary, and a `↗ sourceName` marker on
the index. What the card says, and what it does to search engines, depends on whether the entry
is tagged `project`:

| | Article (no `project` tag) | Project (tagged `project`) |
|---|---|---|
| Card label | First published at | Project home |
| Meaning | The same text first ran somewhere else. | The thing itself lives somewhere else. |
| Canonical URL | Points to `sourceUrl`, so the original keeps the search credit. | Stays on this site. A repo or store page is not another copy of the entry. |
| Meta line | `Sep 2026 · 5 min read` | `Sep 2026` |

The `project` tag is the only switch. There is no separate front-matter field to keep in sync.

### Projects

Keep every project the same shape: one-line `summary`, `sourceUrl` + `sourceName` for its primary
home, an optional short body that does not repeat the summary, screenshots, then any secondary
links on a closing line. A body is optional.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` (check → test → build → Pages).

One-time setup:

1. Create a form at Formspree and copy its endpoint URL.
2. Repo → Settings → Secrets and variables → Actions → Variables → add
   `PUBLIC_CONTACT_ENDPOINT` with that URL.
3. Repo → Settings → Pages → Source: GitHub Actions. Custom domain: `lukehollenback.me`
   (`public/CNAME` already declares it).
