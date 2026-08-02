"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

const DEFAULT_HTML = `<h1>Hello!</h1>\n<button id="btn">Click me</button>`;
const DEFAULT_CSS = `body { font-family: sans-serif; padding: 2rem; } h1 { color: #6366f1; }`;
const DEFAULT_JS = `document.getElementById('btn').addEventListener('click', () => alert('Hello from JS!'));`;

// Catches runtime errors inside the sandboxed preview and relays them to the
// parent page — otherwise a broken script fails silently in an iframe console
// the user never opens.
const ERROR_RELAY = `<script>
window.addEventListener('error', (e) => parent.postMessage({ ttcPlaygroundError: e.message }, '*'));
window.addEventListener('unhandledrejection', (e) => parent.postMessage({ ttcPlaygroundError: String(e.reason) }, '*'));
</script>`;

function buildDoc(htmlSrc: string, cssSrc: string, jsSrc: string, withErrorRelay: boolean) {
  // Error relay must be registered before the user's script runs, otherwise a
  // synchronous top-level throw fires before the listener even exists.
  return `<html><head>${withErrorRelay ? ERROR_RELAY : ""}<style>${cssSrc}</style></head><body>${htmlSrc}<script>${jsSrc}</script></body></html>`;
}

export default function CodePlayground() {
  const html = useLocalStorage<string>("uh:playground-html", DEFAULT_HTML);
  const css = useLocalStorage<string>("uh:playground-css", DEFAULT_CSS);
  const js = useLocalStorage<string>("uh:playground-js", DEFAULT_JS);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);

  const combined = useMemo(
    () => buildDoc(html.value, css.value, js.value, true),
    [html.value, css.value, js.value]
  );

  const [srcDoc, setSrcDoc] = useState(combined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRuntimeError(null);
    timeoutRef.current = setTimeout(() => {
      setSrcDoc(combined);
    }, 400);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [combined]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data && typeof e.data.ttcPlaygroundError === "string") setRuntimeError(e.data.ttcPlaygroundError);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const handleReset = () => {
    html.reset();
    css.reset();
    js.reset();
    showToast("Reset to default code");
  };

  const downloadHtml = () => {
    downloadBlob(new Blob([buildDoc(html.value, css.value, js.value, false)], { type: "text/html" }), "playground.html");
    showToast("Downloaded playground.html");
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
            <Button type="button" size="sm" variant="outline" onClick={downloadHtml}>
              Download HTML
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {runtimeError && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
              Script error: {runtimeError}
            </p>
          )}
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
