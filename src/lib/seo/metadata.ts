import type { Metadata } from "next";
import type { Tool } from "../tools";
import { siteConfig } from "../site";
import { getCollection, type Collection } from "../collections";

/**
 * Metadata engine — the single source of every page's title, description,
 * canonical URL, Open Graph and Twitter Card. Because titles are keyed on the
 * unique tool slug and descriptions on the unique tool copy, there are no
 * duplicate titles or descriptions anywhere on the site.
 *
 * IMPORTANT: the root layout sets a title template (`%s | ${siteConfig.name}`),
 * so every `title` returned from here must be bare — it must NOT itself end
 * in `| ${siteConfig.name}`, or the site name renders twice ("X | TechToolsCenter
 * | TechToolsCenter"). Open Graph/Twitter titles are NOT run through that
 * template (they're read out of context on social platforms), so those
 * should include the site name explicitly. `socialTitle()` below is the one
 * place that distinction is made — everything else should call it rather
 * than re-deriving its own "title + site name" string.
 */

const BASE = siteConfig.url;

/** The full, standalone title for contexts with no title template (OG/Twitter cards, RSS, etc). */
export function socialTitle(bareTitle: string): string {
  return `${bareTitle} | ${siteConfig.name}`;
}

export function seoTitleFor(tool: Tool): string {
  return tool.seoTitle ?? `${tool.name} — Free Online ${tool.name}`;
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
      title: socialTitle(title),
      description,
      images: [{ url: image, alt: `${tool.name} — ${siteConfig.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(title),
      description,
      images: [image],
      creator: siteConfig.twitter,
    },
  };
}

/**
 * The common case: a page with a title, description, canonical path, and
 * nothing else unusual (no hreflang, no RSS alternate, no per-page dynamic
 * OG image). Every hub index/category/listing page on the site fits this
 * shape — use this instead of hand-writing the same openGraph/twitter
 * block, so a future field (e.g. a new Twitter Card option) only needs to
 * change in one place.
 */
export function buildSimpleMetadata(input: {
  title: string; // bare — do NOT include "| {siteName}", the root layout's title template adds it
  description: string;
  canonical: string; // root-relative path, e.g. "/blog/category/guides"
  ogTitle?: string; // defaults to `title` + the site name (OG isn't run through the title template)
  ogDescription?: string; // defaults to `description`
  type?: "website" | "article";
}): Metadata {
  const ogTitle = input.ogTitle ?? socialTitle(input.title);
  const ogDescription = input.ogDescription ?? input.description;
  const image = defaultOgImage();
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.canonical },
    openGraph: {
      type: input.type ?? "website",
      url: `${BASE}${input.canonical}`,
      siteName: siteConfig.name,
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [image] },
  };
}

export function buildCollectionMetadata(col: Collection, count: number): Metadata {
  return buildSimpleMetadata({
    title: `${col.name} — ${count} Free Online Tools`,
    description: col.description,
    canonical: `/collections/${col.slug}`,
  });
}

export function buildCollectionMetadataBySlug(slug: string, count: number): Metadata {
  const col = getCollection(slug);
  if (!col) return {};
  return buildCollectionMetadata(col, count);
}
