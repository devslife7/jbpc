import business from "@/content/business.json";
import type { Localized } from "@/lib/i18n";

/**
 * Search-facing copy for each service. Facts (names, chips, images, phone)
 * stay in business.json; this file only adds provisional marketing copy and
 * search keywords. Do not add prices, guarantees, insurance claims, or
 * detailed inclusions until the owner confirms them (see business.json notes).
 */
export type ServiceSlug = "house-cleaning" | "deep-cleaning" | "move-in-move-out-cleaning" | "office-cleaning";

export interface ServiceCopy {
  /** Localized display name used in headings, links, and the contact form. */
  name: string;
  /** Short lowercase phrase for sentences, e.g. "house cleaning". */
  phrase: string;
  /** One-line italic tagline under the card title. */
  note: string;
  h1: string;
  title: string;
  description: string;
  keywords: string[];
  intro: string[];
  whatToExpect: string[];
  idealFor: string[];
  cardBlurb: string;
}

export interface ServiceSeo {
  slug: ServiceSlug;
  /** Joins to business.services[].icon. */
  icon: string;
  /** schema.org Service.serviceType */
  serviceType: string;
  copy: Localized<ServiceCopy>;
}

export const servicesSeo: readonly ServiceSeo[] = [
  {
    slug: "house-cleaning",
    icon: "residential-cleaning",
    serviceType: "House cleaning",
    copy: {
      en: {
        name: "Residential cleaning",
        note: "A home that feels like home.",
        phrase: "house cleaning",
        h1: "House cleaning & maid service in Northern Virginia",
        title: "House Cleaning & Maid Service in Northern Virginia",
        description: "Residential house cleaning and maid service across Northern Virginia, Washington, DC and Maryland. Owner-led, bilingual, free estimates. Call 703-861-8358.",
        keywords: ["house cleaning", "maid service", "residential cleaning", "home cleaning service", "Northern Virginia", "DMV"],
        intro: [
          "A fresh reset for your everyday spaces. From the kitchen to the living room, our residential cleaning gives your home the attention it deserves, whether you live in a condo in Arlington, a townhome in Alexandria, or a single-family house in Fairfax.",
          "Every visit starts with a conversation. Bertha listens to how you use your home, walks through the rooms that matter most to you, and puts together a free estimate. Service is available in English or Spanish.",
        ],
        whatToExpect: [
          "Living spaces, kitchens, bathrooms and bedrooms",
          "A plan built around your home during the free estimate",
          "One-time visits or a schedule that fits you. Ask Bertha.",
          "Clear communication before, during and after each visit",
        ],
        idealFor: ["Busy households and families", "Apartments, condos, townhomes and single-family homes", "Anyone who wants to come home to a fresh space", "Hosts getting ready for guests"],
        cardBlurb: "Everyday upkeep for kitchens, bathrooms, bedrooms and living spaces.",
      },
      es: {
        name: "Limpieza residencial",
        note: "Un hogar que se siente como hogar.",
        phrase: "limpieza de casas",
        h1: "Limpieza de casas y servicio doméstico en el norte de Virginia",
        title: "Limpieza de Casas en el Norte de Virginia",
        description: "Limpieza residencial y servicio doméstico en el norte de Virginia, Washington, DC y Maryland. Atención directa de la dueña, en español o inglés, con presupuesto gratis. Llame al 703-861-8358.",
        keywords: ["limpieza de casas", "servicio de limpieza", "limpieza residencial", "limpieza de hogar", "norte de Virginia", "DMV"],
        intro: [
          "Un nuevo comienzo para los espacios de todos los días. De la cocina a la sala, nuestra limpieza residencial le da a su hogar la atención que merece, ya sea un condominio en Arlington, una casa adosada en Alexandria o una casa unifamiliar en Fairfax.",
          "Cada visita empieza con una conversación. Bertha escucha cómo usa su hogar, recorre las habitaciones que más le importan y prepara un presupuesto gratis. El servicio está disponible en español o inglés.",
        ],
        whatToExpect: [
          "Salas, cocinas, baños y dormitorios",
          "Un plan hecho a la medida de su hogar durante el presupuesto gratis",
          "Visitas únicas o un horario que se adapte a usted. Pregúntele a Bertha.",
          "Comunicación clara antes, durante y después de cada visita",
        ],
        idealFor: ["Hogares y familias con poco tiempo", "Apartamentos, condominios, casas adosadas y unifamiliares", "Quien quiera llegar a una casa fresca y ordenada", "Anfitriones que se preparan para recibir visitas"],
        cardBlurb: "Mantenimiento diario de cocinas, baños, dormitorios y salas.",
      },
    },
  },
  {
    slug: "deep-cleaning",
    icon: "deep-cleaning",
    serviceType: "Deep cleaning",
    copy: {
      en: {
        name: "Deep cleaning",
        note: "A little extra attention.",
        phrase: "deep cleaning",
        h1: "Deep cleaning services in Northern Virginia & the DMV",
        title: "Deep Cleaning Services in Northern Virginia & the DMV",
        description: "Detailed deep cleaning for homes across Northern Virginia, DC and Maryland: built-up grime, overlooked corners and hard-to-reach places. Free estimates, English and Spanish.",
        keywords: ["deep cleaning", "deep house cleaning", "spring cleaning", "detailed cleaning service", "Northern Virginia", "DMV"],
        intro: [
          "For the corners, details, and hard-to-reach places that need a little more care. A deep clean goes further than routine upkeep so you can make room for a thoroughly fresh start.",
          "Deep cleaning is a popular first visit before starting regular service, a seasonal reset, or a way to catch up after a busy stretch. Tell Bertha what has been bothering you and she will shape the visit around it.",
        ],
        whatToExpect: [
          "Detailed surfaces, built-up grime and overlooked corners",
          "Extra time and attention compared with a routine visit",
          "A walkthrough with Bertha so the priorities are yours",
          "Free estimate first, so there are no surprises",
        ],
        idealFor: ["A first visit before regular cleaning", "Seasonal and spring cleaning", "Catching up after renovations or a busy season", "Preparing a home for guests or a special occasion"],
        cardBlurb: "Extra attention for built-up grime, details and hard-to-reach places.",
      },
      es: {
        name: "Limpieza profunda",
        note: "Un poco de atención extra.",
        phrase: "limpieza profunda",
        h1: "Limpieza profunda en el norte de Virginia y el área DMV",
        title: "Limpieza Profunda en el Norte de Virginia y el DMV",
        description: "Limpieza profunda y detallada para hogares en el norte de Virginia, DC y Maryland: suciedad acumulada, rincones olvidados y lugares difíciles de alcanzar. Presupuesto gratis, en español e inglés.",
        keywords: ["limpieza profunda", "limpieza a fondo", "limpieza detallada", "limpieza de primavera", "norte de Virginia", "DMV"],
        intro: [
          "Para los rincones, los detalles y los lugares difíciles de alcanzar que necesitan un poco más de cuidado. Una limpieza profunda va más allá del mantenimiento de rutina para que pueda empezar de nuevo con un hogar realmente fresco.",
          "La limpieza profunda es una primera visita muy común antes de iniciar un servicio regular, un reinicio de temporada o una forma de ponerse al día después de semanas ocupadas. Cuéntele a Bertha qué le preocupa y ella organizará la visita alrededor de eso.",
        ],
        whatToExpect: [
          "Superficies detalladas, suciedad acumulada y rincones olvidados",
          "Más tiempo y atención que una visita de rutina",
          "Un recorrido con Bertha para que las prioridades sean las suyas",
          "Presupuesto gratis primero, sin sorpresas",
        ],
        idealFor: ["Una primera visita antes de la limpieza regular", "Limpieza de temporada o de primavera", "Ponerse al día después de remodelaciones o una temporada ocupada", "Preparar la casa para visitas o una ocasión especial"],
        cardBlurb: "Atención extra para la suciedad acumulada, los detalles y los lugares difíciles.",
      },
    },
  },
  {
    slug: "move-in-move-out-cleaning",
    icon: "move-in-out-cleaning",
    serviceType: "Move-in and move-out cleaning",
    copy: {
      en: {
        name: "Move-in & move-out",
        note: "A clean slate for what’s next.",
        phrase: "move-in and move-out cleaning",
        h1: "Move-in & move-out cleaning in Northern Virginia & the DMV",
        title: "Move In & Move Out Cleaning in Northern Virginia",
        description: "Move-in and move-out cleaning for empty homes and apartments across Northern Virginia, DC and Maryland. Kitchens, bathrooms and a final refresh. Free estimates.",
        keywords: ["move out cleaning", "move in cleaning", "move in move out cleaning", "end of lease cleaning", "apartment move out cleaning", "Northern Virginia"],
        intro: [
          "Close one chapter and begin another with a refreshed space. We clean empty homes and apartments before you settle in or after you move out, so the next step feels like a clean slate.",
          "Moving in the DMV often means tight timelines between closings, lease dates and movers. Share your dates with Bertha and she will work out a plan and a free estimate that fits the schedule.",
        ],
        whatToExpect: [
          "Empty homes, kitchens and bathrooms, and a final refresh",
          "Timing coordinated around your move-in or move-out dates",
          "Attention to the rooms an inspection or a new owner notices first",
          "A free estimate based on the size and condition of the space",
        ],
        idealFor: ["Renters preparing for a final walkthrough", "Buyers and sellers around a closing date", "Landlords and property managers turning over a unit", "Anyone moving into a home that needs a fresh start"],
        cardBlurb: "A clean slate for empty homes, before you settle in or after you move out.",
      },
      es: {
        name: "Limpieza de mudanza",
        note: "Un nuevo comienzo para lo que viene.",
        phrase: "limpieza de mudanza",
        h1: "Limpieza de mudanza (entrada y salida) en el norte de Virginia y el DMV",
        title: "Limpieza de Mudanza en el Norte de Virginia",
        description: "Limpieza de entrada y salida para casas y apartamentos vacíos en el norte de Virginia, DC y Maryland. Cocinas, baños y un repaso final. Presupuesto gratis.",
        keywords: ["limpieza de mudanza", "limpieza de salida", "limpieza de entrada", "limpieza fin de contrato", "limpieza de apartamento vacío", "norte de Virginia"],
        intro: [
          "Cierre un capítulo y empiece otro con un espacio renovado. Limpiamos casas y apartamentos vacíos antes de que se instale o después de que se mude, para que el siguiente paso se sienta como un nuevo comienzo.",
          "Mudarse en el área DMV suele implicar fechas ajustadas entre cierres, contratos y mudanzas. Comparta sus fechas con Bertha y ella organizará un plan y un presupuesto gratis que se ajuste al calendario.",
        ],
        whatToExpect: [
          "Casas vacías, cocinas y baños, y un repaso final",
          "Horario coordinado con sus fechas de entrada o salida",
          "Atención a las áreas que una inspección o un nuevo dueño nota primero",
          "Presupuesto gratis según el tamaño y la condición del espacio",
        ],
        idealFor: ["Inquilinos que se preparan para la inspección final", "Compradores y vendedores cerca de la fecha de cierre", "Propietarios y administradores que entregan una unidad", "Quien se muda a una casa que necesita un nuevo comienzo"],
        cardBlurb: "Un nuevo comienzo para casas vacías, antes de instalarse o después de mudarse.",
      },
    },
  },
  {
    slug: "office-cleaning",
    icon: "office-cleaning",
    serviceType: "Office and commercial cleaning",
    copy: {
      en: {
        name: "Office cleaning",
        note: "Fresh spaces. Clear minds.",
        phrase: "office cleaning",
        h1: "Office & commercial cleaning in Northern Virginia & the DMV",
        title: "Office & Commercial Cleaning in Northern Virginia",
        description: "Office and commercial cleaning for small businesses across Northern Virginia, DC and Maryland: workspaces, common areas and break rooms. Owner-led, bilingual, free estimates.",
        keywords: ["office cleaning", "commercial cleaning", "small business cleaning", "janitorial service", "workplace cleaning", "Northern Virginia"],
        intro: [
          "A welcoming workspace starts with the details. We bring a fresh feel to the shared spaces where your team spends its day, from desks and meeting rooms to lobbies and break rooms.",
          "Small offices, clinics, studios and storefronts across the DMV work with Bertha directly, so questions get answered by the person doing the work. Visits are planned around your hours after a free estimate.",
        ],
        whatToExpect: [
          "Workspaces, common areas and break rooms",
          "Visits planned around your business hours",
          "A single point of contact: the owner",
          "A free walkthrough and estimate before any commitment",
        ],
        idealFor: ["Small and mid-size offices", "Medical, dental and professional suites", "Studios, salons and storefronts", "Shared spaces that welcome clients every day"],
        cardBlurb: "Fresh workspaces, common areas and break rooms for small businesses.",
      },
      es: {
        name: "Limpieza de oficinas",
        note: "Espacios frescos. Mentes claras.",
        phrase: "limpieza de oficinas",
        h1: "Limpieza de oficinas y comercios en el norte de Virginia y el DMV",
        title: "Limpieza de Oficinas y Comercios en el Norte de Virginia",
        description: "Limpieza de oficinas y locales comerciales para pequeñas empresas en el norte de Virginia, DC y Maryland: áreas de trabajo, zonas comunes y comedores. Atención de la dueña, en español e inglés, presupuesto gratis.",
        keywords: ["limpieza de oficinas", "limpieza comercial", "limpieza para negocios", "servicio de limpieza empresarial", "norte de Virginia"],
        intro: [
          "Un espacio de trabajo acogedor empieza por los detalles. Le damos un aire fresco a las áreas que su equipo comparte cada día, desde escritorios y salas de reuniones hasta recepciones y comedores.",
          "Oficinas pequeñas, clínicas, estudios y locales en todo el DMV tratan directamente con Bertha, así que las preguntas las responde la persona que hace el trabajo. Las visitas se planifican según su horario después de un presupuesto gratis.",
        ],
        whatToExpect: [
          "Áreas de trabajo, zonas comunes y comedores",
          "Visitas planificadas según su horario de trabajo",
          "Un solo punto de contacto: la dueña",
          "Recorrido y presupuesto gratis antes de cualquier compromiso",
        ],
        idealFor: ["Oficinas pequeñas y medianas", "Consultorios médicos, dentales y profesionales", "Estudios, salones y locales comerciales", "Espacios compartidos que reciben clientes todos los días"],
        cardBlurb: "Áreas de trabajo, zonas comunes y comedores frescos para pequeñas empresas.",
      },
    },
  },
];

export function getServiceSeo(slug: string): ServiceSeo | undefined {
  return servicesSeo.find((service) => service.slug === slug);
}

/** The business.json record (chips, image, English name) behind a service. */
export function getServiceFacts(service: ServiceSeo) {
  const facts = business.services.find((item) => item.icon === service.icon);
  if (!facts) throw new Error(`business.json has no service with icon "${service.icon}"`);
  return facts;
}
