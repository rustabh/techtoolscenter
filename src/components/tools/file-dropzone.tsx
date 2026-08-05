"use client";

import { useRef, useState, type ReactNode } from "react";
import { UploadCloud } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FileDropzoneProps {
  icon?: LucideIcon;
  title: ReactNode;
  subtitle: ReactNode;
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  /**
   * Set false when the caller renders its own click targets (e.g. separate
   * "select files" / "select folder" buttons) — the box still accepts
   * drag-and-drop, it just doesn't own a hidden input or react to a click
   * on its own background, so nested buttons don't double-trigger a picker.
   */
  clickable?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Shared drag-and-drop upload zone — used by every image/PDF tool that needs
 * a "click or drop a file here" box, so the markup, drag-state styling and
 * keyboard operability live in one place instead of being copy-pasted (and
 * drifting) across each tool.
 */
export function FileDropzone({
  icon: Icon = UploadCloud,
  title,
  subtitle,
  accept = "image/*",
  multiple,
  onFiles,
  clickable = true,
  className = "",
  children,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (list: FileList | File[] | null) => {
    if (!list) return;
    const files = Array.from(list);
    if (files.length) onFiles(files);
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? openPicker : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPicker();
              }
            }
          : undefined
      }
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      aria-label={clickable && typeof title === "string" ? title : undefined}
      className={`flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/40"
      } ${clickable ? "cursor-pointer" : ""} ${className}`}
    >
      {clickable && (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      )}
      <Icon aria-hidden className="size-8 text-primary" />
      <span className="font-medium">{title}</span>
      <span className="text-sm text-muted-foreground">{subtitle}</span>
      {children}
    </div>
  );
}
