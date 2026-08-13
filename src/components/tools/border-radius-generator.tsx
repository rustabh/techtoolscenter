"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BorderRadiusGenerator() {
  const [topLeft, setTopLeft] = useState(24);
  const [topRight, setTopRight] = useState(24);
  const [bottomRight, setBottomRight] = useState(24);
  const [bottomLeft, setBottomLeft] = useState(24);
  const [linked, setLinked] = useState(true);
  const { copied, copy } = useCopy();

  const setCorner = (setter: (v: number) => void, value: number) => {
    if (linked) {
      setTopLeft(value);
      setTopRight(value);
      setBottomRight(value);
      setBottomLeft(value);
    } else {
      setter(value);
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
              onChange={(e) => setCorner(setTopLeft, Number(e.target.value))}
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
              onChange={(e) => setCorner(setTopRight, Number(e.target.value))}
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
              onChange={(e) => setCorner(setBottomRight, Number(e.target.value))}
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
              onChange={(e) => setCorner(setBottomLeft, Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>
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
