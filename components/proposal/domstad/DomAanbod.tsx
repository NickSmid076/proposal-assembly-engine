"use client";
// Concept "Aanbod" page: the homes that were on domstadmakelaars.nl/woningen, with working filters.
import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import ListingCard from "./ListingCard";
import type { DomFirm, Go } from "./types";

type Filter = "all" | "open" | "taken";

export default function DomAanbod({ firm, go }: { firm: DomFirm; go: Go }) {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");
  const shown = firm.listings.filter((l) => filter === "all" || (filter === "open") === (l.status === "beschikbaar"));
  const chips: [Filter, string][] = [["all", t(c.aanbod.all)], ["open", t(c.aanbod.available)], ["taken", t(c.aanbod.taken)]];
  return (
    <>
      <section className="dom-band" aria-labelledby="dom-ab-h">
        <div className="dom-wrap">
          <nav className="dom-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span><span aria-current="page">{t(c.aanbod.title)}</span>
          </nav>
          <h1 id="dom-ab-h" className="dom-h1">{t(c.aanbod.title)}</h1>
          <p className="dom-lead">{t(c.aanbod.lead)}</p>
          <div className="dom-chips" role="group" aria-label={t(c.aanbod.filters)}>
            {chips.map(([id, label]) => (
              <button key={id} type="button" className="dom-chip" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="dom-sec" style={{ paddingTop: 32 }} aria-label={t(c.aanbod.title)}>
        <div className="dom-wrap">
          <p className="dom-count" aria-live="polite">{t(c.aanbod.count)(shown.length)}</p>
          <div className="dom-cards">
            {shown.map((l, n) => <div key={l.street} data-r><ListingCard l={l} priority={n < 2} /></div>)}
            <div className="dom-alert" data-r>
              <h2 className="dom-h3" style={{ fontSize: 22 }}>{t(c.aanbod.alert)}</h2>
              <p>{t(c.aanbod.alertBody)}</p>
              <span className="dom-btn dom-btn-sm dom-btn-light" style={{ marginTop: 8, justifySelf: "start" }}>{t(c.aanbod.alertCta)} <ArrowRight /></span>
            </div>
          </div>
          <p className="dom-note"><span className="dom-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>
    </>
  );
}
