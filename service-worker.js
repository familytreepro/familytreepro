/* FamilyTreePro v80-backup-data-safety"v80-backup-data-safety";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request, { cache: "no-store" }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return new Response("Offline", { status: 503, statusText: "Offline" });
    })
  );
});
