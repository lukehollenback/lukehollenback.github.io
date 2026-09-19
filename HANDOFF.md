# Handoff — lukehollenback.me

Source of truth for content and visual design: `design/Portfolio.dc.html`.
It is a single-file prototype. **Port the design, do not port the architecture.**

## What to keep verbatim

- **All copy.** Every line has been edited hard. Treat the prototype as the copy deck.
- **Type:** Schibsted Grotesk (400/500/600/700), Google Fonts. Tight tracking on headings
  (`-0.032em` at display sizes), `text-wrap: pretty` on every heading and body paragraph.
- **Palette** (oklch, light mode):
  - ink `oklch(0.21 0.005 150)`, body `oklch(0.31 0.006 150)`, muted `oklch(0.48 0.006 150)`
  - accent pine `oklch(0.49 0.105 157)`, accent hover `oklch(0.42 0.1 157)`, link `oklch(0.47 0.1 157)`
  - surface white `oklch(1 0 0)`, hover surface `oklch(0.967 0.002 150)`, hairline `oklch(0.915 0.003 150)`
  - highlight stroke `oklch(0.62 0.085 157 / 0.55)` → dark `oklch(0.74 0.125 157 / 0.62)`
- **The fading hairline.** Every divider on the site is the same gradient, not a border:
  `linear-gradient(to right, transparent 0, <hairline> 28px, <hairline> calc(100% - 28px), transparent 100%)`
  at `background-size: 100% 1px`. It is the site's signature. Make it one utility.
- **The bio underlines.** Four statements carry a 2.5px pine stroke
  (`background-size: 100% 2.5px`, `padding-bottom: 3px`, `box-decoration-break: clone`).
  Exactly four. Do not add more.
- Pill buttons (`border-radius: 980px`), 13px/26px padding, arrow glyph with a 10px flex gap.

## What to rebuild, not port

1. **Dark mode.** The prototype fakes it: it generates a stylesheet of
   `[style*="color: oklch(...)"]` attribute-substring selectors at runtime because the design
   system mandates inline styles. This is a hack and it has broken three separate times
   (gradients don't respond to `background-color`; the browser rewrites `transparent 0` to
   `transparent 0px`, silently killing selectors). **Replace with CSS custom properties and a
   `[data-theme="dark"]` block.** Keep the behavior: system preference by default, click pins
   light or dark, persisted to `localStorage` under `lh-theme`.
2. **Inline styles → classes/tokens.** Same constraint as above. The repeated values worth
   promoting first: the divider gradient, the highlight stroke, the pill button, the tag chip,
   page shell padding (`clamp(20px, 5vw, 64px)`), heading scale.
3. **Routing.** Currently `this.state.route` with hash links and no history API. Real routes:
   `/`, `/bio`, `/services`, `/writing`, `/writing/:slug`, `/contact`.
4. **Per-page `<title>` and meta description.** There is one static set in `<helmet>`; each
   route needs its own, plus OG/Twitter tags. The JSON-LD `Person` block is in `<helmet>` and
   can be lifted as-is.

## Not done yet

- **The articles are fabricated.** Six sample posts with invented titles, dates, summaries, and
  body blocks live in `data()`. Delete them. The intended pipeline is Obsidian → git → static
  build, with front-matter for `title/date/tags/summary/sourceUrl`. The `sourceUrl`/`sourceName`
  fields drive the "First published at" card for cross-posts — keep that behavior.
- **The contact form does not send.** `onSubmit` calls `preventDefault()` and flips a flag.
  Wire it to a real endpoint and add server-side validation; the client-side `required`
  attributes are UX only.
- **A work page** was discussed and deferred: one entry per system built (cubing engine,
  constraint planner, ML workbench, and others), a few sentences each on what was hard. This is
  where the "built from scratch" record belongs — deliberately kept out of the bio.
- Add a sitemap and `robots.txt` at build time.

## Known small things

- Interactive targets clear WCAG 2.2's 24px minimum but not the 44px mobile guideline:
  header nav links 28px, theme toggle ~30px, footer links 25px. Padding is applied with
  matching negative margins so the visual layout is unchanged — preserve that trick or
  rebuild the spacing properly.
- No skip-to-content link.
- Contact form validation is client-side UX only (`required` attributes). A filled submit
  still goes nowhere — see "Not done yet".
- Résumé entry "Independent Consultant, 2026 — Present" is aspirational; the practice is new.
  Deliberate choice, not an error.

## Verified in the prototype

Responsive to ~320px, dark mode correct on all five views, contrast ≥4.5:1 on body text,
`prefers-reduced-motion` honored, focus-visible rings on all interactive elements,
one `h1` per route, `aria-pressed` on tag filters, `role="status"` on the form confirmation.
