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

// Catches runtime errors AND console output inside the sandboxed preview and
// relays both to the parent page — otherwise a broken script fails silently,
// and console.log output is invisible unless you dig into the iframe's own
// devtools context (most people testing a snippet never do). A playground
// without visible console output is missing the single most common thing
// people actually write in the JS panel: console.log(...).
const ERROR_RELAY = `<script>
window.addEventListener('error', (e) => parent.postMessage({ ttcPlaygroundError: e.message }, '*'));
window.addEventListener('unhandledrejection', (e) => parent.postMessage({ ttcPlaygroundError: String(e.reason) }, '*'));
(function () {
  const stringify = (a) => { try { return typeof a === 'string' ? a : JSON.stringify(a); } catch { return String(a); } };
  ['log', 'warn', 'error', 'info'].forEach((level) => {
    const orig = console[level];
    console[level] = function (...args) {
      parent.postMessage({ ttcPlaygroundLog: { level, text: args.map(stringify).join(' ') } }, '*');
      orig.apply(console, args);
    };
  });
})();
</script>`;

function buildDoc(htmlSrc: string, cssSrc: string, jsSrc: string, withErrorRelay: boolean) {
  // Error relay must be registered before the user's script runs, otherwise a
  // synchronous top-level throw fires before the listener even exists.
  return `<html><head>${withErrorRelay ? ERROR_RELAY : ""}<style>${cssSrc}</style></head><body>${htmlSrc}<script>${jsSrc}</script></body></html>`;
}

interface ConsoleEntry { id: string; level: "log" | "warn" | "error" | "info"; text: string }

export default function CodePlayground() {
  const html = useLocalStorage<string>("uh:playground-html", DEFAULT_HTML);
  const css = useLocalStorage<string>("uh:playground-css", DEFAULT_CSS);
  const js = useLocalStorage<string>("uh:playground-js", DEFAULT_JS);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [consoleLog, setConsoleLog] = useState<ConsoleEntry[]>([]);

  const combined = useMemo(
    () => buildDoc(html.value, css.value, js.value, true),
    [html.value, css.value, js.value]
  );

  const [srcDoc, setSrcDoc] = useState(combined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRuntimeError(null);
    setConsoleLog([]);
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
      if (e.data && e.data.ttcPlaygroundLog) {
        const { level, text } = e.data.ttcPlaygroundLog;
        setConsoleLog((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, level, text }].slice(-100));
      }
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
            className="h-[360px] w-full rounded-xl border border-border bg-white"
          />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label>Console</Label>
              {consoleLog.length > 0 && (
                <Button type="button" size="sm" variant="ghost" onClick={() => setConsoleLog([])}>Clear</Button>
              )}
            </div>
            <div className="h-28 overflow-auto rounded-xl bg-secondary/50 p-2 font-mono text-xs">
              {consoleLog.length === 0 ? (
                <p className="p-1 text-muted-foreground">console.log output will appear here…</p>
              ) : (
                consoleLog.map((entry) => (
                  <p
                    key={entry.id}
                    className={
                      entry.level === "error" ? "text-destructive"
                      : entry.level === "warn" ? "text-amber-600 dark:text-amber-400"
                      : "text-foreground"
                    }
                  >
                    <span className="select-none text-muted-foreground">&gt;</span> {entry.text}
                  </p>
                ))
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Your code runs in a sandboxed preview frame in your own browser — nothing is sent to a server.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
