import { allPosts } from "@/lib/blog/posts";
import { getBlogCategory } from "@/lib/blog/categories";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const base = siteConfig.url;
  const items = allPosts()
    .map((p) => {
      const cat = getBlogCategory(p.category);
      return (
        `<item>` +
        `<title>${esc(p.title)}</title>` +
        `<link>${base}/blog/${p.slug}</link>` +
        `<guid>${base}/blog/${p.slug}</guid>` +
        `<description>${esc(p.excerpt)}</description>` +
        (cat ? `<category>${esc(cat.name)}</category>` : "") +
        `<pubDate>${new Date(p.publishedOn).toUTCString()}</pubDate>` +
        `</item>`
      );
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">` +
    `<channel>` +
    `<title>${esc(siteConfig.name)} Blog</title>` +
    `<link>${base}/blog</link>` +
    `<description>${esc(siteConfig.description)}</description>` +
    `<language>en</language>` +
    `<atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml"/>` +
    items +
    `</channel></rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml", "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
