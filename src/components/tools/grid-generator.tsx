"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type JustifyItems = "start" | "center" | "end" | "stretch";
type AlignItems = "start" | "center" | "end" | "stretch";

const ITEM_OPTIONS: JustifyItems[] = ["start", "center", "end", "stretch"];

export default function GridGenerator() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(12);
  const [justifyItems, setJustifyItems] = useState<JustifyItems>("stretch");
  const [alignItems, setAlignItems] = useState<AlignItems>("stretch");
  const { copied, copy } = useCopy();

  const previewStyle = useMemo(
    () => ({
      display: "grid" as const,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: `${gap}px`,
      justifyItems,
      alignItems,
    }),
    [columns, rows, gap, justifyItems, alignItems]
  );

  const cellCount = useMemo(() => Math.min(columns * rows, 24), [columns, rows]);
  const cells = useMemo(() => Array.from({ length: cellCount }, (_, i) => i + 1), [cellCount]);

  const css = useMemo(
    () =>
      `display: grid;\ngrid-template-columns: repeat(${columns}, 1fr);\ngrid-template-rows: repeat(${rows}, 1fr);\ngap: ${gap}px;\njustify-items: ${justifyItems};\nalign-items: ${alignItems};`,
    [columns, rows, gap, justifyItems, alignItems]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Grid Container</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="grid-columns-range">Columns: {columns}</Label>
            <input
              id="grid-columns-range"
              type="range"
              min={1}
              max={12}
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="grid-rows-range">Rows: {rows}</Label>
            <input
              id="grid-rows-range"
              type="range"
              min={1}
              max={6}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="grid-gap-range">Gap: {gap}px</Label>
            <input
              id="grid-gap-range"
              type="range"
              min={0}
              max={40}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="justify-items-select">Justify Items</Label>
            <Select
              id="justify-items-select"
              value={justifyItems}
              onChange={(e) => setJustifyItems(e.target.value as JustifyItems)}
            >
              {ITEM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="align-items-select">Align Items</Label>
            <Select
              id="align-items-select"
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as AlignItems)}
            >
              {ITEM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="rounded-2xl border border-border p-4 shadow-sm">
          <div style={previewStyle} className="min-h-56 w-full">
            {cells.map((cell) => (
              <div
                key={cell}
                className="flex items-center justify-center rounded-lg bg-primary/80 font-mono text-sm font-semibold text-primary-foreground"
                style={{ padding: "0.75rem", minWidth: "2rem", minHeight: "2rem" }}
              >
                {cell}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-secondary/50 p-3">
          <code className="flex-1 whitespace-pre-wrap break-all font-mono text-xs">{css}</code>
          <Button type="button" size="sm" onClick={() => copy(css)}>
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      </div>
    </div>
  );
}
