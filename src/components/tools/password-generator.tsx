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

function secureRandom(max: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState<Record<SetKey, boolean>>({
    lower: true, upper: true, numbers: true, symbols: true,
  });
  const [password, setPassword] = useState("");
  const { copied, copy } = useCopy();

  const generate = useCallback(() => {
    const pool = (Object.keys(opts) as SetKey[]).filter((k) => opts[k]).map((k) => SETS[k]).join("");
    if (!pool) {
      setPassword("");
      return;
    }
    let out = "";
    for (let i = 0; i < length; i++) out += pool[secureRandom(pool.length)];
    setPassword(out);
  }, [length, opts]);

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, opts]);

  const activeSets = (Object.keys(opts) as SetKey[]).filter((k) => opts[k]).length;
  const strength = Math.min(100, Math.round((length / 24) * 60 + activeSets * 10));
  const strengthLabel = strength > 80 ? "Very strong" : strength > 60 ? "Strong" : strength > 40 ? "Fair" : "Weak";
  const strengthColor = strength > 80 ? "bg-emerald-500" : strength > 60 ? "bg-lime-500" : strength > 40 ? "bg-amber-500" : "bg-red-500";

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
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Your password</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3">
            <code className="flex-1 break-all font-mono text-sm">{password || "Select at least one option"}</code>
            <Button variant="ghost" size="icon" aria-label="Regenerate" onClick={generate}>
              <RefreshCw className="size-4" />
            </Button>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Strength</span>
              <span className="font-medium">{strengthLabel}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className={`h-full transition-all ${strengthColor}`} style={{ width: `${strength}%` }} />
            </div>
          </div>
          <ActionBar onCopy={() => copy(password)} copied={copied} downloadLabel="Regenerate" onDownload={generate} />
        </CardContent>
      </Card>
    </div>
  );
}
