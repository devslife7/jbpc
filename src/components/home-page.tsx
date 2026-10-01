import Image from "next/image";
import Link from "next/link";
import BeforeAfter from "@/components/before-after";
import BookNowLink from "@/components/book-now-link";
import ContactSection from "@/components/contact-section";
import FaqSection from "@/components/faq-section";
import HighlightsMarquee from "@/components/highlights-marquee";
import { Arrow, PhoneIcon } from "@/components/icons";
import ServicesSection from "@/components/services-section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import StorySection from "@/components/story-section";
import Testimonials from "@/components/testimonials";
import business from "@/content/business.json";
import { homeFaq } from "@/content/faqs";
import { facts, home } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import { areasIndexPath, localizePath } from "@/lib/routes";

export default function HomePage({ locale }: { locale: Locale }) {
  const h = home[locale];
  const f = facts[locale];

  return (
    <>
      <SiteHeader locale={locale} path="/" />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo">
            <Image src="/assets/hero-cleaning-branded.webp" alt={h.hero.imageAlt} fill sizes="(max-width: 760px) 200vw, 100vw" preload fetchPriority="high" />
          </div>
          <div className="hero-wash" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1 id="hero-title" data-reveal>
                <span className="hero-kicker">{h.hero.kicker}</span>
                {h.hero.title[0]}<br /><em>{h.hero.title[1]}</em>
              </h1>
              <p className="hero-description" data-reveal data-reveal-delay="80">
                {h.hero.description} <Link className="hero-area-link" href={localizePath(areasIndexPath, locale)}>{h.hero.areaLink}</Link>
              </p>
              <div className="hero-actions" data-reveal data-reveal-delay="160">
                <BookNowLink className="button primary-button">{locale === "es" ? "Reservar" : "Book now"} <Arrow /></BookNowLink>
                <a className="button call-button" href={business.contact.phoneUrl}><PhoneIcon /> {locale === "es" ? "Llamar al" : "Call"} {business.contact.phone}</a>
              </div>
              <ul className="care-note" data-reveal data-reveal-delay="240">
                <li><span className="check-icon" aria-hidden="true">✓</span> {h.hero.careNote}</li>
                {[f.experience, f.estimates].map((note) => (
                  <li key={note}><span className="check-icon" aria-hidden="true">✓</span> {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <HighlightsMarquee items={h.highlights} labels={h.highlightsToggle} />
        <BeforeAfter locale={locale} />
        <ServicesSection locale={locale} />

        <StorySection locale={locale} />

        {/* Testimonials are placeholders until real reviews arrive; they are not machine-translated. */}
        {locale === "en" ? <Testimonials /> : null}

        <section className="booking-section" aria-labelledby="booking-title">
          <div className="booking-banner">
            <div className="booking-art" aria-hidden="true">
              <Image src="/assets/booking-cleaning.webp" alt="" fill sizes="(max-width: 760px) 100vw, 60vw" />
            </div>
            <div className="container booking-copy" data-reveal>
              <h2 id="booking-title">{h.booking.title[0]}<br className="booking-title-break" /> {h.booking.title[1]}</h2>
              <p>{h.booking.body}</p>
              <a className="button booking-button" href={business.contact.phoneUrl}>{h.booking.cta}</a>
            </div>
          </div>
        </section>

        <FaqSection locale={locale} faqs={homeFaq[locale]} />
        <ContactSection locale={locale} />
      </main>
      <SiteFooter locale={locale} path="/" />
    </>
  );
}
