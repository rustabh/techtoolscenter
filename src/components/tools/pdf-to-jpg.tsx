"use client";

import { useState } from "react";
import { FileImage, Loader2, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

type PageImage = { blob: Blob; url: string };

export default function PdfToJpg() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const baseName = (name: string) => name.replace(/\.pdf$/i, "") || "pdf";

  const onFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setNotice("Only PDF files are supported.");
      return;
    }
    setNotice(null);
    setFile(f);
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    setPages([]);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    setPages([]);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

      const data = new Uint8Array(await file.arrayBuffer());
      const doc = await pdfjs.getDocument({ data }).promise;
      const results: PageImage[] = [];

      for (let n = 1; n <= doc.numPages; n++) {
        setProgress(`Rendering page ${n} of ${doc.numPages}…`);
        const page = await doc.getPage(n);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (blob) results.push({ blob, url: URL.createObjectURL(blob) });
      }

      setPages(results);
      if (results.length === 1) {
        downloadBlob(results[0].blob, `${baseName(file.name)}.jpg`);
        showToast("Downloaded JPG");
      } else {
        showToast(`Converted ${results.length} pages`);
      }
    } catch {
      showToast("Couldn't convert this PDF — it may be corrupted or password-protected", "error");
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  const downloadAllZip = async () => {
    if (pages.length === 0) return;
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      pages.forEach((p, i) => {
        zip.file(`${baseName(file?.name ?? "page")}-page-${i + 1}.jpg`, p.blob);
      });
      const out = await zip.generateAsync({ type: "blob" });
      downloadBlob(out, `${baseName(file?.name ?? "pages")}.zip`);
      showToast("Downloaded ZIP");
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={FileImage}
            title={file ? file.name : "Upload a PDF to convert"}
            subtitle="Each page becomes a JPG image"
            accept="application/pdf"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
          <p className="mt-3 text-center text-xs text-muted-foreground">Processed entirely in your browser — files are never uploaded</p>
          {notice && <p className="mt-2 text-center text-xs text-destructive">{notice}</p>}
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <Button onClick={convert} disabled={busy} className="w-full">
              {busy ? <><Loader2 className="size-4 animate-spin" /> {progress || "Converting…"}</> : "Convert to JPG"}
            </Button>

            {pages.length > 0 && (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {pages.map((p, i) => (
                    <div key={i} className="space-y-2 rounded-xl border border-border p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={`Page ${i + 1} preview`} className="aspect-[3/4] w-full rounded-lg object-cover" />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        aria-label={`Download page ${i + 1}`}
                        onClick={() => downloadBlob(p.blob, `${baseName(file.name)}-page-${i + 1}.jpg`)}
                      >
                        <Download className="size-4" /> Page {i + 1}
                      </Button>
                    </div>
                  ))}
                </div>
                {pages.length > 1 && (
                  <Button variant="secondary" className="w-full" onClick={downloadAllZip}>
                    Download all ({pages.length}) as .zip
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
