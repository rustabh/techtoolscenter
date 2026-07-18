import { collections } from "@/lib/collections";
import { urlset, xmlResponse } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(
    urlset(
      collections.map((c) => ({
        loc: `/collections/${c.slug}`,
        changefreq: "weekly",
        priority: 0.8,
      })),
    ),
  );
}
