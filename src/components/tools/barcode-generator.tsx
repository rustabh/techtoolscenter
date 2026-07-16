"use client";

import { useEffect, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

interface BarState {
  value: string;
  format: string;
  width: number;
  height: number;
}
const initial: BarState = { value: "UTILITYHUB123", format: "CODE128", width: 2, height: 100 };
const formats = ["CODE128", "CODE39", "EAN13", "EAN8", "UPC", "ITF14", "MSI", "pharmacode"];

export default function BarcodeGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<BarState>("uh:barcode", initial);
  const svgRef = useRef<SVGSVGElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!svgRef.current) return;
    try {
      JsBarcode(svgRef.current, value.value || " ", {
        format: value.format,
        width: value.width,
        height: value.height,
        displayValue: true,
        margin: 12,
        background: "#ffffff",
      });
      setError("");
    } catch {
      setError(`"${value.value}" is not valid for ${value.format}.`);
    }
  }, [value]);

  const downloadPng = () => {
    const svg = svgRef.current;
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width || 300;
      canvas.height = img.height || 150;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((b) => b && downloadBlob(b, "barcode.png"));
    };
    img.src = url;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="bc-value">Value</Label>
            <Input id="bc-value" value={value.value} onChange={(e) => set({ ...value, value: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bc-format">Format</Label>
            <Select id="bc-format" value={value.format} onChange={(e) => set({ ...value, format: e.target.value })}>
              {formats.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bc-width">Bar width: {value.width}</Label>
              <input id="bc-width" type="range" min={1} max={4} step={0.5} value={value.width}
                onChange={(e) => set({ ...value, width: Number(e.target.value) })} className="w-full accent-[hsl(var(--primary))]" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-height">Height: {value.height}</Label>
              <input id="bc-height" type="range" min={40} max={200} step={10} value={value.height}
                onChange={(e) => set({ ...value, height: Number(e.target.value) })} className="w-full accent-[hsl(var(--primary))]" />
            </div>
          </div>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="w-full overflow-x-auto rounded-2xl border border-border bg-white p-4">
            <svg ref={svgRef} aria-label="Generated barcode" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button onClick={downloadPng} disabled={!!error}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            Download PNG
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
