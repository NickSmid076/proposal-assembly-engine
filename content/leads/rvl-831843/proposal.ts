// Prospect-facing content for /v/rvl-831843, in Dutch (default) and English.
// Every fact is taken from rvlmakelaars.nl or the KvK register on 2026-10-28
// (see Sales/Prospects/rvl-makelaars/analysis.md). Anything not verified is marked `placeholder`.
// Photos: the team photo, the aerial photo of Utrecht and the listing photos on rvlmakelaars.nl (their own material).
// Nothing here is private, so it may be passed to client components. Keep lead status, views and notes out.

import team from "./team.jpg";
import utrecht from "./utrecht.jpg";
import johannes from "./listing-johannes-de-bekastraat-16bs.jpg";
import beerze from "./listing-beerzestraat-14.jpg";
import dam from "./listing-damstraat-42.jpg";
import poort from "./listing-poortstraat-95.jpg";
import herenweg from "./listing-herenweg-53a.jpg";
import herenstraat from "./listing-herenstraat-15.jpg";
import leidseweg from "./listing-leidseweg-24bs.jpg";
import aristoteles from "./listing-aristoteleslaan-2.jpg";
import currentHome from "./current-home.jpg";
import currentMobile from "./current-mobile.jpg";
import currentWaardebepaling from "./current-waardebepaling.jpg";
import conceptDesktop from "./concept-desktop.jpg";
import conceptDesktopFold from "./concept-desktop-fold.jpg";
import conceptMobile from "./concept-mobile.jpg";
import type { WebProposalContent } from "@/components/proposal/web/types";

/**
 * One listing as shown on the rvlmakelaars.nl homepage on 2026-10-28. The site loads living area and rooms
 * by script from its listing feed, so only street, town and price are verified: nothing else is shown.
 */
export type Listing = { street: string; town: string; price: number; image: typeof team };

/** One of the two offices. Utrecht from the site; Leidsche Rijn from the KvK register (nevenvestiging). */
export type Office = { id: "utrecht" | "leidsche-rijn"; name: string; street: string; postcode: string; town: string };

/** Facts used inside the RVL concept. */
export const firm = {
  name: "Rosenberg Van Leusden Makelaars",
  short: "RVL Makelaars",
  legal: "Rosenberg & van Leusden Makelaars B.V.",
  phone: "030 - 2100401",
  phoneHref: "tel:+31302100401",
  whatsapp: "06 - 46441783",
  whatsappHref: "https://wa.me/31646441783",
  email: "info@rvlmakelaars.nl",
  kvk: "30286771",
  founded: 2010,
  offices: [
    { id: "utrecht", name: "Utrecht", street: "Prins Hendriklaan 44", postcode: "3583 EN", town: "Utrecht" },
    { id: "leidsche-rijn", name: "Leidsche Rijn", street: "Saffraanweg 41", postcode: "3541 SZ", town: "Utrecht" },
  ] satisfies Office[],
  /** First digits of the Leidsche Rijn and Vleuten-De Meern postcodes: requests from there go to the Leidsche Rijn office. */
  leidscheRijnPc4: ["3541", "3542", "3543", "3544", "3545", "3546", "3451", "3452", "3453", "3454", "3455"],
  // From the "Ons team" page.
  team: [
    { name: "Egon Rosenberg", role: { nl: "Makelaar, oprichter", en: "Estate agent, founder" } },
    { name: "Niels van Leusden", role: { nl: "Makelaar, oprichter", en: "Estate agent, founder" } },
    { name: "Henriëtte de Kruijf", role: { nl: "Sinds 2012", en: "Since 2012" } },
    { name: "Emma Elbertse", role: { nl: "Sinds 2024", en: "Since 2024" } },
  ],
  // Verbatim from the site (home, "Huis verkopen Utrecht" and "Ons team" pages).
  ratings: { google: "4,8", googleCount: "150+", funda: "9,2" },
  sold: "700+",
  // The homepage headline. Kept as is: it is theirs and it is good.
  headline: { nl: ["Omdat uw", "woning", "het waard is"], en: ["Because your", "home", "is worth it"] },
  // The home listings on rvlmakelaars.nl on 2026-10-28, in the order shown.
  listings: [
    { street: "Johannes de Bekastraat 16 BS", town: "Utrecht", price: 650000, image: johannes },
    { street: "Beerzestraat 14", town: "Utrecht", price: 550000, image: beerze },
    { street: "Damstraat 42", town: "Utrecht", price: 400000, image: dam },
    { street: "Poortstraat 95", town: "Utrecht", price: 800000, image: poort },
    { street: "Herenweg 53 A", town: "Utrecht", price: 400000, image: herenweg },
    { street: "Herenstraat 15", town: "Utrecht", price: 800000, image: herenstraat },
    { street: "Leidseweg 24 BS", town: "Utrecht", price: 850000, image: leidseweg },
    { street: "Aristoteleslaan 2", town: "Zeist", price: 1495000, image: aristoteles },
  ] satisfies Listing[],
  listingsDate: "28-10-2026",
  // Not verified: shown with a visible "voorbeeld" label. No invented quotes: these slots show where real
  // Google reviews would go.
  placeholder: { reviewSlots: 3 },
  images: { team, utrecht },
};

export type Firm = typeof firm;

/** Page content for the shared web proposal template (components/proposal/web/WebProposal.tsx). */
export const proposal = {
  domain: "rvlmakelaars.nl",
  firm: "RVL Makelaars",
  hero: {
    eyebrow: { nl: "Voorstel · Rosenberg Van Leusden Makelaars · oktober 2026", en: "Proposal · Rosenberg Van Leusden Makelaars · October 2026" },
    title: { nl: ["rvlmakelaars.nl,", "een stap verder."], en: ["rvlmakelaars.nl,", "one step further."] },
    thanks: { nl: "Dank voor uw reactie, heer Rosenberg en heer Van Leusden.", en: "Thank you for your reply, Mr Rosenberg and Mr Van Leusden." },
    intro: {
      nl: "Uw site staat er goed voor: de kop, de reviews, WhatsApp. Dit concept verandert daarom niet uw verhaal, maar de stap waar het op uitkomt: de gratis waardebepaling. Een verkoper vult postcode en huisnummer in, het adres verschijnt vanzelf, en terwijl hij verder klikt bouwt een woningkaart zich op die bij het juiste kantoor binnenkomt. Hieronder kunt u er zelf doorheen klikken.",
      en: "Your site is in good shape: the headline, the reviews, WhatsApp. So this concept does not change your story, but the step it leads to: the free valuation. A seller enters a postcode and house number, the address appears by itself, and as they click on, a home card builds up that arrives at the right office. You can click through it yourself below.",
    },
  },
  observed: {
    lead: {
      nl: "Bekeken op 28 oktober 2026, op de computer en op de telefoon. De nummers op de schermafbeeldingen horen bij de punten ernaast.",
      en: "Checked on 28 October 2026, on a computer and on a phone. The numbers on the screenshots match the points next to them.",
    },
    screens: [
      { id: "home", image: currentHome, alt: { nl: "Huidige homepage van rvlmakelaars.nl op de computer", en: "Current rvlmakelaars.nl homepage on a computer" }, caption: { nl: "Homepage, nu", en: "Homepage, today" } },
      { id: "wb", image: currentWaardebepaling, alt: { nl: "Huidige pagina Gratis waardebepaling op rvlmakelaars.nl", en: "Current Free valuation page on rvlmakelaars.nl" }, caption: { nl: "Gratis waardebepaling, nu", en: "Free valuation, today" } },
    ],
    points: [
      {
        screen: "home", x: 50, y: 45,
        title: { nl: "Eén knop in het eerste scherm: het telefoonnummer", en: "One button on the first screen: the phone number" },
        body: {
          nl: "De kop is sterk en de foto persoonlijk. Wie nu al wil weten wat zijn huis waard is, kan alleen bellen; de knop voor de waardebepaling staat verder naar beneden, en op de telefoon ook.",
          en: "The headline is strong and the photo personal. Anyone who wants to know what their home is worth right now can only call; the valuation button sits further down, on the phone too.",
        },
      },
      {
        screen: "wb", x: 76, y: 82,
        title: { nl: "Een pagina over de waardebepaling, zonder formulier", en: "A page about the valuation, without a form" },
        body: {
          nl: "De pagina belooft “direct inzicht in de actuele marktwaarde”. Aanvragen kan hier niet: de knoppen leiden naar het algemene contactformulier, met voornaam, achternaam, e-mail, telefoon en een berichtveld.",
          en: "The page promises “direct insight into the current market value”. You cannot request it here: the buttons lead to the general contact form, with first name, last name, email, phone and a message box.",
        },
      },
      {
        screen: "wb", x: 23, y: 18,
        title: { nl: "Het adres typt de bezoeker zelf in een bericht", en: "Visitors type their address into a message" },
        body: {
          nl: "De knop “Ja graag” op de homepage vult het bericht vooraf in met “(vult u a.u.b. hier uw adres en woonplaats in)” en “(dag) om (tijdstip)”. Wie dat niet netjes aanpast, stuurt een aanvraag zonder adres.",
          en: "The “Yes please” button on the homepage prefills the message with “(please enter your address and town here)” and “(day) at (time)”. Anyone who does not edit that neatly sends a request without an address.",
        },
      },
      {
        screen: "wb", x: 45, y: 58,
        title: { nl: "Drie verschillende cijfers", en: "Three different scores" },
        body: {
          nl: "Op deze pagina staat 9,1 in de badge, op de homepage 9,4, en in de tekst van beide pagina's “9,2 op Funda”. Waarschijnlijk zijn het momentopnames; een bezoeker ziet alleen dat ze niet kloppen met elkaar.",
          en: "This page shows 9.1 in the badge, the homepage 9.4, and the text on both pages “9.2 on Funda”. They are probably snapshots; a visitor only sees that they do not match.",
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
      { title: { nl: "Kop, foto en waardebepaling direct zichtbaar", en: "Headline, photo and valuation visible at once" }, body: { nl: "Nu is het eerste scherm een tel grijs voordat de foto van 2000 pixels breed binnen is. In het concept staat er meteen een vage voorvertoning, met de kop en de knop eroverheen.", en: "Today the first screen is grey for a moment until the 2000-pixel-wide photo arrives. In the concept a blurred preview is there at once, with the headline and the button on top." } },
      { title: { nl: "Waardebepaling en WhatsApp altijd in beeld", en: "Valuation and WhatsApp always in view" }, body: { nl: "Een vaste balk onderin met twee knoppen, op elke pagina. Uw WhatsApp-nummer is al een sterk punt; het krijgt een vaste plek.", en: "A fixed bar at the bottom with two buttons, on every page. Your WhatsApp number is already a strong point; it gets a permanent place." } },
      { title: { nl: "Knoppen groot genoeg voor een duim", en: "Buttons big enough for a thumb" }, body: { nl: "Op de homepage zijn 82 links en knoppen kleiner dan 32 pixels. In het concept is alles wat je aantikt minstens 44 pixels hoog.", en: "On the homepage 82 links and buttons are smaller than 32 pixels. In the concept everything you tap is at least 44 pixels tall." } },
      { title: { nl: "Beschrijvende teksten bij foto's", en: "Descriptive text for photos" }, body: { nl: "Op de homepage hebben vier afbeeldingen geen beschrijving voor schermlezers en zoekmachines.", en: "On the homepage four images have no description for screen readers and search engines." } },
    ],
  },
  changes: {
    nl: [
      ["Waardebepaling via het algemene contactformulier, adres in het berichtveld", "Vier korte stappen; postcode en huisnummer vullen het adres zelf in"],
      ["Elke aanvraag komt binnen op één adres", "De aanvraag gaat naar kantoor Utrecht of Leidsche Rijn, met adres, woning en voorkeursmoment ingevuld"],
      ["Eerste scherm: grijs, dan de foto en alleen een belknop", "Direct een voorvertoning met kop, waardebepaling en WhatsApp"],
      ["Cijfers 9,1, 9,2 en 9,4 op verschillende plekken", "Eén cijfer per bron, op één plek bijgehouden"],
      ["Geen meting van aanvragen", "Elke stap van het formulier gemeten, zodat u ziet wat de site oplevert"],
      ["Behouden", "Uw kop, uw teamfoto, de SEO-pagina's en hun adressen, het aanbod uit uw koppeling, video, brochure en WhatsApp"],
    ],
    en: [
      ["Valuation via the general contact form, address in the message box", "Four short steps; postcode and house number fill in the address"],
      ["Every request arrives at one address", "The request goes to the Utrecht or Leidsche Rijn office, with address, home and preferred time filled in"],
      ["First screen: grey, then the photo and only a call button", "A preview at once, with headline, valuation and WhatsApp"],
      ["Scores 9.1, 9.2 and 9.4 in different places", "One score per source, kept in one place"],
      ["Requests are not measured", "Every step of the form measured, so you see what the site brings in"],
      ["Kept", "Your headline, your team photo, the SEO pages and their addresses, the listings from your feed, video, brochure and WhatsApp"],
    ],
  },
  pilot: {
    title: { nl: "Voorstel: begin met de waardebepaling", en: "Proposal: start with the valuation" },
    body: {
      nl: "Uw site hoeft niet opnieuw. Een eerste stap is alleen de waardebepaling: eerst vier weken meten hoeveel aanvragen er nu binnenkomen, daarna komt het nieuwe formulier op uw bestaande pagina “Gratis waardebepaling” en achter de knoppen die nu naar het contactformulier gaan. Uw teksten, uw aanbod en uw adressen in Google blijven zoals ze zijn.",
      en: "Your site does not need rebuilding. A first step is the valuation only: first four weeks of measuring how many requests come in today, then the new form goes onto your existing “Free valuation” page and behind the buttons that now lead to the contact form. Your texts, your listings and your addresses in Google stay as they are.",
    },
    steps: {
      nl: ["Vier weken meten: hoeveel aanvragen komen er nu binnen", "Het formulier op uw waardebepalingspagina, aanvragen naar info@rvlmakelaars.nl", "Na 4 tot 6 weken vergelijken we het aantal aanvragen met nu"],
      en: ["Four weeks of measuring: how many requests come in today", "The form on your valuation page, requests to info@rvlmakelaars.nl", "After 4 to 6 weeks we compare the number of requests with today"],
    },
    price: { nl: "Tegen kostprijs. De exacte prijs bespreken we graag in een kort gesprek.", en: "At cost. We are happy to discuss the exact price in a short call." },
  },
  // current-*: rvlmakelaars.nl on 2026-10-28 (Sales/Prospects/rvl-makelaars/screenshots), clean browser profile.
  // concept-*: generated with `npm run capture rvl-831843`.
  shots: { currentHome, currentMobile, conceptDesktop, conceptDesktopFold, conceptMobile },
} satisfies WebProposalContent;
