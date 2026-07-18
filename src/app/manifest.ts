import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    categories: ["productivity", "utilities", "business"],
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-maskable.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "All tools", short_name: "Tools", url: "/tools" },
      { name: "Dashboard", short_name: "Dashboard", url: "/dashboard" },
      { name: "Community", short_name: "Community", url: "/community" },
    ],
  };
}
