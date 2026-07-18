"use client";

import { useRef, useState } from "react";
import { UploadCloud, Download, ArrowUp, ArrowDown, X, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import PdfCompress from "./pdf-compress";

type Tab = "merge" | "split" | "compress" | "rotate" | "organize" | "watermark" | "numbers" | "headerfooter" | "sign" | "img2pdf" | "batch" | "advanced";
const TABS: { id: Tab; label: string }[] = [
  { id: "merge", label: "Merge" }, { id: "split", label: "Split" }, { id: "compress", label: "Compress" },
  { id: "rotate", label: "Rotate" }, { id: "organize", label: "Delete Pages" }, { id: "watermark", label: "Watermark" },
  { id: "numbers", label: "Page Numbers" }, { id: "headerfooter", label: "Header / Footer" }, { id: "sign", label: "Sign" },
  { id: "img2pdf", label: "Images → PDF" }, { id: "batch", label: "Batch" }, { id: "advanced", label: "OCR / Protect" },
];

async function loadPdf(file: File) {
  const { PDFDocument } = await import("pdf-lib");
  return PDFDocument.load(await file.arrayBuffer());
}
function parseRange(input: string, max: number): number[] {
  const set = new Set<number>();
  for (const part of input.split(",")) {
    const t = part.trim(); if (!t) continue;
    if (t.includes("-")) { const [a, b] = t.split("-").map((n) => parseInt(n, 10)); for (let i = a; i <= b; i++) if (i >= 1 && i <= max) set.add(i); }
    else { const n = parseInt(t, 10); if (n >= 1 && n <= max) set.add(n); }
  }
  return [...set].sort((a, b) => a - b);
}

export default function PdfStudio() {
  const [tab, setTab] = useState<Tab>("merge");
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Button key={t.id} size="sm" variant={tab === t.id ? "default" : "outline"} onClick={() => setTab(t.id)}>{t.label}</Button>
        ))}
      </div>
      {tab === "merge" && <MergeTab />}
      {tab === "split" && <SingleFileTab title="Split — extract pages"
        action={async (file, opts) => {
          const src = await loadPdf(file); const { PDFDocument } = await import("pdf-lib");
          const pages = parseRange(opts.range, src.getPageCount());
          if (!pages.length) throw new Error("No valid pages selected.");
          const out = await PDFDocument.create();
          (await out.copyPages(src, pages.map((p) => p - 1))).forEach((p) => out.addPage(p));
          return out.save();
        }} fields={[{ key: "range", label: "Pages (e.g. 1-3, 5)", def: "1-1" }]} name="split.pdf" />}
      {tab === "compress" && <PdfCompress />}
      {tab === "rotate" && <SingleFileTab title="Rotate pages" action={async (file, opts) => {
        const { degrees } = await import("pdf-lib"); const doc = await loadPdf(file);
        const deg = parseInt(opts.deg, 10);
        doc.getPages().forEach((p) => p.setRotation(degrees((p.getRotation().angle + deg) % 360)));
        return doc.save();
      }} fields={[{ key: "deg", label: "Rotate by", def: "90", options: ["90", "180", "270"] }]} name="rotated.pdf" />}
      {tab === "organize" && <SingleFileTab title="Delete pages" action={async (file, opts) => {
        const src = await loadPdf(file); const { PDFDocument } = await import("pdf-lib");
        const total = src.getPageCount(); const remove = new Set(parseRange(opts.range, total));
        const keep = Array.from({ length: total }, (_, i) => i + 1).filter((p) => !remove.has(p));
        if (!keep.length) throw new Error("Cannot delete all pages.");
        const out = await PDFDocument.create();
        (await out.copyPages(src, keep.map((p) => p - 1))).forEach((p) => out.addPage(p));
        return out.save();
      }} fields={[{ key: "range", label: "Pages to delete (e.g. 2, 4-5)", def: "1" }]} name="edited.pdf" />}
      {tab === "watermark" && <SingleFileTab title="Add watermark" action={async (file, opts) => {
        const { rgb, degrees, StandardFonts } = await import("pdf-lib"); const doc = await loadPdf(file);
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        doc.getPages().forEach((p) => {
          const { width, height } = p.getSize();
          p.drawText(opts.text || "DRAFT", { x: width / 2 - 120, y: height / 2, size: 50, font, color: rgb(0.6, 0.6, 0.6), opacity: 0.25, rotate: degrees(45) });
        });
        return doc.save();
      }} fields={[{ key: "text", label: "Watermark text", def: "CONFIDENTIAL" }]} name="watermarked.pdf" />}
      {tab === "numbers" && <SingleFileTab title="Add page numbers" action={async (file) => {
        const { rgb, StandardFonts } = await import("pdf-lib"); const doc = await loadPdf(file);
        const font = await doc.embedFont(StandardFonts.Helvetica); const pages = doc.getPages();
        pages.forEach((p, i) => { const { width } = p.getSize(); p.drawText(`${i + 1} / ${pages.length}`, { x: width / 2 - 12, y: 18, size: 10, font, color: rgb(0.3, 0.3, 0.3) }); });
        return doc.save();
      }} fields={[]} name="numbered.pdf" />}
      {tab === "headerfooter" && <SingleFileTab title="Header & footer" action={async (file, opts) => {
        const { rgb, StandardFonts } = await import("pdf-lib"); const doc = await loadPdf(file);
        const font = await doc.embedFont(StandardFonts.Helvetica);
        doc.getPages().forEach((p) => { const { width, height } = p.getSize();
          if (opts.header) p.drawText(opts.header, { x: 40, y: height - 28, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
          if (opts.footer) p.drawText(opts.footer, { x: 40, y: 20, size: 10, font, color: rgb(0.3, 0.3, 0.3) });
          void width;
        });
        return doc.save();
      }} fields={[{ key: "header", label: "Header text", def: "TechToolsCenter" }, { key: "footer", label: "Footer text", def: "Confidential" }]} name="header-footer.pdf" />}
      {tab === "sign" && <SignTab />}
      {tab === "img2pdf" && <ImagesToPdfTab />}
      {tab === "batch" && <BatchTab />}
      {tab === "advanced" && (
        <Card><CardContent className="space-y-3 pt-6">
          <p className="flex items-center gap-2 font-medium"><Info className="size-4 text-primary" /> OCR, password protect / unlock, and text/image extraction</p>
          <p className="text-sm text-muted-foreground">
            These operations need heavy or server-side processing that can&apos;t run reliably free and client-side:
            OCR requires a large recognition engine, and PDF password encryption/decryption isn&apos;t supported by the
            in-browser PDF engine. Everything else in PDF Studio runs 100% locally. We&apos;ll add these as they become
            feasible without uploading your files.
          </p>
        </CardContent></Card>
      )}
    </div>
  );
}

function Dropzone({ onFiles, multiple, accept = "application/pdf", label }: { onFiles: (f: File[]) => void; multiple?: boolean; accept?: string; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden" onChange={(e) => onFiles(Array.from(e.target.files || []))} />
      <button onClick={() => ref.current?.click()} className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40">
        <UploadCloud className="size-7 text-primary" /><span className="font-medium">{label}</span>
      </button>
    </>
  );
}

interface Field { key: string; label: string; def: string; options?: string[] }
function SingleFileTab({ title, action, fields, name, showSize }: {
  title: string; action: (file: File, opts: Record<string, string>) => Promise<Uint8Array>; fields: Field[]; name: string; showSize?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [opts, setOpts] = useState<Record<string, string>>(Object.fromEntries(fields.map((f) => [f.key, f.def])));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [outSize, setOutSize] = useState(0);

  const run = async () => {
    if (!file) return;
    setBusy(true); setErr("");
    try {
      const bytes = await action(file, opts);
      setOutSize(bytes.length);
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), name);
    } catch (e) { setErr((e as Error).message || "Failed to process PDF."); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-4">
      <Card><CardContent className="pt-6">
        {file ? <p className="text-sm">{file.name} <button className="ml-2 text-muted-foreground hover:text-destructive" onClick={() => setFile(null)}>✕</button></p>
          : <Dropzone onFiles={(f) => setFile(f[0])} label="Upload a PDF" />}
      </CardContent></Card>
      {file && (
        <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5"><Label>{f.label}</Label>
              {f.options
                ? <Select value={opts[f.key]} onChange={(e) => setOpts((o) => ({ ...o, [f.key]: e.target.value }))}>{f.options.map((o) => <option key={o} value={o}>{o}°</option>)}</Select>
                : <Input value={opts[f.key]} onChange={(e) => setOpts((o) => ({ ...o, [f.key]: e.target.value }))} />}
            </div>
          ))}
          {err && <p className="text-sm text-destructive">{err}</p>}
          <Button onClick={run} disabled={busy}><Download /> {busy ? "Processing…" : "Process & download"}</Button>
          {showSize && outSize > 0 && <p className="text-xs text-muted-foreground">Original: {(file.size / 1024).toFixed(0)} KB · New: {(outSize / 1024).toFixed(0)} KB</p>}
        </CardContent></Card>
      )}
    </div>
  );
}

function MergeTab() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const move = (i: number, d: -1 | 1) => setFiles((f) => { const n = [...f]; const j = i + d; if (j < 0 || j >= n.length) return f; [n[i], n[j]] = [n[j], n[i]]; return n; });
  const merge = async () => {
    if (files.length < 2) return; setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib"); const out = await PDFDocument.create();
      for (const f of files) { const doc = await PDFDocument.load(await f.arrayBuffer()); (await out.copyPages(doc, doc.getPageIndices())).forEach((p) => out.addPage(p)); }
      downloadBlob(new Blob([await out.save()], { type: "application/pdf" }), "merged.pdf");
    } finally { setBusy(false); }
  };
  return (
    <div className="space-y-4">
      <Card><CardContent className="pt-6"><Dropzone multiple onFiles={(f) => setFiles((p) => [...p, ...f])} label="Add PDF files to merge" /></CardContent></Card>
      {files.length > 0 && (
        <Card><CardContent className="space-y-2 pt-6">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border border-border p-2.5">
              <span className="grid size-7 place-items-center rounded-lg bg-accent text-xs font-semibold text-accent-foreground">{i + 1}</span>
              <span className="flex-1 truncate text-sm">{f.name}</span>
              <Button variant="ghost" size="icon" onClick={() => move(i, -1)} aria-label="Up"><ArrowUp className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => move(i, 1)} aria-label="Down"><ArrowDown className="size-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => setFiles((p) => p.filter((_, x) => x !== i))} aria-label="Remove"><X className="size-4" /></Button>
            </div>
          ))}
          <Button onClick={merge} disabled={files.length < 2 || busy}><Download /> {busy ? "Merging…" : `Merge ${files.length} PDFs`}</Button>
        </CardContent></Card>
      )}
    </div>
  );
}

function SignTab() {
  const [file, setFile] = useState<File | null>(null);
  const [sig, setSig] = useState<string | null>(null);
  const [page, setPage] = useState("1");
  const [busy, setBusy] = useState(false);
  const sigRef = useRef<HTMLInputElement>(null);
  const run = async () => {
    if (!file || !sig) return; setBusy(true);
    try {
      const doc = await loadPdf(file);
      const png = await doc.embedPng(sig).catch(() => doc.embedJpg(sig));
      const pages = doc.getPages(); const p = pages[Math.min(pages.length - 1, Math.max(0, parseInt(page) - 1))];
      const { width } = p.getSize(); const w = 120, h = (png.height / png.width) * w;
      p.drawImage(png, { x: width - w - 40, y: 40, width: w, height: h });
      downloadBlob(new Blob([await doc.save()], { type: "application/pdf" }), "signed.pdf");
    } finally { setBusy(false); }
  };
  return (
    <div className="space-y-4">
      <Card><CardContent className="pt-6">{file ? <p className="text-sm">{file.name}</p> : <Dropzone onFiles={(f) => setFile(f[0])} label="Upload a PDF to sign" />}</CardContent></Card>
      {file && (
        <Card><CardHeader><CardTitle>Add signature</CardTitle></CardHeader><CardContent className="space-y-4">
          <input ref={sigRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = () => setSig(r.result as string); r.readAsDataURL(f); } }} />
          <Button variant="outline" onClick={() => sigRef.current?.click()}><UploadCloud /> {sig ? "Signature ✓" : "Upload signature image"}</Button>
          <div className="space-y-1.5"><Label>Place on page</Label><Input type="number" value={page} onChange={(e) => setPage(e.target.value)} /></div>
          <Button onClick={run} disabled={!sig || busy}><Download /> {busy ? "Signing…" : "Sign & download"}</Button>
          <p className="text-xs text-muted-foreground">Stamps your signature image bottom-right. For legally binding e-signatures use a certified provider.</p>
        </CardContent></Card>
      )}
    </div>
  );
}

function ImagesToPdfTab() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const run = async () => {
    if (!files.length) return; setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib"); const doc = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const img = f.type.includes("png") ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      downloadBlob(new Blob([await doc.save()], { type: "application/pdf" }), "images.pdf");
    } finally { setBusy(false); }
  };
  return (
    <div className="space-y-4">
      <Card><CardContent className="pt-6"><Dropzone accept="image/png,image/jpeg" multiple onFiles={(f) => setFiles((p) => [...p, ...f])} label="Add JPG / PNG images" /></CardContent></Card>
      {files.length > 0 && <Card><CardContent className="space-y-3 pt-6"><p className="text-sm text-muted-foreground">{files.length} image(s)</p><Button onClick={run} disabled={busy}><Download /> {busy ? "Building…" : "Create PDF"}</Button></CardContent></Card>}
    </div>
  );
}

function BatchTab() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const run = async () => {
    if (!files.length) return; setBusy(true);
    try {
      const { PDFDocument } = await import("pdf-lib"); const JSZip = (await import("jszip")).default; const zip = new JSZip();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer()); const out = await PDFDocument.create();
        (await out.copyPages(src, src.getPageIndices())).forEach((p) => out.addPage(p));
        zip.file(`compressed-${f.name}`, await out.save({ useObjectStreams: true }));
      }
      downloadBlob(await zip.generateAsync({ type: "blob" }), "batch-pdfs.zip");
    } finally { setBusy(false); }
  };
  return (
    <div className="space-y-4">
      <Card><CardContent className="pt-6"><Dropzone multiple onFiles={(f) => setFiles((p) => [...p, ...f])} label="Add PDFs to batch-compress" /></CardContent></Card>
      {files.length > 0 && <Card><CardContent className="space-y-3 pt-6"><p className="text-sm text-muted-foreground">{files.length} PDF(s)</p><Button onClick={run} disabled={busy}><Download /> {busy ? "Processing…" : "Compress all → ZIP"}</Button></CardContent></Card>}
    </div>
  );
}
