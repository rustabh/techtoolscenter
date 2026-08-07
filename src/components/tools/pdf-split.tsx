"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { parsePageRange } from "@/lib/pdf-page-range";

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("1-1");
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File) => {
    try {
      const doc = await PDFDocument.load(await f.arrayBuffer());
      const count = doc.getPageCount();
      setFile(f);
      setPageCount(count);
      setRange(`1-${count}`);
    } catch {
      showToast("Couldn't open this PDF — it may be corrupted or password-protected", "error");
    }
  };

  const split = async () => {
    if (!file) return;
    const pages = parsePageRange(range, pageCount);
    if (pages.length === 0) {
      showToast("No valid pages in that range — check the page numbers", "error");
      return;
    }
    setBusy(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, pages.map((p) => p - 1));
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "split.pdf");
      showToast("Downloaded split.pdf");
    } catch {
      showToast("Couldn't split this PDF — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={Scissors}
            title={file ? file.name : "Click or drop a PDF here to split"}
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
