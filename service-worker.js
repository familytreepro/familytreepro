/* FamilyTreePro V98 Final Production Safe Safe */
const CACHE_VERSION = "v98-final-production-safe";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    fetch(event.request, { cache: "no-store" }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return new Response("FamilyTreePro Offline", { status: 503, statusText: "Offline" });
    })
  );
});

const CACHE_VERSION_V98 = "v98-2-child-icons-verified";

/* V98.2 Child Icons Verified */
