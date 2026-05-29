// FamilyTreePro V156.23 Photo Cloud 500 - no-cache
const CACHE_NAME = 'familytreepro-v156-23-photo-cloud-500-no-cache';

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
