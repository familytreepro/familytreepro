/* FamilyTreePro V82 Production Clean */
const CACHE_VERSION = "v82-production-clean";
const CACHE_NAME = "familytreepro-" + CACHE_VERSION;
const APP_SHELL = ["./", "./index.html?v=v82-production-clean", "./manifest.json?v=v82-production-clean"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL).catch(() => null)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const req = event.request;
  const url = new URL(req.url);

  // HTML: always try fresh network first to prevent stale GitHub Pages UI.
  if (req.mode === "navigate" || req.headers.get("accept")?.includes("text/html")) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        cache.put("./index.html?v=v82-production-clean", fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match("./index.html?v=v82-production-clean")) || new Response("Offline", { status: 503 });
      }
    })());
    return;
  }

  // Same-origin assets: network first, cache fallback. External Firebase CDN stays network-only.
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match(req)) || new Response("Offline", { status: 503 });
      }
    })());
  }
});
