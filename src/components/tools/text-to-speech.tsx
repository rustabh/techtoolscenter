"use client";

import { useEffect, useState } from "react";
import { Eraser, Play, Pause, Square, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SAMPLE = "Welcome to TechToolsCenter's free Text to Speech tool. Type or paste anything here, pick a voice, and press play to hear it read aloud — right in your browser, with nothing uploaded.";

// Chrome and Safari can silently cut off very long single utterances, so
// long text is split into sentence-sized chunks and queued — the browser's
// speechSynthesis engine plays queued utterances back to back automatically.
function splitIntoChunks(text: string, maxLen = 200): string[] {
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const chunks: string[] = [];
  let current = "";
  const flush = () => { if (current.trim()) chunks.push(current.trim()); current = ""; };
  for (const sentence of sentences) {
    if (sentence.length > maxLen) {
      for (const word of sentence.split(/\s+/)) {
        if ((current + " " + word).trim().length > maxLen) { flush(); current = word; }
        else current = (current + " " + word).trim();
      }
      continue;
    }
    if ((current + " " + sentence).trim().length > maxLen) { flush(); current = sentence; }
    else current = (current + " " + sentence).trim();
  }
  flush();
  return chunks;
}

export default function TextToSpeech() {
  const [supported, setSupported] = useState(true);
  const [text, setText] = useState(SAMPLE);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const loadVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length) {
        setVoices(list);
        setVoiceURI((prev) => prev || list.find((v) => v.lang.startsWith("en-IN"))?.voiceURI || list.find((v) => v.lang.startsWith("en"))?.voiceURI || list[0].voiceURI);
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!supported || !text.trim()) return;
    window.speechSynthesis.cancel();
    const chunks = splitIntoChunks(text);
    const voice = voices.find((v) => v.voiceURI === voiceURI);
    chunks.forEach((chunk, i) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      if (voice) utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      if (i === 0) utterance.onstart = () => { setSpeaking(true); setPaused(false); };
      if (i === chunks.length - 1) {
        utterance.onend = () => { setSpeaking(false); setPaused(false); };
        utterance.onerror = () => { setSpeaking(false); setPaused(false); };
      }
      window.speechSynthesis.speak(utterance);
    });
  };

  const clearText = () => {
    stop();
    setText("");
  };

  const loadSample = () => {
    stop();
    setText(SAMPLE);
  };

  const togglePause = () => {
    if (!speaking) return;
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  if (!supported) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          <Volume2 className="mx-auto mb-3 size-10 opacity-40" />
          <p>Text to Speech isn&apos;t supported in this browser. Try Chrome, Edge, or Safari.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Text</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} placeholder="Type or paste text to read aloud…" />
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-muted-foreground">{text.length} characters · runs entirely in your browser, nothing is uploaded.</p>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" onClick={loadSample}>Load sample</Button>
              <Button variant="outline" size="sm" onClick={clearText} disabled={!text}>
                <Eraser className="size-4" /> Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader><CardTitle>Voice & playback</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="tts-voice">Voice</Label>
            <Select id="tts-voice" value={voiceURI} onChange={(e) => setVoiceURI(e.target.value)}>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
              ))}
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tts-rate">Speed: {rate.toFixed(1)}×</Label>
            <input id="tts-rate" type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tts-pitch">Pitch: {pitch.toFixed(1)}</Label>
            <input id="tts-pitch" type="range" min={0} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tts-volume">Volume: {Math.round(volume * 100)}%</Label>
            <input id="tts-volume" type="range" min={0} max={1} step={0.05} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={speaking && !paused ? togglePause : speaking ? togglePause : speak} className="flex-1">
              {speaking && !paused ? <Pause className="size-4" /> : <Play className="size-4" />}
              {speaking ? (paused ? "Resume" : "Pause") : "Play"}
            </Button>
            <Button variant="outline" onClick={stop} disabled={!speaking}>
              <Square className="size-4" /> Stop
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
