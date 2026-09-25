import ContactForm from "@/components/contact-form";
import { Sparkle } from "@/components/icons";
import ObfuscatedEmail from "@/components/obfuscated-email";
import business from "@/content/business.json";
import { facts, home } from "@/content/home";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  /** English business.json service name to pre-select, e.g. "Deep cleaning". */
  defaultService?: string;
  /** Pre-filled "City or ZIP" value, e.g. "Arlington, VA". */
  defaultLocation?: string;
};

export default function ContactSection({ locale, defaultService, defaultLocation }: Props) {
  const c = home[locale].contact;
  const f = facts[locale];
  const [emailUser, emailDomain] = business.contact.email.split("@");

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="contact-copy" data-reveal data-reveal-delay="0">
          <p className="eyebrow"><Sparkle /> {c.eyebrow}</p>
          <h2 id="contact-title">{c.title[0]}<br /><em>{c.title[1]}</em></h2>
          <p>{c.body}</p>
          <a className="contact-phone" href={business.contact.phoneUrl}>{business.contact.phone}</a>
          <dl className="contact-facts">
            <div><dt>{c.hours}</dt><dd>{f.hours}</dd></div>
            <div><dt>{c.serviceArea}</dt><dd>{f.serviceArea}</dd></div>
            <div><dt>{c.languages}</dt><dd>{f.languages}</dd></div>
            <div><dt>{c.estimates}</dt><dd>{c.estimatesValue}</dd></div>
          </dl>
          <p className="contact-email">{c.emailToo} <ObfuscatedEmail user={emailUser} domain={emailDomain} /></p>
        </div>
        <ContactForm locale={locale} defaultService={defaultService} defaultLocation={defaultLocation} />
      </div>
    </section>
  );
}
