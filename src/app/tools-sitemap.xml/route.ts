import { tools } from "@/lib/tools";
import { landingPages } from "@/lib/landing/landing";
import { urlset, xmlResponse } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  const toolSlugs = new Set(tools.map((t) => t.slug));
  return xmlResponse(
    urlset([
      ...tools.map((t) => ({
        loc: `/tools/${t.slug}`,
        lastmod: new Date(t.addedOn).toISOString(),
        changefreq: "monthly",
        priority: t.popular ? 0.9 : 0.8,
      })),
      ...landingPages
        .filter((l) => !toolSlugs.has(l.slug))
        .map((l) => ({ loc: `/tools/${l.slug}`, changefreq: "monthly", priority: 0.7 })),
    ]),
  );
}
