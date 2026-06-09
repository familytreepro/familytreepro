// FamilyTreePro V162 Mobile Firebase Debug
const CACHE_NAME='familytreepro-v162-mobile-debug-fix';
const CORE_ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin){return event.respondWith(fetch(event.request).catch(()=>new Response('',{status:503})))}
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>res).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(event.request)||await cache.match('./index.html')||new Response('',{status:503})}));
});
