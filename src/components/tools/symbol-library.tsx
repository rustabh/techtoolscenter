"use client";

import { useMemo, useState } from "react";
import { Search, Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Sym { c: string; name: string; cat: string; wide?: boolean }

// Each symbol gets its own searchable name — the category alone isn't enough
// to find e.g. a checkmark inside "Unicode" or an up-arrow inside "Arrows".
const GROUPS: Record<string, [string, string][]> = {
  Hearts: [
    ["♡", "heart outline"], ["♥", "heart"], ["❤", "red heart"], ["❣", "heart exclamation"],
    ["❥", "rotated heart"], ["❦", "floral heart"], ["❧", "rotated floral heart"], ["💗", "growing heart"],
    ["💓", "beating heart"], ["💕", "two hearts"], ["💖", "sparkling heart"], ["💝", "heart with ribbon"],
    ["💘", "heart with arrow"], ["♁", "earth"],
  ],
  Arrows: [
    ["←", "left arrow"], ["→", "right arrow"], ["↑", "up arrow"], ["↓", "down arrow"],
    ["↔", "left right arrow"], ["↕", "up down arrow"], ["⇐", "double left arrow"], ["⇒", "double right arrow"],
    ["⇑", "double up arrow"], ["⇓", "double down arrow"], ["⇔", "double left right arrow"], ["↖", "up left arrow"], ["↗", "up right arrow"],
    ["↘", "down right arrow"], ["↙", "down left arrow"], ["➤", "arrowhead right"], ["➜", "round tip right arrow"],
    ["➔", "heavy right arrow"], ["➙", "right arrow"], ["➛", "drafting point right arrow"], ["➝", "triangle right arrow"],
    ["➞", "heavy triangle right arrow"], ["➟", "dashed right arrow"], ["➠", "heavy dashed right arrow"],
    ["➡", "black right arrow"], ["⟶", "long right arrow"], ["⟵", "long left arrow"],
  ],
  Stars: [
    ["★", "black star"], ["☆", "white star"], ["✦", "four point star"], ["✧", "white four point star"],
    ["✩", "outlined white star"], ["✪", "circled star"], ["✫", "open centre star"], ["✬", "star with white centre"],
    ["✭", "outlined star"], ["✮", "heavy outlined star"], ["✯", "pinwheel star"], ["⭐", "star"],
    ["🌟", "glowing star"], ["✰", "shadowed white star"], ["⍟", "circled star alt"],
  ],
  Currency: [
    ["$", "dollar"], ["€", "euro"], ["£", "pound"], ["¥", "yen / yuan"], ["₹", "rupee"], ["₽", "ruble"],
    ["¢", "cent"], ["₩", "won"], ["₪", "shekel"], ["₫", "dong"], ["₭", "kip"], ["₦", "naira"],
    ["₱", "peso"], ["₲", "guarani"], ["₴", "hryvnia"], ["₵", "cedi"], ["฿", "baht"],
  ],
  Math: [
    ["±", "plus minus"], ["×", "multiplication"], ["÷", "division"], ["≠", "not equal"],
    ["≈", "approximately equal"], ["≤", "less than or equal"], ["≥", "greater than or equal"], ["∞", "infinity"],
    ["∑", "sum"], ["∏", "product"], ["√", "square root"], ["∫", "integral"], ["∆", "delta"], ["π", "pi"],
    ["Ω", "omega"], ["µ", "micro"], ["°", "degree"], ["∂", "partial derivative"], ["∇", "nabla"],
    ["∈", "element of"], ["∉", "not element of"], ["⊂", "subset"], ["⊃", "superset"], ["∪", "union"],
    ["∩", "intersection"], ["∀", "for all"], ["∃", "there exists"],
  ],
  Music: [
    ["♪", "eighth note"], ["♫", "beamed eighth notes"], ["♬", "beamed sixteenth notes"], ["♩", "quarter note"],
    ["♭", "flat"], ["♮", "natural"], ["♯", "sharp"], ["🎵", "musical note"], ["🎶", "musical notes"], ["𝄞", "treble clef"],
  ],
  Phone: [
    ["☎", "telephone"], ["☏", "white telephone"], ["✆", "phone recorder"], ["📞", "telephone receiver"],
    ["📱", "mobile phone"], ["📲", "mobile phone with arrow"],
  ],
  Weather: [
    ["☀", "sun"], ["☁", "cloud"], ["☂", "umbrella"], ["☃", "snowman"], ["☄", "comet"], ["☾", "crescent moon"],
    ["☽", "moon"], ["❄", "snowflake"], ["⛄", "snowman without snow"], ["⚡", "lightning bolt"], ["🌈", "rainbow"],
    ["☔", "umbrella with rain"], ["☼", "sun with rays"],
  ],
  Gaming: [
    ["⚔", "crossed swords"], ["🎮", "game controller"], ["🕹", "joystick"], ["♛", "queen"], ["♚", "king"],
    ["♜", "rook"], ["♞", "knight"], ["⚡", "lightning"], ["☠", "skull and crossbones"], ["✞", "cross"],
    ["⚜", "fleur-de-lis"], ["🛡", "shield"],
  ],
  Chess: [
    ["♔", "white king"], ["♕", "white queen"], ["♖", "white rook"], ["♗", "white bishop"], ["♘", "white knight"],
    ["♙", "white pawn"], ["♚", "black king"], ["♛", "black queen"], ["♜", "black rook"], ["♝", "black bishop"],
    ["♞", "black knight"], ["♟", "black pawn"],
  ],
  Bullets: [
    ["•", "bullet"], ["◦", "white bullet"], ["‣", "triangular bullet"], ["⁃", "hyphen bullet"],
    ["∙", "dot operator"], ["·", "middle dot"], ["▪", "black small square"], ["▫", "white small square"],
    ["●", "black circle"], ["○", "white circle"], ["◘", "inverse bullet"], ["◙", "inverse white circle"],
    ["■", "black square"], ["□", "white square"], ["▶", "right triangle"], ["►", "right pointer"], ["▸", "small right triangle"],
  ],
  Boxes: [
    ["─", "horizontal line"], ["│", "vertical line"], ["┌", "top left corner"], ["┐", "top right corner"],
    ["└", "bottom left corner"], ["┘", "bottom right corner"], ["├", "left tee"], ["┤", "right tee"],
    ["┬", "top tee"], ["┴", "bottom tee"], ["┼", "cross"], ["═", "double horizontal line"],
    ["║", "double vertical line"], ["╔", "double top left corner"], ["╗", "double top right corner"],
    ["╚", "double bottom left corner"], ["╝", "double bottom right corner"], ["╠", "double left tee"],
    ["╣", "double right tee"], ["╦", "double top tee"], ["╩", "double bottom tee"], ["╬", "double cross"],
  ],
  Dividers: [
    ["✦•✦", "star line divider"], ["═══", "double line divider"], ["•───•", "dotted line divider"],
    ["━━━", "bold line divider"], ["◦◦◦", "dots divider"], ["✧･ﾟ", "sparkle divider"],
    ["»»»", "right chevron divider"], ["«««", "left chevron divider"], ["▬▬▬", "block line divider"],
    ["◈◈◈", "diamond divider"],
  ],
  Unicode: [
    ["©", "copyright"], ["®", "registered"], ["™", "trademark"], ["✓", "check mark"], ["✔", "heavy check mark"],
    ["✗", "ballot x"], ["✘", "heavy ballot x"], ["☑", "checked box"], ["☒", "crossed box"], ["☯", "yin yang"],
    ["☮", "peace symbol"], ["✎", "pencil"], ["✉", "envelope"], ["✈", "airplane"], ["✂", "scissors"],
    ["❖", "black diamond"], ["⚜", "fleur-de-lis"], ["§", "section sign"], ["¶", "pilcrow"], ["†", "dagger"],
    ["‡", "double dagger"], ["№", "numero sign"],
  ],
  Kaomoji: [
    ["(◕‿◕)", "happy"], ["(¬‿¬)", "smirk"], ["(╥﹏╥)", "crying"], ["(ノ◕ヮ◕)ノ", "excited"],
    ["¯\\_(ツ)_/¯", "shrug"], ["(╯°□°)╯︵ ┻━┻", "table flip"], ["(づ｡◕‿‿◕｡)づ", "hug"], ["(•_•)", "neutral"],
    ["( ͡° ͜ʖ ͡°)", "lenny face"], ["(｡♥‿♥｡)", "in love"], ["ʕ•ᴥ•ʔ", "bear"], ["(＾▽＾)", "happy smile"],
  ],
};

const SYMBOLS: Sym[] = Object.entries(GROUPS).flatMap(([cat, arr]) =>
  arr.map(([c, name]) => ({ c, name, cat, wide: cat === "Dividers" || cat === "Kaomoji" }))
);
const CATS = Object.keys(GROUPS);

export default function SymbolLibrary() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  // Space-insensitive so "checkmark" (the common one-word way people search)
  // still matches a name written as "check mark", and vice versa.
  const noSpace = (s: string) => s.toLowerCase().replace(/\s+/g, "");
  const filtered = useMemo(() => SYMBOLS.filter((s) => {
    const inCat = cat === "All" || s.cat === cat;
    const inQ = !q || noSpace(s.name).includes(noSpace(q)) || noSpace(s.cat).includes(noSpace(q));
    return inCat && inQ;
  }), [q, cat]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search symbols… (e.g. “checkmark”, “up arrow”)" aria-label="Search symbols" className="h-10 flex-1 bg-transparent text-sm outline-none" />
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
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">No symbols match &ldquo;{q}&rdquo; — try a different search or category.</p>
      )}
      <p className="text-center text-xs text-muted-foreground">Click any symbol to copy it.</p>
    </div>
  );
}
