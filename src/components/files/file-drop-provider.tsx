"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, UploadCloud, ArrowRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { detectFile, formatBytes, type Detected } from "@/lib/files/detect";

interface Inspected {
  detected: Detected;
  name: string;
  ext: string;
  size: number;
  type: string;
  modified: string;
  previewUrl?: string;
  dimensions?: string;
}

/** Global drag-and-drop file detector + smart inspector. Drop any file anywhere
 *  to see what it is and which tools can handle it — nothing is uploaded. */
export function FileDropProvider() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<Inspected | null>(null);

  useEffect(() => {
    let depth = 0;
    const hasFiles = (e: DragEvent) => Array.from(e.dataTransfer?.types || []).includes("Files");
    const onEnter = (e: DragEvent) => { if (hasFiles(e)) { depth++; setDragging(true); } };
    const onOver = (e: DragEvent) => { if (hasFiles(e)) e.preventDefault(); };
    const onLeave = () => { depth = Math.max(0, depth - 1); if (depth === 0) setDragging(false); };
    const onDrop = async (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      depth = 0;
      setDragging(false);
      const f = e.dataTransfer?.files?.[0];
      if (f) await inspect(f);
    };
    window.addEventListener("dragenter", onEnter);
    window.addEventListener("dragover", onOver);
    window.addEventListener("dragleave", onLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onEnter);
      window.removeEventListener("dragover", onOver);
      window.removeEventListener("dragleave", onLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  const inspect = async (f: File) => {
    const detected = detectFile(f);
    const info: Inspected = {
      detected,
      name: f.name,
      ext: f.name.includes(".") ? f.name.split(".").pop()!.toUpperCase() : "—",
      size: f.size,
      type: f.type || "unknown",
      modified: f.lastModified ? new Date(f.lastModified).toLocaleString() : "—",
    };
    if (detected.category === "image" && f.type !== "image/svg+xml") {
      try {
        const url = URL.createObjectURL(f);
        const img = new Image();
        await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
        info.previewUrl = url;
        info.dimensions = `${img.naturalWidth} × ${img.naturalHeight}px`;
      } catch { /* ignore */ }
    }
    setFile(info);
  };

  return (
    <>
      {/* Drag overlay */}
      {dragging && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="rounded-3xl border-2 border-dashed border-primary bg-card p-12 text-center shadow-2xl">
            <UploadCloud className="mx-auto size-12 text-primary" />
            <p className="mt-4 text-lg font-bold">Drop your file anywhere</p>
            <p className="mt-1 text-sm text-muted-foreground">We&apos;ll detect it and suggest the right tools — nothing is uploaded.</p>
          </div>
        </div>
      )}

      {/* Inspector modal */}
      {file && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={() => setFile(null)}>
          <div className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border p-4">
              <p className="flex items-center gap-2 font-semibold"><Icon name={file.detected.icon} className="size-5 text-primary" /> {file.detected.label} detected</p>
              <button onClick={() => setFile(null)} aria-label="Close" className="rounded-lg p-1 text-muted-foreground hover:bg-secondary"><X className="size-5" /></button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-4">
              <div className="flex gap-4">
                {file.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={file.previewUrl} alt="" className="size-24 shrink-0 rounded-xl border border-border object-cover" />
                ) : (
                  <span className="grid size-24 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon name={file.detected.icon} className="size-8" /></span>
                )}
                <dl className="min-w-0 flex-1 space-y-1 text-sm">
                  <Row label="Name" value={file.name} />
                  <Row label="Type" value={`${file.ext} · ${file.type}`} />
                  <Row label="Size" value={formatBytes(file.size)} />
                  {file.dimensions && <Row label="Dimensions" value={file.dimensions} />}
                  <Row label="Modified" value={file.modified} />
                </dl>
              </div>

              <p className="mt-5 mb-2 text-sm font-semibold">Recommended tools</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {file.detected.actions.map((a) => (
                  <Link key={a.href + a.label} href={a.href} onClick={() => setFile(null)}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-secondary">
                    {a.label}
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">Your file was inspected privately in your browser and never uploaded.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 flex-1 truncate font-medium">{value}</dd>
    </div>
  );
}
