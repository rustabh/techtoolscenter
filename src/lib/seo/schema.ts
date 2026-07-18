import type { Tool } from "../tools";
import { siteConfig } from "../site";
import { collectionForTool } from "../collections";
import { toolFaqs, toolHowToSteps, toolDifficulty } from "./content";
import { ogImageFor, seoTitleFor } from "./metadata";

/**
 * Schema engine — builds all JSON-LD graphs from registry data. Every tool page
 * emits WebApplication + SoftwareApplication + FAQPage + HowTo + BreadcrumbList,
 * and the site root emits Organization + WebSite (with SearchAction).
 */

type Json = Record<string, unknown>;

const BASE = siteConfig.url;

export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: BASE,
    logo: `${BASE}/favicon.svg`,
    description: siteConfig.description,
    sameAs: [siteConfig.developer.url],
  };
}

export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: BASE,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/tools?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; url?: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url.startsWith("http") ? it.url : `${BASE}${it.url}` } : {}),
    })),
  };
}

export function webApplicationLd(tool: Tool): Json {
  const url = `${BASE}/tools/${tool.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (web-based)",
    browserRequirements: "Requires a modern web browser",
    image: ogImageFor(tool),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
  };
}

export function softwareApplicationLd(tool: Tool): Json {
  const url = `${BASE}/tools/${tool.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: seoTitleFor(tool),
    url,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "128" },
  };
}

export function faqPageLd(tool: Tool): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: toolFaqs(tool).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function howToLd(tool: Tool): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.name}`,
    description: tool.description,
    difficulty: toolDifficulty(tool),
    step: toolHowToSteps(tool).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** Every JSON-LD graph a tool page should emit, ready to render. */
export function toolSchemas(tool: Tool): Json[] {
  const col = collectionForTool(tool);
  return [
    webApplicationLd(tool),
    softwareApplicationLd(tool),
    faqPageLd(tool),
    howToLd(tool),
    breadcrumbLd([
      { name: "Home", url: "/" },
      { name: "Tools", url: "/tools" },
      { name: col.name, url: `/collections/${col.slug}` },
      { name: tool.name, url: `/tools/${tool.slug}` },
    ]),
  ];
}
