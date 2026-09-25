import business from "@/content/business.json";
import { ogAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: business.tagline, subtitle: business.description, locale: "en" });
}
