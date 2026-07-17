"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const a = "abcdefghijklmnopqrstuvwxyz";
const d = "0123456789";

function byOffset(up: number, low: number, dig?: number) {
  return (t: string) =>
    [...t].map((ch) => {
      const iu = A.indexOf(ch), il = a.indexOf(ch), id = d.indexOf(ch);
      if (iu >= 0) return String.fromCodePoint(up + iu);
      if (il >= 0) return String.fromCodePoint(low + il);
      if (dig !== undefined && id >= 0) return String.fromCodePoint(dig + id);
      return ch;
    }).join("");
}

function byMap(map: Record<string, string>, upper = false) {
  return (t: string) => [...(upper ? t.toUpperCase() : t)].map((c) => map[c] ?? map[c.toLowerCase()] ?? c).join("");
}

const circled = (t: string) => [...t].map((ch) => {
  const iu = A.indexOf(ch), il = a.indexOf(ch), id = d.indexOf(ch);
  if (iu >= 0) return String.fromCodePoint(0x24b6 + iu);
  if (il >= 0) return String.fromCodePoint(0x24d0 + il);
  if (ch === "0") return "⓪";
  if (id > 0) return String.fromCodePoint(0x2460 + id - 1);
  return ch;
}).join("");

const squared = (t: string) => [...t.toUpperCase()].map((ch) => {
  const iu = A.indexOf(ch);
  return iu >= 0 ? String.fromCodePoint(0x1f130 + iu) : ch;
}).join("");

const UPSIDE: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0", ".": "˙", ",": "'", "?": "¿", "!": "¡" };
const SMALLCAPS: Record<string, string> = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "Q", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };

const STYLES: { name: string; fn: (t: string) => string }[] = [
  { name: "Bold", fn: byOffset(0x1d400, 0x1d41a, 0x1d7ce) },
  { name: "Italic", fn: byOffset(0x1d434, 0x1d44e) },
  { name: "Bold Italic", fn: byOffset(0x1d468, 0x1d482) },
  { name: "Sans Bold", fn: byOffset(0x1d5d4, 0x1d5ee, 0x1d7ec) },
  { name: "Sans Italic", fn: byOffset(0x1d608, 0x1d622) },
  { name: "Monospace", fn: byOffset(0x1d670, 0x1d68a, 0x1d7f6) },
  { name: "Double Struck", fn: byOffset(0x1d538, 0x1d552, 0x1d7d8) },
  { name: "Script", fn: byOffset(0x1d49c, 0x1d4b6) },
  { name: "Fraktur", fn: byOffset(0x1d504, 0x1d51e) },
  { name: "Wide", fn: byOffset(0xff21, 0xff41, 0xff10) },
  { name: "Bubble", fn: circled },
  { name: "Squared", fn: squared },
  { name: "Small Caps", fn: byMap(SMALLCAPS) },
  { name: "Upside Down", fn: (t) => [...t.toLowerCase()].reverse().map((c) => UPSIDE[c] ?? c).join("") },
  { name: "Mirror", fn: (t) => [...t].reverse().join("") },
];

export default function FontStyleGenerator() {
  const { value, set } = useLocalStorage<string>("uh:fonts", "TechToolsCenter");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  const results = useMemo(() => STYLES.map((s) => ({ name: s.name, text: s.fn(value || "") })), [value]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Textarea aria-label="Your text" className="min-h-[90px] text-lg" value={value} onChange={(e) => set(e.target.value)} placeholder="Type your text…" />
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <button key={r.name} onClick={() => { copy(r.text); setLast(r.name); }}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{r.name}</p>
              <p className="mt-0.5 truncate text-lg">{r.text || "—"}</p>
            </div>
            {copied && last === r.name ? <Check className="size-4 shrink-0 text-emerald-500" /> : <Copy className="size-4 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />}
          </button>
        ))}
      </div>
    </div>
  );
}
