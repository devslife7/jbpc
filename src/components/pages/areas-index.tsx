import Link from "next/link";
import ContactSection from "@/components/contact-section";
import FaqSection from "@/components/faq-section";
import { Arrow } from "@/components/icons";
import InnerHero from "@/components/inner-hero";
import JsonLd from "@/components/json-ld";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import business from "@/content/business.json";
import { homeFaq } from "@/content/faqs";
import { citiesByState, type StateCode } from "@/content/locations";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { areasIndexPath, cityPath, localizePath } from "@/lib/routes";
import { webPageGraph } from "@/lib/structured-data";

export const areasIndexCopy = {
  en: { title: "Areas we serve: house & office cleaning across the DMV", description: "Cleaning services in Arlington, Alexandria, Fairfax, McLean, Reston, Washington, DC, Bethesda, Silver Spring, Rockville and more, within 50 miles of Northern Virginia." },
  es: { title: "Zonas de servicio: limpieza de casas y oficinas en todo el DMV", description: "Servicios de limpieza en Arlington, Alexandria, Fairfax, McLean, Reston, Washington, DC, Bethesda, Silver Spring, Rockville y más, hasta 50 millas del norte de Virginia." },
} as const;

const stateOrder: StateCode[] = ["VA", "DC", "MD"];

export default function AreasIndexPage({ locale }: { locale: Locale }) {
  const s = ui[locale];
  const copy = areasIndexCopy[locale];
  return (
    <>
      <JsonLd data={webPageGraph({ path: areasIndexPath, locale, name: copy.title, description: copy.description })} />
      <SiteHeader locale={locale} path={areasIndexPath} />
      <main id="main">
        <InnerHero
          locale={locale}
          crumbs={[{ name: s.breadcrumbs.areas, path: areasIndexPath }]}
          eyebrow={s.areas.eyebrow}
          title={<>{s.areas.indexTitle[0]}<br /><em>{s.areas.indexTitle[1]}</em></>}
          intro={[s.areas.indexIntro]}
        />
        <section className="page-section area-section" aria-label={s.areas.eyebrow}>
          <div className="container area-groups">
            {stateOrder.map((state) => (
              <div className="area-group" key={state} data-reveal>
                <h2>{s.areas.groups[state]}</h2>
                <ul className="area-cards">
                  {citiesByState(state).map((city) => (
                    <li key={city.slug}>
                      <Link href={localizePath(cityPath(city.slug), locale)}>
                        <strong>{city.name}{city.state !== "DC" ? `, ${city.state}` : ""} <Arrow diagonal /></strong>
                        <span>{city.copy[locale].blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="area-note" data-reveal>{s.areas.note} <a href={business.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">{s.cta.whatsapp}</a>.</p>
          </div>
        </section>
        <FaqSection locale={locale} faqs={homeFaq[locale]} />
        <ContactSection locale={locale} />
      </main>
      <SiteFooter locale={locale} path={areasIndexPath} />
    </>
  );
}
