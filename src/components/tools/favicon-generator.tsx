"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, Download, Copy, Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

type Mode = "text" | "emoji" | "image";
type Shape = "rounded" | "circle" | "square";

const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 512];

const HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

const MANIFEST = JSON.stringify(
  {
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  },
  null,
  2
);

function drawIcon(
  size: number,
  opts: { mode: Mode; text: string; bg: string; fg: string; shape: Shape; transparent: boolean; img?: HTMLImageElement | null }
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const r = opts.shape === "circle" ? size / 2 : opts.shape === "rounded" ? size * 0.22 : 0;

  if (!opts.transparent) {
    ctx.fillStyle = opts.bg;
    roundRect(ctx, 0, 0, size, size, r);
    ctx.fill();
  } else if (r > 0) {
    roundRect(ctx, 0, 0, size, size, r);
    ctx.clip();
  }

  if (opts.mode === "image" && opts.img) {
    const s = size * 0.82;
    ctx.drawImage(opts.img, (size - s) / 2, (size - s) / 2, s, s);
  } else {
    const content = opts.mode === "emoji" ? opts.text || "⭐" : (opts.text || "T").slice(0, 2);
    ctx.fillStyle = opts.fg;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${opts.mode === "emoji" ? size * 0.7 : size * 0.5}px system-ui, -apple-system, "Segoe UI", sans-serif`;
    ctx.fillText(content, size / 2, size * 0.54);
  }
  return canvas;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function canvasToBlob(c: HTMLCanvasElement): Promise<Blob> {
  return new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
}

// Minimal ICO wrapper around a 32×32 PNG (PNG-in-ICO is valid).
function pngToIco(png: Uint8Array): Uint8Array {
  const header = new Uint8Array(22);
  const dv = new DataView(header.buffer);
  dv.setUint16(0, 0, true); // reserved
  dv.setUint16(2, 1, true); // type: icon
  dv.setUint16(4, 1, true); // count
  header[6] = 32; // width
  header[7] = 32; // height
  header[8] = 0; // colors
  header[9] = 0; // reserved
  dv.setUint16(10, 1, true); // planes
  dv.setUint16(12, 32, true); // bpp
  dv.setUint32(14, png.length, true); // size
  dv.setUint32(18, 22, true); // offset
  const out = new Uint8Array(22 + png.length);
  out.set(header, 0);
  out.set(png, 22);
  return out;
}

export default function FaviconGenerator() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("T");
  const [bg, setBg] = useState("#4f46e5");
  const [fg, setFg] = useState("#ffffff");
  const [shape, setShape] = useState<Shape>("rounded");
  const [transparent, setTransparent] = useState(false);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const { copied, copy } = useCopy();

  const opts = useMemo(() => ({ mode, text, bg, fg, shape, transparent, img }), [mode, text, bg, fg, shape, transparent, img]);

  useEffect(() => {
    const c = drawIcon(256, opts);
    const target = previewRef.current;
    if (target) {
      target.width = 256;
      target.height = 256;
      target.getContext("2d")!.drawImage(c, 0, 0);
    }
  }, [opts]);

  const onImage = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG, or SVG", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => { setImg(image); setMode("image"); };
      image.onerror = () => showToast("Couldn't read that image — the file may be corrupted", "error");
      image.src = reader.result as string;
    };
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };

  const downloadZip = async () => {
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const size of SIZES) {
        const blob = await canvasToBlob(drawIcon(size, opts));
        const name =
          size === 180 ? "apple-touch-icon.png"
          : size === 192 ? "android-chrome-192x192.png"
          : size === 512 ? "android-chrome-512x512.png"
          : `favicon-${size}x${size}.png`;
        zip.file(name, blob);
      }
      const ico32 = new Uint8Array(await (await canvasToBlob(drawIcon(32, opts))).arrayBuffer());
      zip.file("favicon.ico", pngToIco(ico32));
      zip.file("site.webmanifest", MANIFEST);
      zip.file("favicon-snippet.html", HTML_SNIPPET);
      const out = await zip.generateAsync({ type: "blob" });
      downloadBlob(out, "favicons.zip");
      showToast("Downloaded favicons.zip");
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  const downloadPng = async (size: number) => {
    try {
      const blob = await canvasToBlob(drawIcon(size, opts));
      downloadBlob(blob, `favicon-${size}x${size}.png`);
      showToast(`Downloaded favicon-${size}x${size}.png`);
    } catch {
      showToast("Couldn't generate that PNG — try again", "error");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Source</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {(["text", "emoji", "image"] as Mode[]).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium capitalize transition-colors ${mode === m ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>
                  {m}
                </button>
              ))}
            </div>
            {mode === "image" ? (
              <ImageUpload onFile={onImage} hasImage={!!img} />
            ) : (
              <div className="space-y-1.5">
                <Label>{mode === "emoji" ? "Emoji" : "Text (1–2 characters)"}</Label>
                <Input value={text} onChange={(e) => setText(e.target.value)} placeholder={mode === "emoji" ? "⭐" : "T"} maxLength={mode === "emoji" ? 4 : 3} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Style</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Background</Label><Input type="color" value={bg} onChange={(e) => setBg(e.target.value)} disabled={transparent} className="h-10 p-1" /></div>
              {mode !== "image" && <div className="space-y-1.5"><Label>Foreground</Label><Input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-10 p-1" /></div>}
            </div>
            <div className="space-y-1.5">
              <Label>Shape</Label>
              <div className="grid grid-cols-3 gap-2">
                {(["rounded", "circle", "square"] as Shape[]).map((s) => (
                  <button key={s} onClick={() => setShape(s)}
                    className={`rounded-xl border px-3 py-2 text-sm capitalize transition-colors ${shape === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
              Transparent background
            </label>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <Card>
          <CardHeader><CardTitle>Preview & export</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-end justify-center gap-4 rounded-2xl border border-border bg-secondary/40 p-6">
              <canvas ref={previewRef} className="size-24 rounded-xl" aria-label="Favicon preview" />
              <div className="flex items-end gap-3">
                <PreviewAt size={64} opts={opts} />
                <PreviewAt size={32} opts={opts} />
                <PreviewAt size={16} opts={opts} />
              </div>
            </div>

            <Button className="w-full" onClick={downloadZip} disabled={busy}>
              <Download /> {busy ? "Building ZIP…" : "Download all (ZIP)"}
            </Button>

            <div className="flex flex-wrap gap-2">
              {[16, 32, 180, 512].map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => downloadPng(s)}>{s}px</Button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>HTML snippet</Label>
                <Button variant="ghost" size="sm" onClick={() => copy(HTML_SNIPPET)}>
                  {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />} Copy
                </Button>
              </div>
              <pre className="overflow-auto rounded-xl bg-secondary/50 p-3 text-[11px] leading-relaxed">{HTML_SNIPPET}</pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PreviewAt({ size, opts }: { size: number; opts: Parameters<typeof drawIcon>[1] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = drawIcon(size, opts);
    const t = ref.current;
    if (t) { t.width = size; t.height = size; t.getContext("2d")!.drawImage(c, 0, 0); }
  }, [size, opts]);
  return <canvas ref={ref} style={{ width: size, height: size }} className="rounded" aria-hidden />;
}

function ImageUpload({ onFile, hasImage }: { onFile: (f?: File) => void; hasImage: boolean }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <Button variant="outline" className="w-full" onClick={() => ref.current?.click()}>
        <Upload /> {hasImage ? "Change image" : "Upload image (PNG/SVG)"}
      </Button>
    </>
  );
}
