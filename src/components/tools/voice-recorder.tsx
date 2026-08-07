"use client";

import { useEffect, useRef, useState } from "react";
import { MicVocal, Square, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadBlob, formatBytes } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

function pickMimeType(): string {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  for (const c of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported?.(c)) return c;
  }
  return "";
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function VoiceRecorder() {
  const [supported, setSupported] = useState(true);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState<{ url: string; blob: Blob; mime: string } | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSupported(typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined");
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = pickMimeType();
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mime || "audio/webm" });
        if (result) URL.revokeObjectURL(result.url);
        setResult({ url: URL.createObjectURL(blob), blob, mime: mime || "audio/webm" });
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      recorderRef.current = recorder;
      setSeconds(0);
      setRecording(true);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      showToast("Microphone access denied — allow it in your browser settings", "error");
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const clear = () => {
    if (result) URL.revokeObjectURL(result.url);
    setResult(null);
    setSeconds(0);
  };

  const download = () => {
    if (!result) return;
    const ext = result.mime.includes("mp4") ? "m4a" : "webm";
    downloadBlob(result.blob, `recording.${ext}`);
  };

  if (!supported) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Audio recording isn&apos;t supported in this browser or context. Make sure you&apos;re on a modern browser (Chrome, Edge, Firefox, Safari) over HTTPS.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader><CardTitle>Voice Recorder</CardTitle></CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-secondary/30 p-8">
          <div className={`grid size-20 place-items-center rounded-full ${recording ? "animate-pulse bg-destructive/15 text-destructive" : "bg-primary/10 text-primary"}`}>
            <MicVocal className="size-9" />
          </div>
          <p className="font-mono text-2xl font-bold tabular-nums">{formatDuration(seconds)}</p>
          {recording ? (
            <Button variant="destructive" size="lg" onClick={stop}><Square /> Stop recording</Button>
          ) : (
            <Button size="lg" onClick={start}><MicVocal /> {result ? "Record again" : "Start recording"}</Button>
          )}
        </div>

        {result && (
          <div className="space-y-3">
            <audio controls src={result.url} className="w-full" />
            <p className="text-xs text-muted-foreground">{formatBytes(result.blob.size)} · {result.mime.split(";")[0]}</p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={download}><Download /> Download</Button>
              <Button variant="ghost" onClick={clear}><Trash2 /> Discard</Button>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Recording happens entirely in your browser — audio is never uploaded anywhere.</p>
      </CardContent>
    </Card>
  );
}
