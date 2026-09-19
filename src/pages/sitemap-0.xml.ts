import { sitemap } from '../lib/agent-text';
import { getPublishedArticles } from '../lib/articles';

export async function GET() {
  return new Response(sitemap(await getPublishedArticles()), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
