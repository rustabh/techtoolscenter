"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FilePlus2, ArrowUp, ArrowDown, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

export default function PdfMerge() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);

  const add = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const valid = incoming.filter((x) => x.type === "application/pdf");
    if (valid.length < incoming.length) showToast("Only PDF files are supported — other files were skipped", "info");
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

  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true);
    try {
      const out = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await out.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "merged.pdf");
      showToast("Downloaded merged.pdf");
    } catch {
      showToast("Couldn't merge these PDFs — one may be corrupted or password-protected", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden"
            onChange={(e) => add(e.target.files)} />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <FilePlus2 className="size-8 text-primary" />
            <span className="font-medium">Add PDF files</span>
            <span className="text-sm text-muted-foreground">Select two or more PDFs to combine</span>
          </button>
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
              <Button onClick={merge} disabled={files.length < 2 || busy}>
                {busy ? "Merging…" : `Merge ${files.length} PDFs`}
              </Button>
              <Button variant="outline" onClick={() => setFiles([])}>Clear</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
