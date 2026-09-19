import type { APIContext } from 'astro';
import { entryMarkdown } from '../../lib/agent-text';
import { getPublishedArticles, type Article } from '../../lib/articles';

export async function getStaticPaths() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ params: { slug: article.id }, props: { article } }));
}

export function GET({ props }: APIContext<{ article: Article }>) {
  return new Response(entryMarkdown(props.article), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
