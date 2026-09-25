import business from "@/content/business.json";
import type { Localized } from "@/lib/i18n";

/** Home page section copy. Facts come from business.json; this is draft marketing copy. */
export interface HomeCopy {
  metaTitle: string;
  metaDescription: string;
  hero: { kicker: string; title: [string, string]; description: string; areaLink: string; careNote: string; imageAlt: string };
  highlights: { label: string; note: string }[];
  highlightsToggle: { pause: string; resume: string; label: string };
  work: {
    eyebrow: string; title: [string, string]; intro: string; before: string; after: string;
    chooseRoom: string; play: string; pause: string; footer: string; footerLink: string;
    rooms: { name: string; title: string; description: string; image: string; alt: string; detail: string }[];
  };
  services: { intro: string; asideEyebrow: string; asideTitle: string; asideBody: string };
  story: { eyebrow: string; title: string; paragraphs: string[]; signoff: string; imageAlt: string };
  booking: { title: [string, string]; body: string; cta: string };
  contact: { eyebrow: string; title: [string, string]; body: string; hours: string; serviceArea: string; languages: string; estimates: string; estimatesValue: string; emailToo: string };
}

export const home: Localized<HomeCopy> = {
  en: {
    metaTitle: `House & Office Cleaning in Northern Virginia | ${business.name}`,
    metaDescription: "Owner-led house, office, deep and move-in/move-out cleaning across Northern Virginia, Washington, DC and Maryland. Bilingual service and free estimates. Call 703-861-8358.",
    hero: {
      kicker: "House & office cleaning in Northern Virginia",
      title: ["A cleaner home.", "A lighter life."],
      description: "Leave the cleaning to us. Come home to a space that feels fresh, cared for, and completely yours.",
      areaLink: "Serving Arlington, Alexandria, Fairfax and the DMV, in English or Spanish.",
      careNote: "Thoughtful cleaning. A personal touch.",
      imageAlt: "A smiling cleaner looking at the camera, wearing a purple polo with the J&B Premier Cleaning logo on her left chest while wiping a kitchen countertop",
    },
    highlights: [
      { label: business.experience, note: `Owner-led by ${business.owner.name}.` },
      { label: business.serviceArea.baseRegion, note: `Serving the DMV within ${business.serviceArea.radiusMiles} miles.` },
      { label: business.languages.join(" & "), note: "Bilingual service, your choice." },
      { label: business.estimates.label, note: "No obligation. Call or WhatsApp." },
    ],
    highlightsToggle: { pause: "Pause scrolling features", resume: "Resume scrolling features", label: "Why choose us" },
    work: {
      eyebrow: "Before & after",
      title: ["The difference is", "in the details."],
      intro: "A little attention goes a long way. Take a closer look at what a fresh start can feel like, one room at a time.",
      before: "Before",
      after: "After",
      chooseRoom: "Choose a room to compare",
      play: "Play room slideshow",
      pause: "Pause room slideshow",
      footer: "Your home could be next.",
      footerLink: "Find the right clean for your space",
      rooms: [
        { name: "Kitchen", title: "A fresh start at the heart of your home.", description: "From busy countertops to a space ready for your next shared meal.", image: "/assets/before-after/kitchen-before-after.webp", alt: "Kitchen before and after cleaning: dishes and crumbs on the left, clear countertops and a tidy kitchen on the right.", detail: "Countertops & everyday spaces" },
        { name: "Bathroom", title: "A little care. A whole new shine.", description: "Clear glass, refreshed surfaces, and room to unwind at the end of the day.", image: "/assets/before-after/bathroom-before-after.webp", alt: "Bathroom before and after cleaning: spotted shower glass and cluttered vanity on the left, clear glass and clean surfaces on the right.", detail: "Glass, tile & finishing touches" },
        { name: "Living room", title: "Less mess. More room to relax.", description: "A reset for your favorite gathering place, from the coffee table to the cozy corners.", image: "/assets/before-after/living-room-before-after.webp", alt: "Living room before and after cleaning: a cluttered coffee table and rumpled sofa on the left, a tidy seating area on the right.", detail: "Shared spaces & cozy corners" },
      ],
    },
    services: {
      intro: "Four ways we care for a space, from routine upkeep to a full reset. Every visit starts with a conversation and a free estimate, so the plan fits your home or office.",
      asideEyebrow: "Not sure where to start?",
      asideTitle: "Tell us about your space. We’ll suggest the right clean.",
      asideBody: "Estimates are always free, with no obligation. Call or message Bertha and she’ll walk you through what makes sense for your home or office, in English or Spanish.",
    },
    story: {
      eyebrow: "Our story",
      title: "Built on honest work.",
      paragraphs: business.story.paragraphs,
      signoff: business.story.signoff,
      imageAlt: "A smiling J&B Premier Cleaning professional posing with her hands gently clasped",
    },
    booking: { title: ["Need a cleaning partner", "you can count on?"], body: business.scheduling.label, cta: "Call for a free estimate" },
    contact: {
      eyebrow: "Let’s get started",
      title: ["A cleaner space", "is one message away."],
      body: "Tell Bertha a little about your space and she’ll follow up with a free estimate, in English or Spanish, whichever you prefer.",
      hours: "Hours",
      serviceArea: "Service area",
      languages: "Languages",
      estimates: "Estimates",
      estimatesValue: "Always free, no obligation",
      emailToo: "Email works too:",
    },
  },
  es: {
    metaTitle: `Limpieza de Casas y Oficinas en el Norte de Virginia | ${business.name}`,
    metaDescription: "Limpieza de casas, oficinas, limpieza profunda y de mudanza en el norte de Virginia, Washington, DC y Maryland, con atención directa de la dueña. Servicio en español y presupuesto gratis. Llame al 703-861-8358.",
    hero: {
      kicker: "Limpieza de casas y oficinas en el norte de Virginia",
      title: ["Un hogar más limpio.", "Una vida más ligera."],
      description: "Déjenos la limpieza a nosotros. Llegue a un hogar que se sienta fresco, cuidado y completamente suyo.",
      areaLink: "Atendemos Arlington, Alexandria, Fairfax y todo el DMV, en español o inglés.",
      careNote: "Limpieza con cuidado. Un toque personal.",
      imageAlt: "Una limpiadora sonriente mira a la cámara con una camisa morada con el logotipo de J&B Premier Cleaning mientras limpia la encimera de una cocina",
    },
    highlights: [
      { label: "Más de 30 años de experiencia", note: `Atención directa de ${business.owner.name}.` },
      { label: "Norte de Virginia", note: `Atendemos el DMV hasta ${business.serviceArea.radiusMiles} millas.` },
      { label: "Español e inglés", note: "Servicio bilingüe, usted elige." },
      { label: "Presupuestos gratis", note: "Sin compromiso. Llame o escriba por WhatsApp." },
    ],
    highlightsToggle: { pause: "Pausar la cinta de beneficios", resume: "Reanudar la cinta de beneficios", label: "Por qué elegirnos" },
    work: {
      eyebrow: "Antes y después",
      title: ["La diferencia está", "en los detalles."],
      intro: "Un poco de atención llega muy lejos. Vea de cerca cómo se siente un nuevo comienzo, una habitación a la vez.",
      before: "Antes",
      after: "Después",
      chooseRoom: "Elija una habitación para comparar",
      play: "Reproducir la presentación",
      pause: "Pausar la presentación",
      footer: "Su hogar podría ser el próximo.",
      footerLink: "Encuentre la limpieza ideal para su espacio",
      rooms: [
        { name: "Cocina", title: "Un nuevo comienzo en el corazón de su hogar.", description: "De encimeras llenas a un espacio listo para la próxima comida en familia.", image: "/assets/before-after/kitchen-before-after.webp", alt: "Cocina antes y después de la limpieza: platos y migas a la izquierda, encimeras despejadas y una cocina ordenada a la derecha.", detail: "Encimeras y espacios diarios" },
        { name: "Baño", title: "Un poco de cuidado. Un brillo nuevo.", description: "Vidrio transparente, superficies renovadas y espacio para relajarse al final del día.", image: "/assets/before-after/bathroom-before-after.webp", alt: "Baño antes y después de la limpieza: mampara manchada y tocador desordenado a la izquierda, vidrio limpio y superficies impecables a la derecha.", detail: "Vidrio, azulejos y detalles finales" },
        { name: "Sala", title: "Menos desorden. Más espacio para descansar.", description: "Un reinicio para su lugar favorito de reunión, de la mesa de centro a los rincones acogedores.", image: "/assets/before-after/living-room-before-after.webp", alt: "Sala antes y después de la limpieza: mesa de centro desordenada y sofá arrugado a la izquierda, área de estar ordenada a la derecha.", detail: "Espacios compartidos y rincones acogedores" },
      ],
    },
    services: {
      intro: "Cuatro maneras de cuidar un espacio, del mantenimiento de rutina a un reinicio completo. Cada visita empieza con una conversación y un presupuesto gratis, para que el plan se ajuste a su casa u oficina.",
      asideEyebrow: "¿No sabe por dónde empezar?",
      asideTitle: "Cuéntenos sobre su espacio. Le sugerimos la limpieza ideal.",
      asideBody: "Los presupuestos siempre son gratis y sin compromiso. Llame o escríbale a Bertha y ella le explicará qué tiene sentido para su casa u oficina, en español o inglés.",
    },
    story: {
      eyebrow: "Nuestra historia",
      title: "Construido sobre trabajo honesto.",
      paragraphs: [
        `Con ${business.owner.name} al frente, J&B Premier Cleaning lleva más de 30 años de experiencia a hogares y oficinas de todo el DMV, hasta 50 millas del norte de Virginia.`,
        "Cuidamos su espacio con atención al detalle, comunicación clara y un toque personal, con servicio en español e inglés.",
      ],
      signoff: "Gente honesta. Trabajo duro. Un toque personal.",
      imageAlt: "Una profesional sonriente de J&B Premier Cleaning posa con las manos suavemente entrelazadas",
    },
    booking: { title: ["¿Necesita un equipo de limpieza", "en el que pueda confiar?"], body: "Visitas únicas o un horario que se adapte a usted. Pregúntele a Bertha.", cta: "Llame para un presupuesto gratis" },
    contact: {
      eyebrow: "Empecemos",
      title: ["Un espacio más limpio", "está a un mensaje de distancia."],
      body: "Cuéntele a Bertha un poco sobre su espacio y ella le responderá con un presupuesto gratis, en español o inglés, como prefiera.",
      hours: "Horario",
      serviceArea: "Zona de servicio",
      languages: "Idiomas",
      estimates: "Presupuestos",
      estimatesValue: "Siempre gratis, sin compromiso",
      emailToo: "También por correo:",
    },
  },
};

/** Localized versions of the business facts that are stored in English in business.json. */
export const facts: Localized<{ hours: string; serviceArea: string; languages: string; experience: string; estimates: string }> = {
  en: { hours: business.hours.label, serviceArea: business.serviceArea.label, languages: business.languages.join(" and "), experience: business.experience, estimates: business.estimates.label },
  es: { hours: "Lunes a viernes, 9 AM a 5 PM", serviceArea: "Área DMV hasta 50 millas del norte de Virginia", languages: "Español e inglés", experience: "Más de 30 años de experiencia", estimates: "Presupuestos gratis" },
};
