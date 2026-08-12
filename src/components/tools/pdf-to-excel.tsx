"use client";

import { useState } from "react";
import { FileSpreadsheet, Loader2, Download, Info, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { buildXlsx } from "@/lib/xlsx-writer";
import { FileDropzone } from "@/components/tools/file-dropzone";

type PageRows = { page: number; rows: string[][] };

/** A gap between two text items wider than this (relative to their font size)
 *  is treated as a column break rather than a normal inter-word space. */
function isColumnBreak(gap: number, itemHeight: number): boolean {
  return gap > Math.max(itemHeight * 0.6, 8);
}

type RawCell = { text: string; x: number };

/** Merges same-line text items into cells (a wide end-to-start gap starts a new cell). */
function mergeLineIntoCells(line: { str: string; x: number; width: number; height: number }[]): RawCell[] {
  const cells: RawCell[] = [];
  let current = "";
  let startX = 0;
  let prevEnd = -Infinity;
  for (const it of line) {
    const gap = it.x - prevEnd;
    if (current && isColumnBreak(gap, it.height)) {
      cells.push({ text: current.trim(), x: startX });
      current = it.str;
      startX = it.x;
    } else {
      if (!current) startX = it.x;
      current = current ? `${current}${gap > 1 ? " " : ""}${it.str}` : it.str;
    }
    prevEnd = it.x + it.width;
  }
  if (current) cells.push({ text: current.trim(), x: startX });
  return cells;
}

/**
 * Left-to-right packing misaligns columns the moment a row has an empty cell
 * (e.g. a bank statement row with nothing in "Debit" shifts "Balance" left) —
 * so instead of placing cells by position-in-row, every row's cells snap to a
 * shared set of column anchors clustered from all cell start-x positions on
 * the page. Empty cells then correctly stay empty instead of shifting later
 * values into the wrong column.
 */
function alignColumns(lineCells: RawCell[][]): string[][] {
  const allX = lineCells.flat().map((c) => c.x).sort((a, b) => a - b);
  if (allX.length === 0) return lineCells.map(() => []);
  const gapThreshold = 15;
  const anchors: number[] = [];
  for (const x of allX) {
    if (anchors.length === 0 || x - anchors[anchors.length - 1] > gapThreshold) anchors.push(x);
  }
  const nearestAnchor = (x: number) => {
    let best = 0;
    let bestDist = Infinity;
    anchors.forEach((a, i) => {
      const d = Math.abs(x - a);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    return best;
  };
  return lineCells.map((cells) => {
    const row = new Array(anchors.length).fill("");
    for (const c of cells) {
      const idx = nearestAnchor(c.x);
      row[idx] = row[idx] ? `${row[idx]} ${c.text}` : c.text;
    }
    return row;
  });
}

/** Thrown when a PDF needs a password — distinct from a generic read failure so the UI can prompt instead of just erroring out. */
export class PdfPasswordError extends Error {
  incorrect: boolean;
  constructor(incorrect: boolean) {
    super(incorrect ? "Incorrect password" : "Password required");
    this.incorrect = incorrect;
  }
}

async function extractTables(file: File, password: string | undefined, onProgress: (msg: string) => void): Promise<PageRows[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

  const data = new Uint8Array(await file.arrayBuffer());
  let doc;
  try {
    doc = await pdfjs.getDocument({ data, password }).promise;
  } catch (e) {
    if (e instanceof Error && e.name === "PasswordException") {
      const code = (e as Error & { code?: number }).code;
      throw new PdfPasswordError(code === 2); // pdfjs.PasswordResponses.INCORRECT_PASSWORD === 2
    }
    throw e;
  }
  const pages: PageRows[] = [];

  for (let n = 1; n <= doc.numPages; n++) {
    onProgress(`Reading page ${n} of ${doc.numPages}…`);
    const page = await doc.getPage(n);
    const content = await page.getTextContent();

    type Item = { str: string; x: number; y: number; width: number; height: number };
    const items: Item[] = content.items
      .map((it) => {
        const raw = it as { str?: string; transform: number[]; width: number; height: number };
        return { str: raw.str ?? "", x: raw.transform[4], y: raw.transform[5], width: raw.width, height: raw.height || 10 };
      })
      .filter((it) => it.str.trim() !== "");

    // Group into lines: items whose baseline y is within a small tolerance share a row.
    items.sort((a, b) => b.y - a.y || a.x - b.x);
    const lines: Item[][] = [];
    for (const it of items) {
      const last = lines[lines.length - 1];
      if (last && Math.abs(last[0].y - it.y) < 3) last.push(it);
      else lines.push([it]);
    }
    lines.forEach((line) => line.sort((a, b) => a.x - b.x));

    // Stage 1: merge same-line items into cells. Stage 2: snap every row's
    // cells to shared column anchors so empty cells don't shift later values.
    const lineCells = lines.map(mergeLineIntoCells);
    const rows = alignColumns(lineCells);

    pages.push({ page: n, rows: rows.filter((r) => r.some((c) => c !== "")) });
  }

  return pages;
}

function csvEscape(v: string): string {
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

export default function PdfToExcel() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageRows[]>([]);
  const [activePage, setActivePage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const baseName = (name: string) => name.replace(/\.pdf$/i, "") || "document";

  const onFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setNotice("Only PDF files are supported.");
      return;
    }
    setNotice(null);
    setFile(f);
    setPages([]);
    setActivePage(0);
    setNeedsPassword(false);
    setPassword("");
    setPasswordError(null);
  };

  const runConvert = async (pw: string | undefined) => {
    if (!file) return;
    setBusy(true);
    setPages([]);
    setNotice(null);
    try {
      const result = await extractTables(file, pw, setProgress);
      setNeedsPassword(false);
      setPasswordError(null);
      const nonEmpty = result.filter((p) => p.rows.length > 0);
      setPages(result);
      setActivePage(0);
      if (nonEmpty.length === 0) {
        setNotice("No extractable text found — this PDF is likely a scanned image, which needs OCR (not supported client-side yet).");
      } else {
        showToast(`Extracted ${nonEmpty.reduce((n, p) => n + p.rows.length, 0)} rows across ${nonEmpty.length} page(s)`);
      }
    } catch (e) {
      if (e instanceof PdfPasswordError) {
        setNeedsPassword(true);
        setPasswordError(e.incorrect ? "Incorrect password — try again." : null);
      } else {
        showToast("Couldn't read this PDF — it may be corrupted", "error");
      }
    } finally {
      setBusy(false);
      setProgress("");
    }
  };

  const convert = () => runConvert(undefined);
  const unlockAndConvert = () => runConvert(password);

  const downloadXlsx = async () => {
    if (!file || pages.length === 0) return;
    try {
      const blob = await buildXlsx(pages.map((p) => ({ name: `Page ${p.page}`, rows: p.rows })));
      downloadBlob(blob, `${baseName(file.name)}.xlsx`);
      showToast("Downloaded .xlsx");
    } catch {
      showToast("Couldn't build the Excel file — try again", "error");
    }
  };

  const downloadCsv = () => {
    const current = pages[activePage];
    if (!file || !current) return;
    const csv = current.rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadBlob(new Blob([csv], { type: "text/csv" }), `${baseName(file.name)}-page-${current.page}.csv`);
    showToast("Downloaded .csv");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FileDropzone
            icon={FileSpreadsheet}
            title={file ? file.name : "Upload a PDF to convert to Excel"}
            subtitle="Bank statements, invoices and simple tables work best"
            accept="application/pdf"
            onFiles={(files) => files[0] && onFile(files[0])}
          />
          <p className="mt-3 text-center text-xs text-muted-foreground">Processed entirely in your browser — files are never uploaded</p>
          {notice && <p className="mt-2 text-center text-xs text-destructive">{notice}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-start gap-3 pt-6 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p>
            Works by reading the PDF&apos;s text layer and detecting columns from spacing — best for PDFs with clear,
            consistent columns (bank statements, invoices, structured reports). It can&apos;t read scanned/image-only
            PDFs (that needs OCR, not supported client-side yet), and very irregular layouts may not align perfectly.
            Always check the preview before relying on the output.
          </p>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            {needsPassword ? (
              <div className="space-y-2 rounded-xl border border-border p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="size-4 text-primary" /> This PDF is password-protected
                </p>
                <div className="flex flex-wrap gap-2">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !busy && password && unlockAndConvert()}
                    placeholder="Enter the PDF's password"
                    className="flex-1"
                    aria-label="PDF password"
                    autoFocus
                  />
                  <Button onClick={unlockAndConvert} disabled={busy || !password}>
                    {busy ? <><Loader2 className="size-4 animate-spin" /> {progress || "Unlocking…"}</> : "Unlock & Convert"}
                  </Button>
                </div>
                {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
                <p className="text-xs text-muted-foreground">
                  Checked entirely in your browser — the password and file are never sent anywhere. Bank statement
                  PDFs are often password-protected with a PAN, account number or date of birth — check the email or
                  message that sent you the file for the exact format.
                </p>
              </div>
            ) : (
              <Button onClick={convert} disabled={busy} className="w-full">
                {busy ? <><Loader2 className="size-4 animate-spin" /> {progress || "Converting…"}</> : "Convert to Excel"}
              </Button>
            )}

            {pages.length > 0 && (
              <>
                {pages.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {pages.map((p, i) => (
                      <Button
                        key={p.page}
                        size="sm"
                        variant={activePage === i ? "default" : "outline"}
                        onClick={() => setActivePage(i)}
                      >
                        Page {p.page} {p.rows.length === 0 && "(empty)"}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="overflow-auto rounded-xl border border-border" style={{ maxHeight: 360 }}>
                  {pages[activePage]?.rows.length ? (
                    <table className="w-full text-left text-xs">
                      <tbody>
                        {pages[activePage].rows.map((row, ri) => (
                          <tr key={ri} className="border-b border-border/60 last:border-0">
                            {row.map((cell, ci) => (
                              <td key={ci} className="whitespace-nowrap px-3 py-1.5">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p-6 text-center text-sm text-muted-foreground">No rows detected on this page.</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={downloadXlsx} disabled={pages.every((p) => p.rows.length === 0)}>
                    <Download className="size-4" /> Download .xlsx (all pages)
                  </Button>
                  <Button variant="outline" onClick={downloadCsv} disabled={!pages[activePage]?.rows.length}>
                    <Download className="size-4" /> Download this page as .csv
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
