import type { Localized } from "@/lib/i18n";

/**
 * Site-wide interface copy in both languages. Section copy for the home page
 * lives in home.ts; search-facing service and city copy live in
 * services-seo.ts and locations.ts.
 */
export interface UiStrings {
  skipToContent: string;
  homeAriaLabel: string;
  nav: { label: string; services: string; areas: string; work: string; story: string; contact: string; bookNow: string; call: string };
  languageToggle: { label: string; switchTo: string };
  breadcrumbs: { label: string; home: string; services: string; areas: string };
  cta: { bookNow: string; call: string; estimate: string; whatsapp: string; learnMore: string; allServices: string; allAreas: string; viewService: string };
  footer: { tagline: string; services: string; areas: string; contact: string; hours: string; serviceArea: string; languages: string; ready: string; bookYourClean: string; closing: string; navLabel: string };
  faq: { eyebrow: string; title: string };
  services: { eyebrow: string; title: [string, string]; indexTitle: [string, string]; indexIntro: string; whatToExpect: string; idealFor: string; areasTitle: string; areasIntro: string; inCity: (service: string, city: string) => string };
  areas: { eyebrow: string; indexTitle: [string, string]; indexIntro: string; groups: { VA: string; DC: string; MD: string }; note: string; servicesIn: (city: string) => string; neighborhoods: (city: string) => string; nearby: string; cityNote: string; cityEyebrow: (state: string) => string };
  notFound: { title: string; body: string; home: string };
}

export const ui: Localized<UiStrings> = {
  en: {
    skipToContent: "Skip to content",
    homeAriaLabel: "J&B Premier Cleaning — home",
    nav: { label: "Main navigation", services: "Services", areas: "Areas", work: "Our work", story: "Our story", contact: "Contact", bookNow: "Book now", call: "Call" },
    languageToggle: { label: "Language", switchTo: "Español" },
    breadcrumbs: { label: "Breadcrumb", home: "Home", services: "Services", areas: "Areas we serve" },
    cta: { bookNow: "Book now", call: "Call", estimate: "Request a free estimate", whatsapp: "Message on WhatsApp", learnMore: "Learn more", allServices: "See all services", allAreas: "See all areas we serve", viewService: "About this service" },
    footer: { tagline: "Thoughtful cleaning for the spaces that matter most.", services: "Services", areas: "Areas we serve", contact: "Contact", hours: "Hours", serviceArea: "Service area", languages: "Languages", ready: "Ready for a fresh start?", bookYourClean: "Book your clean", closing: "Clean spaces. Clear minds.", navLabel: "Footer navigation" },
    faq: { eyebrow: "Questions", title: "Good to know before you book." },
    services: {
      eyebrow: "Our services",
      title: ["Cleaning that fits", "the way you live."],
      indexTitle: ["Four ways we care", "for a space."],
      indexIntro: "From routine upkeep to a full reset, for homes and offices across the DMV. Every visit starts with a conversation and a free estimate, so the plan fits your space.",
      whatToExpect: "What to expect",
      idealFor: "Ideal for",
      areasTitle: "Where we offer this service",
      areasIntro: "Across the DMV within 50 miles of Northern Virginia. Contact Bertha to confirm availability at your address.",
      inCity: (service, city) => `${service} in ${city}`,
    },
    areas: {
      eyebrow: "Areas we serve",
      indexTitle: ["Cleaning across", "the DMV."],
      indexIntro: "J&B Premier Cleaning serves homes and offices within 50 miles of Northern Virginia, across Virginia, Washington, DC and Maryland. Pick your area to see what we offer nearby.",
      groups: { VA: "Northern Virginia", DC: "Washington, DC", MD: "Maryland" },
      note: "Not on the list? We serve the DMV area within 50 miles of Northern Virginia. Contact Bertha to confirm availability at your address.",
      servicesIn: (city) => `Cleaning services in ${city}`,
      neighborhoods: (city) => `Around ${city}`,
      nearby: "Nearby areas",
      cityNote: "Contact Bertha to confirm availability at your address.",
      cityEyebrow: (state) => `Areas we serve · ${state}`,
    },
    notFound: { title: "That page has moved or never existed.", body: "Let's get you back to a clean start. Browse our services, find your area, or call Bertha directly.", home: "Back to home" },
  },
  es: {
    skipToContent: "Ir al contenido",
    homeAriaLabel: "J&B Premier Cleaning — inicio",
    nav: { label: "Navegación principal", services: "Servicios", areas: "Zonas", work: "Nuestro trabajo", story: "Nuestra historia", contact: "Contacto", bookNow: "Reservar", call: "Llamar" },
    languageToggle: { label: "Idioma", switchTo: "English" },
    breadcrumbs: { label: "Ruta de navegación", home: "Inicio", services: "Servicios", areas: "Zonas de servicio" },
    cta: { bookNow: "Reservar", call: "Llamar al", estimate: "Pedir un presupuesto gratis", whatsapp: "Escribir por WhatsApp", learnMore: "Más información", allServices: "Ver todos los servicios", allAreas: "Ver todas las zonas", viewService: "Sobre este servicio" },
    footer: { tagline: "Limpieza con cuidado para los espacios que más importan.", services: "Servicios", areas: "Zonas de servicio", contact: "Contacto", hours: "Horario", serviceArea: "Zona de servicio", languages: "Idiomas", ready: "¿Lista para un nuevo comienzo?", bookYourClean: "Reserve su limpieza", closing: "Espacios limpios. Mentes claras.", navLabel: "Navegación del pie de página" },
    faq: { eyebrow: "Preguntas", title: "Bueno saberlo antes de reservar." },
    services: {
      eyebrow: "Nuestros servicios",
      title: ["Limpieza que se adapta", "a su forma de vivir."],
      indexTitle: ["Cuatro maneras de cuidar", "un espacio."],
      indexIntro: "Del mantenimiento de rutina a un reinicio completo, para hogares y oficinas en todo el DMV. Cada visita empieza con una conversación y un presupuesto gratis, para que el plan se ajuste a su espacio.",
      whatToExpect: "Qué esperar",
      idealFor: "Ideal para",
      areasTitle: "Dónde ofrecemos este servicio",
      areasIntro: "En todo el DMV, hasta 50 millas del norte de Virginia. Contacte a Bertha para confirmar disponibilidad en su dirección.",
      inCity: (service, city) => `${service} en ${city}`,
    },
    areas: {
      eyebrow: "Zonas de servicio",
      indexTitle: ["Limpieza en todo", "el área DMV."],
      indexIntro: "J&B Premier Cleaning atiende hogares y oficinas hasta 50 millas del norte de Virginia, en Virginia, Washington, DC y Maryland. Elija su zona para ver qué ofrecemos cerca de usted.",
      groups: { VA: "Norte de Virginia", DC: "Washington, DC", MD: "Maryland" },
      note: "¿No está en la lista? Atendemos el área DMV hasta 50 millas del norte de Virginia. Contacte a Bertha para confirmar disponibilidad en su dirección.",
      servicesIn: (city) => `Servicios de limpieza en ${city}`,
      neighborhoods: (city) => `Alrededor de ${city}`,
      nearby: "Zonas cercanas",
      cityNote: "Contacte a Bertha para confirmar disponibilidad en su dirección.",
      cityEyebrow: (state) => `Zonas de servicio · ${state}`,
    },
    notFound: { title: "Esa página se movió o nunca existió.", body: "Volvamos a un comienzo limpio. Vea nuestros servicios, busque su zona o llame a Bertha directamente.", home: "Volver al inicio" },
  },
};
