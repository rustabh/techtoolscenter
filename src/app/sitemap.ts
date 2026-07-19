import type { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools";
import { collections } from "@/lib/collections";
import { ogImageFor } from "@/lib/seo/metadata";
import { allPosts } from "@/lib/blog/posts";
import { blogCategories } from "@/lib/blog/categories";
import { landingPages } from "@/lib/landing/landing";
import { indiaCategories } from "@/lib/india/categories";
import { indiaServices } from "@/lib/india/services";
import { indiaStates } from "@/lib/india/states";
import { indiaCities } from "@/lib/india/cities";
import { schemes } from "@/lib/india/schemes";
import { hindiServices } from "@/lib/india/hindi";
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
    { url: `${base}/india-services`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/community`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
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

  const toolSlugs = new Set(tools.map((t) => t.slug));
  const landingRoutes: MetadataRoute.Sitemap = landingPages
    .filter((l) => !toolSlugs.has(l.slug))
    .map((l) => ({
      url: `${base}/tools/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const indiaRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/india-services/finder`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/india-services/schemes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/india-services/status`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    ...schemes.map((s) => ({
      url: `${base}/india-services/schemes/${s.slug}`,
      lastModified: new Date(s.updatedOn ?? now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...indiaCategories.map((c) => ({
      url: `${base}/india-services/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...indiaServices.map((s) => ({
      url: `${base}/india-services/${s.category}/${s.slug}`,
      lastModified: new Date(s.updatedOn ?? now),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...indiaStates.map((s) => ({
      url: `${base}/india-services/state/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...indiaCities.map((c) => ({
      url: `${base}/india-services/city/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    { url: `${base}/hi/india-services`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.75 },
    ...hindiServices.map((h) => ({
      url: `${base}/hi/india-services/${h.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...collectionRoutes, ...categoryRoutes, ...toolRoutes, ...landingRoutes, ...blogRoutes, ...indiaRoutes];
}
