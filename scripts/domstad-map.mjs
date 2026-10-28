// One-off data build for the Domstad concept map (components/proposal/domstad/utrechtMap.json).
// Usage: node scripts/domstad-map.mjs
//
// Sources (public, no key):
// - Buurt outlines: CBS Wijken en Buurten 2024 via the PDOK WFS, gemeente Utrecht (GM0344).
// - Postcode positions: PDOK Locatieserver. For each 4-digit postcode we sample its 6-digit postcodes
//   and keep the average position and the buurt most of them fall in.
// Output is in metres around the Dom tower (x east, y north), simplified, rounded to 5 m.
// The concept itself makes no network requests: it only reads the JSON this script writes.
import { writeFileSync } from "node:fs";

const DOM = { lat: 52.09074, lon: 5.12142 }; // Domtoren
const KX = Math.cos((DOM.lat * Math.PI) / 180) * 111320;
const KY = 110574;
const project = ([lon, lat]) => [(lon - DOM.lon) * KX, (lat - DOM.lat) * KY];
const round = (v) => Math.round(v / 5) * 5;

// The 19 "Makelaar in …" pages on domstadmakelaars.nl, with the CBS buurten each one covers.
const WIJKEN = [
  ["Wittevrouwen en Zeeheldenbuurt", ["Wittevrouwen", "Zeeheldenbuurt, Hengeveldstraat en omgeving"]],
  ["Buiten Wittevrouwen", ["Buiten Wittevrouwen"]],
  ["Wilhelminapark", ["Wilhelminapark en omgeving"]],
  ["Rijnsweerd", ["Rijnsweerd"]],
  ["Tuindorp", ["Tuindorp-Oost", "Tuindorp en Van Lieflandlaan-West"]],
  ["Voordorp en Veemarkt", ["Voordorp en Voorveldsepolder"]],
  ["Overvecht", ["Vechtzoom-noord, Klopvaart", "Vechtzoom-zuid", "Tigrisdreef en omgeving", "Taag- en Rubicondreef en omgeving", "Zambesidreef en omgeving", "Neckardreef en omgeving", "Wolga- en Donaudreef en omgeving", "Zamenhofdreef en omgeving"]],
  ["Vogelenbuurt en Tuinwijk", ["Vogelenbuurt", "Tuinwijk-Oost", "Tuinwijk-West"]],
  ["Zuilen", ["Zuilen-Noord", "Elinkwijk en omgeving", "Geuzenwijk", "Schaakbuurt en omgeving", "Queeckhovenplein en omgeving", "Prins Bernhardplein en omgeving"]],
  ["Oog in Al", ["Oog in Al"]],
  ["Dichterswijk", ["Dichterswijk"]],
  ["Rivierenwijk", ["Rivierenwijk"]],
  ["Tolsteeg en Rotsoord", ["Tolsteeg en Rotsoord"]],
  ["Hoograven", ["Oud Hoograven-Noord", "Oud Hoograven-Zuid", "Nieuw Hoograven-Noord", "Nieuw Hoograven-Zuid"]],
  ["Lunetten", ["Lunetten-Noord", "Lunetten-Zuid"]],
  ["Kanaleneiland", ["Kanaleneiland-Noord", "Kanaleneiland-Zuid"]],
  ["Leidsche Rijn", ["Leidsche Rijn-Centrum", "Terwijde-Oost", "Terwijde-West", "Parkwijk-Noord", "Parkwijk-Zuid", "Langerak", "Het Zand-Oost", "Het Zand-West", "Grauwaart"]],
  ["De Meern", ["De Meern-Noord", "De Meern-Zuid"]],
  ["Vleuten", ["Vleuten", "Vleuterweide-Noord/Oost/Centrum", "Vleuterweide-West", "Vleuterweide-Zuid"]],
];

// Douglas-Peucker on one ring.
function simplify(pts, tol) {
  if (pts.length < 4) return pts;
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
    let max = 0, idx = -1;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
// A closed ring starts and ends on the same point, so simplify it as two open halves.
function simplifyRing(ring, tol) {
  const pts = ring.slice(0, -1), mid = Math.floor(pts.length / 2);
  return [...simplify(pts.slice(0, mid + 1), tol).slice(0, -1), ...simplify([...pts.slice(mid), pts[0]], tol).slice(0, -1)];
}
const area = (r) => Math.abs(r.reduce((s, [x, y], i) => { const [x2, y2] = r[(i + 1) % r.length]; return s + x * y2 - x2 * y; }, 0) / 2);
function inside([x, y], ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

// 1. Buurten
const filter = "<Filter><PropertyIsEqualTo><PropertyName>gemeentecode</PropertyName><Literal>GM0344</Literal></PropertyIsEqualTo></Filter>";
const wfs = new URL("https://service.pdok.nl/cbs/wijkenbuurten/2024/wfs/v1_0");
for (const [k, v] of Object.entries({ service: "WFS", version: "2.0.0", request: "GetFeature", typeNames: "wijkenbuurten:buurten", outputFormat: "application/json", srsName: "EPSG:4326", Filter: filter })) wfs.searchParams.set(k, v);
const geo = await (await fetch(wfs)).json();
const wijkOf = new Map(WIJKEN.flatMap(([, list], i) => list.map((b) => [b, i])));

const buurten = geo.features.map((f) => {
  const name = f.properties.buurtnaam;
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  // Outer rings only, projected and simplified; drop slivers under 2 ha.
  const rings = polys
    .map((p) => simplifyRing(p[0].map(project), 22).map(([x, y]) => [round(x), round(y)]))
    .filter((r) => r.length >= 4 && area(r) > 20000)
    .sort((a, b) => area(b) - area(a));
  return { n: name, w: wijkOf.has(name) ? wijkOf.get(name) : -1, r: rings };
}).filter((b) => b.r.length);

const missing = [...wijkOf.keys()].filter((n) => !buurten.some((b) => b.n === n));
if (missing.length) throw new Error(`Buurten not found: ${missing.join(", ")}`);

const findBuurt = (pt) => buurten.findIndex((b) => b.r.some((r) => inside(pt, r)));

// 2. Postcodes (4 digits) for Utrecht, Vleuten and De Meern.
const codes = [];
for (let p = 3511; p <= 3585; p++) codes.push(p);
for (let p = 3451; p <= 3455; p++) codes.push(p);
const pc4 = {};
for (const code of codes) {
  const u = `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=postcode:${code}*&fq=type:postcode&rows=100&fl=centroide_ll`;
  const docs = (await (await fetch(u)).json()).response?.docs ?? [];
  if (!docs.length) continue;
  const pts = docs.map((d) => project(d.centroide_ll.match(/POINT\(([\d.]+) ([\d.]+)\)/).slice(1).map(Number)));
  const votes = new Map();
  for (const pt of pts) { const b = findBuurt(pt); if (b >= 0) votes.set(b, (votes.get(b) ?? 0) + 1); }
  if (!votes.size) continue;
  const b = [...votes].sort((a, c) => c[1] - a[1])[0][0];
  const own = pts.filter((pt) => findBuurt(pt) === b);
  const x = own.reduce((s, p) => s + p[0], 0) / own.length, y = own.reduce((s, p) => s + p[1], 0) / own.length;
  pc4[code] = [b, round(x), round(y)];
  await new Promise((r) => setTimeout(r, 60)); // be polite to the public API
}

// 3. Wijk label points: area-weighted centre of their buurten, and distance to the Dom.
const wijken = WIJKEN.map(([name], i) => {
  let sx = 0, sy = 0, sa = 0;
  for (const b of buurten) if (b.w === i) for (const r of b.r) {
    const a = area(r); sa += a;
    sx += (r.reduce((s, p) => s + p[0], 0) / r.length) * a; sy += (r.reduce((s, p) => s + p[1], 0) / r.length) * a;
  }
  const c = [round(sx / sa), round(sy / sa)];
  return { n: name, c, km: Math.round(Math.hypot(...c) / 100) / 10 };
});

const out = { source: "CBS Wijken en Buurten 2024 (PDOK), PDOK Locatieserver", dom: [DOM.lat, DOM.lon], wijken, buurten, pc4 };
const json = JSON.stringify(out);
writeFileSync(new URL("../components/proposal/domstad/utrechtMap.json", import.meta.url), json);
console.log(`buurten ${buurten.length}, wijken ${wijken.length}, pc4 ${Object.keys(pc4).length}/${codes.length}, ${(json.length / 1024).toFixed(1)} KB`);
console.log(wijken.map((w) => `${w.n} ${w.km} km`).join("; "));
