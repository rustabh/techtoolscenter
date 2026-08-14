"use client";

import { useEffect, useState } from "react";
import { Download, X, Sparkles, RefreshCw, Share, PlusSquare, MoreVertical } from "lucide-react";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "ttc:pwa-dismissed";
type Mode = null | "native" | "ios" | "manual";

export function PwaProvider() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [mode, setMode] = useState<Mode>(null);
  const [updateReady, setUpdateReady] = useState(false);

  // Register the service worker + watch for updates (auto-refresh on new deploy).
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    navigator.serviceWorker.register("/sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener("statechange", () => {
          if (nw.state === "installed" && navigator.serviceWorker.controller) setUpdateReady(true);
        });
      });
    }).catch(() => {});
  }, []);

  // Decide which install prompt to show (native / iOS steps / manual fallback).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const isMobile = window.matchMedia("(max-width: 768px)").matches || /android|iphone|ipad|ipod|mobile/i.test(ua);
    if (isStandalone) return; // already installed

    // Chrome/Edge/Android fire this — preferred one-tap install.
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setMode("native");
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS Safari never fires the event — show Add-to-Home-Screen steps instead.
    if (isIOS) {
      const t = setTimeout(() => setMode((m) => m ?? "ios"), 1500);
      return () => { clearTimeout(t); window.removeEventListener("beforeinstallprompt", onPrompt); };
    }

    // Other mobile browsers that don't fire the event: manual fallback.
    let t: ReturnType<typeof setTimeout> | undefined;
    if (isMobile) t = setTimeout(() => setMode((m) => m ?? "manual"), 3500);

    return () => { if (t) clearTimeout(t); window.removeEventListener("beforeinstallprompt", onPrompt); };
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    localStorage.setItem(DISMISS_KEY, "1");
    setMode(null);
    setDeferred(null);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1"); // never show again
    setMode(null);
  };

  const applyUpdate = () => {
    navigator.serviceWorker.getRegistration().then((reg) => reg?.waiting?.postMessage("SKIP_WAITING"));
    setUpdateReady(false);
  };

  return (
    <>
      {updateReady && (
        <button onClick={applyUpdate}
          className="fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg md:bottom-0">
          <RefreshCw className="size-4" /> A new version is available — tap to update
        </button>
      )}

      {/* bottom offset clears the fixed mobile tab bar's real height (content
          + the device's own safe-area inset, which a plain px guess doesn't
          account for) plus a little breathing room; md:bottom-4 restores the
          original placement once the tab bar is no longer present (it's
          hidden at the same md breakpoint). */}
      {mode && (
        <div className="fixed inset-x-0 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 p-4 md:bottom-4 md:left-auto md:right-4 md:max-w-sm">
          <div className="animate-[slideUp_0.35s_ease-out] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-start gap-3 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Install TechToolsCenter</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Use all your favourite tools directly from your desktop or mobile.</p>

                {mode === "ios" ? (
                  <ol className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex flex-wrap items-center gap-1.5">1. Tap the <Share className="size-3.5 shrink-0 text-primary" /> Share button in Safari</li>
                    <li className="flex flex-wrap items-center gap-1.5">2. Choose <PlusSquare className="size-3.5 shrink-0 text-primary" /> “Add to Home Screen”</li>
                    <li>3. Tap “Add” — done! 🎉</li>
                  </ol>
                ) : mode === "manual" ? (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                    <MoreVertical className="mt-0.5 size-3.5 shrink-0 text-primary" />
                    Open your browser menu and choose “Install app” / “Add to Home screen”.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <li>✔ Fast launch</li>
                    <li>✔ App-like experience</li>
                    <li>✔ Works offline (supported tools)</li>
                    <li>✔ No app store required</li>
                  </ul>
                )}

                <div className="mt-3 flex gap-2">
                  {mode === "native" && (
                    <button onClick={install} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                      <Download className="size-4" /> Install now
                    </button>
                  )}
                  <button onClick={dismiss} className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
                    {mode === "native" ? "Not now" : "Got it"}
                  </button>
                </div>
              </div>
              <button onClick={dismiss} aria-label="Dismiss" className="rounded-lg p-1 text-muted-foreground hover:bg-secondary"><X className="size-4" /></button>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes slideUp{from{transform:translateY(120%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
    </>
  );
}
