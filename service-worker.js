/* FamilyTreePro V98.3 Tree Print Scroll Fix Safe */
const CACHE_VERSION = "v98-3-tree-print-scroll-fix";

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

const CACHE_VERSION_V98 = "v98-3-tree-print-scroll-fix";

/* V98.3 Tree Print Scroll Fix */
