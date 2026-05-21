// FamilyTreePro V100.9 Auth User Profile Sync - safe no-cache service worker
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil((async()=>{ try{ const keys=await caches.keys(); await Promise.all(keys.map(k=>caches.delete(k))); }catch(e){} await self.clients.claim(); })()); });
self.addEventListener('fetch', event => { event.respondWith(fetch(event.request).catch(()=>caches.match(event.request))); });


/* cache: v100-9-auth-user-profile-sync */
