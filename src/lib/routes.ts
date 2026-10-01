import { cities } from "@/content/locations";
import { servicesSeo } from "@/content/services-seo";
import type { Locale } from "@/lib/i18n";

/** Prefixes a canonical (English) path for the given locale. */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  return path === "/" ? "/es" : `/es${path}`;
}

export const storyPath = "/our-story";
export const contactPath = "/contact";

export const servicesIndexPath = "/services";
export const areasIndexPath = "/areas";
export const servicePath = (slug: string) => `${servicesIndexPath}/${slug}`;
export const cityPath = (slug: string) => `${areasIndexPath}/${slug}`;

/** Every indexable canonical path, used by the sitemap and internal link hubs. */
export function allPaths(): string[] {
  return [
    "/",
    storyPath,
    contactPath,
    servicesIndexPath,
    ...servicesSeo.map((service) => servicePath(service.slug)),
    areasIndexPath,
    ...cities.map((city) => cityPath(city.slug)),
  ];
}
