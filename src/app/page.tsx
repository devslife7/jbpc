"use client";

import Image from "next/image";
import BeforeAfter from "@/components/before-after";
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
              <p className="eyebrow"><Sparkle /> A fresh space. A fresh start.</p>
              <h1 id="hero-title">A cleaner home.<br /><em>A lighter life.</em></h1>
              <p className="hero-description">Leave the cleaning to us. Come home to a space that feels fresh, cared for, and completely yours.</p>
              <div className="hero-actions">
                <a className="button primary-button" href="#services">Explore our services <Arrow /></a>
                <a className="text-button" href="#our-work">See the difference <span className="play-icon" aria-hidden="true"><svg width="10" height="12" viewBox="0 0 10 12"><path d="m1 1 8 5-8 5Z" fill="currentColor" /></svg></span></a>
              </div>
              <div className="care-note"><span className="check-icon" aria-hidden="true">✓</span> Thoughtful cleaning. A personal touch.</div>
            </div>
            <div className="photo-note"><span className="note-sparkle"><Sparkle /></span><span>A little more sparkle.<br /><strong>A lot more peace of mind.</strong></span></div>
            <span className="image-caption">THE J&B PREMIER TOUCH</span>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="services-heading"><div><p className="eyebrow">A clean for every chapter</p><h2 id="services-title">Your space. Our care.</h2></div><p>From everyday upkeep to a brand-new beginning.</p></div>
            <div className="service-grid">
              {services.map((service, index) => <button className="service" key={service.icon} onClick={() => showDetails(index)} aria-haspopup="dialog"><Image src={`/assets/icons/${service.icon}.svg`} alt="" width={48} height={48} /><span className="service-copy"><strong>{service.name}</strong><span>{service.note}</span></span><Arrow diagonal /></button>)}
            </div>
          </div>
        </section>
        <BeforeAfter />
      </main>

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
