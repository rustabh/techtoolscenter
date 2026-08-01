"use client";

import { useMemo } from "react";
import { useToolPrefs } from "./use-tool-prefs";
import { useDevHubFavorites } from "./use-devhub-favorites";
import { getTool, getPopularTools } from "@/lib/tools";
import { getAiTool } from "@/lib/aihub/tools";
import { getDevResource } from "@/lib/devhub/resources";

export interface SidebarLinkItem {
  key: string;
  label: string;
  href: string;
  external?: boolean;
}

function resolveFavoriteKey(key: string): SidebarLinkItem | null {
  if (key.startsWith("ai:")) {
    const t = getAiTool(key.slice(3));
    return t ? { key, label: t.name, href: t.officialUrl, external: true } : null;
  }
  const dev = getDevResource(key);
  if (dev) {
    return dev.internalToolSlug
      ? { key, label: dev.name, href: `/tools/${dev.internalToolSlug}` }
      : { key, label: dev.name, href: dev.officialUrl, external: true };
  }
  const tool = getTool(key);
  return tool ? { key, label: tool.name, href: `/tools/${tool.slug}` } : null;
}

/** Real favorites/recents/trending — never fabricated, sourced from existing prefs + tool data. */
export function useSidebarDynamic() {
  const { favorites, recents, ready: toolPrefsReady } = useToolPrefs();
  const { favorites: hubFavorites, ready: hubReady } = useDevHubFavorites();

  const allFavoriteKeys = useMemo(() => {
    const combined = [...favorites, ...hubFavorites];
    return Array.from(new Set(combined));
  }, [favorites, hubFavorites]);

  const favoriteItems = useMemo(
    () => allFavoriteKeys.map(resolveFavoriteKey).filter((x): x is SidebarLinkItem => x !== null).slice(0, 8),
    [allFavoriteKeys],
  );

  const recentItems = useMemo(() => {
    return recents
      .map((slug) => {
        const t = getTool(slug);
        return t ? { key: slug, label: t.name, href: `/tools/${t.slug}` } : null;
      })
      .filter((x): x is SidebarLinkItem => x !== null)
      .slice(0, 6);
  }, [recents]);

  const trendingItems = useMemo(
    () => getPopularTools().slice(0, 6).map((t) => ({ key: t.slug, label: t.name, href: `/tools/${t.slug}` })),
    [],
  );

  return {
    ready: toolPrefsReady && hubReady,
    favoriteItems,
    recentItems,
    trendingItems,
  };
}
