import { getTool, tools } from "@/lib/tools";
import { getLanding, landingPages } from "@/lib/landing/landing";
import { renderSiteOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/site-og";

export const alt = "TechToolsCenter tool";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// /tools/[slug] serves both real tools and programmatic-SEO landing pages —
// this list has to match page.tsx's generateStaticParams exactly, or a
// landing page's OG image request would 404 or silently fall back to a
// generic title instead of its own.
export function generateStaticParams() {
  const toolSlugs = new Set(tools.map((t) => t.slug));
  const landing = landingPages.filter((l) => !toolSlugs.has(l.slug)).map((l) => ({ slug: l.slug }));
  return [...tools.map((t) => ({ slug: t.slug })), ...landing];
}

export default async function Image({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (tool) {
    return renderSiteOg({ badge: tool.category, title: tool.name, subtitle: tool.description });
  }
  const landing = getLanding(params.slug);
  if (landing) {
    return renderSiteOg({ badge: "Free Online Tool", title: landing.h1, subtitle: landing.description });
  }
  return renderSiteOg({ badge: "Free Online Tool", title: "TechToolsCenter" });
}
