// Prospect-facing content for /v/lemmens-550127, in Dutch (default) and English.
// Every fact is taken from lemmens.nl or the KvK register on 2026-10-27
// (see Sales/Prospects/lemmens-makelaardij/analysis.md). Anything not verified is marked `placeholder`.
// Photos: the home slider, the office photo and the listing photos on lemmens.nl (their own material).
// Nothing here is private, so it may be passed to client components. Keep lead status, views and notes out.

import logo from "./logo.svg";
import office from "./office.jpg";
import straat from "./tilburg-straat.jpg";
import kerk from "./tilburg-kerk.jpg";
import brug from "./tilburg-brug.jpg";
import water from "./tilburg-water.jpg";
import westpoint from "./tilburg-westpoint.jpg";
import trouwlaan from "./listing-trouwlaan-204.jpg";
import guldenAkker from "./listing-gulden-akker-25.jpg";
import oerlesestraat from "./listing-oerlesestraat-212.jpg";
import korvelseweg from "./listing-korvelseweg-32.jpg";
import bosscheweg from "./listing-bosscheweg-57.jpg";
import currentHome from "./current-home.jpg";
import currentMobile from "./current-mobile.jpg";
import currentWaardebepaling from "./current-waardebepaling.jpg";
import conceptDesktop from "./concept-desktop.jpg";
import conceptDesktopFold from "./concept-desktop-fold.jpg";
import conceptMobile from "./concept-mobile.jpg";
import type { WebProposalContent } from "@/components/proposal/web/types";

/** One listing as shown on the lemmens.nl home page on 2026-10-27. */
export type Listing = {
  street: string; postcode: string; town: string;
  kind: "wonen" | "bedrijf"; deal: "koop" | "huur";
  price: number; /** Living / floor area in m². */ area: number; /** Plot in m², if listed. */ plot?: number;
  isNew?: boolean; image: typeof trouwlaan;
};

/** Facts used inside the Lemmens concept. */
export const firm = {
  name: "Lemmens Makelaardij",
  owner: "Esther Lemmens",
  ownerFirst: "Esther",
  years: 26, // "al 26 jaar", /onze-mensen
  street: "Ringbaan-Oost 493",
  postcode: "5017 AB",
  town: "Tilburg",
  phone: "013 - 543 22 24",
  phoneHref: "tel:+31135432224",
  email: "info@lemmens.nl",
  kvk: "18044608",
  btw: "NL804714654B01",
  // Shown as logos in the footer of lemmens.nl on 2026-10-27.
  memberships: ["NVM", "Vastgoedcert", "KNB", "NWWI"],
  // Verbatim from the home slider (labelled "Verkoper …" there). Street names left out on purpose.
  // English versions are our translation and are labelled as such in the concept.
  reviews: [
    {
      nl: "Snel, direct, daadkrachtig, kundig maar vooral ook persoonlijk advies. Erg blij met de snelle afdoening van de verkoop van onze woning!",
      en: "Fast, direct, decisive, knowledgeable and above all personal advice. Very happy with how quickly the sale of our home was completed!",
    },
    {
      nl: "Makelaardij Lemmens heeft mijn verwachtingen overtroffen! Men was altijd heel goed bereikbaar, vragen werden vlot beantwoord. De strategie om mijn huis goed in de markt te zetten was geweldig. Ik voelde me heel persoonlijk en goed begeleid.",
      en: "Lemmens exceeded my expectations! They were always easy to reach and questions were answered quickly. The strategy for marketing my house was excellent. I felt personally and well looked after.",
    },
    {
      nl: "Het contact met de makelaar was uitstekend, kennis van zaken was heel goed. We zijn heel goed op de hoogte gehouden via Funda maar ook via de makelaar zelf. Wij bevelen iedereen aan om met Lemmens in zee te gaan.",
      en: "Contact with the agent was excellent and their knowledge was very good. We were kept well informed through Funda and by the agent personally. We recommend Lemmens to everyone.",
    },
  ],
  // Live on lemmens.nl on 2026-10-27 (home page "Aanbod" block).
  listings: [
    { street: "Trouwlaan 204", postcode: "5021 WR", town: "Tilburg", kind: "wonen", deal: "koop", price: 397500, area: 102, plot: 122, isNew: true, image: trouwlaan },
    { street: "Gulden Akker 25", postcode: "5087 LE", town: "Diessen", kind: "wonen", deal: "koop", price: 515000, area: 104, plot: 243, isNew: true, image: guldenAkker },
    { street: "Oerlesestraat 212", postcode: "5025 DE", town: "Tilburg", kind: "wonen", deal: "koop", price: 375000, area: 116, plot: 148, image: oerlesestraat },
    { street: "Korvelseweg 32", postcode: "5025 JH", town: "Tilburg", kind: "bedrijf", deal: "koop", price: 695000, area: 144, plot: 249, image: korvelseweg },
    { street: "Bosscheweg 57", postcode: "5056 KA", town: "Berkel-Enschot", kind: "bedrijf", deal: "huur", price: 5400, area: 360, image: bosscheweg },
  ] satisfies Listing[],
  listingsDate: "27-10-2026",
  // Not verified yet: shown with a visible "voorbeeld" label.
  placeholder: { fundaScore: "x,x" },
  images: { logo, office, straat, kerk, brug, water, westpoint },
};

export type Firm = typeof firm;

/** Page content for the shared web proposal template (components/proposal/web/WebProposal.tsx). */
export const proposal = {
  domain: "lemmens.nl",
  firm: "Lemmens Makelaardij",
  hero: {
    eyebrow: { nl: "Voorstel · Lemmens Makelaardij · oktober 2026", en: "Proposal · Lemmens Makelaardij · October 2026" },
    title: { nl: ["lemmens.nl,", "opnieuw ontworpen."], en: ["lemmens.nl,", "redesigned."] },
    thanks: { nl: "Dank voor uw reactie, mevrouw Lemmens.", en: "Thank you for your reply, Ms Lemmens." },
    intro: {
      nl: "Een homepage die direct zegt wat u doet, een waardebepaling die op de pagina zelf werkt en een mobiele site die klopt. Gemaakt met uw eigen foto's en uw eigen aanbod. Hieronder kunt u er zelf doorheen klikken.",
      en: "A homepage that says what you do at a glance, a valuation request that works on the page itself, and a mobile site that holds up. Built with your own photos and your own listings. You can click through it yourself below.",
    },
  },
  observed: {
    lead: {
      nl: "Bekeken op 27 oktober 2026, op de computer en op de telefoon. De nummers op de schermafbeeldingen horen bij de punten ernaast.",
      en: "Checked on 27 October 2026, on a computer and on a phone. The numbers on the screenshots match the points next to them.",
    },
    screens: [
      { id: "home", image: currentHome, alt: { nl: "Huidige homepage van lemmens.nl op de computer", en: "Current lemmens.nl homepage on a computer" }, caption: { nl: "Homepage, nu", en: "Homepage, today" } },
      { id: "wb", image: currentWaardebepaling, alt: { nl: "Huidige pagina Gratis waardebepaling op lemmens.nl", en: "Current Free valuation page on lemmens.nl" }, caption: { nl: "Gratis waardebepaling, nu", en: "Free valuation, today" } },
    ],
    points: [
      {
        screen: "home", x: 72, y: 30,
        title: { nl: "Het eerste scherm is een wisselende klantreview", en: "The first screen is a rotating client review" },
        body: {
          nl: "Een mooie review, maar een bezoeker leest niet wat Lemmens doet, voor wie, of waar hij moet klikken om een waardebepaling te vragen.",
          en: "A good review, but a visitor does not read what Lemmens does, for whom, or where to click to ask for a valuation.",
        },
      },
      {
        screen: "home", x: 14, y: 87,
        title: { nl: "De cookiemelding biedt alleen “Begrepen!”", en: "The cookie notice only offers “Begrepen!” (Got it)" },
        body: {
          nl: "Er is geen keuze om te weigeren, terwijl de site wel Google-diensten laadt. Op de telefoon ligt de melding over de eerste inhoud heen.",
          en: "There is no way to decline, while the site does load Google services. On a phone the notice covers the first content.",
        },
      },
      {
        screen: "wb", x: 36, y: 44,
        title: { nl: "De pagina “Gratis waardebepaling” heeft geen formulier", en: "The “Free valuation” page has no form" },
        body: {
          nl: "Bezoekers lezen een tekst en worden doorgestuurd naar een aparte pagina of het contactformulier met 8 velden. Wie alleen wil weten wat de woning waard is, haakt daar mogelijk af.",
          en: "Visitors read some text and are sent on to a separate page or the 8-field contact form. Someone who only wants to know what their home is worth may give up there.",
        },
      },
      {
        screen: "wb", x: 84, y: 94,
        title: { nl: "Algemeen nieuws in plaats van uw eigen verhaal", en: "Generic news instead of your own story" },
        body: {
          nl: "Het blok “Laatste nieuws” toont automatische berichten over bedrijfsvastgoed elders in het land, ook op de pagina voor de waardebepaling.",
          en: "The “Latest news” block shows automated headlines about commercial property elsewhere in the country, including on the valuation page.",
        },
      },
    ],
  },
  mobile: {
    lead: {
      nl: "Een groot deel van de bezoekers komt via de telefoon, vaak rechtstreeks vanuit Funda. Daar moet bellen of een waardebepaling aanvragen één tik zijn.",
      en: "Many visitors arrive on a phone, often straight from Funda. There, calling or requesting a valuation should be one tap.",
    },
    points: [
      { title: { nl: "Bellen en waardebepaling altijd in beeld", en: "Call and valuation always in view" }, body: { nl: "Een vaste balk onderin met twee knoppen, op elke pagina.", en: "A fixed bar at the bottom with two buttons, on every page." } },
      { title: { nl: "Leesbaar telefoonnummer", en: "A readable phone number" }, body: { nl: "Nu staat het nummer in blauwe tekst op rood. In het concept is het een knop.", en: "Today the number is blue text on red. In the concept it is a button." } },
      { title: { nl: "Cookiemelding die niets afdekt", en: "A cookie notice that covers nothing" }, body: { nl: "Een smalle balk met Accepteren en Weigeren, in plaats van een blok over de inhoud.", en: "A slim bar with Accept and Decline, instead of a box over the content." } },
      { title: { nl: "Inzoomen mag weer", en: "Zooming works again" }, body: { nl: "De huidige site blokkeert inzoomen. Dat is lastig voor wie kleine tekst slecht leest.", en: "The current site blocks zooming, which is hard on anyone who struggles with small text." } },
    ],
  },
  changes: {
    nl: [
      ["Waardebepaling via een aparte pagina of het contactformulier", "Drie korte stappen direct op de pagina, te starten vanaf de homepage met alleen uw postcode"],
      ["Wisselende reviews als eerste scherm", "Eén duidelijke regel over wat u doet, met de waardebepaling ernaast"],
      ["Reviews alleen via een Funda-venster", "Reviews, 26 jaar ervaring en lidmaatschappen zichtbaar op de homepage"],
      ["Algemene nieuwsfeed op elke pagina", "Uw eigen aanbod, uw kantoor en Tilburg"],
      ["Telefoon: nummer in blauw op rood, inzoomen geblokkeerd", "Vaste balk met Bellen en Waardebepaling, inzoomen toegestaan"],
      ["Cookiemelding met alleen “Begrepen!”", "Accepteren én weigeren"],
    ],
    en: [
      ["Valuation via a separate page or the contact form", "Three short steps on the page itself, started from the homepage with just a postcode"],
      ["Rotating reviews as the first screen", "One clear line about what you do, with the valuation right next to it"],
      ["Reviews only inside a Funda window", "Reviews, 26 years of experience and memberships visible on the homepage"],
      ["Generic news feed on every page", "Your own listings, your office and Tilburg"],
      ["Phone: number in blue on red, zoom blocked", "Fixed bar with Call and Valuation, zoom allowed"],
      ["Cookie notice with only “Got it!”", "Accept and decline"],
    ],
  },
  pilot: {
    title: { nl: "Voorstel: begin met de waardebepaling", en: "Proposal: start with the valuation" },
    body: {
      nl: "We hoeven niet meteen de hele site te vervangen. Een eerste stap is alleen de waardebepaling: de pagina met het formulier, aanvragen direct in uw mailbox en een bevestiging voor de klant. Die draait naast uw huidige site, via een knop of link. Uw aanbod en de koppeling met uw huidige platform blijven zoals ze zijn. Bevalt het, dan volgt de rest van de site in dezelfde stijl.",
      en: "There is no need to replace the whole site at once. A first step is the valuation only: the page with the form, requests straight to your inbox and a confirmation for the client. It runs next to your current site, through a button or link. Your listings and the link with your current platform stay as they are. If it works for you, the rest of the site follows in the same style.",
    },
    steps: {
      nl: ["We bouwen de pagina en het formulier in uw huisstijl", "Aanvragen komen binnen op info@lemmens.nl", "Na 4 tot 6 weken vergelijken we het aantal aanvragen met nu"],
      en: ["We build the page and the form in your house style", "Requests arrive at info@lemmens.nl", "After 4 to 6 weeks we compare the number of requests with today"],
    },
    price: { nl: "Tegen kostprijs. De exacte prijs bespreken we graag in een kort gesprek.", en: "At cost. We are happy to discuss the exact price in a short call." },
  },
  // current-*: lemmens.nl on 2026-10-27 (Sales/Prospects/lemmens-makelaardij/screenshots).
  // concept-*: generated with `npm run capture lemmens-550127`.
  shots: { currentHome, currentMobile, conceptDesktop, conceptDesktopFold, conceptMobile },
} satisfies WebProposalContent;
