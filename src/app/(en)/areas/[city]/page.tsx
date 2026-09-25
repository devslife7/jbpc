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

export async function generateMetadata({ params }: PageProps<"/areas/[city]">): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return buildMetadata({
    path: cityPath(city.slug),
    locale: "en",
    title: cityMetaTitle(city.name, city.state, "en"),
    description: cityDescription(city.name, "en"),
    keywords: cityKeywords(city, "en"),
  });
}

export default async function Page({ params }: PageProps<"/areas/[city]">) {
  const { city } = await params;
  return <CityPage slug={city} locale="en" />;
}
