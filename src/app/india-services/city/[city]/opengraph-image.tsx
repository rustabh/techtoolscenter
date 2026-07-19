import { getIndiaCity, indiaCities } from "@/lib/india/cities";
import { renderIndiaOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/india-og";

export const alt = "City government services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return indiaCities.map((c) => ({ city: c.slug }));
}

export default async function Image({ params }: { params: { city: string } }) {
  const c = getIndiaCity(params.city);
  return renderIndiaOg({
    badge: "City Services",
    title: c ? `Government Services in ${c.name}` : "City Government Services",
    subtitle: c?.stateName,
  });
}
