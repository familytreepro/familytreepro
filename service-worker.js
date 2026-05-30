// FamilyTreePro V156.30 Manual Spouse Fields - no-cache
const CACHE_NAME = 'familytreepro-v156-30-manual-spouse-fields-no-cache';

self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => new Response('', { status: 503, statusText: 'Offline' })));
});
