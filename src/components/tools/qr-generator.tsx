"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

interface QrState {
  text: string;
  fg: string;
  bg: string;
  size: number;
}
const initial: QrState = { text: "https://utilityhub.app", fg: "#0b0b0f", bg: "#ffffff", size: 320 };

export default function QrGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<QrState>("uh:qr", initial);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!canvasRef.current || !value.text) return;
    QRCode.toCanvas(
      canvasRef.current,
      value.text,
      { width: value.size, margin: 2, color: { dark: value.fg, light: value.bg }, errorCorrectionLevel: "M" },
      (err) => setError(err ? "Text too long for a QR code." : "")
    );
  }, [value]);

  const downloadPng = () => {
    canvasRef.current?.toBlob((blob) => {
      if (blob) downloadBlob(blob, "qr-code.png");
    });
  };

  const downloadSvg = async () => {
    const svg = await QRCode.toString(value.text, {
      type: "svg",
      margin: 2,
      color: { dark: value.fg, light: value.bg },
    });
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "qr-code.svg");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Content</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="qr-text">Text or URL</Label>
            <Textarea id="qr-text" value={value.text} onChange={(e) => set({ ...value, text: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="qr-fg">Foreground</Label>
              <Input id="qr-fg" type="color" value={value.fg} onChange={(e) => set({ ...value, fg: e.target.value })} className="h-10 p-1" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-bg">Background</Label>
              <Input id="qr-bg" type="color" value={value.bg} onChange={(e) => set({ ...value, bg: e.target.value })} className="h-10 p-1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="qr-size">Size: {value.size}px</Label>
            <input
              id="qr-size"
              type="range"
              min={128}
              max={640}
              step={16}
              value={value.size}
              onChange={(e) => set({ ...value, size: Number(e.target.value) })}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="rounded-2xl border border-border bg-white p-4">
            <canvas ref={canvasRef} className="max-w-full" aria-label="Generated QR code" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <button onClick={downloadPng} className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Download PNG
            </button>
            <button onClick={downloadSvg} className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary">
              Download SVG
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
