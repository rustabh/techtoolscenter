import type { Metadata } from "next";
import type { Tool } from "../tools";
import { siteConfig } from "../site";
import { getCollection, type Collection } from "../collections";

/**
 * Metadata engine — the single source of every page's title, description,
 * canonical URL, Open Graph and Twitter Card. Because titles are keyed on the
 * unique tool slug and descriptions on the unique tool copy, there are no
 * duplicate titles or descriptions anywhere on the site.
 */

const BASE = siteConfig.url;

export function seoTitleFor(tool: Tool): string {
  return tool.seoTitle ?? `${tool.name} — Free Online ${tool.name} | ${siteConfig.name}`;
}

export function seoDescriptionFor(tool: Tool): string {
  return tool.seoDescription ?? tool.description;
}

export function ogImageFor(tool: Tool): string {
  const img = tool.ogImage ?? siteConfig.ogImage;
  return img.startsWith("http") ? img : `${BASE}${img}`;
}

/** Absolute URL for the site-wide default OG image — the fallback for any
 *  page that doesn't (yet) generate its own dedicated preview image. */
export function defaultOgImage(): string {
  return siteConfig.ogImage.startsWith("http") ? siteConfig.ogImage : `${BASE}${siteConfig.ogImage}`;
}

export function buildToolMetadata(tool: Tool): Metadata {
  const path = `/tools/${tool.slug}`;
  const title = seoTitleFor(tool);
  const description = seoDescriptionFor(tool);
  const image = ogImageFor(tool);
  return {
    title,
    description,
    keywords: [...tool.keywords, ...(tool.tags ?? [])],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${BASE}${path}`,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: image, alt: `${tool.name} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitter,
    },
  };
}

export function buildCollectionMetadata(col: Collection, count: number): Metadata {
  const path = `/collections/${col.slug}`;
  const title = `${col.name} — ${count} Free Online Tools | ${siteConfig.name}`;
  return {
    title,
    description: col.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${BASE}${path}`,
      siteName: siteConfig.name,
      title,
      description: col.description,
      images: [{ url: defaultOgImage(), alt: `${col.name} — ${siteConfig.name}` }],
    },
    twitter: { card: "summary_large_image", title, description: col.description, images: [defaultOgImage()] },
  };
}

export function buildCollectionMetadataBySlug(slug: string, count: number): Metadata {
  const col = getCollection(slug);
  if (!col) return {};
  return buildCollectionMetadata(col, count);
}
