"use client";

import { useState } from "react";

type Props = {
  items: { label: string; note: string }[];
  labels: { pause: string; resume: string; label: string };
};

export default function HighlightsMarquee({ items, labels }: Props) {
  const [paused, setPaused] = useState(false);

  return (
    <section className="highlights-section" id="highlights" aria-label={labels.label}>
      <div className="highlights-track" style={{ animationPlayState: paused ? "paused" : "running" }}>
        {[0, 1].map((copy) => (
          <ul className="highlight-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => <li className="highlight" key={item.label}><span className="highlight-copy"><strong>{item.label}</strong><span>{item.note}</span></span></li>)}
          </ul>
        ))}
      </div>
      <button className="highlights-toggle" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? labels.resume : labels.pause}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M5 3 13 8 5 13Z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
        </svg>
      </button>
    </section>
  );
}
