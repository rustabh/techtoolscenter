"use client";

import { Undo2, Redo2, RotateCcw, Copy, Download, Copy as Duplicate, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionBarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  onReset?: () => void;
  onDuplicate?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  copied?: boolean;
  downloadLabel?: string;
}

export function ActionBar({
  onUndo, onRedo, onReset, onDuplicate, onCopy, onDownload,
  canUndo, canRedo, copied, downloadLabel = "Download",
}: ActionBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {onUndo && (
        <Button variant="outline" size="sm" onClick={onUndo} disabled={!canUndo} aria-label="Undo">
          <Undo2 /> Undo
        </Button>
      )}
      {onRedo && (
        <Button variant="outline" size="sm" onClick={onRedo} disabled={!canRedo} aria-label="Redo">
          <Redo2 /> Redo
        </Button>
      )}
      {onDuplicate && (
        <Button variant="outline" size="sm" onClick={onDuplicate} aria-label="Duplicate">
          <Duplicate /> Duplicate
        </Button>
      )}
      {onCopy && (
        <Button variant="outline" size="sm" onClick={onCopy} aria-label="Copy">
          {copied ? <Check className="text-emerald-500" /> : <Copy />} {copied ? "Copied" : "Copy"}
        </Button>
      )}
      {onReset && (
        <Button variant="outline" size="sm" onClick={onReset} aria-label="Reset">
          <RotateCcw /> Reset
        </Button>
      )}
      {onDownload && (
        <Button size="sm" onClick={onDownload} aria-label={downloadLabel}>
          <Download /> {downloadLabel}
        </Button>
      )}
    </div>
  );
}
