const DATED_FILE_NAME = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

/**
 * Article files are named `yyyy-mm-dd-slug.md` so they sort by date outside the site.
 * The prefix must agree with the front-matter date, which Obsidian reads, so the two cannot drift.
 */
export function articleSlugFromFile(fileName: string, frontMatterDate: unknown): string {
  const match = DATED_FILE_NAME.exec(fileName);
  if (!match) {
    throw new Error(`Article file '${fileName}' must be named yyyy-mm-dd-slug.md.`);
  }

  const [, fileDate, slug] = match;
  const declaredDate = new Date(frontMatterDate as string | Date).toISOString().slice(0, 10);
  if (fileDate !== declaredDate) {
    throw new Error(`Article file '${fileName}' is dated ${fileDate} by name but ${declaredDate} in its front-matter.`);
  }

  return slug;
}
