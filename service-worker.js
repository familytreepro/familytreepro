// V160_SPOUSE_OUTSIDER_FORCE_2026_05_27
// Safe no-cache service worker for GitHub Pages
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => new Response('', {status: 503, statusText: 'offline'})));
});
