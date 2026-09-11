"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import BeforeAfter from "@/components/before-after";
import ContactForm from "@/components/contact-form";
import ObfuscatedEmail from "@/components/obfuscated-email";
import Testimonials from "@/components/testimonials";
import ScrollReveals from "@/components/scroll-reveals";
import business from "@/content/business.json";

const services = business.services;

function focusContactName(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  document.getElementById("contact-name")?.focus({ preventScroll: true });
}

const highlights = [
  { label: business.experience, note: `Owner-led by ${business.owner.name}.` },
  { label: business.serviceArea.baseRegion, note: `Serving the DMV within ${business.serviceArea.radiusMiles} miles.` },
  { label: business.languages.join(" & "), note: "Bilingual service, your choice." },
  { label: business.estimates.label, note: "No obligation. Call or WhatsApp." },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Sparkle({ className = "" }: { className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  const [highlightsPaused, setHighlightsPaused] = useState(false);

  return (
    <>
      <ScrollReveals />
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label={`${business.name} — home`}>
            <Image src="/assets/logo-horizontal.svg" alt={business.legalName} width={1740} height={510} preload />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#services">Our services</a>
            <a className="work-nav-link" href="#our-work">Our work <Arrow diagonal /></a>
            <a href="#our-story">Our story</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button header-cta" href="#contact-name" onClick={focusContactName}>Book now <Arrow diagonal /></a>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo">
            <Image src="/assets/hero-cleaning-branded.png" alt="A smiling cleaner looking at the camera, wearing a purple polo with the J&B Premier Cleaning logo on her left chest while wiping a kitchen countertop" fill sizes="(max-width: 760px) 200vw, 100vw" preload />
          </div>
          <div className="hero-wash" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1 id="hero-title" data-reveal>A cleaner home.<br /><em>A lighter life.</em></h1>
              <p className="hero-description" data-reveal data-reveal-delay="80">Leave the cleaning to us. Come home to a space that feels fresh, cared for, and completely yours.</p>
              <div className="hero-actions" data-reveal data-reveal-delay="160">
                <a className="button primary-button" href="#contact-name" onClick={focusContactName}>Book now <Arrow /></a>
                <a className="button call-button" href={business.contact.phoneUrl}><PhoneIcon /> Call {business.contact.phone}</a>
              </div>
              <ul className="care-note" data-reveal data-reveal-delay="240">
                <li><span className="check-icon" aria-hidden="true">✓</span> Thoughtful cleaning. A personal touch.</li>
                {[business.experience, business.estimates.label].map((note) => (
                  <li key={note}><span className="check-icon" aria-hidden="true">✓</span> {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="highlights-section" id="highlights" aria-label="Why choose us">
          <div className="highlights-track" style={{ animationPlayState: highlightsPaused ? "paused" : "running" }}>
            {[0, 1].map((copy) => (
              <ul className="highlight-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {highlights.map((item) => <li className="highlight" key={item.label}><span className="highlight-copy"><strong>{item.label}</strong><span>{item.note}</span></span></li>)}
              </ul>
            ))}
          </div>
          <button className="highlights-toggle" type="button" onClick={() => setHighlightsPaused((paused) => !paused)} aria-label={highlightsPaused ? "Resume scrolling features" : "Pause scrolling features"}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              {highlightsPaused ? <path d="M5 3 13 8 5 13Z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
            </svg>
          </button>
        </section>
        <BeforeAfter />
        <section className="offerings-section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="offerings-heading" data-reveal data-reveal-delay="0">
              <div>
                <p className="eyebrow"><Sparkle /> Our services</p>
                <h2 id="services-title">Cleaning that fits<br /><em>the way you live.</em></h2>
              </div>
              <p>Four ways we care for a space, from routine upkeep to a full reset. Every visit starts with a conversation and a free estimate, so the plan fits your home or office.</p>
            </div>
            <div className="offerings-layout">
              <div className="offering-grid">
                {services.map((service, index) => (
                  <article data-reveal data-reveal-delay={(index % 2) * 100} className="offering" key={service.icon}>
                    <div className="offering-photo">
                      <Image src={service.image.src} alt={service.image.alt} fill sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 92px) / 2), (max-width: 1360px) calc((100vw - 492px) / 2), 434px" />
                    </div>
                    <div className="offering-body">
                      <h3>{service.name}</h3>
                      <p className="offering-note">{service.note}</p>
                      <p className="offering-description">{service.description}</p>
                      <ul className="offering-tags">
                        {service.details.split(" · ").map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                      <a className="offering-link" href="#contact">Request a free estimate <Arrow diagonal /></a>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="offerings-aside" data-reveal data-reveal-delay="120" aria-labelledby="offerings-aside-title">
                <p className="eyebrow"><Sparkle /> Not sure where to start?</p>
                <h3 id="offerings-aside-title">Tell us about your space. We’ll suggest the right clean.</h3>
                <p>Estimates are always free, with no obligation. Call or message {business.owner.name.split(" ")[0]} and she’ll walk you through what makes sense for your home or office, in English or Spanish.</p>
                <div className="offerings-actions">
                  <a className="button" href={business.contact.phoneUrl}>Call {business.contact.phone}</a>
                  <a className="offerings-whatsapp" href={business.contact.whatsappUrl} target="_blank" rel="noopener noreferrer">Message on WhatsApp <Arrow diagonal /></a>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <section className="story-section" id="our-story" aria-labelledby="story-title">
          <div className="container story-layout">
            <div className="story-photo" data-reveal data-reveal-delay="0">
              <span className="story-dots story-dots-top" aria-hidden="true" />
              <span className="story-dots story-dots-bottom" aria-hidden="true" />
              <div className="story-blob">
                <Image src="/assets/story-owner-detailed.png" alt="A smiling J&B Premier Cleaning professional posing with her hands gently clasped" fill quality={95} sizes="(max-width: 760px) 100vw, 550px" />
              </div>
            </div>
            <div className="story-copy" data-reveal data-reveal-delay="120">
              <p className="eyebrow"><Sparkle /> Our story</p>
              <h2 id="story-title">Built on honest work.</h2>
              {business.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="story-signoff"><Sparkle /><span>{business.story.signoff}</span></div>
            </div>
          </div>
        </section>
        <Testimonials />
        <section className="booking-section" aria-labelledby="booking-title">
          <div className="booking-banner">
            <div className="booking-art" aria-hidden="true">
              <Image src="/assets/booking-cleaning.png" alt="" fill sizes="(max-width: 760px) 100vw, 60vw" />
            </div>
            <div className="container booking-copy" data-reveal>
              <h2 id="booking-title">Need a Cleaning Partner<br className="booking-title-break" /> You Can Count On?</h2>
              <p>One-time or recurring, we’ve got you covered.</p>
              <a className="button booking-button" href={business.contact.phoneUrl}>Call for a free estimate</a>
            </div>
          </div>
        </section>
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-layout">
            <div className="contact-copy" data-reveal data-reveal-delay="0">
              <p className="eyebrow"><Sparkle /> Let’s get started</p>
              <h2 id="contact-title">A cleaner space<br /><em>is one message away.</em></h2>
              <p>Tell {business.owner.name.split(" ")[0]} a little about your space and she’ll follow up with a free estimate, in English or Spanish, whichever you prefer.</p>
              <a className="contact-phone" href={business.contact.phoneUrl}>{business.contact.phone}</a>
              <dl className="contact-facts">
                <div><dt>Hours</dt><dd>{business.hours.label}</dd></div>
                <div><dt>Service area</dt><dd>{business.serviceArea.label}</dd></div>
                <div><dt>Languages</dt><dd>{business.languages.join(" and ")}</dd></div>
                <div><dt>Estimates</dt><dd>Always free, no obligation</dd></div>
              </dl>
              <p className="contact-email">Email works too: <ObfuscatedEmail user={business.contact.email.split("@")[0]} domain={business.contact.email.split("@")[1]} /></p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main" data-reveal data-reveal-delay="0">
          <div className="footer-brand">
            <a className="footer-logo" href="#" aria-label="J&B Premier Cleaning — home">
              <Image src="/assets/logo-horizontal.svg" alt="J&B Premier Cleaning LLC" width={1740} height={510} />
            </a>
            <p>Thoughtful cleaning for the spaces that matter most.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#services">Our services</a>
            <a href="#our-work">Our work</a>
            <a href="#our-story">Our story</a>
          </nav>
          <div className="footer-action">
            <p>Ready for a fresh start?</p>
            <a className="button footer-button" href="#services">Book your clean <Arrow diagonal /></a>
          </div>
        </div>
        <div className="container footer-bottom" data-reveal data-reveal-delay="80">
          <span>© {new Date().getFullYear()} J&amp;B Premier Cleaning LLC</span>
          <span>Clean spaces. Clear minds.</span>
        </div>
      </footer>

    </>
  );
}
