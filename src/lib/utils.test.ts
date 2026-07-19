import { describe, it, expect } from 'vitest';
import { normalizePath, formatDate } from './utils';

describe('normalizePath', () => {
  it('should decode URI component correctly', () => {
    expect(normalizePath('/hello%20world')).toBe('/hello world');
  });

  it('should fall back to original pathname if decodeURIComponent fails (malformed URI)', () => {
    // '%E0%A4%A' is a malformed URI sequence that causes decodeURIComponent to throw
    expect(normalizePath('/%E0%A4%A')).toBe('/%E0%A4%A');
  });

  it('should remove trailing /index.html', () => {
    expect(normalizePath('/about/index.html')).toBe('/about');
    expect(normalizePath('/index.html')).toBe('/');
  });

  it('should remove trailing .html', () => {
    expect(normalizePath('/about.html')).toBe('/about');
  });

  it('should remove trailing slashes', () => {
    expect(normalizePath('/about/')).toBe('/about');
    expect(normalizePath('/about///')).toBe('/about');
  });

  it('should return "/" if path becomes empty', () => {
    expect(normalizePath('')).toBe('/');
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('///')).toBe('/');
  });

  it('should handle all replacements together', () => {
    expect(normalizePath('/about/index.html/')).toBe('/about/index.html');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    expect(formatDate(date)).toBe('Jan 1, 2024');
  });
});
