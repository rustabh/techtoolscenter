"use client";

import { useRef, useState } from "react";
import { showToast } from "@/components/ui/toaster";
import { UploadCloud, Folder, Play, Pause, RotateCcw, X, Download, CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { track } from "@/lib/stats/stats";
import { confetti } from "@/lib/confetti";
import { useBulkQueue } from "@/lib/bulk/engine";

type Op = "compress" | "webp" | "resize" | "rotate";
const OPS: { id: Op; label: string }[] = [
  { id: "compress", label: "Compress" },
  { id: "webp", label: "Convert to WebP" },
  { id: "resize", label: "Resize" },
  { id: "rotate", label: "Rotate 90°" },
];

function loadImg(file: File): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = URL.createObjectURL(file);
  });
}

function baseName(name: string) {
  return name.replace(/\.[^.]+$/, "");
}

export default function BulkImageProcessor() {
  const [op, setOp] = useState<Op>("compress");
  const [quality, setQuality] = useState(0.7);
  const [width, setWidth] = useState(1080);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [counter, setCounter] = useState(true);
  const [timestamp, setTimestamp] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const celebrated = useRef(false);

  const makeName = (original: string, ext: string, i: number) => {
    let n = baseName(original);
    if (prefix) n = `${prefix}${n}`;
    if (suffix) n = `${n}${suffix}`;
    if (counter) n = `${n}-${String(i + 1).padStart(3, "0")}`;
    if (timestamp) n = `${n}-${Date.now()}`;
    return `${n}.${ext}`;
  };

  const q = useBulkQueue(async (file, i) => {
    const img = await loadImg(file);
    const canvas = document.createElement("canvas");
    let ext = "jpg";
    let mime = "image/jpeg";
    if (op === "rotate") {
      canvas.width = img.naturalHeight;
      canvas.height = img.naturalWidth;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ext = "png"; mime = "image/png";
    } else if (op === "resize") {
      const scale = Math.min(1, width / img.naturalWidth);
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
      ext = "png"; mime = "image/png";
    } else {
      const scale = Math.min(1, width / img.naturalWidth);
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext("2d")!;
      if (op === "compress") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      if (op === "webp") { ext = "webp"; mime = "image/webp"; }
    }
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, mime, op === "resize" || op === "rotate" ? undefined : quality));
    if (!blob) throw new Error("Encode failed");
    return { blob, name: makeName(file.name, ext, i) };
  });

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    const all = Array.from(files);
    const images = all.filter((f) => f.type.startsWith("image/"));
    const skipped = all.length - images.length;
    if (skipped > 0) showToast(`Skipped ${skipped} non-image file${skipped > 1 ? "s" : ""}`, "info");
    if (images.length === 0 && all.length > 0) {
      showToast("No image files found in that selection", "error");
      return;
    }
    q.add(images);
  };

  const start = async () => {
    celebrated.current = false;
    await q.run();
    const done = q.items.filter((i) => i.status === "done").length;
    if (done > 0) {
      track(["imagesOptimized", "filesProcessed"]);
      if (!celebrated.current && done >= 10) { confetti(); celebrated.current = true; }
    }
  };

  const [zipping, setZipping] = useState(false);
  const downloadZip = async (onlyDone = true) => {
    setZipping(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      q.items.filter((i) => i.status === "done" && i.outBlob).forEach((i) => {
        const folder = i.path.includes("/") ? i.path.slice(0, i.path.lastIndexOf("/") + 1) : "";
        zip.file(`${folder}${i.outName}`, i.outBlob!);
      });
      void onlyDone;
      downloadBlob(await zip.generateAsync({ type: "blob" }), "bulk-images.zip");
      showToast("Downloaded bulk-images.zip");
    } catch {
      showToast("Couldn't build the ZIP — try again with fewer files", "error");
    } finally {
      setZipping(false);
    }
  };

  const done = q.items.filter((i) => i.status === "done");

  return (
    <div className="space-y-6">
      {/* Upload */}
      <Card>
        <CardContent className="pt-6">
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
          {/* @ts-expect-error non-standard directory attributes */}
          <input ref={folderRef} type="file" webkitdirectory="" directory="" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
            className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center"
          >
            <UploadCloud className="size-8 text-primary" />
            <span className="font-medium">Drag &amp; drop images here</span>
            <span className="text-sm text-muted-foreground">Processed privately in your browser — hundreds of files at once</span>
            <div className="mt-2 flex gap-2">
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><UploadCloud className="size-4" /> Select images</Button>
              <Button variant="outline" size="sm" onClick={() => folderRef.current?.click()}><Folder className="size-4" /> Upload folder</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {q.items.length > 0 && (
        <>
          {/* Options */}
          <Card>
            <CardHeader><CardTitle>Batch options</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {OPS.map((o) => (
                  <button key={o.id} onClick={() => setOp(o.id)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${op === o.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>{o.label}</button>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {(op === "compress" || op === "webp") && (
                  <div className="space-y-1.5"><Label>Quality: {Math.round(quality * 100)}%</Label>
                    <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                  </div>
                )}
                {(op === "compress" || op === "webp" || op === "resize") && (
                  <div className="space-y-1.5"><Label>Max width (px)</Label><Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
                )}
              </div>
              {/* Naming rules */}
              <div className="space-y-2">
                <Label>Auto naming</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input placeholder="Prefix" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
                  <Input placeholder="Suffix" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={counter} onChange={(e) => setCounter(e.target.checked)} className="size-4 accent-[var(--primary)]" /> Add counter</label>
                  <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={timestamp} onChange={(e) => setTimestamp(e.target.checked)} className="size-4 accent-[var(--primary)]" /> Add timestamp</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Queue manager */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Queue · {q.stats.total} files</CardTitle>
              <div className="flex gap-1.5">
                {!q.running && <Button size="sm" onClick={start}><Play className="size-4" /> Start</Button>}
                {q.running && !q.paused && <Button size="sm" variant="outline" onClick={q.pause}><Pause className="size-4" /> Pause</Button>}
                {q.running && q.paused && <Button size="sm" onClick={q.resume}><Play className="size-4" /> Resume</Button>}
                {q.running && <Button size="sm" variant="outline" onClick={q.cancel}><X className="size-4" /> Cancel</Button>}
                {!q.running && q.stats.failed + q.stats.canceled > 0 && <Button size="sm" variant="outline" onClick={q.retryFailed}><RotateCcw className="size-4" /> Retry failed</Button>}
                {!q.running && <Button size="sm" variant="ghost" onClick={q.clear}>Clear</Button>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                  <span>{q.stats.processed}/{q.stats.total} processed</span>
                  <span className="flex items-center gap-3">
                    <span className="text-emerald-600 dark:text-emerald-400">{q.stats.done} done</span>
                    {q.stats.failed > 0 && <span className="text-rose-500">{q.stats.failed} failed</span>}
                    {q.eta != null && <span className="flex items-center gap-1"><Clock className="size-3" /> ~{q.eta}s left</span>}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${q.stats.percent}%` }} /></div>
              </div>

              {/* File list */}
              <ul className="max-h-72 space-y-1.5 overflow-y-auto">
                {q.items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 text-sm">
                    <StatusIcon status={it.status} />
                    <span className="min-w-0 flex-1 truncate">{it.path}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{(it.file.size / 1024).toFixed(0)} KB{it.outBlob ? ` → ${(it.outBlob.size / 1024).toFixed(0)} KB` : ""}</span>
                    {!q.running && <button aria-label="Remove" onClick={() => q.remove(it.id)} className="shrink-0 text-muted-foreground hover:text-destructive"><X className="size-4" /></button>}
                  </li>
                ))}
              </ul>

              {done.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => downloadZip()} disabled={zipping}>
                    {zipping ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />} {zipping ? "Building ZIP…" : `Download all as ZIP (${done.length})`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />;
  if (status === "failed") return <XCircle className="size-4 shrink-0 text-rose-500" />;
  if (status === "processing") return <Loader2 className="size-4 shrink-0 animate-spin text-primary" />;
  if (status === "canceled") return <X className="size-4 shrink-0 text-muted-foreground" />;
  return <span className="size-4 shrink-0 rounded-full border border-border" />;
}
