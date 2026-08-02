"use client";

import { useMemo, useRef, useState } from "react";
import { Search, Download, Loader2, Upload, FileText, Palette, Type, Sparkles } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

interface Meta {
  host: string;
  title: string;
  themeColor: string;
  colors?: string[];
  fonts?: string[];
  favicon: string | null;
  logo: string | null;
  preview: string | null;
}

const FONT_PAIRS = [
  { heading: "Inter", body: "Inter" },
  { heading: "Poppins", body: "Inter" },
  { heading: "Playfair Display", body: "Source Sans Pro" },
  { heading: "Montserrat", body: "Open Sans" },
];

/* ---------- colour helpers ---------- */
function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const n = m.length === 3 ? m.split("").map((c) => c + c).join("") : m.padEnd(6, "0").slice(0, 6);
  const int = parseInt(n, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}
function toHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}
function mix(hex: string, target: number, amt: number) {
  const { r, g, b } = hexToRgb(hex);
  return toHex(r + (target - r) * amt, g + (target - g) * amt, b + (target - b) * amt);
}
function readable(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0f172a" : "#ffffff";
}

const STEPS = [
  { k: 50, t: 255, a: 0.9 }, { k: 100, t: 255, a: 0.78 }, { k: 200, t: 255, a: 0.6 },
  { k: 300, t: 255, a: 0.42 }, { k: 400, t: 255, a: 0.2 }, { k: 500, t: 255, a: 0 },
  { k: 600, t: 0, a: 0.15 }, { k: 700, t: 0, a: 0.3 }, { k: 800, t: 0, a: 0.45 }, { k: 900, t: 0, a: 0.6 },
];

/* ---------- asset helpers ---------- */
function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "TT";
  return (parts[0][0] + (parts[1]?.[0] || parts[0][1] || "")).toUpperCase();
}

function monogramSvg(name: string, bg: string, fg: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${bg}"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Poppins, Inter, system-ui, sans-serif" font-size="240" font-weight="700" fill="${fg}">${initials(name)}</text>
</svg>`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Draw a logo contained inside a square, with optional background + rounded corners. */
function iconCanvas(logo: HTMLImageElement, size: number, bg: string | null, radius: number, pad: number) {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  if (bg) {
    ctx.fillStyle = bg;
    if (radius > 0) {
      const r = Math.min(radius, size / 2);
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(size, 0, size, size, r);
      ctx.arcTo(size, size, 0, size, r);
      ctx.arcTo(0, size, 0, 0, r);
      ctx.arcTo(0, 0, size, 0, r);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }
  }
  const inner = size - pad * 2;
  const scale = Math.min(inner / logo.width, inner / logo.height);
  const dw = logo.width * scale;
  const dh = logo.height * scale;
  ctx.drawImage(logo, (size - dw) / 2, (size - dh) / 2, dw, dh);
  return c;
}

function canvasBlob(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => c.toBlob((b) => resolve(b as Blob), "image/png"));
}

export default function BrandKitGenerator() {
  const [url, setUrl] = useState("https://vercel.com");
  const [business, setBusiness] = useState("");
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const { copied, copy } = useCopy();
  const logoInput = useRef<HTMLInputElement>(null);

  const brandName = business.trim() || meta?.title || meta?.host || "Your Brand";
  const base = meta?.themeColor && /^#/.test(meta.themeColor) ? meta.themeColor : "#4f46e5";
  const palette = useMemo(() => STEPS.map((s) => ({ k: s.k, hex: mix(base, s.t, s.a) })), [base]);
  const detected = (meta?.colors && meta.colors.length ? meta.colors : [base]).slice(0, 6);
  const fonts = useMemo(() => {
    const df = meta?.fonts?.filter(Boolean) || [];
    if (df.length >= 2) return { heading: df[0], body: df[1] };
    if (df.length === 1) return { heading: df[0], body: "Inter" };
    return FONT_PAIRS[(meta?.host?.length ?? 0) % FONT_PAIRS.length];
  }, [meta]);
  const logoSrc = uploadedLogo || meta?.logo || meta?.favicon || null;

  const fetchMeta = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/site-meta?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMeta(data);
      if (!business.trim() && data.title) setBusiness(data.title);
    } catch (e) {
      setError((e as Error).message || "Could not fetch this site.");
    } finally {
      setLoading(false);
    }
  };

  const onLogo = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG, or SVG", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUploadedLogo(reader.result as string);
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };

  const cssText = `:root {\n${palette.map((p) => `  --brand-${p.k}: ${p.hex};`).join("\n")}\n}`;

  /* ---------- generated stationery (branded HTML) ---------- */
  const shell = (title: string, body: string) =>
    `<!doctype html><html><head><meta charset="utf-8"><title>${title} — ${brandName}</title>
<style>body{margin:0;font-family:${fonts.body},system-ui,sans-serif;color:#0f172a;background:#f1f5f9;padding:32px}
.doc{max-width:820px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.08)}
.bar{background:${base};color:${readable(base)};padding:28px 40px;display:flex;justify-content:space-between;align-items:center}
.bar h1{margin:0;font-family:${fonts.heading},sans-serif;font-size:26px}.p{padding:40px}
table{width:100%;border-collapse:collapse;margin:20px 0}th,td{text-align:left;padding:12px;border-bottom:1px solid #e2e8f0}
th{color:${base};font-size:12px;text-transform:uppercase;letter-spacing:.05em}.tot{text-align:right;font-size:20px;font-weight:700;color:${base}}
.muted{color:#64748b;font-size:13px}</style></head><body><div class="doc">${body}
<div class="p muted">Generated by ${brandName} · powered by TechToolsCenter</div></div></body></html>`;

  const table = (label: string) => `<table><tr><th>${label}</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
<tr><td>Service / product line</td><td>1</td><td>1,000.00</td><td>1,000.00</td></tr>
<tr><td>Additional item</td><td>2</td><td>250.00</td><td>500.00</td></tr></table>
<p class="tot">Total: 1,500.00</p>`;

  const docs = () => ({
    "stationery/invoice.html": shell("Invoice",
      `<div class="bar"><h1>${brandName}</h1><div>INVOICE #0001</div></div><div class="p"><p class="muted">Billed to: Client Name · Date: ____</p>${table("Description")}</div>`),
    "stationery/quotation.html": shell("Quotation",
      `<div class="bar"><h1>${brandName}</h1><div>QUOTATION</div></div><div class="p"><p class="muted">Prepared for: Prospect Name · Valid 30 days</p>${table("Item")}</div>`),
    "stationery/receipt.html": shell("Receipt",
      `<div class="bar"><h1>${brandName}</h1><div>RECEIPT</div></div><div class="p"><p class="muted">Received with thanks · Payment: ____</p>${table("Description")}</div>`),
    "stationery/letterhead.html": shell("Letterhead",
      `<div class="bar"><h1>${brandName}</h1><div class="muted" style="color:${readable(base)}">${meta?.host || "yourdomain.com"}</div></div><div class="p"><p>Dear ______,</p><p style="line-height:1.7">Your letter content goes here. This letterhead carries your brand colour, typography and name for a consistent, professional impression.</p><p>Warm regards,<br><b>${brandName}</b></p></div>`),
    "stationery/business-card.html": shell("Business Card",
      `<div style="width:1050px;height:600px;background:${base};color:${readable(base)};border-radius:24px;padding:60px;box-sizing:border-box;font-family:${fonts.heading},sans-serif">
<div style="font-size:52px;font-weight:700">${brandName}</div><div style="opacity:.8;margin-top:8px;font-size:22px">${meta?.host || "yourdomain.com"}</div>
<div style="margin-top:120px;font-size:20px;opacity:.9">Your Name · Title<br>hello@${(meta?.host || "brand.com").replace(/^www\./, "")} · +1 000 000 0000</div></div>`),
    "stationery/email-signature.html":
      `<table cellpadding="0" cellspacing="0" style="font-family:${fonts.body},Arial,sans-serif;color:#0f172a"><tr>
<td style="padding-right:16px;border-right:3px solid ${base}"><div style="font-family:${fonts.heading},sans-serif;font-size:18px;font-weight:700;color:${base}">${brandName}</div>
<div style="font-size:13px;color:#475569">Your Name · Title</div></td>
<td style="padding-left:16px;font-size:13px;color:#475569">hello@${(meta?.host || "brand.com").replace(/^www\./, "")}<br>${meta?.host || "yourdomain.com"}</td></tr></table>`,
  });

  /* ---------- Brand Book PDF ---------- */
  const buildBrandBook = async () => {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const W = pdf.internal.pageSize.getWidth();
    const H = pdf.internal.pageSize.getHeight();
    const rgb = (hex: string) => { const { r, g, b } = hexToRgb(hex); return [r, g, b] as [number, number, number]; };

    // Cover
    pdf.setFillColor(...rgb(base));
    pdf.rect(0, 0, W, H, "F");
    if (logoSrc) {
      try {
        const img = await loadImage(logoSrc);
        const c = iconCanvas(img, 240, null, 0, 0);
        pdf.addImage(c.toDataURL("image/png"), "PNG", W / 2 - 60, H / 2 - 150, 120, 120);
      } catch { /* skip */ }
    }
    if (readable(base) === "#ffffff") pdf.setTextColor(255, 255, 255);
    else pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(34);
    pdf.text(brandName, W / 2, H / 2 + 10, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);
    pdf.text("Brand Guidelines", W / 2, H / 2 + 40, { align: "center" });

    // Colours page
    pdf.addPage();
    pdf.setTextColor(15, 23, 42);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("Colour Palette", 48, 64);
    let y = 96;
    palette.forEach((p, i) => {
      const x = 48 + (i % 5) * 100;
      if (i === 5) y = 200;
      pdf.setFillColor(...rgb(p.hex));
      pdf.roundedRect(x, y, 84, 84, 8, 8, "F");
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`${p.k}`, x, y + 100);
      pdf.text(p.hex, x, y + 112);
    });

    // Typography page
    pdf.addPage();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("Typography", 48, 64);
    pdf.setFontSize(40);
    pdf.setTextColor(...rgb(base));
    pdf.text(fonts.heading, 48, 130);
    pdf.setFontSize(12);
    pdf.setTextColor(100, 116, 139);
    pdf.text("Headings", 48, 150);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(20);
    pdf.setTextColor(15, 23, 42);
    pdf.text(fonts.body, 48, 210);
    pdf.setFontSize(12);
    pdf.setTextColor(100, 116, 139);
    pdf.text("Body text", 48, 228);
    pdf.setFontSize(10);
    pdf.text("Generated with TechToolsCenter — techtoolscenter.com", 48, H - 40);
    return pdf;
  };

  const downloadBrandBook = async () => {
    setBusy("pdf");
    try {
      const pdf = await buildBrandBook();
      pdf.save(`${brandName.replace(/\W+/g, "-").toLowerCase()}-brand-book.pdf`);
      showToast("Downloaded brand book PDF");
    } catch {
      showToast("Couldn't generate the brand book — try again", "error");
    } finally {
      setBusy("");
    }
  };

  /* ---------- Full kit ZIP ---------- */
  const downloadZip = async () => {
    setBusy("zip");
    try {
      const JSZip = (await import("jszip")).default;
      const QRCode = (await import("qrcode")).default;
      const zip = new JSZip();

      // Colours + tokens
      zip.file("colors.css", cssText);
      zip.file("colors.json", JSON.stringify(Object.fromEntries(palette.map((p) => [p.k, p.hex])), null, 2));
      zip.file("brand-guidelines.txt",
        `${brandName} — Brand Guidelines\n${"=".repeat(40)}\n\nPrimary: ${base}\nDetected colours: ${detected.join(", ")}\n\nPalette:\n` +
        palette.map((p) => `  ${p.k}: ${p.hex}`).join("\n") +
        `\n\nTypography:\n  Headings: ${fonts.heading}\n  Body: ${fonts.body}\n\nGenerated with TechToolsCenter — techtoolscenter.com`);

      // Manifest
      zip.file("site.webmanifest", JSON.stringify({
        name: brandName, short_name: brandName.slice(0, 12), theme_color: base, background_color: "#ffffff", display: "standalone",
        icons: [{ src: "app-icons/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "app-icons/icon-512.png", sizes: "512x512", type: "image/png" }],
      }, null, 2));

      // Logo source (uploaded / detected / monogram)
      let logoImg: HTMLImageElement;
      if (logoSrc) {
        try { logoImg = await loadImage(logoSrc); }
        catch { logoImg = await loadImage("data:image/svg+xml;utf8," + encodeURIComponent(monogramSvg(brandName, base, readable(base)))); }
      } else {
        logoImg = await loadImage("data:image/svg+xml;utf8," + encodeURIComponent(monogramSvg(brandName, base, readable(base))));
      }

      // Logo pack — SVG (wraps the logo), transparent PNG, solid PNG
      const svg = logoSrc && !uploadedLogo?.startsWith("data:image/svg")
        ? `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512"><image width="512" height="512" xlink:href="${logoSrc}"/></svg>`
        : monogramSvg(brandName, base, readable(base));
      zip.file("logo/logo.svg", svg);
      zip.file("logo/logo-transparent.png", await canvasBlob(iconCanvas(logoImg, 512, null, 0, 32)));
      zip.file("logo/logo.png", await canvasBlob(iconCanvas(logoImg, 512, "#ffffff", 0, 48)));

      // Favicon pack
      for (const s of [16, 32, 48]) zip.file(`favicons/favicon-${s}.png`, await canvasBlob(iconCanvas(logoImg, s, "#ffffff", 0, Math.round(s * 0.08))));
      zip.file("favicons/apple-touch-icon-180.png", await canvasBlob(iconCanvas(logoImg, 180, base, 0, 28)));

      // App icons
      zip.file("app-icons/icon-192.png", await canvasBlob(iconCanvas(logoImg, 192, base, 0, 30)));
      zip.file("app-icons/icon-512.png", await canvasBlob(iconCanvas(logoImg, 512, base, 0, 80)));
      zip.file("app-icons/icon-maskable-512.png", await canvasBlob(iconCanvas(logoImg, 512, base, 0, 130)));

      // QR to website
      const qr = await QRCode.toDataURL(meta?.host ? `https://${meta.host}` : url, { width: 512, margin: 1, color: { dark: base, light: "#ffffff" } });
      zip.file("qr/website-qr.png", await (await fetch(qr)).blob());

      // Social kit banners
      const socials: { name: string; w: number; h: number }[] = [
        { name: "linkedin-banner-1584x396", w: 1584, h: 396 },
        { name: "twitter-header-1500x500", w: 1500, h: 500 },
        { name: "instagram-post-1080x1080", w: 1080, h: 1080 },
      ];
      for (const s of socials) {
        const c = document.createElement("canvas");
        c.width = s.w; c.height = s.h;
        const ctx = c.getContext("2d")!;
        const g = ctx.createLinearGradient(0, 0, s.w, s.h);
        g.addColorStop(0, base);
        g.addColorStop(1, mix(base, 0, 0.35));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s.w, s.h);
        const li = iconCanvas(logoImg, Math.round(s.h * 0.4), null, 0, 0);
        ctx.drawImage(li, s.w * 0.08, (s.h - li.height) / 2);
        ctx.fillStyle = readable(base);
        ctx.font = `700 ${Math.round(s.h * 0.16)}px system-ui, sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillText(brandName, s.w * 0.08 + Math.round(s.h * 0.46), s.h / 2);
        zip.file(`social/${s.name}.png`, await canvasBlob(c));
      }

      // Stationery
      for (const [name, html] of Object.entries(docs())) zip.file(name, html);

      // Brand book
      const pdf = await buildBrandBook();
      zip.file("brand-book.pdf", pdf.output("blob"));

      downloadBlob(await zip.generateAsync({ type: "blob" }), `${(meta?.host || brandName).replace(/\W+/g, "-").toLowerCase()}-brand-studio.zip`);
      showToast("Downloaded full brand kit");
    } catch {
      showToast("Couldn't build the brand kit — try again", "error");
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-3">
          <div className="space-y-1.5 md:col-span-1">
            <Label>Website URL</Label>
            <div className="flex gap-2">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" onKeyDown={(e) => e.key === "Enter" && fetchMeta()} />
              <Button onClick={fetchMeta} disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Business name</Label>
            <Input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Your Brand" />
          </div>
          <div className="space-y-1.5">
            <Label>Logo (optional)</Label>
            <input ref={logoInput} type="file" accept="image/*" className="hidden" onChange={(e) => onLogo(e.target.files?.[0])} />
            <Button variant="outline" className="w-full" onClick={() => logoInput.current?.click()}>
              <Upload /> {uploadedLogo ? "Change logo" : "Upload logo"}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive md:col-span-3">{error}</p>}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="size-4" /> Detected logo</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoSrc} alt="" className="size-16 rounded-2xl border border-border object-contain p-1.5" />
              ) : (
                <span className="grid size-16 place-items-center rounded-2xl text-2xl font-bold" style={{ background: base, color: readable(base) }}>{initials(brandName)}</span>
              )}
              <div>
                <p className="font-semibold">{brandName}</p>
                <p className="text-sm text-muted-foreground">{meta?.host || "Fetch or upload to detect"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="size-4" /> Detected colours</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {detected.map((c) => (
                <button key={c} onClick={() => copy(c)} title={`${c} — copy`} className="size-8 rounded-lg border border-border" style={{ background: c }} />
              ))}
            </div>
            <div className="grid grid-cols-5 gap-1">
              {palette.map((p) => (
                <button key={p.k} onClick={() => copy(p.hex)} title={`${p.hex} — copy`}>
                  <span className="block h-8 rounded" style={{ background: p.hex }} />
                </button>
              ))}
            </div>
            <Button size="sm" variant="outline" onClick={() => copy(cssText)}>{copied ? "Copied!" : "Copy CSS tokens"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Type className="size-4" /> Detected fonts</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>{fonts.heading}</p>
            <p className="text-xs text-muted-foreground">Headings</p>
            <p className="mt-3 text-lg" style={{ fontFamily: fonts.body }}>{fonts.body}</p>
            <p className="text-xs text-muted-foreground">Body</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Enterprise brand kit includes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Brand Book PDF", "Logo pack (PNG · SVG · transparent)", "Favicon pack", "App icons + maskable",
              "Business card", "Letterhead", "Invoice template", "Quotation template", "Receipt template",
              "Email signature", "Social kit banners", "Website QR", "Web manifest", "Colour tokens (CSS + JSON)",
            ].map((x) => (
              <span key={x} className="rounded-lg bg-secondary/50 px-3 py-2">✓ {x}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={downloadZip} disabled={!!busy}>
              <Download /> {busy === "zip" ? "Building kit…" : "Download full kit (ZIP)"}
            </Button>
            <Button variant="outline" onClick={downloadBrandBook} disabled={!!busy}>
              <FileText /> {busy === "pdf" ? "Rendering…" : "Brand Book PDF"}
            </Button>
            <Button variant="ghost" onClick={async () => { const { saveItem } = await import("@/lib/saved"); saveItem({ type: "brandkit", title: brandName, subtitle: base, thumb: logoSrc ?? undefined, href: "/tools/brand-kit-generator" }); }} disabled={!!busy}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
