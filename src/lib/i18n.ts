export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A value that has one variant per supported locale. */
export type Localized<T> = Record<Locale, T>;

export const localeNames: Record<Locale, string> = { en: "English", es: "Español" };
export const ogLocale: Record<Locale, string> = { en: "en_US", es: "es_US" };
export const htmlLang: Record<Locale, string> = { en: "en", es: "es" };

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
