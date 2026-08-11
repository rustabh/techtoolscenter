"use client";

import { useState } from "react";
import { Loader2, Download, X, FileImage } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { track } from "@/lib/stats/stats";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

type Fmt = "png" | "jpeg" | "webp";
const FORMATS: { id: Fmt; label: string; mime: string; ext: string; lossy: boolean }[] = [
  { id: "png", label: "PNG", mime: "image/png", ext: "png", lossy: false },
  { id: "jpeg", label: "JPG", mime: "image/jpeg", ext: "jpg", lossy: true },
  { id: "webp", label: "WEBP", mime: "image/webp", ext: "webp", lossy: true },
];

function isHeic(file: File): boolean {
  return /\.(heic|heif)$/i.test(file.name) || file.type === "image/heic" || file.type === "image/heif";
}

interface QueueItem {
  id: string;
  file: File;
  originalSize: number;
  previewUrl: string | null; // null for HEIC until decoded — most browsers can't render HEIC in <img>
  result: { blob: Blob; url: string; size: number } | null;
  error: string | null;
}

/** Loads a Blob/File as an <img>, draws it to a canvas at the target format/quality. */
async function encodeToFormat(source: Blob, to: Fmt, quality: number): Promise<Blob> {
  const url = URL.createObjectURL(source);
  try {
    const img = new Image();
    img.src = url;
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
    if (!blob) throw new Error("Your browser couldn't encode this image.");
    return blob;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Decodes a HEIC/HEIF file to JPEG first — browsers can't natively read HEIC, so it needs a real decoder. */
async function decodeHeic(file: File): Promise<Blob> {
  const heic2any = (await import("heic2any")).default;
  const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
  return Array.isArray(out) ? out[0] : out;
}

export default function ImageConverter({ preset }: { preset?: Record<string, unknown> }) {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [to, setTo] = useState<Fmt>((preset?.to as Fmt) || "jpeg");
  const [quality, setQuality] = useState(0.9);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");

  const addFiles = (files: File[]) => {
    const accepted: QueueItem[] = [];
    let rejected = 0;
    for (const f of files) {
      if (!f.type.startsWith("image/") && !isHeic(f)) {
        rejected++;
        continue;
      }
      accepted.push({
        id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2)}`,
        file: f,
        originalSize: f.size,
        previewUrl: isHeic(f) ? null : URL.createObjectURL(f),
        result: null,
        error: null,
      });
    }
    if (rejected > 0) showToast(`Skipped ${rejected} file${rejected > 1 ? "s" : ""} — not a supported image type`, "error");
    if (accepted.length) setQueue((q) => [...q, ...accepted]);
  };

  const trySample = async () => {
    try {
      const { sampleImageFile } = await import("@/lib/samples");
      addFiles([await sampleImageFile()]);
    } catch {
      showToast("Couldn't load the sample image — try uploading your own", "error");
    }
  };

  const removeItem = (id: string) => {
    setQueue((q) => {
      const item = q.find((i) => i.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item?.result) URL.revokeObjectURL(item.result.url);
      return q.filter((i) => i.id !== id);
    });
  };

  const reset = () => {
    queue.forEach((i) => {
      if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      if (i.result) URL.revokeObjectURL(i.result.url);
    });
    setQueue([]);
  };

  const convertAll = async () => {
    if (queue.length === 0) return;
    setBusy(true);
    const fmt = FORMATS.find((f) => f.id === to)!;
    let done = 0;
    let converted = 0;
    for (const item of queue) {
      setProgress(`Converting ${done + 1} of ${queue.length}…`);
      try {
        const source = isHeic(item.file) ? await decodeHeic(item.file) : item.file;
        const blob = await encodeToFormat(source, to, quality);
        const url = URL.createObjectURL(blob);
        setQueue((q) => q.map((i) => (i.id === item.id ? { ...i, result: { blob, url, size: blob.size }, error: null } : i)));
        converted++;
      } catch {
        const msg = isHeic(item.file)
          ? "Couldn't decode this HEIC file — it may use a variant this decoder doesn't support."
          : "Couldn't read this image.";
        setQueue((q) => q.map((i) => (i.id === item.id ? { ...i, error: msg } : i)));
      }
      done++;
    }
    setBusy(false);
    setProgress("");
    if (converted > 0) {
      track(["conversions", "filesProcessed"]);
      showToast(`Converted ${converted} of ${queue.length} image${queue.length > 1 ? "s" : ""} to ${fmt.label}`);
    } else {
      showToast("Couldn't convert any of these files", "error");
    }
  };

  const downloadAllZip = async () => {
    const done = queue.filter((i) => i.result);
    if (done.length === 0) return;
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      const fmt = FORMATS.find((f) => f.id === to)!;
      done.forEach((i) => {
        zip.file(`${i.file.name.replace(/\.\w+$/, "")}.${fmt.ext}`, i.result!.blob);
      });
      const out = await zip.generateAsync({ type: "blob" });
      downloadBlob(out, `converted-images.zip`);
      showToast("Downloaded .zip");
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    }
  };

  const fmt = FORMATS.find((f) => f.id === to)!;
  const totalOriginal = queue.reduce((n, i) => n + i.originalSize, 0);
  const totalConverted = queue.reduce((n, i) => n + (i.result?.size ?? 0), 0);
  const doneCount = queue.filter((i) => i.result).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            title={queue.length ? `${queue.length} image${queue.length > 1 ? "s" : ""} queued — drop more to add` : "Click or drop image(s) here to convert"}
            subtitle="PNG, JPG, WEBP, AVIF or HEIC/HEIF (iPhone photos) · converted privately in your browser"
            accept="image/*,.heic,.heif"
            multiple
            onFiles={addFiles}
          />
          <div className="mt-3 text-center">
            <button onClick={trySample}
              className="text-sm font-medium text-primary hover:underline">✨ Try a sample image</button>
          </div>
        </CardContent>
      </Card>

      {queue.length > 0 && (
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <Card className="min-w-0">
            <CardHeader><CardTitle>Convert to</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-3 gap-2">
                {FORMATS.map((f) => (
                  <button key={f.id} onClick={() => setTo(f.id)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${to === f.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>{f.label}</button>
                ))}
              </div>
              {fmt.lossy && (
                <div className="space-y-1.5">
                  <Label>Quality: {Math.round(quality * 100)}%</Label>
                  <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                </div>
              )}
              <Button onClick={convertAll} disabled={busy} className="w-full">
                {busy ? <><Loader2 className="size-4 animate-spin" /> {progress}</> : `Convert ${queue.length > 1 ? `all ${queue.length} ` : ""}to ${fmt.label}`}
              </Button>
              <div className="flex flex-wrap gap-2">
                {doneCount > 1 && (
                  <Button variant="outline" onClick={downloadAllZip} className="flex-1">
                    <Download className="size-4" /> Download all ({doneCount}) as .zip
                  </Button>
                )}
                {queue.length > 0 && (
                  <Button variant="ghost" onClick={reset} className={doneCount > 1 ? "" : "flex-1"}>
                    Clear all
                  </Button>
                )}
              </div>
              {doneCount > 0 && totalOriginal > 0 && (
                <div className="rounded-xl bg-secondary/60 p-3 text-sm">
                  <p className="text-xs text-muted-foreground">Total size</p>
                  <p className="font-semibold">
                    {formatBytes(totalOriginal)} → {formatBytes(totalConverted)}
                    {totalConverted < totalOriginal && totalOriginal > 0 && (
                      <span className="ml-1.5 text-xs font-normal text-emerald-600 dark:text-emerald-400">
                        ({Math.round((1 - totalConverted / totalOriginal) * 100)}% smaller)
                      </span>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader><CardTitle>{queue.length === 1 ? "Preview" : "Queue"}</CardTitle></CardHeader>
            <CardContent>
              <ul className="min-w-0 space-y-2">
                {queue.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 rounded-xl border border-border p-2.5">
                    {item.result?.url || item.previewUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.result?.url || item.previewUrl!} alt={item.file.name} className="size-12 shrink-0 rounded-lg object-cover" />
                    ) : (
                      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-secondary">
                        <FileImage className="size-5 text-muted-foreground" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.error ? (
                          <span className="text-destructive">{item.error}</span>
                        ) : item.result ? (
                          <>{formatBytes(item.originalSize)} → {formatBytes(item.result.size)}</>
                        ) : (
                          formatBytes(item.originalSize)
                        )}
                      </p>
                    </div>
                    {item.result && (
                      <Button variant="ghost" size="icon" aria-label={`Download ${item.file.name}`}
                        onClick={() => { downloadBlob(item.result!.blob, `${item.file.name.replace(/\.\w+$/, "")}.${fmt.ext}`); showToast(`Downloaded as ${fmt.label}`); }}>
                        <Download className="size-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" aria-label={`Remove ${item.file.name}`} onClick={() => removeItem(item.id)}>
                      <X className="size-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
