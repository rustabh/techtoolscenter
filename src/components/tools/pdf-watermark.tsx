"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { Stamp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

export default function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(30);
  const [size, setSize] = useState(48);
  const [rotation, setRotation] = useState(45);
  const [color, setColor] = useState("#dc2626");
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File) => {
    try {
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setFile(f);
      setPageCount(doc.getPageCount());
    } catch {
      showToast("Couldn't open this PDF — it may be corrupted or password-protected", "error");
    }
  };

  const apply = async () => {
    if (!file || !text.trim()) return;
    setBusy(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const r = parseInt(color.slice(1, 3), 16) / 255;
      const g = parseInt(color.slice(3, 5), 16) / 255;
      const b = parseInt(color.slice(5, 7), 16) / 255;
      const textWidth = font.widthOfTextAtSize(text, size);

      // pdf-lib rotates drawText around its (x, y) anchor — the baseline's
      // left edge, not the text's visual center — so simply centering the
      // unrotated box makes the watermark swing off-center once `rotate` is
      // applied. Instead, work out the anchor that keeps the text's visual
      // center fixed at the page center after rotation.
      const rad = (rotation * Math.PI) / 180;
      const dx = textWidth / 2;
      const dy = size * 0.35; // approx baseline-to-visual-center offset
      const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const ry = dx * Math.sin(rad) + dy * Math.cos(rad);

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - rx,
          y: height / 2 - ry,
          size,
          font,
          color: rgb(r, g, b),
          opacity: opacity / 100,
          rotate: degrees(rotation),
        });
      }

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "watermarked.pdf");
      showToast("Downloaded watermarked.pdf");
    } catch {
      showToast("Couldn't apply the watermark — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={Stamp}
            title={file ? file.name : "Click or drop a PDF here to watermark"}
            subtitle={file ? `${pageCount} pages` : "Select a PDF file"}
            accept="application/pdf"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-1.5">
              <Label htmlFor="wm-text">Watermark text</Label>
              <Input id="wm-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. CONFIDENTIAL, DRAFT" maxLength={60} />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="wm-opacity">Opacity: {opacity}%</Label>
                <input id="wm-opacity" type="range" min={5} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wm-size">Font size: {size}px</Label>
                <input id="wm-size" type="range" min={12} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wm-rotation">Rotation: {rotation}°</Label>
                <input id="wm-rotation" type="range" min={0} max={90} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="wm-color">Color</Label>
                <Input id="wm-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 p-1" />
              </div>
            </div>
            <Button onClick={apply} disabled={busy || !text.trim()}>{busy ? "Applying…" : "Apply watermark & download"}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
