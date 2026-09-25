import JsonLd from "@/components/json-ld";
import { Sparkle } from "@/components/icons";
import type { Faq } from "@/content/faqs";
import { ui } from "@/content/ui-strings";
import type { Locale } from "@/lib/i18n";
import { faqGraph } from "@/lib/structured-data";

/** Visible FAQ (native <details>, no JS) mirrored verbatim into FAQPage schema. */
export default function FaqSection({ locale, faqs, title }: { locale: Locale; faqs: Faq[]; title?: string }) {
  const s = ui[locale].faq;
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <JsonLd data={faqGraph(faqs)} />
      <div className="container faq-layout">
        <div className="faq-heading" data-reveal>
          <p className="eyebrow"><Sparkle /> {s.eyebrow}</p>
          <h2 id="faq-title">{title ?? s.title}</h2>
        </div>
        <div className="faq-list" data-reveal data-reveal-delay="80">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.q}>
              <summary>{faq.q}</summary>
              <div className="faq-answer"><p>{faq.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
