"use client";
// Concept "Aanbod" page: the homes from the rvlmakelaars.nl homepage, filtered by price band.
import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import ListingCard from "./ListingCard";
import type { Go, RvlFirm } from "./types";

// Price bands, in the order of c.aanbod.bands.
const BANDS: [number, number][] = [[0, Infinity], [0, 500000], [500000, 800000], [800000, Infinity]];

export default function RvlAanbod({ firm, go }: { firm: RvlFirm; go: Go }) {
  const t = useT();
  const [band, setBand] = useState(0);
  const [lo, hi] = BANDS[band];
  // Bands are half-open: from `lo` up to, not including, `hi`.
  const shown = firm.listings.filter((l) => l.price >= lo && l.price < hi);
  return (
    <>
      <section className="rvl-band" aria-labelledby="rvl-ab-h">
        <div className="rvl-wrap">
          <nav className="rvl-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span><span aria-current="page">{t(c.aanbod.title)}</span>
          </nav>
          <h1 id="rvl-ab-h" className="rvl-h1">{t(c.aanbod.title)}</h1>
          <p className="rvl-lead">{t(c.aanbod.lead)}</p>
          <div className="rvl-chips" role="group" aria-label={t(c.aanbod.filters)}>
            {t(c.aanbod.bands).map((label, i) => (
              <button key={label} type="button" className="rvl-chip" aria-pressed={band === i} onClick={() => setBand(i)}>{label}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="rvl-sec" style={{ paddingTop: 32 }} aria-label={t(c.aanbod.title)}>
        <div className="rvl-wrap">
          <p className="rvl-count" aria-live="polite">{t(c.aanbod.count)(shown.length)}</p>
          <div className="rvl-cards">
            {shown.map((l, n) => <div key={l.street} data-r><ListingCard l={l} priority={n < 2} /></div>)}
            <div className="rvl-alert" data-r>
              <h2 className="rvl-h3">{t(c.aanbod.alert)}</h2>
              <p>{t(c.aanbod.alertBody)}</p>
              <span className="rvl-btn rvl-btn-sm" style={{ marginTop: 8, justifySelf: "start" }}>{t(c.aanbod.alertCta)} <ArrowRight /></span>
            </div>
          </div>
          <p className="rvl-note"><span className="rvl-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>
    </>
  );
}
