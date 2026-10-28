// The Utrecht map behind the valuation page and the "Jouw wijk" block.
// Data: utrechtMap.json, built once by scripts/domstad-map.mjs from CBS Wijken en Buurten 2024 and the
// PDOK Locatieserver. Coordinates are metres around the Domtoren (x east, y north). Nothing is fetched at runtime.
import data from "./utrechtMap.json";

export type Ring = [number, number][];
export type Buurt = { n: string; /** index into WIJKEN, or -1 */ w: number; r: Ring[] };
export type Wijk = { n: string; c: [number, number]; km: number };

export const BUURTEN = data.buurten as Buurt[];
/** The 19 "Makelaar in …" neighbourhoods on domstadmakelaars.nl. */
export const WIJKEN = data.wijken as Wijk[];
const PC4 = data.pc4 as unknown as Record<string, [number, number, number]>;

/** Map extent in metres. */
export const BOUNDS = (() => {
  const pts = BUURTEN.flatMap((b) => b.r.flat());
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
})();

/** Where a postcode lies: its buurt, its wijk (if it is one of the 19), and a point. */
export type Place = { buurt: number; wijk: number; name: string; x: number; y: number; km: number };

/** "3515 ET" → place, or null when the postcode is not on the map (outside Utrecht, Vleuten, De Meern). */
export function locate(postcode: string): Place | null {
  const m = postcode.trim().match(/^(\d{4})/);
  const hit = m && PC4[m[1]];
  if (!hit) return null;
  const [b, x, y] = hit;
  const buurt = BUURTEN[b];
  const wijk = buurt.w;
  return { buurt: b, wijk, name: wijk >= 0 ? WIJKEN[wijk].n : buurt.n, x, y, km: Math.round(Math.hypot(x, y) / 100) / 10 };
}

/** Buurten that light up for a place: the whole wijk if it is one of the 19, else the buurt itself. */
export function litBuurten(place: Place | null): Set<number> {
  if (!place) return new Set();
  if (place.wijk < 0) return new Set([place.buurt]);
  return new Set(BUURTEN.flatMap((b, i) => (b.w === place.wijk ? [i] : [])));
}

/** "1,2 km" in Dutch notation. */
export const km = (v: number) => `${v.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km`;
