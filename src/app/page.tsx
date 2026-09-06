"use client";

import Image from "next/image";
import BeforeAfter from "@/components/before-after";
import ContactForm from "@/components/contact-form";
import business from "@/content/business.json";
import { useRef, useState } from "react";

const services = business.services;

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Sparkle({ className = "" }: { className?: string }) {
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}

export default function Home() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [activeService, setActiveService] = useState(0);

  function showDetails(service: number) {
    setActiveService(service);
    dialog.current?.showModal();
  }

  return (
    <>
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
          <a className="button header-cta" href="#services">Find your clean <Arrow diagonal /></a>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo">
            <Image src="/assets/hero-cleaning-branded.png" alt="A smiling cleaner looking at the camera, wearing a purple polo with the J&B Premier Cleaning logo on her left chest while wiping a kitchen countertop" fill sizes="100vw" preload />
          </div>
          <div className="hero-wash" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <h1 id="hero-title">A cleaner home.<br /><em>A lighter life.</em></h1>
              <p className="hero-description">Leave the cleaning to us. Come home to a space that feels fresh, cared for, and completely yours.</p>
              <div className="hero-actions">
                <a className="button primary-button" href="#services">Explore our services <Arrow /></a>
                <a className="text-button" href="#our-work">See the difference <span className="play-icon" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12"><path d="m1 1 8 5-8 5Z" fill="currentColor" /></svg></span></a>
              </div>
              <div className="hero-contact"><a href={business.contact.phoneUrl}>{business.contact.phone}</a><span>Free estimates · Call or WhatsApp</span></div>
              <div className="care-note"><span className="check-icon" aria-hidden="true">✓</span> Thoughtful cleaning. A personal touch.</div>
            </div>
            <div className="photo-note"><span className="note-sparkle"><Sparkle /></span><span>A little more sparkle.<br /><strong>A lot more peace of mind.</strong></span></div>
            <span className="image-caption">THE J&B PREMIER TOUCH</span>
          </div>
        </section>

        <section className="services-section" id="service-menu" aria-labelledby="service-menu-title">
          <div className="container">
            <div className="services-heading"><div><p className="eyebrow">A clean for every chapter</p><h2 id="service-menu-title">Your space. Our care.</h2></div><p>From everyday upkeep to a brand-new beginning.</p></div>
            <div className="service-grid">
              {services.map((service, index) => <button className="service" key={service.icon} onClick={() => showDetails(index)} aria-haspopup="dialog"><Image src={`/assets/icons/${service.icon}.svg`} alt="" width={48} height={48} /><span className="service-copy"><strong>{service.name}</strong><span>{service.note}</span></span><Arrow diagonal /></button>)}
            </div>
          </div>
        </section>
        <BeforeAfter />
        <section className="offerings-section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="offerings-heading">
              <div>
                <p className="eyebrow"><Sparkle /> Our services</p>
                <h2 id="services-title">Cleaning that fits<br /><em>the way you live.</em></h2>
              </div>
              <p>Four ways we care for a space, from routine upkeep to a full reset. Every visit starts with a conversation and a free estimate, so the plan fits your home or office.</p>
            </div>
            <div className="offerings-layout">
              <div className="offering-grid">
                {services.map((service, index) => (
                  <article className="offering" key={service.icon}>
                    <div className="offering-top">
                      <span className="offering-icon"><Image src={`/assets/icons/${service.icon}.svg`} alt="" width={48} height={48} /></span>
                      <span className="offering-number">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h3>{service.name}</h3>
                    <p className="offering-note">{service.note}</p>
                    <p className="offering-description">{service.description}</p>
                    <ul className="offering-tags">
                      {service.details.split(" · ").map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                    <a className="offering-link" href="#contact">Request a free estimate <Arrow diagonal /></a>
                  </article>
                ))}
              </div>
              <aside className="offerings-aside" aria-labelledby="offerings-aside-title">
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
            <div className="story-photo">
              <span className="story-dots story-dots-top" aria-hidden="true" />
              <span className="story-dots story-dots-bottom" aria-hidden="true" />
              <div className="story-blob">
                <Image src="/assets/cleaning-lady-hero.png" alt="A smiling J&B Premier Cleaning professional holding a cleaning caddy and supplies" fill sizes="(max-width: 760px) 100vw, 550px" />
              </div>
            </div>
            <div className="story-copy">
              <p className="eyebrow"><Sparkle /> Our story</p>
              <h2 id="story-title">Built on honest work.<br /><em>Grown with care.</em></h2>
              {business.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="story-signoff"><Sparkle /><span>{business.story.signoff}</span></div>
            </div>
          </div>
        </section>
        <section className="booking-section" aria-labelledby="booking-title">
          <div className="booking-banner">
            <div className="booking-art" aria-hidden="true">
              <Image src="/assets/booking-cleaning.png" alt="" fill sizes="(max-width: 760px) 100vw, 60vw" />
            </div>
            <div className="container booking-copy">
              <h2 id="booking-title">Need a Cleaning Partner<br className="booking-title-break" /> You Can Count On?</h2>
              <p>One-time or recurring, we’ve got you covered.</p>
              <a className="button booking-button" href={business.contact.phoneUrl}>Call for a free estimate</a>
            </div>
          </div>
        </section>
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-layout">
            <div className="contact-copy">
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
              <p className="contact-email">Email works too: <a href={business.contact.emailUrl}>{business.contact.email}</a></p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
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
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} J&amp;B Premier Cleaning LLC</span>
          <span>Clean spaces. Clear minds.</span>
        </div>
      </footer>

      <dialog className="detail-dialog" ref={dialog} aria-labelledby="dialog-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="dialog-content">
          <button className="close-button" aria-label="Close details" onClick={() => dialog.current?.close()}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
          <Image src={`/assets/icons/${services[activeService].icon}.svg`} alt="" width={64} height={64} />
          <p className="eyebrow">{business.name}</p>
          <h2 id="dialog-title">{services[activeService].name}</h2>
          <p className="dialog-description">{services[activeService].description}</p>
          <p className="service-details">{services[activeService].details}</p>
          <a className="button primary-button" href="#our-work" onClick={() => dialog.current?.close()}>See the difference <Arrow /></a>
        </div>
      </dialog>
    </>
  );
}
