const CACHE_NAME = 'optraq-v4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests for static assets on the same origin
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // NEVER intercept cross-origin API calls (like Render backend)
  if (url.origin !== self.location.origin) return;

  // Never intercept backend API paths
  if (url.pathname.startsWith('/api') ||
      url.pathname.startsWith('/auth') ||
      url.pathname.startsWith('/health') ||
      url.pathname.startsWith('/opt-sessions') ||
      url.pathname.startsWith('/analyze-code')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((response) => {
        // Cache successful network responses dynamically
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Return offline fallback for navigations; a real Response (never
        // undefined) for everything else — undefined rejects the fetch
        // with "Failed to convert value to 'Response'".
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});
