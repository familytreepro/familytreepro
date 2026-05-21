// FamilyTreePro V109 Auth Final Clean - hard no-cache service worker
const VERSION='V109_AUTH_FINAL_CLEAN';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    try{ const keys=await caches.keys(); await Promise.all(keys.map(k=>caches.delete(k))); }catch(e){}
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request,{cache:'no-store'}));
});
