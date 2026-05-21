// FamilyTreePro V110 Auth Repair Safe - network first, clear old cache
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    try{ const keys=await caches.keys(); await Promise.all(keys.map(k=>caches.delete(k))); }catch(e){}
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => { event.respondWith(fetch(event.request)); });
/* cache: v110-auth-repair-safe */
