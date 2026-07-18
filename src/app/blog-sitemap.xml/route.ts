import { allPosts } from "@/lib/blog/posts";
import { blogCategories } from "@/lib/blog/categories";
import { authors } from "@/lib/blog/authors";
import { urlset, xmlResponse } from "@/lib/seo/sitemap-xml";

export const dynamic = "force-static";

export function GET() {
  return xmlResponse(
    urlset([
      { loc: "/blog", changefreq: "daily", priority: 0.8 },
      ...blogCategories.map((c) => ({ loc: `/blog/category/${c.slug}`, changefreq: "weekly", priority: 0.6 })),
      ...authors.map((a) => ({ loc: `/blog/author/${a.slug}`, changefreq: "monthly", priority: 0.4 })),
      ...allPosts().map((p) => ({
        loc: `/blog/${p.slug}`,
        lastmod: new Date(p.updatedOn ?? p.publishedOn).toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      })),
    ]),
  );
}
