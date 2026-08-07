"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompareSlider } from "@/components/ui/compare-slider";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

type Mode = "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";

const MODES: { key: Mode; label: string; description: string }[] = [
  { key: "protanopia", label: "Protanopia", description: "Reduced sensitivity to red light (~1% of men)" },
  { key: "deuteranopia", label: "Deuteranopia", description: "Reduced sensitivity to green light — the most common form (~6% of men)" },
  { key: "tritanopia", label: "Tritanopia", description: "Reduced sensitivity to blue light (rare)" },
  { key: "achromatopsia", label: "Achromatopsia", description: "Complete color blindness — sees only in grayscale (very rare)" },
];

// Widely-used simplified simulation matrices (the same family used by common
// open-source color-blindness simulators) — an approximation, not a clinically
// precise model of any individual's vision.
function transform(mode: Mode, r: number, g: number, b: number): [number, number, number] {
  switch (mode) {
    case "protanopia":
      return [0.567 * r + 0.433 * g, 0.558 * r + 0.442 * g, 0.242 * g + 0.758 * b];
    case "deuteranopia":
      return [0.625 * r + 0.375 * g, 0.7 * r + 0.3 * g, 0.3 * g + 0.7 * b];
    case "tritanopia":
      return [0.95 * r + 0.05 * g, 0.433 * g + 0.567 * b, 0.475 * g + 0.525 * b];
    case "achromatopsia": {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      return [gray, gray, gray];
    }
  }
}

export default function ColorBlindnessSimulator() {
  const [original, setOriginal] = useState<{ img: HTMLImageElement; url: string } | null>(null);
  const [mode, setMode] = useState<Mode>("deuteranopia");
  const [resultUrl, setResultUrl] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG or PNG", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const image = new Image();
      image.onload = () => setOriginal({ img: image, url });
      image.onerror = () => showToast("Couldn't read that image — the file may be corrupted", "error");
      image.src = url;
    };
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!original) return;
    const canvas = canvasRef.current ?? document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.width = original.img.naturalWidth;
    canvas.height = original.img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(original.img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const px = data.data;
    for (let i = 0; i < px.length; i += 4) {
      const [r, g, b] = transform(mode, px[i], px[i + 1], px[i + 2]);
      px[i] = Math.round(Math.max(0, Math.min(255, r)));
      px[i + 1] = Math.round(Math.max(0, Math.min(255, g)));
      px[i + 2] = Math.round(Math.max(0, Math.min(255, b)));
    }
    ctx.putImageData(data, 0, 0);
    setResultUrl(canvas.toDataURL("image/png"));
  }, [original, mode]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, `${mode}-simulation.png`);
    }, "image/png");
  };

  const activeMode = MODES.find((m) => m.key === mode)!;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={Eye}
            title={original ? "Click or drop to replace image" : "Click or drop an image here"}
            subtitle="See how it looks to someone with color vision deficiency"
            accept="image/*"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
        </CardContent>
      </Card>

      {original && (
        <>
          <Card>
            <CardHeader><CardTitle>Type</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {MODES.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    aria-pressed={mode === m.key}
                    onClick={() => setMode(m.key)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                      mode === m.key ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{activeMode.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {resultUrl && (
                <CompareSlider before={original.url} after={resultUrl} beforeLabel="Original" afterLabel={activeMode.label} />
              )}
              <Button onClick={download}><Download /> Download simulated image</Button>
              <p className="text-xs text-muted-foreground">
                This is an approximation for design and accessibility testing — it doesn&apos;t precisely reproduce any individual&apos;s vision.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
