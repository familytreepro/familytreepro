// FamilyTreePro V156.22 Children Main Panels + Registry Drawer - no-cache
const CACHE_NAME = 'familytreepro-v156-22-children-main-registry-drawer-no-cache';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .catch(() => new Response('', { status: 503, statusText: 'Offline' }))
  );
});
