"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const SHORTCUTS = [
  { keys: ["Ctrl", "B"], description: "Toggle (or bring back a hidden) Workspace sidebar" },
  { keys: ["Ctrl", "K"], description: "Open quick search / command palette" },
];

export function KeyboardShortcutsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-sm rounded-2xl p-5"
            role="dialog"
            aria-label="Keyboard shortcuts"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Keyboard Shortcuts</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 space-y-2.5">
              {SHORTCUTS.map((s) => (
                <div key={s.description} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.description}</span>
                  <span className="flex gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 text-xs font-semibold">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
