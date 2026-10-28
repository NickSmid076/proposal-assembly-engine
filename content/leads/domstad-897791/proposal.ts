// Prospect-facing content for /v/domstad-897791, in Dutch (default) and English.
// Every fact is taken from domstadmakelaars.nl or the KvK register on 2026-10-28
// (see Sales/Prospects/domstad-makelaars/analysis.md). Anything not verified is marked `placeholder`.
// Photos: the header photo, the contract photo, the De Meern photo and the listing photos on
// domstadmakelaars.nl (their own material).
// Nothing here is private, so it may be passed to client components. Keep lead status, views and notes out.

import teamTeKoop from "./team-te-koop.jpg";
import tekenen from "./tekenen.jpg";
import deMeern from "./de-meern.jpg";
import hoola from "./listing-hoola-van-nootenstraat-346.jpg";
import lorentzweg from "./listing-lorentzweg-4.jpg";
import fahrenheit from "./listing-fahrenheit-7.jpg";
import korfoedreef from "./listing-korfoedreef-23.jpg";
import currentHome from "./current-home.jpg";
import currentMobile from "./current-mobile.jpg";
import currentVerkopen from "./current-verkopen.jpg";
import conceptDesktop from "./concept-desktop.jpg";
import conceptDesktopFold from "./concept-desktop-fold.jpg";
import conceptMobile from "./concept-mobile.jpg";
import type { WebProposalContent } from "@/components/proposal/web/types";

/** One listing as shown on domstadmakelaars.nl/woningen on 2026-10-28. */
export type Listing = {
  street: string; postcode: string; town: string;
  price: number; /** Living area in m². */ area: number; rooms: number;
  /** Type as written on the site ("portiekflat", "hoekwoning", …). */ kind: string;
  status: "beschikbaar" | "verkocht-ov";
  image: typeof hoola;
};

/** Facts used inside the Domstad concept. */
export const firm = {
  name: "Domstad Makelaars",
  owner: "Trudy Kempees",
  ownerFirst: "Trudy",
  ownerTitle: "RM RT Wonen / RMT Bedrijven", // as she signs the home page text
  street: "Goeman Borgesiuslaan 77",
  postcode: "3515 ET",
  town: "Utrecht",
  phone: "030 - 231 37 31",
  phoneHref: "tel:+31302313731",
  mobile: "06 - 51 60 51 26",
  mobileHref: "tel:+31651605126",
  email: "info@domstadmakelaars.nl",
  ownerEmail: "trudy@domstadmakelaars.nl",
  kvk: "30113895",
  // Verbatim from the home page, signed by Trudy. English is our translation.
  promise: {
    nl: "Mensen gelukkig maken met een nieuw thuis is de kroon op ons werk.",
    en: "Making people happy with a new home is the crowning glory of our work.",
  },
  // From the Verkoopmakelaar page ("Zo verkopen wij jouw woning"): what they arrange when selling.
  presentation: {
    nl: ["Professionele woningfotografie", "Ingemeten plattegronden met meetrapport", "Video, ook met drone", "Stijlimpressies voor gedateerde ruimtes"],
    en: ["Professional photography", "Measured floor plans with a measurement report", "Video, drone shots included", "Style impressions for dated rooms"],
  },
  // The home listings on domstadmakelaars.nl/woningen on 2026-10-28 (a parking space for rent is left out).
  listings: [
    { street: "Hoola van Nootenstraat 346", postcode: "3521 HB", town: "Utrecht", price: 509000, area: 55, rooms: 2, kind: "portiekflat", status: "beschikbaar", image: hoola },
    { street: "Prof. dr. H.A. Lorentzweg 4", postcode: "3731 KW", town: "De Bilt", price: 585000, area: 114, rooms: 4, kind: "hoekwoning", status: "verkocht-ov", image: lorentzweg },
    { street: "Fahrenheit 7", postcode: "3454 KJ", town: "De Meern", price: 575000, area: 98, rooms: 4, kind: "geschakelde 2-onder-1-kap", status: "verkocht-ov", image: fahrenheit },
    { street: "Korfoedreef 23", postcode: "3562 SB", town: "Utrecht", price: 339000, area: 80, rooms: 4, kind: "galerijflat", status: "verkocht-ov", image: korfoedreef },
  ] satisfies Listing[],
  listingsDate: "28-10-2026",
  // "Een greep uit het door Domstad Makelaars verkochte aanbod" (domstadmakelaars.nl/recent-verkocht, undated).
  // Only the Utrecht, Vleuten and De Meern addresses: those fall on the concept's map. Prices are left out
  // because the list carries no dates.
  sold: [
    "Boekelaan 61, 3571 XA", "Borneostraat 31, 3531 PG", "Broederschaplaan 4, 3451 ZB", "Citroenvlinder 4, 3544 DG",
    "Dommeringdreef 293, 3562 AS", "Egelantierstraat 78, 3551 GE", "Egelantierstraat 86, 3551 GE", "Einsteindreef 69 A, 3562 XT",
    "Esdoornstraat 17-1, 3551 AG", "Europaweg 10, 3451 HG", "Hoendiepstraat 12 bis, 3522 GC", "J.M. de Muinck Keizerlaan 13, 3555 JT",
    "Jacob van der Borchstraat 8 bis, 3515 XD", "Jutfaseweg 204 E, 3522 HR", "Knopstraat 34b, 3551 ET", "Korfoedreef 85, 3562 SG",
    "Korfoedreef 133, 3562 SH", "Korfoedreef 111, 3562 SG", "Linnaeusstraat 52, 3553 CG", "Naxosdreef 123, 3562 JD",
    "Ondiep 202 bis A, 3552 EN", "Pahud de Mortangesdreef 306, 3562 AJ", "Papaverstraat 42, 3551 EW", "Rhodosdreef 206, 3562 TM",
    "Theemsdreef 368, 3562 EP", "Torontodreef 22, 3564 KR", "Valkstraat 44A, 3514 TK", "Van Egmondkade 54, 3553 JJ",
    "Van Eysingalaan 233, 3527 VG", "Von Weberstraat 52, 3533 EE", "Weerdsingel W.Z. 52, 3513 BE", "Wijnbesstraat 6, 3552 GJ",
  ],
  // Not verified yet: shown with a visible "voorbeeld" label.
  placeholder: { fundaScore: "x,x" },
  images: { team: teamTeKoop, tekenen, deMeern },
};

export type Firm = typeof firm;

/** Page content for the shared web proposal template (components/proposal/web/WebProposal.tsx). */
export const proposal = {
  domain: "domstadmakelaars.nl",
  firm: "Domstad Makelaars",
  hero: {
    eyebrow: { nl: "Voorstel · Domstad Makelaars · oktober 2026", en: "Proposal · Domstad Makelaars · October 2026" },
    title: { nl: ["domstadmakelaars.nl,", "opnieuw ontworpen."], en: ["domstadmakelaars.nl,", "redesigned."] },
    thanks: { nl: "Dank voor uw reactie, mevrouw Kempees.", en: "Thank you for your reply, Ms Kempees." },
    intro: {
      nl: "Uw eigen foto, uw eigen aanbod en uw eigen wijken, met één nieuw begin: een gratis waardebepaling die verkopers vanaf de homepage aanvragen. Terwijl ze het formulier invullen, zien ze hun wijk op de kaart van Utrecht oplichten, met de afstand tot de Dom. Hieronder kunt u er zelf doorheen klikken.",
      en: "Your own photo, your own listings and your own neighbourhoods, with one new starting point: a free valuation that sellers request from the homepage. While they fill in the form, they see their neighbourhood light up on the map of Utrecht, with the distance to the Dom. You can click through it yourself below.",
    },
  },
  observed: {
    lead: {
      nl: "Bekeken op 28 oktober 2026, op de computer en op de telefoon. De nummers op de schermafbeeldingen horen bij de punten ernaast.",
      en: "Checked on 28 October 2026, on a computer and on a phone. The numbers on the screenshots match the points next to them.",
    },
    screens: [
      { id: "home", image: currentHome, alt: { nl: "Huidige homepage van domstadmakelaars.nl op de computer", en: "Current domstadmakelaars.nl homepage on a computer" }, caption: { nl: "Homepage, nu", en: "Homepage, today" } },
      { id: "verkopen", image: currentVerkopen, alt: { nl: "Huidige pagina Verkoopmakelaar op domstadmakelaars.nl", en: "Current Selling agent page on domstadmakelaars.nl" }, caption: { nl: "Verkoopmakelaar, nu", en: "Selling agent, today" } },
    ],
    points: [
      {
        screen: "home", x: 46, y: 42,
        title: { nl: "Een sterke foto, maar verder niets in het eerste scherm", en: "A strong photo, but nothing else on the first screen" },
        body: {
          nl: "De foto met het TE KOOP-bord is persoonlijk en herkenbaar. Alleen staat er geen knop en geen zin bij: de kop begint pas onder de foto, en op de telefoon na een witte strook.",
          en: "The photo with the FOR SALE sign is personal and recognisable. But there is no button and no sentence with it: the heading only starts below the photo, and on a phone after a blank white strip.",
        },
      },
      {
        screen: "home", x: 30, y: 88,
        title: { nl: "Het woord “waardebepaling” staat nergens", en: "The word “valuation” appears nowhere" },
        body: {
          nl: "Op de pagina's die ik las (home, diensten, verkopen, aankopen, contact) komt het niet voor, terwijl u zelf registertaxateur bent. Wie wil weten wat de woning waard is, moet bellen of het contactformulier vinden.",
          en: "On the pages I read (home, services, selling, buying, contact) it does not appear, although you are a registered valuer yourself. Anyone who wants to know what their home is worth has to call or find the contact form.",
        },
      },
      {
        screen: "verkopen", x: 34, y: 54,
        title: { nl: "“Zo verkopen wij jouw woning” begint bij de fotograaf", en: "“How we sell your home” starts at the photographer" },
        body: {
          nl: "Fotografie, plattegronden, video en stijlimpressies zijn goed uitgelegd. De eerste stap ontbreekt: het kennismakingsgesprek en de waardebepaling.",
          en: "Photography, floor plans, video and style impressions are explained well. The first step is missing: the introduction and the valuation.",
        },
      },
      {
        screen: "verkopen", x: 57, y: 96,
        title: { nl: "“Jouw woning” en “u” door elkaar", en: "Informal and formal “you” mixed" },
        body: {
          nl: "De teksten zeggen “je” en “jouw”, de cookiemelding en de knop “Laat ons u terugbellen” zeggen “u”. De cookiemelding heeft alleen een knop “Akkoord”; weigeren zit achter een klein linkje.",
          en: "The texts use the informal “je”, the cookie notice and the “Let us call you back” button use the formal “u”. The cookie notice only has an “Agree” button; declining hides behind a small link.",
        },
      },
    ],
  },
  mobile: {
    lead: {
      nl: "Veel verkopers kijken eerst op de telefoon. Daar moet in het eerste scherm staan wie u bent en hoe ze een waardebepaling aanvragen.",
      en: "Many sellers look on their phone first. The first screen there should say who you are and how to request a valuation.",
    },
    points: [
      { title: { nl: "Kop en knop in het eerste scherm", en: "Heading and button on the first screen" }, body: { nl: "Nu volgt na de foto een witte strook en staat de kop onder de vouw. In het concept ziet u de kop, de foto en de waardebepaling direct.", en: "Today a blank strip follows the photo and the heading sits below the fold. In the concept you see the heading, the photo and the valuation straight away." } },
      { title: { nl: "Bel Trudy en waardebepaling altijd in beeld", en: "Call Trudy and valuation always in view" }, body: { nl: "Een vaste balk onderin met twee knoppen, op elke pagina. Uw eigen mobiele nummer blijft zichtbaar, zoals nu op de dienstenpagina's.", en: "A fixed bar at the bottom with two buttons, on every page. Your own mobile number stays visible, as it is now on the service pages." } },
      { title: { nl: "Een kleine cookiemelding met “Weigeren”", en: "A small cookie notice with “Decline”" }, body: { nl: "Nu neemt de melding bijna een vijfde van het scherm in en is “Akkoord” de enige knop. In het concept zijn weigeren en accepteren gelijkwaardig.", en: "Today the notice takes up almost a fifth of the screen and “Agree” is the only button. In the concept declining and accepting are equal." } },
      { title: { nl: "Beschrijvende teksten bij foto's", en: "Descriptive text for photos" }, body: { nl: "Op de homepage hebben 7 van de 8 afbeeldingen geen beschrijving voor schermlezers en zoekmachines.", en: "On the homepage 7 of the 8 images have no description for screen readers and search engines." } },
    ],
  },
  changes: {
    nl: [
      ["Geen waardebepaling te vinden, alleen bellen of het contactformulier", "Drie korte stappen op een eigen pagina, te starten vanaf de homepage met alleen uw postcode"],
      ["Eerste scherm: alleen de foto, kop eronder", "De foto met kop, één zin en de waardebepaling ernaast"],
      ["“Zo verkopen wij” begint bij de fotograaf", "Eerst het gesprek en de waardebepaling, daarna presentatie en verkoop"],
      ["“Je” en “u” door elkaar", "Overal “je”, zoals in uw eigen teksten"],
      ["Dezelfde alinea over “meer vraag dan aanbod” op drie pagina's, zonder datum", "Uw verkochte adressen op de kaart van Utrecht, per wijk"],
      ["“Aanbod bedrijven” en “Aanbod wonen” naar dezelfde pagina, vijf lege koppen", "Eén menu waarin elke link ergens anders heen gaat, geen lege koppen"],
    ],
    en: [
      ["No valuation to be found, only calling or the contact form", "Three short steps on a page of their own, started from the homepage with just a postcode"],
      ["First screen: only the photo, heading below it", "The photo with the heading, one sentence and the valuation next to it"],
      ["“How we sell” starts at the photographer", "First the meeting and the valuation, then presentation and sale"],
      ["Informal and formal “you” mixed", "Informal “je” throughout, as in your own texts"],
      ["The same paragraph on “more demand than supply” on three pages, undated", "Your sold addresses on the map of Utrecht, by neighbourhood"],
      ["“Commercial listings” and “Home listings” lead to the same page, five empty headings", "One menu where every link goes somewhere different, no empty headings"],
    ],
  },
  pilot: {
    title: { nl: "Voorstel: begin met de waardebepaling", en: "Proposal: start with the valuation" },
    body: {
      nl: "We hoeven niet meteen de hele site te vervangen. Een eerste stap is alleen de waardebepaling: een pagina met het formulier en de kaart, aanvragen direct in uw mailbox en een bevestiging voor de klant. Die komt als nieuwe pagina in uw huidige WordPress-site, met een knop op de homepage en op de verkooppagina. Uw aanbod, de terugbelknop en de wijkpagina's blijven zoals ze zijn. Bevalt het, dan volgt de rest in dezelfde stijl.",
      en: "There is no need to replace the whole site at once. A first step is the valuation only: a page with the form and the map, requests straight to your inbox and a confirmation for the client. It becomes a new page in your current WordPress site, with a button on the homepage and on the selling page. Your listings, the call-back button and the neighbourhood pages stay as they are. If it works for you, the rest follows in the same style.",
    },
    steps: {
      nl: ["We bouwen de pagina, het formulier en de kaart in uw huisstijl", "Aanvragen komen binnen op trudy@domstadmakelaars.nl", "Na 4 tot 6 weken vergelijken we het aantal aanvragen met nu"],
      en: ["We build the page, the form and the map in your house style", "Requests arrive at trudy@domstadmakelaars.nl", "After 4 to 6 weeks we compare the number of requests with today"],
    },
    price: { nl: "Tegen kostprijs. De exacte prijs bespreken we graag in een kort gesprek.", en: "At cost. We are happy to discuss the exact price in a short call." },
  },
  // current-*: domstadmakelaars.nl on 2026-10-28 (Sales/Prospects/domstad-makelaars/screenshots).
  // concept-*: generated with `npm run capture domstad-897791`.
  shots: { currentHome, currentMobile, conceptDesktop, conceptDesktopFold, conceptMobile },
} satisfies WebProposalContent;
