"use client";

import { useMemo, useState } from "react";
import { Download, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

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
    const url = new URL(trimmed);
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

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Video link</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>YouTube URL or video ID</Label>
            <Input
              value={input}
              onChange={(e) => { setInput(e.target.value); setUnavailable({}); }}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
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
        <CardHeader><CardTitle>Thumbnails</CardTitle></CardHeader>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/${q.key}.jpg`}
                    alt={`${q.label} thumbnail`}
                    className="aspect-video w-full rounded-lg border border-border object-cover"
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (q.key !== "default" && img.naturalWidth <= 120) markUnavailable(q.key);
                    }}
                    onError={() => markUnavailable(q.key)}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{q.label}</p>
                      <p className="text-xs text-muted-foreground">{q.size}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => download(q.key)}>
                      <Download className="size-4" />
                    </Button>
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
