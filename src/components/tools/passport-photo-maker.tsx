"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { track } from "@/lib/stats/stats";

// Standard passport / ID photo specifications (mm). Not all square, unlike a generic resize.
const SIZE_PRESETS: { label: string; wMm: number; hMm: number }[] = [
  { label: "India Passport/Visa (2×2 in)", wMm: 51, hMm: 51 },
  { label: "India PAN Card Photo", wMm: 25, hMm: 35 },
  { label: "US Passport/Visa (2×2 in)", wMm: 51, hMm: 51 },
  { label: "Schengen/EU Visa", wMm: 35, hMm: 45 },
  { label: "UK Passport", wMm: 35, hMm: 45 },
];

const DPI = 300;
const SHEET_W_IN = 4;
const SHEET_H_IN = 6;
const SHEET_GAP_PX = 10;
const SHEET_MARGIN_PX = 20;
const MAX_SHEET_COPIES = 12;

function mmToPx(mm: number): number {
  return Math.round((mm * DPI) / 25.4);
}

export default function PassportPhotoMaker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [name, setName] = useState("photo");
  const [presetIndex, setPresetIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0.5); // 0..1, 0.5 = centered
  const [panY, setPanY] = useState(0.5); // 0..1, 0.5 = centered
  const [busy, setBusy] = useState(false);
  const [copies, setCopies] = useState(8);
  const [sheetInfo, setSheetInfo] = useState<{ cols: number; rows: number; max: number } | null>(null);

  const preset = SIZE_PRESETS[presetIndex];
  const targetWPx = mmToPx(preset.wMm);
  const targetHPx = mmToPx(preset.hMm);
  const targetRatio = preset.wMm / preset.hMm;

  const onFile = (f: File) => {
    setName(f.name.replace(/\.\w+$/, ""));
    const image = new Image();
    image.onload = () => {
      setImg(image);
      setZoom(1);
      setPanX(0.5);
      setPanY(0.5);
    };
    image.src = URL.createObjectURL(f);
  };

  const applyPreset = (index: number) => {
    setPresetIndex(index);
    setZoom(1);
    setPanX(0.5);
    setPanY(0.5);
  };

  // Draws the cropped/panned/zoomed photo onto a target canvas at (destX, destY) with size (destW, destH).
  const drawCroppedPhoto = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    destX: number,
    destY: number,
    destW: number,
    destH: number
  ) => {
    // Cover-fit base scale so the frame is always fully covered, then apply user zoom on top.
    const baseScale = Math.max(destW / image.naturalWidth, destH / image.naturalHeight);
    const scale = baseScale * zoom;
    const drawW = image.naturalWidth * scale;
    const drawH = image.naturalHeight * scale;

    // Max pan range so the image never reveals empty space inside the frame.
    const maxOffsetX = Math.max(0, drawW - destW);
    const maxOffsetY = Math.max(0, drawH - destH);
    const offsetX = maxOffsetX * panX;
    const offsetY = maxOffsetY * panY;

    ctx.save();
    ctx.beginPath();
    ctx.rect(destX, destY, destW, destH);
    ctx.clip();
    ctx.drawImage(image, destX - offsetX, destY - offsetY, drawW, drawH);
    ctx.restore();
  };

  const renderSinglePhotoCanvas = (image: HTMLImageElement): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = targetWPx;
    canvas.height = targetHPx;
    const ctx = canvas.getContext("2d")!;
    drawCroppedPhoto(ctx, image, 0, 0, targetWPx, targetHPx);
    return canvas;
  };

  const downloadSingle = async () => {
    if (!img) return;
    setBusy(true);
    const canvas = renderSinglePhotoCanvas(img);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
    if (blob) {
      downloadBlob(blob, `passport-photo-${preset.wMm}x${preset.hMm}mm.png`);
      track(["imagesOptimized", "filesProcessed"]);
    }
    setBusy(false);
  };

  const downloadSheet = async () => {
    if (!img) return;
    setBusy(true);
    const sheetWPx = mmToPx((SHEET_W_IN * 25.4));
    const sheetHPx = mmToPx((SHEET_H_IN * 25.4));

    const cols = Math.max(1, Math.floor((sheetWPx - SHEET_MARGIN_PX) / (targetWPx + SHEET_GAP_PX)));
    const rows = Math.max(1, Math.floor((sheetHPx - SHEET_MARGIN_PX) / (targetHPx + SHEET_GAP_PX)));
    const maxFit = Math.min(cols * rows, MAX_SHEET_COPIES);
    const totalCopies = Math.min(copies, maxFit);
    setSheetInfo({ cols, rows, max: maxFit });

    const sheet = document.createElement("canvas");
    sheet.width = sheetWPx;
    sheet.height = sheetHPx;
    const ctx = sheet.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sheet.width, sheet.height);

    let placed = 0;
    outer: for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (placed >= totalCopies) break outer;
        const x = SHEET_MARGIN_PX / 2 + c * (targetWPx + SHEET_GAP_PX);
        const y = SHEET_MARGIN_PX / 2 + r * (targetHPx + SHEET_GAP_PX);
        drawCroppedPhoto(ctx, img, x, y, targetWPx, targetHPx);
        placed++;
      }
    }

    const blob = await new Promise<Blob | null>((res) => sheet.toBlob(res, "image/png"));
    if (blob) {
      downloadBlob(blob, `passport-photo-sheet-4x6in.png`);
      track(["imagesOptimized", "filesProcessed"]);
    }
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <UploadCloud className="size-8 text-primary" />
            <span className="font-medium">{img ? `${name} · ${img.naturalWidth}×${img.naturalHeight}` : "Upload a photo for your passport/ID photo"}</span>
            <span className="text-sm text-muted-foreground">Processed privately in your browser — nothing is uploaded</span>
          </button>
        </CardContent>
      </Card>

      {img && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Size &amp; crop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label id="size-preset-label">Photo size</Label>
                <div className="grid grid-cols-1 gap-1.5" role="group" aria-labelledby="size-preset-label">
                  {SIZE_PRESETS.map((p, i) => (
                    <button
                      key={p.label}
                      onClick={() => applyPreset(i)}
                      className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                        presetIndex === i ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"
                      }`}
                    >
                      <span className="block font-medium">{p.label}</span>
                      <span className="block text-[10px] text-muted-foreground">
                        {p.wMm} × {p.hMm} mm
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="zoom-range">Zoom ({zoom.toFixed(2)}×)</Label>
                <input
                  id="zoom-range"
                  type="range"
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pan-x-range">Horizontal position</Label>
                <input
                  id="pan-x-range"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={panX}
                  onChange={(e) => setPanX(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pan-y-range">Vertical position</Label>
                <input
                  id="pan-y-range"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={panY}
                  onChange={(e) => setPanY(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="copies-input">Copies on print sheet</Label>
                <input
                  id="copies-input"
                  type="range"
                  min={1}
                  max={MAX_SHEET_COPIES}
                  step={1}
                  value={copies}
                  onChange={(e) => setCopies(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <p className="text-xs text-muted-foreground">
                  {copies} {copies === 1 ? "copy" : "copies"} requested{sheetInfo ? ` · sheet fits up to ${sheetInfo.max} (${sheetInfo.cols}×${sheetInfo.rows} grid)` : ""}
                </p>
              </div>

              <div className="space-y-2">
                <Button onClick={downloadSingle} disabled={busy} className="w-full">
                  {busy ? "Processing…" : `Download single photo (${preset.wMm}×${preset.hMm}mm)`}
                </Button>
                <Button onClick={downloadSheet} disabled={busy} variant="outline" className="w-full">
                  {busy ? "Processing…" : "Download print sheet (4×6 in)"}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Photo specification requirements can vary slightly by country and portal — always confirm the exact size and
                background requirements on the official passport/visa portal before submitting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="mx-auto w-full max-w-[240px] overflow-hidden rounded-xl border border-border bg-secondary/40"
                style={{ aspectRatio: `${targetRatio}` }}
              >
                <PreviewFrame image={img} zoom={zoom} panX={panX} panY={panY} />
              </div>
              <div className="rounded-xl bg-secondary/60 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Output size</p>
                <p className="font-semibold">
                  {targetWPx}×{targetHPx}px ({preset.wMm}×{preset.hMm}mm @ {DPI}dpi)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Live CSS-based preview of the cover-fit + zoom + pan crop, mirroring the canvas draw math.
function PreviewFrame({
  image,
  zoom,
  panX,
  panY,
}: {
  image: HTMLImageElement;
  zoom: number;
  panX: number;
  panY: number;
}) {
  const naturalRatio = image.naturalWidth / image.naturalHeight;
  // Render the image at cover-fit * zoom size relative to the frame, using percentage-based sizing
  // so it scales with the frame regardless of its rendered pixel size.
  const scalePercent = 100 * zoom;
  // Position: 0% aligns image's top/left with frame's top/left after cover-fit;
  // 100% aligns image's bottom/right with frame's bottom/right. panX/panY (0..1) interpolate between.
  const objectPosition = `${panX * 100}% ${panY * 100}%`;

  return (
    <div className="relative h-full w-full overflow-hidden" aria-hidden={false}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt="Crop preview"
        className="h-full w-full"
        style={{
          objectFit: "cover",
          objectPosition,
          transform: `scale(${zoom})`,
          transformOrigin: `${panX * 100}% ${panY * 100}%`,
          width: "100%",
          height: "100%",
          aspectRatio: `${naturalRatio}`,
        }}
      />
    </div>
  );
}
