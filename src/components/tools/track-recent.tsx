"use client";

import { useEffect } from "react";
import { useToolPrefs } from "@/hooks/use-tool-prefs";

export function TrackRecent({ slug }: { slug: string }) {
  const { addRecent } = useToolPrefs();
  useEffect(() => {
    addRecent(slug);
  }, [slug, addRecent]);
  return null;
}
