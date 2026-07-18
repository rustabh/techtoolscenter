"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

type Fmt = "png" | "jpeg" | "webp";
const FORMATS: { id: Fmt; label: string; mime: string; ext: string; lossy: boolean }[] = [
  { id: "png", label: "PNG", mime: "image/png", ext: "png", lossy: false },
  { id: "jpeg", label: "JPG", mime: "image/jpeg", ext: "jpg", lossy: true },
  { id: "webp", label: "WEBP", mime: "image/webp", ext: "webp", lossy: true },
];

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

export default function ImageConverter({ preset }: { preset?: Record<string, unknown> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [src, setSrc] = useState<{ url: string; size: number; name: string } | null>(null);
  const [to, setTo] = useState<Fmt>((preset?.to as Fmt) || "jpeg");
  const [quality, setQuality] = useState(0.9);
  const [result, setResult] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = (f: File) => {
    setError("");
    setResult(null);
    setSrc({ url: URL.createObjectURL(f), size: f.size, name: f.name });
  };

  const convert = async () => {
    if (!src) return;
    setBusy(true);
    setError("");
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src.url;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      if (to === "jpeg") {
        // JPG has no transparency — flatten onto white.
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const fmt = FORMATS.find((f) => f.id === to)!;
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, fmt.mime, fmt.lossy ? quality : undefined));
      if (!blob) throw new Error("Your browser couldn't convert this image. Try a PNG or JPG source.");
      setResult({ url: URL.createObjectURL(blob), size: blob.size, blob });
    } catch {
      setError("Couldn't read this image. Formats like HEIC aren't supported by browsers — try PNG, JPG, WEBP or AVIF.");
    } finally {
      setBusy(false);
    }
  };

  const fmt = FORMATS.find((f) => f.id === to)!;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <button onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40">
            <UploadCloud className="size-8 text-primary" />
            <span className="font-medium">{src ? src.name : "Upload an image to convert"}</span>
            <span className="text-sm text-muted-foreground">PNG, JPG, WEBP or AVIF · converted privately in your browser</span>
          </button>
        </CardContent>
      </Card>

      {src && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Convert to</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-3 gap-2">
                {FORMATS.map((f) => (
                  <button key={f.id} onClick={() => { setTo(f.id); setResult(null); }}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${to === f.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>{f.label}</button>
                ))}
              </div>
              {fmt.lossy && (
                <div className="space-y-1.5">
                  <Label>Quality: {Math.round(quality * 100)}%</Label>
                  <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                </div>
              )}
              <Button onClick={convert} disabled={busy} className="w-full">
                {busy ? <><Loader2 className="size-4 animate-spin" /> Converting…</> : `Convert to ${fmt.label}`}
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {result && (
                <Button variant="outline" className="w-full" onClick={() => downloadBlob(result.blob, `${src.name.replace(/\.\w+$/, "")}.${fmt.ext}`)}>
                  Download {fmt.label}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result?.url || src.url} alt="Preview" className="max-h-64 w-full rounded-xl object-contain" />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-secondary/60 p-3"><p className="text-xs text-muted-foreground">Original</p><p className="font-semibold">{formatBytes(src.size)}</p></div>
                <div className="rounded-xl bg-secondary/60 p-3"><p className="text-xs text-muted-foreground">Converted</p><p className="font-semibold">{result ? formatBytes(result.size) : "—"}</p></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
