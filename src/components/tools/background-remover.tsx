"use client";

import { useRef, useState } from "react";
import { Eraser, Download, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { showToast } from "@/components/ui/toaster";
import { downloadBlob } from "@/lib/utils";

const BG_OPTIONS = [
  { id: "transparent", label: "Transparent", swatch: undefined },
  { id: "white", label: "White", swatch: "#ffffff" },
  { id: "black", label: "Black", swatch: "#000000" },
  { id: "custom", label: "Custom", swatch: undefined },
] as const;
type BgId = (typeof BG_OPTIONS)[number]["id"];

// Checkerboard pattern makes an actually-transparent PNG visually obvious,
// rather than it silently blending into whatever the page background is.
const CHECKERBOARD_STYLE: React.CSSProperties = {
  backgroundImage:
    "repeating-conic-gradient(#8884 0% 25%, transparent 0% 50%)",
  backgroundSize: "16px 16px",
};

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ label: string; pct: number } | null>(null);
  const [bg, setBg] = useState<BgId>("transparent");
  const [customColor, setCustomColor] = useState("#22c55e");
  const modelCachedRef = useRef(false);

  const onFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG or WebP", "error");
      return;
    }
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultBlob(null);
    setResultUrl("");
  };

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setProgress({ label: modelCachedRef.current ? "Starting…" : "Downloading AI model (first time only)…", pct: 0 });
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        // Must be an absolute URL — the library uses it as the base for
        // `new URL(relative, publicPath)`, which throws on a bare path.
        publicPath: `${window.location.origin}/bg-remove/`,
        device: "cpu",
        // isnet_quint8 ("small", ~44MB) is the only model self-hosted —
        // isnet_fp16/isnet ("medium"/"large") would 404 against our
        // resources.json. The TS types only expose the internal names.
        model: "isnet_quint8",
        output: { format: "image/png", quality: 1 },
        progress: (key, current, total) => {
          modelCachedRef.current = true;
          const pct = total > 0 ? Math.round((current / total) * 100) : 0;
          const label = key.startsWith("fetch:") ? "Downloading AI model (first time only)…" : "Removing background…";
          setProgress({ label, pct });
        },
      });
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
      showToast("Background removed");
    } catch (e) {
      console.error(e);
      showToast("Couldn't process this image — try a different photo", "error");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const download = async () => {
    if (!resultBlob) return;
    const baseName = (file?.name ?? "image").replace(/\.[^.]+$/, "");
    if (bg === "transparent") {
      downloadBlob(resultBlob, `${baseName}-no-bg.png`);
      return;
    }
    // Composite the transparent result onto a solid-color background on a
    // canvas — still done entirely client-side, no re-upload or re-inference.
    const color = bg === "custom" ? customColor : BG_OPTIONS.find((o) => o.id === bg)?.swatch ?? "#ffffff";
    const img = new Image();
    const url = URL.createObjectURL(resultBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((out) => out && downloadBlob(out, `${baseName}-${bg}-bg.png`), "image/png");
    };
    img.src = url;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={Eraser}
            title={file ? "Click or drop to replace image" : "Click or drop a photo here"}
            subtitle="JPG, PNG or WebP — people, products, or objects"
            accept="image/*"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Processed entirely in your browser — your photo is never uploaded anywhere.
          </p>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            {!resultBlob && (
              <Button onClick={run} disabled={busy} className="w-full">
                {busy ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    {progress ? `${progress.label} ${progress.pct}%` : "Working…"}
                  </>
                ) : (
                  <>
                    <Eraser className="size-4" /> Remove background
                  </>
                )}
              </Button>
            )}
            {busy && (
              <p className="text-center text-xs text-muted-foreground">
                This runs a real AI model on your device — it typically takes a few seconds to
                around a minute depending on your device, and a bit longer the first time while the
                model downloads (cached afterward).
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {originalUrl && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Original</CardTitle></CardHeader>
            <CardContent>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalUrl} alt="Original upload" className="max-h-full max-w-full object-contain" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Result</CardTitle></CardHeader>
            <CardContent>
              <div
                className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-border"
                style={resultUrl ? CHECKERBOARD_STYLE : undefined}
              >
                {resultUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={resultUrl} alt="Background removed" className="max-h-full max-w-full object-contain" />
                ) : (
                  <p className="p-6 text-center text-sm text-muted-foreground">
                    {busy ? "Processing…" : "Result will appear here"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {resultBlob && (
        <Card>
          <CardHeader><CardTitle className="text-base">Download</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">Background</p>
              <div className="flex flex-wrap gap-2">
                {BG_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={bg === o.id}
                    onClick={() => setBg(o.id)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      bg === o.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {o.id === "custom" ? (
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => { setCustomColor(e.target.value); setBg("custom"); }}
                        className="size-4 cursor-pointer rounded border-0 bg-transparent p-0"
                        aria-label="Custom background color"
                      />
                    ) : o.swatch ? (
                      <span className="size-4 rounded-full border border-border" style={{ backgroundColor: o.swatch }} />
                    ) : (
                      <span className="size-4 rounded-full border border-border" style={CHECKERBOARD_STYLE} />
                    )}
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={download} className="w-full">
              <Download className="size-4" /> Download PNG
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={() => { setResultBlob(null); setResultUrl(""); }}>
              Try again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
