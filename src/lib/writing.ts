const WORDS_PER_MINUTE = 230;

// Front-matter dates parse as UTC midnight, so formatting in UTC keeps the month stable on any build machine.
const monthYearFormat = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export function formatMonthYear(date: Date): string {
  return monthYearFormat.format(date);
}

export function wordCount(markdownBody: string): number {
  return markdownBody.split(/\s+/).filter(Boolean).length;
}

export function readTimeMinutes(markdownBody: string): number {
  return Math.max(1, Math.ceil(wordCount(markdownBody) / WORDS_PER_MINUTE));
}

/** Markdown served on its own cannot resolve the entry's relative image paths, so images become their alt text. */
export function standaloneMarkdown(markdownBody: string): string {
  return markdownBody.replace(/!\[([^\]]*)\]\([^)]*\)/g, '[Image: $1]').trim();
}

export function sourceNameFor(sourceUrl: string, sourceName?: string): string {
  return sourceName ?? new URL(sourceUrl).hostname.replace(/^www\./, '');
}

export type EntryKind = 'writing' | 'projects';

/** Everything that differs between the two collections, in one place. */
export const ENTRY_KINDS = {
  writing: { path: '/writing', label: 'Writing', allLabel: 'All writing', noun: 'piece', sourceLabel: 'First published at' },
  projects: { path: '/projects', label: 'Projects', allLabel: 'All projects', noun: 'project', sourceLabel: 'Project home' },
} as const;

export function entryPath(kind: EntryKind, slug: string): string {
  return `${ENTRY_KINDS[kind].path}/${slug}`;
}

export function sourceLabelFor(kind: EntryKind): string {
  return ENTRY_KINDS[kind].sourceLabel;
}

/** A cross-post's source is another copy of the same text, so it keeps the search credit. A project's source is not. */
export function canonicalSourceFor(kind: EntryKind, sourceUrl?: string): string | undefined {
  return kind === 'projects' ? undefined : sourceUrl;
}

export function collectTags(tagLists: string[][]): string[] {
  return [...new Set(tagLists.flat())];
}

export function countLabel(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`;
}
