import { LogoMark } from "@/components/logo";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5">
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-2xl bg-primary/30" />
        <LogoMark className="relative h-14 w-14 animate-pulse" />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-primary" />
      </div>
    </div>
  );
}
