import ContactSection from "@/components/contact-section";
import JsonLd from "@/components/json-ld";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { home } from "@/content/home";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { contactPath } from "@/lib/routes";
import { webPageGraph } from "@/lib/structured-data";

export default function ContactPage({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd data={webPageGraph({ path: contactPath, locale, name: ui[locale].nav.contact, description: home[locale].contact.body })} />
      <SiteHeader locale={locale} path={contactPath} />
      <main id="main">
        <ContactSection locale={locale} headingLevel="h1" />
      </main>
      <SiteFooter locale={locale} path={contactPath} />
    </>
  );
}
