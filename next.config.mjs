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
    ];
  },
};

export default nextConfig;
