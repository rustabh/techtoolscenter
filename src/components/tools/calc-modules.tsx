"use client";

import { useId, useMemo, useState } from "react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatCurrency, localDateISO } from "@/lib/utils";

function Result({ label, value, big }: { label: string; value: string; big?: boolean }) {
  const { copied, copy } = useCopy();
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary/50 p-3">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={big ? "text-2xl font-bold text-primary" : "font-semibold"}>{value}</p>
      </div>
      <Button variant="ghost" size="sm" onClick={() => copy(value)}>{copied ? "Copied" : "Copy"}</Button>
    </div>
  );
}
function Field({ label, value, onChange, type = "number" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function Shell({ title, inputs, results }: { title: string; inputs: React.ReactNode; results: React.ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="space-y-4">{inputs}</CardContent></Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent"><CardHeader><CardTitle>Result</CardTitle></CardHeader><CardContent className="space-y-3">{results}</CardContent></Card>
    </div>
  );
}

/* ---------- Basic ---------- */
export function BasicCalc() {
  const [expr, setExpr] = useState("");
  const [out, setOut] = useState("0");
  const keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];
  const press = (k: string) => {
    if (k === "=") {
      try {
        const js = expr.replace(/×/g, "*").replace(/÷/g, "/");
        // eslint-disable-next-line no-new-func
        const r = Function(`return ${js || 0}`)();
        setOut(isFinite(r) ? String(Math.round(r * 1e10) / 1e10) : "Error");
        import("@/lib/stats/stats").then((m) => m.track("calculations")).catch(() => {});
      } catch { setOut("Error"); }
    } else setExpr((e) => e + k);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardContent className="space-y-4 pt-6">
        <div className="rounded-2xl bg-secondary/60 p-4 text-right">
          <p className="min-h-5 break-all text-sm text-muted-foreground">{expr || "0"}</p>
          <p className="break-all text-3xl font-bold">{out}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="col-span-2 h-12" onClick={() => { setExpr(""); setOut("0"); }}>Clear</Button>
          <Button variant="outline" className="col-span-2 h-12" onClick={() => setExpr((e) => e.slice(0, -1))}>⌫</Button>
          {keys.map((k) => (
            <Button key={k} variant={k === "=" ? "default" : /[0-9.]/.test(k) ? "secondary" : "outline"} className="h-12" onClick={() => press(k)}>{k}</Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Programmer (number bases) ---------- */
export function ProgrammerCalc() {
  const [dec, setDec] = useState("255");
  const n = parseInt(dec, 10);
  const valid = !isNaN(n) && n >= 0;
  return (
    <Shell title="Number base converter"
      inputs={<Field label="Decimal number" value={dec} onChange={(v) => setDec(v.replace(/[^0-9]/g, ""))} />}
      results={valid ? (<>
        <Result label="Binary" value={n.toString(2)} />
        <Result label="Octal" value={n.toString(8)} />
        <Result label="Hexadecimal" value={n.toString(16).toUpperCase()} />
        <Result label="Bytes" value={`${Math.ceil((n.toString(2).length) / 8)} byte(s)`} />
      </>) : <p className="text-sm text-muted-foreground">Enter a valid number.</p>} />
  );
}

/* ---------- Loan ---------- */
export function LoanCalc() {
  const [p, setP] = useState("500000"), [r, setR] = useState("9"), [y, setY] = useState("5");
  const d = useMemo(() => {
    const P = +p || 0, R = (+r || 0) / 1200, N = (+y || 0) * 12;
    const emi = R === 0 ? P / N : (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
    return { emi, total: emi * N, interest: emi * N - P };
  }, [p, r, y]);
  return <Shell title="Loan calculator"
    inputs={<><Field label="Loan amount (₹)" value={p} onChange={setP} /><Field label="Interest rate (% p.a.)" value={r} onChange={setR} /><Field label="Tenure (years)" value={y} onChange={setY} /></>}
    results={<><Result label="Monthly payment" value={formatCurrency(d.emi)} big /><Result label="Total interest" value={formatCurrency(d.interest)} /><Result label="Total payable" value={formatCurrency(d.total)} /></>} />;
}

/* ---------- SIP ---------- */
export function SipCalc() {
  const [m, setM] = useState("5000"), [r, setR] = useState("12"), [y, setY] = useState("10");
  const d = useMemo(() => {
    const M = +m || 0, i = (+r || 0) / 1200, n = (+y || 0) * 12;
    const fv = i === 0 ? M * n : M * (((1 + i) ** n - 1) / i) * (1 + i);
    const invested = M * n;
    return { fv, invested, gain: fv - invested };
  }, [m, r, y]);
  return <Shell title="SIP calculator"
    inputs={<><Field label="Monthly investment (₹)" value={m} onChange={setM} /><Field label="Expected return (% p.a.)" value={r} onChange={setR} /><Field label="Duration (years)" value={y} onChange={setY} /></>}
    results={<><Result label="Future value" value={formatCurrency(d.fv)} big /><Result label="Invested amount" value={formatCurrency(d.invested)} /><Result label="Estimated gains" value={formatCurrency(d.gain)} /></>} />;
}

/* ---------- Compound Interest ---------- */
export function CompoundInterestCalc() {
  const [p, setP] = useState("100000"), [r, setR] = useState("8"), [y, setY] = useState("5"), [f, setF] = useState("1");
  const d = useMemo(() => {
    const P = +p || 0, R = (+r || 0) / 100, n = +f || 1, t = +y || 0;
    const amount = P * (1 + R / n) ** (n * t);
    return { amount, interest: amount - P };
  }, [p, r, y, f]);
  return <Shell title="Compound interest"
    inputs={<><Field label="Principal (₹)" value={p} onChange={setP} /><Field label="Rate (% p.a.)" value={r} onChange={setR} /><Field label="Years" value={y} onChange={setY} />
      <div className="space-y-1.5"><Label htmlFor="calc-compounding">Compounding</Label><Select id="calc-compounding" value={f} onChange={(e) => setF(e.target.value)}><option value="1">Yearly</option><option value="2">Half-yearly</option><option value="4">Quarterly</option><option value="12">Monthly</option></Select></div></>}
    results={<><Result label="Maturity amount" value={formatCurrency(d.amount)} big /><Result label="Interest earned" value={formatCurrency(d.interest)} /></>} />;
}

/* ---------- Simple Interest ---------- */
export function SimpleInterestCalc() {
  const [p, setP] = useState("100000"), [r, setR] = useState("8"), [y, setY] = useState("5");
  const si = (+p || 0) * (+r || 0) * (+y || 0) / 100;
  return <Shell title="Simple interest"
    inputs={<><Field label="Principal (₹)" value={p} onChange={setP} /><Field label="Rate (% p.a.)" value={r} onChange={setR} /><Field label="Years" value={y} onChange={setY} /></>}
    results={<><Result label="Interest" value={formatCurrency(si)} big /><Result label="Total amount" value={formatCurrency((+p || 0) + si)} /></>} />;
}

/* ---------- Currency (manual rate) ---------- */
export function CurrencyCalc() {
  const [amt, setAmt] = useState("100"), [rate, setRate] = useState("83.5");
  const out = (+amt || 0) * (+rate || 0);
  return <Shell title="Currency converter"
    inputs={<><Field label="Amount" value={amt} onChange={setAmt} /><Field label="Exchange rate (1 unit = ?)" value={rate} onChange={setRate} /><p className="text-xs text-muted-foreground">Enter today&apos;s rate (rates aren&apos;t live). E.g. 1 USD = 83.5 INR.</p></>}
    results={<Result label="Converted amount" value={String(Math.round(out * 100) / 100)} big />} />;
}

/* ---------- BMR ---------- */
export function BmrCalc() {
  const [w, setW] = useState("70"), [h, setH] = useState("175"), [a, setA] = useState("30"), [g, setG] = useState("male");
  const bmr = useMemo(() => {
    const base = 10 * (+w || 0) + 6.25 * (+h || 0) - 5 * (+a || 0);
    return g === "male" ? base + 5 : base - 161;
  }, [w, h, a, g]);
  return <Shell title="BMR (Mifflin-St Jeor)"
    inputs={<><Field label="Weight (kg)" value={w} onChange={setW} /><Field label="Height (cm)" value={h} onChange={setH} /><Field label="Age" value={a} onChange={setA} />
      <div className="space-y-1.5"><Label htmlFor="calc-bmr-gender">Gender</Label><Select id="calc-bmr-gender" value={g} onChange={(e) => setG(e.target.value)}><option value="male">Male</option><option value="female">Female</option></Select></div></>}
    results={<><Result label="Basal Metabolic Rate" value={`${Math.round(bmr)} kcal/day`} big /><Result label="Sedentary (×1.2)" value={`${Math.round(bmr * 1.2)} kcal`} /><Result label="Active (×1.55)" value={`${Math.round(bmr * 1.55)} kcal`} /></>} />;
}

/* ---------- Body Fat (US Navy) ---------- */
export function BodyFatCalc() {
  const [g, setG] = useState("male"), [h, setH] = useState("175"), [neck, setNeck] = useState("38"), [waist, setWaist] = useState("85"), [hip, setHip] = useState("95");
  const bf = useMemo(() => {
    const H = +h || 1, N = +neck || 1, W = +waist || 1, Hi = +hip || 1;
    let v: number;
    if (g === "male") v = 495 / (1.0324 - 0.19077 * Math.log10(W - N) + 0.15456 * Math.log10(H)) - 450;
    else v = 495 / (1.29579 - 0.35004 * Math.log10(W + Hi - N) + 0.221 * Math.log10(H)) - 450;
    return isFinite(v) ? Math.max(0, v) : 0;
  }, [g, h, neck, waist, hip]);
  return <Shell title="Body fat (US Navy)"
    inputs={<><div className="space-y-1.5"><Label htmlFor="calc-bodyfat-gender">Gender</Label><Select id="calc-bodyfat-gender" value={g} onChange={(e) => setG(e.target.value)}><option value="male">Male</option><option value="female">Female</option></Select></div>
      <Field label="Height (cm)" value={h} onChange={setH} /><Field label="Neck (cm)" value={neck} onChange={setNeck} /><Field label="Waist (cm)" value={waist} onChange={setWaist} />
      {g === "female" && <Field label="Hip (cm)" value={hip} onChange={setHip} />}</>}
    results={<Result label="Estimated body fat" value={`${bf.toFixed(1)}%`} big />} />;
}

/* ---------- Date Difference ---------- */
export function DateDiffCalc() {
  const [from, setFrom] = useState("2020-01-01"), [to, setTo] = useState(localDateISO());
  const d = useMemo(() => {
    const a = new Date(from), b = new Date(to);
    if (isNaN(a.getTime()) || isNaN(b.getTime())) return null;
    const days = Math.round(Math.abs(b.getTime() - a.getTime()) / 86400000);
    return { days, weeks: Math.floor(days / 7), months: Math.floor(days / 30.437), years: (days / 365.25).toFixed(2) };
  }, [from, to]);
  return <Shell title="Date difference"
    inputs={<><Field label="From" value={from} onChange={setFrom} type="date" /><Field label="To" value={to} onChange={setTo} type="date" /></>}
    results={d ? (<><Result label="Days" value={String(d.days)} big /><Result label="Weeks" value={String(d.weeks)} /><Result label="Months" value={String(d.months)} /><Result label="Years" value={String(d.years)} /></>) : <p className="text-sm text-muted-foreground">Enter valid dates.</p>} />;
}

/* ---------- Time Calculator ---------- */
export function TimeCalc() {
  const [h1, setH1] = useState("2"), [m1, setM1] = useState("30"), [h2, setH2] = useState("1"), [m2, setM2] = useState("45"), [op, setOp] = useState("+");
  const total = useMemo(() => {
    const t1 = (+h1 || 0) * 60 + (+m1 || 0), t2 = (+h2 || 0) * 60 + (+m2 || 0);
    let mins = op === "+" ? t1 + t2 : t1 - t2;
    const neg = mins < 0; mins = Math.abs(mins);
    return `${neg ? "-" : ""}${Math.floor(mins / 60)}h ${mins % 60}m`;
  }, [h1, m1, h2, m2, op]);
  return <Shell title="Time calculator"
    inputs={<><div className="grid grid-cols-2 gap-3"><Field label="Hours 1" value={h1} onChange={setH1} /><Field label="Minutes 1" value={m1} onChange={setM1} /></div>
      <div className="space-y-1.5"><Label htmlFor="calc-time-op">Operation</Label><Select id="calc-time-op" value={op} onChange={(e) => setOp(e.target.value)}><option value="+">Add</option><option value="-">Subtract</option></Select></div>
      <div className="grid grid-cols-2 gap-3"><Field label="Hours 2" value={h2} onChange={setH2} /><Field label="Minutes 2" value={m2} onChange={setM2} /></div></>}
    results={<Result label="Result" value={total} big />} />;
}

/* ---------- Working Days ---------- */
export function WorkingDaysCalc() {
  const [from, setFrom] = useState("2026-07-01"), [to, setTo] = useState("2026-07-31");
  const d = useMemo(() => {
    const a = new Date(from), b = new Date(to);
    if (isNaN(a.getTime()) || isNaN(b.getTime()) || b < a) return null;
    let work = 0, weekend = 0;
    for (let x = new Date(a); x <= b; x.setDate(x.getDate() + 1)) {
      const day = x.getDay();
      if (day === 0 || day === 6) weekend++; else work++;
    }
    return { work, weekend, total: work + weekend };
  }, [from, to]);
  return <Shell title="Working days"
    inputs={<><Field label="Start date" value={from} onChange={setFrom} type="date" /><Field label="End date" value={to} onChange={setTo} type="date" /></>}
    results={d ? (<><Result label="Working days" value={String(d.work)} big /><Result label="Weekend days" value={String(d.weekend)} /><Result label="Total days" value={String(d.total)} /></>) : <p className="text-sm text-muted-foreground">Enter a valid range.</p>} />;
}

/* ---------- Electricity Bill ---------- */
export function ElectricityCalc() {
  const [units, setUnits] = useState("300"), [rate, setRate] = useState("8"), [fixed, setFixed] = useState("50");
  const total = (+units || 0) * (+rate || 0) + (+fixed || 0);
  return <Shell title="Electricity bill"
    inputs={<><Field label="Units consumed (kWh)" value={units} onChange={setUnits} /><Field label="Rate per unit (₹)" value={rate} onChange={setRate} /><Field label="Fixed charges (₹)" value={fixed} onChange={setFixed} /></>}
    results={<><Result label="Energy charge" value={formatCurrency((+units || 0) * (+rate || 0))} /><Result label="Total bill" value={formatCurrency(total)} big /></>} />;
}

/* ---------- Roman Numerals ---------- */
const ROMAN: [number, string][] = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
function toRoman(num: number) { let r = ""; for (const [v, s] of ROMAN) while (num >= v) { r += s; num -= v; } return r || "—"; }
function fromRoman(s: string) {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const t = s.toUpperCase();
  if (!t || !/^[IVXLCDM]+$/.test(t)) return NaN;
  let n = 0;
  for (let i = 0; i < t.length; i++) { const c = map[t[i]]; const nx = map[t[i + 1]]; n += nx > c ? -c : c; }
  // Decoding alone accepts malformed sequences (e.g. "IC" -> 99, which isn't valid
  // notation at all — 99 is "XCIX"). A well-formed numeral round-trips exactly
  // through re-encoding, so use that as the validity check.
  return n >= 1 && n <= 3999 && toRoman(n) === t ? n : NaN;
}
export function RomanCalc() {
  const [num, setNum] = useState("2026"), [rom, setRom] = useState("");
  const roman = num ? toRoman(Math.min(3999, Math.max(1, parseInt(num) || 0))) : "";
  const decoded = rom ? fromRoman(rom) : NaN;
  return <div className="grid gap-6 lg:grid-cols-2">
    <Card><CardHeader><CardTitle>Number → Roman</CardTitle></CardHeader><CardContent className="space-y-4">
      <Field label="Number (1–3999)" value={num} onChange={(v) => setNum(v.replace(/[^0-9]/g, ""))} />
      <Result label="Roman numeral" value={roman || "—"} big />
    </CardContent></Card>
    <Card><CardHeader><CardTitle>Roman → Number</CardTitle></CardHeader><CardContent className="space-y-4">
      <Field label="Roman numeral" value={rom} onChange={(v) => setRom(v)} type="text" />
      <Result label="Number" value={!rom ? "—" : isNaN(decoded) ? "Invalid Roman numeral" : String(decoded)} big />
    </CardContent></Card>
  </div>;
}
