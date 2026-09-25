import business from "@/content/business.json";
import type { City } from "@/content/locations";
import type { ServiceSeo } from "@/content/services-seo";
import type { Locale, Localized } from "@/lib/i18n";

/**
 * FAQ copy. Every answer is built only from confirmed facts in business.json
 * (service area, free estimates, phone/WhatsApp, languages, hours, services).
 * No prices, guarantees, supplies, insurance or recurring-service claims.
 */
export interface Faq {
  q: string;
  a: string;
}

const phone = business.contact.phone;

export const homeFaq: Localized<Faq[]> = {
  en: [
    { q: "What areas do you serve?", a: "J&B Premier Cleaning serves the DMV area within 50 miles of Northern Virginia, including Washington, DC, Maryland and Virginia. Contact Bertha to confirm availability at your address." },
    { q: "What cleaning services do you offer?", a: "Residential cleaning, deep cleaning, move-in and move-out cleaning, and office cleaning for homes and small businesses." },
    { q: "How much does a cleaning cost?", a: `It depends on the size and condition of the space. Estimates are always free and there is no obligation. Call or WhatsApp ${phone} to get one.` },
    { q: "Do you speak Spanish?", a: "Yes. Service is available in English and Spanish, whichever you prefer." },
    { q: "What are your hours?", a: `${business.hours.label}. Call or WhatsApp ${phone}, or send a message through the site and Bertha will follow up.` },
    { q: "How do I book a cleaning?", a: `Call or WhatsApp ${phone}, or use the contact form to tell Bertha about your space. She will follow up with a free estimate.` },
  ],
  es: [
    { q: "¿Qué zonas atienden?", a: "J&B Premier Cleaning atiende el área DMV hasta 50 millas del norte de Virginia, incluyendo Washington, DC, Maryland y Virginia. Contacte a Bertha para confirmar disponibilidad en su dirección." },
    { q: "¿Qué servicios de limpieza ofrecen?", a: "Limpieza residencial, limpieza profunda, limpieza de mudanza (entrada y salida) y limpieza de oficinas para hogares y pequeñas empresas." },
    { q: "¿Cuánto cuesta una limpieza?", a: `Depende del tamaño y la condición del espacio. Los presupuestos siempre son gratis y sin compromiso. Llame o escriba por WhatsApp al ${phone} para pedir uno.` },
    { q: "¿Hablan español?", a: "Sí. El servicio está disponible en español e inglés, como usted prefiera." },
    { q: "¿Cuál es su horario?", a: `Lunes a viernes, 9 AM a 5 PM. Llame o escriba por WhatsApp al ${phone}, o envíe un mensaje desde el sitio y Bertha le responderá.` },
    { q: "¿Cómo reservo una limpieza?", a: `Llame o escriba por WhatsApp al ${phone}, o use el formulario de contacto para contarle a Bertha sobre su espacio. Ella le responderá con un presupuesto gratis.` },
  ],
};

export function serviceFaq(service: ServiceSeo, locale: Locale): Faq[] {
  const copy = service.copy[locale];
  const name = copy.name.toLowerCase();
  if (locale === "es") {
    return [
      { q: `¿Qué incluye la ${name}?`, a: `${copy.whatToExpect[0]}. Bertha recorre su espacio con usted y confirma el plan durante el presupuesto gratis, así que lo que se incluye se acuerda antes de la primera visita.` },
      { q: `¿Ofrecen ${name} en mi zona?`, a: "Atendemos el área DMV hasta 50 millas del norte de Virginia, en Virginia, Washington, DC y Maryland. Contacte a Bertha para confirmar disponibilidad en su dirección." },
      { q: `¿Cuánto cuesta la ${name}?`, a: `Depende del tamaño y la condición del espacio. Los presupuestos siempre son gratis y sin compromiso. Llame o escriba por WhatsApp al ${phone}.` },
      { q: "¿Puedo hablar con alguien en español?", a: "Sí. Bertha atiende en español e inglés, por teléfono, WhatsApp o correo." },
    ];
  }
  return [
    { q: `What does ${name} include?`, a: `${copy.whatToExpect[0]}. Bertha walks through your space with you and confirms the plan during the free estimate, so what is included is agreed before the first visit.` },
    { q: `Do you offer ${name} in my area?`, a: "We serve the DMV area within 50 miles of Northern Virginia, across Virginia, Washington, DC and Maryland. Contact Bertha to confirm availability at your address." },
    { q: `How much does ${name} cost?`, a: `It depends on the size and condition of the space. Estimates are always free and there is no obligation. Call or WhatsApp ${phone}.` },
    { q: "Can I get service in Spanish?", a: "Yes. Bertha offers service in English and Spanish by phone, WhatsApp or email." },
  ];
}

export function cityFaq(city: City, locale: Locale): Faq[] {
  const name = city.name;
  if (locale === "es") {
    return [
      { q: `¿Limpian casas en ${name}?`, a: `Sí. ${name} está dentro de nuestra zona de servicio, el área DMV hasta 50 millas del norte de Virginia. Contacte a Bertha para confirmar disponibilidad en su dirección.` },
      { q: `¿Qué servicios están disponibles en ${name}?`, a: `Limpieza residencial, limpieza profunda, limpieza de mudanza y limpieza de oficinas. Cada visita empieza con una conversación y un presupuesto gratis.` },
      { q: `¿Cómo pido un presupuesto en ${name}?`, a: `Llame o escriba por WhatsApp al ${phone}, o use el formulario de contacto con su ciudad o código postal. Bertha le responderá con un presupuesto gratis.` },
      { q: "¿Atienden en español?", a: "Sí. El servicio está disponible en español e inglés, como usted prefiera." },
    ];
  }
  return [
    { q: `Do you clean homes in ${name}?`, a: `Yes. ${name} is within our service area, the DMV within 50 miles of Northern Virginia. Contact Bertha to confirm availability at your address.` },
    { q: `Which services are available in ${name}?`, a: "Residential cleaning, deep cleaning, move-in and move-out cleaning, and office cleaning. Every visit starts with a conversation and a free estimate." },
    { q: `How do I get an estimate in ${name}?`, a: `Call or WhatsApp ${phone}, or use the contact form with your city or ZIP. Bertha will follow up with a free estimate.` },
    { q: "Do you offer service in Spanish?", a: "Yes. Service is available in English and Spanish, whichever you prefer." },
  ];
}
