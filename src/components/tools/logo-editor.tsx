"use client";

import { useRef } from "react";
import { Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type LogoAlign = "left" | "center" | "right";

export function fitContain(iw: number, ih: number, bw: number, bh: number) {
  const s = Math.min(bw / iw, bh / ih);
  return { w: iw * s, h: ih * s };
}

// Normalises any uploaded image to a PNG data URL via an offscreen canvas
// (consistent format for jsPDF's addImage regardless of the source file
// type) and reports back its natural pixel dimensions so callers can fit it
// into a layout box without distorting its aspect ratio.
export function readLogoFile(file: File, onReady: (dataUrl: string, w: number, h: number) => void, onError: (message: string) => void) {
  if (!file.type.startsWith("image/")) {
    onError("That's not an image file — try a JPG, PNG or WebP");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) { onError("Couldn't process that image"); return; }
      ctx.drawImage(img, 0, 0);
      onReady(canvas.toDataURL("image/png"), img.naturalWidth, img.naturalHeight);
    };
    img.onerror = () => onError("Couldn't read that image — the file may be corrupted");
    img.src = reader.result as string;
  };
  reader.onerror = () => onError("Couldn't read that file — try again");
  reader.readAsDataURL(file);
}

/** Shared upload + align + size control for a document header logo — used
 *  by every business-document generator that supports a company logo. */
export function LogoEditor({
  logo, align, size, onUpload, onRemove, onAlign, onSize, label = "Add company logo",
}: {
  logo?: string;
  align: LogoAlign;
  size: number;
  onUpload: (f: File) => void;
  onRemove: () => void;
  onAlign: (a: LogoAlign) => void;
  onSize: (n: number) => void;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="rounded-lg border border-dashed border-border/70 p-2.5">
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = "";
        }}
      />
      {!logo ? (
        <Button variant="outline" size="sm" type="button" onClick={() => ref.current?.click()}>
          <ImageIcon className="size-4" /> {label}
        </Button>
      ) : (
        <div className="flex items-start gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" className="h-14 w-20 shrink-0 rounded-md border border-border object-contain bg-secondary/40" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap gap-1">
              {(["left", "center", "right"] as const).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => onAlign(a)}
                  className={`rounded-md border px-2 py-1 text-[11px] font-medium capitalize transition-colors ${
                    align === a ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={30}
                max={70}
                value={size}
                onChange={(e) => onSize(Number(e.target.value))}
                aria-label="Logo size"
                className="w-full accent-[hsl(var(--primary))]"
              />
              <span className="w-9 shrink-0 text-right text-[11px] text-muted-foreground">{size}%</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" type="button" aria-label="Remove logo" onClick={onRemove}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
