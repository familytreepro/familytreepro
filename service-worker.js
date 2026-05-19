// FamilyTreePro V99.3 Login Fallback Real Fix - safe no-cache service worker
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil((async()=>{ try{ const keys=await caches.keys(); await Promise.all(keys.map(k=>caches.delete(k))); }catch(e){} await self.clients.claim(); })()); });
self.addEventListener('fetch', event => { event.respondWith(fetch(event.request).catch(()=>caches.match(event.request))); });

/* cache: v99-3-login-fallback-real-fix */
