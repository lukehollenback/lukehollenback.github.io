import { nextTheme, parseStoredTheme, THEME_STORAGE_KEY, type Theme } from '../lib/theme';

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function visibleTheme(): Theme {
  return parseStoredTheme(root.dataset.theme ?? null) ?? (systemDark.matches ? 'dark' : 'light');
}

function paintToggle(): void {
  const dark = visibleTheme() === 'dark';
  const label = dark ? 'Switch to light' : 'Switch to dark';
  toggle.textContent = dark ? '☀' : '☾';
  toggle.title = label;
  toggle.setAttribute('aria-label', label);
}

toggle.addEventListener('click', () => {
  const pinned = nextTheme(visibleTheme());
  root.dataset.theme = pinned;
  // Storage can be blocked (private mode); the pin then lasts for this page view only.
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pinned);
  } catch (error) {
    console.warn('Theme choice could not be saved.', error);
  }
  paintToggle();
});

systemDark.addEventListener('change', paintToggle);
paintToggle();
toggle.hidden = false;
