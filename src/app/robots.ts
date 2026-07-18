import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      `${siteConfig.url}/tools-sitemap.xml`,
      `${siteConfig.url}/collections-sitemap.xml`,
      `${siteConfig.url}/image-sitemap.xml`,
    ],
    host: siteConfig.url,
  };
}
