// FamilyTreePro V99 Safe Service Worker
// Network-first/no-cache style to avoid stale login pages.
const VERSION = 'familytreepro-v99-login-safe';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    if (self.caches) {
      const names = await caches.keys();
      await Promise.all(names.map(name => caches.delete(name)));
    }
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request, { cache: 'no-store' }).catch(() => fetch(event.request)));
});
