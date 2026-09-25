import Image from "next/image";
import Link from "next/link";
import { Arrow, Sparkle } from "@/components/icons";
import business from "@/content/business.json";
import { home } from "@/content/home";
import { getServiceFacts, servicesSeo } from "@/content/services-seo";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { localizePath, servicePath } from "@/lib/routes";

type Props = { locale: Locale; variant?: "home" | "index" };

/** The purple services grid. On the home page it is a section; on /services it is the main content. */
export default function ServicesSection({ locale, variant = "home" }: Props) {
  const s = ui[locale];
  const h = home[locale].services;
  const title = variant === "home" ? s.services.title : s.services.indexTitle;
  const intro = variant === "home" ? h.intro : s.services.indexIntro;
  const Heading = variant === "home" ? "h2" : "h2";
  const firstName = business.owner.name.split(" ")[0];

  return (
    <section className="offerings-section" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="offerings-heading" data-reveal data-reveal-delay="0">
          <div>
            <p className="eyebrow"><Sparkle /> {s.services.eyebrow}</p>
            <Heading id="services-title">{title[0]}<br /><em>{title[1]}</em></Heading>
          </div>
          <p>{intro}</p>
        </div>
        <div className="offerings-layout">
          <div className="offering-grid">
            {servicesSeo.map((service, index) => {
              const facts = getServiceFacts(service);
              const copy = service.copy[locale];
              const href = localizePath(servicePath(service.slug), locale);
              return (
                <article data-reveal data-reveal-delay={(index % 2) * 100} className="offering" key={service.slug}>
                  <Link className="offering-photo" href={href} aria-hidden="true" tabIndex={-1}>
                    <Image src={facts.image.src} alt={facts.image.alt} fill sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 92px) / 2), (max-width: 1360px) calc((100vw - 492px) / 2), 434px" />
                  </Link>
                  <div className="offering-body">
                    <h3><Link href={href}>{copy.name}</Link></h3>
                    <p className="offering-note">{copy.note}</p>
                    <p className="offering-description">{locale === "en" ? facts.description : copy.cardBlurb}</p>
                    <ul className="offering-tags">
                      {(locale === "en" ? facts.details.split(" · ") : copy.whatToExpect.slice(0, 3)).map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                    <div className="offering-links">
                      <Link className="offering-link" href={href}>{s.cta.learnMore} <Arrow diagonal /></Link>
                      <a className="offering-link offering-link-secondary" href="#contact">{s.cta.estimate}</a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <aside className="offerings-aside" data-reveal data-reveal-delay="120" aria-labelledby="offerings-aside-title">
            <p className="eyebrow"><Sparkle /> {h.asideEyebrow}</p>
            <h3 id="offerings-aside-title">{h.asideTitle}</h3>
            <p>{h.asideBody.replace("Bertha", firstName)}</p>
            <div className="offerings-actions">
              <a className="button" href={business.contact.phoneUrl}>{s.cta.call} {business.contact.phone}</a>
              <a className="offerings-whatsapp" href={business.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">{s.cta.whatsapp} <Arrow diagonal /></a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
