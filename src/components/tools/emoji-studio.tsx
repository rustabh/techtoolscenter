"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Star, Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Emoji { c: string; name: string; cat: string }

const DATA: Record<string, Record<string, string>> = {
  Smileys: { "😀": "grin", "😃": "smile", "😄": "happy", "😁": "beam", "😆": "laugh", "😅": "sweat", "🤣": "rofl", "😂": "joy tears", "🙂": "slight smile", "😉": "wink", "😊": "blush", "😇": "angel", "🥰": "love", "😍": "heart eyes", "😘": "kiss", "😜": "tongue", "🤪": "zany", "😎": "cool sunglasses", "🥳": "party", "😏": "smirk", "😢": "cry", "😭": "sob", "😤": "triumph", "😡": "angry", "🥺": "pleading", "😴": "sleep", "🤔": "thinking", "🙄": "eye roll", "😬": "grimace", "🤯": "mind blown", "😳": "flushed", "🥶": "cold", "🤗": "hug", "🤩": "star struck" },
  Gestures: { "👍": "thumbs up", "👎": "thumbs down", "👌": "ok", "✌️": "peace", "🤞": "fingers crossed", "🤙": "call me", "👏": "clap", "🙌": "raise hands", "🙏": "pray thanks", "💪": "muscle", "👋": "wave", "🤝": "handshake", "✊": "fist", "👊": "punch", "🫶": "heart hands", "🤟": "love you", "👇": "point down", "👆": "point up", "👉": "point right", "👈": "point left" },
  People: { "😺": "cat face", "👶": "baby", "🧑": "person", "👨": "man", "👩": "woman", "🧔": "beard", "👮": "police", "🕵️": "detective", "👨‍💻": "developer", "🧑‍🍳": "chef", "🦸": "hero", "🧙": "wizard", "👻": "ghost", "🤖": "robot", "👽": "alien", "💀": "skull", "🎅": "santa" },
  Animals: { "🐶": "dog", "🐱": "cat", "🐭": "mouse", "🐹": "hamster", "🐰": "rabbit", "🦊": "fox", "🐻": "bear", "🐼": "panda", "🐨": "koala", "🐯": "tiger", "🦁": "lion", "🐮": "cow", "🐷": "pig", "🐸": "frog", "🐵": "monkey", "🦄": "unicorn", "🐝": "bee", "🦋": "butterfly", "🐢": "turtle", "🐙": "octopus", "🦕": "dino", "🐬": "dolphin" },
  Food: { "🍎": "apple", "🍌": "banana", "🍉": "watermelon", "🍓": "strawberry", "🍒": "cherry", "🍑": "peach", "🍍": "pineapple", "🥑": "avocado", "🍔": "burger", "🍟": "fries", "🍕": "pizza", "🌮": "taco", "🍿": "popcorn", "🍩": "donut", "🍪": "cookie", "🎂": "cake", "🍦": "ice cream", "☕": "coffee", "🍺": "beer", "🍷": "wine", "🥤": "soda" },
  Travel: { "✈️": "plane", "🚗": "car", "🚕": "taxi", "🚌": "bus", "🚂": "train", "🚀": "rocket", "🚁": "helicopter", "⛵": "sailboat", "🚢": "ship", "🏝️": "island", "🏔️": "mountain", "🗼": "tower", "🏠": "house", "🌍": "earth", "🌙": "moon", "⭐": "star", "🌈": "rainbow", "🔥": "fire", "💧": "water" },
  Activities: { "⚽": "soccer", "🏀": "basketball", "🏈": "football", "⚾": "baseball", "🎾": "tennis", "🏐": "volleyball", "🎱": "8ball", "🏆": "trophy", "🥇": "gold medal", "🎮": "game", "🎯": "dart", "🎲": "dice", "🎸": "guitar", "🎤": "mic", "🎧": "headphones", "🎨": "art", "🎬": "movie", "🎉": "party popper", "🎁": "gift" },
  Objects: { "💻": "laptop", "📱": "phone", "⌚": "watch", "📷": "camera", "💡": "idea bulb", "🔦": "flashlight", "🔑": "key", "🔒": "lock", "💰": "money bag", "💳": "card", "📅": "calendar", "📌": "pin", "✏️": "pencil", "📚": "books", "✂️": "scissors", "🔔": "bell", "🔋": "battery", "🧲": "magnet", "⚙️": "gear" },
  Symbols: { "❤️": "red heart", "🧡": "orange heart", "💛": "yellow heart", "💚": "green heart", "💙": "blue heart", "💜": "purple heart", "🖤": "black heart", "💯": "hundred", "✅": "check", "❌": "cross", "⭐": "star sym", "❗": "exclaim", "❓": "question", "♻️": "recycle", "⚠️": "warning", "🚫": "no", "💤": "zzz", "💢": "anger", "💥": "boom" },
};

const TRANSLATE: Record<string, string> = { love: "❤️", happy: "😊", sad: "😢", fire: "🔥", cool: "😎", star: "⭐", music: "🎵", food: "🍔", pizza: "🍕", coffee: "☕", dog: "🐶", cat: "🐱", money: "💰", party: "🎉", rocket: "🚀", sun: "☀️", moon: "🌙", heart: "❤️", laugh: "😂", cry: "😭", ok: "👍", yes: "✅", no: "❌", think: "🤔", sleep: "😴", win: "🏆", gift: "🎁", idea: "💡", time: "⏰", phone: "📱", home: "🏠", car: "🚗", plane: "✈️" };

const ALL: Emoji[] = Object.entries(DATA).flatMap(([cat, m]) => Object.entries(m).map(([c, name]) => ({ c, name, cat })));
const CATS = Object.keys(DATA);
const FAV_KEY = "ttc:emoji-fav", RECENT_KEY = "ttc:emoji-recent";

export default function EmojiStudio() {
  const [tab, setTab] = useState<"browse" | "translate" | "combine">("browse");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [fav, setFav] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const { copied, copy } = useCopy();
  const [last, setLast] = useState("");

  useEffect(() => {
    try { setFav(JSON.parse(localStorage.getItem(FAV_KEY) || "[]")); setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) || "[]")); } catch { /* ignore */ }
  }, []);
  const save = (k: string, v: string[]) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

  const pick = (c: string) => {
    copy(c); setLast(c);
    const next = [c, ...recent.filter((r) => r !== c)].slice(0, 24);
    setRecent(next); save(RECENT_KEY, next);
  };
  const toggleFav = (c: string) => {
    const next = fav.includes(c) ? fav.filter((f) => f !== c) : [c, ...fav];
    setFav(next); save(FAV_KEY, next);
  };

  const filtered = useMemo(() => ALL.filter((e) => {
    const inCat = cat === "All" || e.cat === cat;
    const inQ = !q || e.name.includes(q.toLowerCase()) || e.cat.toLowerCase().includes(q.toLowerCase());
    return inCat && inQ;
  }), [q, cat]);

  const Grid = ({ items }: { items: string[] }) => (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
      {items.map((c, i) => (
        <div key={c + i} className="group relative">
          <button onClick={() => pick(c)} className="grid aspect-square w-full place-items-center rounded-xl border border-border bg-card text-2xl transition-colors hover:border-primary/40 hover:bg-secondary">
            {copied && last === c ? <Check className="size-4 text-emerald-500" /> : c}
          </button>
          <button onClick={() => toggleFav(c)} aria-label={fav.includes(c) ? `Remove ${c} from favorites` : `Add ${c} to favorites`} className="absolute -right-1 -top-1 rounded-full bg-background p-0.5 opacity-0 shadow group-hover:opacity-100">
            <Star className={cn("size-3", fav.includes(c) && "fill-amber-400 text-amber-400")} />
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["browse", "translate", "combine"] as const).map((t) => (
          <Button key={t} size="sm" variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)} className="capitalize">{t}</Button>
        ))}
      </div>

      {tab === "browse" && (
        <>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3">
                <Search className="size-4 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search emoji…" aria-label="Search emoji" className="h-10 flex-1 bg-transparent text-sm outline-none" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["All", ...CATS].map((c) => (
                  <Button key={c} size="sm" variant={cat === c ? "default" : "outline"} onClick={() => setCat(c)}>{c}</Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {fav.length > 0 && !q && cat === "All" && (<div><p className="mb-2 flex items-center gap-1.5 text-sm font-semibold"><Star className="size-4 fill-amber-400 text-amber-400" /> Favorites</p><Grid items={fav} /></div>)}
          {recent.length > 0 && !q && cat === "All" && (<div><p className="mb-2 text-sm font-semibold">Recently used</p><Grid items={recent} /></div>)}
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">No emoji match &ldquo;{q}&rdquo; — try a different search or category.</p>
          ) : (
            <Grid items={filtered.map((e) => e.c)} />
          )}
        </>
      )}

      {tab === "translate" && <EmojiTranslate />}
      {tab === "combine" && <EmojiCombine onCopy={pick} />}
    </div>
  );
}

function EmojiTranslate() {
  const [text, setText] = useState("I love coffee and pizza on a sunny day");
  const { copied, copy } = useCopy();
  const out = useMemo(() => text.split(/(\s+)/).map((w) => TRANSLATE[w.toLowerCase().replace(/[^a-z]/g, "")] ? `${w}${TRANSLATE[w.toLowerCase().replace(/[^a-z]/g, "")]}` : w).join(""), [text]);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardContent className="pt-6"><Textarea className="min-h-[180px]" value={text} onChange={(e) => setText(e.target.value)} aria-label="Text" /></CardContent></Card>
      <Card className="bg-gradient-to-br from-primary/5 to-transparent"><CardContent className="space-y-4 pt-6">
        <p className="min-h-[140px] whitespace-pre-wrap rounded-xl bg-secondary/50 p-4 text-lg">{out}</p>
        <Button onClick={() => copy(out)}>{copied ? "Copied!" : "Copy"}</Button>
      </CardContent></Card>
    </div>
  );
}

function EmojiCombine({ onCopy }: { onCopy: (c: string) => void }) {
  const [a, setA] = useState("🔥"), [b, setB] = useState("❤️");
  const common = ["🔥", "❤️", "😎", "✨", "💯", "🚀", "⭐", "😂", "🎉", "👑", "💀", "🌈"];
  const combined = a + b;
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-4 text-4xl">
        <span className="grid size-16 place-items-center rounded-2xl border border-border">{a}</span>
        <span className="text-muted-foreground">+</span>
        <span className="grid size-16 place-items-center rounded-2xl border border-border">{b}</span>
        <span className="text-muted-foreground">=</span>
        <button onClick={() => onCopy(combined)} className="grid h-16 min-w-16 place-items-center rounded-2xl border border-primary/40 bg-primary/10 px-3">{combined}</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><p className="mb-2 text-sm font-medium">First emoji</p><div className="flex flex-wrap gap-2">{common.map((e) => <button key={e} onClick={() => setA(e)} className="grid size-10 place-items-center rounded-lg border border-border text-xl hover:bg-secondary">{e}</button>)}</div></div>
        <div><p className="mb-2 text-sm font-medium">Second emoji</p><div className="flex flex-wrap gap-2">{common.map((e) => <button key={e} onClick={() => setB(e)} className="grid size-10 place-items-center rounded-lg border border-border text-xl hover:bg-secondary">{e}</button>)}</div></div>
      </div>
      <p className="text-center text-xs text-muted-foreground">Tap the result to copy the combined emoji pair.</p>
    </div>
  );
}
