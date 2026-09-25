import { areasIndexCopy } from "@/components/pages/areas-index";
import { ogAlt, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const copy = areasIndexCopy.en;
  return renderOgImage({ title: copy.title, subtitle: copy.description, locale: "en" });
}
