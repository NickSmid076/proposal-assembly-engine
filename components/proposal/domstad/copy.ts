// Copy for the Domstad concept site (the mockup inside the proposal), Dutch and English.
// Dutch uses "je" throughout, as in Domstad's own texts. Facts come from `firm`
// (content/leads/domstad-897791/proposal.ts); this file holds only interface text.
import type { L } from "@/lib/lang";

export const c = {
  nav: {
    items: { nl: ["Verkopen", "Aankopen", "Aanbod", "Verkocht", "Over ons"], en: ["Selling", "Buying", "Listings", "Sold", "About"] } as L<string[]>,
    main: { nl: "Hoofdmenu", en: "Main menu" },
    menu: { nl: "Menu", en: "Menu" },
    close: { nl: "Sluiten", en: "Close" },
    home: { nl: "naar de homepage", en: "to the homepage" },
    call: { nl: "Bel", en: "Call" },
  },
  cta: { nl: "Gratis waardebepaling", en: "Free valuation" },
  example: { nl: "voorbeeld", en: "example" },
  hero: {
    kicker: { nl: "NVM-makelaar en taxateur in Utrecht", en: "NVM estate agent and valuer in Utrecht" },
    title: { nl: "Je huis verkopen in Utrecht, persoonlijk geregeld.", en: "Selling your home in Utrecht, personally handled." },
    lead: {
      nl: (owner: string) => `${owner} en haar team kennen de stad per wijk. Begin met een gratis waardebepaling: we komen bij je langs.`,
      en: (owner: string) => `${owner} and her team know the city neighbourhood by neighbourhood. Start with a free valuation: we come to your home.`,
    },
    checkTitle: { nl: "Wat is jouw huis waard?", en: "What is your home worth?" },
    postcode: { nl: "Postcode", en: "Postcode" },
    number: { nl: "Huisnr.", en: "No." },
    photoAlt: {
      nl: "Trudy Kempees en haar team bij een woning, met een rood TE KOOP-bord van Domstad Makelaars",
      en: "Trudy Kempees and her team at a home, with a red Domstad Makelaars FOR SALE sign",
    },
  },
  facts: {
    title: { nl: "Waarom Domstad", en: "Why Domstad" },
    items: {
      nl: [
        ["NVM", "Lid van de NVM, de grootste vereniging van makelaars"],
        ["RM RT", "Register-makelaar en register-taxateur, voor wonen en bedrijven"],
        ["19 wijken", "Van Wittevrouwen tot Vleuten, elk met een eigen pagina"],
      ],
      en: [
        ["NVM", "Member of the NVM, the largest association of estate agents"],
        ["RM RT", "Registered agent and registered valuer, for homes and businesses"],
        ["19 areas", "From Wittevrouwen to Vleuten, each with its own page"],
      ],
    } as L<[string, string][]>,
    funda: { nl: "Funda-beoordeling", en: "Funda rating" },
  },
  listings: {
    title: { nl: "Ons aanbod", en: "Our listings" },
    all: { nl: "Bekijk het hele aanbod", en: "View all listings" },
    status: {
      beschikbaar: { nl: "Te koop", en: "For sale" },
      "verkocht-ov": { nl: "Verkocht o.v.", en: "Sold s.t.c." },
    },
    kk: { nl: "k.k.", en: "buyer's costs" },
    rooms: { nl: (n: number) => `${n} kamers`, en: (n: number) => `${n} rooms` },
    living: { nl: "wonen", en: "living" },
    view: { nl: "Bekijk woning", en: "View home" },
    scroll: { nl: "Woningen", en: "Homes" },
    note: {
      nl: (d: string) => `Aanbod zoals op domstadmakelaars.nl op ${d}. Op de echte site komt het automatisch uit Realworks.`,
      en: (d: string) => `Listings as on domstadmakelaars.nl on ${d}. On the real site they come straight from Realworks.`,
    },
  },
  aanbod: {
    title: { nl: "Aanbod", en: "Listings" },
    lead: { nl: "Woningen in Utrecht en omgeving, van portiekflat tot hoekwoning.", en: "Homes in and around Utrecht, from walk-up flats to end-of-terrace houses." },
    filters: { nl: "Filter het aanbod", en: "Filter listings" },
    all: { nl: "Alles", en: "All" },
    available: { nl: "Te koop", en: "For sale" },
    taken: { nl: "Verkocht o.v.", en: "Sold s.t.c." },
    count: { nl: (n: number) => `${n} ${n === 1 ? "woning" : "woningen"}`, en: (n: number) => `${n} ${n === 1 ? "home" : "homes"}` },
    alert: { nl: "Zoek je in Utrecht?", en: "Looking in Utrecht?" },
    alertBody: { nl: "Neem ons mee als aankoopmakelaar. Vertel ons je woonwensen, dan zoeken wij mee en onderhandelen we voor je.", en: "Bring us along as your buying agent. Tell us what you are looking for, we search with you and negotiate for you." },
    alertCta: { nl: "Over aankopen", en: "About buying" },
  },
  sold: {
    title: { nl: "Verkocht door Domstad", en: "Sold by Domstad" },
    lead: {
      nl: (n: number) => `Een greep uit ${n} adressen die we verkochten, op de kaart. Waar woon jij?`,
      en: (n: number) => `A selection of ${n} addresses we sold, on the map. Where do you live?`,
    },
    mapLabel: { nl: "Kaart van Utrecht met verkochte adressen en de 19 wijken", en: "Map of Utrecht with sold addresses and the 19 neighbourhoods" },
    wijken: { nl: "Onze wijken, met de afstand tot de Dom", en: "Our neighbourhoods, with the distance to the Dom" },
    dot: { nl: "verkocht", en: "sold" },
    dom: { nl: "Domtoren", en: "Dom tower" },
    note: { nl: "Adressen van domstadmakelaars.nl/recent-verkocht. Kaart: CBS Wijken en Buurten 2024.", en: "Addresses from domstadmakelaars.nl/recent-verkocht. Map: CBS Wijken en Buurten 2024." },
  },
  services: {
    title: { nl: "Waarmee we je helpen", en: "How we help" },
    items: {
      nl: [
        ["Je huis verkopen", "Van waardebepaling tot sleuteloverdracht, met fotografie, plattegronden en video."],
        ["Een huis kopen", "Vertel ons je woonwensen. Wij zoeken mee en onderhandelen voor je."],
        ["Taxatie", "Een objectieve waardebepaling door een register-taxateur, bijvoorbeeld voor je hypotheek."],
        ["Bedrijfshuisvesting", "Aan- en verkoop en verhuur van kantoor- en bedrijfsruimte."],
      ],
      en: [
        ["Selling your home", "From valuation to handing over the keys, with photography, floor plans and video."],
        ["Buying a home", "Tell us what you are looking for. We search with you and negotiate for you."],
        ["Valuation report", "An objective valuation by a registered valuer, for example for your mortgage."],
        ["Commercial property", "Buying, selling and letting offices and business premises."],
      ],
    } as L<[string, string][]>,
    how: { nl: "Zo presenteren we je woning", en: "How we present your home" },
    photoAlt: { nl: "Een koopakte op tafel, met het logo van Domstad Makelaars", en: "A purchase contract on the table, with the Domstad Makelaars logo" },
  },
  about: {
    title: { nl: (owner: string) => `${owner}, je makelaar`, en: (owner: string) => `${owner}, your agent` },
    body: {
      nl: (street: string) => `Je hebt één vast aanspreekpunt, van het eerste gesprek tot de notaris. Bel Trudy gerust direct, of kom langs op kantoor aan de ${street}.`,
      en: (street: string) => `You have one point of contact, from the first conversation to the notary. Feel free to call Trudy directly, or visit the office at ${street}.`,
    },
    quoteBy: { nl: "Trudy Kempees, op domstadmakelaars.nl", en: "Trudy Kempees, on domstadmakelaars.nl" },
    translated: { nl: "", en: " · translated from Dutch" },
    direct: { nl: "Direct contact met Trudy", en: "Talk to Trudy directly" },
  },
  footer: {
    ctaTitle: { nl: "Benieuwd wat jouw huis waard is?", en: "Curious what your home is worth?" },
    office: { nl: "Kantoor", en: "Office" },
    contact: { nl: "Contact", en: "Contact" },
    wijken: { nl: "Makelaar in", en: "Agent in" },
    member: { nl: "Lid van de NVM", en: "Member of the NVM" },
    privacy: { nl: "Privacyverklaring", en: "Privacy statement" },
    cookies: { nl: "Cookies", en: "Cookies" },
  },
  cookie: {
    text: { nl: "We gebruiken cookies om de site te verbeteren. Jij kiest of je dat goedvindt.", en: "We use cookies to improve the site. You choose whether that is OK." },
    decline: { nl: "Weigeren", en: "Decline" },
    accept: { nl: "Accepteren", en: "Accept" },
    label: { nl: "Cookiemelding", en: "Cookie notice" },
  },
  wb: {
    crumb: { nl: "Verkopen", en: "Selling" },
    title: { nl: "Wat is jouw huis waard?", en: "What is your home worth?" },
    lead: {
      nl: "Vraag een gratis waardebepaling aan. Trudy komt bij je langs en bespreekt wat je huis nu waard is in jouw wijk.",
      en: "Request a free valuation. Trudy comes to your home and discusses what it is worth today in your neighbourhood.",
    },
    points: {
      nl: ["Gratis en vrijblijvend, bij jou thuis.", "Door een register-taxateur die Utrecht per wijk kent.", "De basis voor ons advies over vraagprijs en verkoop."],
      en: ["Free and without obligation, at your home.", "By a registered valuer who knows Utrecht by neighbourhood.", "The basis for our advice on asking price and sale."],
    } as L<string[]>,
    call: { nl: "Liever direct bellen met Trudy?", en: "Rather call Trudy directly?" },
    map: {
      label: { nl: "Kaart van Utrecht: jouw wijk licht op terwijl je het formulier invult", en: "Map of Utrecht: your neighbourhood lights up as you fill in the form" },
      start: { nl: "Vul je postcode in", en: "Enter your postcode" },
      outside: { nl: "Buiten Utrecht? We komen ook bij je langs.", en: "Outside Utrecht? We will visit you too." },
      fromDom: { nl: "van de Dom", en: "from the Dom" },
      captions: {
        nl: ["Utrecht", "Jouw wijk", "Jouw huis", "Trudy komt bij je langs"],
        en: ["Utrecht", "Your neighbourhood", "Your home", "Trudy will visit you"],
      } as L<string[]>,
    },
  },
  form: {
    steps: { nl: ["Je adres", "Je woning", "Afspraak en gegevens"], en: ["Your address", "Your home", "Appointment and details"] } as L<string[]>,
    progress: { nl: (i: number, n: number) => `Stap ${i} van ${n}`, en: (i: number, n: number) => `Step ${i} of ${n}` },
    postcode: { nl: "Postcode", en: "Postcode" },
    number: { nl: "Huisnummer", en: "House number" },
    type: { nl: "Type woning", en: "Type of home" },
    types: { nl: ["Appartement", "Tussenwoning", "Hoekwoning", "Twee-onder-een-kap", "Vrijstaand"], en: ["Apartment", "Terraced", "End of terrace", "Semi-detached", "Detached"] } as L<string[]>,
    area: { nl: "Woonoppervlakte in m²", en: "Living area in m²" },
    when: { nl: "Wanneer komt een afspraak je het best uit?", en: "When suits you best for a visit?" },
    whens: { nl: ["Overdag", "’s Avonds", "In het weekend"], en: ["During the day", "Evening", "Weekend"] } as L<string[]>,
    optional: { nl: "optioneel", en: "optional" },
    name: { nl: "Naam", en: "Name" },
    phone: { nl: "Telefoonnummer", en: "Phone number" },
    email: { nl: "E-mailadres", en: "Email address" },
    next: { nl: "Volgende", en: "Next" },
    back: { nl: "Terug", en: "Back" },
    submit: { nl: "Waardebepaling aanvragen", en: "Request valuation" },
    privacy: {
      nl: "We gebruiken je gegevens alleen om contact met je op te nemen over de waardebepaling.",
      en: "We only use your details to contact you about the valuation.",
    },
    demo: { nl: "Verstuurt niets", en: "Sends nothing" },
    errors: {
      postcode: { nl: "Vul een postcode in zoals 3515 ET.", en: "Enter a postcode like 3515 ET." },
      number: { nl: "Vul je huisnummer in.", en: "Enter your house number." },
      type: { nl: "Kies het type woning.", en: "Choose the type of home." },
      area: { nl: "Vul een getal in, bijvoorbeeld 85.", en: "Enter a number, for example 85." },
      name: { nl: "Vul je naam in.", en: "Enter your name." },
      phone: { nl: "Vul een telefoonnummer van 10 cijfers in.", en: "Enter a 10-digit phone number." },
      email: { nl: "Vul een geldig e-mailadres in.", en: "Enter a valid email address." },
    },
    doneTitle: { nl: (n: string) => `Bedankt, ${n}.`, en: (n: string) => `Thank you, ${n}.` },
    doneBody: {
      nl: (owner: string, when: string) => `Je aanvraag is binnen. ${owner} neemt contact met je op om een afspraak te maken${when ? ` (${when.toLowerCase()})` : ""}.`,
      en: (owner: string, when: string) => `Your request is in. ${owner} will contact you to make an appointment${when ? ` (${when.toLowerCase()})` : ""}.`,
    },
    nextTitle: { nl: "Wat er nu gebeurt", en: "What happens next" },
    nextSteps: {
      nl: ["We bellen of mailen je om een afspraak te maken", "Trudy bekijkt de woning samen met je", "Je krijgt advies over waarde, vraagprijs en verkoop"],
      en: ["We call or email you to make an appointment", "Trudy views the home together with you", "You get advice on value, asking price and the sale"],
    } as L<string[]>,
    again: { nl: "Formulier opnieuw tonen", en: "Show the form again" },
    sentDemo: { nl: "Er is niets verstuurd.", en: "Nothing was sent." },
  },
  bar: {
    call: { nl: "Bel Trudy", en: "Call Trudy" },
    label: { nl: "Snelle acties", en: "Quick actions" },
  },
};

/** "397500" → "€ 397.500" (Dutch notation, also in the English version: it is a Dutch site). */
export const euro = (n: number) => `€ ${n.toLocaleString("nl-NL")}`;
