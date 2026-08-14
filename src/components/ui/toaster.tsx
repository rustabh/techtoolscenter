"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

interface Toast { id: number; message: string; kind: "success" | "info" | "error" }
const EVT = "ttc:toast";

/** Fire a toast from anywhere: `showToast("Downloaded")` or `showToast("Couldn't process file", "error")`. */
export function showToast(message: string, kind: "success" | "info" | "error" = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVT, { detail: { message, kind } }));
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let n = 0;
    const onToast = (e: Event) => {
      const { message, kind } = (e as CustomEvent).detail as { message: string; kind: "success" | "info" | "error" };
      const id = ++n;
      setToasts((t) => [...t, { id, message, kind }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    };
    window.addEventListener(EVT, onToast);
    return () => window.removeEventListener(EVT, onToast);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-1/2 z-[80] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-4">
      {toasts.map((t) => (
        <div key={t.id}
          className="pointer-events-auto flex animate-[toastIn_0.25s_ease-out] items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-lg">
          {t.kind === "success" && <CheckCircle2 className="size-4 text-emerald-500" />}
          {t.kind === "info" && <Info className="size-4 text-primary" />}
          {t.kind === "error" && <AlertCircle className="size-4 text-destructive" />}
          {t.message}
          <button onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} aria-label="Dismiss" className="ml-1 text-muted-foreground hover:text-foreground"><X className="size-3.5" /></button>
        </div>
      ))}
      <style>{`@keyframes toastIn{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </div>
  );
}
