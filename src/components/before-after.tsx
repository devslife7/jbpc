"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { home } from "@/content/home";
import type { Locale } from "@/lib/i18n";

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function BeforeAfter({ locale }: { locale: Locale }) {
  const copy = home[locale].work;
  const rooms = copy.rooms;
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    prefersReducedMotion,
    () => true,
  );
  const isPaused = paused ?? reducedMotion;
  const room = rooms[selected];

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => {
      setSelected((current) => (current + 1) % rooms.length);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [isPaused, selected, rooms.length]);

  return (
    <section className="work-section" id="our-work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-heading" data-reveal>
          <div>
            <p className="eyebrow"><span aria-hidden="true">✧</span> {copy.eyebrow}</p>
            <h2 id="work-title">{copy.title[0]}<br /><em>{copy.title[1]}</em></h2>
          </div>
          <p>{copy.intro}</p>
        </div>

        <div className="room-controls" data-reveal>
        <div className="room-selectors" role="group" aria-label={copy.chooseRoom} onFocusCapture={() => setPaused(true)}>
          {rooms.map((item, index) => (
            <button
              key={item.name}
              className={`room-selector ${selected === index ? "is-selected" : ""}`}
              aria-pressed={selected === index}
              aria-controls="room-comparison"
              onClick={() => setSelected(index)}
            >
              <span className="room-number" aria-hidden="true">0{index + 1}</span>
              <span>{item.name}</span>
              <span className="room-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <button
          className="rotation-control"
          onClick={() => setPaused(!isPaused)}
          aria-label={isPaused ? copy.play : copy.pause}
          title={isPaused ? copy.play : copy.pause}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {isPaused ? <path d="m6 3 11 7-11 7Z" /> : <path d="M5 3h3v14H5zm7 0h3v14h-3Z" />}
          </svg>
        </button>
        </div>

        <figure id="room-comparison" className="room-comparison" data-reveal>
          <div className="work-image-wrap">
            {rooms.map((item, index) => <Image
              key={item.name}
              className={`work-image work-image-slide ${selected === index ? "is-visible" : ""}`}
              src={item.image}
              alt={selected === index ? item.alt : ""}
              aria-hidden={selected !== index}
              width={1672}
              height={941}
              sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1360px) 90vw, 1232px"
            />)}
            <span className="photo-label before-label">{copy.before}</span>
            <span className="photo-label after-label"><span aria-hidden="true">✧</span> {copy.after}</span>
            <div className="comparison-seam" aria-hidden="true" />
          </div>
          <figcaption className="work-caption" aria-live={isPaused ? "polite" : "off"} aria-atomic="true">
            <div><h3>{room.title}</h3><p>{room.description}</p></div>
            <span className="work-detail">{room.detail}</span>
          </figcaption>
        </figure>

        <div className="work-footer" data-reveal>
          <p>{copy.footer}</p>
          <a href="#services">{copy.footerLink} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
