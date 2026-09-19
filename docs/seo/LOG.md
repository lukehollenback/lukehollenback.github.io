# SEO Log

One entry per review run, newest first. Standing context lives in `NOTES.md`.

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
