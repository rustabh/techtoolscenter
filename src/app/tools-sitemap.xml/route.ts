import { tools } from "@/lib/tools";
import { urlset, xmlResponse } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(
    urlset(
      tools.map((t) => ({
        loc: `/tools/${t.slug}`,
        lastmod: new Date(t.addedOn).toISOString(),
        changefreq: "monthly",
        priority: t.popular ? 0.9 : 0.8,
      })),
    ),
  );
}
