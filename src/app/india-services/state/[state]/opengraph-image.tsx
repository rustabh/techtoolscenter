import { getIndiaState, indiaStates } from "@/lib/india/states";
import { renderIndiaOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/seo/india-og";

export const alt = "State government services";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return indiaStates.map((s) => ({ state: s.slug }));
}

export default async function Image({ params }: { params: { state: string } }) {
  const st = getIndiaState(params.state);
  return renderIndiaOg({
    badge: "State Services",
    title: st ? `${st.name} Government Services` : "State Government Services",
    subtitle: st?.portalName,
  });
}
