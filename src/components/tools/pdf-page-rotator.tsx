"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { RotateCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

function parseRange(input: string, max: number): Set<number> {
  const set = new Set<number>();
  const trimmed = input.trim();
  if (!trimmed) return set;
  for (const part of trimmed.split(",")) {
    const p = part.trim();
    if (!p) continue;
    if (p.includes("-")) {
      const [a, b] = p.split("-").map((n) => parseInt(n, 10));
      for (let i = a; i <= b; i++) if (i >= 1 && i <= max) set.add(i);
    } else {
      const n = parseInt(p, 10);
      if (n >= 1 && n <= max) set.add(n);
    }
  }
  return set;
}

export default function PdfPageRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [scope, setScope] = useState<"all" | "range">("all");
  const [range, setRange] = useState("");
  const [angle, setAngle] = useState(90);
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

  const rotate = async () => {
    if (!file) return;
    const targets = scope === "all" ? new Set(Array.from({ length: pageCount }, (_, i) => i + 1)) : parseRange(range, pageCount);
    if (targets.size === 0) {
      showToast("No valid pages selected — check the page numbers", "error");
      return;
    }
    setBusy(true);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const pages = doc.getPages();
      targets.forEach((num) => {
        const page = pages[num - 1];
        if (!page) return;
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      });
      const bytes = await doc.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "rotated.pdf");
      showToast("Downloaded rotated.pdf");
    } catch {
      showToast("Couldn't rotate this PDF — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={RotateCw}
            title={file ? file.name : "Click or drop a PDF here to rotate"}
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
              <Label>Rotate</Label>
              <div className="grid grid-cols-3 gap-2">
                {[90, 180, 270].map((a) => (
                  <button
                    key={a}
                    type="button"
                    aria-pressed={angle === a}
                    onClick={() => setAngle(a)}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                      angle === a ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Which pages</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={scope === "all"}
                  onClick={() => setScope("all")}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    scope === "all" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  All pages
                </button>
                <button
                  type="button"
                  aria-pressed={scope === "range"}
                  onClick={() => setScope("range")}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    scope === "range" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  Specific pages
                </button>
              </div>
              {scope === "range" && (
                <div className="pt-1">
                  <Input value={range} onChange={(e) => setRange(e.target.value)} placeholder="e.g. 1-3, 5, 8" />
                  <p className="mt-1 text-xs text-muted-foreground">Use ranges (1-3) and single pages (5), separated by commas.</p>
                </div>
              )}
            </div>
            <Button onClick={rotate} disabled={busy}>{busy ? "Rotating…" : "Rotate & download"}</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
