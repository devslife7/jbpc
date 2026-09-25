import { servicesIndexCopy } from "@/components/pages/services-index";
import { ogAlt, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const copy = servicesIndexCopy.es;
  return renderOgImage({ title: copy.title, subtitle: copy.description, locale: "es" });
}
