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

/** Projects share the writing pipeline; the `project` tag is what sets them apart. */
export function isProject(tags: string[]): boolean {
  return tags.includes('project');
}

/** A cross-post's source is another copy of the same text, so it keeps the search credit. A project's source is not. */
export function canonicalSourceFor(tags: string[], sourceUrl?: string): string | undefined {
  return isProject(tags) ? undefined : sourceUrl;
}

export function sourceLabelFor(tags: string[]): string {
  return isProject(tags) ? 'Project home' : 'First published at';
}

export function collectTags(tagLists: string[][]): string[] {
  return [...new Set(tagLists.flat())];
}

export function pieceCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'piece' : 'pieces'}`;
}
