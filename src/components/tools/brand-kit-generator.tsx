"use client";

import { useMemo, useState } from "react";
import { Search, Download, Loader2 } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

interface Meta { host: string; title: string; themeColor: string; favicon: string | null; preview: string | null; }

const FONT_PAIRS = [
  { heading: "Inter", body: "Inter" },
  { heading: "Poppins", body: "Inter" },
  { heading: "Playfair Display", body: "Source Sans Pro" },
  { heading: "Montserrat", body: "Open Sans" },
];

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

const STEPS = [
  { k: 50, t: 255, a: 0.9 }, { k: 100, t: 255, a: 0.78 }, { k: 200, t: 255, a: 0.6 },
  { k: 300, t: 255, a: 0.42 }, { k: 400, t: 255, a: 0.2 }, { k: 500, t: 255, a: 0 },
  { k: 600, t: 0, a: 0.15 }, { k: 700, t: 0, a: 0.3 }, { k: 800, t: 0, a: 0.45 }, { k: 900, t: 0, a: 0.6 },
];

export default function BrandKitGenerator() {
  const [url, setUrl] = useState("https://vercel.com");
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { copied, copy } = useCopy();

  const base = meta?.themeColor && /^#/.test(meta.themeColor) ? meta.themeColor : "#4f46e5";
  const palette = useMemo(() => STEPS.map((s) => ({ k: s.k, hex: mix(base, s.t, s.a) })), [base]);
  const fonts = useMemo(() => FONT_PAIRS[(meta?.host?.length ?? 0) % FONT_PAIRS.length], [meta]);

  const fetchMeta = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/site-meta?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMeta(data);
    } catch (e) {
      setError((e as Error).message || "Could not fetch this site.");
    } finally { setLoading(false); }
  };

  const cssVars = palette.map((p) => `  --brand-${p.k}: ${p.hex};`).join("\n");
  const cssText = `:root {\n${cssVars}\n}`;

  const downloadZip = async () => {
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const brand = meta?.title || meta?.host || "Brand";
      zip.file("colors.css", cssText);
      zip.file("colors.json", JSON.stringify(Object.fromEntries(palette.map((p) => [p.k, p.hex])), null, 2));
      zip.file("brand-guidelines.txt",
        `${brand} — Brand Guidelines\n${"=".repeat(40)}\n\n` +
        `Primary color: ${base}\n\nColor palette:\n` +
        palette.map((p) => `  ${p.k}: ${p.hex}`).join("\n") +
        `\n\nTypography:\n  Headings: ${fonts.heading}\n  Body: ${fonts.body}\n\n` +
        `Generated with TechToolsCenter — techtoolscenter.com`);
      if (meta?.favicon) {
        try {
          const b = await (await fetch(meta.favicon)).blob();
          zip.file("favicon" + (meta.favicon.includes("svg") ? ".svg" : ".png"), b);
        } catch { /* skip */ }
      }
      zip.file("site.webmanifest", JSON.stringify({ name: brand, theme_color: base, background_color: "#ffffff", display: "standalone" }, null, 2));
      downloadBlob(await zip.generateAsync({ type: "blob" }), `${(meta?.host || "brand").replace(/\W+/g, "-")}-brand-kit.zip`);
    } finally { setBusy(false); }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1.5">
            <Label>Website URL</Label>
            <div className="flex gap-2">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="example.com" onKeyDown={(e) => e.key === "Enter" && fetchMeta()} />
              <Button onClick={fetchMeta} disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />} Build kit
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Brand overview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              {meta?.favicon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={meta.favicon} alt="" className="size-12 rounded-xl border border-border p-1" />
              )}
              <div>
                <p className="font-semibold">{meta?.title || "Enter a URL to begin"}</p>
                <p className="text-sm text-muted-foreground">{meta?.host || "—"}</p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Primary color</p>
              <div className="flex items-center gap-2">
                <span className="size-8 rounded-lg border border-border" style={{ background: base }} />
                <code className="font-mono text-sm">{base}</code>
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Typography</p>
              <p className="text-lg font-bold" style={{ fontFamily: fonts.heading }}>{fonts.heading} <span className="text-sm font-normal text-muted-foreground">— headings</span></p>
              <p style={{ fontFamily: fonts.body }}>{fonts.body} — body text</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Color palette</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-5 gap-1.5">
              {palette.map((p) => (
                <button key={p.k} onClick={() => copy(p.hex)} title={`${p.hex} — click to copy`} className="group">
                  <span className="block h-12 rounded-lg border border-border" style={{ background: p.hex }} />
                  <span className="mt-1 block text-[10px] text-muted-foreground">{p.k}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-2">
              <code className="flex-1 overflow-auto whitespace-nowrap font-mono text-[11px]">{copied ? "Copied!" : ":root { --brand-500 … }"}</code>
              <Button size="sm" variant="outline" onClick={() => copy(cssText)}>Copy CSS</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Brand kit includes</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {["Color palette (CSS + JSON)", "Typography pairing", "Brand guidelines", "Favicon", "Web manifest", "Primary color tokens"].map((x) => (
              <span key={x} className="rounded-lg bg-secondary/50 px-3 py-2">✓ {x}</span>
            ))}
          </div>
          <Button onClick={downloadZip} disabled={busy}>
            <Download /> {busy ? "Building ZIP…" : "Download brand kit (ZIP)"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
