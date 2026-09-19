import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'writing'>;

/** Published articles, newest first. Drafts are visible in dev only. */
export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
