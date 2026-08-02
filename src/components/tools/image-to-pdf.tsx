"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { ImagePlus, ArrowUp, ArrowDown, X, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

// A4 at 72dpi, in points (pdf-lib works in points).
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 40;

export default function ImageToPdf() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const add = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const valid = incoming.filter((x) => ACCEPTED_TYPES.includes(x.type));
    setNotice(valid.length < incoming.length ? "Only JPG and PNG images are supported — other files were skipped." : null);
    setFiles((f) => [...f, ...valid]);
  };

  const move = (i: number, dir: -1 | 1) => {
    setFiles((f) => {
      const next = [...f];
      const j = i + dir;
      if (j < 0 || j >= next.length) return f;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    try {
      const pdfDoc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const image = file.type === "image/png" ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
        const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

        const maxWidth = PAGE_WIDTH - MARGIN * 2;
        const maxHeight = PAGE_HEIGHT - MARGIN * 2;
        const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;
        const x = (PAGE_WIDTH - drawWidth) / 2;
        const y = (PAGE_HEIGHT - drawHeight) / 2;

        page.drawImage(image, { x, y, width: drawWidth, height: drawHeight });
      }
      const bytes = await pdfDoc.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "images.pdf");
      showToast("Downloaded images.pdf");
    } catch {
      showToast("Couldn't build the PDF — make sure every file is a valid JPG or PNG", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            multiple
            className="hidden"
            onChange={(e) => add(e.target.files)}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <ImagePlus className="size-8 text-primary" />
            <span className="font-medium">Add images</span>
            <span className="text-sm text-muted-foreground">JPG and PNG supported — each image becomes one page</span>
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Processed entirely in your browser — files are never uploaded</p>
          {notice && <p className="mt-2 text-center text-xs text-destructive">{notice}</p>}
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardContent className="space-y-3 pt-6">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="grid size-8 place-items-center rounded-lg bg-accent text-xs font-semibold text-accent-foreground">{i + 1}</span>
                <span className="flex-1 truncate text-sm">{f.name}</span>
                <Button variant="ghost" size="icon" aria-label="Move up" onClick={() => move(i, -1)}><ArrowUp className="size-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Move down" onClick={() => move(i, 1)}><ArrowDown className="size-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => setFiles((x) => x.filter((_, idx) => idx !== i))}><X className="size-4" /></Button>
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button onClick={convert} disabled={files.length === 0 || busy}>
                {busy ? <><Loader2 className="size-4 animate-spin" /> Converting…</> : `Convert ${files.length} ${files.length === 1 ? "image" : "images"} to PDF`}
              </Button>
              <Button variant="outline" onClick={() => setFiles([])}>Clear</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
