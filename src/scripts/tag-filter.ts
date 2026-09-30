import { countLabel } from '../lib/writing';

const chips = [...document.querySelectorAll<HTMLButtonElement>('[data-tag-filter]')];
const entries = [...document.querySelectorAll<HTMLElement>('[data-entry]')];
const count = document.querySelector<HTMLElement>('[data-entry-count]')!;

/** An empty tag means 'all'. */
function showTag(tag: string): void {
  for (const chip of chips) chip.setAttribute('aria-pressed', String(chip.dataset.tagFilter === tag));
  for (const entry of entries) {
    const entryTags: string[] = JSON.parse(entry.dataset.tags!);
    entry.hidden = tag !== '' && !entryTags.includes(tag);
  }
  count.textContent = countLabel(entries.filter((entry) => !entry.hidden).length, count.dataset.noun!);
}

for (const chip of chips) chip.addEventListener('click', () => showTag(chip.dataset.tagFilter!));
