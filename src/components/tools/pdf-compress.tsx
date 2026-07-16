"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileArchive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";

function formatBytes(b: number) {
  if (b < 1048576) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1048576).toFixed(2)} MB`;
}

export default function PdfCompress() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ size: number; blob: Blob } | null>(null);
  const [busy, setBusy] = useState(false);

  const compress = async (f: File) => {
    setBusy(true);
    setResult(null);
    try {
      const src = await PDFDocument.load(await f.arrayBuffer());
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, src.getPageIndices());
      pages.forEach((p) => out.addPage(p));
      out.setTitle(src.getTitle() ?? "");
      const bytes = await out.save({ useObjectStreams: true });
      setResult({ size: bytes.length, blob: new Blob([bytes], { type: "application/pdf" }) });
    } finally {
      setBusy(false);
    }
  };

  const onFile = (f: File) => {
    setFile(f);
    compress(f);
  };

  const savings = file && result ? Math.round((1 - result.size / file.size) * 100) : 0;

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
            <FileArchive className="size-8 text-primary" />
            <span className="font-medium">{file ? file.name : "Upload a PDF to compress"}</span>
            <span className="text-sm text-muted-foreground">Optimises document structure locally</span>
          </button>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Original</p>
                <p className="font-semibold">{formatBytes(file.size)}</p>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">Optimised</p>
                <p className="font-semibold">{busy ? "…" : result ? formatBytes(result.size) : "—"}</p>
              </div>
            </div>
            {result && savings > 0 && (
              <p className="rounded-xl bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Reduced by {savings}%
              </p>
            )}
            {result && savings <= 0 && (
              <p className="rounded-xl bg-secondary/60 p-3 text-center text-sm text-muted-foreground">
                This PDF is already well optimised.
              </p>
            )}
            {result && (
              <Button onClick={() => downloadBlob(result.blob, `compressed-${file.name}`)}>
                Download optimised PDF
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
