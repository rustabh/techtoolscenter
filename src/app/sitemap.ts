import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools";
import { collections } from "@/lib/collections";
import { ogImageFor } from "@/lib/seo/metadata";
import { allPosts } from "@/lib/blog/posts";
import { blogCategories } from "@/lib/blog/categories";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/collections`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/category/${c.id.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: new Date(t.addedOn),
    changeFrequency: "monthly",
    priority: 0.8,
    images: [ogImageFor(t)], // drives the image sitemap
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    ...blogCategories.map((c) => ({
      url: `${base}/blog/category/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...allPosts().map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedOn ?? p.publishedOn),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...collectionRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
