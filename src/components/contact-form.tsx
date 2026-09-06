"use client";

import Image from "next/image";
import business from "@/content/business.json";
import { useState } from "react";

const services = business.services;

function WhatsAppIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9.2 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .5a6.6 6.6 0 0 0 3 2.6c.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.4.4a2 2 0 0 1-1.6 2c-.6.1-1.3 0-2.2-.4a9.4 9.4 0 0 1-4.4-3.9c-.7-1.1-.8-2-.6-2.7.1-.5.3-.9.2-1.2Z" fill="currentColor" /></svg>;
}

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const firstName = business.owner.name.split(" ")[0];

  function composeMessage() {
    const lines = [`Hi ${firstName}, I'm ${name.trim()}.`];
    const where = location.trim() ? ` in ${location.trim()}` : "";
    if (service) lines.push(`I'm looking for ${service.toLowerCase()}${where}.`);
    else if (where) lines.push(`I'm${where}.`);
    if (message.trim()) lines.push(message.trim());
    lines.push("Could I get a free estimate?");
    return lines.join("\n\n");
  }

  function sendOnWhatsApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = `${business.contact.whatsappUrl}?text=${encodeURIComponent(composeMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="contact-form" onSubmit={sendOnWhatsApp}>
      <div className="form-intro">
        <span className="form-to">To</span>
        <span className="form-recipient"><strong>{business.owner.name}</strong> · {business.owner.role}</span>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="given-name" required value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="contact-location">City or ZIP</label>
          <input id="contact-location" name="location" type="text" autoComplete="postal-code" inputMode="text" placeholder="Optional" value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
      </div>

      <fieldset className="field service-choices">
        <legend>What kind of clean?</legend>
        <div className="service-choice-grid">
          {services.map((item) => (
            <label key={item.icon} className="service-choice">
              <input type="radio" name="service" value={item.name} checked={service === item.name} onChange={() => setService(item.name)} />
              <Image src={`/assets/icons/${item.icon}.svg`} alt="" width={28} height={28} />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="contact-message">Tell {firstName} about your space</label>
        <textarea id="contact-message" name="message" rows={4} placeholder="Rooms, bathrooms, pets, how often you’d like us to come — whatever helps." value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>

      <div className="form-actions">
        <button className="button primary-button" type="submit"><WhatsAppIcon /> Send on WhatsApp <Arrow /></button>
        <p>Opens WhatsApp with your message already written. Nothing is sent until you tap send. Prefer to talk? <a href={business.contact.phoneUrl}>Call {business.contact.phone}</a>.</p>
      </div>
    </form>
  );
}
