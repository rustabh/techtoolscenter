"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Upload, Download, Package, ShieldCheck, Smartphone, Tablet, Tv, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

/* ------------------------------------------------------------------ *
 * Exact, store-accepted export dimensions.
 * Apple: App Store Connect required screenshot pixel sizes.
 * Google Play: Console asset pixel sizes (feature graphic & TV banner
 * are fixed; phone/tablet use Google's recommended exact sizes).
 * ------------------------------------------------------------------ */
type Kind = "phone" | "tablet" | "banner";
type Platform = "apple" | "google";
type Spec = { id: string; label: string; note: string; platform: Platform; kind: Kind; w: number; h: number };

const SPECS: Spec[] = [
  // Apple — App Store Connect
  { id: "ios-6.9", label: '6.9"', note: "iPhone 16 Pro Max", platform: "apple", kind: "phone", w: 1320, h: 2868 },
  { id: "ios-6.7", label: '6.7"', note: "iPhone 15 Pro Max", platform: "apple", kind: "phone", w: 1290, h: 2796 },
  { id: "ios-6.5", label: '6.5"', note: "iPhone 11 Pro Max", platform: "apple", kind: "phone", w: 1242, h: 2688 },
  { id: "ios-5.5", label: '5.5"', note: "iPhone 8 Plus", platform: "apple", kind: "phone", w: 1242, h: 2208 },
  { id: "ios-ipad", label: "iPad", note: 'iPad Pro 12.9"', platform: "apple", kind: "tablet", w: 2048, h: 2732 },
  // Google Play — Console
  { id: "play-phone", label: "Phone", note: "Play Store phone", platform: "google", kind: "phone", w: 1080, h: 1920 },
  { id: "play-7", label: '7" Tablet', note: "Play Store 7″", platform: "google", kind: "tablet", w: 1200, h: 1920 },
  { id: "play-10", label: '10" Tablet', note: "Play Store 10″", platform: "google", kind: "tablet", w: 1600, h: 2560 },
  { id: "play-feature", label: "Feature Graphic", note: "Exactly 1024 × 500", platform: "google", kind: "banner", w: 1024, h: 500 },
  { id: "play-tv", label: "TV Banner", note: "Exactly 1280 × 720", platform: "google", kind: "banner", w: 1280, h: 720 },
];

type Template = { name: string; from: string; to: string; text: string; accent: string; solid?: boolean };
const TEMPLATES: Template[] = [
  { name: "Business", from: "#1e3a8a", to: "#2563eb", text: "#ffffff", accent: "#93c5fd" },
  { name: "Gaming", from: "#7c3aed", to: "#db2777", text: "#ffffff", accent: "#f9a8d4" },
  { name: "Finance", from: "#065f46", to: "#059669", text: "#ffffff", accent: "#6ee7b7" },
  { name: "Travel", from: "#0891b2", to: "#22d3ee", text: "#083344", accent: "#0e7490" },
  { name: "Education", from: "#ea580c", to: "#f59e0b", text: "#ffffff", accent: "#fde68a" },
  { name: "Health", from: "#0d9488", to: "#4ade80", text: "#052e2b", accent: "#0f766e" },
  { name: "AI", from: "#4f46e5", to: "#a855f7", text: "#ffffff", accent: "#c4b5fd" },
  { name: "Minimal", from: "#f8fafc", to: "#f1f5f9", text: "#0f172a", accent: "#94a3b8", solid: true },
  { name: "Luxury", from: "#0f172a", to: "#334155", text: "#f5d0a9", accent: "#c8a15a" },
  { name: "Gradient", from: "#6366f1", to: "#22d3ee", text: "#ffffff", accent: "#a5f3fc" },
];

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Render one exact-size composition onto the given canvas. */
function render(
  canvas: HTMLCanvasElement,
  spec: Spec,
  tpl: Template,
  img: HTMLImageElement | null,
  title: string,
  subtitle: string,
  frameColor: string,
  showGuides: boolean,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = spec.w;
  canvas.height = spec.h;
  const { w, h } = spec;

  // Background
  if (tpl.solid) {
    ctx.fillStyle = tpl.from;
    ctx.fillRect(0, 0, w, h);
  } else {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, tpl.from);
    g.addColorStop(1, tpl.to);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  const margin = Math.round(Math.min(w, h) * (spec.kind === "banner" ? 0.06 : 0.08));

  ctx.textAlign = "center";
  ctx.fillStyle = tpl.text;

  if (spec.kind === "banner") {
    // Marketing banner — centred wordmark + subtitle, optional shot strip behind.
    if (img) {
      ctx.save();
      ctx.globalAlpha = 0.16;
      drawCover(ctx, img, 0, 0, w, h);
      ctx.restore();
    }
    const titleSize = Math.round(w * 0.075);
    ctx.font = `800 ${titleSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    const tLines = wrapText(ctx, title || "Your App", w - margin * 2);
    const subSize = Math.round(w * 0.032);
    const blockH = tLines.length * titleSize * 1.1 + (subtitle ? subSize * 2.2 : 0);
    let ty = (h - blockH) / 2 + titleSize;
    tLines.forEach((ln) => {
      ctx.fillText(ln, w / 2, ty);
      ty += titleSize * 1.1;
    });
    if (subtitle) {
      ctx.font = `500 ${subSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
      ctx.globalAlpha = 0.85;
      ctx.fillText(subtitle, w / 2, ty + subSize * 0.4);
      ctx.globalAlpha = 1;
    }
  } else {
    // Portrait screenshot — heading up top, device mockup below.
    const titleSize = Math.round(w * 0.062);
    ctx.font = `800 ${titleSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
    const tLines = wrapText(ctx, title || "Your app, reimagined", w - margin * 2);
    let ty = margin + titleSize;
    tLines.forEach((ln) => {
      ctx.fillText(ln, w / 2, ty);
      ty += titleSize * 1.12;
    });
    if (subtitle) {
      const subSize = Math.round(w * 0.034);
      ctx.font = `500 ${subSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
      ctx.globalAlpha = 0.85;
      ctx.fillText(subtitle, w / 2, ty + subSize * 0.2);
      ctx.globalAlpha = 1;
      ty += subSize * 1.4;
    }

    // Device frame region (auto-scaled to remaining safe space).
    const regionTop = ty + margin * 0.6;
    const regionBottom = h - margin;
    const regionH = regionBottom - regionTop;
    const regionW = w - margin * 2;
    // Inner screen keeps the exact target aspect ratio.
    const screenAspect = w / h;
    let screenW = regionW;
    let screenH = screenW / screenAspect;
    if (screenH > regionH) {
      screenH = regionH;
      screenW = screenH * screenAspect;
    }
    const bez = Math.round(screenW * 0.028);
    const frameW = screenW + bez * 2;
    const frameH = screenH + bez * 2;
    const fx = (w - frameW) / 2;
    const fy = regionTop + (regionH - frameH) / 2;
    const outerR = Math.round(frameW * (spec.kind === "tablet" ? 0.05 : 0.11));

    // Bezel
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = bez * 4;
    ctx.shadowOffsetY = bez;
    ctx.fillStyle = frameColor;
    roundRect(ctx, fx, fy, frameW, frameH, outerR);
    ctx.fill();
    ctx.restore();

    // Screen
    const sx = fx + bez;
    const sy = fy + bez;
    const innerR = Math.max(0, outerR - bez);
    ctx.save();
    roundRect(ctx, sx, sy, screenW, screenH, innerR);
    ctx.clip();
    if (img) {
      drawCover(ctx, img, sx, sy, screenW, screenH);
    } else {
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(sx, sy, screenW, screenH);
      ctx.fillStyle = "#94a3b8";
      ctx.textAlign = "center";
      ctx.font = `600 ${Math.round(screenW * 0.05)}px system-ui, sans-serif`;
      ctx.fillText("Upload screenshot", sx + screenW / 2, sy + screenH / 2);
    }
    ctx.restore();

    // Notch (phones only)
    if (spec.kind === "phone") {
      const nw = screenW * 0.34;
      const nh = bez * 1.7;
      ctx.fillStyle = frameColor;
      roundRect(ctx, sx + (screenW - nw) / 2, sy, nw, nh, nh / 2);
      ctx.fill();
    }
  }

  // Safe-area guides (preview only — never exported)
  if (showGuides) {
    ctx.save();
    ctx.strokeStyle = "rgba(255,80,80,0.9)";
    ctx.lineWidth = Math.max(2, w * 0.004);
    ctx.setLineDash([w * 0.02, w * 0.015]);
    ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);
    ctx.restore();
  }
}

export default function AppScreenshotGenerator() {
  const [platform, setPlatform] = useState<Platform>("apple");
  const [specId, setSpecId] = useState("ios-6.9");
  const [tpl, setTpl] = useState<Template>(TEMPLATES[6]);
  const [title, setTitle] = useState("Your app, reimagined");
  const [subtitle, setSubtitle] = useState("Beautiful. Fast. Effortless.");
  const [frameColor, setFrameColor] = useState("#0b1020");
  const [safeAreas, setSafeAreas] = useState(true);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [busy, setBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const specs = useMemo(() => SPECS.filter((s) => s.platform === platform), [platform]);
  const spec = useMemo(() => SPECS.find((s) => s.id === specId) ?? SPECS[0], [specId]);

  // Live preview — re-render on every change.
  useEffect(() => {
    if (canvasRef.current) render(canvasRef.current, spec, tpl, img, title, subtitle, frameColor, safeAreas);
  }, [spec, tpl, img, title, subtitle, frameColor, safeAreas]);

  const onShot = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG, or WebP", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => setImg(image);
      image.onerror = () => showToast("Couldn't read that image — the file may be corrupted", "error");
      image.src = reader.result as string;
    };
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };

  const switchPlatform = (p: Platform) => {
    setPlatform(p);
    const first = SPECS.find((s) => s.platform === p);
    if (first) setSpecId(first.id);
  };

  const exportOne = useCallback(
    async (s: Spec): Promise<Blob> => {
      const c = document.createElement("canvas");
      render(c, s, tpl, img, title, subtitle, frameColor, false);
      return new Promise((resolve) => c.toBlob((b) => resolve(b as Blob), "image/png"));
    },
    [tpl, img, title, subtitle, frameColor],
  );

  const downloadPng = async () => {
    try {
      const blob = await exportOne(spec);
      downloadBlob(blob, `${spec.platform}-${spec.id}-${spec.w}x${spec.h}.png`);
      showToast("Downloaded screenshot");
    } catch {
      showToast("Couldn't export this screenshot — try again", "error");
    }
  };

  const downloadZip = async () => {
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const folder = zip.folder(platform === "apple" ? "App Store Connect" : "Google Play Console")!;
      for (const s of specs) {
        const blob = await exportOne(s);
        folder.file(`${s.id}-${s.w}x${s.h}.png`, blob);
      }
      const out = await zip.generateAsync({ type: "blob" });
      downloadBlob(out, `${platform}-store-screenshots.zip`);
      showToast(`Downloaded ${specs.length} screenshots`);
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  const KindIcon = spec.kind === "phone" ? Smartphone : spec.kind === "tablet" ? Tablet : spec.kind === "banner" ? (spec.id === "play-tv" ? Tv : ImageIcon) : Smartphone;

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Store & size</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {(["apple", "google"] as Platform[]).map((p) => (
                <button key={p} onClick={() => switchPlatform(p)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${platform === p ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>
                  {p === "apple" ? "Apple" : "Google Play"}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {specs.map((s) => (
                <button key={s.id} onClick={() => setSpecId(s.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors ${specId === s.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                  <span>
                    <span className="block text-sm font-medium">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">{s.note}</span>
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">{s.w}×{s.h}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Content</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <ShotUpload onFile={onShot} has={!!img} />
            <div className="space-y-1.5"><Label htmlFor="asg-headline">Headline</Label><Input id="asg-headline" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="asg-subtitle">Subtitle</Label><Input id="asg-subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label htmlFor="asg-color">Device colour</Label>
              <Input id="asg-color" type="color" value={frameColor} onChange={(e) => setFrameColor(e.target.value)} className="h-10 p-1" />
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={safeAreas} onChange={(e) => setSafeAreas(e.target.checked)} className="size-4 accent-[var(--primary)]" />
              <ShieldCheck className="size-4 text-muted-foreground" /> Show safe-area guides
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Template</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button key={t.name} onClick={() => setTpl(t)}
                  className={`rounded-xl border-2 px-3 py-2 text-left text-xs font-semibold transition-colors ${tpl.name === t.name ? "border-primary" : "border-transparent"}`}
                  style={{ background: t.solid ? t.from : `linear-gradient(135deg, ${t.from}, ${t.to})`, color: t.text }}>
                  {t.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <KindIcon className="size-4 text-muted-foreground" />
          <span className="font-medium">{spec.label}</span>
          <span className="text-muted-foreground">{spec.note}</span>
          <span className="ml-auto rounded-full bg-secondary px-3 py-1 font-mono text-xs">Exact {spec.w} × {spec.h}px</span>
        </div>
        <div className="flex items-center justify-center overflow-auto rounded-2xl border bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)_0/24px_24px] p-4 dark:bg-[repeating-conic-gradient(#1e293b_0_25%,#0f172a_0_50%)_0/24px_24px]">
          <canvas
            ref={canvasRef}
            className="max-h-[70vh] w-auto max-w-full rounded-lg shadow-2xl"
            style={{ aspectRatio: `${spec.w} / ${spec.h}` }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={downloadPng}><Download /> Download PNG</Button>
          <Button variant="outline" onClick={downloadZip} disabled={busy}>
            <Package /> {busy ? "Packaging…" : `All ${platform === "apple" ? "Apple" : "Play"} sizes (ZIP)`}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Rendered at exact accepted pixel dimensions &mdash; drop straight into {platform === "apple" ? "App Store Connect" : "Google Play Console"}. Safe-area guides are preview-only and never exported.
        </p>
      </div>
    </div>
  );
}

function ShotUpload({ onFile, has }: { onFile: (f?: File) => void; has: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" className="w-full" onClick={() => ref.current?.click()}>
        <Upload /> {has ? "Change screenshot" : "Upload screenshot"}
      </Button>
    </>
  );
}
