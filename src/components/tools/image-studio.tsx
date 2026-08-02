"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { UploadCloud, Download, RotateCw, FlipHorizontal, FlipVertical } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn, downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import ImageCompressor from "./image-compressor";

type Tab = "edit" | "crop" | "compress" | "palette" | "picker" | "info" | "background" | "batch";
const TABS: { id: Tab; label: string }[] = [
  { id: "edit", label: "Edit" }, { id: "crop", label: "Crop" }, { id: "compress", label: "Compress" }, { id: "palette", label: "Palette" }, { id: "picker", label: "Color Picker" },
  { id: "info", label: "Metadata" }, { id: "background", label: "Background" }, { id: "batch", label: "Batch" },
];

function fmtBytes(b: number) { return b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(2)} MB`; }

function useImage() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [meta, setMeta] = useState<{ name: string; size: number; type: string } | null>(null);
  const load = (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("That's not an image file — try a JPG, PNG, or WebP", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => { setImg(image); setMeta({ name: file.name, size: file.size, type: file.type }); };
      image.onerror = () => showToast("Couldn't read that image — the file may be corrupted", "error");
      image.src = reader.result as string;
    };
    reader.onerror = () => showToast("Couldn't read that file — try again", "error");
    reader.readAsDataURL(file);
  };
  const reset = () => { setImg(null); setMeta(null); };
  return { img, meta, load, reset };
}

function Dropzone({ onFile, label }: { onFile: (f: File) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  return (
    <>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        className={cn(
          "flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors",
          over ? "border-primary bg-secondary/60" : "border-border hover:border-primary/50 hover:bg-secondary/40",
        )}
      >
        <UploadCloud className="size-8 text-primary" />
        <span className="font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">JPG, PNG or WebP · drag & drop or click · processed locally</span>
      </button>
    </>
  );
}

export default function ImageStudio() {
  const [tab, setTab] = useState<Tab>("edit");
  const { img, meta, load, reset } = useImage();

  return (
    <div className="space-y-6">
      {!img ? (
        <Card><CardContent className="pt-6"><Dropzone onFile={load} label="Upload an image to start" /></CardContent></Card>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <Button key={t.id} size="sm" variant={tab === t.id ? "default" : "outline"} onClick={() => setTab(t.id)}>{t.label}</Button>
            ))}
            <Button size="sm" variant="ghost" onClick={() => { reset(); setTab("edit"); }}>New image</Button>
          </div>
          {tab === "edit" && <EditTab img={img} meta={meta} />}
          {tab === "crop" && <CropTab img={img} />}
          {tab === "compress" && <ImageCompressor />}
          {tab === "palette" && <PaletteTab img={img} />}
          {tab === "picker" && <PickerTab img={img} />}
          {tab === "info" && <InfoTab img={img} meta={meta} />}
          {tab === "background" && <BackgroundTab img={img} />}
          {tab === "batch" && <BatchTab />}
        </>
      )}
    </div>
  );
}

/* ---------- Edit ---------- */
function EditTab({ img, meta }: { img: HTMLImageElement; meta: { size: number } | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rot, setRot] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [bright, setBright] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [blur, setBlur] = useState(0);
  const [sharpen, setSharpen] = useState(false);
  const [width, setWidth] = useState(img.width);
  const [wm, setWm] = useState("");
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.85);
  const [outSize, setOutSize] = useState(0);

  const render = useMemo(() => () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const swap = rot === 90 || rot === 270;
    const scale = width / img.width;
    const w = Math.round((swap ? img.height : img.width) * scale);
    const h = Math.round((swap ? img.width : img.height) * scale);
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `brightness(${bright}%) contrast(${contrast}%) blur(${blur}px)`;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    const dw = img.width * scale, dh = img.height * scale;
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
    ctx.filter = "none";
    if (sharpen) applySharpen(ctx, w, h);
    if (wm) {
      ctx.font = `${Math.max(16, w * 0.04)}px sans-serif`;
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.textAlign = "right"; ctx.textBaseline = "bottom";
      ctx.fillText(wm, w - 12, h - 12);
    }
  }, [img, rot, flipH, flipV, bright, contrast, blur, sharpen, width, wm]);

  useEffect(() => { render(); }, [render]);

  const save = () => {
    canvasRef.current?.toBlob((b) => {
      if (!b) { showToast("Couldn't export this image — try a different format", "error"); return; }
      setOutSize(b.size);
      downloadBlob(b, `edited.${format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg"}`);
      showToast("Downloaded edited image");
    }, format, quality);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle>Transform</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => setRot((r) => (r + 90) % 360)}><RotateCw /> Rotate</Button>
              <Button size="sm" variant={flipH ? "default" : "outline"} onClick={() => setFlipH((v) => !v)}><FlipHorizontal /> Flip H</Button>
              <Button size="sm" variant={flipV ? "default" : "outline"} onClick={() => setFlipV((v) => !v)}><FlipVertical /> Flip V</Button>
            </div>
            <div className="space-y-1.5"><Label>Width (resize / upscale): {width}px</Label>
              <input type="range" min={50} max={img.width * 3} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Adjust</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {([["Brightness", bright, setBright, 0, 200], ["Contrast", contrast, setContrast, 0, 200], ["Blur", blur, setBlur, 0, 20]] as const).map(([l, v, set, min, max]) => (
              <div key={l} className="space-y-1"><Label>{l}: {v}{l === "Blur" ? "px" : "%"}</Label>
                <input type="range" min={min} max={max} value={v} onChange={(e) => set(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
            ))}
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={sharpen} onChange={(e) => setSharpen(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" /> Sharpen
            </label>
            <div className="space-y-1.5"><Label>Watermark text</Label><Input value={wm} onChange={(e) => setWm(e.target.value)} placeholder="© Your brand" /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Export</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Format</Label>
                <Select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Quality: {Math.round(quality * 100)}%</Label>
                <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
            </div>
            <Button className="w-full" onClick={save}><Download /> Download</Button>
            {meta && <p className="text-xs text-muted-foreground">Original: {fmtBytes(meta.size)}{outSize ? ` · New: ${fmtBytes(outSize)}` : ""}</p>}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <canvas ref={canvasRef} className="max-h-[520px] max-w-full rounded-xl border border-border" />
        </CardContent>
      </Card>
    </div>
  );
}

function applySharpen(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const k = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  const s = src.data, o = dst.data;
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    for (let c = 0; c < 3; c++) {
      let sum = 0, ki = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        sum += s[((y + dy) * w + (x + dx)) * 4 + c] * k[ki++];
      }
      o[(y * w + x) * 4 + c] = Math.max(0, Math.min(255, sum));
    }
    o[(y * w + x) * 4 + 3] = s[(y * w + x) * 4 + 3];
  }
  ctx.putImageData(dst, 0, 0);
}

/* ---------- Crop ---------- */
type Rect = { x: number; y: number; w: number; h: number };
type Handle = "move" | "nw" | "ne" | "sw" | "se";
const CROP_MAX_W = 640;
const CROP_MAX_H = 480;
const CROP_MIN_SIZE = 24;
const CROP_RATIOS: [string, number | null][] = [["Free", null], ["1:1", 1], ["4:3", 4 / 3], ["16:9", 16 / 9], ["9:16", 9 / 16]];

function fitDims(img: HTMLImageElement) {
  const scale = Math.min(1, CROP_MAX_W / img.width, CROP_MAX_H / img.height);
  return { w: Math.round(img.width * scale), h: Math.round(img.height * scale) };
}

function CropTab({ img }: { img: HTMLImageElement }) {
  const [disp] = useState(() => fitDims(img));
  const [sel, setSel] = useState<Rect>(() => ({ x: disp.w * 0.1, y: disp.h * 0.1, w: disp.w * 0.8, h: disp.h * 0.8 }));
  const [ratio, setRatio] = useState<number | null>(null);
  const dragRef = useRef<{ handle: Handle; startX: number; startY: number; start: Rect } | null>(null);

  const clamp = (s: Rect): Rect => {
    let { x, y, w, h } = s;
    w = Math.max(CROP_MIN_SIZE, Math.min(w, disp.w));
    h = Math.max(CROP_MIN_SIZE, Math.min(h, disp.h));
    x = Math.max(0, Math.min(x, disp.w - w));
    y = Math.max(0, Math.min(y, disp.h - h));
    return { x, y, w, h };
  };

  const startDrag = (handle: Handle) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragRef.current = { handle, startX: e.clientX, startY: e.clientY, start: sel };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX, dy = e.clientY - d.startY;
    const s = d.start;
    let next: Rect = { ...s };
    if (d.handle === "move") {
      next.x = s.x + dx; next.y = s.y + dy;
    } else {
      if (d.handle === "se" || d.handle === "ne") next.w = s.w + dx;
      if (d.handle === "sw" || d.handle === "nw") { next.w = s.w - dx; next.x = s.x + dx; }
      if (ratio) {
        next.h = next.w / ratio;
        if (d.handle === "ne" || d.handle === "nw") next.y = s.y + (s.h - next.h);
      } else {
        if (d.handle === "se" || d.handle === "sw") next.h = s.h + dy;
        if (d.handle === "ne" || d.handle === "nw") { next.h = s.h - dy; next.y = s.y + dy; }
      }
    }
    setSel(clamp(next));
  };
  const endDrag = () => { dragRef.current = null; };

  const applyRatio = (r: number | null) => {
    setRatio(r);
    if (r) setSel((s) => clamp({ ...s, h: s.w / r }));
  };

  const download = () => {
    const scaleX = img.width / disp.w, scaleY = img.height / disp.h;
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(sel.w * scaleX));
    c.height = Math.max(1, Math.round(sel.h * scaleY));
    c.getContext("2d")!.drawImage(img, sel.x * scaleX, sel.y * scaleY, sel.w * scaleX, sel.h * scaleY, 0, 0, c.width, c.height);
    c.toBlob((b) => {
      if (!b) { showToast("Couldn't export the crop — try again", "error"); return; }
      downloadBlob(b, "cropped.png");
      showToast("Downloaded cropped.png");
    }, "image/png");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card>
        <CardHeader><CardTitle>Crop</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Aspect ratio</Label>
            <div className="flex flex-wrap gap-2">
              {CROP_RATIOS.map(([label, r]) => (
                <Button key={label} size="sm" variant={ratio === r ? "default" : "outline"} onClick={() => applyRatio(r)}>{label}</Button>
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={download}><Download /> Download cropped image</Button>
          <p className="text-xs text-muted-foreground">Drag the corner handles to resize, or drag inside the box to move it.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <div
            className="relative touch-none overflow-hidden rounded-xl border border-border select-none"
            style={{ width: disp.w, height: disp.h }}
            onPointerMove={onMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            <div className="absolute inset-x-0 top-0 bg-black/50" style={{ height: sel.y }} />
            <div className="absolute inset-x-0 bottom-0 bg-black/50" style={{ top: sel.y + sel.h }} />
            <div className="absolute bg-black/50" style={{ left: 0, top: sel.y, width: sel.x, height: sel.h }} />
            <div className="absolute bg-black/50" style={{ left: sel.x + sel.w, right: 0, top: sel.y, height: sel.h }} />
            <div
              className="absolute cursor-move border-2 border-white"
              style={{ left: sel.x, top: sel.y, width: sel.w, height: sel.h }}
              onPointerDown={startDrag("move")}
            >
              {(["nw", "ne", "sw", "se"] as const).map((h) => (
                <span
                  key={h}
                  onPointerDown={startDrag(h)}
                  className={cn(
                    "absolute size-4 rounded-full border-2 border-white bg-primary",
                    h === "nw" && "-left-2 -top-2 cursor-nwse-resize",
                    h === "ne" && "-right-2 -top-2 cursor-nesw-resize",
                    h === "sw" && "-left-2 -bottom-2 cursor-nesw-resize",
                    h === "se" && "-right-2 -bottom-2 cursor-nwse-resize",
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Palette ---------- */
function PaletteTab({ img }: { img: HTMLImageElement }) {
  const { copied, copy } = useCopy();
  const colors = useMemo(() => {
    const c = document.createElement("canvas"); const s = 60;
    c.width = s; c.height = s; const ctx = c.getContext("2d")!;
    ctx.drawImage(img, 0, 0, s, s);
    const data = ctx.getImageData(0, 0, s, s).data;
    const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] >> 5 << 5, g = data[i + 1] >> 5 << 5, b = data[i + 2] >> 5 << 5;
      const key = `${r},${g},${b}`;
      const e = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 };
      e.r += data[i]; e.g += data[i + 1]; e.b += data[i + 2]; e.n++; buckets.set(key, e);
    }
    return [...buckets.values()].sort((a, b) => b.n - a.n).slice(0, 8)
      .map((e) => "#" + [e.r / e.n, e.g / e.n, e.b / e.n].map((v) => Math.round(v).toString(16).padStart(2, "0")).join(""));
  }, [img]);
  return (
    <Card><CardHeader><CardTitle>Dominant colours</CardTitle></CardHeader><CardContent>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {colors.map((c) => (
          <button key={c} onClick={() => copy(c)} className="overflow-hidden rounded-xl border border-border">
            <span className="block h-20" style={{ background: c }} />
            <span className="block py-1.5 font-mono text-xs">{copied ? "Copied" : c.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </CardContent></Card>
  );
}

/* ---------- Color Picker ---------- */
function PickerTab({ img }: { img: HTMLImageElement }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000000");
  const { copied, copy } = useCopy();
  useEffect(() => {
    const c = ref.current!; const scale = Math.min(1, 500 / img.width);
    c.width = img.width * scale; c.height = img.height * scale;
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  }, [img]);
  const pick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const c = ref.current!; const rect = c.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (c.width / rect.width), y = (e.clientY - rect.top) * (c.height / rect.height);
    const d = c.getContext("2d")!.getImageData(x, y, 1, 1).data;
    setColor("#" + [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, "0")).join(""));
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
      <Card><CardContent className="pt-6"><canvas ref={ref} onClick={pick} className="max-w-full cursor-crosshair rounded-xl border border-border" /></CardContent></Card>
      <Card><CardHeader><CardTitle>Picked colour</CardTitle></CardHeader><CardContent className="space-y-3">
        <div className="h-24 rounded-xl border border-border" style={{ background: color }} />
        <button onClick={() => copy(color.toUpperCase())} className="w-full rounded-xl bg-secondary/60 p-3 font-mono">{copied ? "Copied!" : color.toUpperCase()}</button>
        <p className="text-xs text-muted-foreground">Click anywhere on the image to sample a colour.</p>
      </CardContent></Card>
    </div>
  );
}

/* ---------- Info ---------- */
function InfoTab({ img, meta }: { img: HTMLImageElement; meta: { name: string; size: number; type: string } | null }) {
  const rows = [
    ["File name", meta?.name ?? "—"], ["Type", meta?.type ?? "—"], ["File size", meta ? fmtBytes(meta.size) : "—"],
    ["Dimensions", `${img.naturalWidth} × ${img.naturalHeight} px`], ["Aspect ratio", (img.naturalWidth / img.naturalHeight).toFixed(3)],
    ["Megapixels", `${((img.naturalWidth * img.naturalHeight) / 1e6).toFixed(2)} MP`],
  ];
  return (
    <Card><CardHeader><CardTitle>Image metadata</CardTitle></CardHeader><CardContent className="space-y-2">
      {rows.map(([k, v]) => <div key={k} className="flex justify-between border-b border-border/60 py-2 text-sm"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>)}
      <p className="pt-3 text-xs text-muted-foreground">Re-exporting from the Edit tab strips EXIF and other embedded metadata — useful for privacy before sharing.</p>
    </CardContent></Card>
  );
}

/* ---------- Background (solid colour → transparent) ---------- */
function BackgroundTab({ img }: { img: HTMLImageElement }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [key, setKey] = useState("#ffffff");
  const [tol, setTol] = useState(30);
  const render = useMemo(() => () => {
    const c = ref.current!; c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d")!; ctx.clearRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height);
    const kr = parseInt(key.slice(1, 3), 16), kg = parseInt(key.slice(3, 5), 16), kb = parseInt(key.slice(5, 7), 16);
    const t = tol * tol * 3;
    for (let i = 0; i < d.data.length; i += 4) {
      const dr = d.data[i] - kr, dg = d.data[i + 1] - kg, db = d.data[i + 2] - kb;
      if (dr * dr + dg * dg + db * db < t) d.data[i + 3] = 0;
    }
    ctx.putImageData(d, 0, 0);
  }, [img, key, tol]);
  useEffect(() => { render(); }, [render]);
  const save = () => ref.current?.toBlob((b) => {
    if (!b) { showToast("Couldn't export this image — try again", "error"); return; }
    downloadBlob(b, "no-background.png");
    showToast("Downloaded no-background.png");
  }, "image/png");
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card><CardHeader><CardTitle>Remove background</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="space-y-1.5"><Label>Background colour to remove</Label><Input type="color" value={key} onChange={(e) => setKey(e.target.value)} className="h-10 p-1" /></div>
        <div className="space-y-1.5"><Label>Tolerance: {tol}</Label><input type="range" min={5} max={120} value={tol} onChange={(e) => setTol(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" /></div>
        <Button className="w-full" onClick={save}><Download /> Download PNG</Button>
        <p className="text-xs text-muted-foreground">Removes a solid/near-solid background colour. For complex photo backgrounds, a dedicated AI remover is more accurate.</p>
      </CardContent></Card>
      <Card><CardContent className="pt-6" style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 50%/20px 20px" }}>
        <canvas ref={ref} className="max-h-[480px] max-w-full rounded-xl" />
      </CardContent></Card>
    </div>
  );
}

/* ---------- Batch ---------- */
function BatchTab() {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [width, setWidth] = useState(1280);
  const [format, setFormat] = useState("image/jpeg");
  const [quality, setQuality] = useState(0.8);
  const [busy, setBusy] = useState(false);

  const run = async () => {
    if (!files.length) return;
    setBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (const file of files) {
        const url = URL.createObjectURL(file);
        try {
          const im = new Image(); im.src = url; await im.decode();
          const scale = Math.min(1, width / im.width);
          const c = document.createElement("canvas");
          c.width = Math.round(im.width * scale); c.height = Math.round(im.height * scale);
          c.getContext("2d")!.drawImage(im, 0, 0, c.width, c.height);
          const blob: Blob = await new Promise((res) => c.toBlob((b) => res(b!), format, quality));
          const ext = format === "image/png" ? "png" : format === "image/webp" ? "webp" : "jpg";
          zip.file(`${file.name.replace(/\.\w+$/, "")}.${ext}`, blob);
        } finally {
          URL.revokeObjectURL(url);
        }
      }
      downloadBlob(await zip.generateAsync({ type: "blob" }), "batch-images.zip");
      showToast("Downloaded batch-images.zip");
    } catch {
      showToast("Couldn't process this batch — make sure every file is a valid image", "error");
    } finally { setBusy(false); }
  };

  return (
    <Card><CardHeader><CardTitle>Batch processing</CardTitle></CardHeader><CardContent className="space-y-4">
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
        const all = Array.from(e.target.files || []);
        const images = all.filter((f) => f.type.startsWith("image/"));
        if (all.length - images.length > 0) showToast(`Skipped ${all.length - images.length} non-image file(s)`, "info");
        setFiles(images);
      }} />
      <Button variant="outline" onClick={() => ref.current?.click()}><UploadCloud /> Select images</Button>
      {files.length > 0 && <p className="text-sm text-muted-foreground">{files.length} image(s) selected</p>}
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5"><Label>Max width</Label><Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
        <div className="space-y-1.5"><Label>Format</Label><Select value={format} onChange={(e) => setFormat(e.target.value)}><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></Select></div>
        <div className="space-y-1.5"><Label>Quality: {Math.round(quality * 100)}%</Label><input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" /></div>
      </div>
      <Button onClick={run} disabled={!files.length || busy}><Download /> {busy ? "Processing…" : "Process & download ZIP"}</Button>
    </CardContent></Card>
  );
}
