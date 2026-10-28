// Type-only import: erased at build time.
export type { Firm as BvaFirm, Listing as BvaListing } from "@/content/leads/bva-164550/proposal";
export type BvaPage = "home" | "aanbod" | "waardebepaling";
/** Postcode and house number typed in the home hero, carried over to the valuation form. */
export type Prefill = { postcode: string; number: string };
export type Go = (page: BvaPage, prefill?: Prefill) => void;
/** House types in the valuation form, in form order. Drives the 3D house. */
export const HOUSE_TYPES = ["appartement", "tussenwoning", "hoekwoning", "twee-onder-een-kap", "vrijstaand"] as const;
export type HouseType = (typeof HOUSE_TYPES)[number];
/** How far the house is built: 0 plot, 1 walls, 2 roof, 3 done (lights on). */
export type BuildStage = 0 | 1 | 2 | 3;
