"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

const SAMPLE = `# Project Notes

## Overview
This is a **Markdown to PDF** converter. It runs entirely in your browser — nothing is uploaded.

## Features
- Headings, up to three levels
- Bullet and numbered lists
- Code blocks
- Simple, clean typography

## Example code
\`\`\`
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

1. Write your notes in Markdown
2. Paste them here
3. Download a clean PDF
`;

type Block =
  | { type: "h1" | "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; text: string; index?: number }
  | { type: "code"; lines: string[] }
  | { type: "hr" }
  | { type: "blank" };

function stripInline(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`(.+?)`/g, "$1");
}

function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let olIndex = 1;

  for (const raw of lines) {
    if (raw.trim().startsWith("```")) {
      if (inCode) {
        blocks.push({ type: "code", lines: codeLines });
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) { codeLines.push(raw); continue; }

    const line = raw.trimEnd();
    if (!line.trim()) { blocks.push({ type: "blank" }); olIndex = 1; continue; }
    if (/^---+$/.test(line.trim())) { blocks.push({ type: "hr" }); continue; }
    if (line.startsWith("### ")) { blocks.push({ type: "h3", text: stripInline(line.slice(4)) }); continue; }
    if (line.startsWith("## ")) { blocks.push({ type: "h2", text: stripInline(line.slice(3)) }); continue; }
    if (line.startsWith("# ")) { blocks.push({ type: "h1", text: stripInline(line.slice(2)) }); continue; }
    if (/^[-*]\s+/.test(line)) { blocks.push({ type: "ul", text: stripInline(line.replace(/^[-*]\s+/, "")) }); continue; }
    const olMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) { blocks.push({ type: "ol", text: stripInline(olMatch[2]), index: olIndex++ }); continue; }
    blocks.push({ type: "p", text: stripInline(line) });
  }
  if (codeLines.length) blocks.push({ type: "code", lines: codeLines });
  return blocks;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  if (!text) return [""];
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function MarkdownToPdf() {
  const [markdown, setMarkdown] = useState(SAMPLE);
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (!markdown.trim()) return;
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const bold = await doc.embedFont(StandardFonts.HelveticaBold);
      const mono = await doc.embedFont(StandardFonts.Courier);

      const margin = 56;
      const pageWidth = 595, pageHeight = 842; // A4
      const maxWidth = pageWidth - margin * 2;

      let page: PDFPage = doc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      const newPage = () => {
        page = doc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      };
      const ensureSpace = (needed: number) => {
        if (y - needed < margin) newPage();
      };
      const drawLine = (text: string, size: number, f: PDFFont, indent = 0, color = rgb(0.1, 0.1, 0.1)) => {
        const lineHeight = size * 1.4;
        ensureSpace(lineHeight);
        page.drawText(text, { x: margin + indent, y, size, font: f, color });
        y -= lineHeight;
      };

      const blocks = parseMarkdown(markdown);
      for (const block of blocks) {
        if (block.type === "blank") { y -= 6; continue; }
        if (block.type === "hr") {
          ensureSpace(16);
          page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
          y -= 16;
          continue;
        }
        if (block.type === "h1" || block.type === "h2" || block.type === "h3") {
          const size = block.type === "h1" ? 22 : block.type === "h2" ? 17 : 14;
          y -= size * 0.3;
          for (const line of wrapText(block.text, bold, size, maxWidth)) drawLine(line, size, bold);
          y -= 4;
          continue;
        }
        if (block.type === "code") {
          const size = 10;
          const lineHeight = size * 1.4;
          // Draw per-page-fitting chunks so the background box (a) is drawn
          // before the text, not on top of it, and (b) is sized against the
          // lines that actually land on that page — a box spanning a
          // mid-block page break would otherwise use a stale top/bottom pair
          // from two different pages.
          let i = 0;
          while (i < block.lines.length) {
            if (y - lineHeight < margin) { newPage(); continue; }
            const fit = Math.min(Math.floor((y - margin) / lineHeight), block.lines.length - i);
            const boxTop = y;
            const boxBottom = y - fit * lineHeight;
            page.drawRectangle({ x: margin - 8, y: boxBottom - 4, width: maxWidth + 16, height: boxTop - boxBottom + 12, color: rgb(0.95, 0.95, 0.96), opacity: 0.6, borderColor: rgb(0.85, 0.85, 0.87), borderWidth: 1 });
            for (let j = 0; j < fit; j++) {
              page.drawText(block.lines[i + j] || " ", { x: margin + 12, y, size, font: mono, color: rgb(0.2, 0.2, 0.25) });
              y -= lineHeight;
            }
            i += fit;
          }
          continue;
        }
        if (block.type === "ul") {
          for (const line of wrapText(`•  ${block.text}`, font, 11, maxWidth - 14)) drawLine(line, 11, font, 14);
          continue;
        }
        if (block.type === "ol") {
          const prefix = `${block.index}.  `;
          const wrapped = wrapText(`${prefix}${block.text}`, font, 11, maxWidth - 14);
          for (const line of wrapped) drawLine(line, 11, font, 14);
          continue;
        }
        for (const line of wrapText(block.text, font, 11, maxWidth)) drawLine(line, 11, font);
      }

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes], { type: "application/pdf" }), "document.pdf");
      showToast("Downloaded document.pdf");
    } catch {
      showToast("Couldn't generate the PDF — try again", "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea
            aria-label="Markdown input"
            className="min-h-[420px] font-mono text-xs"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Title&#10;&#10;Write your Markdown here…"
          />
          <Button onClick={generate} disabled={busy || !markdown.trim()}>
            <FileText /> {busy ? "Generating…" : "Generate PDF"}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-3 pt-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Supported Markdown</p>
          <ul className="list-inside list-disc space-y-1">
            <li># / ## / ### headings</li>
            <li>- or * bullet lists</li>
            <li>1. numbered lists</li>
            <li>```code blocks```</li>
            <li>--- horizontal rules</li>
            <li>**bold** / *italic* / `code` (rendered as plain emphasis-free text)</li>
          </ul>
          <p className="flex items-center gap-2 pt-2"><Download className="size-4" /> Exports a clean, paginated A4 PDF — runs entirely in your browser.</p>
        </CardContent>
      </Card>
    </div>
  );
}
