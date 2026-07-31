"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DEFAULT_MARKUP = `<div class="flex items-center justify-center gap-4 rounded-2xl bg-indigo-600 p-8 text-white shadow-lg">\n  <h1 class="text-2xl font-bold">Hello Tailwind!</h1>\n  <button class="rounded-lg bg-white/20 px-4 py-2 font-medium hover:bg-white/30">Click me</button>\n</div>`;

export default function TailwindPlayground() {
  const markup = useLocalStorage<string>("uh:tailwind-playground", DEFAULT_MARKUP);

  const combined = useMemo(
    () =>
      `<html><head><script src="https://cdn.tailwindcss.com"></script></head><body>${markup.value}</body></html>`,
    [markup.value]
  );

  const [srcDoc, setSrcDoc] = useState(combined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSrcDoc(combined);
    }, 400);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [combined]);

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
