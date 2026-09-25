import { cityTitle } from "@/components/pages/city-page";
import { cities, getCity } from "@/content/locations";
import { ogAlt, ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getCity(slug) ?? cities[0];
  return renderOgImage({ title: cityTitle(city.name, city.state, "en"), subtitle: city.copy.en.blurb, locale: "en" });
}
