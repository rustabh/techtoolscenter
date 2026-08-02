"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the public-site chrome (nav, footer, consent banner, chat launcher,
 * workspace sidebar) on internal-only routes, so an admin page like /admin
 * doesn't look like a page within the consumer site. Everything else renders
 * exactly as before — this only ever subtracts UI, never changes it, on
 * routes outside /admin.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
