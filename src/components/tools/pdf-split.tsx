"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

function parseRange(input: string, max: number): number[] {
  const set = new Set<number>();
  for (const part of input.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.includes("-")) {
      const [a, b] = trimmed.split("-").map((n) => parseInt(n, 10));
      for (let i = a; i <= b; i++) if (i >= 1 && i <= max) set.add(i);
    } else {
      const n = parseInt(trimmed, 10);
      if (n >= 1 && n <= max) set.add(n);
    }
  }
  return [...set].sort((a, b) => a - b);
}

export default function PdfSplit() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("1-1");
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File) => {
    setFile(f);
    const doc = await PDFDocument.load(await f.arrayBuffer());
    const count = doc.getPageCount();
    setPageCount(count);
    setRange(`1-${count}`);
  };

  const split = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const pages = parseRange(range, pageCount);
      if (pages.length === 0) return;
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, pages.map((p) => p - 1));
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "split.pdf");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
          <button
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40"
          >
            <Scissors className="size-8 text-primary" />
            <span className="font-medium">{file ? file.name : "Upload a PDF to split"}</span>
            <span className="text-sm text-muted-foreground">{file ? `${pageCount} pages` : "Select a PDF file"}</span>
          </button>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-1.5">
              <Label htmlFor="range">Pages to extract</Label>
              <Input id="range" value={range} onChange={(e) => setRange(e.target.value)} placeholder="e.g. 1-3, 5, 8" />
              <p className="text-xs text-muted-foreground">Use ranges (1-3) and single pages (5), separated by commas.</p>
            </div>
            <Button onClick={split} disabled={busy}>{busy ? "Splitting…" : "Extract pages"}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
