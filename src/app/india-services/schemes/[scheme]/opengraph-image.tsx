import { getScheme, schemes } from "@/lib/india/schemes";
import { renderIndiaOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/india-og";

export const alt = "Government scheme";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return schemes.map((s) => ({ scheme: s.slug }));
}

export default async function Image({ params }: { params: { scheme: string } }) {
  const s = getScheme(params.scheme);
  return renderIndiaOg({
    badge: "Government Scheme",
    title: s?.name ?? "Government Scheme",
    subtitle: s?.tagline,
  });
}
