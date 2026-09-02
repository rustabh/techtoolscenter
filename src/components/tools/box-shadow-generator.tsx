"use client";

import { useMemo } from "react";
import { useCopy } from "@/hooks/use-copy";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";

interface ShadowLayer {
  id: string;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

function createLayer(): ShadowLayer {
  return {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    offsetX: 0,
    offsetY: 4,
    blur: 12,
    spread: 0,
    color: "#000000",
    opacity: 25,
    inset: false,
  };
}

function hexToRgba(hex: string, opacityPercent: number): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  const a = opacityPercent / 100;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function layerToCss(layer: ShadowLayer): string {
  const color = hexToRgba(layer.color, layer.opacity);
  return `${layer.inset ? "inset " : ""}${layer.offsetX}px ${layer.offsetY}px ${layer.blur}px ${layer.spread}px ${color}`;
}

const initialLayers: ShadowLayer[] = [createLayer()];

export default function BoxShadowGenerator() {
  const { value: layers, set: setLayers, undo, redo, reset, canUndo, canRedo } = useLocalStorage<ShadowLayer[]>("uh:box-shadow", initialLayers);
  const { copied, copy } = useCopy();

  const updateLayer = (id: string, patch: Partial<ShadowLayer>) => {
    setLayers((prev) => prev.map((layer) => (layer.id === id ? { ...layer, ...patch } : layer)));
  };

  const addLayer = () => {
    setLayers((prev) => [...prev, createLayer()]);
  };

  const removeLayer = (id: string) => {
    setLayers((prev) => (prev.length > 1 ? prev.filter((layer) => layer.id !== id) : prev));
  };

  const boxShadowValue = useMemo(() => layers.map(layerToCss).join(", "), [layers]);
  const full = `box-shadow: ${boxShadowValue};`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Box Shadow</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {layers.map((layer, index) => (
            <div key={layer.id} className="space-y-4 rounded-xl border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Layer {index + 1}</span>
                {layers.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove shadow layer ${index + 1}`}
                    onClick={() => removeLayer(layer.id)}
                  >
                    ×
                  </Button>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`shadow-offset-x-${layer.id}`}>Horizontal Offset: {layer.offsetX}px</Label>
                <input
                  id={`shadow-offset-x-${layer.id}`}
                  type="range"
                  min={-50}
                  max={50}
                  value={layer.offsetX}
                  onChange={(e) => updateLayer(layer.id, { offsetX: Number(e.target.value) })}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`shadow-offset-y-${layer.id}`}>Vertical Offset: {layer.offsetY}px</Label>
                <input
                  id={`shadow-offset-y-${layer.id}`}
                  type="range"
                  min={-50}
                  max={50}
                  value={layer.offsetY}
                  onChange={(e) => updateLayer(layer.id, { offsetY: Number(e.target.value) })}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`shadow-blur-${layer.id}`}>Blur Radius: {layer.blur}px</Label>
                <input
                  id={`shadow-blur-${layer.id}`}
                  type="range"
                  min={0}
                  max={100}
                  value={layer.blur}
                  onChange={(e) => updateLayer(layer.id, { blur: Number(e.target.value) })}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`shadow-spread-${layer.id}`}>Spread Radius: {layer.spread}px</Label>
                <input
                  id={`shadow-spread-${layer.id}`}
                  type="range"
                  min={-50}
                  max={50}
                  value={layer.spread}
                  onChange={(e) => updateLayer(layer.id, { spread: Number(e.target.value) })}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`shadow-color-${layer.id}`}>Color</Label>
                  <input
                    id={`shadow-color-${layer.id}`}
                    type="color"
                    value={layer.color}
                    onChange={(e) => updateLayer(layer.id, { color: e.target.value })}
                    className="h-10 w-full rounded-md border border-border p-1"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`shadow-opacity-${layer.id}`}>Opacity: {layer.opacity}%</Label>
                  <input
                    id={`shadow-opacity-${layer.id}`}
                    type="range"
                    min={0}
                    max={100}
                    value={layer.opacity}
                    onChange={(e) => updateLayer(layer.id, { opacity: Number(e.target.value) })}
                    className="w-full accent-[hsl(var(--primary))]"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant={layer.inset ? "default" : "outline"}
                size="sm"
                onClick={() => updateLayer(layer.id, { inset: !layer.inset })}
                className="w-full"
              >
                {layer.inset ? "Inset" : "Outset"}
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" size="sm" onClick={addLayer} className="w-full">
            Add Shadow Layer
          </Button>
          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex h-56 items-center justify-center rounded-xl bg-[#f1f5f9] p-6">
            <div
              className="h-32 w-32 rounded-2xl bg-white"
              style={{ boxShadow: boxShadowValue }}
            />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-secondary/50 p-3">
            <code className="flex-1 break-all font-mono text-xs">{full}</code>
            <Button type="button" size="sm" onClick={() => copy(full)}>{copied ? "Copied" : "Copy"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
