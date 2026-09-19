import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

export const CONTACT_ENDPOINT = 'https://forms.example.com/f/fixture';

/** Builds the real site against a fixture writing directory so tests can assert on the output. */
function buildSite(writingDir: string, outDir: string): void {
  rmSync(new URL(`../${outDir}`, import.meta.url), { recursive: true, force: true });
  execFileSync('npx', ['astro', 'build', '--outDir', outDir, '--silent'], {
    cwd: projectRoot,
    // Vitest sets NODE_ENV=test, which would make the child build behave like dev and ship drafts.
    env: { ...process.env, NODE_ENV: 'production', WRITING_DIR: writingDir, PUBLIC_CONTACT_ENDPOINT: CONTACT_ENDPOINT },
    stdio: ['ignore', 'ignore', 'inherit'],
  });
}

export default function setup(): void {
  buildSite('tests/fixtures/writing', '.test-dist/with-articles');
  buildSite('tests/fixtures/empty-writing', '.test-dist/no-articles');
}
