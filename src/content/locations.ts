import type { Localized } from "@/lib/i18n";
import type { ServiceSlug } from "@/content/services-seo";

/**
 * Service-area landing page data. Place facts (coordinates, counties,
 * neighborhoods) are public knowledge. Copy is provisional marketing copy
 * and must never claim an address, prices, guarantees, insurance, or numbers
 * of past jobs. Every city page also shows business.serviceArea.note.
 */
export type StateCode = "VA" | "DC" | "MD";
export type PlaceKind = "county" | "independent-city" | "city" | "town" | "cdp" | "district";

export interface CityCopy {
  /** One sentence for the areas index. */
  blurb: string;
  /** Two short paragraphs for the city page. */
  intro: [string, string];
  /** One city-flavored sentence per service. */
  services: Record<ServiceSlug, string>;
}

export interface City {
  slug: string;
  name: string;
  state: StateCode;
  stateName: Localized<string>;
  county: string | null;
  kind: PlaceKind;
  geo: { latitude: number; longitude: number };
  sameAs: string;
  neighborhoods: string[];
  nearby: string[];
  copy: Localized<CityCopy>;
}

const VA: Localized<string> = { en: "Virginia", es: "Virginia" };
const MD: Localized<string> = { en: "Maryland", es: "Maryland" };
const DC: Localized<string> = { en: "District of Columbia", es: "Distrito de Columbia" };

export const cities: readonly City[] = [
  {
    slug: "arlington", name: "Arlington", state: "VA", stateName: VA, county: "Arlington County", kind: "county",
    geo: { latitude: 38.8816, longitude: -77.091 }, sameAs: "https://en.wikipedia.org/wiki/Arlington_County,_Virginia",
    neighborhoods: ["Clarendon", "Ballston", "Rosslyn", "Courthouse", "Shirlington", "Crystal City", "Columbia Pike", "Westover"],
    nearby: ["alexandria", "falls-church", "mclean", "washington-dc"],
    copy: {
      en: {
        blurb: "High-rise condos along the Orange Line, brick colonials off Columbia Pike, and offices from Rosslyn to Crystal City.",
        intro: [
          "Arlington packs a lot into a small county: high-rise condos along Wilson Boulevard, garden apartments in Shirlington, and tree-lined streets of brick colonials and Cape Cods north of Route 50. Whatever your home looks like, we clean it with the same attention to detail.",
          "Bertha has spent over 30 years cleaning homes and offices across the DMV, and Arlington sits at the heart of that service area. Reach her by phone or WhatsApp for a free estimate, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Regular upkeep for Arlington condos, townhomes and single-family houses, planned around your building's rules and your schedule.",
          "deep-cleaning": "A detailed reset for kitchens and bathrooms in older Arlington homes and well-loved apartments alike.",
          "move-in-move-out-cleaning": "Turnover cleaning for the many renters and buyers moving in and out along the Rosslyn-Ballston corridor.",
          "office-cleaning": "Fresh workspaces for small offices, clinics and studios from Rosslyn and Courthouse to Crystal City.",
        },
      },
      es: {
        blurb: "Condominios de gran altura sobre la Línea Naranja, casas coloniales de ladrillo cerca de Columbia Pike y oficinas de Rosslyn a Crystal City.",
        intro: [
          "Arlington concentra mucho en un condado pequeño: condominios de gran altura a lo largo de Wilson Boulevard, apartamentos con jardín en Shirlington y calles arboladas con casas coloniales de ladrillo al norte de la Ruta 50. Sea cual sea su hogar, lo limpiamos con la misma atención al detalle.",
          "Bertha lleva más de 30 años limpiando hogares y oficinas en todo el DMV, y Arlington está en el corazón de esa zona de servicio. Comuníquese con ella por teléfono o WhatsApp para un presupuesto gratis, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Mantenimiento regular para condominios, casas adosadas y unifamiliares de Arlington, planificado según las reglas de su edificio y su horario.",
          "deep-cleaning": "Un reinicio detallado para cocinas y baños, tanto en casas antiguas de Arlington como en apartamentos muy vividos.",
          "move-in-move-out-cleaning": "Limpieza de entrega para los muchos inquilinos y compradores que entran y salen del corredor Rosslyn-Ballston.",
          "office-cleaning": "Espacios de trabajo frescos para oficinas pequeñas, clínicas y estudios de Rosslyn y Courthouse a Crystal City.",
        },
      },
    },
  },
  {
    slug: "alexandria", name: "Alexandria", state: "VA", stateName: VA, county: null, kind: "independent-city",
    geo: { latitude: 38.8048, longitude: -77.0469 }, sameAs: "https://en.wikipedia.org/wiki/Alexandria,_Virginia",
    neighborhoods: ["Old Town", "Del Ray", "Carlyle", "Potomac Yard", "Rosemont", "West End", "Kingstowne"],
    nearby: ["arlington", "washington-dc", "woodbridge", "falls-church"],
    copy: {
      en: {
        blurb: "Historic Old Town rowhouses, Del Ray bungalows, and newer condos around Potomac Yard and Carlyle.",
        intro: [
          "From the cobblestone blocks of Old Town to the bungalows of Del Ray and the newer condos around Potomac Yard, Alexandria homes come in every age and layout. Older houses with original floors and trim call for a careful hand, and that is exactly what we bring.",
          "Alexandria is minutes from our Northern Virginia base, so scheduling is simple. Call or WhatsApp Bertha for a free estimate for your home, rental or small office, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Routine cleaning for Alexandria rowhouses, condos and family homes, with care for historic finishes.",
          "deep-cleaning": "A thorough reset for the built-up grime that older Old Town and Rosemont homes collect over time.",
          "move-in-move-out-cleaning": "Move-out cleaning for renters and sellers in Carlyle, Potomac Yard and the West End before the final walkthrough.",
          "office-cleaning": "Office and storefront cleaning along King Street, in Carlyle and around the Eisenhower corridor.",
        },
      },
      es: {
        blurb: "Casas históricas en hilera de Old Town, bungalows en Del Ray y condominios nuevos alrededor de Potomac Yard y Carlyle.",
        intro: [
          "De las cuadras empedradas de Old Town a los bungalows de Del Ray y los condominios nuevos alrededor de Potomac Yard, los hogares de Alexandria vienen en todas las épocas y distribuciones. Las casas antiguas con pisos y molduras originales piden una mano cuidadosa, y eso es justo lo que ofrecemos.",
          "Alexandria está a minutos de nuestra base en el norte de Virginia, así que programar es sencillo. Llame o escríbale a Bertha por WhatsApp para un presupuesto gratis para su casa, alquiler u oficina pequeña, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza de rutina para casas en hilera, condominios y hogares familiares de Alexandria, con cuidado por los acabados históricos.",
          "deep-cleaning": "Un reinicio a fondo para la suciedad acumulada que las casas antiguas de Old Town y Rosemont juntan con el tiempo.",
          "move-in-move-out-cleaning": "Limpieza de salida para inquilinos y vendedores en Carlyle, Potomac Yard y el West End antes de la inspección final.",
          "office-cleaning": "Limpieza de oficinas y locales sobre King Street, en Carlyle y alrededor del corredor de Eisenhower.",
        },
      },
    },
  },
  {
    slug: "fairfax", name: "Fairfax", state: "VA", stateName: VA, county: null, kind: "independent-city",
    geo: { latitude: 38.8462, longitude: -77.3064 }, sameAs: "https://en.wikipedia.org/wiki/Fairfax,_Virginia",
    neighborhoods: ["Old Town Fairfax", "Fair Oaks", "Mosaic District", "Burke", "Annandale", "Centreville", "Fairfax Station"],
    nearby: ["vienna", "falls-church", "manassas", "herndon"],
    copy: {
      en: {
        blurb: "Split-levels and colonials around Old Town Fairfax, family neighborhoods in Burke and Centreville, and offices near Fair Oaks.",
        intro: [
          "Fairfax is where many DMV families settle: split-levels and colonials on quiet cul-de-sacs, townhome communities in Burke and Centreville, and newer apartments near the Mosaic District. Bigger homes and busy households are exactly what we are set up for.",
          "The City of Fairfax and the surrounding county are at the center of our service area, so the whole area from Annandale to Fairfax Station is an easy visit. Reach Bertha for a free estimate, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Whole-home upkeep for Fairfax families, from playrooms and kitchens to the guest bath nobody has time for.",
          "deep-cleaning": "A seasonal deep clean for larger Fairfax homes where corners, baseboards and grout have been waiting.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning around Fairfax, Burke and Centreville, timed to closings and lease dates.",
          "office-cleaning": "Cleaning for professional suites and small businesses near Fair Oaks, Old Town Fairfax and Route 50.",
        },
      },
      es: {
        blurb: "Casas de dos niveles y coloniales alrededor de Old Town Fairfax, vecindarios familiares en Burke y Centreville, y oficinas cerca de Fair Oaks.",
        intro: [
          "Fairfax es donde muchas familias del DMV echan raíces: casas de dos niveles y coloniales en calles sin salida, comunidades de casas adosadas en Burke y Centreville, y apartamentos nuevos cerca del Mosaic District. Casas grandes y hogares ocupados son justo para lo que estamos preparados.",
          "La ciudad de Fairfax y el condado que la rodea están en el centro de nuestra zona de servicio, así que toda el área de Annandale a Fairfax Station es una visita fácil. Comuníquese con Bertha para un presupuesto gratis, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Mantenimiento de toda la casa para familias de Fairfax, desde salas de juego y cocinas hasta ese baño de visitas que nadie tiene tiempo de atender.",
          "deep-cleaning": "Una limpieza profunda de temporada para casas grandes de Fairfax donde rincones, zócalos y juntas llevan tiempo esperando.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida en Fairfax, Burke y Centreville, coordinada con cierres y fechas de contrato.",
          "office-cleaning": "Limpieza para consultorios y pequeñas empresas cerca de Fair Oaks, Old Town Fairfax y la Ruta 50.",
        },
      },
    },
  },
  {
    slug: "falls-church", name: "Falls Church", state: "VA", stateName: VA, county: null, kind: "independent-city",
    geo: { latitude: 38.8823, longitude: -77.1711 }, sameAs: "https://en.wikipedia.org/wiki/Falls_Church,_Virginia",
    neighborhoods: ["Seven Corners", "West Falls Church", "Lake Barcroft", "Bailey's Crossroads", "Pimmit Hills", "Sleepy Hollow"],
    nearby: ["arlington", "mclean", "vienna", "fairfax"],
    copy: {
      en: {
        blurb: "A small city of ramblers and colonials, plus new condos downtown and apartments around Seven Corners.",
        intro: [
          "Falls Church mixes mid-century ramblers and colonials on leafy lots with a fast-growing downtown of new condos and mixed-use buildings along Broad Street. Around it, Seven Corners, Lake Barcroft and Pimmit Hills add garden apartments and family homes of every size.",
          "It is one of the closest communities to our Northern Virginia base, which makes flexible scheduling easy. Contact Bertha for a free estimate for your home or office, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Regular cleaning for Falls Church ramblers, colonials and the new condos along Broad Street.",
          "deep-cleaning": "Detailed deep cleaning for mid-century homes around Lake Barcroft and Sleepy Hollow.",
          "move-in-move-out-cleaning": "Turnover cleaning for apartments and homes around Seven Corners and West Falls Church.",
          "office-cleaning": "Office cleaning for the small businesses and professional suites along Broad Street and Route 7.",
        },
      },
      es: {
        blurb: "Una ciudad pequeña de casas de un nivel y coloniales, además de condominios nuevos en el centro y apartamentos alrededor de Seven Corners.",
        intro: [
          "Falls Church combina casas de un nivel y coloniales de mediados de siglo en lotes arbolados con un centro en pleno crecimiento de condominios nuevos y edificios de uso mixto sobre Broad Street. Alrededor, Seven Corners, Lake Barcroft y Pimmit Hills suman apartamentos con jardín y casas familiares de todos los tamaños.",
          "Es una de las comunidades más cercanas a nuestra base en el norte de Virginia, lo que facilita un horario flexible. Contacte a Bertha para un presupuesto gratis para su casa u oficina, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza regular para las casas de un nivel, coloniales y los condominios nuevos de Broad Street en Falls Church.",
          "deep-cleaning": "Limpieza profunda detallada para casas de mediados de siglo alrededor de Lake Barcroft y Sleepy Hollow.",
          "move-in-move-out-cleaning": "Limpieza de entrega para apartamentos y casas alrededor de Seven Corners y West Falls Church.",
          "office-cleaning": "Limpieza de oficinas para pequeñas empresas y consultorios sobre Broad Street y la Ruta 7.",
        },
      },
    },
  },
  {
    slug: "mclean", name: "McLean", state: "VA", stateName: VA, county: "Fairfax County", kind: "cdp",
    geo: { latitude: 38.9339, longitude: -77.1773 }, sameAs: "https://en.wikipedia.org/wiki/McLean,_Virginia",
    neighborhoods: ["Tysons", "Langley", "Chesterbrook", "Great Falls", "Pimmit Hills", "Salona Village"],
    nearby: ["vienna", "falls-church", "arlington", "bethesda"],
    copy: {
      en: {
        blurb: "Large homes on wooded lots, Tysons high-rises, and the offices of one of the region's biggest business districts.",
        intro: [
          "McLean is known for larger homes on wooded lots in Langley, Chesterbrook and toward Great Falls, alongside the high-rise condos and corporate offices of Tysons. Big houses with many bathrooms and finishes that deserve care are a natural fit for a detail-focused cleaner.",
          "Bertha handles each estimate personally, walking the home with you so the plan matches the way you live in it. Call or WhatsApp for a free estimate, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Consistent upkeep for larger McLean homes, from multiple bathrooms to formal living areas that guests see first.",
          "deep-cleaning": "A meticulous deep clean for kitchens, bathrooms and detail work in McLean and Great Falls homes.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for houses and Tysons condos changing hands.",
          "office-cleaning": "Office cleaning for small suites and studios in Tysons and along Chain Bridge Road.",
        },
      },
      es: {
        blurb: "Casas grandes en lotes arbolados, torres en Tysons y las oficinas de uno de los distritos de negocios más grandes de la región.",
        intro: [
          "McLean es conocido por sus casas grandes en lotes arbolados en Langley, Chesterbrook y hacia Great Falls, junto a los condominios de gran altura y las oficinas corporativas de Tysons. Casas amplias con varios baños y acabados que merecen cuidado son un encaje natural para una limpieza enfocada en los detalles.",
          "Bertha se encarga de cada presupuesto personalmente, recorriendo la casa con usted para que el plan coincida con la forma en que la vive. Llame o escriba por WhatsApp para un presupuesto gratis, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Mantenimiento constante para casas grandes de McLean, desde varios baños hasta las salas formales que las visitas ven primero.",
          "deep-cleaning": "Una limpieza profunda meticulosa para cocinas, baños y detalles en casas de McLean y Great Falls.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para casas y condominios de Tysons que cambian de manos.",
          "office-cleaning": "Limpieza de oficinas para suites pequeñas y estudios en Tysons y sobre Chain Bridge Road.",
        },
      },
    },
  },
  {
    slug: "vienna", name: "Vienna", state: "VA", stateName: VA, county: "Fairfax County", kind: "town",
    geo: { latitude: 38.9012, longitude: -77.2653 }, sameAs: "https://en.wikipedia.org/wiki/Vienna,_Virginia",
    neighborhoods: ["Tysons", "Oakton", "Dunn Loring", "Wolf Trap", "Merrifield", "Maple Avenue"],
    nearby: ["mclean", "fairfax", "reston", "falls-church"],
    copy: {
      en: {
        blurb: "A small-town main street surrounded by family homes in Oakton, Wolf Trap and Dunn Loring, minutes from Tysons.",
        intro: [
          "The Town of Vienna keeps a small-town feel along Maple Avenue while family homes fill the streets of Oakton, Wolf Trap and Dunn Loring, all a short drive from Tysons. Many households here juggle work, school and sports, and cleaning is the first thing to fall behind.",
          "We take that off your list. Bertha plans each visit around your home during a free estimate, and service is available in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Dependable house cleaning for busy Vienna and Oakton families, kitchens and bathrooms first.",
          "deep-cleaning": "Deep cleaning for the details a regular week never gets to, from baseboards to the corners behind furniture.",
          "move-in-move-out-cleaning": "Move-out and move-in cleaning for homes changing hands around Vienna, Dunn Loring and Merrifield.",
          "office-cleaning": "Office cleaning for practices and small businesses along Maple Avenue and near the Vienna Metro.",
        },
      },
      es: {
        blurb: "Una calle principal de pueblo rodeada de casas familiares en Oakton, Wolf Trap y Dunn Loring, a minutos de Tysons.",
        intro: [
          "El pueblo de Vienna conserva un aire tranquilo sobre Maple Avenue mientras las casas familiares llenan las calles de Oakton, Wolf Trap y Dunn Loring, todo a poca distancia de Tysons. Muchos hogares aquí combinan trabajo, escuela y deportes, y la limpieza es lo primero que se queda atrás.",
          "Nosotros lo quitamos de su lista. Bertha planifica cada visita según su hogar durante un presupuesto gratis, y el servicio está disponible en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas confiable para familias ocupadas de Vienna y Oakton, cocinas y baños primero.",
          "deep-cleaning": "Limpieza profunda para los detalles a los que una semana normal nunca llega, de los zócalos a los rincones detrás de los muebles.",
          "move-in-move-out-cleaning": "Limpieza de salida y entrada para casas que cambian de manos en Vienna, Dunn Loring y Merrifield.",
          "office-cleaning": "Limpieza de oficinas para consultorios y pequeñas empresas sobre Maple Avenue y cerca del Metro de Vienna.",
        },
      },
    },
  },
  {
    slug: "reston", name: "Reston", state: "VA", stateName: VA, county: "Fairfax County", kind: "cdp",
    geo: { latitude: 38.9586, longitude: -77.357 }, sameAs: "https://en.wikipedia.org/wiki/Reston,_Virginia",
    neighborhoods: ["Reston Town Center", "Lake Anne", "South Lakes", "North Point", "Hunters Woods", "Tall Oaks"],
    nearby: ["herndon", "vienna", "ashburn", "fairfax"],
    copy: {
      en: {
        blurb: "Planned-community townhomes and cluster homes around the lakes, plus condos and offices at Reston Town Center.",
        intro: [
          "Reston was planned around its lakes, trails and village centers, and its housing reflects that: townhome clusters near Lake Anne and South Lakes, single-family homes in North Point, and newer condos and offices around Reston Town Center and the Silver Line.",
          "Townhomes with multiple levels and shared-wall condos each have their own cleaning rhythm. Bertha walks through yours during a free estimate and tailors the visit, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Regular cleaning for Reston townhomes, cluster homes and Town Center condos.",
          "deep-cleaning": "A deep reset for multi-level townhomes where stairs, bathrooms and kitchens need extra attention.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for Reston renters and buyers near the Wiehle and Town Center stations.",
          "office-cleaning": "Cleaning for small offices and studios in Reston Town Center and along Sunrise Valley Drive.",
        },
      },
      es: {
        blurb: "Casas adosadas y agrupadas de una comunidad planificada alrededor de los lagos, además de condominios y oficinas en Reston Town Center.",
        intro: [
          "Reston se planificó alrededor de sus lagos, senderos y centros de barrio, y su vivienda lo refleja: grupos de casas adosadas cerca de Lake Anne y South Lakes, casas unifamiliares en North Point, y condominios y oficinas nuevos alrededor de Reston Town Center y la Línea Plateada.",
          "Las casas adosadas de varios niveles y los condominios con paredes compartidas tienen cada uno su propio ritmo de limpieza. Bertha recorre el suyo durante un presupuesto gratis y adapta la visita, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza regular para casas adosadas, casas agrupadas y condominios de Town Center en Reston.",
          "deep-cleaning": "Un reinicio profundo para casas adosadas de varios niveles donde escaleras, baños y cocinas necesitan atención extra.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para inquilinos y compradores de Reston cerca de las estaciones Wiehle y Town Center.",
          "office-cleaning": "Limpieza para oficinas pequeñas y estudios en Reston Town Center y sobre Sunrise Valley Drive.",
        },
      },
    },
  },
  {
    slug: "herndon", name: "Herndon", state: "VA", stateName: VA, county: "Fairfax County", kind: "town",
    geo: { latitude: 38.9696, longitude: -77.3861 }, sameAs: "https://en.wikipedia.org/wiki/Herndon,_Virginia",
    neighborhoods: ["Downtown Herndon", "Franklin Farm", "Fox Mill", "Dulles corridor", "Sterling", "Worldgate"],
    nearby: ["reston", "ashburn", "vienna", "fairfax"],
    copy: {
      en: {
        blurb: "A historic downtown, townhome and single-family neighborhoods like Franklin Farm, and offices along the Dulles corridor.",
        intro: [
          "Herndon pairs a historic downtown along the W&OD Trail with established neighborhoods like Franklin Farm and Fox Mill and the office parks of the Dulles technology corridor. Many families here move for work and stay for the schools, which keeps homes and rentals busy.",
          "Whether you need a regular visit or a one-time reset, Bertha starts with a walkthrough and a free estimate, offered in English or Spanish.",
        ],
        services: {
          "house-cleaning": "House cleaning for Herndon townhomes and single-family homes in Franklin Farm, Fox Mill and downtown.",
          "deep-cleaning": "Deep cleaning that gets into kitchens, bathrooms and overlooked corners before guests or a new season.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for the many relocating renters and buyers around Herndon and Sterling.",
          "office-cleaning": "Office cleaning for small suites in the Dulles corridor, Worldgate and downtown Herndon.",
        },
      },
      es: {
        blurb: "Un centro histórico, vecindarios de casas adosadas y unifamiliares como Franklin Farm, y oficinas sobre el corredor de Dulles.",
        intro: [
          "Herndon combina un centro histórico junto al sendero W&OD con vecindarios consolidados como Franklin Farm y Fox Mill y los parques de oficinas del corredor tecnológico de Dulles. Muchas familias llegan por trabajo y se quedan por las escuelas, lo que mantiene ocupadas casas y alquileres.",
          "Ya sea que necesite una visita regular o un reinicio único, Bertha empieza con un recorrido y un presupuesto gratis, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas para casas adosadas y unifamiliares de Herndon en Franklin Farm, Fox Mill y el centro.",
          "deep-cleaning": "Limpieza profunda que llega a cocinas, baños y rincones olvidados antes de recibir visitas o de una nueva temporada.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para los muchos inquilinos y compradores que se reubican en Herndon y Sterling.",
          "office-cleaning": "Limpieza de oficinas para suites pequeñas en el corredor de Dulles, Worldgate y el centro de Herndon.",
        },
      },
    },
  },
  {
    slug: "ashburn", name: "Ashburn", state: "VA", stateName: VA, county: "Loudoun County", kind: "cdp",
    geo: { latitude: 39.0437, longitude: -77.4875 }, sameAs: "https://en.wikipedia.org/wiki/Ashburn,_Virginia",
    neighborhoods: ["One Loudoun", "Broadlands", "Brambleton", "Ashburn Farm", "Belmont", "Lansdowne", "Ashburn Village"],
    nearby: ["herndon", "reston", "manassas", "fairfax"],
    copy: {
      en: {
        blurb: "Newer single-family homes and townhomes in Broadlands, Brambleton and Ashburn Farm, with One Loudoun at the center.",
        intro: [
          "Ashburn grew fast, and most of its homes are newer: open-plan single-family houses and townhomes in Broadlands, Brambleton, Ashburn Farm and Belmont, plus condos around One Loudoun. Big kitchens, lots of bathrooms and busy family calendars are the norm.",
          "We help keep those homes feeling new. Bertha plans each visit around your house during a free estimate, in English or Spanish, and Ashburn sits comfortably inside our 50-mile service area.",
        ],
        services: {
          "house-cleaning": "House cleaning for Ashburn's newer single-family homes and townhomes, from open kitchens to upstairs bathrooms.",
          "deep-cleaning": "A deep clean that restores the just-built feel to kitchens, bathrooms and finished basements.",
          "move-in-move-out-cleaning": "Move-in cleaning for new-construction closings and move-out cleaning for Ashburn rentals.",
          "office-cleaning": "Office cleaning for small businesses around One Loudoun, Lansdowne and the Route 7 corridor.",
        },
      },
      es: {
        blurb: "Casas unifamiliares y adosadas más nuevas en Broadlands, Brambleton y Ashburn Farm, con One Loudoun en el centro.",
        intro: [
          "Ashburn creció rápido y la mayoría de sus casas son nuevas: casas unifamiliares y adosadas de planta abierta en Broadlands, Brambleton, Ashburn Farm y Belmont, además de condominios alrededor de One Loudoun. Cocinas grandes, muchos baños y calendarios familiares llenos son lo habitual.",
          "Ayudamos a que esas casas se sigan sintiendo nuevas. Bertha planifica cada visita según su casa durante un presupuesto gratis, en español o inglés, y Ashburn está cómodamente dentro de nuestra zona de servicio de 50 millas.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas para las viviendas unifamiliares y adosadas más nuevas de Ashburn, de las cocinas abiertas a los baños de arriba.",
          "deep-cleaning": "Una limpieza profunda que devuelve la sensación de recién construido a cocinas, baños y sótanos terminados.",
          "move-in-move-out-cleaning": "Limpieza de entrada para cierres de obra nueva y limpieza de salida para alquileres en Ashburn.",
          "office-cleaning": "Limpieza de oficinas para pequeñas empresas alrededor de One Loudoun, Lansdowne y el corredor de la Ruta 7.",
        },
      },
    },
  },
  {
    slug: "manassas", name: "Manassas", state: "VA", stateName: VA, county: null, kind: "independent-city",
    geo: { latitude: 38.7509, longitude: -77.4753 }, sameAs: "https://en.wikipedia.org/wiki/Manassas,_Virginia",
    neighborhoods: ["Old Town Manassas", "Manassas Park", "Bristow", "Gainesville", "Sudley", "Yorkshire"],
    nearby: ["woodbridge", "fairfax", "ashburn", "alexandria"],
    copy: {
      en: {
        blurb: "A historic Old Town, established neighborhoods, and fast-growing communities in Bristow and Gainesville.",
        intro: [
          "Manassas centers on a walkable Old Town with the VRE station, surrounded by established neighborhoods and, further west, the newer communities of Bristow and Gainesville. Homes range from older brick ramblers to large new townhomes, and many families here speak Spanish at home.",
          "Bertha offers every estimate and every visit in English or Spanish, and Manassas is well within the 50-mile service area. Call or WhatsApp to get started.",
        ],
        services: {
          "house-cleaning": "Regular house cleaning for Manassas families, from Old Town homes to newer townhomes in Bristow.",
          "deep-cleaning": "A thorough deep clean for kitchens, bathrooms and the built-up grime older homes collect.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for homes and rentals in Manassas, Manassas Park and Gainesville.",
          "office-cleaning": "Office cleaning for small businesses in Old Town Manassas and along Sudley Road.",
        },
      },
      es: {
        blurb: "Un Old Town histórico, vecindarios consolidados y comunidades en rápido crecimiento en Bristow y Gainesville.",
        intro: [
          "Manassas gira alrededor de un Old Town caminable con la estación del VRE, rodeado de vecindarios consolidados y, más al oeste, de las comunidades nuevas de Bristow y Gainesville. Las casas van de antiguas viviendas de ladrillo de un nivel a casas adosadas nuevas y amplias, y muchas familias aquí hablan español en casa.",
          "Bertha ofrece cada presupuesto y cada visita en español o inglés, y Manassas está bien dentro de la zona de servicio de 50 millas. Llame o escriba por WhatsApp para empezar.",
        ],
        services: {
          "house-cleaning": "Limpieza regular de casas para familias de Manassas, de las casas de Old Town a las casas adosadas nuevas de Bristow.",
          "deep-cleaning": "Una limpieza profunda a fondo para cocinas, baños y la suciedad acumulada que juntan las casas antiguas.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para casas y alquileres en Manassas, Manassas Park y Gainesville.",
          "office-cleaning": "Limpieza de oficinas para pequeñas empresas en Old Town Manassas y sobre Sudley Road.",
        },
      },
    },
  },
  {
    slug: "woodbridge", name: "Woodbridge", state: "VA", stateName: VA, county: "Prince William County", kind: "cdp",
    geo: { latitude: 38.6582, longitude: -77.2497 }, sameAs: "https://en.wikipedia.org/wiki/Woodbridge,_Virginia",
    neighborhoods: ["Lake Ridge", "Dale City", "Occoquan", "Belmont Bay", "Potomac Mills", "Dumfries"],
    nearby: ["manassas", "alexandria", "fairfax", "arlington"],
    copy: {
      en: {
        blurb: "Family neighborhoods in Lake Ridge and Dale City, waterfront homes near Occoquan and Belmont Bay, and busy commuter households.",
        intro: [
          "Woodbridge and the surrounding Prince William County communities are built for families: townhomes and single-family houses in Lake Ridge and Dale City, waterfront homes near Occoquan and Belmont Bay, and apartments close to Potomac Mills. Long commutes on I-95 leave little time for housework.",
          "That is where we come in. Bertha keeps the process simple with a walkthrough and a free estimate, and service is available in English or Spanish.",
        ],
        services: {
          "house-cleaning": "House cleaning for Woodbridge, Lake Ridge and Dale City families who would rather spend weekends off the I-95 grind.",
          "deep-cleaning": "Deep cleaning for kitchens, bathrooms and the overlooked corners of busy family homes.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for the many military and commuter families relocating around Woodbridge and Dumfries.",
          "office-cleaning": "Office cleaning for small businesses near Potomac Mills, Occoquan and the Route 1 corridor.",
        },
      },
      es: {
        blurb: "Vecindarios familiares en Lake Ridge y Dale City, casas junto al agua cerca de Occoquan y Belmont Bay, y hogares de viajeros diarios muy ocupados.",
        intro: [
          "Woodbridge y las comunidades cercanas del condado de Prince William están hechas para familias: casas adosadas y unifamiliares en Lake Ridge y Dale City, casas junto al agua cerca de Occoquan y Belmont Bay, y apartamentos cerca de Potomac Mills. Los largos viajes por la I-95 dejan poco tiempo para las tareas de la casa.",
          "Ahí entramos nosotros. Bertha mantiene el proceso sencillo con un recorrido y un presupuesto gratis, y el servicio está disponible en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas para familias de Woodbridge, Lake Ridge y Dale City que prefieren pasar los fines de semana lejos del tráfico de la I-95.",
          "deep-cleaning": "Limpieza profunda para cocinas, baños y los rincones olvidados de hogares familiares ocupados.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para las muchas familias militares y de viajeros diarios que se reubican en Woodbridge y Dumfries.",
          "office-cleaning": "Limpieza de oficinas para pequeñas empresas cerca de Potomac Mills, Occoquan y el corredor de la Ruta 1.",
        },
      },
    },
  },
  {
    slug: "washington-dc", name: "Washington, DC", state: "DC", stateName: DC, county: null, kind: "district",
    geo: { latitude: 38.9072, longitude: -77.0369 }, sameAs: "https://en.wikipedia.org/wiki/Washington,_D.C.",
    neighborhoods: ["Capitol Hill", "Georgetown", "Dupont Circle", "Navy Yard", "Columbia Heights", "Petworth", "Adams Morgan", "Foggy Bottom"],
    nearby: ["arlington", "alexandria", "bethesda", "silver-spring"],
    copy: {
      en: {
        blurb: "Rowhouses on Capitol Hill and in Petworth, condos in Navy Yard and Dupont, and offices across the District.",
        intro: [
          "Washington, DC is a city of rowhouses and apartments: Federal and Victorian rowhomes on Capitol Hill, Georgetown and Petworth, English basements, and newer condo buildings in Navy Yard, NoMa and the Wharf. Narrow stairs, older finishes and shared buildings all call for a careful, experienced cleaner.",
          "The District is just across the river from our Northern Virginia base and well within the service area. Bertha provides a free estimate for your home, rental or small office, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Regular cleaning for DC rowhouses, condos and English basements, with attention to older floors and finishes.",
          "deep-cleaning": "A detailed deep clean for historic rowhomes and well-used city apartments.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for the constant turnover of DC rentals, condos and rowhouses.",
          "office-cleaning": "Office cleaning for small firms, nonprofits and studios across downtown and the neighborhoods.",
        },
      },
      es: {
        blurb: "Casas en hilera en Capitol Hill y Petworth, condominios en Navy Yard y Dupont, y oficinas en todo el Distrito.",
        intro: [
          "Washington, DC es una ciudad de casas en hilera y apartamentos: casas federales y victorianas en Capitol Hill, Georgetown y Petworth, sótanos ingleses y edificios de condominios nuevos en Navy Yard, NoMa y el Wharf. Escaleras estrechas, acabados antiguos y edificios compartidos piden una limpiadora cuidadosa y con experiencia.",
          "El Distrito está justo cruzando el río desde nuestra base en el norte de Virginia y bien dentro de la zona de servicio. Bertha ofrece un presupuesto gratis para su casa, alquiler u oficina pequeña, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza regular para casas en hilera, condominios y sótanos ingleses de DC, con atención a pisos y acabados antiguos.",
          "deep-cleaning": "Una limpieza profunda detallada para casas históricas en hilera y apartamentos urbanos muy vividos.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para la rotación constante de alquileres, condominios y casas en hilera de DC.",
          "office-cleaning": "Limpieza de oficinas para pequeñas firmas, organizaciones sin fines de lucro y estudios en el centro y los barrios.",
        },
      },
    },
  },
  {
    slug: "bethesda", name: "Bethesda", state: "MD", stateName: MD, county: "Montgomery County", kind: "cdp",
    geo: { latitude: 38.9847, longitude: -77.0947 }, sameAs: "https://en.wikipedia.org/wiki/Bethesda,_Maryland",
    neighborhoods: ["Downtown Bethesda", "Chevy Chase", "Friendship Heights", "Westbard", "Bradley Hills", "Glen Echo"],
    nearby: ["silver-spring", "rockville", "washington-dc", "mclean"],
    copy: {
      en: {
        blurb: "Downtown high-rises, Chevy Chase colonials, and large homes in Bradley Hills and along River Road.",
        intro: [
          "Bethesda ranges from downtown high-rise condos near the Metro to colonials in Chevy Chase and large homes along River Road and in Bradley Hills. Households here expect professional, discreet service and a cleaner who notices the details.",
          "Bertha brings over 30 years of exactly that. Bethesda is a short trip across the American Legion Bridge from our Northern Virginia base, and every estimate is free, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "Discreet, consistent house cleaning for Bethesda and Chevy Chase homes and downtown condos.",
          "deep-cleaning": "Deep cleaning for larger homes where kitchens, multiple bathrooms and detail work add up.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for Bethesda condos and houses around a closing or lease date.",
          "office-cleaning": "Office cleaning for medical, legal and professional suites in downtown Bethesda and Friendship Heights.",
        },
      },
      es: {
        blurb: "Torres en el centro, casas coloniales en Chevy Chase y casas grandes en Bradley Hills y sobre River Road.",
        intro: [
          "Bethesda va desde condominios de gran altura en el centro cerca del Metro hasta casas coloniales en Chevy Chase y casas grandes sobre River Road y en Bradley Hills. Los hogares aquí esperan un servicio profesional y discreto, y una limpiadora que note los detalles.",
          "Bertha trae más de 30 años de exactamente eso. Bethesda está a un corto viaje por el puente American Legion desde nuestra base en el norte de Virginia, y cada presupuesto es gratis, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas discreta y constante para hogares de Bethesda y Chevy Chase y condominios del centro.",
          "deep-cleaning": "Limpieza profunda para casas grandes donde cocinas, varios baños y el trabajo de detalle se acumulan.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para condominios y casas de Bethesda alrededor de un cierre o una fecha de contrato.",
          "office-cleaning": "Limpieza de oficinas para consultorios médicos, legales y profesionales en el centro de Bethesda y Friendship Heights.",
        },
      },
    },
  },
  {
    slug: "silver-spring", name: "Silver Spring", state: "MD", stateName: MD, county: "Montgomery County", kind: "cdp",
    geo: { latitude: 38.9907, longitude: -77.0261 }, sameAs: "https://en.wikipedia.org/wiki/Silver_Spring,_Maryland",
    neighborhoods: ["Downtown Silver Spring", "Takoma Park", "Wheaton", "Four Corners", "Kemp Mill", "White Oak", "Woodside"],
    nearby: ["bethesda", "rockville", "washington-dc", "gaithersburg"],
    copy: {
      en: {
        blurb: "Downtown apartments and condos, brick colonials in Woodside and Four Corners, and a diverse mix of family neighborhoods.",
        intro: [
          "Silver Spring is one of the most diverse communities in the region, from the apartments and condos of the downtown core to brick colonials and Cape Cods in Woodside, Four Corners and Kemp Mill and the bungalows of neighboring Takoma Park. Many families here are bilingual, and so are we.",
          "Bertha offers every conversation, estimate and visit in English or Spanish. Silver Spring is well inside the service area, and estimates are always free.",
        ],
        services: {
          "house-cleaning": "House cleaning for Silver Spring colonials, Cape Cods, condos and apartments, in English or Spanish.",
          "deep-cleaning": "Deep cleaning for older homes in Woodside, Four Corners and Takoma Park where grime builds up over the years.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for downtown Silver Spring apartments and neighborhood rentals.",
          "office-cleaning": "Office cleaning for small businesses and nonprofits in downtown Silver Spring and Wheaton.",
        },
      },
      es: {
        blurb: "Apartamentos y condominios en el centro, casas coloniales de ladrillo en Woodside y Four Corners, y una mezcla diversa de vecindarios familiares.",
        intro: [
          "Silver Spring es una de las comunidades más diversas de la región, desde los apartamentos y condominios del centro hasta casas coloniales de ladrillo en Woodside, Four Corners y Kemp Mill y los bungalows del vecino Takoma Park. Muchas familias aquí son bilingües, y nosotros también.",
          "Bertha ofrece cada conversación, presupuesto y visita en español o inglés. Silver Spring está bien dentro de la zona de servicio, y los presupuestos siempre son gratis.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas para coloniales, Cape Cods, condominios y apartamentos de Silver Spring, en español o inglés.",
          "deep-cleaning": "Limpieza profunda para casas antiguas en Woodside, Four Corners y Takoma Park donde la suciedad se acumula con los años.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para apartamentos del centro de Silver Spring y alquileres de barrio.",
          "office-cleaning": "Limpieza de oficinas para pequeñas empresas y organizaciones sin fines de lucro en el centro de Silver Spring y Wheaton.",
        },
      },
    },
  },
  {
    slug: "rockville", name: "Rockville", state: "MD", stateName: MD, county: "Montgomery County", kind: "city",
    geo: { latitude: 39.084, longitude: -77.1528 }, sameAs: "https://en.wikipedia.org/wiki/Rockville,_Maryland",
    neighborhoods: ["Rockville Town Center", "Twinbrook", "King Farm", "North Bethesda", "Fallsgrove", "Potomac"],
    nearby: ["gaithersburg", "bethesda", "silver-spring", "washington-dc"],
    copy: {
      en: {
        blurb: "Town Center condos, planned communities like King Farm and Fallsgrove, and large homes toward Potomac.",
        intro: [
          "Rockville stretches from the condos and apartments of Town Center and Twinbrook to planned communities like King Farm and Fallsgrove and, toward Potomac, some of the county's largest homes. Its office parks along Rockville Pike and I-270 are home to many small practices and firms.",
          "Homes and offices in Rockville are an easy visit inside our 50-mile service area. Contact Bertha for a free estimate, in English or Spanish.",
        ],
        services: {
          "house-cleaning": "House cleaning for Rockville townhomes, condos and single-family homes in King Farm, Fallsgrove and beyond.",
          "deep-cleaning": "A thorough deep clean for larger homes toward Potomac and North Bethesda.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for Town Center and Twinbrook apartments and neighborhood homes.",
          "office-cleaning": "Office cleaning for medical and professional suites along Rockville Pike and the I-270 corridor.",
        },
      },
      es: {
        blurb: "Condominios en Town Center, comunidades planificadas como King Farm y Fallsgrove, y casas grandes hacia Potomac.",
        intro: [
          "Rockville se extiende desde los condominios y apartamentos de Town Center y Twinbrook hasta comunidades planificadas como King Farm y Fallsgrove y, hacia Potomac, algunas de las casas más grandes del condado. Sus parques de oficinas sobre Rockville Pike y la I-270 albergan muchos consultorios y firmas pequeñas.",
          "Las casas y oficinas de Rockville son una visita fácil dentro de nuestra zona de servicio de 50 millas. Contacte a Bertha para un presupuesto gratis, en español o inglés.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas para casas adosadas, condominios y unifamiliares de Rockville en King Farm, Fallsgrove y más allá.",
          "deep-cleaning": "Una limpieza profunda a fondo para casas grandes hacia Potomac y North Bethesda.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para apartamentos de Town Center y Twinbrook y casas de barrio.",
          "office-cleaning": "Limpieza de oficinas para consultorios médicos y profesionales sobre Rockville Pike y el corredor de la I-270.",
        },
      },
    },
  },
  {
    slug: "gaithersburg", name: "Gaithersburg", state: "MD", stateName: MD, county: "Montgomery County", kind: "city",
    geo: { latitude: 39.1434, longitude: -77.2014 }, sameAs: "https://en.wikipedia.org/wiki/Gaithersburg,_Maryland",
    neighborhoods: ["Kentlands", "Olde Towne", "Washingtonian Center", "Montgomery Village", "Quince Orchard", "Germantown"],
    nearby: ["rockville", "silver-spring", "bethesda", "ashburn"],
    copy: {
      en: {
        blurb: "Kentlands townhomes, Olde Towne homes, Montgomery Village communities and offices around Washingtonian Center.",
        intro: [
          "Gaithersburg is home to the townhomes and single-family houses of Kentlands and Lakelands, the older homes of Olde Towne, the many communities of Montgomery Village, and offices and shops around Washingtonian Center and Rio. It is a busy, family-oriented city with a large Spanish-speaking community.",
          "Bertha serves Gaithersburg in English or Spanish, and it sits comfortably within the 50-mile service area. Reach out by phone or WhatsApp for a free estimate.",
        ],
        services: {
          "house-cleaning": "House cleaning for Kentlands, Lakelands and Montgomery Village townhomes and single-family homes.",
          "deep-cleaning": "Deep cleaning for busy family homes in Gaithersburg and Germantown before guests, holidays or a new season.",
          "move-in-move-out-cleaning": "Move-in and move-out cleaning for homes and rentals across Gaithersburg and Montgomery Village.",
          "office-cleaning": "Office cleaning for small businesses around Washingtonian Center, Rio and the I-270 corridor.",
        },
      },
      es: {
        blurb: "Casas adosadas en Kentlands, casas en Olde Towne, comunidades de Montgomery Village y oficinas alrededor de Washingtonian Center.",
        intro: [
          "Gaithersburg alberga las casas adosadas y unifamiliares de Kentlands y Lakelands, las casas antiguas de Olde Towne, las muchas comunidades de Montgomery Village, y oficinas y tiendas alrededor de Washingtonian Center y Rio. Es una ciudad activa y familiar con una gran comunidad hispanohablante.",
          "Bertha atiende Gaithersburg en español o inglés, y está cómodamente dentro de la zona de servicio de 50 millas. Comuníquese por teléfono o WhatsApp para un presupuesto gratis.",
        ],
        services: {
          "house-cleaning": "Limpieza de casas para casas adosadas y unifamiliares de Kentlands, Lakelands y Montgomery Village.",
          "deep-cleaning": "Limpieza profunda para hogares familiares ocupados de Gaithersburg y Germantown antes de visitas, fiestas o una nueva temporada.",
          "move-in-move-out-cleaning": "Limpieza de entrada y salida para casas y alquileres en todo Gaithersburg y Montgomery Village.",
          "office-cleaning": "Limpieza de oficinas para pequeñas empresas alrededor de Washingtonian Center, Rio y el corredor de la I-270.",
        },
      },
    },
  },
];

export const citySlugs = cities.map((city) => city.slug);

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function citiesByState(state: StateCode): City[] {
  return cities.filter((city) => city.state === state);
}
