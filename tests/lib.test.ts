import { describe, expect, test } from 'vitest';
import { nextTheme, parseStoredTheme } from '../src/lib/theme';
import { collectTags, formatMonthYear, pieceCountLabel, readTimeMinutes, sourceNameFor } from '../src/lib/writing';

describe('theme', () => {
  test('accepts only light or dark as a stored theme (T3)', () => {
    expect(parseStoredTheme('dark')).toBe('dark');
    expect(parseStoredTheme('light')).toBe('light');
    expect(parseStoredTheme('system')).toBeNull();
    expect(parseStoredTheme(null)).toBeNull();
  });

  test('toggle flips what the visitor currently sees (T3)', () => {
    expect(nextTheme('dark')).toBe('light');
    expect(nextTheme('light')).toBe('dark');
  });
});

describe('writing helpers', () => {
  test('formats dates as short month and year regardless of build timezone (W2)', () => {
    expect(formatMonthYear(new Date('2026-08-01T00:00:00.000Z'))).toBe('Aug 2026');
  });

  test('read time is words at 230 per minute, rounded up (W3)', () => {
    expect(readTimeMinutes(Array(231).fill('word').join(' '))).toBe(2);
  });

  test('read time is never less than one minute (W3)', () => {
    expect(readTimeMinutes('')).toBe(1);
  });

  test('source name defaults to the host without www (W4)', () => {
    expect(sourceNameFor('https://www.nextworld.net/blog/post')).toBe('nextworld.net');
  });

  test('an explicit source name wins over the host (W4)', () => {
    expect(sourceNameFor('https://www.nextworld.net/', 'Nextworld Engineering Blog')).toBe('Nextworld Engineering Blog');
  });

  test('tags are unique and keep first-seen order (W5)', () => {
    expect(collectTags([['ai', 'product'], ['engineering', 'product'], ['ai']])).toEqual(['ai', 'product', 'engineering']);
  });

  test('count label is singular only for one piece (W5)', () => {
    expect([0, 1, 2].map(pieceCountLabel)).toEqual(['0 pieces', '1 piece', '2 pieces']);
  });
});
