"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { ListOrdered } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

type Position = "bottom-center" | "bottom-right" | "bottom-left" | "top-center" | "top-right" | "top-left";
type Format = "n" | "page-n" | "n-of-total";

const POSITIONS: { key: Position; label: string }[] = [
  { key: "top-left", label: "Top left" },
  { key: "top-center", label: "Top center" },
  { key: "top-right", label: "Top right" },
  { key: "bottom-left", label: "Bottom left" },
  { key: "bottom-center", label: "Bottom center" },
  { key: "bottom-right", label: "Bottom right" },
];

const FORMATS: { key: Format; label: string; render: (n: number, total: number) => string }[] = [
  { key: "n", label: "1, 2, 3…", render: (n) => `${n}` },
  { key: "page-n", label: "Page 1", render: (n) => `Page ${n}` },
  { key: "n-of-total", label: "1 of 10", render: (n, t) => `${n} of ${t}` },
];

export default function PdfPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<Position>("bottom-center");
  const [format, setFormat] = useState<Format>("n-of-total");
  const [startAt, setStartAt] = useState(1);
  const [size, setSize] = useState(11);
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
    if (!file) return;
    setBusy(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;
      const renderer = FORMATS.find((f) => f.key === format)!.render;
      const margin = 28;

      pages.forEach((page, idx) => {
        const { width, height } = page.getSize();
        const label = renderer(startAt + idx, total);
        const textWidth = font.widthOfTextAtSize(label, size);

        const x =
          position.endsWith("left") ? margin
          : position.endsWith("right") ? width - margin - textWidth
          : width / 2 - textWidth / 2;
        const y = position.startsWith("top") ? height - margin : margin;

        page.drawText(label, { x, y, size, font, color: rgb(0.35, 0.35, 0.4) });
      });

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "numbered.pdf");
      showToast("Downloaded numbered.pdf");
    } catch {
      showToast("Couldn't number this PDF — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={ListOrdered}
            title={file ? file.name : "Click or drop a PDF here to number pages"}
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
              <Label>Position</Label>
              <div className="grid grid-cols-3 gap-2">
                {POSITIONS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    aria-pressed={position === p.key}
                    onClick={() => setPosition(p.key)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                      position === p.key ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Format</Label>
              <div className="grid grid-cols-3 gap-2">
                {FORMATS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    aria-pressed={format === f.key}
                    onClick={() => setFormat(f.key)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
                      format === f.key ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="start-at">Start at</Label>
                <Input id="start-at" type="number" min={0} value={startAt} onChange={(e) => setStartAt(parseInt(e.target.value) || 1)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pn-size">Font size: {size}px</Label>
                <input id="pn-size" type="range" min={8} max={24} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
            </div>
            <Button onClick={apply} disabled={busy}>{busy ? "Numbering…" : "Add page numbers & download"}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
