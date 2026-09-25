"use client";

import type { MouseEvent, ReactNode } from "react";

function focusContactName(event: MouseEvent<HTMLAnchorElement>) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  document.getElementById("contact-name")?.focus({ preventScroll: true });
}

/** Jumps to the contact form and focuses the first field. Every page renders the form, so the anchor always exists. */
export default function BookNowLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a className={className} href="#contact-name" onClick={focusContactName}>
      {children}
    </a>
  );
}
