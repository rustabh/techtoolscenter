import { siteConfig } from "../site";

/** Minimal, dependency-free XML sitemap builders for dedicated child sitemaps. */
export interface UrlEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  images?: string[];
}

const NS = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';

export function urlset(entries: UrlEntry[]): string {
  const body = entries
    .map((e) => {
      const imgs = (e.images ?? [])
        .map((src) => `<image:image><image:loc>${abs(src)}</image:loc></image:image>`)
        .join("");
      return (
        `<url><loc>${abs(e.loc)}</loc>` +
        (e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : "") +
        (e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : "") +
        (e.priority != null ? `<priority>${e.priority}</priority>` : "") +
        imgs +
        `</url>`
      );
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset ${NS}>${body}</urlset>`;
}

function abs(u: string) {
  return u.startsWith("http") ? u : `${siteConfig.url}${u.startsWith("/") ? "" : "/"}${u}`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
