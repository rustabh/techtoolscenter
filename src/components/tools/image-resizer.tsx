"use client";

import { useRef, useState } from "react";
import { UploadCloud, Lock, Unlock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { track } from "@/lib/stats/stats";
import { showToast } from "@/components/ui/toaster";

// Common social/document presets.
const PRESETS: { label: string; w: number; h: number }[] = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Facebook Post", w: 1200, h: 630 },
  { label: "LinkedIn Post", w: 1200, h: 627 },
  { label: "Twitter / X", w: 1600, h: 900 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "WhatsApp DP", w: 640, h: 640 },
  { label: "Passport (600×600)", w: 600, h: 600 },
];

export default function ImageResizer({ preset }: { preset?: Record<string, unknown> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState("image");
  const [origSize, setOrigSize] = useState(0);
  const [width, setWidth] = useState<number>(typeof preset?.width === "number" ? (preset.width as number) : 1080);
  const [height, setHeight] = useState<number>(typeof preset?.height === "number" ? (preset.height as number) : 1080);
  const [lock, setLock] = useState(false);
  const [ratio, setRatio] = useState(1);
  const [result, setResult] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG, or WebP", "error");
      return;
    }
    setResult(null);
    setName(f.name.replace(/\.\w+$/, ""));
    setOrigSize(f.size);
    const url = URL.createObjectURL(f);
    const image = new Image();
    image.onload = () => {
      setImg(image);
      setRatio(image.naturalWidth / image.naturalHeight);
      if (!preset?.width) { setWidth(image.naturalWidth); setHeight(image.naturalHeight); }
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      showToast("Couldn't read that image — the file may be corrupted", "error");
    };
    image.src = url;
  };

  const changeW = (w: number) => { setWidth(w); if (lock) setHeight(Math.round(w / ratio)); };
  const changeH = (h: number) => { setHeight(h); if (lock) setWidth(Math.round(h * ratio)); };
  const applyPreset = (w: number, h: number) => { setWidth(w); setHeight(h); setResult(null); };

  const resize = async () => {
    if (!img) return;
    setBusy(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas unsupported");
      // Cover-fit so the whole target is filled without distortion.
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
      if (!blob) throw new Error("empty blob");
      setResult({ url: URL.createObjectURL(blob), size: blob.size, blob });
      track(["imagesOptimized", "filesProcessed"]);
      showToast(`Resized to ${width}×${height}`);
    } catch {
      showToast("Couldn't resize this image — try a different file", "error");
    } finally {
      setBusy(false);
    }
  };

  const trySample = async () => {
    try {
      const { sampleImageFile } = await import("@/lib/samples");
      onFile(await sampleImageFile());
    } catch {
      showToast("Couldn't load the sample image — try uploading your own", "error");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <button onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40">
            <UploadCloud className="size-8 text-primary" />
            <span className="font-medium">{img ? `${name} · ${img.naturalWidth}×${img.naturalHeight}` : "Upload an image to resize"}</span>
            <span className="text-sm text-muted-foreground">Resized privately in your browser — nothing is uploaded</span>
          </button>
          <div className="mt-3 text-center">
            <button onClick={trySample}
              className="text-sm font-medium text-primary hover:underline">✨ Try a sample image</button>
          </div>
        </CardContent>
      </Card>

      {img && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Dimensions</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-1.5"><Label>Width (px)</Label><Input type="number" min={1} value={width} onChange={(e) => changeW(Number(e.target.value))} /></div>
                <button onClick={() => setLock(!lock)} title="Lock aspect ratio" aria-label={lock ? "Aspect ratio locked" : "Aspect ratio unlocked"} aria-pressed={lock} className="mb-1 rounded-lg border border-border p-2 hover:bg-secondary">
                  {lock ? <Lock className="size-4 text-primary" /> : <Unlock className="size-4 text-muted-foreground" />}
                </button>
                <div className="flex-1 space-y-1.5"><Label>Height (px)</Label><Input type="number" min={1} value={height} onChange={(e) => changeH(Number(e.target.value))} /></div>
              </div>
              <div className="space-y-1.5">
                <Label>Presets</Label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map((p) => (
                    <button key={p.label} onClick={() => applyPreset(p.w, p.h)}
                      className={`rounded-lg border px-2 py-1.5 text-left text-xs transition-colors ${width === p.w && height === p.h ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                      <span className="block font-medium">{p.label}</span>
                      <span className="block text-[10px] text-muted-foreground">{p.w}×{p.h}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={resize} disabled={busy} className="w-full">{busy ? "Resizing…" : `Resize to ${width}×${height}`}</Button>
              {result && (
                <Button variant="outline" className="w-full" onClick={() => { downloadBlob(result.blob, `${name}-${width}x${height}.png`); showToast("Downloaded resized image"); }}>Download resized image</Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result?.url || img.src} alt="Preview" className="max-h-64 w-full rounded-xl object-contain" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-secondary/60 p-3"><p className="text-xs text-muted-foreground">Original</p><p className="font-semibold">{img.naturalWidth}×{img.naturalHeight} · {formatBytes(origSize)}</p></div>
                <div className="rounded-xl bg-secondary/60 p-3"><p className="text-xs text-muted-foreground">Resized</p><p className="font-semibold">{result ? `${width}×${height} · ${formatBytes(result.size)}` : "—"}</p></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
