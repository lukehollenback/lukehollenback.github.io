# SEO Log

One entry per review run, newest first. Standing context lives in `NOTES.md`.

## 2026-10-10

No site changes. The audit found nothing broken. The one real finding is off-site: the Bing index
is still stale three weeks after the rebuild, despite IndexNow accepting every ping.

**Audited:** every sitemap URL plus the four cross-posted articles (status, title, description,
canonical, OG, JSON-LD, `h1`, image `alt` and dimensions), the new mirror 'The AI Stack Trifecta'
(deployed 2026-10-09: canonical at nextw.com which self-canonicalizes and returns 200, left out of
the sitemap, present in llms.txt, llms-full.txt, RSS and the Writing index, its three diagrams
served as sized WebP with alt text, `.md` copy answers 200), the project redirect pages, host
variants, robots.txt, the IndexNow key file, the 404 page, the 75 outbound links and assets,
and the deploy log for the 2026-10-09 push.

**Found, left alone:**

- The Gartner link in the new article returns 403 to every non-browser client (bot wall). It
  works for readers. Not a broken link.
- DuckDuckGo, which is Bing-backed, lists only the home page for `site:lukehollenback.me`, with
  the legacy title and a legacy Firetale snippet. Bing has not recrawled since the rebuild even
  though IndexNow has returned 200 on every deploy. A manual resubmission of all nineteen
  sitemap URLs this run also returned 200 from api.indexnow.org and from bing.com/indexnow.
  IndexNow queues a crawl; it does not force one, and Bing has so far not spent the crawl.
- Google's index still shows the legacy title for the home page (same as 2026-10-03).
- theorg.com still says 'Senior Director Of Software Engineering & AI'. LinkedIn's title in
  search results now reads 'VP @ Nextworld', so that one has caught up.
- The `/writing` title is 67 characters and may be clipped in results. Not worth a content edit.

**Needs Luke:** Bing Webmaster Tools and Search Console checks. Details in the run summary.

## 2026-10-03

No site changes. The audit found nothing broken, and nothing worth adding to a site this size.

**Audited:** every sitemap URL plus the three cross-posted articles (status, title, description,
canonical, OG, JSON-LD, `h1`, image `alt`), the new `/projects` pages from the 2026-09-29 split,
the thirteen `/writing/:slug` redirect pages (each is `noindex` with a canonical at the new
URL), robots.txt, llms.txt, llms-full.txt, RSS, the 404 page, all 53 outbound links and assets
(all 200), and that the live site matches `main` (last deploy 2026-09-30).

**Found, left alone:**

- A web search for the domain still returns the legacy title, two weeks after the rebuild.
- The old Markdown copies (`/writing/<project>.md`) are 404 since the split. GitHub Pages cannot
  redirect a non-HTML file, and llms.txt already lists the new paths.
- Third-party profiles (theorg.com, happenstance.ai) still describe Luke as Director or Senior
  Director of Software Engineering, which disagrees with the site's 'Vice President of Product
  Development'.

**Needs Luke:** request re-indexing of the home page, check the Pages report for the old project
URLs, bring the outside profiles in line with the current title, and the still-open Bluesky
`sameAs` question. Details in the run summary.

## 2026-09-19

First run. The rebuild (deployed 2026-09-18) already covers nearly all of technical SEO and AI
discovery, so this run audited and fixed one real defect.

**Audited:** status codes and redirects for every route plus `http`, `www` and `github.io`
variants, head metadata and JSON-LD on each page type, sitemap, robots.txt, llms.txt, RSS,
IndexNow key file, image `alt`/dimensions, internal links (none broken), that the canonical
targets on nextw.com return 200 and self-canonicalize, legacy-site URLs, Bluesky handle
verification, and current search results for the name.

**Changed:**

- The sitemap no longer lists the three cross-posted articles. Their canonical points at
  nextw.com, and a sitemap entry is itself a canonical hint, so listing them sent search engines
  mixed signals. Search Console would have reported them as 'Alternate page with proper
  canonical tag'. The deploy's IndexNow ping reads the sitemap, so it stops submitting them too.
  - Replaced `@astrojs/sitemap` with two small endpoints (`src/pages/sitemap-index.xml.ts`,
    `sitemap-0.xml.ts`) built from the same data as llms.txt. The filenames are unchanged, so
    Search Console, robots.txt and the workflow keep working.
  - Moved the cross-post canonical rule into `canonicalSourceFor()` so the page and the sitemap
    share it.
  - Spec S4 updated. New tests check that the sitemap equals the set of indexable,
    self-canonical pages, and that every built page is covered by that check.
  - `@types/node` had only been installed through the sitemap plugin. It is now an explicit
    pinned dev dependency, which keeps `astro check` passing.

**Needs Luke:** see the run summary: request re-indexing (stale legacy title in results),
resubmit the sitemap, and decide on Bluesky in `sameAs`.
