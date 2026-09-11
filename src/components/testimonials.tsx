"use client";

import business from "@/content/business.json";
import { useCallback, useEffect, useRef, useState } from "react";

const reviews = business.reviews;

function Star() {
  return <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9Z" fill="currentColor" /></svg>;
}

function Chevron({ back = false }: { back?: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={back ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").replace(".", "").slice(0, 2);
}

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const measure = useCallback(() => {
    const element = track.current;
    if (!element) return;
    const pageWidth = element.clientWidth;
    const card = element.firstElementChild as HTMLElement | null;
    const perPage = card ? Math.max(1, Math.round(pageWidth / card.offsetWidth)) : 1;
    const count = Math.ceil(reviews.length / perPage);
    setPageCount(count);
    setPage(Math.min(count - 1, Math.round(element.scrollLeft / pageWidth)));
  }, []);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    return () => observer.disconnect();
  }, [measure]);

  function goTo(target: number) {
    const element = track.current;
    if (!element) return;
    const next = Math.max(0, Math.min(pageCount - 1, target));
    element.scrollTo({ left: next * element.clientWidth });
  }

  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-heading" data-reveal>
          <p className="eyebrow">Testimonials</p>
          <h2 id="reviews-title">What our clients<br className="reviews-title-break" /> <em>are saying.</em></h2>
        </div>

        <div className="reviews-carousel" data-reveal>
          <button className="reviews-arrow" onClick={() => goTo(page - 1)} disabled={page === 0} aria-label="Previous reviews"><Chevron back /></button>
          <div className="reviews-track" ref={track} onScroll={measure} role="region" aria-label="Client reviews" tabIndex={0}>
            {reviews.map((review) => (
              <figure className="review" key={review.name}>
                <span className="review-mark" aria-hidden="true">&ldquo;</span>
                <blockquote>{review.quote}</blockquote>
                <figcaption>
                  <span className="review-avatar" aria-hidden="true">{initials(review.name)}</span>
                  <span className="review-author"><strong>{review.name}</strong><span>{review.role}</span></span>
                </figcaption>
                <span className="review-stars" role="img" aria-label={`Rated ${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }, (_, index) => <Star key={index} />)}
                </span>
              </figure>
            ))}
          </div>
          <button className="reviews-arrow" onClick={() => goTo(page + 1)} disabled={page === pageCount - 1} aria-label="Next reviews"><Chevron /></button>
          <div className="reviews-dots" role="group" aria-label="Choose a page of reviews">
            {Array.from({ length: pageCount }, (_, index) => (
              <button key={index} className={`reviews-dot ${page === index ? "is-active" : ""}`} onClick={() => goTo(index)} aria-label={`Page ${index + 1} of ${pageCount}`} aria-current={page === index ? "true" : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
