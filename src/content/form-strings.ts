import business from "@/content/business.json";
import type { Localized } from "@/lib/i18n";

const firstName = business.owner.name.split(" ")[0];

/** Contact form copy. Service radio values stay as the English business.json names; only labels are translated. */
type Method = { label: string; button: string; hint: string };

export interface FormStrings {
  methods: Record<"email" | "whatsapp" | "sms", Method>;
  to: string;
  website: string;
  name: string;
  location: string;
  optional: string;
  serviceLegend: string;
  serviceNames: Record<string, string>;
  messageLabel: string;
  messagePlaceholder: string;
  sendUsing: string;
  nothingSent: string;
  preferToTalk: string;
  call: string;
  subject: string;
  compose: (input: { firstName: string; name: string; location: string; service: string; message: string }) => string;
  errors: { tooFast: string; checking: string; failed: string; incomplete: string; name: string; tooLong: (max: number) => string; links: string; gibberish: string };
}

export const formStrings: Localized<FormStrings> = {
  en: {
    methods: {
      email: { label: "Email", button: "Send via email", hint: "Opens your email app with your message already written." },
      whatsapp: { label: "WhatsApp", button: "Send on WhatsApp", hint: "Opens WhatsApp with your message already written." },
      sms: { label: "Text message", button: "Send a text message", hint: "Opens your messaging app. Prefilled messages depend on your device." },
    },
    to: "To",
    website: "Website",
    name: "Your name",
    location: "City or ZIP",
    optional: "Optional",
    serviceLegend: "What kind of clean?",
    serviceNames: {},
    messageLabel: `Tell ${firstName} about your space`,
    messagePlaceholder: "Rooms, bathrooms, pets, how often you’d like us to come — whatever helps.",
    sendUsing: "Send using",
    nothingSent: "Nothing is sent until you tap send.",
    preferToTalk: "Prefer to talk?",
    call: "Call",
    subject: "Free cleaning estimate",
    compose: ({ firstName, name, location, service, message }) => {
      const lines = [`Hi ${firstName}, I'm ${name}.`];
      const where = location ? ` in ${location}` : "";
      if (service) lines.push(`I'm looking for ${service.toLowerCase()}${where}.`);
      else if (where) lines.push(`I'm${where}.`);
      if (message) lines.push(message);
      lines.push("Could I get a free estimate?");
      return lines.join("\n\n");
    },
    errors: {
      tooFast: "That was quick! Give your message a once-over, then tap send again.",
      checking: "One moment, the security check is finishing. Then tap send again.",
      failed: "The security check didn't pass. Please refresh the page and try again.",
      incomplete: "Please complete the security check above, then tap send again.",
      name: "Please enter your name without links or symbols.",
      tooLong: (max) => `Please keep your message under ${max} characters.`,
      links: "Please leave links out of your message. You can share them once we reply.",
      gibberish: "Your message looks a little scrambled. Could you take another look?",
    },
  },
  es: {
    methods: {
      email: { label: "Correo", button: "Enviar por correo", hint: "Abre su aplicación de correo con el mensaje ya escrito." },
      whatsapp: { label: "WhatsApp", button: "Enviar por WhatsApp", hint: "Abre WhatsApp con el mensaje ya escrito." },
      sms: { label: "Mensaje de texto", button: "Enviar un mensaje de texto", hint: "Abre su aplicación de mensajes. El texto prellenado depende de su dispositivo." },
    },
    to: "Para",
    website: "Sitio web",
    name: "Su nombre",
    location: "Ciudad o código postal",
    optional: "Opcional",
    serviceLegend: "¿Qué tipo de limpieza?",
    serviceNames: {
      "Residential cleaning": "Limpieza residencial",
      "Deep cleaning": "Limpieza profunda",
      "Move-in & move-out": "Limpieza de mudanza",
      "Office cleaning": "Limpieza de oficinas",
    },
    messageLabel: `Cuéntele a ${firstName} sobre su espacio`,
    messagePlaceholder: "Habitaciones, baños, mascotas, con qué frecuencia le gustaría que vengamos: lo que ayude.",
    sendUsing: "Enviar por",
    nothingSent: "No se envía nada hasta que toque enviar.",
    preferToTalk: "¿Prefiere hablar?",
    call: "Llame al",
    subject: "Presupuesto gratis de limpieza",
    compose: ({ firstName, name, location, service, message }) => {
      const lines = [`Hola ${firstName}, soy ${name}.`];
      const where = location ? ` en ${location}` : "";
      if (service) lines.push(`Busco ${service.toLowerCase()}${where}.`);
      else if (where) lines.push(`Estoy${where}.`);
      if (message) lines.push(message);
      lines.push("¿Podría darme un presupuesto gratis?");
      return lines.join("\n\n");
    },
    errors: {
      tooFast: "¡Qué rápido! Revise su mensaje una vez más y vuelva a tocar enviar.",
      checking: "Un momento, la verificación de seguridad está terminando. Luego vuelva a tocar enviar.",
      failed: "La verificación de seguridad no pasó. Actualice la página e inténtelo de nuevo.",
      incomplete: "Complete la verificación de seguridad de arriba y luego vuelva a tocar enviar.",
      name: "Escriba su nombre sin enlaces ni símbolos.",
      tooLong: (max) => `Mantenga su mensaje por debajo de ${max} caracteres.`,
      links: "Deje los enlaces fuera del mensaje. Podrá compartirlos cuando le respondamos.",
      gibberish: "Su mensaje se ve un poco confuso. ¿Podría revisarlo?",
    },
  },
};
