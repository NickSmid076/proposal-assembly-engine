// Type-only import: erased at build time.
export type { Firm as LemmensFirm, Listing as LemmensListing } from "@/content/leads/lemmens-550127/proposal";
export type LemmensPage = "home" | "aanbod" | "waardebepaling";
/** Postcode and house number typed in the home hero, carried over to the valuation form. */
export type Prefill = { postcode: string; number: string };
export type Go = (page: LemmensPage, prefill?: Prefill) => void;
