"use client";

import { useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

const DIRECTIONS: FlexDirection[] = ["row", "row-reverse", "column", "column-reverse"];
const WRAPS: FlexWrap[] = ["nowrap", "wrap", "wrap-reverse"];
const JUSTIFY_OPTIONS: JustifyContent[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];
const ALIGN_OPTIONS: AlignItems[] = ["flex-start", "flex-end", "center", "stretch", "baseline"];

const ITEMS = ["1", "2", "3", "4", "5"];

export default function FlexboxGenerator() {
  const [direction, setDirection] = useState<FlexDirection>("row");
  const [justifyContent, setJustifyContent] = useState<JustifyContent>("flex-start");
  const [alignItems, setAlignItems] = useState<AlignItems>("stretch");
  const [wrap, setWrap] = useState<FlexWrap>("nowrap");
  const [gap, setGap] = useState(12);
  const { copied, copy } = useCopy();

  const previewStyle = useMemo(
    () => ({
      display: "flex" as const,
      flexDirection: direction,
      justifyContent,
      alignItems,
      flexWrap: wrap,
      gap: `${gap}px`,
    }),
    [direction, justifyContent, alignItems, wrap, gap]
  );

  const css = useMemo(
    () =>
      `display: flex;\nflex-direction: ${direction};\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\nflex-wrap: ${wrap};\ngap: ${gap}px;`,
    [direction, justifyContent, alignItems, wrap, gap]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Flexbox Container</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label id="flex-direction-label">Flex Direction</Label>
            <div className="grid grid-cols-2 gap-2" aria-labelledby="flex-direction-label">
              {DIRECTIONS.map((d) => (
                <Button
                  key={d}
                  type="button"
                  variant={direction === d ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDirection(d)}
                  className="text-xs"
                >
                  {d}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="justify-content-select">Justify Content</Label>
            <Select
              id="justify-content-select"
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as JustifyContent)}
            >
              {JUSTIFY_OPTIONS.map((option) => (
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
              {ALIGN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label id="flex-wrap-label">Flex Wrap</Label>
            <div className="grid grid-cols-3 gap-2" aria-labelledby="flex-wrap-label">
              {WRAPS.map((w) => (
                <Button
                  key={w}
                  type="button"
                  variant={wrap === w ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWrap(w)}
                  className="text-xs"
                >
                  {w}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="flex-gap-range">Gap: {gap}px</Label>
            <input
              id="flex-gap-range"
              type="range"
              min={0}
              max={40}
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="rounded-2xl border border-border p-4 shadow-sm">
          <div style={previewStyle} className="min-h-56 w-full">
            {ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center rounded-lg bg-primary/80 font-mono text-sm font-semibold text-primary-foreground"
                style={{ padding: "1rem", minWidth: "2.5rem", minHeight: "2.5rem" }}
              >
                {item}
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
