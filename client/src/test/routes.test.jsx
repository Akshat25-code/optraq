import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/app/App';

if (!window.localStorage) {
  const store = {};
  window.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { for (const k of Object.keys(store)) delete store[k]; },
  };
}

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
}

const PATHS = [
  '/', '/optimize', '/workspace', '/analysis', '/bug-detection',
  '/debugging', '/refactoring', '/auth', '/forgot-password',
  '/reset-password', '/profile', '/settings', '/privacy', '/terms',
  '/share/abc', '/optimization', '/no-such-page',
];

describe('routes render without crashing', () => {
  afterEach(cleanup);
  for (const path of PATHS) {
    it(`renders ${path}`, async () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>,
      );
      await waitFor(
        () => expect(document.body.textContent.length).toBeGreaterThan(0),
        { timeout: 8000 },
      );
      expect(document.body.textContent).not.toMatch(/is not defined/);
      expect(document.body.textContent).not.toContain('Something went wrong');
    });
  }
});
