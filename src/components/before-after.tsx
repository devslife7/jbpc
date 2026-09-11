"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const rooms = [
  {
    name: "Kitchen",
    title: "A fresh start at the heart of your home.",
    description: "From busy countertops to a space ready for your next shared meal.",
    image: "/assets/before-after/before-after1.png",
    alt: "Kitchen before and after cleaning: dishes and crumbs on the left, clear countertops and a tidy kitchen on the right.",
    detail: "Countertops & everyday spaces",
  },
  {
    name: "Bathroom",
    title: "A little care. A whole new shine.",
    description: "Clear glass, refreshed surfaces, and room to unwind at the end of the day.",
    image: "/assets/before-after/before-after2.png",
    alt: "Bathroom before and after cleaning: spotted shower glass and cluttered vanity on the left, clear glass and clean surfaces on the right.",
    detail: "Glass, tile & finishing touches",
  },
  {
    name: "Living room",
    title: "Less mess. More room to relax.",
    description: "A reset for your favorite gathering place, from the coffee table to the cozy corners.",
    image: "/assets/before-after/before-after3.png",
    alt: "Living room before and after cleaning: a cluttered coffee table and rumpled sofa on the left, a tidy seating area on the right.",
    detail: "Shared spaces & cozy corners",
  },
];

export default function BeforeAfter() {
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
  }, [isPaused, selected]);

  return (
    <section className="work-section" id="our-work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-heading" data-reveal>
          <div>
            <p className="eyebrow"><span aria-hidden="true">✧</span> Before & after</p>
            <h2 id="work-title">The difference is<br /><em>in the details.</em></h2>
          </div>
          <p>A little attention goes a long way. Take a closer look at what a fresh start can feel like, one room at a time.</p>
        </div>

        <div className="room-controls" data-reveal>
        <div className="room-selectors" role="group" aria-label="Choose a room to compare" onFocusCapture={() => setPaused(true)}>
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
          aria-label={isPaused ? "Play room slideshow" : "Pause room slideshow"}
          title={isPaused ? "Play slideshow" : "Pause slideshow"}
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
            <span className="photo-label before-label">Before</span>
            <span className="photo-label after-label"><span aria-hidden="true">✧</span> After</span>
            <div className="comparison-seam" aria-hidden="true" />
          </div>
          <figcaption className="work-caption" aria-live={isPaused ? "polite" : "off"} aria-atomic="true">
            <div><h3>{room.title}</h3><p>{room.description}</p></div>
            <span className="work-detail">{room.detail}</span>
          </figcaption>
        </figure>

        <div className="work-footer" data-reveal>
          <p>Your home could be next.</p>
          <a href="#services">Find the right clean for your space <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
