"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function evaluate(expr: string): string {
  try {
    const js = expr
      .replace(/π/g, "Math.PI").replace(/(?<![a-z])e(?![a-z])/g, "Math.E")
      .replace(/sin\(/g, "Math.sin(rad").replace(/cos\(/g, "Math.cos(rad").replace(/tan\(/g, "Math.tan(rad")
      .replace(/asin\(/g, "deg(Math.asin(").replace(/acos\(/g, "deg(Math.acos(").replace(/atan\(/g, "deg(Math.atan(")
      .replace(/√\(/g, "Math.sqrt(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**").replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");
    // eslint-disable-next-line no-new-func
    const fn = new Function("rad", "deg", `return ${js || 0}`);
    const rad = (x: number) => (x * Math.PI) / 180;
    const deg = (x: number) => (x * 180) / Math.PI;
    const out = fn((x: number) => rad(x), deg);
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

  const press = (k: string) => {
    if (k === "C") { setExpr(""); setResult("0"); return; }
    if (k === "⌫") { setExpr((e) => e.slice(0, -1)); return; }
    if (k === "=") { setResult(evaluate(expr)); return; }
    setExpr((e) => e + k);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
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
        <div className="rounded-2xl bg-secondary/60 p-4 text-right">
          <p className="min-h-5 break-all text-sm text-muted-foreground">{expr || "0"}</p>
          <p className="mt-1 break-all text-3xl font-bold">{result}</p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {KEYS.flat().map((k) => (
            <Button
              key={k}
              variant={k === "=" ? "default" : /[0-9.]/.test(k) ? "secondary" : "outline"}
              className={cn("h-12 text-sm", k === "=" && "row-span-1")}
              onClick={() => press(k)}
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
