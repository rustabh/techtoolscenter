"use client";

import { useEffect, useState } from "react";
import { Download, X, Sparkles, RefreshCw } from "lucide-react";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "ttc:pwa-dismissed";

export function PwaProvider() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
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

  // Capture the install prompt (Chrome/Edge/Android). Never re-show after dismissal.
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      if (localStorage.getItem(DISMISS_KEY)) return;
      setDeferred(e as BIPEvent);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    localStorage.setItem(DISMISS_KEY, "1");
    setShowInstall(false);
    setDeferred(null);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1"); // never show again
    setShowInstall(false);
  };

  const applyUpdate = () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg?.waiting?.postMessage("SKIP_WAITING");
    });
    setUpdateReady(false);
  };

  return (
    <>
      {updateReady && (
        <button onClick={applyUpdate}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
          <RefreshCw className="size-4" /> A new version is available — tap to update
        </button>
      )}

      {showInstall && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 sm:left-auto sm:right-4 sm:max-w-sm">
          <div className="animate-[slideUp_0.35s_ease-out] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-start gap-3 p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Install TechToolsCenter</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Use all your favourite tools directly from your desktop or mobile.</p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <li>✔ Fast launch</li>
                  <li>✔ App-like experience</li>
                  <li>✔ Works offline (supported tools)</li>
                  <li>✔ No app store required</li>
                </ul>
                <div className="mt-3 flex gap-2">
                  <button onClick={install} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    <Download className="size-4" /> Install now
                  </button>
                  <button onClick={dismiss} className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">Not now</button>
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
