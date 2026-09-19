# SEO Notes

Working notes for the recurring SEO and AI-discovery review. What each run did is in `LOG.md`.
This file holds the state a future run needs so it does not re-derive it.

## Already in place (verified 2026-09-19, don't re-audit from scratch)

- Per-page title, description, canonical, OG/Twitter, `og:image` 1200×630, robots max-snippet.
- One JSON-LD `@graph` per page: Person, WebSite, ProfilePage, Service, ItemList, BlogPosting /
  CreativeWork, BreadcrumbList (`src/lib/structured-data.ts`, spec D1–D2).
- `llms.txt`, `llms-full.txt`, `/writing/:slug.md`, `rss.xml`, `robots.txt` naming AI crawlers,
  IndexNow ping on deploy (spec D4–D9).
- Host: `http://`, `www.` and `lukehollenback.github.io` all 301 to `https://lukehollenback.me/`.
- `/bio.html` and `/index.html` also answer 200. That is GitHub Pages behavior. The canonical tag
  handles it, so leave it.
- `/bio/` and `/writing/` (trailing slash) are 404. GitHub Pages can't redirect, and nothing
  links there. Leave it unless Search Console reports them.

## Deliberate choices. Don't "fix" these.

- Cross-posted articles (sourceUrl, no `project` tag) point their canonical at nextw.com on
  purpose (spec S5). They are left out of the sitemap for the same reason.
- No `lastmod` in the sitemap. There is no `updated` front-matter field, so the only available
  date is the publish date, which would be wrong after an edit. Google ignores `lastmod` once it
  proves inaccurate. Revisit only if an `updated` field is added.
- `Person` has no `image` until a headshot exists (spec Deferred).
- `Person.sameAs` has LinkedIn, GitHub, itch.io. The Bluesky account `@lukehollenback.me`
  (DNS-verified, bio links back here) and ko-fi / SoundCloud were left out. Luke had already
  removed Bluesky from the legacy site, so adding it is his call, not a fix. Asked in the
  2026-09-19 report.

## Open items / watch list

- Search results still showed the legacy title "Luke Hollenback · Leadership · Innovation ·
  Experience" on 2026-09-19, the day after the rebuild went live. Check whether it has refreshed.
- `/vocablo/privacy.txt` (legacy site) is 404 now. The App Store listing uses
  `getvocablo.com/legal/privacy.txt`, so nothing depends on it.
- `lukehollenback.me/wallpaper-generator/` is another repo's Pages site under this domain and is
  not in this sitemap. Out of scope unless Luke wants it discoverable.

## Useful checks

```bash
curl -s https://lukehollenback.me/sitemap-0.xml
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.lukehollenback.me/
```

WebSearch for "Luke Hollenback" shows what the indexes currently hold for the name.
