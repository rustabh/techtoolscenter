export type PostType = "feature" | "bug" | "idea" | "tool-request" | "announcement" | "roadmap";
export type PostStatus = "open" | "planned" | "in-progress" | "released" | "rejected";
export type Priority = "low" | "medium" | "high";

export interface CommunityPost {
  id: string;
  type: PostType;
  title: string;
  description: string;
  category?: string;
  useCase?: string;
  priority?: Priority;
  email?: string;
  status: PostStatus;
  votes: number; // baseline score (seed posts) or starting score (user posts)
  createdAt: string; // ISO date
  author?: string;
  seeded?: boolean;
}

export type SortMode = "popular" | "newest" | "most-requested";
export type Section = "feature" | "bug" | "idea" | "roadmap" | "announcement";
