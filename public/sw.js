/* TechToolsCenter service worker.
 * Bump CACHE_VERSION on each deploy to invalidate old caches (auto-update). */
const CACHE_VERSION = "ttc-v3";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const OFFLINE_URL = "/offline";
const PRECACHE = ["/", "/tools", OFFLINE_URL, "/favicon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(PRECACHE)).catch(() => {}),
  );
  self.skipWaiting(); // activate the new SW immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

// Let the page trigger an immediate update.
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

function isStaticAsset(url) {
  return url.pathname.startsWith("/_next/static/") || /\.(css|js|woff2?|svg|png|jpg|jpeg|webp|ico)$/.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Only handle same-origin; never touch APIs or cross-origin (ads, fonts).
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  // Navigations: network-first, fall back to cache, then the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(PAGE_CACHE).then((c) => c.put(request, copy)).catch(() => {});
          return res;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(OFFLINE_URL)) || Response.error()),
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request)
          .then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
  }
});

// Background sync hook (queued retries for compatible tasks).
self.addEventListener("sync", (event) => {
  if (event.tag === "ttc-retry") {
    // Compatible tools re-run client-side on reconnect; nothing server-side to sync.
  }
});
