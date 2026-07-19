import { getIndiaService, indiaServices } from "@/lib/india/services";
import { renderIndiaOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/india-og";

export const alt = "India Services guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return indiaServices.map((s) => ({ category: s.category, service: s.slug }));
}

export default async function Image({ params }: { params: { category: string; service: string } }) {
  const s = getIndiaService(params.service);
  return renderIndiaOg({
    badge: "India Services",
    title: s?.name ?? "India Services",
    subtitle: s?.officialName,
  });
}
