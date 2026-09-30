import { sitemap } from '../lib/agent-text';
import { getPublishedEntries } from '../lib/entries';

export async function GET() {
  const xml = sitemap(await getPublishedEntries('writing'), await getPublishedEntries('projects'));
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
