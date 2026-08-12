"use client";

import { useEffect, useState } from "react";
import { FileCheck } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionBar } from "@/components/tools/action-bar";
import { downloadBlob } from "@/lib/utils";
import { FileDropzone } from "@/components/tools/file-dropzone";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
type Algo = (typeof ALGOS)[number];

async function hashBytes(algo: Algo, data: BufferSource) {
  const buf = await crypto.subtle.digest(algo, data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const { value, set, undo, redo, reset, canUndo, canRedo } = useLocalStorage<string>("uh:hash", "TechToolsCenter");
  const [algo, setAlgo] = useState<Algo>("SHA-256");
  const [mode, setMode] = useState<"text" | "file">("text");
  const [file, setFile] = useState<File | null>(null);
  const [digest, setDigest] = useState("");
  const [error, setError] = useState("");
  const [expected, setExpected] = useState("");
  const [busy, setBusy] = useState(false);
  const { copied, copy } = useCopy();

  useEffect(() => {
    if (mode !== "text") return;
    if (!crypto.subtle) {
      setError("Hashing needs a secure context (HTTPS) — this browser can't run it here.");
      return;
    }
    let active = true;
    hashBytes(algo, new TextEncoder().encode(value))
      .then((h) => { if (active) { setDigest(h); setError(""); } })
      .catch(() => { if (active) setError("Couldn't compute the hash — try again."); });
    return () => { active = false; };
  }, [value, algo, mode]);

  const onFile = (f: File) => setFile(f);

  // Hashes the selected file, re-running whenever the file or algorithm
  // changes (so switching SHA-256 → SHA-1 on an already-loaded file doesn't
  // require re-dropping it).
  useEffect(() => {
    if (mode !== "file" || !file) return;
    let active = true;
    setBusy(true);
    setError("");
    file.arrayBuffer()
      .then((buf) => hashBytes(algo, buf))
      .then((h) => { if (active) setDigest(h); })
      .catch(() => { if (active) setError("Couldn't read or hash this file — try again."); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [mode, file, algo]);

  const expectedMatch = expected.trim()
    ? expected.trim().toLowerCase() === digest.toLowerCase()
      ? "match"
      : "mismatch"
    : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["text", "file"] as const).map((m) => (
          <Button key={m} variant={mode === m ? "default" : "outline"} size="sm" onClick={() => { setMode(m); setDigest(""); setFile(null); setError(""); }} className="capitalize">
            {m === "file" ? "File checksum" : "Text"}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 pt-6">
            {mode === "text" ? (
              <Textarea aria-label="Text to hash" className="min-h-[200px]" value={value} onChange={(e) => set(e.target.value)} placeholder="Text to hash…" />
            ) : (
              <FileDropzone
                icon={FileCheck}
                title={file ? file.name : "Click or drop any file here"}
                subtitle={file ? `${(file.size / 1024).toFixed(1)} KB · processed locally` : "Compute a checksum to verify a download"}
                onFiles={(files) => files[0] && onFile(files[0])}
              />
            )}
            <div className="flex flex-wrap gap-2">
              {ALGOS.map((a) => (
                <Button key={a} size="sm" variant={algo === a ? "default" : "outline"} onClick={() => setAlgo(a)}>{a}</Button>
              ))}
            </div>
            {mode === "text" ? (
              <ActionBar onUndo={undo} onRedo={redo} onReset={reset} canUndo={canUndo} canRedo={canRedo} />
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Expected checksum (optional — paste to verify)</label>
                <Input value={expected} onChange={(e) => setExpected(e.target.value)} placeholder="Paste the published checksum here…" className="font-mono text-xs" />
                {expectedMatch && (
                  <p className={`text-sm font-medium ${expectedMatch === "match" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                    {expectedMatch === "match" ? "✓ Matches — file is verified" : "✗ Doesn't match — file may be corrupted or tampered with"}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="space-y-4 pt-6">
            <p className="text-xs font-medium text-muted-foreground">{algo} digest</p>
            {error ? (
              <p className="min-h-[200px] rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
            ) : (
              <pre className="min-h-[200px] overflow-auto whitespace-pre-wrap break-all rounded-xl bg-secondary/50 p-4 font-mono text-xs">{busy ? "Hashing…" : digest}</pre>
            )}
            <ActionBar
              onCopy={() => copy(digest)}
              copied={copied}
              onDownload={digest ? () => downloadBlob(new Blob([digest], { type: "text/plain" }), `${algo.toLowerCase()}.txt`) : undefined}
              downloadLabel="Download .txt"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
