import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSection from "@/components/contact-section";
import FaqSection from "@/components/faq-section";
import { Arrow, Sparkle } from "@/components/icons";
import InnerHero from "@/components/inner-hero";
import JsonLd from "@/components/json-ld";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { serviceFaq } from "@/content/faqs";
import { cities } from "@/content/locations";
import { getServiceFacts, getServiceSeo, servicesSeo } from "@/content/services-seo";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { cityPath, localizePath, servicePath, servicesIndexPath } from "@/lib/routes";
import { serviceId, webPageGraph } from "@/lib/structured-data";

export default function ServicePage({ slug, locale }: { slug: string; locale: Locale }) {
  const service = getServiceSeo(slug);
  if (!service) notFound();
  const s = ui[locale];
  const copy = service.copy[locale];
  const facts = getServiceFacts(service);
  const path = servicePath(service.slug);
  const others = servicesSeo.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd data={webPageGraph({ path, locale, name: copy.title, description: copy.description, about: serviceId(service.slug) })} />
      <SiteHeader locale={locale} path={path} />
      <main id="main">
        <InnerHero
          locale={locale}
          crumbs={[{ name: s.breadcrumbs.services, path: servicesIndexPath }, { name: copy.name, path }]}
          eyebrow={copy.name}
          title={copy.h1}
          intro={copy.intro}
        />

        <section className="page-section service-detail" aria-labelledby="expect-title">
          <div className="container service-detail-layout">
            <div className="service-photo" data-reveal>
              <Image src={facts.image.src} alt={facts.image.alt} width={1000} height={750} sizes="(max-width: 900px) 100vw, 46vw" />
            </div>
            <div className="service-lists">
              <div data-reveal>
                <h2 id="expect-title" className="section-subtitle">{s.services.whatToExpect}</h2>
                <ul className="check-list">
                  {copy.whatToExpect.map((item) => <li key={item}><span className="check-icon" aria-hidden="true">✓</span>{item}</li>)}
                </ul>
              </div>
              <div data-reveal data-reveal-delay="80">
                <h2 className="section-subtitle">{s.services.idealFor}</h2>
                <ul className="chip-list">
                  {copy.idealFor.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="service-others" data-reveal data-reveal-delay="120">
                {others.map((other) => (
                  <Link key={other.slug} className="text-link" href={localizePath(servicePath(other.slug), locale)}>{other.copy[locale].name} <Arrow diagonal /></Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section area-section" aria-labelledby="areas-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow"><Sparkle /> {s.areas.eyebrow}</p>
              <h2 id="areas-title">{s.services.areasTitle}</h2>
              <p>{s.services.areasIntro}</p>
            </div>
            <ul className="area-grid" data-reveal data-reveal-delay="80">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={localizePath(cityPath(city.slug), locale)}>
                    <strong>{s.services.inCity(copy.name, city.name)}</strong>
                    <span>{city.state === "DC" ? city.stateName[locale] : `${city.county ?? city.name}, ${city.state}`}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection locale={locale} faqs={serviceFaq(service, locale)} />
        <ContactSection locale={locale} defaultService={facts.name} />
      </main>
      <SiteFooter locale={locale} path={path} />
    </>
  );
}
