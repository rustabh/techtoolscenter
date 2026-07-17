"use client";

import { useMemo, useState } from "react";
import { Search, Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Sym { c: string; name: string; cat: string; wide?: boolean }

const GROUPS: Record<string, string[]> = {
  Hearts: "♡♥❤❣❥❦❧💗💓💕💖💝💘♁".split(""),
  Arrows: "←→↑↓↔↕⇐⇒⇑⇓⇔↖↗↘↙➤➜➔➙➛➝➞➟➠➡⟶⟵".split(""),
  Stars: "★☆✦✧✩✪✫✬✭✮✯⭐🌟✰⍟".split(""),
  Currency: "$€£¥₹₽¢₩₪₫₭₦₱₲₴₵฿".split(""),
  Math: "±×÷≠≈≤≥∞∑∏√∫∆πΩµ°∂∇∈∉⊂⊃∪∩∀∃".split(""),
  Music: "♪♫♬♩♭♮♯🎵🎶𝄞".split(""),
  Phone: "☎☏✆📞📱📲".split(""),
  Weather: "☀☁☂☃☄☾☽❄⛄⚡🌈☔☼".split(""),
  Gaming: "⚔🎮🕹♛♚♜♞⚡☠✞⚜🛡".split(""),
  Chess: "♔♕♖♗♘♙♚♛♜♝♞♟".split(""),
  Bullets: "•◦‣⁃∙·▪▫●○◘◙■□▶►▸".split(""),
  Boxes: "─│┌┐└┘├┤┬┴┼═║╔╗╚╝╠╣╦╩╬".split(""),
  Dividers: ["✦•✦", "═══", "•───•", "━━━", "◦◦◦", "✧･ﾟ", "»»»", "«««", "▬▬▬", "◈◈◈"],
  Unicode: "©®™✓✔✗✘☑☒☯☮✎✉✈✂❖⚜§¶†‡№".split(""),
  Kaomoji: ["(◕‿◕)", "(¬‿¬)", "(╥﹏╥)", "(ノ◕ヮ◕)ノ", "¯\\_(ツ)_/¯", "(╯°□°)╯︵ ┻━┻", "(づ｡◕‿‿◕｡)づ", "(•_•)", "( ͡° ͜ʖ ͡°)", "(｡♥‿♥｡)", "ʕ•ᴥ•ʔ", "(＾▽＾)"],
};

const SYMBOLS: Sym[] = Object.entries(GROUPS).flatMap(([cat, arr]) =>
  arr.map((c) => ({ c, name: cat.toLowerCase(), cat, wide: cat === "Dividers" || cat === "Kaomoji" }))
);
const CATS = Object.keys(GROUPS);

export default function SymbolLibrary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  const filtered = useMemo(() => SYMBOLS.filter((s) => {
    const inCat = cat === "All" || s.cat === cat;
    const inQ = !q || s.name.includes(q.toLowerCase()) || s.cat.toLowerCase().includes(q.toLowerCase());
    return inCat && inQ;
  }), [q, cat]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search symbols…" aria-label="Search symbols" className="h-10 flex-1 bg-transparent text-sm outline-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...CATS].map((c) => (
              <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>{c}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className={filtered.some((s) => s.wide) ? "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4" : "grid grid-cols-6 gap-2 sm:grid-cols-10"}>
        {filtered.map((s, i) => (
          <button key={i} onClick={() => { copy(s.c); setLast(s.c + i); }} title={s.name}
            className={`grid place-items-center rounded-xl border border-border bg-card transition-colors hover:border-primary/40 hover:bg-secondary ${s.wide ? "px-2 py-3 text-sm" : "aspect-square text-2xl"}`}>
            {copied && last === s.c + i ? <Check className="size-4 text-emerald-500" /> : s.c}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">Click any symbol to copy it.</p>
    </div>
  );
}
