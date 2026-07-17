"use client";

import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlY2hUb29sc0NlbnRlciIsImlhdCI6MTcxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

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

  const parts = useMemo(() => {
    const [h, p] = value.trim().split(".");
    const header = h ? decodePart(h) : null;
    const payload = p ? decodePart(p) : null;
    let expiry: string | null = null;
    try {
      const obj = payload ? JSON.parse(payload) : {};
      if (obj.exp) expiry = new Date(obj.exp * 1000).toLocaleString();
    } catch { /* ignore */ }
    return { header, payload, expiry, valid: !!(header && payload) };
  }, [value]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Textarea aria-label="JWT" className="min-h-[120px] font-mono text-xs" value={value} onChange={(e) => set(e.target.value)} placeholder="Paste a JWT…" />
        </CardContent>
      </Card>
      {!parts.valid ? (
        <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">Not a valid JWT — expected header.payload.signature.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-sm">Header</CardTitle></CardHeader>
            <CardContent><pre className="overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">{parts.header}</pre></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm">Payload</CardTitle></CardHeader>
            <CardContent>
              <pre className="overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">{parts.payload}</pre>
              {parts.expiry && <p className="mt-2 text-xs text-muted-foreground">Expires: {parts.expiry}</p>}
            </CardContent>
          </Card>
        </div>
      )}
      <p className="text-xs text-muted-foreground">Decoded locally in your browser. Never paste production secrets into online tools.</p>
    </div>
  );
}
