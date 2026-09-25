import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/contact-section";
import FaqSection from "@/components/faq-section";
import { Arrow, Sparkle } from "@/components/icons";
import InnerHero from "@/components/inner-hero";
import JsonLd from "@/components/json-ld";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import business from "@/content/business.json";
import { cityFaq } from "@/content/faqs";
import { type City, getCity } from "@/content/locations";
import { servicesSeo } from "@/content/services-seo";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { areasIndexPath, cityPath, localizePath, servicePath } from "@/lib/routes";
import { webPageGraph } from "@/lib/structured-data";

export function cityTitle(name: string, state: string, locale: Locale) {
  const label = state === "DC" ? name : `${name}, ${state}`;
  return locale === "es" ? `Limpieza de casas y oficinas en ${label}` : `House & office cleaning in ${label}`;
}

export function cityMetaTitle(name: string, state: string, locale: Locale) {
  const label = state === "DC" ? name : `${name}, ${state}`;
  return locale === "es" ? `Limpieza de Casas en ${label}` : `House Cleaning in ${label}`;
}

export function cityDescription(name: string, locale: Locale) {
  return locale === "es"
    ? `Limpieza residencial, profunda, de mudanza y de oficinas en ${name}. Atención directa de la dueña, servicio en español e inglés y presupuesto gratis. Llame al ${business.contact.phone}.`
    : `Residential, deep, move-in/move-out and office cleaning in ${name}. Owner-led, bilingual service with free estimates. Call ${business.contact.phone}.`;
}

export function cityKeywords(city: City, locale: Locale) {
  const base = locale === "es"
    ? ["limpieza de casas", "servicio de limpieza", "limpieza de oficinas", "limpieza profunda"]
    : ["house cleaning", "maid service", "office cleaning", "deep cleaning"];
  return [...base, city.name, city.county ?? city.stateName.en];
}

export default function CityPage({ slug, locale }: { slug: string; locale: Locale }) {
  const city = getCity(slug);
  if (!city) notFound();
  const s = ui[locale];
  const copy = city.copy[locale];
  const path = cityPath(city.slug);
  const stateLabel = city.stateName[locale];
  const nearby = city.nearby.map(getCity).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const locationValue = city.state === "DC" ? city.name : `${city.name}, ${city.state}`;

  return (
    <>
      <JsonLd data={webPageGraph({ path, locale, name: cityMetaTitle(city.name, city.state, locale), description: cityDescription(city.name, locale) })} />
      <SiteHeader locale={locale} path={path} />
      <main id="main">
        <InnerHero
          locale={locale}
          crumbs={[{ name: s.breadcrumbs.areas, path: areasIndexPath }, { name: city.name, path }]}
          eyebrow={s.areas.cityEyebrow(stateLabel)}
          title={cityTitle(city.name, city.state, locale)}
          intro={copy.intro}
        >
          <p className="inner-hero-note" data-reveal data-reveal-delay="220">{s.areas.cityNote}</p>
        </InnerHero>

        <section className="page-section city-services" aria-labelledby="city-services-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow"><Sparkle /> {s.services.eyebrow}</p>
              <h2 id="city-services-title">{s.areas.servicesIn(city.name)}</h2>
            </div>
            <ul className="service-cards" data-reveal data-reveal-delay="80">
              {servicesSeo.map((service) => (
                <li key={service.slug}>
                  <h3><Link href={localizePath(servicePath(service.slug), locale)}>{s.services.inCity(service.copy[locale].name, city.name)}</Link></h3>
                  <p>{copy.services[service.slug]}</p>
                  <Link className="text-link" href={localizePath(servicePath(service.slug), locale)}>{s.cta.viewService} <Arrow diagonal /></Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-section city-places" aria-labelledby="city-places-title">
          <div className="container city-places-layout">
            <div data-reveal>
              <h2 id="city-places-title" className="section-subtitle">{s.areas.neighborhoods(city.name)}</h2>
              <ul className="chip-list">
                {city.neighborhoods.map((place) => <li key={place}>{place}</li>)}
              </ul>
            </div>
            <div data-reveal data-reveal-delay="80">
              <h2 className="section-subtitle">{s.areas.nearby}</h2>
              <ul className="nearby-list">
                {nearby.map((item) => (
                  <li key={item.slug}><Link className="text-link" href={localizePath(cityPath(item.slug), locale)}>{item.name}{item.state !== "DC" ? `, ${item.state}` : ""} <Arrow diagonal /></Link></li>
                ))}
                <li><Link className="text-link" href={localizePath(areasIndexPath, locale)}>{s.cta.allAreas} <Arrow diagonal /></Link></li>
              </ul>
            </div>
          </div>
        </section>

        <FaqSection locale={locale} faqs={cityFaq(city, locale)} />
        <ContactSection locale={locale} defaultLocation={locationValue} />
      </main>
      <SiteFooter locale={locale} path={path} />
    </>
  );
}
