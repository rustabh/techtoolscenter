"use client";

import { useCallback, useEffect, useState } from "react";
import { ScanText, Copy, Check, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

type Lang = "eng" | "hin" | "eng+hin";
const LANG_LABELS: Record<Lang, string> = { eng: "English", hin: "Hindi", "eng+hin": "English + Hindi" };

export default function OcrTextExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);
  const [lang, setLang] = useState<Lang>("eng");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ status: string; pct: number } | null>(null);
  const [text, setText] = useState("");
  const { copied, copy } = useCopy();
  const { history, add, remove, clear } = useGenerationHistory("uh:history:ocr-text-extractor");

  const onFile = async (f: File) => {
    setText("");
    if (f.type === "application/pdf") {
      try {
        const { PDFDocument } = await import("pdf-lib");
        const doc = await PDFDocument.load(await f.arrayBuffer());
        setFile(f);
        setIsPdf(true);
        setPageCount(doc.getPageCount());
        setPageIndex(0);
      } catch {
        showToast("Couldn't open this PDF — it may be corrupted or password-protected", "error");
      }
      return;
    }
    if (f.type.startsWith("image/")) {
      setFile(f);
      setIsPdf(false);
      setPageCount(0);
      setImgUrl(URL.createObjectURL(f));
      return;
    }
    showToast("Only images and PDFs are supported", "error");
  };

  const renderPdfPage = useCallback(async (f: File, idx: number) => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const data = new Uint8Array(await f.arrayBuffer());
    const doc = await pdfjs.getDocument({ data }).promise;
    const page = await doc.getPage(idx + 1);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas.toDataURL("image/png");
  }, []);

  useEffect(() => {
    if (!isPdf || !file) return;
    let cancelled = false;
    setRendering(true);
    renderPdfPage(file, pageIndex)
      .then((url) => { if (!cancelled) setImgUrl(url); })
      .catch(() => { if (!cancelled) showToast("Couldn't render this page", "error"); })
      .finally(() => { if (!cancelled) setRendering(false); });
    return () => { cancelled = true; };
  }, [isPdf, file, pageIndex, renderPdfPage]);

  const extract = async () => {
    if (!imgUrl) return;
    setBusy(true);
    setProgress({ status: "starting…", pct: 0 });
    setText("");
    try {
      const Tesseract = await import("tesseract.js");
      const worker = await Tesseract.createWorker(lang, undefined, {
        workerPath: "/tessdata/worker.min.js",
        corePath: "/tessdata",
        langPath: "/tessdata",
        logger: (m) => setProgress({ status: m.status, pct: Math.round((m.progress ?? 0) * 100) }),
      });
      const { data } = await worker.recognize(imgUrl);
      await worker.terminate();
      const extracted = data.text.trim();
      setText(extracted);
      if (extracted) {
        add(extracted.slice(0, 300), `${file?.name ?? "image"} · ${LANG_LABELS[lang]}`);
        showToast("Text extracted");
      } else {
        showToast("No text found in this image", "error");
      }
    } catch {
      showToast("Couldn't run OCR — try a clearer image or a different page", "error");
    } finally {
      setBusy(false);
      setProgress(null);
    }
  };

  const download = () => {
    if (!text) return;
    downloadBlob(new Blob([text], { type: "text/plain" }), `${(file?.name ?? "extracted").replace(/\.[^.]+$/, "")}.txt`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Upload</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <FileDropzone
            icon={ScanText}
            title={file ? file.name : "Click or drop an image or PDF here"}
            subtitle={isPdf ? `${pageCount} page${pageCount === 1 ? "" : "s"}` : "JPG, PNG, WebP or PDF"}
            accept="image/*,application/pdf"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
          {isPdf && pageCount > 1 && (
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" size="icon" disabled={pageIndex === 0} onClick={() => setPageIndex((p) => Math.max(0, p - 1))} aria-label="Previous page">
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Page {pageIndex + 1} of {pageCount}</span>
              <Button variant="outline" size="icon" disabled={pageIndex === pageCount - 1} onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))} aria-label="Next page">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
          {rendering && <p className="text-center text-sm text-muted-foreground">Rendering page…</p>}
          {imgUrl && !rendering && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgUrl} alt="Preview to extract text from" className="mx-auto max-h-64 rounded-lg border border-border object-contain" />
          )}
          <div className="space-y-1.5">
            <Label>Language</Label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                  className={`rounded-xl border px-2 py-2 text-xs font-medium transition-colors ${
                    lang === l ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={extract} disabled={!imgUrl || busy} className="w-full">
            {busy ? `${progress?.status ?? "Working…"} ${progress?.pct ?? 0}%` : "Extract text"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Your image is processed entirely in your browser — nothing is uploaded. The first extraction downloads a small language model, cached for next time.</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Extracted text</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            className="min-h-[280px] font-mono text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Extracted text will appear here — you can edit it before copying or downloading…"
          />
          <p className="text-xs text-muted-foreground">{text.split(/\s+/).filter(Boolean).length} words · {text.length} characters</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => copy(text)} disabled={!text}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" onClick={download} disabled={!text}>
              <Download className="size-4" /> Download .txt
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel history={history} onRemove={remove} onClear={clear} emptyLabel="Nothing extracted yet — your past results will show up here." />
        </CardContent>
      </Card>
    </div>
  );
}
