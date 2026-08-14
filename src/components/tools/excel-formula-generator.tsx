"use client";

import { useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Op = "sum" | "average" | "count" | "if" | "sumif" | "countif" | "vlookup" | "xlookup" | "iferror" | "text" | "concat" | "round" | "percent";

const build: Record<Op, (a: string, b: string, c: string) => { formula: string; explain: string }> = {
  sum: (a) => ({ formula: `=SUM(${a || "A1:A10"})`, explain: "Adds up all numbers in the range." }),
  average: (a) => ({ formula: `=AVERAGE(${a || "A1:A10"})`, explain: "Returns the mean of the range." }),
  count: (a) => ({ formula: `=COUNT(${a || "A1:A10"})`, explain: "Counts how many cells contain numbers." }),
  if: (a, b, c) => ({ formula: `=IF(${a || "A1>10"}, "${b || "Yes"}", "${c || "No"}")`, explain: "Returns one value if the condition is true, another if false." }),
  sumif: (a, b, c) => ({ formula: `=SUMIF(${a || "A1:A10"}, "${b || ">100"}", ${c || "B1:B10"})`, explain: "Adds cells that meet the given condition." }),
  countif: (a, b) => ({ formula: `=COUNTIF(${a || "A1:A10"}, "${b || ">100"}")`, explain: "Counts cells that meet the condition." }),
  vlookup: (a, b, c) => ({ formula: `=VLOOKUP(${a || "A2"}, ${b || "D:F"}, ${c || "3"}, FALSE)`, explain: "Looks up a value in the first column of a range and returns a value from another column." }),
  xlookup: (a, b, c) => ({ formula: `=XLOOKUP(${a || "A2"}, ${b || "D:D"}, ${c || "F:F"})`, explain: "Modern replacement for VLOOKUP — looks up a value and returns a match from any column, left or right, without counting columns." }),
  iferror: (a, b) => ({ formula: `=IFERROR(${a || "A1/B1"}, "${b || "Error"}")`, explain: "Runs the formula normally, but shows a fallback value instead of an error (like #DIV/0!) if it fails." }),
  text: (a, b) => ({ formula: `=TEXT(${a || "A1"}, "${b || "dd-mmm-yyyy"}")`, explain: "Formats a number or date as text in the given format (e.g. dates, currency, percentages)." }),
  concat: (a, b) => ({ formula: `=CONCATENATE(${a || "A1"}, " ", ${b || "B1"})`, explain: "Joins text from multiple cells together." }),
  round: (a, b) => ({ formula: `=ROUND(${a || "A1"}, ${b || "2"})`, explain: "Rounds a number to the given number of decimal places." }),
  percent: (a, b) => ({ formula: `=(${a || "A1"}/${b || "B1"})*100`, explain: "Calculates what percentage A is of B." }),
};

const LABELS: Record<Op, [string, string, string]> = {
  sum: ["Range", "", ""], average: ["Range", "", ""], count: ["Range", "", ""],
  if: ["Condition", "Value if true", "Value if false"],
  sumif: ["Criteria range", "Condition", "Sum range"],
  countif: ["Range", "Condition", ""],
  vlookup: ["Lookup value", "Table range", "Column number"],
  xlookup: ["Lookup value", "Lookup range", "Return range"],
  iferror: ["Formula", "Fallback value", ""],
  text: ["Cell", "Format code (e.g. dd-mmm-yyyy)", ""],
  concat: ["First cell", "Second cell", ""],
  round: ["Cell / number", "Decimals", ""],
  percent: ["Value", "Total", ""],
};

export default function ExcelFormulaGenerator() {
  const [op, setOp] = useState<Op>("vlookup");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const { copied, copy } = useCopy();
  const res = build[op](a, b, c);
  const [la, lb, lc] = LABELS[op];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Choose operation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor="excel-op">Operation</Label>
            <Select id="excel-op" value={op} onChange={(e) => { setOp(e.target.value as Op); }}>
              {Object.keys(build).map((o) => <option key={o} value={o} className="uppercase">{o}</option>)}
            </Select>
          </div>
          {la && <div className="space-y-1.5"><Label htmlFor="excel-arg-a">{la}</Label><Input id="excel-arg-a" value={a} onChange={(e) => setA(e.target.value)} /></div>}
          {lb && <div className="space-y-1.5"><Label htmlFor="excel-arg-b">{lb}</Label><Input id="excel-arg-b" value={b} onChange={(e) => setB(e.target.value)} /></div>}
          {lc && <div className="space-y-1.5"><Label htmlFor="excel-arg-c">{lc}</Label><Input id="excel-arg-c" value={c} onChange={(e) => setC(e.target.value)} /></div>}
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Formula</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <code className="block break-all rounded-xl bg-secondary/50 p-4 font-mono text-sm">{res.formula}</code>
          <p className="text-sm text-muted-foreground">{res.explain}</p>
          <Button onClick={() => copy(res.formula)}>{copied ? "Copied!" : "Copy formula"}</Button>
          <p className="text-xs text-muted-foreground">Works in Microsoft Excel and Google Sheets.</p>
        </CardContent>
      </Card>
    </div>
  );
}
