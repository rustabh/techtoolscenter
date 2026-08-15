"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
};

type SetKey = keyof typeof SETS;

// Characters that are easy to misread or mistype when a password is written
// down, read aloud, or typed on an unfamiliar keyboard (e.g. a Wi-Fi
// password on a router label).
const AMBIGUOUS = "0O1lI|";

// Rejection sampling — `arr[0] % max` alone is statistically biased whenever
// max doesn't evenly divide 2^32 (i.e. almost always), skewing which
// characters land in the generated password. Rejecting draws that fall in
// the leftover, not-evenly-divisible tail makes every character equally likely.
function secureRandom(max: number) {
  const TWO_32 = 0x100000000;
  const rejectionThreshold = TWO_32 - (TWO_32 % max);
  const arr = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(arr);
    x = arr[0];
  } while (x >= rejectionThreshold);
  return x % max;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState<Record<SetKey, boolean>>({
    lower: true, upper: true, numbers: true, symbols: true,
  });
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const { copied, copy } = useCopy();

  const buildPool = useCallback(() => {
    let pool = (Object.keys(opts) as SetKey[]).filter((k) => opts[k]).map((k) => SETS[k]).join("");
    if (excludeAmbiguous) pool = pool.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
    return pool;
  }, [opts, excludeAmbiguous]);

  const generate = useCallback(() => {
    const pool = buildPool();
    if (!pool) {
      setPassword("");
      return;
    }
    let out = "";
    for (let i = 0; i < length; i++) out += pool[secureRandom(pool.length)];
    setPassword(out);
  }, [length, buildPool]);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, opts, excludeAmbiguous]);

  // "R" or Ctrl/Cmd+Enter regenerates without reaching for the mouse.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "r" || ((e.ctrlKey || e.metaKey) && e.key === "Enter")) {
        e.preventDefault();
        generate();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [generate]);

  // Real password strength is about entropy (bits), not "how many character
  // sets are ticked" — a short password with every set enabled is still
  // brute-forceable in seconds, while a long password from one set alone can
  // be genuinely strong. bits = length * log2(pool size) is the standard
  // measure; thresholds below follow common entropy-based guidance.
  const poolSize = buildPool().length;
  const entropyBits = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;
  const strength = Math.min(100, Math.round((entropyBits / 80) * 100));
  const strengthLabel = entropyBits >= 80 ? "Very strong" : entropyBits >= 60 ? "Strong" : entropyBits >= 40 ? "Fair" : "Weak";
  const strengthColor = entropyBits >= 80 ? "bg-emerald-500" : entropyBits >= 60 ? "bg-lime-500" : entropyBits >= 40 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Options</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="len">Length</Label>
              <span className="font-mono text-sm font-semibold">{length}</span>
            </div>
            <input
              id="len"
              type="range"
              min={6}
              max={40}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
            />
          </div>
          <div className="space-y-2">
            {(Object.keys(SETS) as SetKey[]).map((k) => (
              <label key={k} className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 text-sm capitalize">
                {k}
                <input
                  type="checkbox"
                  checked={opts[k]}
                  onChange={(e) => setOpts((o) => ({ ...o, [k]: e.target.checked }))}
                  className="size-4 accent-[hsl(var(--primary))]"
                />
              </label>
            ))}
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-3 text-sm">
              Exclude ambiguous characters
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="size-4 accent-[hsl(var(--primary))]"
              />
            </label>
            <p className="text-xs text-muted-foreground">Drops 0/O, 1/l/I and | — easy to misread when written down or read aloud.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Your password</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3" aria-live="polite">
            <code className="flex-1 break-all font-mono text-sm">{password || "Select at least one option"}</code>
            <Button variant="ghost" size="icon" aria-label="Regenerate password" title="Press R to regenerate" onClick={generate}>
              <RefreshCw className="size-4" />
            </Button>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Strength</span>
              <span className="font-medium">{strengthLabel} · {entropyBits} bits</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={strength} aria-valuemin={0} aria-valuemax={100} aria-label="Password strength">
              <div className={`h-full transition-all ${strengthColor}`} style={{ width: `${strength}%` }} />
            </div>
          </div>
          <ActionBar onCopy={() => copy(password)} copied={copied} />
        </CardContent>
      </Card>
    </div>
  );
}
