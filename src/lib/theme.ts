export type Theme = 'light' | 'dark';

/** Must match the key read by the inline head script in BaseLayout. */
export const THEME_STORAGE_KEY = 'lh-theme';

export function parseStoredTheme(stored: string | null): Theme | null {
  return stored === 'light' || stored === 'dark' ? stored : null;
}

export function nextTheme(visible: Theme): Theme {
  return visible === 'dark' ? 'light' : 'dark';
}
