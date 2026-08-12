"use client";

import { useEffect, useRef, useState } from "react";
import { Binary, Copy, Check, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

const RAMPS = {
  Detailed: "@%#*+=-:. ",
  Simple: "@#. ",
  Blocks: "█▓▒░ ",
} as const;
type RampName = keyof typeof RAMPS;

// Character cells are roughly twice as tall as wide in a monospace font,
// so we sample fewer rows than columns to keep the output looking proportional.
const CHAR_ASPECT = 0.55;

export default function ImageToAsciiArt() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [width, setWidth] = useState(100);
  const [ramp, setRamp] = useState<RampName>("Detailed");
  const [invert, setInvert] = useState(false);
  const [ascii, setAscii] = useState("");
  const { copied, copy } = useCopy();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG or PNG", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => setImg(image);
      image.onerror = () => showToast("Couldn't read that image — the file may be corrupted", "error");
      image.src = reader.result as string;
    };
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!img) return;
    const cols = width;
    const rows = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * cols * CHAR_ASPECT));

    const canvas = canvasRef.current ?? document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.width = cols;
    canvas.height = rows;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, cols, rows);
    const data = ctx.getImageData(0, 0, cols, rows).data;

    const chars = RAMPS[ramp];
    const ramp2 = invert ? chars.split("").reverse().join("") : chars;
    let out = "";
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        // Ramp order is dense→sparse ('@' → ' '), and the live preview
        // renders glyphs as light text on a black background — so bright
        // source pixels need the dense glyph (more visible "ink" on black)
        // and dark pixels need the sparse/blank glyph, or the rendered tone
        // comes out inverted relative to the source image.
        const idx = Math.min(ramp2.length - 1, Math.floor(((255 - lum) / 255) * ramp2.length));
        out += ramp2[idx];
      }
      out += "\n";
    }
    setAscii(out);
  }, [img, width, ramp, invert]);

  const download = () => {
    downloadBlob(new Blob([ascii], { type: "text/plain" }), "ascii-art.txt");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Image</CardTitle></CardHeader>
          <CardContent>
            <FileDropzone
              icon={Binary}
              title={img ? "Click or drop to replace image" : "Click or drop an image here"}
              subtitle="JPG, PNG, or WebP"
              accept="image/*"
              onFiles={(files) => files[0] && onFile(files[0])}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Options</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ascii-width">Width: {width} characters</Label>
              <input id="ascii-width" type="range" min={40} max={220} step={10} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
            <div className="space-y-1.5">
              <Label>Character set</Label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(RAMPS) as RampName[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={ramp === r}
                    onClick={() => setRamp(r)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${ramp === r ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
              Invert (for dark backgrounds)
            </label>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <Card>
          <CardHeader><CardTitle>ASCII art</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {ascii ? (
              <pre className="max-h-[500px] overflow-auto rounded-xl bg-black p-3 text-[6px] leading-[6px] text-white sm:text-[7px] sm:leading-[7px]">{ascii}</pre>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                Upload an image to start
              </div>
            )}
            {ascii && (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => copy(ascii)}>
                  {copied ? <Check className="text-emerald-500" /> : <Copy />} Copy
                </Button>
                <Button size="sm" onClick={download}><Download /> Download .txt</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
