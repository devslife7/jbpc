import type { ReactNode } from "react";
import BookNowLink from "@/components/book-now-link";
import Breadcrumbs, { type Crumb } from "@/components/breadcrumbs";
import { Arrow, PhoneIcon, Sparkle } from "@/components/icons";
import business from "@/content/business.json";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro: string[];
  children?: ReactNode;
};

/** Header block for services, areas and city pages: breadcrumbs, H1, intro and the two primary CTAs. */
export default function InnerHero({ locale, crumbs, eyebrow, title, intro, children }: Props) {
  const s = ui[locale];
  return (
    <section className="inner-hero" aria-labelledby="page-title">
      <div className="container inner-hero-inner">
        <Breadcrumbs locale={locale} items={crumbs} />
        <p className="eyebrow" data-reveal><Sparkle /> {eyebrow}</p>
        <h1 id="page-title" data-reveal data-reveal-delay="60">{title}</h1>
        <div className="inner-hero-intro" data-reveal data-reveal-delay="120">
          {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="hero-actions" data-reveal data-reveal-delay="180">
          <BookNowLink className="button primary-button">{s.cta.bookNow} <Arrow /></BookNowLink>
          <a className="button call-button" href={business.contact.phoneUrl}><PhoneIcon /> {s.cta.call} {business.contact.phone}</a>
        </div>
        {children}
      </div>
    </section>
  );
}
