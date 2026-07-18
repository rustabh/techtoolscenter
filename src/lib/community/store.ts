"use client";

import { useCallback, useEffect, useState } from "react";
import { seedPosts } from "./seed";
import type { CommunityPost, SortMode } from "./types";

const POSTS_KEY = "ttc:community-posts";
const VOTES_KEY = "ttc:community-votes";
const EVT = "ttc:community-change";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(EVT));
  } catch {
    /* storage unavailable */
  }
}

export type NewPost = Omit<CommunityPost, "id" | "votes" | "createdAt" | "status" | "seeded"> &
  Partial<Pick<CommunityPost, "status">>;

export function useCommunity() {
  const [submissions, setSubmissions] = useState<CommunityPost[]>([]);
  const [votes, setVotes] = useState<Record<string, 1 | -1>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSubmissions(read<CommunityPost[]>(POSTS_KEY, []));
      setVotes(read<Record<string, 1 | -1>>(VOTES_KEY, {}));
    };
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const posts = [...submissions, ...seedPosts];

  const score = useCallback((p: CommunityPost) => p.votes + (votes[p.id] ?? 0), [votes]);
  const myVote = useCallback((id: string) => votes[id] ?? 0, [votes]);

  const vote = useCallback((id: string, dir: 1 | -1) => {
    const current = read<Record<string, 1 | -1>>(VOTES_KEY, {});
    if (current[id] === dir) delete current[id]; // toggle off
    else current[id] = dir;
    write(VOTES_KEY, current);
  }, []);

  const addPost = useCallback((data: NewPost): CommunityPost => {
    const post: CommunityPost = {
      ...data,
      id: `u-${Math.random().toString(36).slice(2)}`,
      votes: 1,
      status: data.status ?? "open",
      createdAt: new Date().toISOString().slice(0, 10),
      author: "You",
    };
    const current = read<CommunityPost[]>(POSTS_KEY, []);
    write(POSTS_KEY, [post, ...current]);
    // auto-upvote your own submission
    const v = read<Record<string, 1 | -1>>(VOTES_KEY, {});
    v[post.id] = 1;
    write(VOTES_KEY, v);
    return post;
  }, []);

  const sortPosts = useCallback(
    (list: CommunityPost[], mode: SortMode) => {
      const copy = [...list];
      if (mode === "newest") return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      if (mode === "most-requested")
        return copy
          .filter((p) => p.type === "tool-request" || p.type === "feature")
          .sort((a, b) => score(b) - score(a));
      return copy.sort((a, b) => score(b) - score(a)); // popular
    },
    [score],
  );

  return { posts, ready, score, myVote, vote, addPost, sortPosts };
}
