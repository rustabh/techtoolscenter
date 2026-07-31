"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

/**
 * Builds a smooth closed path through `points` using a Catmull-Rom to
 * cubic-Bezier conversion: for every point we derive a tangent from its
 * neighbours, then place control points a fraction of the way along that
 * tangent so consecutive `C` segments blend smoothly, closed with `Z`.
 */
function buildBlobPath(points: Point[]): string {
  const n = points.length;
  if (n < 3) return "";

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)} `;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return `${d.trim()} Z`;
}

function generateSeeds(count: number): number[] {
  return Array.from({ length: count }, () => Math.random() * 2 - 1);
}

export default function SvgBlobGenerator() {
  const [numPoints, setNumPoints] = useState(8);
  const [complexity, setComplexity] = useState(30);
  const [size, setSize] = useState(300);
  const [color, setColor] = useState("#6366f1");
  const [seeds, setSeeds] = useState<number[]>([]);
  const { copied, copy } = useCopy();

  const regenerate = useCallback(() => {
    setSeeds(generateSeeds(numPoints));
  }, [numPoints]);

  // Regenerate seed offsets whenever the point count changes (and once on mount).
  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numPoints]);

  const pathD = useMemo(() => {
    if (seeds.length !== numPoints) return "";
    const cx = size / 2;
    const cy = size / 2;
    const baseR = size * 0.3;
    const points: Point[] = Array.from({ length: numPoints }, (_, i) => {
      const angle = (i / numPoints) * Math.PI * 2;
      const variance = 1 + (complexity / 100) * seeds[i] * 0.5;
      const r = baseR * variance;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
    return buildBlobPath(points);
  }, [seeds, numPoints, complexity, size]);

  const svgMarkup = useMemo(
    () =>
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}"><path fill="${color}" d="${pathD}" /></svg>`,
    [size, color, pathD]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Blob settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="blob-complexity">Complexity / randomness</Label>
              <span className="font-mono text-sm font-semibold">{complexity}%</span>
            </div>
            <input
              id="blob-complexity"
              type="range"
              min={0}
              max={100}
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="blob-points">Points</Label>
              <span className="font-mono text-sm font-semibold">{numPoints}</span>
            </div>
            <input
              id="blob-points"
              type="range"
              min={3}
              max={12}
              value={numPoints}
              onChange={(e) => setNumPoints(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="blob-size">Size</Label>
              <span className="font-mono text-sm font-semibold">{size}px</span>
            </div>
            <input
              id="blob-size"
              type="range"
              min={100}
              max={600}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="blob-color">Fill color</Label>
            <Input id="blob-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 p-1" />
          </div>

          <Button type="button" onClick={regenerate} className="w-full">
            <RefreshCw className="size-4" /> Generate new blob
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-border bg-secondary/30 p-6 shadow-sm">
          {pathD ? (
            <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="260" role="img" aria-label="Generated blob shape">
              <path fill={color} d={pathD} />
            </svg>
          ) : (
            <div className="h-[260px] w-full" />
          )}
        </div>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <Label htmlFor="blob-markup">SVG markup</Label>
            <Textarea id="blob-markup" readOnly value={svgMarkup} className="min-h-[140px] font-mono text-xs" />
            <ActionBar
              onCopy={() => copy(svgMarkup)}
              copied={copied}
              onDownload={() => downloadBlob(new Blob([svgMarkup], { type: "image/svg+xml" }), "blob.svg")}
              downloadLabel="Download SVG"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
