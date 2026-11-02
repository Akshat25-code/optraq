/** Per-route document metadata (title, description, robots). */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://aicodeoptimizerpromax.com';

export const ROUTE_META = {
  '/': {
    title: 'OPTRAQ — Optimize, Verify & Accelerate Code with AI',
    description:
      'OPTRAQ analyzes complexity, finds bugs, optimizes performance, and verifies results in a sandboxed runner. Free to start.',
  },
  '/auth': {
    title: 'Sign in — OPTRAQ',
    description: 'Sign in or create a free OPTRAQ account.',
    robots: 'noindex',
  },
  '/forgot-password': { title: 'Forgot password — OPTRAQ', description: 'Reset your password.', robots: 'noindex' },
  '/reset-password': { title: 'Reset password — OPTRAQ', description: 'Choose a new password.', robots: 'noindex' },
  '/profile': { title: 'Profile — OPTRAQ', description: 'Manage your profile.', robots: 'noindex' },
  '/settings': { title: 'Settings — OPTRAQ', description: 'Manage settings and API keys.', robots: 'noindex' },
  '/workspace': { title: 'Workspace — OPTRAQ', description: 'Your optimization workspace.', robots: 'noindex' },
  '/optimize': { title: 'Optimize code — OPTRAQ', description: 'Optimize code with AI and verify the result.', robots: 'noindex' },
  '/optimization': { title: 'Optimization — OPTRAQ', description: 'AI code optimization.', robots: 'noindex, nofollow' },
  '/analysis': { title: 'Code analysis — OPTRAQ', description: 'Static code analysis and quality scoring.', robots: 'noindex' },
  '/bug-detection': { title: 'Bug detection — OPTRAQ', description: 'Detect bugs before production.', robots: 'noindex' },

  '/refactoring': { title: 'Refactoring — OPTRAQ', description: 'Structural refactoring assistance.', robots: 'noindex' },
  '/debugging': { title: 'Debugging — OPTRAQ', description: 'AI root-cause analysis.', robots: 'noindex' },
  '/privacy': {
    title: 'Privacy Policy — OPTRAQ',
    description: 'How OPTRAQ collects, uses, and protects your data.',
  },
  '/terms': {
    title: 'Terms & Conditions — OPTRAQ',
    description: 'Terms governing use of OPTRAQ.',
  },
};

const DEFAULT_META = ROUTE_META['/'];

function upsertMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const NOT_FOUND_META = {
  title: 'Page not found — OPTRAQ',
  description: 'The page you requested does not exist.',
  robots: 'noindex',
};

/** Syncs <title>, description, canonical and robots from the current route. */
export function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    import('@/lib/analytics').then(({ trackPageview }) => trackPageview());
    const meta = ROUTE_META[pathname] || (pathname === '/' ? DEFAULT_META : NOT_FOUND_META);
    document.title = meta.title;
    upsertMetaTag('name', 'description', meta.description);
    upsertMetaTag('name', 'robots', meta.robots || 'index, follow');
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${SITE}${pathname === '/' ? '/' : pathname}`);
  }, [pathname]);
  return null;
}
