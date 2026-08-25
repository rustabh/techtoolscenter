"use client";

import { useMemo } from "react";
import { Check, Copy } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlY2hUb29sc0NlbnRlciIsImlhdCI6MTcxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function relativeFromNow(ms: number): string {
  const diff = ms - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.round(abs / 60000);
  const hours = Math.round(abs / 3600000);
  const days = Math.round(abs / 86400000);
  const unit = mins < 60 ? `${mins}m` : hours < 48 ? `${hours}h` : `${days}d`;
  return diff >= 0 ? `in ${unit}` : `${unit} ago`;
}

function decodePart(part: string) {
  try {
    const json = decodeURIComponent(
      atob(part.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return null;
  }
}

export default function JwtDecoder() {
  const { value, set } = useLocalStorage<string>("uh:jwt", SAMPLE);
  const headerCopy = useCopy();
  const payloadCopy = useCopy();

  const parts = useMemo(() => {
    // A JWS compact token is always exactly 3 dot-separated, non-empty parts
    // (header.payload.signature). Only checking that the first two segments
    // happen to decode — the previous behaviour — let a truncated token
    // missing its signature (2 parts) or a JWE-style 5-part token report as
    // "valid", silently hiding exactly the kind of malformed/incomplete
    // paste this tool exists to catch.
    const segments = value.trim().split(".");
    const [h, p, s] = segments;
    const wellFormed = segments.length === 3 && !!h && !!p && !!s;
    const header = wellFormed ? decodePart(h) : null;
    const payload = wellFormed ? decodePart(p) : null;
    let expiry: string | null = null;
    let expiryMs: number | null = null;
    try {
      const obj = payload ? JSON.parse(payload) : {};
      if (obj.exp) {
        expiryMs = obj.exp * 1000;
        expiry = new Date(expiryMs).toLocaleString();
      }
    } catch { /* ignore */ }
    return { header, payload, expiry, expiryMs, valid: !!(header && payload), segmentCount: segments.length };
  }, [value]);

  const expired = parts.expiryMs !== null && parts.expiryMs < Date.now();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Textarea aria-label="JWT" className="min-h-[120px] font-mono text-xs" value={value} onChange={(e) => set(e.target.value)} placeholder="Paste a JWT…" />
        </CardContent>
      </Card>
      {!parts.valid ? (
        <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          Not a valid JWT — expected 3 dot-separated parts (header.payload.signature), found {parts.segmentCount}.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm">Header</CardTitle>
              <Button variant="ghost" size="icon" aria-label="Copy header JSON" onClick={() => parts.header && headerCopy.copy(parts.header)}>
                {headerCopy.copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </Button>
            </CardHeader>
            <CardContent><pre className="overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">{parts.header}</pre></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm">Payload</CardTitle>
              <Button variant="ghost" size="icon" aria-label="Copy payload JSON" onClick={() => parts.payload && payloadCopy.copy(parts.payload)}>
                {payloadCopy.copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">{parts.payload}</pre>
              {parts.expiry && (
                <p className={`mt-2 text-xs font-medium ${expired ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"}`}>
                  {expired ? "⚠ Expired" : "✓ Valid"} — {parts.expiry} ({relativeFromNow(parts.expiryMs!)})
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Decoded locally in your browser. Never paste production secrets into online tools.</p>
    </div>
  );
}
