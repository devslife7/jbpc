import Link from "next/link";
import { Arrow } from "@/components/icons";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import business from "@/content/business.json";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { areasIndexPath, localizePath, servicesIndexPath } from "@/lib/routes";

export default function NotFoundPage({ locale }: { locale: Locale }) {
  const s = ui[locale];
  return (
    <>
      <SiteHeader locale={locale} path="/" />
      <main id="main" className="not-found">
        <div className="container not-found-inner">
          <p className="eyebrow">404</p>
          <h1>{s.notFound.title}</h1>
          <p>{s.notFound.body}</p>
          <div className="hero-actions">
            <Link className="button primary-button" href={localizePath("/", locale)}>{s.notFound.home} <Arrow /></Link>
            <Link className="button call-button" href={localizePath(servicesIndexPath, locale)}>{s.nav.services}</Link>
            <Link className="button call-button" href={localizePath(areasIndexPath, locale)}>{s.nav.areas}</Link>
            <a className="button call-button" href={business.contact.phoneUrl}>{s.cta.call} {business.contact.phone}</a>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} path="/" />
    </>
  );
}
