"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function hexToRgba(hex: string, opacityPercent: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  const a = opacityPercent / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function GlassmorphismGenerator() {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [bgOpacity, setBgOpacity] = useState(20);
  const [blur, setBlur] = useState(12);
  const [radius, setRadius] = useState(16);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const { copied, copy } = useCopy();

  const background = useMemo(() => hexToRgba(bgColor, bgOpacity), [bgColor, bgOpacity]);
  const borderColor = useMemo(() => `rgba(255, 255, 255, ${borderOpacity / 100})`, [borderOpacity]);

  const glassStyle: CSSProperties = {
    background,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    borderRadius: `${radius}px`,
    border: `1px solid ${borderColor}`,
    boxShadow: shadowEnabled ? "0 8px 32px 0 rgba(0, 0, 0, 0.2)" : "none",
  };

  const full = useMemo(() => {
    const lines = [
      `background: ${background};`,
      `backdrop-filter: blur(${blur}px);`,
      `-webkit-backdrop-filter: blur(${blur}px);`,
      `border-radius: ${radius}px;`,
      `border: 1px solid ${borderColor};`,
    ];
    if (shadowEnabled) {
      lines.push("box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);");
    }
    return lines.join("\n");
  }, [background, blur, radius, borderColor, shadowEnabled]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Glassmorphism</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="glass-bg-color">Background Color</Label>
            <input
              id="glass-bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-10 w-full rounded-md border border-border p-1"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="glass-bg-opacity">Background Opacity: {bgOpacity}%</Label>
            <input
              id="glass-bg-opacity"
              type="range"
              min={0}
              max={100}
              value={bgOpacity}
              onChange={(e) => setBgOpacity(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="glass-blur">Blur Amount: {blur}px</Label>
            <input
              id="glass-blur"
              type="range"
              min={0}
              max={40}
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="glass-radius">Border Radius: {radius}px</Label>
            <input
              id="glass-radius"
              type="range"
              min={0}
              max={40}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="glass-border-opacity">Border Opacity: {borderOpacity}%</Label>
            <input
              id="glass-border-opacity"
              type="range"
              min={0}
              max={100}
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <Button
            type="button"
            variant={shadowEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setShadowEnabled((v) => !v)}
            className="w-full"
          >
            {shadowEnabled ? "Shadow On" : "Shadow Off"}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div
          className="flex h-56 items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, #6366f1 0%, #ec4899 35%, #22d3ee 70%, #f59e0b 100%)",
          }}
        >
          <div className="h-40 w-64" style={glassStyle} />
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-secondary/50 p-3">
          <pre className="flex-1 whitespace-pre-wrap break-all font-mono text-xs">{full}</pre>
          <Button type="button" size="sm" onClick={() => copy(full)}>{copied ? "Copied" : "Copy"}</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          The -webkit-backdrop-filter line is included for Safari support.
        </p>
      </div>
    </div>
  );
}
