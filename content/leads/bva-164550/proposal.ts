// Prospect-facing content for /v/bva-164550, in Dutch (default) and English.
// Every fact is taken from bvamakelaardij.nl or the KvK register on 2026-10-28
// (see Sales/Prospects/bva-makelaardij/analysis.md). Anything not verified is marked `placeholder`.
// Photos: the slider photos, the team photo and the listing photos on bvamakelaardij.nl (their own material).
// Nothing here is private, so it may be passed to client components. Keep lead status, views and notes out.

import rotterdamSkyline from "./rotterdam-5.jpg";
import rotterdamStreet from "./rotterdam-6.jpg";
import rotterdamBridge from "./rotterdam-7.jpg";
import jordy from "./jordy-bens.jpg";
import kipstraat from "./listing-kipstraat-47a.jpg";
import dortsman from "./listing-adriaan-dortsmanstraat-149.jpg";
import paets from "./listing-paetsstraat-32a.jpg";
import honinger from "./listing-honingerdijk-69a03.jpg";
import texel from "./listing-texelsestraat-57b.jpg";
import buytewech from "./listing-willem-buytewechstraat-123b.jpg";
import currentHome from "./current-home.jpg";
import currentMobile from "./current-mobile.jpg";
import currentVerkopen from "./current-verkopen.jpg";
import conceptDesktop from "./concept-desktop.jpg";
import conceptDesktopFold from "./concept-desktop-fold.jpg";
import conceptMobile from "./concept-mobile.jpg";
import type { WebProposalContent } from "@/components/proposal/web/types";

/** One listing as shown on bvamakelaardij.nl on 2026-10-28. All are apartments in Rotterdam. */
export type Listing = {
  street: string; postcode: string; town: string;
  price: number; /** Living area in m². */ area: number; rooms: number;
  status: "beschikbaar" | "nieuw" | "onder-bod" | "verkocht-ov";
  image: typeof kipstraat;
};

/** Facts used inside the BVA concept. */
export const firm = {
  name: "BVA Makelaardij",
  owner: "Jordy Bens",
  ownerFirst: "Jordy",
  ownerTitle: { nl: "Register-Makelaar en Taxateur", en: "Registered estate agent and valuer" },
  founded: "april 2010", // /over-ons: "in april 2010 zelf uit de startblokken"
  foundedYear: 2010,
  street: "Adriaan Kluitstraat 63",
  postcode: "3052 RA",
  town: "Rotterdam",
  area: "Schiebroek",
  phone: "010 - 30 40 198",
  phoneHref: "tel:+31103040198",
  email: "info@bvamakelaardij.nl",
  kvk: "24488929",
  // Footer logos on bvamakelaardij.nl on 2026-10-28; the home page also says "aangesloten bij de brancheorganisatie VBO".
  memberships: ["Vastgoed Nederland (VBO)", "NWWI", "SCVM", "Funda", "Pararius"],
  // Verbatim from the home page ("24/7 mentaliteit" block). English is our translation.
  always: {
    nl: "Wij staan graag voor u klaar wanneer u dat wenst, dus ook buiten kantoortijden zijn wij goed bereikbaar voor onze verkopers en kopers.",
    en: "We are happy to help whenever it suits you, so we are easy to reach outside office hours too, for sellers and buyers alike.",
  },
  // Verbatim from the team page. English is our translation.
  bio: {
    nl: "Ik ben geboren en getogen in Rotterdam. De Rotterdamse markt is waar ik mij al een kleine 20 jaar thuis voel.",
    en: "I was born and raised in Rotterdam. The Rotterdam market is where I have felt at home for almost 20 years.",
  },
  // Live on bvamakelaardij.nl on 2026-10-28. The first three are the home page's "Uitgelicht" block.
  listings: [
    { street: "Kipstraat 47A", postcode: "3011 ZX", town: "Rotterdam", price: 559000, area: 95, rooms: 4, status: "beschikbaar", image: kipstraat },
    { street: "Adriaan Dortsmanstraat 149", postcode: "3067 NC", town: "Rotterdam", price: 360000, area: 87, rooms: 3, status: "beschikbaar", image: dortsman },
    { street: "Paetsstraat 32A", postcode: "3039 XR", town: "Rotterdam", price: 540000, area: 150, rooms: 6, status: "beschikbaar", image: paets },
    { street: "Honingerdijk 69A03", postcode: "3063 AK", town: "Rotterdam", price: 325000, area: 60.5, rooms: 2, status: "nieuw", image: honinger },
    { street: "Texelsestraat 57B", postcode: "3083 PS", town: "Rotterdam", price: 209000, area: 46, rooms: 2, status: "onder-bod", image: texel },
    { street: "Willem Buytewechstraat 123B", postcode: "3024 XC", town: "Rotterdam", price: 309000, area: 82, rooms: 4, status: "verkocht-ov", image: buytewech },
  ] satisfies Listing[],
  listingsTotal: 23, // "23 objecten gevonden" (koop) on 2026-10-28
  listingsDate: "28-10-2026",
  // Not verified yet: shown with a visible "voorbeeld" label.
  placeholder: { fundaScore: "x,x" },
  images: { skyline: rotterdamSkyline, street: rotterdamStreet, bridge: rotterdamBridge, jordy },
};

export type Firm = typeof firm;

/** Page content for the shared web proposal template (components/proposal/web/WebProposal.tsx). */
export const proposal = {
  domain: "bvamakelaardij.nl",
  firm: "BVA Makelaardij",
  hero: {
    eyebrow: { nl: "Voorstel · BVA Makelaardij · oktober 2026", en: "Proposal · BVA Makelaardij · October 2026" },
    title: { nl: ["bvamakelaardij.nl,", "opnieuw ontworpen."], en: ["bvamakelaardij.nl,", "redesigned."] },
    thanks: { nl: "Dank voor uw reactie, heer Bens.", en: "Thank you for your reply, Mr Bens." },
    intro: {
      nl: "Een homepage die zegt wat u doet en voor wie, een waardebepaling die u op de site zelf aanvraagt, en uw avond- en weekendafspraken op de plek waar verkopers ze zien. Gemaakt met uw eigen foto's en uw eigen aanbod. Hieronder kunt u er zelf doorheen klikken.",
      en: "A homepage that says what you do and for whom, a valuation that can be requested on the site itself, and your evening and weekend appointments where sellers will see them. Built with your own photos and your own listings. You can click through it yourself below.",
    },
  },
  observed: {
    lead: {
      nl: "Bekeken op 28 oktober 2026, op de computer en op de telefoon. De nummers op de schermafbeeldingen horen bij de punten ernaast.",
      en: "Checked on 28 October 2026, on a computer and on a phone. The numbers on the screenshots match the points next to them.",
    },
    screens: [
      { id: "home", image: currentHome, alt: { nl: "Huidige homepage van bvamakelaardij.nl op de computer", en: "Current bvamakelaardij.nl homepage on a computer" }, caption: { nl: "Homepage, nu", en: "Homepage, today" } },
      { id: "verkopen", image: currentVerkopen, alt: { nl: "Huidige pagina Woning verkopen op bvamakelaardij.nl", en: "Current Selling your home page on bvamakelaardij.nl" }, caption: { nl: "Woning verkopen, nu", en: "Selling your home, today" } },
    ],
    points: [
      {
        screen: "home", x: 50, y: 52,
        title: { nl: "Het eerste scherm is een skyline en een zoekbalk", en: "The first screen is a skyline and a search bar" },
        body: {
          nl: "Een mooie foto van Rotterdam, maar wie zijn woning wil verkopen leest pas verder naar beneden wat u doet. Een waardebepaling aanvragen kan vanaf de homepage nergens.",
          en: "A fine photo of Rotterdam, but someone who wants to sell only reads further down what you do. Nowhere on the homepage can they ask for a valuation.",
        },
      },
      {
        screen: "home", x: 92, y: 95,
        title: { nl: "“Breng een bod uit” zweeft over de tekst", en: "“Make an offer” floats over the text" },
        body: {
          nl: "Goed dat u Eerlijk Bieden gebruikt. De knop staat alleen op elke pagina vast, ook waar geen woning is, en ligt op de telefoon over de welkomsttekst.",
          en: "Good that you use Eerlijk Bieden. But the button is fixed on every page, also where there is no home to bid on, and on a phone it covers the welcome text.",
        },
      },
      {
        screen: "verkopen", x: 19, y: 76,
        title: { nl: "“Gratis waardebepaling” zonder formulier of knop", en: "“Free valuation” without a form or a button" },
        body: {
          nl: "De alinea legt uit dat u langskomt, maar er is geen knop, geen formulier en geen link. Wie wil weten wat de woning waard is, moet zelf het contactformulier met 8 velden vinden.",
          en: "The paragraph explains that you will visit, but there is no button, no form and no link. Anyone who wants to know what their home is worth has to find the 8-field contact form on their own.",
        },
      },
      {
        screen: "verkopen", x: 37, y: 95,
        title: { nl: "Het laatste nieuws is van 10 oktober 2025", en: "The latest news is from 10 October 2025" },
        body: {
          nl: "Het blok “Laatste nieuws” staat op elke pagina en toont één bericht van ruim een jaar oud. Dat laat de site ouder lijken dan uw kantoor is.",
          en: "The “Latest news” block appears on every page and shows one item that is over a year old. It makes the site look older than your office is.",
        },
      },
    ],
  },
  mobile: {
    lead: {
      nl: "Veel verkopers kijken eerst op de telefoon, vaak 's avonds. Daar moet bellen of een waardebepaling aanvragen één tik zijn.",
      en: "Many sellers look on their phone first, often in the evening. There, calling or requesting a valuation should be one tap.",
    },
    points: [
      { title: { nl: "Eerst wie u bent, dan pas zoeken", en: "First who you are, then search" }, body: { nl: "Nu begint de telefoon met vijf zoekvelden. In het concept staat bovenaan wat u doet, met de waardebepaling direct eronder.", en: "Today the phone opens with five search fields. In the concept the top says what you do, with the valuation right below." } },
      { title: { nl: "Bellen en waardebepaling altijd in beeld", en: "Call and valuation always in view" }, body: { nl: "Een vaste balk onderin met twee knoppen, op elke pagina.", en: "A fixed bar at the bottom with two buttons, on every page." } },
      { title: { nl: "Bieden bij de woning zelf", en: "Bidding next to the home itself" }, body: { nl: "“Breng een bod uit” staat in de woningkaart, niet meer over de tekst heen.", en: "“Make an offer” sits in the listing card, no longer over the text." } },
      { title: { nl: "Inzoomen mag weer", en: "Zooming works again" }, body: { nl: "De huidige site blokkeert inzoomen. Dat is lastig voor wie kleine tekst slecht leest.", en: "The current site blocks zooming, which is hard on anyone who struggles with small text." } },
    ],
  },
  changes: {
    nl: [
      ["Gratis waardebepaling als losse alinea, zonder formulier", "Drie korte stappen op de pagina zelf, te starten vanaf de homepage met alleen uw postcode"],
      ["Eerste scherm: skyline en zoekbalk", "Eén regel over wat u doet en voor wie, met de waardebepaling ernaast"],
      ["Avond- en weekendafspraken halverwege de welkomsttekst", "Een eigen blok, en een keuze voor avond of weekend in het formulier"],
      ["Bodknop zweeft op elke pagina over de inhoud", "Bieden via Eerlijk Bieden bij de woning zelf"],
      ["Eén nieuwsbericht uit 2025 op elke pagina", "Uw aanbod, uw verhaal en Rotterdam"],
      ["Vier H1-koppen, titel als lijst met zoekwoorden, inzoomen geblokkeerd", "Eén kop per pagina, een leesbare titel, inzoomen toegestaan"],
    ],
    en: [
      ["Free valuation as a loose paragraph, without a form", "Three short steps on the page itself, started from the homepage with just a postcode"],
      ["First screen: skyline and search bar", "One line about what you do and for whom, with the valuation next to it"],
      ["Evening and weekend appointments halfway down the welcome text", "A block of their own, and an evening or weekend choice in the form"],
      ["Offer button floats over the content on every page", "Bidding through Eerlijk Bieden next to the home itself"],
      ["One news item from 2025 on every page", "Your listings, your story and Rotterdam"],
      ["Four H1 headings, a title made of keywords, zoom blocked", "One heading per page, a readable title, zoom allowed"],
    ],
  },
  pilot: {
    title: { nl: "Voorstel: begin met de waardebepaling", en: "Proposal: start with the valuation" },
    body: {
      nl: "We hoeven niet meteen de hele site te vervangen. Een eerste stap is alleen de waardebepaling: de pagina met het formulier, aanvragen direct in uw mailbox en een bevestiging voor de klant. Die draait naast uw huidige site, via een knop op de homepage en op Woning verkopen. Uw aanbod, Eerlijk Bieden en Taxatieweb blijven zoals ze zijn. Bevalt het, dan volgt de rest van de site in dezelfde stijl.",
      en: "There is no need to replace the whole site at once. A first step is the valuation only: the page with the form, requests straight to your inbox and a confirmation for the client. It runs next to your current site, through a button on the homepage and on Selling your home. Your listings, Eerlijk Bieden and Taxatieweb stay as they are. If it works for you, the rest of the site follows in the same style.",
    },
    steps: {
      nl: ["We bouwen de pagina en het formulier in uw huisstijl", "Aanvragen komen binnen op info@bvamakelaardij.nl", "Na 4 tot 6 weken vergelijken we het aantal aanvragen met nu"],
      en: ["We build the page and the form in your house style", "Requests arrive at info@bvamakelaardij.nl", "After 4 to 6 weeks we compare the number of requests with today"],
    },
    price: { nl: "Tegen kostprijs. De exacte prijs bespreken we graag in een kort gesprek.", en: "At cost. We are happy to discuss the exact price in a short call." },
  },
  // current-*: bvamakelaardij.nl on 2026-10-28 (Sales/Prospects/bva-makelaardij/screenshots).
  // concept-*: generated with `npm run capture bva-164550`.
  shots: { currentHome, currentMobile, conceptDesktop, conceptDesktopFold, conceptMobile },
} satisfies WebProposalContent;
