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
  // Prefer a large square icon as the "logo" source; fall back to standard favicons.
  const appleIcon = abs(pick(html, [/<link[^>]+rel="apple-touch-icon"[^>]*href="([^"]+)"/i]));
  const faviconHref = abs(pick(html, [
    /<link[^>]+rel="(?:shortcut )?icon"[^>]*href="([^"]+)"/i,
    /<link[^>]+rel="apple-touch-icon"[^>]*href="([^"]+)"/i,
  ])) || `${origin.origin}/favicon.ico`;

  // Detect colours from theme-color, tile colour and inline hex usage.
  const detectedColors = Array.from(
    new Set(
      [
        themeColor,
        pick(html, [/<meta name="msapplication-TileColor"[^>]*content="([^"]+)"/i]),
        ...(html.match(/#[0-9a-fA-F]{6}\b/g) || []),
      ].filter((c): c is string => !!c && /^#[0-9a-fA-F]{6}$/.test(c)),
    ),
  ).slice(0, 8);

  // Detect fonts from Google Fonts links and font-family declarations.
  const fonts = Array.from(
    new Set(
      [
        ...Array.from(html.matchAll(/fonts\.googleapis\.com\/css2?\?family=([^&"':)]+)/gi)).map((m) =>
          decodeURIComponent(m[1].split(":")[0].replace(/\+/g, " ")),
        ),
        ...Array.from(html.matchAll(/font-family:\s*['"]?([A-Za-z][A-Za-z0-9 ]{1,30})['"]?/gi)).map((m) => m[1].trim()),
      ].filter((f) => f && !/^(inherit|initial|sans-serif|serif|monospace)$/i.test(f)),
    ),
  ).slice(0, 6);

  const [favicon, logo, preview] = await Promise.all([
    toDataUrl(faviconHref),
    appleIcon ? toDataUrl(appleIcon) : Promise.resolve(null),
    ogImage ? toDataUrl(ogImage) : Promise.resolve(null),
  ]);

  return NextResponse.json({
    url: target,
    host: origin.hostname,
    title: title.slice(0, 120),
    themeColor,
    colors: detectedColors,
    fonts,
    favicon,
    logo: logo || favicon,
    preview,
  });
}
