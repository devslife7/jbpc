import Image from "next/image";
import Link from "next/link";
import BookNowLink from "@/components/book-now-link";
import { Arrow } from "@/components/icons";
import business from "@/content/business.json";
import { ui } from "@/content/ui-strings";
import { type Locale, htmlLang, otherLocale } from "@/lib/i18n";
import { areasIndexPath, localizePath, servicesIndexPath } from "@/lib/routes";

/** @param path Canonical (English) path of the current page, used by the language toggle. */
export default function SiteHeader({ locale, path }: { locale: Locale; path: string }) {
  const s = ui[locale];
  const home = localizePath("/", locale);
  const other = otherLocale(locale);

  return (
    <>
      <a className="skip-link" href="#main">{s.skipToContent}</a>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href={home} aria-label={s.homeAriaLabel}>
            <Image src="/assets/logo-horizontal.svg" alt={business.legalName} width={1740} height={510} />
          </Link>
          <nav className="desktop-nav" aria-label={s.nav.label}>
            <Link href={localizePath(servicesIndexPath, locale)}>{s.nav.services}</Link>
            <Link href={localizePath(areasIndexPath, locale)}>{s.nav.areas}</Link>
            <Link className="work-nav-link" href={`${home}#our-work`}>{s.nav.work} <Arrow diagonal /></Link>
            <Link href={`${home}#our-story`}>{s.nav.story}</Link>
            <a href="#contact">{s.nav.contact}</a>
          </nav>
          <div className="header-actions">
            <Link className="lang-toggle" href={localizePath(path, other)} hrefLang={htmlLang[other]} lang={htmlLang[other]} aria-label={`${s.languageToggle.label}: ${s.languageToggle.switchTo}`}>
              {s.languageToggle.switchTo}
            </Link>
            <BookNowLink className="button header-cta">{s.nav.bookNow} <Arrow diagonal /></BookNowLink>
          </div>
        </div>
      </header>
    </>
  );
}
