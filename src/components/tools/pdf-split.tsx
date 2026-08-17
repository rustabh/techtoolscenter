"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { parsePageRange } from "@/lib/pdf-page-range";

type Mode = "single" | "multi";

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [range, setRange] = useState("1-1");
  const [mode, setMode] = useState<Mode>("single");
  // Each line becomes its own output PDF — the common real-world case of
  // wanting several separate files out of one split (e.g. one PDF per
  // chapter), not just a single reordered/filtered extract.
  const [multiRanges, setMultiRanges] = useState("1-1\n2-2");
  const [busy, setBusy] = useState(false);

  const onFile = async (f: File) => {
    try {
      const doc = await PDFDocument.load(await f.arrayBuffer());
      const count = doc.getPageCount();
      setFile(f);
      setPageCount(count);
      setRange(`1-${count}`);
      setMultiRanges(`1-${Math.min(count, Math.ceil(count / 2))}\n${Math.min(count, Math.ceil(count / 2)) + 1}-${count}`);
    } catch {
      showToast("Couldn't open this PDF — it may be corrupted or password-protected", "error");
    }
  };

  const extractPdf = async (src: PDFDocument, pages: number[]) => {
    const out = await PDFDocument.create();
    const copied = await out.copyPages(src, pages.map((p) => p - 1));
    copied.forEach((p) => out.addPage(p));
    return out.save();
  };

  const split = async () => {
    if (!file) return;

    if (mode === "single") {
      const pages = parsePageRange(range, pageCount);
      if (pages.length === 0) {
        showToast("No valid pages in that range — check the page numbers", "error");
        return;
      }
      setBusy(true);
      try {
        const src = await PDFDocument.load(await file.arrayBuffer());
        const bytes = await extractPdf(src, pages);
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), "split.pdf");
        showToast("Downloaded split.pdf");
      } catch {
        showToast("Couldn't split this PDF — try again", "error");
      } finally {
        setBusy(false);
      }
      return;
    }

    const lines = multiRanges.split("\n").map((l) => l.trim()).filter(Boolean);
    const groups = lines.map((l) => parsePageRange(l, pageCount)).filter((p) => p.length > 0);
    if (groups.length === 0) {
      showToast("No valid page ranges — enter one range per line", "error");
      return;
    }
    setBusy(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      for (let i = 0; i < groups.length; i++) {
        const bytes = await extractPdf(src, groups[i]);
        zip.file(`split-${i + 1}.pdf`, bytes);
      }
      downloadBlob(await zip.generateAsync({ type: "blob" }), "split-pdfs.zip");
      showToast(`Downloaded ${groups.length} PDFs as a ZIP`);
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
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode("single")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${mode === "single" ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}
              >
                <span className="block font-medium">One file</span>
                <span className="block text-xs text-muted-foreground">Extract selected pages into a single PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("multi")}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition-colors ${mode === "multi" ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"}`}
              >
                <span className="block font-medium">Multiple files</span>
                <span className="block text-xs text-muted-foreground">One PDF per range, downloaded as a ZIP</span>
              </button>
            </div>
            {mode === "single" ? (
              <div className="space-y-1.5">
                <Label htmlFor="range">Pages to extract</Label>
                <Input id="range" value={range} onChange={(e) => setRange(e.target.value)} placeholder="e.g. 1-3, 5, 8" />
                <p className="text-xs text-muted-foreground">Use ranges (1-3) and single pages (5), separated by commas.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <Label htmlFor="multi-ranges">Ranges — one per line, each becomes its own PDF</Label>
                <Textarea id="multi-ranges" className="min-h-[120px] font-mono text-sm" value={multiRanges} onChange={(e) => setMultiRanges(e.target.value)} placeholder={"1-3\n4-6\n7-9"} />
                <p className="text-xs text-muted-foreground">e.g. one line per chapter — {pageCount} pages in this file.</p>
              </div>
            )}
            <Button onClick={split} disabled={busy}>{busy ? "Splitting…" : mode === "single" ? "Extract pages" : "Split into files"}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
