# SEO Notes

Working notes for the recurring SEO and AI-discovery review. What each run did is in `LOG.md`.
This file holds the state a future run needs so it does not re-derive it.

## Already in place (verified 2026-09-19, 2026-10-03 and 2026-10-10, don't re-audit from scratch)

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

- Cross-posted articles (sourceUrl, in `content/writing/`) point their canonical at nextw.com on
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
  Experience" on 2026-10-10, three weeks after the rebuild. Check whether it has refreshed.
- Bing (check via DuckDuckGo, since bing.com serves junk to scripted queries) had indexed only
  the home page as of 2026-10-10, with the legacy title and snippet. IndexNow returns 200 on
  every deploy and on manual resubmission, so the pipeline works; Bing just has not recrawled.
  If it is still stale after Luke has checked Bing Webmaster Tools, stop re-checking each run.
- Projects moved from `/writing/:slug` to `/projects/:slug` on 2026-09-29. The old URLs are
  meta-refresh redirect pages (`noindex`, canonical at the new URL). Their `.md` copies are 404
  and can't be redirected on GitHub Pages. Leave both.
- theorg.com and happenstance.ai carry an older job title than the site (theorg.com rechecked
  2026-10-10, still stale). LinkedIn's search-result title had caught up by 2026-10-10. Only Luke
  can change the other two.
- A project's JSON-LD is a plain `CreativeWork`. `SoftwareSourceCode` / `SoftwareApplication`
  would be more exact, but there is no rich result for the first and the second raises Search
  Console warnings without `offers` and ratings. Considered 2026-10-03 and skipped as not worth
  the code.
- `/vocablo/privacy.txt` (legacy site) is 404 now. The App Store listing uses
  `getvocablo.com/legal/privacy.txt`, so nothing depends on it.
- `lukehollenback.me/wallpaper-generator/` is another repo's Pages site under this domain and is
  not in this sitemap. Out of scope unless Luke wants it discoverable.

- Cross-posted articles carry a `BlogPosting` whose `url` and `mainEntityOfPage` are the mirror
  URL while the canonical is nextw.com. That is consistent across all four mirrors and the
  canonical wins, so it is not a conflict. Noted 2026-10-10 so it is not re-examined.

## Useful checks

```bash
curl -s https://lukehollenback.me/sitemap-0.xml
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.lukehollenback.me/
```

WebSearch in extended mode for `"Luke Hollenback" lukehollenback.me` shows what the indexes hold
for the name; standard mode returns unrelated people. For Bing's view, open DuckDuckGo in the
browser pane with `site:lukehollenback.me` (bing.com itself returns unrelated results to a fresh
session). The deploy's IndexNow step prints nothing on success; a manual POST with `-w
'%{http_code}'` shows the code.
