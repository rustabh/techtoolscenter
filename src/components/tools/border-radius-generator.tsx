"use client";

import { useMemo } from "react";
import { useCopy } from "@/hooks/use-copy";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";

interface RadiusState {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
  linked: boolean;
}
const initial: RadiusState = { topLeft: 24, topRight: 24, bottomRight: 24, bottomLeft: 24, linked: true };

export default function BorderRadiusGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<RadiusState>("uh:border-radius", initial);
  const { topLeft, topRight, bottomRight, bottomLeft, linked } = value;
  const { copied, copy } = useCopy();

  const setLinked = (updater: (v: boolean) => boolean) => set((v) => ({ ...v, linked: updater(v.linked) }));

  const setCorner = (corner: "topLeft" | "topRight" | "bottomRight" | "bottomLeft", val: number) => {
    if (linked) {
      set((v) => ({ ...v, topLeft: val, topRight: val, bottomRight: val, bottomLeft: val }));
    } else {
      set((v) => ({ ...v, [corner]: val }));
    }
  };

  const allEqual = topLeft === topRight && topRight === bottomRight && bottomRight === bottomLeft;

  const borderRadiusValue = useMemo(
    () =>
      linked && allEqual
        ? `${topLeft}px`
        : `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`,
    [linked, allEqual, topLeft, topRight, bottomRight, bottomLeft]
  );

  const full = `border-radius: ${borderRadiusValue};`;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Border Radius</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant={linked ? "default" : "outline"}
            size="sm"
            onClick={() => setLinked((v) => !v)}
            className="w-full"
          >
            {linked ? "Corners Linked" : "Corners Independent"}
          </Button>

          <div className="space-y-1.5">
            <Label htmlFor="radius-top-left">Top Left: {topLeft}px</Label>
            <input
              id="radius-top-left"
              type="range"
              min={0}
              max={100}
              value={topLeft}
              onChange={(e) => setCorner("topLeft", Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="radius-top-right">Top Right: {topRight}px</Label>
            <input
              id="radius-top-right"
              type="range"
              min={0}
              max={100}
              value={topRight}
              onChange={(e) => setCorner("topRight", Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="radius-bottom-right">Bottom Right: {bottomRight}px</Label>
            <input
              id="radius-bottom-right"
              type="range"
              min={0}
              max={100}
              value={bottomRight}
              onChange={(e) => setCorner("bottomRight", Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="radius-bottom-left">Bottom Left: {bottomLeft}px</Label>
            <input
              id="radius-bottom-left"
              type="range"
              min={0}
              max={100}
              value={bottomLeft}
              onChange={(e) => setCorner("bottomLeft", Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex h-56 items-center justify-center rounded-xl bg-secondary/30 p-6">
            <div
              className="h-48 w-48 bg-primary shadow-sm"
              style={{
                borderTopLeftRadius: `${topLeft}px`,
                borderTopRightRadius: `${topRight}px`,
                borderBottomRightRadius: `${bottomRight}px`,
                borderBottomLeftRadius: `${bottomLeft}px`,
              }}
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
