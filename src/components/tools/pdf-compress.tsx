"use client";

import { useState } from "react";
import { FileArchive, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { track } from "@/lib/stats/stats";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

/** Compression levels — each maps to a render resolution + JPEG quality.
 *  Lower scale + lower quality = much smaller file. */
type LevelId = "light" | "recommended" | "strong" | "extreme";
const LEVELS: { id: LevelId; label: string; note: string; scale: number; quality: number }[] = [
  { id: "light", label: "Light", note: "Best quality", scale: 2.0, quality: 0.82 },
  { id: "recommended", label: "Recommended", note: "Great balance", scale: 1.5, quality: 0.68 },
  { id: "strong", label: "Strong", note: "Small file", scale: 1.15, quality: 0.52 },
  { id: "extreme", label: "Extreme", note: "Tiniest file", scale: 0.85, quality: 0.4 },
];

// Ladder of (scale, quality) tried when hitting a target size, smallest last.
const LADDER: { scale: number; quality: number }[] = [
  { scale: 2.0, quality: 0.85 }, { scale: 1.7, quality: 0.72 }, { scale: 1.4, quality: 0.62 },
  { scale: 1.2, quality: 0.52 }, { scale: 1.0, quality: 0.45 }, { scale: 0.85, quality: 0.4 },
  { scale: 0.7, quality: 0.35 }, { scale: 0.6, quality: 0.3 },
];

// Named in-tool presets.
type PdfPreset = { id: string; label: string; mode: "level" | "target"; level?: LevelId; targetKB?: number };
const PDF_PRESETS: PdfPreset[] = [
  { id: "email", label: "Email", mode: "target", targetKB: 1024 },
  { id: "job", label: "Job application", mode: "target", targetKB: 500 },
  { id: "gov", label: "Government upload", mode: "target", targetKB: 200 },
  { id: "whatsapp", label: "WhatsApp", mode: "target", targetKB: 500 },
  { id: "archive", label: "Archive", mode: "level", level: "extreme" },
];

function presetToState(preset?: Record<string, unknown>): { mode: "level" | "target"; level: LevelId; targetKB: number } {
  const label = String(preset?.label ?? "").toLowerCase();
  const m = label.match(/under\s*(\d+)\s*(kb|mb)/);
  if (m) {
    const kb = m[2] === "mb" ? Number(m[1]) * 1024 : Number(m[1]);
    return { mode: "target", level: "recommended", targetKB: kb };
  }
  if (/email|whatsapp|passport|government|job/.test(label)) return { mode: "level", level: "strong", targetKB: 500 };
  return { mode: "level", level: "recommended", targetKB: 500 };
}

export default function PdfCompress({ preset }: { preset?: Record<string, unknown> }) {
  const init = presetToState(preset);
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"level" | "target">(init.mode);
  const [level, setLevel] = useState<LevelId>(init.level);
  const [targetKB, setTargetKB] = useState(init.targetKB);
  const [result, setResult] = useState<{ size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [presetId, setPresetId] = useState("custom");

  const applyPreset = (p: PdfPreset) => {
    setPresetId(p.id);
    setMode(p.mode);
    if (p.level) setLevel(p.level);
    if (p.targetKB) setTargetKB(p.targetKB);
  };

  const onFile = (f: File) => {
    setFile(f);
    setResult(null);
  };

  // Render every page to a canvas at `scale`, then rebuild a PDF with JPEG pages.
  const build = async (f: File, scale: number, quality: number, onPage?: (n: number, total: number) => void) => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const { jsPDF } = await import("jspdf");

    const data = new Uint8Array(await f.arrayBuffer());
    const doc = await pdfjs.getDocument({ data }).promise;
    let out: import("jspdf").jsPDF | null = null;

    for (let n = 1; n <= doc.numPages; n++) {
      onPage?.(n, doc.numPages);
      const page = await doc.getPage(n);
      const base = page.getViewport({ scale: 1 }); // points
      const vp = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(vp.width));
      canvas.height = Math.max(1, Math.floor(vp.height));
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport: vp }).promise;
      const img = canvas.toDataURL("image/jpeg", quality);
      const w = base.width;
      const h = base.height;
      const orient = w > h ? "landscape" : "portrait";
      if (!out) out = new jsPDF({ unit: "pt", format: [w, h], orientation: orient });
      else out.addPage([w, h], orient);
      out.addImage(img, "JPEG", 0, 0, w, h, undefined, "FAST");
    }
    return out ? (out.output("blob") as Blob) : new Blob([data], { type: "application/pdf" });
  };

  const compress = async () => {
    if (!file) return;
    setBusy(true);
    setResult(null);
    const t0 = performance.now();
    try {
      if (mode === "level") {
        const l = LEVELS.find((x) => x.id === level)!;
        const blob = await build(file, l.scale, l.quality, (n, t) => setProgress(`Compressing page ${n} of ${t}…`));
        setResult({ size: blob.size, blob });
      } else {
        // Target size: walk the ladder until we get under the target (or run out).
        const targetBytes = targetKB * 1024;
        let best: Blob | null = null;
        for (const step of LADDER) {
          setProgress(`Trying to reach ${targetKB} KB…`);
          const blob = await build(file, step.scale, step.quality);
          best = blob;
          if (blob.size <= targetBytes) break;
        }
        if (best) setResult({ size: best.size, blob: best });
      }
      track(["pdfsConverted", "filesProcessed"], performance.now() - t0);
    } catch {
      showToast("Couldn't compress this PDF — it may be corrupted or password-protected", "error");
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  const savings = file && result ? Math.round((1 - result.size / file.size) * 100) : 0;
  const hitTarget = mode === "target" && result ? result.size <= targetKB * 1024 : true;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={FileArchive}
            title={file ? file.name : "Upload a PDF to compress"}
            subtitle="Compressed privately in your browser — nothing is uploaded"
            accept="application/pdf"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
          <div className="mt-3 text-center">
            <button onClick={async () => {
              try { onFile(await (await import("@/lib/samples")).samplePdfFile()); }
              catch { showToast("Couldn't load the sample PDF — try uploading your own", "error"); }
            }} className="text-sm font-medium text-primary hover:underline">✨ Try a sample PDF</button>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader><CardTitle>Compression options</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            {/* Presets */}
            <div className="space-y-1.5">
              <Label>Smart presets</Label>
              <div className="flex flex-wrap gap-1.5">
                {PDF_PRESETS.map((p) => (
                  <button key={p.id} onClick={() => applyPreset(p)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${presetId === p.id ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>{p.label}</button>
                ))}
                <button onClick={() => setPresetId("custom")}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${presetId === "custom" ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-secondary"}`}>Custom</button>
              </div>
            </div>
            {/* Mode */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMode("level")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${mode === "level" ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                By compression level
              </button>
              <button onClick={() => setMode("target")}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${mode === "target" ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                By target size
              </button>
            </div>

            {mode === "level" ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LEVELS.map((l) => (
                  <button key={l.id} onClick={() => setLevel(l.id)}
                    className={`rounded-xl border px-3 py-2 text-left transition-colors ${level === l.id ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}>
                    <span className="block text-sm font-semibold">{l.label}</span>
                    <span className="block text-xs text-muted-foreground">{l.note}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="pdf-compress-target-kb">Target file size (KB)</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <Input id="pdf-compress-target-kb" type="number" min={10} value={targetKB} onChange={(e) => setTargetKB(Math.max(10, Number(e.target.value)))} className="max-w-[160px]" />
                  <div className="flex gap-1">
                    {[100, 200, 500, 1024].map((kb) => (
                      <button key={kb} onClick={() => setTargetKB(kb)} className="rounded-lg border border-border px-2 py-1 text-xs hover:bg-secondary">{kb >= 1024 ? "1 MB" : `${kb}KB`}</button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">We&apos;ll keep compressing harder until the PDF fits under your target.</p>
              </div>
            )}

            <Button onClick={compress} disabled={busy} className="w-full">
              {busy ? <><Loader2 className="size-4 animate-spin" /> {progress || "Compressing…"}</> : "Compress PDF"}
            </Button>

            {result && (
              <>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-secondary/60 p-3"><p className="text-xs text-muted-foreground">Original</p><p className="font-semibold">{formatBytes(file.size)}</p></div>
                  <div className="rounded-xl bg-secondary/60 p-3"><p className="text-xs text-muted-foreground">Compressed</p><p className="font-semibold">{formatBytes(result.size)}</p></div>
                </div>
                {savings > 0 ? (
                  <p className="rounded-xl bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    Reduced by {savings}%{mode === "target" ? (hitTarget ? ` — under ${targetKB} KB ✓` : " — smallest possible reached") : ""}
                  </p>
                ) : (
                  <p className="rounded-xl bg-secondary/60 p-3 text-center text-sm text-muted-foreground">Try a stronger level for a smaller file.</p>
                )}
                <Button variant="outline" className="w-full" onClick={() => { downloadBlob(result.blob, `compressed-${file.name}`); showToast("Downloaded compressed PDF"); }}>
                  Download compressed PDF
                </Button>
                <p className="text-center text-xs text-muted-foreground">Tip: strong/extreme levels rasterise pages (text becomes an image) for maximum size reduction — ideal for uploads.</p>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
