// Copy for the BVA concept site (the mockup inside the proposal), Dutch and English.
// Facts come from `firm` (content/leads/bva-164550/proposal.ts); this file holds only interface text.
import type { L } from "@/lib/lang";

export const c = {
  nav: {
    items: { nl: ["Aanbod", "Woning verkopen", "Aankoopmakelaar", "Taxatie", "Over ons"], en: ["Listings", "Selling", "Buying agent", "Valuation report", "About"] } as L<string[]>,
    main: { nl: "Hoofdmenu", en: "Main menu" },
    menu: { nl: "Menu", en: "Menu" },
    close: { nl: "Sluiten", en: "Close" },
    home: { nl: "naar de homepage", en: "to the homepage" },
    call: { nl: "Bel", en: "Call" },
  },
  cta: { nl: "Gratis waardebepaling", en: "Free valuation" },
  example: { nl: "voorbeeld", en: "example" },
  hero: {
    kicker: { nl: "Makelaar en taxateur in Rotterdam", en: "Estate agent and valuer in Rotterdam" },
    title: { nl: "Uw woning verkopen in Rotterdam.", en: "Selling your home in Rotterdam." },
    lead: {
      nl: (owner: string) => `Persoonlijk advies van ${owner}, Register-Makelaar en Taxateur. Afspraken ook ’s avonds en in het weekend.`,
      en: (owner: string) => `Personal advice from ${owner}, registered estate agent and valuer. Appointments in the evening and at weekends too.`,
    },
    checkTitle: { nl: "Wat is uw woning waard?", en: "What is your home worth?" },
    checkSub: { nl: "Gratis en vrijblijvend. We komen bij u langs.", en: "Free and without obligation. We visit you at home." },
    postcode: { nl: "Postcode", en: "Postcode" },
    number: { nl: "Huisnr.", en: "No." },
    photoAlt: { nl: "De Erasmusbrug en de Kop van Zuid in Rotterdam", en: "The Erasmus Bridge and Kop van Zuid in Rotterdam" },
  },
  facts: {
    title: { nl: "Waarom BVA", en: "Why BVA" },
    items: {
      nl: [
        ["Sinds 2010", "Eigen kantoor in Schiebroek, daarvoor zeven jaar in Rotterdam-Centrum"],
        ["NRVT", "Geregistreerd taxateur, rapporten die voldoen aan de NHG-eisen"],
        ["VBO", "Aangesloten bij de brancheorganisatie, nu Vastgoed Nederland"],
      ],
      en: [
        ["Since 2010", "Own office in Schiebroek, before that seven years in central Rotterdam"],
        ["NRVT", "Registered valuer, reports that meet the NHG requirements"],
        ["VBO", "Member of the trade body, now Vastgoed Nederland"],
      ],
    } as L<[string, string][]>,
    funda: { nl: "Funda-beoordeling", en: "Funda rating" },
  },
  listings: {
    title: { nl: "Nu te koop", en: "For sale now" },
    all: { nl: "Bekijk het hele aanbod", en: "View all listings" },
    status: {
      beschikbaar: { nl: "Te koop", en: "For sale" },
      nieuw: { nl: "Nieuw", en: "New" },
      "onder-bod": { nl: "Onder bod", en: "Under offer" },
      "verkocht-ov": { nl: "Verkocht o.v.", en: "Sold subject to contract" },
    },
    kk: { nl: "k.k.", en: "buyer's costs" },
    rooms: { nl: (n: number) => `${n} kamers`, en: (n: number) => `${n} rooms` },
    living: { nl: "wonen", en: "living" },
    bid: { nl: "Breng een bod uit", en: "Make an offer" },
    bidVia: { nl: "via Eerlijk Bieden", en: "via Eerlijk Bieden" },
    view: { nl: "Bekijk woning", en: "View home" },
    scroll: { nl: "Woningen te koop", en: "Homes for sale" },
    note: {
      nl: (d: string) => `Aanbod zoals op bvamakelaardij.nl op ${d}. Op de echte site komt het automatisch uit uw huidige systeem.`,
      en: (d: string) => `Listings as on bvamakelaardij.nl on ${d}. On the real site they come straight from your current system.`,
    },
  },
  aanbod: {
    title: { nl: "Aanbod", en: "Listings" },
    lead: { nl: "Woningen te koop in Rotterdam, van portiekflat tot bovenwoning.", en: "Homes for sale in Rotterdam, from walk-up flats to upper-floor apartments." },
    filters: { nl: "Filter het aanbod", en: "Filter listings" },
    all: { nl: "Alles", en: "All" },
    available: { nl: "Beschikbaar", en: "Available" },
    taken: { nl: "Onder bod of verkocht", en: "Under offer or sold" },
    count: { nl: (n: number) => `${n} ${n === 1 ? "woning" : "woningen"}`, en: (n: number) => `${n} ${n === 1 ? "home" : "homes"}` },
    alert: { nl: "Zoekt u in Rotterdam?", en: "Looking in Rotterdam?" },
    alertBody: { nl: "Neem BVA mee als uw eigen aankoopmakelaar. Wij bekijken de woning met u en onderhandelen namens u.", en: "Bring BVA along as your own buying agent. We view the home with you and negotiate on your behalf." },
    alertCta: { nl: "Over aankoopbegeleiding", en: "About buying guidance" },
  },
  services: {
    title: { nl: "Waarmee wij u helpen", en: "How we help" },
    items: {
      nl: [
        ["Woning verkopen", "Van gratis waardebepaling tot sleuteloverdracht, met een verkoopstrategie voor uw woning."],
        ["Aankoopmakelaar", "Wij gaan met u mee, inspecteren de woning en onderhandelen namens u."],
        ["Taxatie", "NRVT-geregistreerd taxateur, rapport conform de NHG-eisen."],
        ["Hypotheken en advies", "Ook voor hypotheken en verduurzaming kunt u bij ons terecht."],
      ],
      en: [
        ["Selling your home", "From a free valuation to handing over the keys, with a sales strategy for your home."],
        ["Buying agent", "We come along, inspect the home and negotiate on your behalf."],
        ["Valuation report", "NRVT-registered valuer, report that meets the NHG requirements."],
        ["Mortgages and advice", "You can also come to us for mortgages and making your home more sustainable."],
      ],
    } as L<[string, string][]>,
  },
  always: {
    title: { nl: "Bereikbaar wanneer het u uitkomt", en: "Available when it suits you" },
    slots: { nl: ["Overdag", "’s Avonds", "In het weekend"], en: ["During the day", "Evenings", "Weekends"] } as L<string[]>,
    slotNote: { nl: "Afspraak mogelijk", en: "Appointments possible" },
    quoteBy: { nl: "BVA Makelaardij, over hun 24/7 mentaliteit", en: "BVA Makelaardij, on their 24/7 mindset" },
    translated: { nl: "", en: "Translated from Dutch" },
    call: { nl: "Bel", en: "Call" },
  },
  about: {
    title: { nl: (owner: string) => `${owner}, uw makelaar`, en: (owner: string) => `${owner}, your agent` },
    body: {
      nl: (street: string, area: string) => `Na zeven jaar bij een kantoor in Rotterdam-Centrum begon Jordy in april 2010 BVA Makelaardij. U heeft één vast aanspreekpunt, van het eerste gesprek tot de notaris. Het kantoor staat aan de ${street} in ${area}.`,
      en: (street: string, area: string) => `After seven years at an office in central Rotterdam, Jordy started BVA Makelaardij in April 2010. You have one point of contact, from the first conversation to the notary. The office is at ${street} in ${area}.`,
    },
    photoAlt: { nl: "Jordy Bens op kantoor", en: "Jordy Bens at the office" },
    whatsapp: { nl: "Maak een afspraak via de app, telefoon of mail.", en: "Make an appointment by app, phone or email." },
  },
  footer: {
    ctaTitle: { nl: "Benieuwd wat uw woning waard is?", en: "Curious what your home is worth?" },
    office: { nl: "Kantoor", en: "Office" },
    contact: { nl: "Contact", en: "Contact" },
    hours: { nl: "Afspraken", en: "Appointments" },
    hoursBody: { nl: ["Tijdens kantooruren", "Ook ’s avonds en in het weekend"], en: ["During office hours", "Also evenings and weekends"] } as L<string[]>,
    member: { nl: "Aangesloten bij", en: "Member of" },
    privacy: { nl: "Privacyverklaring", en: "Privacy statement" },
    cookies: { nl: "Cookies", en: "Cookies" },
  },
  cookie: {
    text: { nl: "We gebruiken cookies voor de kaart en het bieden. U kiest zelf of u dat goedvindt.", en: "We use cookies for the map and for bidding. You decide whether that is OK." },
    decline: { nl: "Weigeren", en: "Decline" },
    accept: { nl: "Accepteren", en: "Accept" },
    label: { nl: "Cookiemelding", en: "Cookie notice" },
  },
  wb: {
    crumb: { nl: "Woning verkopen", en: "Selling" },
    title: { nl: "Wat is uw woning waard?", en: "What is your home worth?" },
    lead: {
      nl: "Vraag een gratis waardebepaling aan. We komen bij u langs en bespreken de waarde op basis van de woningmarkt van nu.",
      en: "Request a free valuation. We visit you and discuss the value based on today's housing market.",
    },
    points: {
      nl: ["We komen kosteloos bij u langs, ook ’s avonds of in het weekend.", "U hoort wat uw woning nu waard is in de Rotterdamse markt.", "Dat is de basis voor ons advies over vraagprijs en verkoopstrategie."],
      en: ["We visit you free of charge, also in the evening or at the weekend.", "You hear what your home is worth in today's Rotterdam market.", "That is the basis for our advice on asking price and sales strategy."],
    } as L<string[]>,
    call: { nl: "Liever bellen?", en: "Rather call?" },
    stage: {
      label: { nl: "Uw woning, terwijl u het formulier invult", en: "Your home, as you fill in the form" },
      captions: {
        nl: ["Begin met uw adres", "Kies het type woning", "Nog één stap", "Aanvraag ontvangen"],
        en: ["Start with your address", "Choose the type of home", "One more step", "Request received"],
      } as L<string[]>,
    },
  },
  form: {
    steps: { nl: ["Uw adres", "Uw woning", "Afspraak en gegevens"], en: ["Your address", "Your home", "Appointment and details"] } as L<string[]>,
    progress: { nl: (i: number, n: number) => `Stap ${i} van ${n}`, en: (i: number, n: number) => `Step ${i} of ${n}` },
    postcode: { nl: "Postcode", en: "Postcode" },
    number: { nl: "Huisnummer", en: "House number" },
    type: { nl: "Type woning", en: "Type of home" },
    types: { nl: ["Appartement", "Tussenwoning", "Hoekwoning", "Twee-onder-een-kap", "Vrijstaand"], en: ["Apartment", "Terraced", "End of terrace", "Semi-detached", "Detached"] } as L<string[]>,
    area: { nl: "Woonoppervlakte in m²", en: "Living area in m²" },
    when: { nl: "Wanneer komt een afspraak u het best uit?", en: "When suits you best for a visit?" },
    whens: { nl: ["Overdag", "’s Avonds", "In het weekend"], en: ["During the day", "Evening", "Weekend"] } as L<string[]>,
    optional: { nl: "optioneel", en: "optional" },
    name: { nl: "Naam", en: "Name" },
    phone: { nl: "Telefoonnummer", en: "Phone number" },
    email: { nl: "E-mailadres", en: "Email address" },
    next: { nl: "Volgende", en: "Next" },
    back: { nl: "Terug", en: "Back" },
    submit: { nl: "Waardebepaling aanvragen", en: "Request valuation" },
    privacy: {
      nl: "We gebruiken uw gegevens alleen om contact met u op te nemen over de waardebepaling.",
      en: "We only use your details to contact you about the valuation.",
    },
    demo: { nl: "Verstuurt niets", en: "Sends nothing" },
    errors: {
      postcode: { nl: "Vul een postcode in zoals 3052 RA.", en: "Enter a postcode like 3052 RA." },
      number: { nl: "Vul uw huisnummer in.", en: "Enter your house number." },
      type: { nl: "Kies het type woning.", en: "Choose the type of home." },
      area: { nl: "Vul een getal in, bijvoorbeeld 85.", en: "Enter a number, for example 85." },
      name: { nl: "Vul uw naam in.", en: "Enter your name." },
      phone: { nl: "Vul een telefoonnummer van 10 cijfers in.", en: "Enter a 10-digit phone number." },
      email: { nl: "Vul een geldig e-mailadres in.", en: "Enter a valid email address." },
    },
    doneTitle: { nl: (n: string) => `Bedankt, ${n}.`, en: (n: string) => `Thank you, ${n}.` },
    doneBody: {
      nl: (owner: string, when: string) => `Uw aanvraag is ontvangen. ${owner} neemt contact met u op om een afspraak te maken${when ? ` (${when.toLowerCase()})` : ""}.`,
      en: (owner: string, when: string) => `Your request has been received. ${owner} will contact you to make an appointment${when ? ` (${when.toLowerCase()})` : ""}.`,
    },
    nextTitle: { nl: "Wat er nu gebeurt", en: "What happens next" },
    nextSteps: {
      nl: ["We bellen of mailen u om een afspraak te maken", "We bekijken de woning samen met u", "U krijgt advies over waarde, vraagprijs en verkoopstrategie"],
      en: ["We call or email you to make an appointment", "We view the home together with you", "You get advice on value, asking price and sales strategy"],
    } as L<string[]>,
    again: { nl: "Formulier opnieuw tonen", en: "Show the form again" },
    sentDemo: { nl: "Er is niets verstuurd.", en: "Nothing was sent." },
  },
  bar: {
    call: { nl: "Bellen", en: "Call" },
    label: { nl: "Snelle acties", en: "Quick actions" },
  },
};

/** "397500" → "€ 397.500" (Dutch notation, also in the English version: it is a Dutch site). */
export const euro = (n: number) => `€ ${n.toLocaleString("nl-NL")}`;
/** 60.5 → "60,5" */
export const m2 = (n: number) => n.toLocaleString("nl-NL");
