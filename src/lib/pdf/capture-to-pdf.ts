"use client";

/**
 * Exports a live-preview DOM node to a PDF that matches exactly what's on
 * screen, by capturing it as a high-resolution image rather than redrawing
 * the document a second time with hand-placed jsPDF coordinates. Two
 * independently maintained layouts (one in JSX/Tailwind for the preview,
 * one in raw jsPDF draw calls for the PDF) drift apart the moment either
 * one changes — a template gets a new accent color, a field gets added —
 * and there's no build-time or type-level check that catches the drift.
 * Capturing the actual rendered node makes that class of bug impossible.
 *
 * Captured as JPEG rather than PNG: these are opaque, white-background
 * documents with no transparency to preserve, and PNG's lossless encoding
 * of a full-page raster at 2x pixel ratio produces multi-megabyte files for
 * a single simple page. JPEG at quality 0.92 is visually indistinguishable
 * for this content and is roughly an order of magnitude smaller.
 *
 * Pagination: when the content is taller than one A4 page, the image is
 * split across multiple pages. A hard pixel cut can slice a table row (or
 * any other element) in half, so the cut point is snapped to the nearest
 * safe boundary — a `<tr>`, or any element carrying `data-pdf-block` — at
 * or before the page limit, falling back to a hard cut only when no safe
 * boundary exists in range (e.g. a single element taller than a page).
 */

export interface CaptureToPdfOptions {
  /** Filename for the downloaded PDF, including .pdf extension. */
  filename: string;
  /** Device pixel ratio for the capture. Higher = sharper text, larger file. Default 2. */
  pixelRatio?: number;
  backgroundColor?: string;
  /** JPEG quality, 0-1. Default 0.92. */
  quality?: number;
  /** Inline style overrides applied only for the capture — e.g. stripping a card's on-screen border/shadow/radius so it prints as a clean page, without mutating the visible preview. */
  captureStyle?: Partial<CSSStyleDeclaration>;
}

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load captured image"));
    img.src = src;
  });
}

/** Offsets (in captured-image px, relative to `node`'s top) of safe page-break boundaries. */
function safeBreakOffsetsPx(node: HTMLElement, scale: number): number[] {
  const nodeTop = node.getBoundingClientRect().top;
  const candidates = node.querySelectorAll<HTMLElement>("tr, [data-pdf-block]");
  const offsets: number[] = [0];
  candidates.forEach((el) => {
    const rect = el.getBoundingClientRect();
    offsets.push((rect.bottom - nodeTop) * scale);
  });
  return Array.from(new Set(offsets)).sort((a, b) => a - b);
}

export async function exportNodeToPdf(node: HTMLElement, options: CaptureToPdfOptions): Promise<void> {
  const { toJpeg } = await import("html-to-image");
  const { jsPDF } = await import("jspdf");
  const pixelRatio = options.pixelRatio ?? 2;
  const backgroundColor = options.backgroundColor ?? "#ffffff";
  const quality = options.quality ?? 0.92;

  const dataUrl = await toJpeg(node, {
    pixelRatio,
    cacheBust: true,
    backgroundColor,
    quality,
    style: options.captureStyle,
  });
  const img = await loadImage(dataUrl);

  const pxPerMm = img.width / A4_WIDTH_MM;
  const pageHeightPx = A4_HEIGHT_MM * pxPerMm;

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  if (img.height <= pageHeightPx) {
    doc.addImage(dataUrl, "JPEG", 0, 0, A4_WIDTH_MM, img.height / pxPerMm);
    doc.save(options.filename);
    return;
  }

  const breakPoints = safeBreakOffsetsPx(node, pixelRatio);
  let top = 0;
  let pageIndex = 0;
  while (top < img.height) {
    const limit = top + pageHeightPx;
    let cut = Math.min(limit, img.height);
    if (limit < img.height) {
      const safe = [...breakPoints].reverse().find((b) => b > top && b <= limit);
      if (safe) cut = safe;
    }
    const sliceHeightPx = Math.max(1, cut - top);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = sliceHeightPx;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, top, img.width, sliceHeightPx, 0, 0, img.width, sliceHeightPx);

    if (pageIndex > 0) doc.addPage();
    doc.addImage(canvas.toDataURL("image/jpeg", quality), "JPEG", 0, 0, A4_WIDTH_MM, sliceHeightPx / pxPerMm);

    top += sliceHeightPx;
    pageIndex++;
  }

  doc.save(options.filename);
}
