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

## Discovery

Everything that helps search engines and AI agents is generated at build time from the same
data the pages use (`src/data/`, `content/writing/`), so there is nothing to keep in sync:

- `/llms.txt` and `/llms-full.txt` → site map and full site text for language models.
- `/writing/:slug.md` → every entry as standalone Markdown. `/rss.xml` → feed.
- `/sitemap-index.xml` → every page that is its own canonical. Cross-posts are left out so the
  original keeps the search credit.
- One JSON-LD graph per page (`src/lib/structured-data.ts`).
- `robots.txt` welcomes AI crawlers by name. The deploy pings IndexNow with every sitemap URL.

Two assets are rendered by hand and committed. Re-run after changing their sources:

```bash
node scripts/generate-og-image.mjs   # scripts/og-image.html → public/og-image.png (needs Chrome or Edge)
node scripts/generate-favicons.mjs   # public/favicon.svg → favicon.ico, apple-touch-icon.png
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml` (check → test → build → Pages).

One-time setup:

1. Create a form at Formspree and copy its endpoint URL.
2. Repo → Settings → Secrets and variables → Actions → Variables → add
   `PUBLIC_CONTACT_ENDPOINT` with that URL.
3. Repo → Settings → Pages → Source: GitHub Actions. Custom domain: `lukehollenback.me`
   (`public/CNAME` already declares it).
