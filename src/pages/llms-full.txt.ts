import { llmsFull } from '../lib/agent-text';
import { getPublishedEntries } from '../lib/entries';

export async function GET() {
  const text = llmsFull(await getPublishedEntries('writing'), await getPublishedEntries('projects'));
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
