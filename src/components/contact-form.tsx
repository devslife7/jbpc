"use client";

import Image from "next/image";
import business from "@/content/business.json";
import Turnstile, { type TurnstileHandle } from "@/components/turnstile";
import { formStrings } from "@/content/form-strings";
import type { Locale } from "@/lib/i18n";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const services = business.services;
type ContactMethod = "email" | "whatsapp" | "sms";

function subscribeToScreenSize(onChange: () => void) {
  const query = window.matchMedia("(min-width: 1001px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isDesktopScreen() {
  return window.matchMedia("(min-width: 1001px)").matches;
}

function serverScreenSnapshot() {
  return true;
}

// Anti-spam settings. The form never posts to a server (it only opens the
// visitor's own mail/WhatsApp/SMS app), so these checks exist to stop scripted
// browsers from firing off canned messages and to keep junk out of the inbox.
const MIN_SECONDS_BEFORE_SEND = 3;
const MAX_LINKS_IN_MESSAGE = 1;
const MAX_MESSAGE_LENGTH = 1500;
const linkPattern = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|ru|cn|xyz|info|biz|top|site|online|shop)\b)/gi;

function countLinks(text: string) {
  return (text.match(linkPattern) ?? []).length;
}

function looksLikeGibberish(text: string) {
  const letters = text.replace(/[^a-z]/gi, "");
  if (letters.length < 12) return false;
  const vowels = (letters.match(/[aeiouy]/gi) ?? []).length;
  return vowels / letters.length < 0.15;
}

// Turnstile flow: the widget hands us a token, we confirm it with Cloudflare
// through our own API route (which holds the secret key), and only a passed
// verification lets the message go out.
type Verification = "idle" | "checking" | "passed" | "failed";

function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9.2 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .5a6.6 6.6 0 0 0 3 2.6c.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.4.4a2 2 0 0 1-1.6 2c-.6.1-1.3 0-2.2-.4a9.4 9.4 0 0 1-4.4-3.9c-.7-1.1-.8-2-.6-2.7.1-.5.3-.9.2-1.2Z" fill="currentColor" /></svg>;
}

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

type Props = {
  locale?: Locale;
  /** English business.json service name to pre-select. */
  defaultService?: string;
  /** Pre-filled "City or ZIP" value. */
  defaultLocation?: string;
};

export default function ContactForm({ locale = "en", defaultService, defaultLocation = "" }: Props) {
  const t = formStrings[locale];
  const contactMethods = t.methods;
  const [name, setName] = useState("");
  const [location, setLocation] = useState(defaultLocation);
  const [service, setService] = useState(() => services.find((item) => item.name === defaultService)?.name ?? services.find((item) => item.icon === "residential-cleaning")?.name ?? "");
  const [message, setMessage] = useState("");
  const [chosenMethod, setChosenMethod] = useState<ContactMethod | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [verification, setVerification] = useState<Verification>("idle");
  const turnstile = useRef<TurnstileHandle>(null);
  const latestToken = useRef<string | null>(null);

  async function verifyToken(token: string | null) {
    latestToken.current = token;
    if (!token) {
      setVerification("idle");
      return;
    }
    setVerification("checking");
    try {
      const response = await fetch("/api/turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json()) as { success?: boolean };
      // Ignore a stale answer if the widget has since issued a newer token.
      if (latestToken.current !== token) return;
      setVerification(data.success ? "passed" : "failed");
    } catch {
      if (latestToken.current === token) setVerification("failed");
    }
  }
  const [status, setStatus] = useState<string | null>(null);
  const openedAt = useRef<number | null>(null);
  const humanInteractions = useRef(0);
  const warnedTooFast = useRef(false);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  function noteHumanInteraction(event: React.SyntheticEvent) {
    if (event.nativeEvent.isTrusted) humanInteractions.current += 1;
  }

  // Returns null when the submission looks human, otherwise a message for the
  // visitor (or "" to drop the submission silently for obvious bots).
  function checkForSpam(): string | null {
    // 1. Honeypot: real visitors never see this field, so any value means a bot.
    if (honeypot.trim()) return "";

    // 2. Trusted input: scripted submissions without real clicks/keystrokes.
    if (humanInteractions.current < 2) return "";

    // 3. Timing: nobody reads and fills out this form in under a few seconds.
    const elapsed = openedAt.current ? (Date.now() - openedAt.current) / 1000 : 0;
    if (elapsed < MIN_SECONDS_BEFORE_SEND && !warnedTooFast.current) {
      warnedTooFast.current = true;
      return t.errors.tooFast;
    }

    // 4. Cloudflare Turnstile: the browser has to pass Cloudflare's bot check.
    if (verification === "checking") return t.errors.checking;
    if (verification === "failed") return t.errors.failed;
    if (verification !== "passed") return t.errors.incomplete;

    // 5. Content: link dumps, gibberish, and oversized messages are classic spam.
    const cleanName = name.trim();
    if (!/[a-z\u00C0-\u024F]/i.test(cleanName) || countLinks(cleanName) > 0 || countLinks(location) > 0) {
      return t.errors.name;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return t.errors.tooLong(MAX_MESSAGE_LENGTH);
    }
    if (countLinks(message) > MAX_LINKS_IN_MESSAGE) {
      return t.errors.links;
    }
    if (looksLikeGibberish(cleanName) || looksLikeGibberish(message)) {
      return t.errors.gibberish;
    }
    return null;
  }
  const isDesktop = useSyncExternalStore(subscribeToScreenSize, isDesktopScreen, serverScreenSnapshot);
  const method = chosenMethod ?? (isDesktop ? "email" : "whatsapp");
  const methodOrder: ContactMethod[] = isDesktop ? ["email", "whatsapp", "sms"] : ["whatsapp", "sms", "email"];

  const firstName = business.owner.name.split(" ")[0];

  function composeMessage() {
    const serviceLabel = service ? (t.serviceNames[service] ?? service) : "";
    return t.compose({ firstName, name: name.trim(), location: location.trim(), service: serviceLabel, message: message.trim() });
  }

  function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.nativeEvent.isTrusted) return;
    const problem = checkForSpam();
    if (problem !== null) {
      setStatus(problem || null);
      return;
    }
    setStatus(null);
    const body = encodeURIComponent(composeMessage());
    // Turnstile tokens are single-use; get a fresh one for any follow-up send.
    turnstile.current?.reset();
    if (method === "whatsapp") {
      window.open(`${business.contact.whatsappUrl}?text=${body}`, "_blank", "noopener,noreferrer");
    } else if (method === "email") {
      window.location.href = `mailto:${business.contact.email}?subject=${encodeURIComponent(t.subject)}&body=${body}`;
    } else {
      const isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      window.location.href = `sms:${business.contact.phoneInternational}${isAppleMobile ? "&" : "?"}body=${body}`;
    }
  }

  return (
    <form data-reveal data-reveal-delay="100" className="contact-form" onSubmit={sendMessage} onPointerDown={noteHumanInteraction} onKeyDown={noteHumanInteraction} onInput={noteHumanInteraction}>
      <div className="form-intro">
        <span className="form-to">{t.to}</span>
        <span className="form-recipient"><strong>{business.owner.name}</strong> · {business.owner.role}</span>
      </div>

      {/* Honeypot: hidden from people and screen readers, tempting to bots. */}
      <div className="contact-extra" aria-hidden="true">
        <label htmlFor="contact-website">{t.website}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="contact-name">{t.name}</label>
          <input id="contact-name" name="name" type="text" autoComplete="given-name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="contact-location">{t.location}</label>
          <input id="contact-location" name="location" type="text" autoComplete="postal-code" inputMode="text" placeholder={t.optional} maxLength={60} value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
      </div>

      <fieldset className="field service-choices">
        <legend>{t.serviceLegend}</legend>
        <div className="service-choice-grid">
          {services.map((item) => (
            <label key={item.icon} className="service-choice">
              <input type="radio" name="service" value={item.name} checked={service === item.name} onChange={() => setService(item.name)} />
              <Image src={`/assets/icons/${item.icon}.svg`} alt="" width={28} height={28} />
              <span>{t.serviceNames[item.name] ?? item.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="contact-message">{t.messageLabel}</label>
        <textarea id="contact-message" name="message" rows={4} maxLength={MAX_MESSAGE_LENGTH} placeholder={t.messagePlaceholder} value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>

      <div className="form-actions">
        <div className="field">
          <label htmlFor="contact-method">{t.sendUsing}</label>
          <select id="contact-method" name="contactMethod" value={method} onChange={(event) => setChosenMethod(event.target.value as ContactMethod)} aria-describedby="contact-send-hint">
            {methodOrder.map((option) => <option key={option} value={option}>{contactMethods[option].label}</option>)}
          </select>
        </div>
        <Turnstile ref={turnstile} onToken={verifyToken} className="turnstile-slot" />
        <button className="button primary-button" type="submit">{method === "whatsapp" && <WhatsAppIcon />} {contactMethods[method].button} <Arrow /></button>
        <p className="form-status" role="status" aria-live="polite">{status}</p>
        <p id="contact-send-hint">{contactMethods[method].hint} {t.nothingSent} {t.preferToTalk} <a href={business.contact.phoneUrl}>{t.call} {business.contact.phone}</a>.</p>
      </div>
    </form>
  );
}
