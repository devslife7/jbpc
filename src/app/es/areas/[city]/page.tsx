import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityPage, { cityDescription, cityKeywords, cityMetaTitle } from "@/components/pages/city-page";
import { cities, getCity } from "@/content/locations";
import { cityPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: PageProps<"/es/areas/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return buildMetadata({
    path: cityPath(city.slug),
    locale: "es",
    title: cityMetaTitle(city.name, city.state, "es"),
    description: cityDescription(city.name, "es"),
    keywords: cityKeywords(city, "es"),
  });
}

export default async function Page({ params }: PageProps<"/es/areas/[city]">) {
  const { city } = await params;
  return <CityPage slug={city} locale="es" />;
}
