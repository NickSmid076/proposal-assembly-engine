// The content every web proposal provides. The page structure, style and behaviour come from
// WebProposal.tsx; only this content and the concept site differ per lead.
// All prospect-facing text is bilingual (NL default, EN on the header switch).
import type { StaticImageData } from "next/image";
import type { L } from "@/lib/lang";

/** A numbered pin on one of the "current site" screenshots, with the point it explains. */
export type WebPoint = {
  /** Which screenshot the pin sits on (WebScreen.id). */
  screen: string;
  /** Pin position as a percentage of the screenshot (0-100). */
  x: number; y: number;
  title: L; body: L;
};

export type WebScreen = { id: string; image: StaticImageData; alt: L; caption: L };

export type WebProposalContent = {
  /** Their current domain as shown to them, e.g. "lemmens.nl". */
  domain: string;
  /** Firm name as used in the page title and eyebrow. */
  firm: string;
  hero: {
    /** e.g. "Voorstel · Lemmens Makelaardij · oktober 2026". */
    eyebrow: L;
    /** Two lines; the second gets the gradient. */
    title: L<[string, string]>;
    /** Personal thank-you line under the title. */
    thanks: L;
    intro: L;
  };
  /** Screenshots of their current site with numbered pins (2 screens, 1-3 pins each, reads best). */
  observed: { lead: L; screens: WebScreen[]; points: WebPoint[] };
  /** Mobile comparison: what is better on the phone (3-4 points). */
  mobile: { lead: L; points: { title: L; body: L }[] };
  /** "Today" → "In the concept" rows. */
  changes: L<[string, string][]>;
  pilot: { title: L; body: L; steps: L<string[]>; price: L };
  /**
   * Screenshots. `current*` are of their site today (1440×900 desktop, phone width mobile).
   * `concept*` are captured from the concept with `npm run capture <slug>` (see README).
   */
  shots: {
    currentHome: StaticImageData;
    currentMobile: StaticImageData;
    conceptDesktop: StaticImageData;
    conceptDesktopFold: StaticImageData;
    conceptMobile: StaticImageData;
  };
};
