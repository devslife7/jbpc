import type { Metadata, Viewport } from "next";
import business from "@/content/business.json";
import { type Locale, ogLocale, otherLocale } from "@/lib/i18n";
import { localizePath } from "@/lib/routes";
import { absoluteUrl, isProductionSite, siteUrl } from "@/lib/site";

/** Bump when page content changes materially; keeps sitemap lastModified stable between deploys. */
export const CONTENT_UPDATED = "2026-09-11";

export function languageAlternates(path: string) {
  const en = absoluteUrl(localizePath(path, "en"));
  return { en, es: absoluteUrl(localizePath(path, "es")), "x-default": en };
}

type BuildMetadataInput = {
  /** Canonical English path, e.g. "/services/deep-cleaning". */
  path: string;
  locale: Locale;
  /** A plain string goes through the layout title template; use { absolute } to opt out. */
  title: string | { absolute: string };
  description: string;
  keywords?: string[];
};

export function buildMetadata({ path, locale, title, description, keywords }: BuildMetadataInput): Metadata {
  const url = absoluteUrl(localizePath(path, locale));
  const socialTitle = typeof title === "string" ? `${title} | ${business.name}` : title.absolute;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      siteName: business.name,
      url,
      title: socialTitle,
      description,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[otherLocale(locale)]],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description },
  };
}

/** Shared by both root layouts. Page-level metadata merges on top of this. */
export function rootMetadata(locale: Locale): Metadata {
  const verification: NonNullable<Metadata["verification"]> = {};
  if (process.env.GOOGLE_SITE_VERIFICATION) verification.google = process.env.GOOGLE_SITE_VERIFICATION;
  if (process.env.BING_SITE_VERIFICATION) verification.other = { "msvalidate.01": process.env.BING_SITE_VERIFICATION };

  return {
    metadataBase: new URL(siteUrl),
    title: { template: `%s | ${business.name}`, default: `${business.name} | ${business.tagline}` },
    description: business.description,
    applicationName: business.name,
    formatDetection: { telephone: true },
    verification,
    robots: isProductionSite
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: false },
    openGraph: { type: "website", siteName: business.name, locale: ogLocale[locale] },
  };
}

export const viewport: Viewport = {
  themeColor: "#4b1988",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};
