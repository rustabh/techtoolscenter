"use client";

import { Check, Copy, History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopy } from "@/hooks/use-copy";
import type { HistoryEntry } from "@/hooks/use-generation-history";

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}

export function GenerationHistoryPanel({
  history,
  onRemove,
  onClear,
  onRestore,
  emptyLabel = "Nothing generated yet — your past results will show up here.",
}: {
  history: HistoryEntry[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onRestore?: (value: string) => void;
  emptyLabel?: string;
}) {
  const { copied, copy } = useCopy();

  if (!history.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center text-muted-foreground">
        <History className="size-8 opacity-40" />
        <p className="text-sm">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">History ({history.length})</p>
        <Button variant="ghost" size="sm" onClick={onClear}>Clear all</Button>
      </div>
      <div className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
        {history.map((entry) => (
          <div key={entry.id} className="flex items-center gap-2 rounded-lg border border-border p-2 text-sm">
            <button
              type="button"
              onClick={() => onRestore?.(entry.value)}
              className={`min-w-0 flex-1 truncate text-left font-mono text-xs ${onRestore ? "hover:text-primary" : ""}`}
              title={entry.value}
              disabled={!onRestore}
            >
              {entry.value}
            </button>
            <span className="shrink-0 text-[10px] text-muted-foreground">{entry.meta ?? timeAgo(entry.createdAt)}</span>
            <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={() => copy(entry.value)} aria-label="Copy">
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="size-7 shrink-0" onClick={() => onRemove(entry.id)} aria-label="Remove from history">
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
