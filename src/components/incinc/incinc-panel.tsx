"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { IncincMessage } from "./incinc-message";
import type { AssistantResponse, ChatTurn } from "@/lib/incinc/types";
import { cn } from "@/lib/utils";

const SUGGESTED_PROMPTS = [
  "Compress PDF",
  "Passport Photo",
  "Invoice",
  "QR Code",
  "Build Website",
  "AI Tools",
  "Government Help",
  "Developer Resources",
];

interface Message {
  id: string;
  role: "user" | "assistant";
  text?: string;
  response?: AssistantResponse;
}

export function IncincPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(query: string) {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    const history: ChatTurn[] = messages
      .filter((m) => m.text || m.response)
      .map((m) => ({ role: m.role, text: m.text ?? m.response?.summary ?? "" }));

    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/incinc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, history }),
      });
      const data: AssistantResponse = await res.json();
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", response: data }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          response: {
            summary: "Something went wrong reaching Incinc AI. Please try again in a moment.",
            recommendedTools: [],
            relatedBlogs: [],
            officialResources: [],
            actions: [],
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: "spring", damping: 24, stiffness: 260 }}
      className="glass fixed bottom-24 right-4 z-50 flex h-[min(640px,calc(100vh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl sm:right-6"
      role="dialog"
      aria-label="Incinc AI assistant"
    >
      <header className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-primary/10 to-transparent px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-sm font-bold leading-none">Incinc AI</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Ask. Discover. Build.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Incinc AI"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div>
            <p className="text-base font-semibold">Hi 👋</p>
            <p className="mt-1 text-sm text-muted-foreground">I&apos;m Incinc AI. I can help you:</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• Find the right tools</li>
              <li>• Recommend AI platforms</li>
              <li>• Suggest workflows</li>
              <li>• Guide Government Services</li>
              <li>• Answer productivity questions</li>
              <li>• Find developer resources</li>
              <li>• Learn AI</li>
              <li>• Choose software</li>
            </ul>
            <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Start with one of these</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-secondary/50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "user" ? (
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    {m.text}
                  </div>
                ) : (
                  <div className="w-full max-w-full rounded-2xl rounded-bl-sm border border-border/60 bg-background/60 px-3.5 py-3">
                    {m.response && <IncincMessage response={m.response} />}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" /> Incinc AI is thinking…
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border/60 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe what you want to do…"
          aria-label="Message Incinc AI"
          className="flex-1 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </form>
    </motion.div>
  );
}
