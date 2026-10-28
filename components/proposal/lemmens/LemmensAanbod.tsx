"use client";
// Concept "Aanbod" page: the five listings that were live on lemmens.nl, with working filters.
import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import ListingCard from "./ListingCard";
import type { Go, LemmensFirm } from "./types";

type Filter = "all" | "wonen" | "bedrijf";

export default function LemmensAanbod({ firm, go }: { firm: LemmensFirm; go: Go }) {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("all");
  const shown = firm.listings.filter((l) => filter === "all" || l.kind === filter);
  const chips: [Filter, string][] = [["all", t(c.aanbod.all)], ["wonen", t(c.aanbod.wonen)], ["bedrijf", t(c.aanbod.bedrijf)]];
  return (
    <>
      <section className="lm-band" aria-labelledby="lm-ab-h">
        <div className="lm-wrap">
          <nav className="lm-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span><span aria-current="page">{t(c.aanbod.title)}</span>
          </nav>
          <h1 id="lm-ab-h" className="lm-h1">{t(c.aanbod.title)}</h1>
          <p className="lm-lead">{t(c.aanbod.lead)}</p>
          <div className="lm-chips" role="group" aria-label={t(c.aanbod.filters)}>
            {chips.map(([id, label]) => (
              <button key={id} type="button" className="lm-chip" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="lm-sec" style={{ paddingTop: 32 }} aria-label={t(c.aanbod.title)}>
        <div className="lm-wrap">
          <p className="lm-count" aria-live="polite">{t(c.aanbod.count)(shown.length)}</p>
          <div className="lm-cards">
            {shown.map((l, n) => <div key={l.street} data-r><ListingCard l={l} priority={n < 2} /></div>)}
            <div className="lm-alert" data-r>
              <h2 className="lm-h3" style={{ fontSize: 22 }}>{t(c.aanbod.alert)}</h2>
              <p>{t(c.aanbod.alertBody)}</p>
              <span className="lm-btn lm-btn-sm lm-btn-light" style={{ marginTop: 8, justifySelf: "start" }}>{t(c.aanbod.alertCta)} <ArrowRight /></span>
              <span className="lm-tag" style={{ justifySelf: "start", color: "#fff" }}>{t(c.example)}</span>
            </div>
          </div>
          <p className="lm-note"><span className="lm-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>
    </>
  );
}
