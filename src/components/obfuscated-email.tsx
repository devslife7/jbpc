"use client";

import { useSyncExternalStore } from "react";

// Renders an email address only in the browser, after hydration. The address
// never appears in the server-rendered HTML, so scrapers that harvest
// "mailto:" links and plain addresses from page source come up empty. Real
// visitors see a normal, clickable address.
function subscribe() {
  return () => {};
}

export default function ObfuscatedEmail({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  if (!isClient) return <span className={className} aria-hidden="true">…</span>;
  const address = `${user}@${domain}`;
  return (
    <a
      className={className}
      href="#contact"
      onClick={(event) => {
        event.preventDefault();
        window.location.href = `mailto:${address}`;
      }}
    >
      {address}
    </a>
  );
}
