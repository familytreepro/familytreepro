// FamilyTreePro V175 Mobile REST Login DocSafe
const CACHE_NAME='familytreepro-v175-mobile-rest-login-docsafe';
const CORE_ASSETS=['./','./index.html?v=175-mobile-rest-login-docsafe','./manifest.json?v=175-mobile-rest-login-docsafe'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin) return event.respondWith(fetch(event.request).catch(()=>new Response('',{status:503})));
  if(url.pathname.endsWith('/index.html') || url.pathname==='/' || url.search.includes('v=')){
    return event.respondWith(fetch(event.request,{cache:'no-store'}).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match('./index.html?v=175-mobile-rest-login-docsafe')||await cache.match('./')||new Response('',{status:503})}));
  }
  event.respondWith(fetch(event.request,{cache:'no-store'}).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(event.request)||new Response('',{status:503})}));
});
