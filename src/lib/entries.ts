import { getCollection, type CollectionEntry } from 'astro:content';
import type { EntryKind } from './writing';

/** Both collections share one schema, so an entry from either is handled the same way. */
export type Entry = CollectionEntry<'writing'> | CollectionEntry<'projects'>;

/** Published entries of one kind, newest first. Drafts are visible in dev only. */
export async function getPublishedEntries(kind: EntryKind): Promise<Entry[]> {
  const entries: Entry[] = await getCollection(kind, ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
