// FamilyTreePro V172 Mobile Cache Auth Fix
const CACHE_NAME='familytreepro-v172-mobile-cache-auth-fix';
const CORE_ASSETS=['./index.html?v=172-mobile-cache-auth-fix','./manifest.json?v=172-mobile-cache-auth-fix'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>res).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(event.request)||await cache.match('./index.html?v=172-mobile-cache-auth-fix')||new Response('',{status:503})}));
});
