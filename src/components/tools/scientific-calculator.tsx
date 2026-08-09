"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";

const KEY_LABELS: Record<string, string> = {
  "sin(": "sine", "cos(": "cosine", "tan(": "tangent", "√(": "square root", "^": "power",
  "log(": "log base 10", "ln(": "natural log", "(": "open bracket", ")": "close bracket", "π": "pi",
  "÷": "divide", "×": "multiply", "-": "minus", "+": "plus", "%": "percent",
  "C": "clear", "⌫": "backspace", "=": "equals", "e": "Euler's number",
};

function evaluate(expr: string): string {
  try {
    const js = expr
      .replace(/π/g, "Math.PI").replace(/(?<![a-z])e(?![a-z])/g, "Math.E")
      .replace(/asin\(/g, "asinD(").replace(/acos\(/g, "acosD(").replace(/atan\(/g, "atanD(")
      .replace(/sin\(/g, "sinD(").replace(/cos\(/g, "cosD(").replace(/tan\(/g, "tanD(")
      .replace(/√\(/g, "Math.sqrt(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**").replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");
    // eslint-disable-next-line no-new-func
    const fn = new Function("sinD", "cosD", "tanD", "asinD", "acosD", "atanD", `return ${js || 0}`);
    const sinD = (x: number) => Math.sin((x * Math.PI) / 180);
    const cosD = (x: number) => Math.cos((x * Math.PI) / 180);
    const tanD = (x: number) => Math.tan((x * Math.PI) / 180);
    const asinD = (x: number) => (Math.asin(x) * 180) / Math.PI;
    const acosD = (x: number) => (Math.acos(x) * 180) / Math.PI;
    const atanD = (x: number) => (Math.atan(x) * 180) / Math.PI;
    const out = fn(sinD, cosD, tanD, asinD, acosD, atanD);
    if (typeof out !== "number" || !isFinite(out)) return "Error";
    return String(Math.round(out * 1e10) / 1e10);
  } catch {
    return "Error";
  }
}

const KEYS = [
  ["sin(", "cos(", "tan(", "√(", "^"],
  ["log(", "ln(", "(", ")", "π"],
  ["7", "8", "9", "÷", "C"],
  ["4", "5", "6", "×", "⌫"],
  ["1", "2", "3", "-", "%"],
  ["0", ".", "e", "+", "="],
];

export default function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("0");
  const { copied, copy } = useCopy();

  const press = (k: string) => {
    if (k === "C") { setExpr(""); setResult("0"); return; }
    if (k === "⌫") { setExpr((e) => e.slice(0, -1)); return; }
    if (k === "=") { setResult(evaluate(expr)); return; }
    setExpr((e) => e + k);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (/[0-9.+\-*/()^%]/.test(e.key)) { setExpr((v) => v + e.key.replace("*", "×").replace("/", "÷")); }
      else if (e.key === "Enter") { e.preventDefault(); setResult(evaluate(expr)); }
      else if (e.key === "Backspace") setExpr((v) => v.slice(0, -1));
      else if (e.key === "Escape") { setExpr(""); setResult("0"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expr]);

  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="space-y-4 pt-6">
        <div className="rounded-2xl bg-secondary/60 p-4 text-right" aria-live="polite">
          <p className="min-h-5 break-all text-sm text-muted-foreground">{expr || "0"}</p>
          <div className="mt-1 flex items-center justify-end gap-2">
            <p className="break-all text-3xl font-bold">{result}</p>
            <button type="button" onClick={() => copy(result)} aria-label="Copy result" className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {KEYS.flat().map((k) => (
            <Button
              key={k}
              variant={k === "=" ? "default" : /[0-9.]/.test(k) ? "secondary" : "outline"}
              className={cn("h-12 text-sm", k === "=" && "row-span-1")}
              onClick={() => press(k)}
              aria-label={KEY_LABELS[k]}
            >
              {k}
            </Button>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">Tip: use your keyboard — Enter to evaluate, Esc to clear.</p>
      </CardContent>
    </Card>
  );
}
