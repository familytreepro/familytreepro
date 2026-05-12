const CACHE_NAME = "familytreepro-cache-v24-production-apk-ready";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL).catch(() => true))
  );
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;

  const req = event.request;

  event.respondWith(
    fetch(req)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(req).then(cached => {
        return cached || caches.match("./index.html");
      }))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    )).then(() => self.clients.claim())
  );
});
