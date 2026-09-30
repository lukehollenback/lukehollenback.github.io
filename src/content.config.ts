import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { articleSlugFromFile } from './lib/article-files';

const entrySchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1),
  tags: z.array(z.string()).default([]),
  sourceUrl: z.url().optional(),
  sourceName: z.string().optional(),
  draft: z.boolean().default(false),
});

/** Articles and projects share a pipeline; the folder an entry lives in is what makes it one or the other. */
function entryCollection(base: string) {
  return defineCollection({
    loader: glob({ pattern: '*.md', base, generateId: ({ entry, data }) => articleSlugFromFile(entry, data.date) }),
    schema: entrySchema,
  });
}

export const collections = {
  writing: entryCollection(process.env.WRITING_DIR ?? './content/writing'),
  projects: entryCollection(process.env.PROJECTS_DIR ?? './content/projects'),
};
