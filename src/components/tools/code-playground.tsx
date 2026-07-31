"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DEFAULT_HTML = `<h1>Hello!</h1>\n<button id="btn">Click me</button>`;
const DEFAULT_CSS = `body { font-family: sans-serif; padding: 2rem; } h1 { color: #6366f1; }`;
const DEFAULT_JS = `document.getElementById('btn').addEventListener('click', () => alert('Hello from JS!'));`;

export default function CodePlayground() {
  const html = useLocalStorage<string>("uh:playground-html", DEFAULT_HTML);
  const css = useLocalStorage<string>("uh:playground-css", DEFAULT_CSS);
  const js = useLocalStorage<string>("uh:playground-js", DEFAULT_JS);

  const combined = useMemo(
    () =>
      `<html><head><style>${css.value}</style></head><body>${html.value}<script>${js.value}</script></body></html>`,
    [html.value, css.value, js.value]
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

  const handleReset = () => {
    html.reset();
    css.reset();
    js.reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="playground-html">HTML</Label>
            <Textarea
              id="playground-html"
              className="min-h-[140px] font-mono text-xs"
              value={html.value}
              onChange={(e) => html.set(e.target.value)}
              placeholder="<div>Your HTML here…</div>"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="playground-css">CSS</Label>
            <Textarea
              id="playground-css"
              className="min-h-[140px] font-mono text-xs"
              value={css.value}
              onChange={(e) => css.set(e.target.value)}
              placeholder="body { }"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="playground-js">JS</Label>
            <Textarea
              id="playground-js"
              className="min-h-[140px] font-mono text-xs"
              value={js.value}
              onChange={(e) => js.set(e.target.value)}
              placeholder="console.log('hello');"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <iframe
            title="Code playground preview"
            sandbox="allow-scripts allow-modals"
            srcDoc={srcDoc}
            className="h-[480px] w-full rounded-xl border border-border bg-white"
          />
          <p className="text-xs text-muted-foreground">
            Your code runs in a sandboxed preview frame in your own browser — nothing is sent to a server.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
