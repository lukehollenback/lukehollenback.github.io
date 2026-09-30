import type { APIContext } from 'astro';
import { entryMarkdown } from '../../lib/agent-text';
import { getPublishedEntries, type Entry } from '../../lib/entries';

export async function getStaticPaths() {
  const entries = await getPublishedEntries('writing');
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export function GET({ props }: APIContext<{ entry: Entry }>) {
  return new Response(entryMarkdown('writing', props.entry), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
