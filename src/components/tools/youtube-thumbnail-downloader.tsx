"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, Copy, Download, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";
import { useCopy } from "@/hooks/use-copy";

const QUALITIES = [
  { key: "maxresdefault", label: "Max resolution", size: "1280×720" },
  { key: "sddefault", label: "Standard", size: "640×480" },
  { key: "hqdefault", label: "High quality", size: "480×360" },
  { key: "mqdefault", label: "Medium quality", size: "320×180" },
  { key: "default", label: "Default", size: "120×90" },
] as const;

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    // `new URL()` throws on scheme-less input (e.g. pasted from an address
    // bar without "https://"), which is a very common way to paste a
    // YouTube link — assume https when no scheme is present.
    const url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.slice(1, 12);
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") return url.searchParams.get("v");
      const match = url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {
    /* not a URL */
  }
  return null;
}

export default function YoutubeThumbnailDownloader() {
  const [input, setInput] = useState("");
  const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const { copy } = useCopy();

  const videoId = useMemo(() => extractVideoId(input), [input]);

  // YouTube doesn't 404 for a missing maxres/sd thumbnail — it serves a tiny
  // 120×90 grey placeholder instead, so we detect "not available" by the
  // decoded image's actual dimensions rather than a failed request.
  const markUnavailable = (key: string) => setUnavailable((prev) => ({ ...prev, [key]: true }));

  const download = async (key: string) => {
    if (!videoId) return;
    const url = `https://img.youtube.com/vi/${videoId}/${key}.jpg`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("not found");
      const blob = await res.blob();
      downloadBlob(blob, `youtube-${videoId}-${key}.jpg`);
      showToast(`Downloaded ${key}.jpg`);
    } catch {
      window.open(url, "_blank");
    }
  };

  // Downloading each available size individually meant N separate click-and-
  // save-dialog round trips for a video with N available resolutions — a ZIP
  // of everything at once is the actual thing someone comparing sizes wants.
  const downloadAll = async () => {
    if (!videoId || bulkBusy) return;
    const available = QUALITIES.filter((q) => !unavailable[q.key]);
    setBulkBusy(true);
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      let count = 0;
      for (const q of available) {
        const res = await fetch(`https://img.youtube.com/vi/${videoId}/${q.key}.jpg`);
        if (!res.ok) continue;
        const blob = await res.blob();
        // Skip YouTube's tiny grey placeholder served for resolutions this
        // particular video never had one uploaded for.
        if (q.key !== "default" && blob.size < 2000) continue;
        zip.file(`youtube-${videoId}-${q.key}.jpg`, blob);
        count++;
      }
      if (count === 0) {
        showToast("No thumbnails available to download yet", "error");
        return;
      }
      const out = await zip.generateAsync({ type: "blob" });
      downloadBlob(out, `youtube-${videoId}-thumbnails.zip`);
      showToast(`Downloaded ${count} thumbnail${count === 1 ? "" : "s"}`);
    } catch {
      showToast("Couldn't build the ZIP — try again", "error");
    } finally {
      setBulkBusy(false);
    }
  };

  const copyImageUrl = async (key: string) => {
    if (!videoId) return;
    const ok = await copy(`https://img.youtube.com/vi/${videoId}/${key}.jpg`);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 2000);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setInput(text.trim());
        setUnavailable({});
        setLoaded({});
      } else {
        showToast("Clipboard is empty", "error");
      }
    } catch {
      showToast("Couldn't read clipboard — paste the link manually", "error");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Video link</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="yt-thumb-input">YouTube URL or video ID</Label>
            <div className="flex gap-2">
              <Input
                id="yt-thumb-input"
                value={input}
                onChange={(e) => { setInput(e.target.value); setUnavailable({}); setLoaded({}); }}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              />
              <Button type="button" variant="outline" size="icon" onClick={pasteFromClipboard} aria-label="Paste from clipboard" title="Paste from clipboard">
                <Clipboard className="size-4" />
              </Button>
            </div>
          </div>
          {input.trim() && !videoId && (
            <p className="text-sm text-destructive">Couldn&apos;t find a video ID in that — paste a full YouTube link (watch, youtu.be, Shorts) or an 11-character video ID.</p>
          )}
          <p className="text-xs text-muted-foreground">
            Works with youtube.com/watch, youtu.be, Shorts and embed links. Thumbnails are fetched straight from YouTube — nothing is uploaded.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Thumbnails</CardTitle>
          {videoId && (
            <Button size="sm" variant="outline" onClick={downloadAll} disabled={bulkBusy}>
              <Download className="size-4" /> {bulkBusy ? "Zipping…" : "Download all (ZIP)"}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!videoId ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
              <Youtube className="size-10 opacity-40" />
              <p className="text-sm">Paste a YouTube link to see every thumbnail size available for that video.</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {QUALITIES.filter((q) => !unavailable[q.key]).map((q) => (
                <div key={q.key} className="space-y-2 rounded-xl border border-border p-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                    {!loaded[q.key] && <div className="absolute inset-0 skeleton" />}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/${q.key}.jpg`}
                      alt={`${q.label} thumbnail`}
                      className="size-full object-cover"
                      onLoad={(e) => {
                        const img = e.currentTarget;
                        if (q.key !== "default" && img.naturalWidth <= 120) { markUnavailable(q.key); return; }
                        setLoaded((prev) => ({ ...prev, [q.key]: true }));
                      }}
                      onError={() => markUnavailable(q.key)}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{q.label}</p>
                      <p className="text-xs text-muted-foreground">{q.size}</p>
                    </div>
                    <div className="flex gap-1.5">
                      <Button size="sm" variant="ghost" onClick={() => copyImageUrl(q.key)} aria-label="Copy image URL" title="Copy image URL">
                        {copiedKey === q.key ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => download(q.key)} aria-label={`Download ${q.label}`}>
                        <Download className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
