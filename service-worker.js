// FamilyTreePro V156.39 Remove Number Captcha Login Fix - network first with safe offline fallback
const CACHE_NAME = 'familytreepro-v156-39-remove-number-captcha-login-fix';
const CORE_ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS).catch(()=>{})).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  event.respondWith(fetch(req, { cache: 'no-store' }).then(res => {
    try{ if(res && res.ok && (req.mode === 'navigate' || req.url.endsWith('/index.html') || req.url.endsWith('/manifest.json'))){ const copy=res.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)); } }catch(e){}
    return res;
  }).catch(async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req) || (req.mode === 'navigate' ? await cache.match('./index.html') : null);
    if(cached) return cached;
    if(req.mode === 'navigate') return new Response('<!doctype html><html dir="rtl" lang="fa"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:sans-serif;padding:24px">FamilyTreePro آفلاین است. اینترنت را وصل کنید و دوباره تلاش کنید.</body></html>', {headers:{'Content-Type':'text/html; charset=utf-8'}});
    return new Response('', { status: 503, statusText: 'Offline' });
  }));
});
