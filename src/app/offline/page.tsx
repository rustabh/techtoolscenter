import type { Metadata } from "next";
import Link from "next/link";
import { WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="container-tight flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-accent text-primary">
        <WifiOff className="size-8" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">You&apos;re offline</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        No internet connection right now. Any tool you&apos;ve already opened still works offline — most of
        TechToolsCenter runs entirely in your browser. Reconnect to load new pages.
      </p>
      <div className="mt-6 flex gap-2">
        <Link href="/tools" className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open tools</Link>
        <Link href="/" className="rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-secondary">Home</Link>
      </div>
    </div>
  );
}
