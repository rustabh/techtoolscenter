"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import type { Tool } from "@/lib/tools";
import { getCategoryMeta, isNewTool } from "@/lib/tools";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
    >
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start justify-between">
          <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition-transform group-hover:scale-105">
            <Icon name={tool.icon} className="size-5" />
          </span>
          <div className="flex items-center gap-2">
            {isNewTool(tool) && <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">New</Badge>}
            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold tracking-tight">{tool.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
        </div>
        <Badge variant="secondary" className="w-fit">
          {getCategoryMeta(tool.category).label}
        </Badge>
      </Link>
    </motion.div>
  );
}
