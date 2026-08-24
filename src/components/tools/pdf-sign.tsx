"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Signature, Eraser, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { FileDropzone } from "@/components/tools/file-dropzone";

type SigMode = "draw" | "type";
const FONTS = ["'Brush Script MT', cursive", "'Segoe Script', cursive", "'Comic Sans MS', cursive"];
const SIG_W = 400;
const SIG_H = 150;

interface PageImg {
  url: string;
  cssWidth: number;
  cssHeight: number;
}

export default function PdfSign() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageImg, setPageImg] = useState<PageImg | null>(null);
  const [rendering, setRendering] = useState(false);

  const [sigMode, setSigMode] = useState<SigMode>("draw");
  const [sigColor, setSigColor] = useState("#111111");
  const [typedText, setTypedText] = useState("Your Name");
  const [fontIndex, setFontIndex] = useState(0);
  const [hasSig, setHasSig] = useState(false);
  const [sigTick, setSigTick] = useState(0); // bumped on every stroke so the position-preview thumbnail (a canvas snapshot) stays live
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const [xPct, setXPct] = useState(35);
  const [yPct, setYPct] = useState(75);
  const [widthPct, setWidthPct] = useState(28);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxDragging = useRef(false);
  const dragOffset = useRef({ dx: 0, dy: 0 });

  const [busy, setBusy] = useState(false);

  // --- Upload & page preview -----------------------------------------------

  const onFile = async (f: File) => {
    if (f.type !== "application/pdf") {
      showToast("Only PDF files are supported", "error");
      return;
    }
    try {
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setFile(f);
      setPageCount(doc.getPageCount());
      setPageIndex(0);
      setXPct(35);
      setYPct(75);
    } catch {
      showToast("Couldn't open this PDF — it may be corrupted or password-protected", "error");
    }
  };

  const renderPage = useCallback(async (f: File, idx: number) => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    const data = new Uint8Array(await f.arrayBuffer());
    const doc = await pdfjs.getDocument({ data }).promise;
    const page = await doc.getPage(idx + 1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    return { url: canvas.toDataURL("image/png"), cssWidth: canvas.width, cssHeight: canvas.height };
  }, []);

  useEffect(() => {
    if (!file) {
      setPageImg(null);
      return;
    }
    let cancelled = false;
    setRendering(true);
    renderPage(file, pageIndex)
      .then((r) => { if (!cancelled) setPageImg(r); })
      .catch(() => { if (!cancelled) showToast("Couldn't render this page", "error"); })
      .finally(() => { if (!cancelled) setRendering(false); });
    return () => { cancelled = true; };
  }, [file, pageIndex, renderPage]);

  // --- Signature drawing -----------------------------------------------------

  useEffect(() => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    canvas.width = SIG_W;
    canvas.height = SIG_H;
  }, []);

  const clearSig = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasSig(false);
  };

  useEffect(() => {
    if (sigMode !== "type") return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!typedText.trim()) return;
    ctx.fillStyle = sigColor;
    ctx.font = `40px ${FONTS[fontIndex]}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedText, canvas.width / 2, canvas.height / 2);
    setHasSig(true);
    setSigTick((t) => t + 1);
  }, [sigMode, typedText, fontIndex, sigColor]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * e.currentTarget.width,
      y: ((e.clientY - rect.top) / rect.height) * e.currentTarget.height,
    };
  };
  const onSigPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (sigMode !== "draw") return;
    drawing.current = true;
    lastPos.current = getPos(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onSigPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (sigMode !== "draw" || !drawing.current) return;
    const canvas = sigCanvasRef.current;
    if (!canvas || !lastPos.current) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.strokeStyle = sigColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    setHasSig(true);
    setSigTick((t) => t + 1);
  };
  const onSigPointerUp = () => { drawing.current = false; lastPos.current = null; };

  // --- Positioning the signature on the page preview -------------------------

  const onBoxPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    boxDragging.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const boxLeftPx = (xPct / 100) * rect.width;
    const boxTopPx = (yPct / 100) * rect.height;
    dragOffset.current = { dx: e.clientX - rect.left - boxLeftPx, dy: e.clientY - rect.top - boxTopPx };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onContainerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!boxDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const boxWidthPx = (widthPct / 100) * rect.width;
    const boxHeightPx = boxWidthPx * (SIG_H / SIG_W);
    let leftPx = e.clientX - rect.left - dragOffset.current.dx;
    let topPx = e.clientY - rect.top - dragOffset.current.dy;
    leftPx = Math.min(Math.max(0, leftPx), Math.max(0, rect.width - boxWidthPx));
    topPx = Math.min(Math.max(0, topPx), Math.max(0, rect.height - boxHeightPx));
    setXPct((leftPx / rect.width) * 100);
    setYPct((topPx / rect.height) * 100);
  };
  const onBoxPointerUp = () => { boxDragging.current = false; };

  // --- Embed & download --------------------------------------------------------

  const signAndDownload = async () => {
    if (!file || !hasSig) return;
    setBusy(true);
    try {
      const canvas = sigCanvasRef.current!;
      const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!pngBlob) throw new Error("no signature image");
      const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());

      const doc = await PDFDocument.load(await file.arrayBuffer());
      const pngImage = await doc.embedPng(pngBytes);
      const page = doc.getPages()[pageIndex];
      const { width: pw, height: ph } = page.getSize();

      const sigWidth = (widthPct / 100) * pw;
      const sigHeight = sigWidth * (SIG_H / SIG_W);
      const x = (xPct / 100) * pw;
      const y = ph - (yPct / 100) * ph - sigHeight;

      page.drawImage(pngImage, { x, y, width: sigWidth, height: sigHeight });

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes as BlobPart], { type: "application/pdf" }), `signed-${file.name}`);
      showToast("Downloaded signed PDF");
    } catch {
      showToast("Couldn't sign the PDF — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>1. Upload PDF</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <FileDropzone
              icon={Signature}
              title={file ? file.name : "Click or drop a PDF here to sign"}
              subtitle={file ? `${pageCount} page${pageCount === 1 ? "" : "s"}` : "Select a PDF file"}
              accept="application/pdf"
              onFiles={(files) => files[0] && onFile(files[0])}
            />
            {pageCount > 1 && (
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
            <p className="text-center text-xs text-muted-foreground">Processed entirely in your browser — your PDF is never uploaded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>2. Create your signature</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {(["draw", "type"] as SigMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={sigMode === m}
                  onClick={() => { setSigMode(m); clearSig(); }}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                    sigMode === m ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                  }`}
                >
                  {m === "draw" ? "Draw" : "Type"}
                </button>
              ))}
            </div>
            {sigMode === "type" && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sig-text">Your name</Label>
                  <Input id="sig-text" value={typedText} onChange={(e) => setTypedText(e.target.value)} maxLength={40} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {FONTS.map((f, i) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={fontIndex === i}
                      onClick={() => setFontIndex(i)}
                      style={{ fontFamily: f }}
                      className={`rounded-xl border px-4 py-2 text-lg transition-colors ${
                        fontIndex === i ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"
                      }`}
                    >
                      Style {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-xl border border-border bg-[repeating-conic-gradient(#8883_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-2">
              <canvas
                ref={sigCanvasRef}
                className="w-full touch-none rounded-lg bg-transparent"
                style={{ aspectRatio: `${SIG_W} / ${SIG_H}` }}
                onPointerDown={onSigPointerDown}
                onPointerMove={onSigPointerMove}
                onPointerUp={onSigPointerUp}
                onPointerLeave={onSigPointerUp}
                role="img"
                aria-label="Signature drawing area"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Input type="color" value={sigColor} onChange={(e) => setSigColor(e.target.value)} className="h-9 w-16 p-1" aria-label="Signature color" />
              <Button variant="outline" size="sm" onClick={clearSig}><Eraser className="size-4" /> Clear</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {file && (
        <Card>
          <CardHeader><CardTitle>3. Position &amp; download</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {rendering && <p className="text-sm text-muted-foreground">Rendering page…</p>}
            {pageImg && (
              <div
                ref={containerRef}
                className="relative mx-auto max-w-md touch-none select-none overflow-hidden rounded-lg border border-border"
                onPointerMove={onContainerPointerMove}
                onPointerUp={onBoxPointerUp}
                onPointerLeave={onBoxPointerUp}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pageImg.url} alt={`Page ${pageIndex + 1} preview`} className="block w-full" draggable={false} />
                <div
                  onPointerDown={onBoxPointerDown}
                  className={`absolute cursor-move rounded border-2 ${hasSig ? "border-primary bg-white/70" : "border-dashed border-muted-foreground/50 bg-muted/30"}`}
                  style={{ left: `${xPct}%`, top: `${yPct}%`, width: `${widthPct}%`, aspectRatio: `${SIG_W} / ${SIG_H}` }}
                >
                  {hasSig && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={sigTick} src={sigCanvasRef.current?.toDataURL("image/png")} alt="Signature preview" className="pointer-events-none h-full w-full object-contain" draggable={false} />
                  )}
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="sig-width">Signature size: {widthPct}% of page width</Label>
              <input id="sig-width" type="range" min={10} max={60} value={widthPct} onChange={(e) => setWidthPct(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
            </div>
            <p className="text-xs text-muted-foreground">Drag the box on the preview to position your signature, then sign and download.</p>
            <Button onClick={signAndDownload} disabled={busy || !hasSig} className="w-full">
              {busy ? "Signing…" : "Sign PDF & download"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
