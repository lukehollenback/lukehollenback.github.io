import { rssFeed } from '../lib/agent-text';
import { getPublishedArticles } from '../lib/articles';

export async function GET() {
  return new Response(rssFeed(await getPublishedArticles()), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
