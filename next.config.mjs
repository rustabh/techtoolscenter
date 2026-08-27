/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  async redirects() {
    // The all-in-one Business Studio was split into dedicated document tools.
    return [
      { source: "/tools/business-studio", destination: "/tools/invoice-maker", permanent: true },
      // /blog/page/1 is the same content as /blog itself — redirect at the
      // routing layer (real HTTP 308) rather than relying on the page-level
      // redirect(), which only emits a client-side meta-refresh once this
      // route is statically cached.
      { source: "/blog/page/1", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    // The background remover runs a real neural net in WASM; without
    // crossOriginIsolated, onnxruntime-web can't use SharedArrayBuffer and
    // falls back to a single thread — tens of seconds slower per image.
    // "credentialless" (rather than "require-corp") keeps this isolated
    // without forcing every third-party embed on the page to opt in via
    // CORP headers, so it doesn't need to be paired with removing ads from
    // just this one route. Scoped to this single path — no other page is
    // affected.
    return [
      {
        source: "/tools/background-remover",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
        ],
      },
    ];
  },
};

export default nextConfig;
