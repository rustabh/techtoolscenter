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
};

export default nextConfig;
