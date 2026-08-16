"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopy } from "@/hooks/use-copy";
import { useGenerationHistory } from "@/hooks/use-generation-history";
import { GenerationHistoryPanel } from "@/components/tools/generation-history-panel";

const KEY_LABELS: Record<string, string> = {
  "sin(": "sine", "cos(": "cosine", "tan(": "tangent", "√(": "square root", "^": "power",
  "log(": "log base 10", "ln(": "natural log", "(": "open bracket", ")": "close bracket", "π": "pi",
  "÷": "divide", "×": "multiply", "-": "minus", "+": "plus", "%": "percent",
  "C": "clear", "⌫": "backspace", "=": "equals", "e": "Euler's number",
};

// A "%" after +/- is a percentage-of-the-running-total, not a bare fraction —
// every real calculator (Windows, iPhone, physical) treats "1000+18%" as
// "1000 + 18% of 1000" = 1180, not "1000 + 0.18" = 1000.18. Rewrite those
// cases to "A+(A*B/100)" before the generic "N%" -> "(N/100)" pass below
// handles the remaining standalone/×/÷ cases (e.g. "10×50%" = 5, "50%" =
// 0.5), which keep their plain fractional meaning.
function expandContextualPercent(expr: string): string {
  const PCT_OF_TOTAL = /(\d+(?:\.\d+)?)([+\-])(\d+(?:\.\d+)?)%/;
  let out = expr;
  while (PCT_OF_TOTAL.test(out)) {
    out = out.replace(PCT_OF_TOTAL, (_m, base, op, pct) => `${base}${op}(${base}*${pct}/100)`);
  }
  return out;
}

// Parenthesize every remaining "N%" as "(N/100)" rather than just stripping
// "%" to a bare "/100" suffix — division isn't associative, so text-splicing
// "/100" after the number breaks under a preceding "÷": "100÷4%" would
// become "100/4/100" (= 0.25, left-to-right) instead of "100/(4/100)"
// (= 2500, the correct reading of "100 divided by 4 percent").
function parenthesizePercent(expr: string): string {
  return expr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
}

function evaluate(expr: string): string {
  try {
    const js = parenthesizePercent(expandContextualPercent(expr))
      .replace(/π/g, "Math.PI").replace(/(?<![a-z])e(?![a-z])/g, "Math.E")
      .replace(/asin\(/g, "asinD(").replace(/acos\(/g, "acosD(").replace(/atan\(/g, "atanD(")
      .replace(/sin\(/g, "sinD(").replace(/cos\(/g, "cosD(").replace(/tan\(/g, "tanD(")
      .replace(/√\(/g, "Math.sqrt(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**").replace(/×/g, "*").replace(/÷/g, "/");
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
  const { history, add, remove, clear } = useGenerationHistory("uh:sci-calc-history");

  const doEvaluate = () => {
    if (!expr.trim()) return;
    const out = evaluate(expr);
    setResult(out);
    if (out !== "Error") add(out, `${expr} =`);
  };

  const press = (k: string) => {
    if (k === "C") { setExpr(""); setResult("0"); return; }
    if (k === "⌫") { setExpr((e) => e.slice(0, -1)); return; }
    if (k === "=") { doEvaluate(); return; }
    setExpr((e) => e + k);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (/[0-9.+\-*/()^%]/.test(e.key)) { setExpr((v) => v + e.key.replace("*", "×").replace("/", "÷")); }
      else if (e.key === "Enter") { e.preventDefault(); doEvaluate(); }
      else if (e.key === "Backspace") setExpr((v) => v.slice(0, -1));
      else if (e.key === "Escape") { setExpr(""); setResult("0"); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr]);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card>
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
      <Card>
        <CardHeader><CardTitle>History</CardTitle></CardHeader>
        <CardContent>
          <GenerationHistoryPanel
            history={history}
            onRemove={remove}
            onClear={clear}
            onRestore={(value) => setResult(value)}
            emptyLabel="Nothing calculated yet — past results will show up here."
          />
        </CardContent>
      </Card>
    </div>
  );
}
