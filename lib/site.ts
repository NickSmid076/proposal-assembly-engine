// Links back to the main site (assembly-engine.com). Header and footer only ever link there,
// never to other pages on this domain. Strings are the Dutch copy from Website/lib/i18n/nl.ts.

export const MAIN = "https://www.assembly-engine.com";
/** Absolute URL on the Dutch main site: main("/about") → https://www.assembly-engine.com/nl/about */
export const main = (p = "/") => `${MAIN}/nl${p === "/" ? "" : p}`;

export const SERVICES = [
  { slug: "brand-digital-presence", name: "Merk & Online Zichtbaarheid", lead: "Een merk waar klanten op vertrouwen." },
  { slug: "customer-acquisition", name: "Klantwerving", lead: "Uw team, versterkt." },
  { slug: "operational-automation", name: "Operationele Automatisering", lead: "Werk dat zichzelf doet." },
  { slug: "invoice-payment-automation", name: "Factuur- & Betaalautomatisering", lead: "Sneller betaald. Automatisch geboekt." },
  { slug: "business-reporting-automation", name: "Rapportage-automatisering", lead: "Rapportages die zichzelf maken." },
] as const;

export const NAV = {
  services: "Diensten", caseStudy: "Case", resources: "Kennis", about: "Over", contact: "Contact",
  cta: "Gratis analyse aanvragen", blog: "Blog", howWeWork: "Werkwijze", menu: "Menu", close: "Menu sluiten", language: "Taal",
} as const;

export const FOOTER = {
  tagline: "Automatisering voor accountants-, advocaten- en adviesbureaus.", services: "Diensten", company: "Bedrijf",
  contact: "Contact", privacy: "Privacy", terms: "Voorwaarden", location: "Nederland · grotendeels online",
} as const;
