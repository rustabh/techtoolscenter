/* TechToolsCenter service worker.
 * IMPORTANT: never cache HTML navigations — serving a stale app-shell after a
 * new deploy causes chunk mismatches ("client-side exception"). We only cache
 * immutable hashed static assets, and fall back to the offline page when the
 * network is unavailable. Bump CACHE_VERSION on each deploy. */
const CACHE_VERSION = "ttc-v4";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const OFFLINE_URL = "/offline";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((c) => c.addAll([OFFLINE_URL, "/favicon.svg", "/manifest.webmanifest"])).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

function isImmutableAsset(url) {
  return url.pathname.startsWith("/_next/static/") || /\.(woff2?|ttf|otf|svg|png|jpg|jpeg|webp|ico|gif)$/.test(url.pathname);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // never touch cross-origin (ads, fonts)
  if (url.pathname.startsWith("/api/")) return;

  // HTML navigations: always network; only fall back to offline page on failure.
  // We never serve cached HTML, so chunks always match the served document.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => (await caches.match(OFFLINE_URL)) || new Response("Offline", { status: 503 })),
    );
    return;
  }

  // Immutable hashed static assets: cache-first (safe — the URL changes on deploy).
  if (isImmutableAsset(url)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const res = await fetch(request);
          if (res.ok) cache.put(request, res.clone());
          return res;
        } catch {
          return cached || Response.error();
        }
      }),
    );
  }
});
