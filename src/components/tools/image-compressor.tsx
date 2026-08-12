"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { track } from "@/lib/stats/stats";
import { CompareSlider } from "@/components/ui/compare-slider";
import { FileDropzone } from "@/components/tools/file-dropzone";

// Smart presets — one tap configures quality / width / target size.
type ImgPreset = { id: string; label: string; mode: "quality" | "target"; quality: number; maxWidth: number; targetKB?: number };
const IMG_PRESETS: ImgPreset[] = [
  { id: "instagram", label: "Instagram", mode: "quality", quality: 0.75, maxWidth: 1080 },
  { id: "facebook", label: "Facebook", mode: "quality", quality: 0.76, maxWidth: 1200 },
  { id: "linkedin", label: "LinkedIn", mode: "quality", quality: 0.78, maxWidth: 1200 },
  { id: "whatsapp", label: "WhatsApp", mode: "quality", quality: 0.72, maxWidth: 1600 },
  { id: "website", label: "Website", mode: "quality", quality: 0.8, maxWidth: 1600 },
  { id: "email", label: "Email", mode: "target", quality: 0.7, maxWidth: 1024, targetKB: 200 },
  { id: "gov", label: "Government form", mode: "target", quality: 0.55, maxWidth: 1000, targetKB: 100 },
  { id: "passport", label: "Passport", mode: "quality", quality: 0.7, maxWidth: 600 },
  { id: "aadhar", label: "Aadhaar", mode: "target", quality: 0.6, maxWidth: 1000, targetKB: 100 },
  { id: "maxq", label: "Max quality", mode: "quality", quality: 0.95, maxWidth: 4000 },
  { id: "maxc", label: "Max compression", mode: "target", quality: 0.35, maxWidth: 800, targetKB: 50 },
];

type OutputFormat = "auto" | "jpeg" | "webp" | "png";
// Extension must follow the actual encoded mime, not the UI's "auto" label —
// auto resolves to either image/jpeg or image/png depending on the source.
function extFromMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

// "auto" keeps PNG/GIF sources as PNG so transparency survives compression —
// re-encoding a transparent PNG straight to JPEG (the old hardcoded
// behaviour) silently flattens the alpha channel onto black.
function resolveMime(format: OutputFormat, sourceType: string): string {
  if (format === "jpeg") return "image/jpeg";
  if (format === "webp") return "image/webp";
  if (format === "png") return "image/png";
  return sourceType === "image/png" || sourceType === "image/gif" ? "image/png" : "image/jpeg";
}

function encode(img: HTMLImageElement, maxWidth: number, quality: number, mime: string): Promise<Blob> {
  const scale = Math.min(1, maxWidth / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((res) => canvas.toBlob((b) => res(b as Blob), mime, quality));
}

export default function ImageCompressor({ preset }: { preset?: Record<string, unknown> }) {
  const [original, setOriginal] = useState<{ url: string; size: number; name: string; type: string } | null>(null);
  const [mode, setMode] = useState<"quality" | "target">(typeof preset?.targetKB === "number" ? "target" : "quality");
  const [quality, setQuality] = useState(typeof preset?.quality === "number" ? (preset.quality as number) : 0.7);
  const [maxWidth, setMaxWidth] = useState(typeof preset?.maxWidth === "number" ? (preset.maxWidth as number) : 1600);
  const [targetKB, setTargetKB] = useState(typeof preset?.targetKB === "number" ? (preset.targetKB as number) : 100);
  const [presetId, setPresetId] = useState<string>("custom");
  const [format, setFormat] = useState<OutputFormat>("auto");
  const [result, setResult] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);

  const applyPreset = (p: ImgPreset) => {
    setPresetId(p.id);
    setMode(p.mode);
    setQuality(p.quality);
    setMaxWidth(p.maxWidth);
    if (p.targetKB) setTargetKB(p.targetKB);
  };

  const onFile = (file: File) => {
    setResult(null);
    setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name, type: file.type });
  };

  const compress = async () => {
    if (!original) return;
    setBusy(true);
    const t0 = performance.now();
    const img = new Image();
    img.src = original.url;
    await img.decode();
    const mime = resolveMime(format, original.type);
    let blob: Blob;
    if (mode === "target") {
      // Step quality (then width) down until we fit under the target size.
      // PNG is lossless — quality has no effect, so a single pass is enough.
      const target = targetKB * 1024;
      blob = await encode(img, maxWidth, quality, mime);
      if (mime !== "image/png") {
        const widths = [maxWidth, 1280, 1024, 800, 640, 480];
        outer: for (const w of widths) {
          for (let q = 0.9; q >= 0.2; q -= 0.1) {
            blob = await encode(img, w, q, mime);
            if (blob.size <= target) break outer;
          }
        }
      }
    } else {
      blob = await encode(img, maxWidth, quality, mime);
    }
    setResult({ url: URL.createObjectURL(blob), size: blob.size, blob });
    track(["imagesOptimized", "filesProcessed"], performance.now() - t0);
    setBusy(false);
  };

  const savings = original && result ? Math.max(0, Math.round((1 - result.size / original.size) * 100)) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            title="Click or drop an image here"
            subtitle="JPG, PNG or WebP · processed locally"
            accept="image/*"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
          <div className="mt-3 text-center">
            <button onClick={async () => onFile(await (await import("@/lib/samples")).sampleImageFile())}
              className="text-sm font-medium text-primary hover:underline">
              ✨ Try a sample image
            </button>
          </div>
        </CardContent>
      </Card>

      {original && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label>Smart presets</Label>
                <div className="flex flex-wrap gap-1.5">
                  {IMG_PRESETS.map((p) => (
                    <button key={p.id} onClick={() => applyPreset(p)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${presetId === p.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>{p.label}</button>
                  ))}
                  <button onClick={() => setPresetId("custom")}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${presetId === "custom" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>Custom</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { setMode("quality"); setPresetId("custom"); }}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${mode === "quality" ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>By quality</button>
                <button onClick={() => { setMode("target"); setPresetId("custom"); }}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${mode === "target" ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>By target size</button>
              </div>

              <div className="space-y-1.5">
                <Label>Output format</Label>
                <div className="flex flex-wrap gap-1.5">
                  {(["auto", "webp", "jpeg", "png"] as OutputFormat[]).map((f) => (
                    <button key={f} onClick={() => setFormat(f)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${format === f ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>
                      {f === "auto" ? "Auto" : f === "webp" ? "WebP (smallest)" : f === "jpeg" ? "JPEG" : "PNG (transparency)"}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {format === "auto"
                    ? "Auto keeps PNGs transparent and uses JPEG for photos."
                    : format === "png"
                    ? "Lossless — quality slider won't change PNG output size."
                    : "Applies to every image regardless of the original format."}
                </p>
              </div>

              {mode === "target" ? (
                <div className="space-y-1.5">
                  <Label htmlFor="ic-target-kb">Target size (KB)</Label>
                  <div className="flex flex-wrap items-center gap-2">
                    <input id="ic-target-kb" type="number" min={5} value={targetKB} onChange={(e) => setTargetKB(Math.max(5, Number(e.target.value)))}
                      className="w-24 rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm" />
                    <div className="flex gap-1">
                      {[10, 20, 50, 100, 200].map((kb) => (
                        <button key={kb} onClick={() => setTargetKB(kb)} className="rounded-lg border border-border px-2 py-1 text-xs hover:bg-secondary">{kb}KB</button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">We&apos;ll auto-tune quality and width to fit under your target.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="ic-quality">Quality: {Math.round(quality * 100)}%</Label>
                    <input id="ic-quality" type="range" min={0.1} max={1} step={0.05} value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="ic-max-width">Max width: {maxWidth}px</Label>
                    <input id="ic-max-width" type="range" min={400} max={4000} step={100} value={maxWidth}
                      onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                  </div>
                </>
              )}
              <Button onClick={compress} disabled={busy} className="w-full">
                {busy ? "Compressing…" : "Compress image"}
              </Button>
              {result && (
                <Button variant="outline" className="w-full"
                  onClick={() => downloadBlob(result.blob, `compressed-${original.name.replace(/\.\w+$/, "")}.${extFromMime(result.blob.type)}`)}>
                  Download compressed
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Comparison</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {result ? (
                <CompareSlider before={original.url} after={result.url} beforeLabel="Original" afterLabel="Compressed" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={original.url} alt="Preview" className="max-h-64 w-full rounded-xl object-contain" />
              )}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground">Original</p>
                  <p className="font-semibold">{formatBytes(original.size)}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-xs text-muted-foreground">Compressed</p>
                  <p className="font-semibold">{result ? formatBytes(result.size) : "—"}</p>
                </div>
              </div>
              {result && (
                <p className="rounded-xl bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  Saved {savings}% file size
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
