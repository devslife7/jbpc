import ContactSection from "@/components/contact-section";
import FaqSection from "@/components/faq-section";
import InnerHero from "@/components/inner-hero";
import JsonLd from "@/components/json-ld";
import ServicesSection from "@/components/services-section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { homeFaq } from "@/content/faqs";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { servicesIndexPath } from "@/lib/routes";
import { webPageGraph } from "@/lib/structured-data";

export const servicesIndexCopy = {
  en: { title: "Cleaning services for homes & offices in Northern Virginia", description: "Residential, deep, move-in/move-out and office cleaning across Northern Virginia, Washington, DC and Maryland. Owner-led, bilingual, free estimates." },
  es: { title: "Servicios de limpieza para casas y oficinas en el norte de Virginia", description: "Limpieza residencial, profunda, de mudanza y de oficinas en el norte de Virginia, Washington, DC y Maryland. Atención de la dueña, en español, presupuesto gratis." },
} as const;

export default function ServicesIndexPage({ locale }: { locale: Locale }) {
  const s = ui[locale];
  const copy = servicesIndexCopy[locale];
  return (
    <>
      <JsonLd data={webPageGraph({ path: servicesIndexPath, locale, name: copy.title, description: copy.description })} />
      <SiteHeader locale={locale} path={servicesIndexPath} />
      <main id="main">
        <InnerHero
          locale={locale}
          crumbs={[{ name: s.breadcrumbs.services, path: servicesIndexPath }]}
          eyebrow={s.services.eyebrow}
          title={<>{s.services.indexTitle[0]}<br /><em>{s.services.indexTitle[1]}</em></>}
          intro={[s.services.indexIntro]}
        />
        <ServicesSection locale={locale} variant="index" />
        <FaqSection locale={locale} faqs={homeFaq[locale]} />
        <ContactSection locale={locale} />
      </main>
      <SiteFooter locale={locale} path={servicesIndexPath} />
    </>
  );
}
