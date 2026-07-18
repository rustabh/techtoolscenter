"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

export default function ImageCompressor({ preset }: { preset?: Record<string, unknown> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [quality, setQuality] = useState(typeof preset?.quality === "number" ? (preset.quality as number) : 0.7);
  const [maxWidth, setMaxWidth] = useState(typeof preset?.maxWidth === "number" ? (preset.maxWidth as number) : 1600);
  const [result, setResult] = useState<{ url: string; size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);

  const onFile = (file: File) => {
    setResult(null);
    setOriginal({ url: URL.createObjectURL(file), size: file.size, name: file.name });
  };

  const compress = async () => {
    if (!original) return;
    setBusy(true);
    const img = new Image();
    img.src = original.url;
    await img.decode();
    const scale = Math.min(1, maxWidth / img.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) setResult({ url: URL.createObjectURL(blob), size: blob.size, blob });
        setBusy(false);
      },
      "image/jpeg",
      quality
    );
  };

  const savings = original && result ? Math.max(0, Math.round((1 - result.size / original.size) * 100)) : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <UploadCloud className="size-8 text-primary" />
            <span className="font-medium">Click to upload an image</span>
            <span className="text-sm text-muted-foreground">JPG, PNG or WebP · processed locally</span>
          </button>
        </CardContent>
      </Card>

      {original && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label>Quality: {Math.round(quality * 100)}%</Label>
                <input type="range" min={0.1} max={1} step={0.05} value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label>Max width: {maxWidth}px</Label>
                <input type="range" min={400} max={4000} step={100} value={maxWidth}
                  onChange={(e) => setMaxWidth(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <Button onClick={compress} disabled={busy} className="w-full">
                {busy ? "Compressing…" : "Compress image"}
              </Button>
              {result && (
                <Button variant="outline" className="w-full"
                  onClick={() => downloadBlob(result.blob, `compressed-${original.name.replace(/\.\w+$/, "")}.jpg`)}>
                  Download compressed
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Comparison</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result?.url || original.url} alt="Preview" className="max-h-64 w-full rounded-xl object-contain" />
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
