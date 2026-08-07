"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { Copy, Check } from "lucide-react";

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10), o = n % 10;
  return TENS[t] + (o ? " " + ONES[o] : "");
}

function threeDigits(n: number): string {
  const h = Math.floor(n / 100), rest = n % 100;
  const parts: string[] = [];
  if (h) parts.push(ONES[h] + " Hundred");
  if (rest) parts.push(twoDigits(rest));
  return parts.join(" ");
}

/** Converts a non-negative integer to words using the Indian numbering system (Crore/Lakh/Thousand). */
function integerToIndianWords(n: number): string {
  if (n === 0) return "Zero";
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  const hundred = n;

  const parts: string[] = [];
  if (crore) parts.push(threeDigits(crore) + " Crore");
  if (lakh) parts.push(twoDigits(lakh) + " Lakh");
  if (thousand) parts.push(twoDigits(thousand) + " Thousand");
  if (hundred) parts.push(threeDigits(hundred));
  return parts.join(" ");
}

export default function NumberToWords() {
  const [input, setInput] = useState("1234567.50");
  const [asCurrency, setAsCurrency] = useState(true);
  const { copied, copy } = useCopy();

  const result = useMemo(() => {
    const trimmed = input.trim().replace(/,/g, "");
    if (!trimmed || isNaN(Number(trimmed))) return null;
    const negative = trimmed.startsWith("-");
    const abs = Math.abs(Number(trimmed));
    if (abs >= 1000000000000) return { error: "Number is too large — try something under a lakh crore." };
    const [intPart, decPart = ""] = abs.toFixed(2).split(".");
    const intVal = parseInt(intPart, 10);
    const decVal = parseInt(decPart, 10);

    const intWords = integerToIndianWords(intVal);
    if (!asCurrency) {
      const decWords = decVal ? ` Point ${decPart.split("").map((d) => ONES[Number(d)] || "Zero").join(" ")}` : "";
      return { words: `${negative ? "Minus " : ""}${intWords}${decWords}` };
    }
    const rupeeWords = `${negative ? "Minus " : ""}Rupees ${intWords}`;
    const paiseWords = decVal ? ` and ${twoDigits(decVal)} Paise` : "";
    return { words: `${rupeeWords}${paiseWords} Only` };
  }, [input, asCurrency]);

  const words = result && "words" in result ? result.words : null;
  const error = result && "error" in result ? result.error : null;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Card>
        <CardHeader><CardTitle>Number</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ntw-input">Enter a number</Label>
            <Input id="ntw-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. 1234567.50" inputMode="decimal" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={asCurrency}
              onClick={() => setAsCurrency(true)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${asCurrency ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
            >
              Rupees & Paise
            </button>
            <button
              type="button"
              aria-pressed={!asCurrency}
              onClick={() => setAsCurrency(false)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${!asCurrency ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}
            >
              Plain number
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>In words</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {words ? (
            <>
              <p className="rounded-xl border border-border bg-background p-4 text-lg font-medium leading-relaxed">{words}</p>
              <Button variant="outline" size="sm" onClick={() => copy(words)}>
                {copied ? <Check className="text-emerald-500" /> : <Copy />} Copy
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground">{error ?? "Enter a valid number above."}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
