"use client";

import { useEffect } from "react";
import { useToolPrefs } from "@/hooks/use-tool-prefs";
import { trackTool, recordVisit } from "@/lib/stats/stats";

export function TrackRecent({ slug }: { slug: string }) {
  const { addRecent } = useToolPrefs();
  useEffect(() => {
    addRecent(slug);
    trackTool(slug);
    recordVisit();
  }, [slug, addRecent]);
  return null;
}
