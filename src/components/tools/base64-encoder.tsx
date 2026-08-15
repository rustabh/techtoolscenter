"use client";

import { useMemo, useState } from "react";
import { FileUp } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";
import { FileDropzone } from "@/components/tools/file-dropzone";

// URL-safe Base64 (RFC 4648 §5) swaps the two characters that aren't safe
// unescaped in a URL or filename (+ and /) for - and _, and conventionally
// drops the trailing = padding — used by JWTs, URL query params and
// filesystem-safe names.
function toUrlSafe(b64: string) {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromUrlSafe(s: string) {
  const withStandardChars = s.replace(/-/g, "+").replace(/_/g, "/");
  const padded = withStandardChars + "=".repeat((4 - (withStandardChars.length % 4)) % 4);
  return padded;
}

function encode(s: string, urlSafe: boolean) {
  try {
    const b64 = btoa(unescape(encodeURIComponent(s)));
    return urlSafe ? toUrlSafe(b64) : b64;
  } catch {
    return "⚠ Couldn't encode this text (it may contain an invalid character)";
  }
}
function decode(s: string, urlSafe: boolean) {
  try {
    const b64 = urlSafe ? fromUrlSafe(s.trim()) : s.trim();
    return decodeURIComponent(escape(atob(b64)));
  } catch {
    return "⚠ Invalid Base64 input";
  }
}

export default function Base64Encoder() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:base64", "Hello, TechToolsCenter!");
  const [mode, setMode] = useState<"encode" | "decode" | "file">("encode");
  const [file, setFile] = useState<{ name: string; base64: string; mime: string } | null>(null);
  const [includeDataUri, setIncludeDataUri] = useState(true);
  const [urlSafe, setUrlSafe] = useState(false);
  const { copied, copy } = useCopy();

  const output = useMemo(() => {
    if (mode === "file") {
      if (!file) return "";
      return includeDataUri ? `data:${file.mime};base64,${file.base64}` : file.base64;
    }
    return mode === "encode" ? encode(value, urlSafe) : decode(value, urlSafe);
  }, [value, mode, file, includeDataUri, urlSafe]);

  const onFile = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
      setFile({ name: f.name, base64, mime: f.type || "application/octet-stream" });
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["encode", "decode", "file"] as const).map((m) => (
          <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => setMode(m)} className="capitalize">{m === "file" ? "File → Base64" : m}</Button>
        ))}
      </div>
      {mode === "file" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <FileDropzone
                icon={FileUp}
                title={file ? file.name : "Click or drop any file here"}
                subtitle={file ? file.mime : "Images, PDFs, any file type · processed locally"}
                onFiles={(files) => files[0] && onFile(files[0])}
              />
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={includeDataUri} onChange={(e) => setIncludeDataUri(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
                Include <code className="font-mono text-xs">data:mime;base64,</code> prefix
              </label>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="space-y-4 pt-6">
              <pre className="min-h-[220px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-secondary/50 p-4 font-mono text-xs">{output || "Base64 output appears here…"}</pre>
              <ActionBar
                onCopy={() => copy(output)}
                copied={copied}
                onDownload={output ? () => downloadBlob(new Blob([output], { type: "text/plain" }), `${file?.name ?? "file"}.base64.txt`) : undefined}
                downloadLabel="Download .txt"
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <Textarea aria-label="Input" className="min-h-[220px] font-mono text-sm" value={value} onChange={(e) => set(e.target.value)} placeholder={mode === "encode" ? "Text to encode…" : "Base64 to decode…"} />
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="size-4 accent-[hsl(var(--primary))]" />
                URL-safe (<code className="font-mono text-xs">-</code>/<code className="font-mono text-xs">_</code> instead of <code className="font-mono text-xs">+</code>/<code className="font-mono text-xs">/</code>, no padding) — used by JWTs and URL parameters
              </label>
              <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="space-y-4 pt-6">
              <pre className="min-h-[220px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-secondary/50 p-4 font-mono text-sm">{output}</pre>
              <ActionBar
                onCopy={() => copy(output)}
                copied={copied}
                onDownload={() => downloadBlob(new Blob([output], { type: "text/plain" }), mode === "encode" ? "encoded.txt" : "decoded.txt")}
                downloadLabel="Download .txt"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
