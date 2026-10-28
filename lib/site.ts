// Links back to the main site (assembly-engine.com). Header and footer only ever link there,
// never to other pages on this domain. Strings are the Dutch copy from Website/lib/i18n/nl.ts.

export const MAIN = "https://www.assembly-engine.com";
/** Absolute URL on the Dutch main site: main("/about") → https://www.assembly-engine.com/nl/about */
export const main = (p = "/", lang: "nl" | "en" = "nl") => `${MAIN}/${lang}${p === "/" ? "" : p}`;

export const SERVICES = [
  { slug: "brand-digital-presence", name: "Merk & Online Zichtbaarheid", lead: "Een merk waar klanten op vertrouwen." },
  { slug: "customer-acquisition", name: "Klantwerving", lead: "Uw team, versterkt." },
  { slug: "operational-automation", name: "Operationele Automatisering", lead: "Werk dat zichzelf doet." },
  { slug: "invoice-payment-automation", name: "Factuur- & Betaalautomatisering", lead: "Sneller betaald. Automatisch geboekt." },
  { slug: "business-reporting-automation", name: "Rapportage-automatisering", lead: "Rapportages die zichzelf maken." },
] as const;

/** English names, same order as SERVICES (from Website/lib/i18n/en.ts). Used on bilingual proposal pages. */
export const SERVICES_EN = [
  { name: "Brand & Digital Presence", lead: "A brand clients actually trust." },
  { name: "Customer Acquisition", lead: "Your team, amplified." },
  { name: "Operational Automation", lead: "Work that runs itself." },
  { name: "Invoice & Payment Automation", lead: "Paid faster. Booked automatically." },
  { name: "Business Reporting Automation", lead: "Reports that build themselves." },
] as const;

export const NAV = {
  services: "Diensten", caseStudy: "Case", resources: "Kennis", about: "Over", contact: "Contact",
  cta: "Gratis analyse aanvragen", blog: "Blog", howWeWork: "Werkwijze", menu: "Menu", close: "Menu sluiten", language: "Taal",
} as const;

export const NAV_EN = {
  services: "Services", caseStudy: "Case study", resources: "Resources", about: "About", contact: "Contact",
  cta: "Book a free audit", blog: "Blog", howWeWork: "How we work", menu: "Menu", close: "Close menu", language: "Language",
} as const;

export const FOOTER = {
  tagline: "Automatisering voor accountants-, advocaten- en adviesbureaus.", services: "Diensten", company: "Bedrijf",
  contact: "Contact", privacy: "Privacy", terms: "Voorwaarden", location: "Nederland · grotendeels online",
} as const;

export const FOOTER_EN = {
  tagline: "Automation for accounting, legal & consulting firms.", services: "Services", company: "Company",
  contact: "Contact", privacy: "Privacy", terms: "Terms", location: "The Netherlands · working remotely",
} as const;
