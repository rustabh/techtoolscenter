"use client";

import { createContext, useContext } from "react";

export interface LatestBlogPost {
  slug: string;
  title: string;
}

// Computed server-side (see latestPostSummary in lib/blog/posts) and handed
// down from the root layout — LatestBlogWidget reads it via context instead
// of importing the full blog posts array itself, which would otherwise pull
// every post's full article body and FAQ into this client-side sidebar.
export const LatestBlogPostContext = createContext<LatestBlogPost | null>(null);

export function useLatestBlogPost(): LatestBlogPost | null {
  return useContext(LatestBlogPostContext);
}
