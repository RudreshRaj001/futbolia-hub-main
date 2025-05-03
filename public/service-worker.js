// Cache name with version
const CACHE_NAME = 'futbolia-hub-v1';

// Assets to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/placeholder.svg',
  '/favicon.ico',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Fetch strategy: network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip API requests
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before returning it
        const responseToCache = response.clone();

        // Cache successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }

        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // For navigation requests, return the cached index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }

            // Otherwise, just return a 404
            return new Response('Not found', { status: 404 });
          });
      })
  );
}); 