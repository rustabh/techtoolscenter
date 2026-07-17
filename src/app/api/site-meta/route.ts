import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeUrl(input: string): string | null {
  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function pick(html: string, patterns: RegExp[]): string | null {
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].trim();
  }
  return null;
}

async function toDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") || "image/png";
    if (!type.startsWith("image")) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 2_000_000) return null;
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get("url");
  if (!raw) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  const target = normalizeUrl(raw);
  if (!target) return NextResponse.json({ error: "Invalid url" }, { status: 400 });

  let html = "";
  try {
    const res = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; TechToolsCenterBot/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    html = await res.text();
  } catch {
    return NextResponse.json({ error: "Could not reach the site" }, { status: 502 });
  }

  const origin = new URL(target);
  const abs = (u: string | null) => {
    if (!u) return null;
    try { return new URL(u, origin).toString(); } catch { return null; }
  };

  const title =
    pick(html, [/<meta property="og:site_name" content="([^"]+)"/i, /<title[^>]*>([^<]+)<\/title>/i]) ||
    origin.hostname;
  const themeColor = pick(html, [/<meta name="theme-color"[^>]*content="([^"]+)"/i]) || "#4f46e5";
  const ogImage = abs(pick(html, [
    /<meta property="og:image" content="([^"]+)"/i,
    /<meta name="twitter:image" content="([^"]+)"/i,
  ]));
  const faviconHref = abs(pick(html, [
    /<link[^>]+rel="(?:shortcut )?icon"[^>]*href="([^"]+)"/i,
    /<link[^>]+rel="apple-touch-icon"[^>]*href="([^"]+)"/i,
  ])) || `${origin.origin}/favicon.ico`;

  const [favicon, preview] = await Promise.all([
    toDataUrl(faviconHref),
    ogImage ? toDataUrl(ogImage) : Promise.resolve(null),
  ]);

  return NextResponse.json({
    url: target,
    host: origin.hostname,
    title: title.slice(0, 120),
    themeColor,
    favicon,
    preview,
  });
}
