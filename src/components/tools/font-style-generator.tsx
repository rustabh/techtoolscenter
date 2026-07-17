"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Search } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
function byMap(map: Record<string, string>) {
  return (t: string) => [...t].map((c) => map[c] ?? map[c.toLowerCase()] ?? c).join("");
}
function combine(mark: string) {
  return (t: string) => [...t].map((c) => (c === " " ? c : c + mark)).join("");
}
function wrap(l: string, r: string) {
  return (t: string) => `${l}${t}${r}`;
}

const circled = (t: string) => [...t].map((ch) => {
  const iu = A.indexOf(ch), il = a.indexOf(ch), id = d.indexOf(ch);
  if (iu >= 0) return String.fromCodePoint(0x24b6 + iu);
  if (il >= 0) return String.fromCodePoint(0x24d0 + il);
  if (ch === "0") return "⓪";
  if (id > 0) return String.fromCodePoint(0x2460 + id - 1);
  return ch;
}).join("");
const circledNeg = (t: string) => [...t.toUpperCase()].map((ch) => { const i = A.indexOf(ch); return i >= 0 ? String.fromCodePoint(0x1f150 + i) : ch; }).join("");
const squared = (t: string) => [...t.toUpperCase()].map((ch) => { const i = A.indexOf(ch); return i >= 0 ? String.fromCodePoint(0x1f130 + i) : ch; }).join("");
const parenthesized = (t: string) => [...t].map((ch) => { const il = a.indexOf(ch); return il >= 0 ? String.fromCodePoint(0x249c + il) : ch; }).join("");
const regional = (t: string) => [...t.toUpperCase()].map((ch) => { const i = A.indexOf(ch); return i >= 0 ? String.fromCodePoint(0x1f1e6 + i) + " " : ch; }).join("");

const UPSIDE: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0", "?": "¿", "!": "¡", ".": "˙", ",": "'" };
const SMALLCAPS: Record<string, string> = { a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ", i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ", q: "Q", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ" };
const SUPER: Record<string, string> = { a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", f: "ᶠ", g: "ᵍ", h: "ʰ", i: "ⁱ", j: "ʲ", k: "ᵏ", l: "ˡ", m: "ᵐ", n: "ⁿ", o: "ᵒ", p: "ᵖ", q: "۹", r: "ʳ", s: "ˢ", t: "ᵗ", u: "ᵘ", v: "ᵛ", w: "ʷ", x: "ˣ", y: "ʸ", z: "ᶻ", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const CYR: Record<string, string> = { a: "а", b: "б", c: "ᴄ", e: "е", h: "н", k: "к", m: "м", o: "о", p: "р", r: "я", t: "т", u: "и", w: "ш", x: "х", y: "у", n: "и", d: "д", g: "г", i: "і", l: "л" };
const GREEK: Record<string, string> = { a: "α", b: "β", c: "ς", d: "δ", e: "ε", g: "γ", h: "η", i: "ι", k: "κ", l: "λ", m: "μ", n: "π", o: "θ", p: "ρ", r: "г", s: "σ", t: "τ", u: "υ", w: "ω", x: "χ", y: "γ", z: "ζ" };

interface Style { name: string; tags: string[]; fn: (t: string) => string }

const STYLES: Style[] = [
  { name: "Bold", tags: ["bold", "instagram", "facebook"], fn: byOffset(0x1d400, 0x1d41a, 0x1d7ce) },
  { name: "Italic", tags: ["italic", "instagram"], fn: byOffset(0x1d434, 0x1d44e) },
  { name: "Bold Italic", tags: ["bold", "italic"], fn: byOffset(0x1d468, 0x1d482) },
  { name: "Sans Bold", tags: ["bold", "instagram", "whatsapp"], fn: byOffset(0x1d5d4, 0x1d5ee, 0x1d7ec) },
  { name: "Sans Italic", tags: ["italic"], fn: byOffset(0x1d608, 0x1d622) },
  { name: "Sans Bold Italic", tags: ["bold", "italic"], fn: byOffset(0x1d63c, 0x1d656) },
  { name: "Monospace", tags: ["cyber", "gaming", "discord"], fn: byOffset(0x1d670, 0x1d68a, 0x1d7f6) },
  { name: "Double Struck", tags: ["fancy", "luxury"], fn: byOffset(0x1d538, 0x1d552, 0x1d7d8) },
  { name: "Script", tags: ["script", "fancy", "instagram"], fn: byOffset(0x1d49c, 0x1d4b6) },
  { name: "Script Bold", tags: ["script", "fancy", "luxury"], fn: byOffset(0x1d4d0, 0x1d4ea) },
  { name: "Fraktur", tags: ["gothic", "gaming"], fn: byOffset(0x1d504, 0x1d51e) },
  { name: "Fraktur Bold", tags: ["gothic", "luxury"], fn: byOffset(0x1d56c, 0x1d586) },
  { name: "Wide (Fullwidth)", tags: ["aesthetic", "tiktok", "cyber"], fn: byOffset(0xff21, 0xff41, 0xff10) },
  { name: "Bubble", tags: ["bubble", "cute", "instagram"], fn: circled },
  { name: "Bubble Filled", tags: ["bubble", "gaming"], fn: circledNeg },
  { name: "Squared", tags: ["squared", "gaming", "discord"], fn: squared },
  { name: "Parenthesized", tags: ["fancy"], fn: parenthesized },
  { name: "Small Caps", tags: ["fancy", "instagram"], fn: byMap(SMALLCAPS) },
  { name: "Superscript", tags: ["tiny", "cute"], fn: byMap(SUPER) },
  { name: "Upside Down", tags: ["fun"], fn: (t) => [...t.toLowerCase()].reverse().map((c) => UPSIDE[c] ?? c).join("") },
  { name: "Mirror", tags: ["fun"], fn: (t) => [...t].reverse().join("") },
  { name: "Cyrillic Style", tags: ["cyber", "gaming"], fn: byMap(CYR) },
  { name: "Greek Style", tags: ["greek", "fancy"], fn: byMap(GREEK) },
  { name: "Strikethrough", tags: ["fun"], fn: combine("̶") },
  { name: "Underline", tags: ["fun"], fn: combine("̲") },
  { name: "Overline", tags: ["fun"], fn: combine("̅") },
  { name: "Slashed", tags: ["fun"], fn: combine("̸") },
  { name: "Tilde", tags: ["cute"], fn: combine("̃") },
  { name: "Glitch", tags: ["glitch", "gaming", "cyber"], fn: (t) => [...t].map((c) => c === " " ? c : c + "҉͓͙").join("") },
  { name: "Spaced Out", tags: ["aesthetic", "tiktok"], fn: (t) => [...t].join(" ") },
  { name: "Regional", tags: ["fun", "gaming"], fn: regional },
  { name: "Hearts ♥", tags: ["cute", "instagram"], fn: wrap("♥ ", " ♥") },
  { name: "Stars ✦", tags: ["cute", "aesthetic"], fn: wrap("✦ ", " ✦") },
  { name: "Sparkle", tags: ["cute", "aesthetic", "tiktok"], fn: wrap("✧･ﾟ ", " ･ﾟ✧") },
  { name: "Royal ♛", tags: ["luxury", "gaming"], fn: wrap("♛ ", " ♛") },
  { name: "Fire 🔥", tags: ["gaming"], fn: wrap("🔥 ", " 🔥") },
  { name: "Arrows ➤", tags: ["gaming", "cyber"], fn: wrap("➤ ", " ⚔") },
  { name: "Dark ༺", tags: ["gothic", "gaming"], fn: wrap("༺ ", " ༻") },
  { name: "Wings", tags: ["gaming", "cute"], fn: wrap("᯽ ", " ᯽") },
  { name: "Bracket 【】", tags: ["cyber", "japanese"], fn: wrap("【", "】") },
];

const CATS = [
  { id: "all", label: "All" }, { id: "instagram", label: "Instagram" }, { id: "whatsapp", label: "WhatsApp" },
  { id: "discord", label: "Discord" }, { id: "tiktok", label: "TikTok" }, { id: "facebook", label: "Facebook" },
  { id: "gaming", label: "Gaming" }, { id: "luxury", label: "Luxury" }, { id: "cute", label: "Cute" },
  { id: "cyber", label: "Cyber" }, { id: "gothic", label: "Gothic" }, { id: "fancy", label: "Fancy" },
  { id: "bold", label: "Bold" }, { id: "italic", label: "Italic" }, { id: "script", label: "Script" },
  { id: "bubble", label: "Bubble" }, { id: "aesthetic", label: "Aesthetic" },
];

export default function FontStyleGenerator() {
  const { value, set } = useLocalStorage<string>("uh:fonts", "TechToolsCenter");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return STYLES
      .filter((s) => (cat === "all" || s.tags.includes(cat)) && (!query || s.name.toLowerCase().includes(query)))
      .map((s) => ({ name: s.name, text: s.fn(value || "") }));
  }, [value, cat, q]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Textarea aria-label="Your text" className="min-h-[80px] text-lg" value={value} onChange={(e) => set(e.target.value)} placeholder="Type your text…" />
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search styles…" aria-label="Search styles" className="h-9 flex-1 bg-transparent text-sm outline-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <Button key={c.id} size="sm" variant={cat === c.id ? "default" : "outline"} onClick={() => setCat(c.id)}>{c.label}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-muted-foreground">{results.length} styles</p>
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
