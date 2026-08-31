import { allPosts, getPost } from "@/lib/blog/posts";
import { getBlogCategory } from "@/lib/blog/categories";
import { renderSiteOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/site-og";

export const alt = "TechToolsCenter blog";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const cat = post ? getBlogCategory(post.category) : undefined;
  return renderSiteOg({
    badge: cat?.name ?? "Blog",
    title: post?.title ?? "TechToolsCenter Blog",
    subtitle: post?.excerpt,
  });
}
