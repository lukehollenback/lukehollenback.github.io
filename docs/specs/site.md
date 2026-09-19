# Spec — lukehollenback.me

Production rebuild of the Claude Design prototype (`design/Portfolio.dc.html`). The prototype is
the copy deck and the visual reference. `HANDOFF.md` lists what is kept verbatim and what is
rebuilt; this spec turns that into testable criteria.

## Architecture

- Astro, static output, hosted on GitHub Pages (custom domain via `public/CNAME`, deployed by
  `.github/workflows/deploy.yml`). There is no backend. No UI framework. Client JavaScript only
  for: theme toggle, tag filter, contact form submission.
- `site` is `https://lukehollenback.me`. `build.format: 'file'` with `trailingSlash: 'never'`
  → canonical URLs have no trailing slash (`/bio`, not `/bio/`).
- Shared content that appears on more than one page (services, site constants) lives in
  `src/data/`. Page-only copy lives in the page.
- Schibsted Grotesk is self-hosted (`@fontsource-variable/schibsted-grotesk`) → no third-party
  font request.

## Routes

| Route | Page | `h1` |
|---|---|---|
| `/` | Home | I've shipped enough to know what to cut. |
| `/bio` | Bio + résumé + patent filings | I like problems bigger than code. |
| `/services` | Services | Three ways I work with you. |
| `/writing` | Article index with tag filter | I only write about what I've shipped. |
| `/writing/:slug` | Article | Article title |
| `/contact` | Contact form | What are you stuck on? |
| `/404` | Not found | — |

- **R1.** Every route above is emitted as a static HTML file.
- **R2.** Every page has exactly one `h1`.
- **R3.** Header nav links to `/bio`, `/services`, `/writing`, `/contact`; the wordmark links to
  `/`. The link for the current section carries `aria-current="page"` (`/writing/:slug` marks
  Writing).
- **R4.** No `href="#..."` route links remain from the prototype.

## Design tokens and theming

- **T1.** Every color is a CSS custom property defined once in `src/styles/tokens.css` using
  `light-dark(<light>, <dark>)`. No component hard-codes an `oklch()` value.
- **T2.** `:root` declares `color-scheme: light dark` → system preference is the default, with or
  without JavaScript. `[data-theme="light"]` and `[data-theme="dark"]` blocks pin the scheme.
- **T3.** The toggle flips what the visitor currently sees and pins it to `localStorage` under
  `lh-theme` (`light` | `dark`). Any other stored value is ignored.
- **T4.** The stored theme is applied by an inline script in `<head>` before first paint → no
  flash of the wrong theme.
- **T5.** The toggle shows `☾` with label 'Switch to dark' in light mode and `☀` with label
  'Switch to light' in dark mode. It is hidden until JavaScript runs.
- **T6.** The fading hairline is one utility (`.hairline-top` / `.hairline-bottom`) backed by one
  `--hairline-gradient` token. No element uses a plain border as a section divider.
- **T7.** The bio carries exactly four `.highlight` statements (2.5px stroke,
  `box-decoration-break: clone`).
- **T8.** Pill button (`.button`), tag chip (`.chip`), page shell padding (`--shell-pad`), and the
  heading scale are shared classes/tokens, not repeated declarations.
- **T9.** `text-wrap: pretty` applies to every heading and body paragraph.
- **T10.** `prefers-reduced-motion: reduce` disables transitions.

Token consolidation: the prototype used ~15 near-identical grays. They collapse to `--ink`,
`--prose`, `--body`, `--body-soft`, `--subtle`, `--muted`. Differences of ≤0.02 lightness were
merged; contrast stays ≥4.5:1 for body text in both schemes.

## SEO and metadata

- **S1.** Every page has its own `<title>` and `<meta name="description">`; no two non-article
  pages share either.
- **S2.** Every page has `<link rel="canonical">`, Open Graph (`og:title`, `og:description`,
  `og:url`, `og:type`, `og:site_name`) and Twitter (`twitter:card`, `twitter:title`,
  `twitter:description`) tags. Articles use `og:type=article` with
  `article:published_time`.
- **S3.** The JSON-LD `Person` block from the prototype is emitted on every page. Articles add a
  `BlogPosting` block.
- **S4.** The build emits `sitemap-index.xml` and a `robots.txt` that references it. `/404` is
  excluded from the sitemap.
- **S5.** A cross-posted article (`sourceUrl` set) sets its canonical URL to `sourceUrl`, so the
  original keeps the search credit.

## Writing

Pipeline: Obsidian → git → static build. Articles are Markdown files in `content/writing/`
(open that folder as, or inside, an Obsidian vault). The directory can be overridden with the
`WRITING_DIR` env var; the tests use this to build against fixtures. The file name is the slug.

Front-matter: `title` (required), `date` (required), `summary` (required), `tags` (list,
default empty), `sourceUrl` (optional URL), `sourceName` (optional), `draft` (optional).

- **W1.** Invalid or missing required front-matter fails the build.
- **W2.** The index lists articles newest first with date ('Aug 2026'), title, summary, tags.
- **W3.** Read time is computed from the body at 230 words per minute, minimum 1 → 'Aug 2026 ·
  7 min read'.
- **W4.** `sourceUrl` marks a cross-post: the index shows '↗ {sourceName}' and the article shows
  the 'First published at' card linking to `sourceUrl`. `sourceName` defaults to the URL's host
  without `www.`.
- **W5.** Tag chips are the union of all article tags in first-seen order, preceded by '∞'
  ('All writing'). Chips are buttons with `aria-pressed`; selecting one hides non-matching
  articles and updates the 'N piece(s)' count. Without JavaScript all articles stay visible.
- **W6.** `draft: true` articles are excluded from production builds.
- **W7.** With no articles the index renders the heading, intro, and '0 pieces'; no chips.
- **W8.** The fabricated prototype articles are not shipped.

## Contact

GitHub Pages cannot receive a POST, so the form submits to a hosted form service (Formspree
request shape), which owns server-side validation, spam filtering, and delivery.

- **C1.** `PUBLIC_CONTACT_ENDPOINT` is required; the build fails without it.
- **C2.** The form's `action` is the endpoint and `method` is `post` → it works without
  JavaScript. Fields: `name`, `email`, `topic`, `message`; `name`, `email`, `message` are
  `required`. A visually hidden `_gotcha` honeypot is included.
- **C3.** With JavaScript the form submits via `fetch` with `Accept: application/json`. On
  success it resets and shows 'Thanks — I'll be in touch.' in the `role="status"` element. On
  failure it keeps the visitor's input and shows an error that points at the email address.
- **C4.** The Send button is disabled while a submission is in flight.

## Accessibility

- **A1.** A 'Skip to content' link is the first focusable element and targets `<main id="main">`.
- **A2.** `:focus-visible` rings on all interactive elements.
- **A3.** Header nav links, theme toggle, and footer links have a ≥44px hit area, provided by
  an invisible centered pseudo-element (`.hit-area`) so the visual layout matches the prototype.
- **A4.** `<html lang="en">`.

## Copy

All copy is verbatim from the prototype, with one correction: 'gaurdrails' → 'guardrails' in the
Engineering & AI Advisory body. New strings that the prototype had no need for (skip link, 404,
empty writing index, form error, per-page meta descriptions) are kept minimal.

## Deferred

- Work page (one entry per system built). Not in this iteration.
- Open Graph image.
- Obsidian-only syntax (wikilinks, `![[embeds]]`). Articles use standard Markdown.
