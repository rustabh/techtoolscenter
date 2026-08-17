"use client";

import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";

// JSON.parse's SyntaxError message format differs by engine: V8 (Chrome,
// Edge, Node) gives a 0-based character offset ("...at position 42"), while
// Firefox/Safari give "line X column Y" directly. Neither engine reports
// both, and most people staring at a wall of pasted JSON need "line 7" a lot
// more than a raw offset — so normalize whichever one we got into both.
function locateError(source: string, message: string): { line: number; column: number; index: number } | null {
  const lc = message.match(/line (\d+)[^\d]+column (\d+)/i);
  if (lc) {
    const line = Number(lc[1]), column = Number(lc[2]);
    const lines = source.split("\n");
    let index = 0;
    for (let i = 0; i < line - 1 && i < lines.length; i++) index += lines[i].length + 1;
    return { line, column, index: Math.min(index + column - 1, source.length) };
  }
  const pos = message.match(/position (\d+)/i);
  if (pos) {
    const index = Number(pos[1]);
    const before = source.slice(0, index);
    return { line: before.split("\n").length, column: index - before.lastIndexOf("\n"), index };
  }
  return null;
}

// Recursively rebuilds every plain object with its keys alphabetized so
// JSON.stringify emits them in sorted order — JSON itself doesn't define key
// order, but a diff-friendly, deterministic order is often exactly what
// someone reaching for "beautify" wants (e.g. comparing two API responses).
function sortKeysDeep(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(sortKeysDeep);
  if (v !== null && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(v as Record<string, unknown>).sort()) {
      out[k] = sortKeysDeep((v as Record<string, unknown>)[k]);
    }
    return out;
  }
  return v;
}

const INDENT_OPTIONS = [
  { label: "2 spaces", value: "2" },
  { label: "4 spaces", value: "4" },
  { label: "Tab", value: "tab" },
];

export default function JsonFormatter() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:json", '{"name":"TechToolsCenter","tools":31,"free":true}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [errorLoc, setErrorLoc] = useState<{ line: number; column: number; index: number } | null>(null);
  const [indent, setIndent] = useState<"2" | "4" | "tab">("2");
  const [sortKeys, setSortKeys] = useState(false);
  const { copied, copy } = useCopy();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const run = (mode: "beautify" | "minify") => {
    if (!value.trim()) {
      setError("Paste some JSON first");
      setErrorLoc(null);
      setOutput("");
      return;
    }
    try {
      let parsed = JSON.parse(value);
      if (sortKeys) parsed = sortKeysDeep(parsed);
      const space = mode === "minify" ? 0 : indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(parsed, null, space));
      setError("");
      setErrorLoc(null);
    } catch (e) {
      const message = (e as Error).message;
      setError(message);
      setErrorLoc(locateError(value, message));
      setOutput("");
    }
  };

  const jumpToError = () => {
    if (!errorLoc || !inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.setSelectionRange(errorLoc.index, errorLoc.index + 1);
  };

  // Ctrl/Cmd+Enter beautifies without leaving the textarea.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        run("beautify");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, indent, sortKeys]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea ref={inputRef} aria-label="JSON input" className="min-h-[320px] font-mono text-xs" value={value} onChange={(e) => set(e.target.value)} placeholder="Paste JSON here…" />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={() => run("beautify")} title="Ctrl/Cmd+Enter">Beautify</Button>
            <Button size="sm" variant="outline" onClick={() => run("minify")}>Minify</Button>
            <Select aria-label="Indent width" value={indent} onChange={(e) => setIndent(e.target.value as "2" | "4" | "tab")} className="h-9 w-auto text-xs">
              {INDENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
              <input type="checkbox" checked={sortKeys} onChange={(e) => setSortKeys(e.target.checked)} className="size-3.5 accent-[hsl(var(--primary))]" />
              Sort keys
            </label>
            <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
            <span className="ml-auto hidden text-xs text-muted-foreground sm:inline">Ctrl/Cmd+Enter to beautify</span>
          </div>
        </CardContent>
      </Card>
      <Card className={error ? "border-destructive/50" : ""}>
        <CardContent className="space-y-4 pt-6">
          {error ? (
            <div className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
              <p>Invalid JSON: {error}</p>
              {errorLoc && (
                <button type="button" onClick={jumpToError} className="mt-2 font-medium underline underline-offset-2 hover:no-underline">
                  Jump to line {errorLoc.line}, column {errorLoc.column}
                </button>
              )}
            </div>
          ) : (
            <pre className="min-h-[320px] overflow-auto rounded-xl bg-secondary/50 p-4 text-xs">{output || "Formatted output appears here…"}</pre>
          )}
          {output && (
            <ActionBar
              onCopy={() => copy(output)}
              copied={copied}
              onDownload={() => downloadBlob(new Blob([output], { type: "application/json" }), "formatted.json")}
              downloadLabel="Download"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
