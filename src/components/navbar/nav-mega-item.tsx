"use client";

import { ChevronDown } from "lucide-react";
import type { MegaMenuConfig } from "@/lib/megamenu/types";
import { cn } from "@/lib/utils";

export function NavMegaItem({
  menu, active, onActivate, onClose,
}: {
  menu: MegaMenuConfig; active: boolean; onActivate: () => void; onClose: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onClick={() => (active ? onClose() : onActivate())}
      aria-expanded={active}
      aria-haspopup="true"
      className={cn(
        "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
        active ? "bg-secondary text-foreground" : "text-muted-foreground",
      )}
    >
      {menu.label}
      <ChevronDown className={cn("size-3.5 transition-transform", active && "rotate-180")} />
    </button>
  );
}
