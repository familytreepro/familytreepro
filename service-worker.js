const VERSION = "v72-5-emergency-mobile-login-no-cache";
const CACHE_NAME = "familytreepro-" + VERSION;
const APP_SHELL = ["./", "./index.html?v=v72-5-emergency-mobile-login-no-cache", "./manifest.json?v=v72-5-emergency-mobile-login-no-cache"];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL).catch(()=>null)));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;
  event.respondWith((async () => {
    try {
      const fresh = await fetch(event.request, { cache: "no-store" });
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, fresh.clone()).catch(()=>null);
      return fresh;
    } catch (e) {
      const cached = await caches.match(event.request);
      return cached || caches.match("./index.html?v=v72-5-emergency-mobile-login-no-cache");
    }
  })());
});
