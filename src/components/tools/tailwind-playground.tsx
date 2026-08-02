"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DEFAULT_MARKUP = `<div class="flex items-center justify-center gap-4 rounded-2xl bg-indigo-600 p-8 text-white shadow-lg">\n  <h1 class="text-2xl font-bold">Hello Tailwind!</h1>\n  <button class="rounded-lg bg-white/20 px-4 py-2 font-medium hover:bg-white/30">Click me</button>\n</div>`;

// Detects whether the Tailwind CDN script actually loaded — a failed <script
// src> tag doesn't stop the document, it just leaves `tailwind` undefined,
// so classes silently render unstyled with zero indication why.
const CDN_CHECK = `<script>
if (typeof tailwind === 'undefined') parent.postMessage({ ttcTailwindCdnFailed: true }, '*');
else parent.postMessage({ ttcTailwindCdnFailed: false }, '*');
</script>`;

export default function TailwindPlayground() {
  const markup = useLocalStorage<string>("uh:tailwind-playground", DEFAULT_MARKUP);
  const [cdnStatus, setCdnStatus] = useState<"loading" | "ok" | "failed">("loading");

  const combined = useMemo(
    () =>
      `<html><head><script src="https://cdn.tailwindcss.com"></script>${CDN_CHECK}</head><body>${markup.value}</body></html>`,
    [markup.value]
  );

  const [srcDoc, setSrcDoc] = useState(combined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSrcDoc(combined);
      setCdnStatus("loading");
    }, 400);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [combined]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data.ttcTailwindCdnFailed === "boolean") {
        setCdnStatus(e.data.ttcTailwindCdnFailed ? "failed" : "ok");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="tailwind-playground-input">HTML with Tailwind classes</Label>
            <Textarea
              id="tailwind-playground-input"
              className="min-h-[420px] font-mono text-xs"
              value={markup.value}
              onChange={(e) => markup.set(e.target.value)}
              placeholder='<div class="flex items-center gap-2">…</div>'
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => markup.reset()}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {cdnStatus === "failed" && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
              Couldn&apos;t load the Tailwind CDN — check your internet connection. This tool needs network access; classes won&apos;t render until it reconnects.
            </p>
          )}
          {cdnStatus === "loading" && (
            <p className="rounded-lg bg-secondary/60 px-3 py-2 text-xs font-medium text-muted-foreground">Loading Tailwind CDN…</p>
          )}
          <iframe
            title="Tailwind playground preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            className="h-[480px] w-full rounded-xl border border-border bg-white"
          />
          <p className="text-xs text-muted-foreground">
            Powered by the official Tailwind Play CDN — full utility class support, updated live as you type. For
            production, install Tailwind properly rather than using the CDN build.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
