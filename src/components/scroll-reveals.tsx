"use client";

import { useEffect } from "react";

/** Progressive enhancement: content stays visible without JavaScript or motion. */
export default function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!("IntersectionObserver" in window)) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealed = new WeakSet<HTMLElement>();
    const animations = new Map<HTMLElement, Animation>();
    let observer: IntersectionObserver | undefined;

    function stop() {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }

    function start() {
      stop();
      if (preference.matches) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          revealed.add(element);
          if (element.contains(document.activeElement)) return;

          // Use individual translate so existing hover transforms still work.
          const animation = element.animate(
            [
              { opacity: 0, translate: "0 24px" },
              { opacity: 1, translate: "0 0" },
            ],
            {
              duration: 650,
              delay: Number(element.dataset.revealDelay ?? 0),
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "backwards",
            },
          );
          animations.set(element, animation);
          animation.onfinish = () => animations.delete(element);
        });
      }, { threshold: 0 });

      elements.forEach((element) => {
        if (!revealed.has(element)) observer?.observe(element);
      });
    }

    // Keyboard navigation must never land inside fading or delayed content.
    function revealFocused(event: FocusEvent) {
      if (!(event.target instanceof Node)) return;
      const target = event.target;
      elements.forEach((element) => {
        if (!element.contains(target)) return;
        revealed.add(element);
        observer?.unobserve(element);
        animations.get(element)?.cancel();
        animations.delete(element);
      });
    }

    start();
    preference.addEventListener("change", start);
    document.addEventListener("focusin", revealFocused);
    return () => {
      stop();
      preference.removeEventListener("change", start);
      document.removeEventListener("focusin", revealFocused);
    };
  }, []);

  return null;
}
