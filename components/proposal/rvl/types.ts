// Type-only import: erased at build time.
export type { Firm as RvlFirm, Listing as RvlListing, Office as RvlOffice } from "@/content/leads/rvl-831843/proposal";
export type RvlPage = "home" | "aanbod" | "waardebepaling";
/** Postcode and house number typed in the home hero, carried over to the valuation form. */
export type Prefill = { postcode: string; number: string };
export type Go = (page: RvlPage, prefill?: Prefill) => void;
/** House types in the valuation form, in form order. */
export const HOUSE_TYPES = ["appartement", "tussenwoning", "hoekwoning", "twee-onder-een-kap", "vrijstaand"] as const;
export type HouseType = (typeof HOUSE_TYPES)[number];
