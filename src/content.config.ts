import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: process.env.WRITING_DIR ?? './content/writing' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    summary: z.string().min(1),
    tags: z.array(z.string()).default([]),
    sourceUrl: z.url().optional(),
    sourceName: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
