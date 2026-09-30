import { rssFeed } from '../lib/agent-text';
import { getPublishedEntries } from '../lib/entries';

export async function GET() {
  return new Response(rssFeed(await getPublishedEntries('writing')), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
