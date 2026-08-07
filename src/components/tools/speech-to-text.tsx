"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Copy, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import { downloadBlob } from "@/lib/utils";
import { showToast } from "@/components/ui/toaster";

const LANGUAGES = [
  { code: "en-IN", label: "English (India)" },
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "hi-IN", label: "Hindi" },
];

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

export default function SpeechToText() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-IN");
  const [finalText, setFinalText] = useState("");
  const [interimText, setInterimText] = useState("");
  const { copied, copy } = useCopy();
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    setSupported(!!Ctor);
  }, []);

  const toggleListening = () => {
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new Ctor();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      if (final) setFinalText((prev) => (prev ? `${prev} ${final}` : final).trim());
      setInterimText(interim);
    };
    recognition.onerror = (e) => {
      if (e.error === "not-allowed") showToast("Microphone access denied — allow it in your browser settings", "error");
      else if (e.error !== "no-speech") showToast("Speech recognition error — try again", "error");
      setListening(false);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const clear = () => {
    setFinalText("");
    setInterimText("");
  };

  const fullText = [finalText, interimText].filter(Boolean).join(" ");

  if (!supported) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Speech recognition isn&apos;t supported in this browser. Try Chrome or Edge on desktop or Android — Safari and Firefox have limited or no support for the Web Speech API.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Dictate</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="stt-lang" className="text-sm font-medium">Language</label>
            <Select id="stt-lang" value={lang} onChange={(e) => setLang(e.target.value)} disabled={listening}>
              {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </Select>
          </div>
          <Button className="w-full" size="lg" variant={listening ? "destructive" : "default"} onClick={toggleListening}>
            {listening ? <><MicOff /> Stop listening</> : <><Mic /> Start listening</>}
          </Button>
          {listening && <p className="animate-pulse text-center text-sm text-primary">Listening…</p>}
          <p className="text-xs text-muted-foreground">Audio is processed by your browser — nothing is uploaded to our servers.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Transcript</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            aria-label="Transcript"
            className="min-h-[200px]"
            value={fullText}
            onChange={(e) => setFinalText(e.target.value)}
            placeholder="Your speech will appear here…"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => copy(fullText)} disabled={!fullText}>
              {copied ? <Check className="text-emerald-500" /> : <Copy />} Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadBlob(new Blob([fullText], { type: "text/plain" }), "transcript.txt")} disabled={!fullText}>
              Download .txt
            </Button>
            <Button variant="ghost" size="sm" onClick={clear} disabled={!fullText}><Trash2 /> Clear</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
