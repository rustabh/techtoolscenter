"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

type Position = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "tiled";
type OutFormat = "png" | "jpeg" | "webp";
const MIME: Record<OutFormat, string> = { png: "image/png", jpeg: "image/jpeg", webp: "image/webp" };
const EXT: Record<OutFormat, string> = { png: "png", jpeg: "jpg", webp: "webp" };

export default function ImageWatermark() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState("SAMPLE");
  const [opacity, setOpacity] = useState(35);
  const [size, setSize] = useState(6);
  const [rotation, setRotation] = useState(-30);
  const [color, setColor] = useState("#ffffff");
  const [position, setPosition] = useState<Position>("tiled");
  const [format, setFormat] = useState<OutFormat>("png");
  const [quality, setQuality] = useState(0.92);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    // JPEG/WebP have no alpha channel — matte any transparency to white
    // before drawing, or it would render as black on export.
    if (format !== "png") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height); }
    ctx.drawImage(img, 0, 0);
    if (!text.trim()) return;

    const fontSize = Math.max(12, (size / 100) * img.naturalWidth);
    ctx.font = `700 ${fontSize}px system-ui, sans-serif`;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity / 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const drawAt = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    if (position === "tiled") {
      const stepX = ctx.measureText(text).width + fontSize * 2;
      const stepY = fontSize * 4;
      for (let y = -stepY; y < img.naturalHeight + stepY; y += stepY) {
        for (let x = -stepX; x < img.naturalWidth + stepX; x += stepX) {
          drawAt(x, y);
        }
      }
    } else {
      const pad = fontSize;
      const pos: Record<Exclude<Position, "tiled">, [number, number]> = {
        center: [img.naturalWidth / 2, img.naturalHeight / 2],
        "top-left": [pad + ctx.measureText(text).width / 2, pad],
        "top-right": [img.naturalWidth - pad - ctx.measureText(text).width / 2, pad],
        "bottom-left": [pad + ctx.measureText(text).width / 2, img.naturalHeight - pad],
        "bottom-right": [img.naturalWidth - pad - ctx.measureText(text).width / 2, img.naturalHeight - pad],
      };
      const [x, y] = pos[position];
      drawAt(x, y);
    }
    ctx.globalAlpha = 1;
  }, [img, text, opacity, size, rotation, color, position, format]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, `watermarked.${EXT[format]}`);
    }, MIME[format], format === "png" ? undefined : quality);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Image</CardTitle></CardHeader>
          <CardContent>
            <FileDropzone
              icon={Layers}
              title={img ? "Click or drop to replace image" : "Click or drop an image here"}
              subtitle="JPG, PNG, or WebP"
              accept="image/*"
              onFiles={(files) => files[0] && onFile(files[0])}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Watermark</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="iw-text">Text</Label>
              <Input id="iw-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. © Your Name" maxLength={60} />
            </div>
            <div className="space-y-1.5">
              <Label>Position</Label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  ["top-left", "Top left"], ["center", "Center"], ["top-right", "Top right"],
                  ["bottom-left", "Bottom left"], ["tiled", "Tiled"], ["bottom-right", "Bottom right"],
                ] as [Position, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={position === key}
                    onClick={() => setPosition(key)}
                    className={`rounded-xl border px-2 py-2 text-xs font-medium transition-colors ${
                      position === key ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="iw-opacity">Opacity: {opacity}%</Label>
                <input id="iw-opacity" type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="iw-size">Size: {size}%</Label>
                <input id="iw-size" type="range" min={2} max={20} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="iw-rotation">Rotation: {rotation}°</Label>
                <input id="iw-rotation" type="range" min={-90} max={90} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="iw-color">Color</Label>
                <Input id="iw-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 p-1" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label id="iw-format-label">Output format</Label>
              <div className="grid grid-cols-3 gap-2" aria-labelledby="iw-format-label">
                {(["png", "jpeg", "webp"] as OutFormat[]).map((f) => (
                  <button key={f} type="button" onClick={() => setFormat(f)}
                    className={`rounded-xl border px-2 py-2 text-xs font-medium uppercase transition-colors ${format === f ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>
                    {f}
                  </button>
                ))}
              </div>
              {format !== "png" && (
                <div className="space-y-1.5 pt-1">
                  <Label htmlFor="iw-quality" className="text-xs text-muted-foreground">Quality: {Math.round(quality * 100)}%</Label>
                  <input id="iw-quality" type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <Card>
          <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {img ? (
              <canvas ref={canvasRef} className="w-full rounded-xl border border-border" />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                Upload an image to start
              </div>
            )}
            <Button className="w-full" onClick={download} disabled={!img}>
              <Download /> Download watermarked image
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
