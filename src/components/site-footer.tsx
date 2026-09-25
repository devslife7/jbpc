import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/icons";
import ObfuscatedEmail from "@/components/obfuscated-email";
import business from "@/content/business.json";
import { facts } from "@/content/home";
import { cities, citiesByState, type StateCode } from "@/content/locations";
import { servicesSeo } from "@/content/services-seo";
import { ui } from "@/content/ui-strings";
import { type Locale, htmlLang, otherLocale } from "@/lib/i18n";
import { areasIndexPath, cityPath, localizePath, servicePath, servicesIndexPath } from "@/lib/routes";

const stateOrder: StateCode[] = ["VA", "DC", "MD"];

/**
 * Footer with the NAP block (name, phone, hours, service area) and the
 * internal-link hub to every service and city page.
 */
export default function SiteFooter({ locale, path }: { locale: Locale; path: string }) {
  const s = ui[locale];
  const f = facts[locale];
  const home = localizePath("/", locale);
  const other = otherLocale(locale);
  const [emailUser, emailDomain] = business.contact.email.split("@");

  return (
    <footer className="site-footer">
      <div className="container footer-grid" data-reveal data-reveal-delay="0">
        <div className="footer-brand">
          <Link className="footer-logo" href={home} aria-label={s.homeAriaLabel}>
            <Image src="/assets/logo-horizontal.svg" alt={business.legalName} width={1740} height={510} />
          </Link>
          <p>{s.footer.tagline}</p>
          <dl className="footer-nap">
            <div><dt>{s.footer.contact}</dt><dd><a href={business.contact.phoneUrl}>{business.contact.phone}</a><br /><ObfuscatedEmail user={emailUser} domain={emailDomain} /></dd></div>
            <div><dt>{s.footer.hours}</dt><dd>{f.hours}</dd></div>
            <div><dt>{s.footer.serviceArea}</dt><dd><Link href={localizePath(areasIndexPath, locale)}>{f.serviceArea}</Link></dd></div>
            <div><dt>{s.footer.languages}</dt><dd>{f.languages}</dd></div>
          </dl>
        </div>

        <nav className="footer-col" aria-label={s.footer.services}>
          <h3>{s.footer.services}</h3>
          <ul className="footer-links">
            {servicesSeo.map((service) => (
              <li key={service.slug}><Link href={localizePath(servicePath(service.slug), locale)}>{service.copy[locale].name}</Link></li>
            ))}
            <li><Link href={localizePath(servicesIndexPath, locale)}>{s.cta.allServices}</Link></li>
          </ul>
        </nav>

        <nav className="footer-col footer-areas" aria-label={s.footer.areas}>
          <h3><Link href={localizePath(areasIndexPath, locale)}>{s.footer.areas}</Link></h3>
          <div className="footer-area-groups">
            {stateOrder.map((state) => (
              <div key={state}>
                <h4>{s.areas.groups[state]}</h4>
                <ul className="footer-links">
                  {citiesByState(state).map((city) => (
                    <li key={city.slug}><Link href={localizePath(cityPath(city.slug), locale)}>{city.name}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="footer-action">
          <p>{s.footer.ready}</p>
          <Link className="button footer-button" href={`${home}#contact`}>{s.footer.bookYourClean} <Arrow diagonal /></Link>
          <Link className="footer-lang" href={localizePath(path, other)} hrefLang={htmlLang[other]} lang={htmlLang[other]}>{s.languageToggle.switchTo}</Link>
        </div>
      </div>
      <div className="container footer-bottom" data-reveal data-reveal-delay="80">
        <span>© {new Date().getFullYear()} {business.legalName} · {business.serviceArea.baseRegion} · {cities.length} {locale === "es" ? "zonas" : "areas"}</span>
        <span>{s.footer.closing}</span>
      </div>
    </footer>
  );
}
