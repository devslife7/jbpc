import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "@/components/icons";
import business from "@/content/business.json";
import { ui } from "@/content/ui-strings";
import { type Locale, htmlLang, otherLocale } from "@/lib/i18n";
import { areasIndexPath, contactPath, localizePath, servicesIndexPath, storyPath } from "@/lib/routes";

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
            <Link href={localizePath(storyPath, locale)}>{s.nav.story}</Link>
            <Link href={localizePath(contactPath, locale)}>{s.nav.contact}</Link>
          </nav>
          <div className="header-actions">
            <Link className="lang-toggle" href={localizePath(path, other)} hrefLang={htmlLang[other]} lang={htmlLang[other]} aria-label={`${s.languageToggle.label}: ${s.languageToggle.switchTo}`}>
              <span aria-hidden="true">{other === "es" ? "🇪🇸" : "🇺🇸"}</span>
              {s.languageToggle.switchTo}
            </Link>
            <a className="button header-cta" href={business.contact.phoneUrl} aria-label={`${s.cta.call} ${business.contact.phone}`}>
              <PhoneIcon />
              <span>{s.nav.call}<span className="header-phone-number"> {business.contact.phone}</span></span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
