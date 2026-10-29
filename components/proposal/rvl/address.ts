// Address lookup for the valuation form, against the public PDOK services of the Dutch government
// (no key, CORS open):
//   1. Locatieserver: postcode + house number (+ letter/addition) → the official address and its BAG id.
//   2. BAG verblijfsobject: living area (m²) and use; 3. BAG pand: build year.
// Steps 2 and 3 are extras: if they fail, the address still counts. Every call times out after 4 s and
// can be aborted, so a slow or offline network falls back to typing the street by hand.
import type { RvlFirm, RvlOffice } from "./types";

export type Address = {
  street: string; number: string; postcode: string; town: string;
  /** "Schildersbuurt" (CBS buurt), when known. */
  buurt?: string;
  /** From the BAG, when known. */
  area?: number; year?: number; residential?: boolean;
};

const LS = "https://api.pdok.nl/bzk/locatieserver/search/v3_1/free";
const BAG = "https://api.pdok.nl/kadaster/bag/ogc/v2/collections";

export const normPostcode = (v: string) => v.replace(/\s+/g, "").toUpperCase();
export const validPostcode = (v: string) => /^\d{4}[A-Z]{2}$/.test(normPostcode(v));
/** "3583EN" → "3583 EN". */
export const showPostcode = (v: string) => normPostcode(v).replace(/^(\d{4})([A-Z]{2})$/, "$1 $2");

async function get<T>(url: string, signal: AbortSignal): Promise<T> {
  const timeout = AbortSignal.timeout(4000);
  const res = await fetch(url, { signal: AbortSignal.any([signal, timeout]) });
  if (!res.ok) throw new Error(String(res.status));
  return res.json() as Promise<T>;
}

type LsDoc = {
  straatnaam: string; huisnummer: number; huisletter?: string; huisnummertoevoeging?: string;
  postcode: string; woonplaatsnaam: string; buurtnaam?: string; adresseerbaarobject_id?: string;
};

/**
 * Looks up one address. `number` may carry a letter or addition ("24 BS", "53A", "16-2").
 * Returns null when the address does not exist; throws when the service cannot be reached.
 */
export async function lookup(postcode: string, number: string, signal: AbortSignal): Promise<Address | null> {
  const m = number.trim().match(/^(\d+)\s*[-\s]?\s*([a-zA-Z0-9]*)$/);
  if (!validPostcode(postcode) || !m) return null;
  const [, nr, extra] = m;
  const q = new URLSearchParams({ fq: "type:adres", rows: "10", fl: "straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,buurtnaam,adresseerbaarobject_id" });
  const url = `${LS}?${q}&fq=postcode:${normPostcode(postcode)}&fq=huisnummer:${nr}`;
  const docs = (await get<{ response: { docs: LsDoc[] } }>(url, signal)).response.docs;
  if (!docs.length) return null;
  const want = extra.toUpperCase();
  const suffix = (d: LsDoc) => `${d.huisletter ?? ""}${d.huisnummertoevoeging ?? ""}`.toUpperCase();
  const doc = docs.find((d) => suffix(d) === want) ?? docs.find((d) => suffix(d) === "") ?? docs[0];
  const sfx = [doc.huisletter, doc.huisnummertoevoeging].filter(Boolean).join(" ");
  const address: Address = {
    street: doc.straatnaam, number: `${doc.huisnummer}${sfx ? ` ${sfx}` : ""}`,
    postcode: showPostcode(doc.postcode), town: doc.woonplaatsnaam, buurt: doc.buurtnaam,
  };
  if (!doc.adresseerbaarobject_id) return address;
  try {
    type Vbo = { features: { properties: { oppervlakte?: number; gebruiksdoel?: string; "pand.href"?: string[] } }[] };
    const vbo = (await get<Vbo>(`${BAG}/verblijfsobject/items?f=json&limit=1&identificatie=${doc.adresseerbaarobject_id}`, signal)).features[0]?.properties;
    if (vbo) {
      address.area = vbo.oppervlakte;
      address.residential = vbo.gebruiksdoel?.includes("woonfunctie");
      const pand = vbo["pand.href"]?.[0];
      if (pand) {
        const p = await get<{ properties: { bouwjaar?: number } }>(`${pand}${pand.includes("?") ? "&" : "?"}f=json`, signal);
        address.year = p.properties.bouwjaar;
      }
    }
  } catch (e) {
    if (signal.aborted) throw e;
    // The BAG extras are optional: keep the address without them.
  }
  return address;
}

/** Which office handles a postcode: Leidsche Rijn and Vleuten-De Meern go to Saffraanweg, the rest to Prins Hendriklaan. */
export function officeFor(firm: RvlFirm, postcode: string): RvlOffice {
  const pc4 = normPostcode(postcode).slice(0, 4);
  return firm.offices[firm.leidscheRijnPc4.includes(pc4) ? 1 : 0];
}

/** Whether a postcode lies in the municipality of Utrecht (35xx) or Vleuten-De Meern (345x). */
export const inUtrecht = (postcode: string) => /^(35\d\d|345\d)/.test(normPostcode(postcode));
