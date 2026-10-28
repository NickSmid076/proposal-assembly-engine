// Shared model of the house on the valuation page: which buildings each house type shows, their sizes,
// and the roof outline taken from BVA's logo. Used by the 3D scene and the flat SVG fallback.
import { ROOF_POINTS } from "./icons";
import type { HouseType } from "./types";

/** One building in the scene: a house, or the apartment block. Units are scene units (metres-ish). */
export type Unit = { x: number; w: number; floors: number; lit: boolean; bays: number };
export const DEPTH = 1.5;
export const FLOOR = 0.82;

export function layout(type: HouseType): Unit[] {
  const h = (x: number, lit: boolean): Unit => ({ x, w: 1.3, floors: 2, lit, bays: 2 });
  switch (type) {
    case "vrijstaand": return [{ x: 0, w: 1.7, floors: 2, lit: true, bays: 3 }];
    case "twee-onder-een-kap": return [h(-0.65, true), h(0.65, false)];
    case "tussenwoning": return [h(-1.3, false), h(0, true), h(1.3, false)];
    case "hoekwoning": return [h(-1.3, true), h(0, false), h(1.3, false)];
    case "appartement": return [{ x: 0, w: 2.6, floors: 4, lit: true, bays: 3 }];
  }
}

/** The logo roof outline as [x, y] in units of roof width, centred on x = 0, base at y = 0, y up. */
export function roofOutline(): [number, number][] {
  const pts = ROOF_POINTS.split(" ").map((p) => p.split(",").map(Number));
  const minX = Math.min(...pts.map((p) => p[0])), maxX = Math.max(...pts.map((p) => p[0]));
  const maxY = Math.max(...pts.map((p) => p[1]));
  const w = maxX - minX, cx = (minX + maxX) / 2;
  return pts.map(([x, y]) => [(x - cx) / w, (maxY - y) / w]);
}
/** Roof height for a building of width w: the logo's own proportion, capped so wide blocks stay low. */
export const roofHeight = (w: number) => Math.min(w * 0.87 * 0.78, 1.05);

/** Which apartment in the block is "yours": middle bay, second floor. */
export const LIT_FLAT = { bay: 1, floor: 1 };
