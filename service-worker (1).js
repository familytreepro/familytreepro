// FamilyTreePro V165 Install Alerts
const CACHE_NAME='familytreepro-v165-install-alerts';
const CORE_ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin){return event.respondWith(fetch(event.request).catch(()=>new Response('',{status:503})))}
  event.respondWith(fetch(event.request,{cache:'no-store'}).then(res=>res).catch(async()=>{const cache=await caches.open(CACHE_NAME);return await cache.match(event.request)||await cache.match('./index.html')||new Response('',{status:503})}));
});


self.addEventListener('message',event=>{
  const data=event.data||{};
  if(data.type==='SHOW_NOTIFICATION'){
    self.registration.showNotification(data.title||'FamilyTreePro',data.options||{});
  }
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=(event.notification&&event.notification.data&&event.notification.data.url)||'./index.html';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
    for(const c of list){ if(c.url && 'focus' in c) return c.focus(); }
    if(clients.openWindow) return clients.openWindow(target);
  }));
});
