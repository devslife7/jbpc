import business from "@/content/business.json";
import { cities } from "@/content/locations";
import type { Faq } from "@/content/faqs";
import { getServiceFacts, servicesSeo, type ServiceSeo } from "@/content/services-seo";
import type { Locale } from "@/lib/i18n";
import { cityPath, localizePath, servicePath } from "@/lib/routes";
import { absoluteUrl, siteUrl } from "@/lib/site";

/**
 * schema.org graphs. Deliberately omits `address` (publicAddress is null),
 * `aggregateRating` and `review` (testimonials are placeholders) and any
 * price. schema.org has no cleaning-specific LocalBusiness subtype;
 * HomeAndConstructionBusiness ("services around homes and buildings") is the
 * closest, so both types are declared with LocalBusiness first.
 */
const BUSINESS_ID = `${siteUrl}/#business`;
const WEBSITE_ID = `${siteUrl}/#website`;

const languageNames = { en: ["English", "Spanish"], es: ["Inglés", "Español"] } as const;

function areaServed() {
  const { geoMidpoint, radiusMeters } = business.serviceArea;
  return [
    {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: geoMidpoint.latitude, longitude: geoMidpoint.longitude },
      geoRadius: radiusMeters,
    },
    ...cities.map((city) => ({
      "@type": city.kind === "district" ? "AdministrativeArea" : "City",
      name: city.name,
      sameAs: city.sameAs,
      containedInPlace: { "@type": "AdministrativeArea", name: city.stateName.en },
    })),
  ];
}

function serviceNode(service: ServiceSeo, locale: Locale) {
  const copy = service.copy[locale];
  const facts = getServiceFacts(service);
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath(service.slug))}#service`,
    name: copy.name,
    serviceType: service.serviceType,
    description: copy.description,
    url: absoluteUrl(localizePath(servicePath(service.slug), locale)),
    image: absoluteUrl(facts.image.src),
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServed(),
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: business.contact.phoneInternational,
      serviceUrl: absoluteUrl(localizePath("/", locale)),
      availableLanguage: languageNames[locale],
    },
  };
}

/** Sitewide graph, rendered once from the root shell. */
export function businessGraph(locale: Locale) {
  const socialUrls: (string | null)[] = [business.social.instagram.url, business.social.facebook.url];
  const sameAs = socialUrls.filter((url): url is string => Boolean(url));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": BUSINESS_ID,
        name: business.name,
        legalName: business.legalName,
        description: business.description,
        url: siteUrl,
        telephone: business.contact.phoneInternational,
        email: business.contact.email,
        image: [absoluteUrl("/assets/hero-cleaning-branded.webp"), absoluteUrl("/icons/icon-512.png")],
        logo: absoluteUrl("/icons/icon-512.png"),
        founder: { "@type": "Person", name: business.owner.name, jobTitle: business.owner.role },
        knowsLanguage: ["en", "es"],
        availableLanguage: languageNames[locale],
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: business.hours.days, opens: business.hours.opens, closes: business.hours.closes },
        ],
        areaServed: areaServed(),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "es" ? "Servicios de limpieza" : "Cleaning services",
          itemListElement: servicesSeo.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@id": `${absoluteUrl(servicePath(service.slug))}#service` },
          })),
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
      ...servicesSeo.map((service) => serviceNode(service, locale)),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteUrl,
        name: business.name,
        inLanguage: locale,
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };
}

export function faqGraph(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbGraph(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizePath(item.path, locale)),
    })),
  };
}

/** A WebPage node that ties a service or city page to the business entity. */
export function webPageGraph({ path, locale, name, description, about }: { path: string; locale: Locale; name: string; description: string; about?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(localizePath(path, locale))}#webpage`,
    url: absoluteUrl(localizePath(path, locale)),
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    about: about ? { "@id": about } : { "@id": BUSINESS_ID },
  };
}

export const serviceId = (slug: string) => `${absoluteUrl(servicePath(slug))}#service`;
export const cityPageId = (slug: string, locale: Locale) => `${absoluteUrl(localizePath(cityPath(slug), locale))}#webpage`;
