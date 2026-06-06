// FamilyTreePro V156.92 F35 Lite Display Fix
const CACHE_NAME='familytreepro-v156-92-f35-lite-display-fix';
const CORE_ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>res).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(event.request)||await cache.match('./index.html')||new Response('',{status:503})}))});
