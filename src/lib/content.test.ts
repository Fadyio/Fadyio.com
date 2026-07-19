import { describe, it, expect, vi } from 'vitest';
import { pageTitle } from './content';

// Mocking the imported module
vi.mock('@/consts', () => ({
  SITE: {
    title: 'Mocked Title'
  }
}));

// Mocking astro:content as it's required by content.ts
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

describe('pageTitle', () => {
  it('should append SITE.title to the provided title', () => {
    expect(pageTitle('My Page')).toBe('My Page | Mocked Title');
  });

  it('should handle empty string correctly', () => {
    expect(pageTitle('')).toBe(' | Mocked Title');
  });

  it('should handle long string correctly', () => {
    expect(pageTitle('A'.repeat(100))).toBe('A'.repeat(100) + ' | Mocked Title');
  });
});
