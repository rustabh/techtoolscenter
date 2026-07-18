import { tools } from "@/lib/tools";
import { ogImageFor } from "@/lib/seo/metadata";
import { urlset, xmlResponse } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(
    urlset(
      tools.map((t) => ({
        loc: `/tools/${t.slug}`,
        images: [ogImageFor(t)],
      })),
    ),
  );
}
