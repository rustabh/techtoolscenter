"use client";

import { useEffect, useRef, useState } from "react";
import { Smile, Download, Shuffle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

const SAMPLE_PROMPTS = [
  "WHEN THE CODE\nWORKS ON THE FIRST TRY",
  "ME EXPLAINING\nWHY I NEED ANOTHER TAB OPEN",
  "NOBODY:\n\nME AT 2 AM",
];

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    if (paragraph === "") { lines.push(""); continue; }
    const words = paragraph.split(" ");
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

function drawImpactText(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, size: number, maxWidth: number, anchor: "top" | "bottom", textColor: string, outlineColor: string) {
  if (!text.trim()) return;
  ctx.font = `700 ${size}px Impact, "Arial Black", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = anchor === "top" ? "top" : "bottom";
  ctx.lineWidth = size * 0.08;
  ctx.strokeStyle = outlineColor;
  ctx.fillStyle = textColor;
  ctx.lineJoin = "round";

  const lines = wrapLines(ctx, text.toUpperCase(), maxWidth);
  const lineHeight = size * 1.15;
  const ordered = anchor === "bottom" ? [...lines].reverse() : lines;

  ordered.forEach((line, i) => {
    const ly = anchor === "bottom" ? y - i * lineHeight : y + i * lineHeight;
    ctx.strokeText(line, cx, ly);
    ctx.fillText(line, cx, ly);
  });
}

export default function MemeGenerator() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState("TOP TEXT");
  const [bottomText, setBottomText] = useState("BOTTOM TEXT");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#ffffff");
  const [outlineColor, setOutlineColor] = useState("#000000");
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
    ctx.drawImage(img, 0, 0);
    const size = Math.max(18, (fontSize / 100) * img.naturalWidth * 0.14);
    const maxWidth = img.naturalWidth * 0.92;
    drawImpactText(ctx, topText, img.naturalWidth / 2, img.naturalHeight * 0.06, size, maxWidth, "top", textColor, outlineColor);
    drawImpactText(ctx, bottomText, img.naturalWidth / 2, img.naturalHeight * 0.94, size, maxWidth, "bottom", textColor, outlineColor);
  }, [img, topText, bottomText, fontSize, textColor, outlineColor]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, "meme.png");
      showToast("Downloaded meme.png");
    }, "image/png");
  };

  const randomize = () => {
    const pick = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];
    const [top, bottom] = pick.split("\n\n").length > 1 ? pick.split("\n\n") : [pick, bottomText];
    setTopText(top);
    if (pick.includes("\n\n")) setBottomText(bottom);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Image</CardTitle></CardHeader>
          <CardContent>
            <FileDropzone
              icon={Smile}
              title={img ? "Click or drop to replace image" : "Click or drop an image here"}
              subtitle="JPG, PNG, or WebP"
              accept="image/*"
              onFiles={(files) => files[0] && onFile(files[0])}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Text</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="top-text">Top text</Label>
              <Input id="top-text" value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="TOP TEXT" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bottom-text">Bottom text</Label>
              <Input id="bottom-text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="BOTTOM TEXT" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="meme-font-size">Text size: {fontSize}%</Label>
              <input id="meme-font-size" type="range" min={20} max={100} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="meme-text-color">Text color</Label>
                <Input id="meme-text-color" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10 p-1" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="meme-outline-color">Outline color</Label>
                <Input id="meme-outline-color" type="color" value={outlineColor} onChange={(e) => setOutlineColor(e.target.value)} className="h-10 p-1" />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={randomize}><Shuffle className="size-4" /> Try a sample caption</Button>
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
              <Download /> Download meme
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
