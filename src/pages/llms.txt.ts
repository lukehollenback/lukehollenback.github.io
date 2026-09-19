import { llmsIndex } from '../lib/agent-text';
import { getPublishedArticles } from '../lib/articles';

export async function GET() {
  return new Response(llmsIndex(await getPublishedArticles()), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
