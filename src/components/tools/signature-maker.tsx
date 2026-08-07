"use client";

import { useEffect, useRef, useState } from "react";
import { PenTool, Download, Eraser } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

type Mode = "draw" | "type";
const FONTS = ["'Brush Script MT', cursive", "'Segoe Script', cursive", "'Comic Sans MS', cursive", "cursive"];

export default function SignatureMaker() {
  const [mode, setMode] = useState<Mode>("draw");
  const [color, setColor] = useState("#111111");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [typedText, setTypedText] = useState("Your Name");
  const [fontIndex, setFontIndex] = useState(0);
  const [hasDrawing, setHasDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 600;
    canvas.height = 220;
  }, []);

  useEffect(() => {
    if (mode !== "type") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!typedText.trim()) return;
    ctx.fillStyle = color;
    ctx.font = `48px ${FONTS[fontIndex]}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedText, canvas.width / 2, canvas.height / 2);
    setHasDrawing(true);
  }, [mode, typedText, fontIndex, color]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * e.currentTarget.width,
      y: ((e.clientY - rect.top) / rect.height) * e.currentTarget.height,
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return;
    drawing.current = true;
    last.current = getPos(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw" || !drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas || !last.current) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    last.current = pos;
    setHasDrawing(true);
  };
  const onPointerUp = () => {
    drawing.current = false;
    last.current = null;
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawing) {
      showToast("Draw or type a signature first", "error");
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      downloadBlob(blob, "signature.png");
    }, "image/png");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Create your signature</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(["draw", "type"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => { setMode(m); clear(); }}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                  mode === m ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
                }`}
              >
                {m === "draw" ? "Draw with mouse/finger" : "Type your name"}
              </button>
            ))}
          </div>

          {mode === "type" && (
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="sig-text">Your name</Label>
                <Input id="sig-text" value={typedText} onChange={(e) => setTypedText(e.target.value)} maxLength={40} />
              </div>
              <div className="space-y-1.5">
                <Label>Style</Label>
                <div className="flex flex-wrap gap-2">
                  {FONTS.map((f, i) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={fontIndex === i}
                      onClick={() => setFontIndex(i)}
                      style={{ fontFamily: f }}
                      className={`rounded-xl border px-4 py-2 text-lg transition-colors ${
                        fontIndex === i ? "border-primary bg-primary/10" : "border-border hover:bg-secondary"
                      }`}
                    >
                      Style {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sig-color">Ink color</Label>
              <Input id="sig-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 p-1" />
            </div>
            {mode === "draw" && (
              <div className="space-y-1.5">
                <Label htmlFor="sig-width">Stroke width: {strokeWidth}px</Label>
                <input id="sig-width" type="range" min={1} max={8} value={strokeWidth} onChange={(e) => setStrokeWidth(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="lg:sticky lg:top-20 lg:h-fit">
        <Card>
          <CardHeader><CardTitle>Signature</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-border bg-[repeating-conic-gradient(#8883_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-2">
              <canvas
                ref={canvasRef}
                className="w-full touch-none rounded-lg bg-transparent"
                style={{ aspectRatio: "600 / 220" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                role="img"
                aria-label="Signature drawing area"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={clear}><Eraser /> Clear</Button>
              <Button onClick={download}><Download /> Download PNG</Button>
            </div>
            <p className="text-xs text-muted-foreground">Downloads with a transparent background — ready to drop into a document.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
