import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { allPaths, localizePath } from "@/lib/routes";
import { CONTENT_UPDATED, languageAlternates } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

function priority(path: string) {
  if (path === "/") return 1;
  if (path.startsWith("/services/") || path.startsWith("/areas/")) return 0.8;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizePath(path, locale)),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: priority(path),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
