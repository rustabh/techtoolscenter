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

// Parenthesize every "N%" as "(N/100)" rather than just stripping "%" to a
// bare "/100" suffix — division isn't associative, so text-splicing "/100"
// after the number breaks under a preceding "÷": "100÷4%" would become
// "100/4/100" (= 0.25, left-to-right) instead of "100/(4/100)" (= 2500, the
// correct reading of "100 divided by 4 percent").
function parenthesizePercent(expr: string): string {
  return expr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
}

// JS syntactically forbids "-<base>**<exp>" (e.g. -2**2 throws a
// SyntaxError, even though the intended reading is unambiguous for a
// calculator) — the base of "**" can never be a bare unary expression.
// Rather than reinterpreting it as (-2)**2 (which flips the sign of the
// result), this rewrites it as -(2**2), matching the standard mathematical
// convention that unary minus binds *looser* than exponentiation — the
// same reading every other calculator and language without this specific
// parse restriction (e.g. Python's -2**2) already gives -4, not 4.
function wrapNegativeBaseBeforePower(js: string): string {
  let out = js;
  let searchFrom = 0;
  for (;;) {
    const idx = out.indexOf("**", searchFrom);
    if (idx === -1) return out;

    let start = idx;
    if (start > 0 && out[start - 1] === ")") {
      let depth = 0;
      let i = start - 1;
      for (; i >= 0; i--) {
        if (out[i] === ")") depth++;
        else if (out[i] === "(") { depth--; if (depth === 0) break; }
      }
      start = i;
    }
    while (start > 0 && /[A-Za-z0-9_.]/.test(out[start - 1])) start--;

    const before = start >= 2 ? out[start - 2] : null;
    const isUnaryMinus = start > 0 && out[start - 1] === "-" && (before === null || "(+-*/,".includes(before));
    if (!isUnaryMinus) {
      searchFrom = idx + 2;
      continue;
    }

    let end = idx + 2;
    if (out[end] === "-") end++; // a negative exponent stays part of the same power expression
    if (out[end] === "(") {
      let depth = 0;
      for (; end < out.length; end++) {
        if (out[end] === "(") depth++;
        else if (out[end] === ")") { depth--; if (depth === 0) { end++; break; } }
      }
    } else {
      while (end < out.length && /[A-Za-z0-9_.]/.test(out[end])) end++;
    }

    const replacement = `-(${out.slice(start, end)})`;
    out = out.slice(0, start - 1) + replacement + out.slice(end);
    searchFrom = start - 1 + replacement.length;
  }
}

function toJs(expr: string): string {
  const js = parenthesizePercent(expr)
    .replace(/π/g, "Math.PI").replace(/(?<![a-z])e(?![a-z])/g, "Math.E")
    .replace(/asin\(/g, "asinD(").replace(/acos\(/g, "acosD(").replace(/atan\(/g, "atanD(")
    .replace(/sin\(/g, "sinD(").replace(/cos\(/g, "cosD(").replace(/tan\(/g, "tanD(")
    .replace(/√\(/g, "Math.sqrt(").replace(/log\(/g, "Math.log10(").replace(/ln\(/g, "Math.log(")
    .replace(/\^/g, "**").replace(/×/g, "*").replace(/÷/g, "/");
  return wrapNegativeBaseBeforePower(js);
}

function runJs(js: string): number {
  // eslint-disable-next-line no-new-func
  const fn = new Function("sinD", "cosD", "tanD", "asinD", "acosD", "atanD", `return ${js || 0}`);
  const sinD = (x: number) => Math.sin((x * Math.PI) / 180);
  const cosD = (x: number) => Math.cos((x * Math.PI) / 180);
  const tanD = (x: number) => Math.tan((x * Math.PI) / 180);
  const asinD = (x: number) => (Math.asin(x) * 180) / Math.PI;
  const acosD = (x: number) => (Math.acos(x) * 180) / Math.PI;
  const atanD = (x: number) => (Math.atan(x) * 180) / Math.PI;
  const out = fn(sinD, cosD, tanD, asinD, acosD, atanD);
  if (typeof out !== "number" || !isFinite(out)) throw new Error("Invalid result");
  return out;
}

// Splits an expression into its top-level +/- terms (ignoring +/- nested
// inside parentheses), each tagged with the operator preceding it — the
// first term is implicitly "+". This is what lets chained percentages like
// "100+10%+5%" work: each "%" needs to apply against the running total *up
// to that point* (110, then 5.5 on top for 115.5 total), not against the
// literal number that appears before it in the text — a single
// text-substitution pass has no way to know the running total, since it
// only exists after the previous term has actually been computed.
function splitTopLevelTerms(expr: string): { op: "+" | "-"; term: string }[] {
  const terms: { op: "+" | "-"; term: string }[] = [];
  let depth = 0;
  let current = "";
  let currentOp: "+" | "-" = "+";
  for (const ch of expr) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth === 0 && (ch === "+" || ch === "-") && current !== "") {
      terms.push({ op: currentOp, term: current });
      currentOp = ch;
      current = "";
      continue;
    }
    current += ch;
  }
  terms.push({ op: currentOp, term: current });
  return terms;
}

const PURE_PERCENT = /^(\d+(?:\.\d+)?)%$/;

function evaluateExpr(expr: string): number {
  const terms = splitTopLevelTerms(expr);
  let total = 0;
  terms.forEach(({ op, term }, i) => {
    const pct = term.match(PURE_PERCENT);
    // A bare "N%" term chained after +/- means "N percent of the running
    // total so far" — only from the second term on; a lone leading "50%"
    // has nothing to be a percentage of yet, so it falls through to the
    // standalone (N/100) reading that toJs/parenthesizePercent give it.
    const val = i > 0 && pct ? total * (parseFloat(pct[1]) / 100) : runJs(toJs(term));
    total = i === 0 ? val : op === "+" ? total + val : total - val;
  });
  return total;
}

function evaluate(expr: string): string {
  try {
    const out = evaluateExpr(expr);
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
