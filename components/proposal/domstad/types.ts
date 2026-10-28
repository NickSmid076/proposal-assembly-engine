// Type-only import: erased at build time.
export type { Firm as DomFirm, Listing as DomListing } from "@/content/leads/domstad-897791/proposal";
export type DomPage = "home" | "aanbod" | "waardebepaling";
/** Postcode and house number typed in the home hero, carried over to the valuation form. */
export type Prefill = { postcode: string; number: string };
export type Go = (page: DomPage, prefill?: Prefill) => void;
/** House types in the valuation form, in form order. */
export const HOUSE_TYPES = ["appartement", "tussenwoning", "hoekwoning", "twee-onder-een-kap", "vrijstaand"] as const;
export type HouseType = (typeof HOUSE_TYPES)[number];
/** How far the request is: 0 address not known yet, 1 address (wijk found), 2 home type, 3 sent. */
export type MapStage = 0 | 1 | 2 | 3;
