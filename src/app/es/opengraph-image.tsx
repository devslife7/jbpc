import business from "@/content/business.json";
import { home } from "@/content/home";
import { ogAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({ title: home.es.hero.title.join(" "), subtitle: home.es.metaDescription.replace(` Llame al ${business.contact.phone}.`, ""), locale: "es" });
}
