// Renders scripts/og-image.html to public/og-image.png, the 1200x630 card shown when a page is
// shared. Run after editing the HTML:
//   node scripts/generate-og-image.mjs
// A real browser does the rendering so the card uses the site's own web font and CSS.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BROWSERS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const browser = BROWSERS.find(existsSync);
if (!browser) {
  throw new Error(`No Chromium-based browser found. Looked in:\n${BROWSERS.join('\n')}`);
}

const source = new URL('./og-image.html', import.meta.url).href;
const output = fileURLToPath(new URL('../public/og-image.png', import.meta.url));

execFileSync(browser, [
  '--headless=new',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--virtual-time-budget=3000',
  `--screenshot=${output}`,
  source,
], { stdio: 'ignore' });
