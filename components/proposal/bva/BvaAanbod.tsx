"use client";
// Concept "Aanbod" page: six listings that were live on bvamakelaardij.nl, with working filters.
import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import ListingCard from "./ListingCard";
import type { BvaFirm, Go } from "./types";

type Filter = "all" | "open" | "taken";

export default function BvaAanbod({ firm, go }: { firm: BvaFirm; go: Go }) {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");
  const isOpen = (s: string) => s === "beschikbaar" || s === "nieuw";
  const shown = firm.listings.filter((l) => filter === "all" || (filter === "open") === isOpen(l.status));
  const chips: [Filter, string][] = [["all", t(c.aanbod.all)], ["open", t(c.aanbod.available)], ["taken", t(c.aanbod.taken)]];
  return (
    <>
      <section className="bva-band" aria-labelledby="bva-ab-h">
        <div className="bva-wrap">
          <nav className="bva-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span><span aria-current="page">{t(c.aanbod.title)}</span>
          </nav>
          <h1 id="bva-ab-h" className="bva-h1">{t(c.aanbod.title)}</h1>
          <p className="bva-lead">{t(c.aanbod.lead)}</p>
          <div className="bva-chips" role="group" aria-label={t(c.aanbod.filters)}>
            {chips.map(([id, label]) => (
              <button key={id} type="button" className="bva-chip" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="bva-sec" style={{ paddingTop: 32 }} aria-label={t(c.aanbod.title)}>
        <div className="bva-wrap">
          <p className="bva-count" aria-live="polite">{t(c.aanbod.count)(shown.length)}</p>
          <div className="bva-cards">
            {shown.map((l, n) => <div key={l.street} data-r><ListingCard l={l} priority={n < 2} /></div>)}
            <div className="bva-alert" data-r>
              <h2 className="bva-h3" style={{ fontSize: 22 }}>{t(c.aanbod.alert)}</h2>
              <p>{t(c.aanbod.alertBody)}</p>
              <span className="bva-btn bva-btn-sm bva-btn-light" style={{ marginTop: 8, justifySelf: "start" }}>{t(c.aanbod.alertCta)} <ArrowRight /></span>
            </div>
          </div>
          <p className="bva-note"><span className="bva-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>
    </>
  );
}
