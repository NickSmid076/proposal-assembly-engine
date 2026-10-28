// Text that is the same on every web proposal (section titles, labels, buttons). NL and EN.
// Lead-specific text lives in content/leads/<slug>/proposal.ts.
import type { L } from "@/lib/lang";

export const web = {
  nav: { label: { nl: "Op deze pagina", en: "On this page" } as L },
  sections: {
    observed: { nl: "Wat ons opviel", en: "What we noticed" } as L,
    beforeAfter: { nl: "Voor en na", en: "Before and after" } as L,
    concept: { nl: "Concept", en: "Concept" } as L,
    mobile: { nl: "Mobiel", en: "Mobile" } as L,
    pilot: { nl: "Voorstel", en: "Proposal" } as L,
  },
  hero: {
    primary: { nl: "Bekijk het concept", en: "View the concept" },
    secondary: { nl: "Plan een gesprek", en: "Book a call" },
    alt: { nl: (d: string) => `Het concept voor ${d} op een laptop en een telefoon`, en: (d: string) => `The ${d} concept on a laptop and a phone` },
  },
  observed: {
    title: { nl: (d: string) => `Wat ons opviel op ${d}`, en: (d: string) => `What we noticed on ${d}` },
  },
  beforeAfter: {
    title: { nl: "Voor en na", en: "Before and after" },
    lead: {
      nl: "Dezelfde foto's, hetzelfde logo, dezelfde inhoud. Sleep de lijn om te vergelijken.",
      en: "The same photos, the same logo, the same content. Drag the line to compare.",
    },
    before: { nl: "Nu", en: "Today" },
    after: { nl: "Concept", en: "Concept" },
    slider: { nl: "Vergelijk de huidige homepage met het concept", en: "Compare the current homepage with the concept" },
    beforeAlt: { nl: (d: string) => `Huidige homepage van ${d}`, en: (d: string) => `Current ${d} homepage` },
    afterAlt: { nl: (d: string) => `Het concept voor de homepage van ${d}`, en: (d: string) => `The concept for the ${d} homepage` },
  },
  concept: {
    title: { nl: "Het concept: klik zelf rond", en: "The concept: click around yourself" },
    lead: {
      nl: "De pagina's werken zoals de echte site zou werken. Vul het formulier in om te zien wat een bezoeker ervaart; er wordt niets verstuurd. Onderdelen met het label “voorbeeld” vullen we in met uw eigen gegevens.",
      en: "The pages behave the way the real site would. Fill in the form to see what a visitor experiences; nothing is sent. Parts labelled “voorbeeld” (example) will be filled in with your own details.",
    },
    tablist: { nl: "Pagina in het concept", en: "Page in the concept" },
    device: { nl: "Weergave", en: "View" },
    desktop: { nl: "Desktop", en: "Desktop" },
    mobile: { nl: "Mobiel", en: "Mobile" },
  },
  mobile: {
    title: { nl: "Op de telefoon", en: "On the phone" },
    now: { nl: "Nu", en: "Today" },
    next: { nl: "Concept, klikbaar", en: "Concept, clickable" },
    nowAlt: { nl: (d: string) => `Huidige homepage van ${d} op een telefoon`, en: (d: string) => `Current ${d} homepage on a phone` },
  },
  changes: {
    title: { nl: "Wat er verandert", en: "What changes" },
    head: { nl: ["Nu", "In het concept"], en: ["Today", "In the concept"] } as L<string[]>,
  },
  pilot: {
    stepsTitle: { nl: "Zo gaat het", en: "How it works" },
    cta: { nl: "Plan een gesprek", en: "Book a call" },
    mail: { nl: "Of mail naar", en: "Or email" },
  },
};

export const CONTACT_EMAIL = "nick@assembly-engine.com";
