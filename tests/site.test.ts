import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, type HTMLElement } from 'node-html-parser';
import { describe, expect, test } from 'vitest';
import { CONTACT_ENDPOINT } from './build-fixture-sites';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const siteDir = join(projectRoot, '.test-dist/with-articles');
const emptySiteDir = join(projectRoot, '.test-dist/no-articles');

const STATIC_PAGES = ['index', 'bio', 'services', 'writing', 'contact', '404'];
const ARTICLE_PAGES = ['writing/cross-posted-piece', 'writing/original-piece', 'writing/fixture-project'];
const ALL_PAGES = [...STATIC_PAGES, ...ARTICLE_PAGES];

function page(name: string, dir = siteDir): HTMLElement {
  return parse(readFileSync(join(dir, `${name}.html`), 'utf8'));
}

function meta(doc: HTMLElement, key: string): string | undefined {
  const tag = doc.querySelector(`meta[name="${key}"]`) ?? doc.querySelector(`meta[property="${key}"]`);
  return tag?.getAttribute('content');
}

function jsonLdTypes(doc: HTMLElement): string[] {
  return doc
    .querySelectorAll('script[type="application/ld+json"]')
    .map((script) => JSON.parse(script.textContent)['@type']);
}

describe('routes', () => {
  test.each(ALL_PAGES)('emits %s as a static file (R1)', (name) => {
    expect(existsSync(join(siteDir, `${name}.html`))).toBe(true);
  });

  test.each(ALL_PAGES)('%s has exactly one h1 (R2)', (name) => {
    expect(page(name).querySelectorAll('h1')).toHaveLength(1);
  });

  test('h1 copy matches the prototype (R2)', () => {
    const headings = Object.fromEntries(
      STATIC_PAGES.filter((name) => name !== '404').map((name) => [name, page(name).querySelector('h1')?.text.trim()]),
    );
    expect(headings).toEqual({
      index: "I've shipped enough to know what to cut.",
      bio: 'I like problems bigger than code.',
      services: 'Three ways I work with you.',
      writing: "I only write about what I've shipped.",
      contact: 'What are you stuck on?',
    });
  });

  test('header nav links to real routes and the wordmark links home (R3)', () => {
    const header = page('index').querySelector('header');
    const hrefs = header?.querySelectorAll('a').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/', '/bio', '/services', '/writing', '/contact']);
  });

  test.each([
    ['bio', '/bio'],
    ['writing', '/writing'],
    ['writing/original-piece', '/writing'],
  ])('%s marks its section as the current page (R3)', (name, href) => {
    const current = page(name).querySelectorAll('header nav a[aria-current="page"]');
    expect(current.map((link) => link.getAttribute('href'))).toEqual([href]);
  });

  test('home marks no nav section as current (R3)', () => {
    expect(page('index').querySelectorAll('header nav a[aria-current]')).toHaveLength(0);
  });

  test.each(ALL_PAGES)('%s has no hash route links left over from the prototype (R4)', (name) => {
    const hashLinks = page(name)
      .querySelectorAll('a')
      .filter((link) => link.getAttribute('href')?.startsWith('#') && link.getAttribute('href') !== '#main');
    expect(hashLinks).toHaveLength(0);
  });
});

describe('theming', () => {
  test('no page or component hard-codes a color outside the token file (T1)', () => {
    const sourceFiles = readdirSync(join(projectRoot, 'src'), { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.(astro|css|ts)$/.test(file))
      .filter((file) => !file.endsWith('tokens.css'));
    const offenders = sourceFiles.filter((file) => /oklch\(|#[0-9a-f]{3,8}\b|rgb\(/i.test(readFileSync(join(projectRoot, 'src', file), 'utf8')));
    expect(offenders).toEqual([]);
  });

  test('stored theme is applied by an inline head script before first paint (T4)', () => {
    const inlineScripts = page('index').querySelectorAll('head script:not([src]):not([type])');
    expect(inlineScripts.some((script) => script.textContent.includes('lh-theme'))).toBe(true);
  });

  test('theme toggle is hidden until JavaScript runs (T5)', () => {
    const toggle = page('index').querySelector('[data-theme-toggle]');
    expect(toggle?.hasAttribute('hidden')).toBe(true);
  });

  test('bio carries exactly four highlighted statements (T7)', () => {
    expect(page('bio').querySelectorAll('.highlight')).toHaveLength(4);
  });
});

describe('metadata', () => {
  test('static pages have unique titles and descriptions (S1)', () => {
    const titles = STATIC_PAGES.map((name) => page(name).querySelector('title')?.text);
    const descriptions = STATIC_PAGES.map((name) => meta(page(name), 'description'));
    expect(new Set(titles).size).toBe(STATIC_PAGES.length);
    expect(new Set(descriptions).size).toBe(STATIC_PAGES.length);
    expect([...titles, ...descriptions].every((value) => value && value.length > 0)).toBe(true);
  });

  test.each(ALL_PAGES)('%s has canonical, Open Graph, and Twitter tags (S2)', (name) => {
    const doc = page(name);
    const required = ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'twitter:card', 'twitter:title', 'twitter:description'];
    expect(required.filter((key) => !meta(doc, key))).toEqual([]);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/^https:\/\//);
  });

  test('canonical URLs have no trailing slash or .html suffix (S2)', () => {
    expect(page('bio').querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://lukehollenback.me/bio');
  });

  test('articles are typed as articles with a published time (S2)', () => {
    const doc = page('writing/original-piece');
    expect(meta(doc, 'og:type')).toBe('article');
    expect(meta(doc, 'article:published_time')).toBe('2026-03-02T00:00:00.000Z');
  });

  test('every page carries the Person JSON-LD and articles add BlogPosting (S3)', () => {
    expect(ALL_PAGES.filter((name) => !jsonLdTypes(page(name)).includes('Person'))).toEqual([]);
    expect(jsonLdTypes(page('writing/original-piece'))).toContain('BlogPosting');
  });

  test('build emits a sitemap without the 404 page, and robots.txt points at it (S4)', () => {
    const sitemap = readFileSync(join(siteDir, 'sitemap-0.xml'), 'utf8');
    expect(existsSync(join(siteDir, 'sitemap-index.xml'))).toBe(true);
    expect(sitemap).toContain('https://lukehollenback.me/writing/original-piece');
    expect(sitemap).not.toContain('404');
    expect(readFileSync(join(siteDir, 'robots.txt'), 'utf8')).toContain('Sitemap: https://lukehollenback.me/sitemap-index.xml');
  });

  test('a project keeps its own canonical URL (S5)', () => {
    const canonical = page('writing/fixture-project').querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://lukehollenback.me/writing/fixture-project');
  });

  test('a cross-post points its canonical URL at the original (S5)', () => {
    const canonical = page('writing/cross-posted-piece').querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe('https://www.example.com/original-piece');
  });
});

describe('writing', () => {
  test('index lists published articles newest first (W2, W6)', () => {
    const titles = page('writing').querySelectorAll('[data-article] h2').map((heading) => heading.text.trim());
    expect(titles).toEqual(['A cross-posted fixture piece', 'An original fixture piece', 'A fixture project']);
  });

  test('index shows month and year for each article (W2)', () => {
    const dates = page('writing').querySelectorAll('[data-article] time').map((time) => time.text.trim());
    expect(dates).toEqual(['Aug 2026', 'Mar 2026', 'Nov 2025']);
  });

  test('article shows date and computed read time (W3)', () => {
    expect(page('writing/original-piece').querySelector('.article-meta')?.text.trim()).toBe('Mar 2026 · 1 min read');
  });

  test('a cross-post is marked on the index and carries the source card (W4)', () => {
    const indexEntry = page('writing').querySelector('[data-article]');
    const card = page('writing/cross-posted-piece').querySelector('.source-card');
    expect(indexEntry?.text).toContain('↗ example.com');
    expect(card?.getAttribute('href')).toBe('https://www.example.com/original-piece');
    expect(card?.text).toContain('First published at');
  });

  test('a project uses the same source card, labelled as its home (W4)', () => {
    const indexEntry = page('writing').querySelectorAll('[data-article]')[2];
    const card = page('writing/fixture-project').querySelector('.source-card');
    expect(indexEntry.text).toContain('↗ GitHub');
    expect(card?.getAttribute('href')).toBe('https://github.com/example/fixture-project');
    expect(card?.text).toContain('Project home');
    expect(card?.text).not.toContain('First published at');
  });

  test('a project shows its date without a read time (W3)', () => {
    expect(page('writing/fixture-project').querySelector('.article-meta')?.text.trim()).toBe('Nov 2025');
  });

  test('an original article has no source card (W4)', () => {
    expect(page('writing/original-piece').querySelector('.source-card')).toBeNull();
  });

  test('tag chips are pressable buttons in first-seen order, led by the all chip (W5)', () => {
    const chips = page('writing').querySelectorAll('button.chip');
    expect(chips.map((chip) => chip.text.trim())).toEqual(['∞', 'ai', 'product', 'leadership', 'project']);
    expect(chips.map((chip) => chip.getAttribute('aria-pressed'))).toEqual(['true', 'false', 'false', 'false', 'false']);
    expect(chips[0].getAttribute('aria-label')).toBe('All writing');
  });

  test('count label reflects the number of published pieces (W5)', () => {
    expect(page('writing').querySelector('[data-article-count]')?.text.trim()).toBe('3 pieces');
  });

  test('the date prefix on a file name is not part of the URL (W9)', () => {
    expect(existsSync(join(siteDir, 'writing/2026-03-02-original-piece.html'))).toBe(false);
    expect(page('writing').querySelectorAll('[data-article]').map((entry) => entry.getAttribute('href'))).toContain('/writing/original-piece');
  });

  test('external links in a body open in a new tab and internal links do not (W10)', () => {
    const links = page('writing/original-piece').querySelectorAll('.prose a');
    const external = links.find((link) => link.getAttribute('href') === 'https://example.org/elsewhere');
    const internal = links.find((link) => link.getAttribute('href') === '/writing/cross-posted-piece');
    expect([external?.getAttribute('target'), external?.getAttribute('rel')]).toEqual(['_blank', 'noopener']);
    expect(internal?.hasAttribute('target')).toBe(false);
  });

  test('drafts are not built or listed (W6)', () => {
    expect(existsSync(join(siteDir, 'writing/unfinished-draft.html'))).toBe(false);
    expect(page('writing').text).not.toContain('secret');
  });

  test('an empty index keeps the heading and shows zero pieces without chips (W7)', () => {
    const doc = page('writing', emptySiteDir);
    expect(doc.querySelectorAll('h1')).toHaveLength(1);
    expect(doc.querySelector('[data-article-count]')?.text.trim()).toBe('0 pieces');
    expect(doc.querySelectorAll('button.chip')).toHaveLength(0);
  });

  test('the fabricated prototype articles are not shipped (W8)', () => {
    const fabricatedTitles = [
      'The AI features that survive contact with real users',
      'What a platform should refuse to do',
      'Vocablo: passive language learning on the Home Screen',
      'Hiring for the awkward size',
      'Goose: what backtesting taught me about overconfidence',
      'Buy, build, or rent: the version of the question that matters',
    ];
    const contentDir = join(projectRoot, 'content/writing');
    const shipped = readdirSync(contentDir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => readFileSync(join(contentDir, file), 'utf8'))
      .join('\n');
    expect(fabricatedTitles.filter((title) => shipped.includes(title))).toEqual([]);
  });
});

describe('contact', () => {
  test('form posts to the configured endpoint without JavaScript (C2)', () => {
    const form = page('contact').querySelector('form');
    expect(form?.getAttribute('action')).toBe(CONTACT_ENDPOINT);
    expect(form?.getAttribute('method')?.toLowerCase()).toBe('post');
  });

  test('form has the prototype fields, the required ones marked, and a honeypot (C2)', () => {
    const form = page('contact').querySelector('form');
    const required = form?.querySelectorAll('[required]').map((field) => field.getAttribute('name'));
    expect(required).toEqual(['name', 'email', 'message']);
    expect(form?.querySelector('select[name="topic"]')?.querySelectorAll('option').map((option) => option.text)).toEqual([
      'Product Strategy',
      'Engineering & AI Advisory',
      'Website Development',
      'Something else',
    ]);
    expect(form?.querySelector('[name="_gotcha"]')).not.toBeNull();
  });

  test('form confirmation is a status region (C3)', () => {
    expect(page('contact').querySelector('form [role="status"]')).not.toBeNull();
  });
});

describe('accessibility', () => {
  test.each(ALL_PAGES)('%s starts with a skip link that targets main (A1)', (name) => {
    const doc = page(name);
    expect(doc.querySelector('body a')?.getAttribute('href')).toBe('#main');
    expect(doc.querySelector('main#main')).not.toBeNull();
  });

  test('document language is English (A4)', () => {
    expect(page('index').querySelector('html')?.getAttribute('lang')).toBe('en');
  });
});

describe('icons', () => {
  test('every page links an icon each browser family can use, and the files exist (I1)', () => {
    const icons = ['/favicon.ico', '/favicon.svg', '/apple-touch-icon.png'];
    const missingLinks = ALL_PAGES.filter((name) => {
      const hrefs = page(name).querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').map((link) => link.getAttribute('href'));
      return icons.some((icon) => !hrefs.includes(icon));
    });
    expect(missingLinks).toEqual([]);
    expect(icons.filter((icon) => !existsSync(join(siteDir, icon)))).toEqual([]);
  });
});

describe('copy', () => {
  test('the guardrails typo from the prototype is corrected', () => {
    const text = page('services').text;
    expect(text).toContain('guardrails');
    expect(text).not.toContain('gaurdrails');
  });
});
