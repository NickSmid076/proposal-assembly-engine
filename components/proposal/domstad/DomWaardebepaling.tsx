"use client";
// Concept valuation page under "Verkopen": the form sits next to a map of Utrecht that follows it.
// The postcode lights up the wijk as soon as it is complete, with the distance to the Dom.
import { useCallback, useMemo, useState } from "react";
import { Check } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import DomForm, { type Report } from "./DomForm";
import DomMap from "./DomMap";
import { km, locate } from "./mapModel";
import { Phone } from "./icons";
import type { DomFirm, Go, MapStage, Prefill } from "./types";

export default function DomWaardebepaling({ firm, go, prefill, still }: { firm: DomFirm; go: Go; prefill?: Prefill; still: boolean }) {
  const t = useT();
  const [report, setReport] = useState<Report>({ step: 0, sent: false, postcode: "", type: "appartement" });
  const onReport = useCallback((r: Report) => setReport(r), []);
  const place = useMemo(() => locate(report.postcode), [report.postcode]);
  const stage: MapStage = report.sent ? 3 : report.step >= 1 ? 2 : place ? 1 : 0;
  const captions = t(c.wb.map.captions);
  const outside = report.postcode !== "" && !place;

  return (
    <>
      <section className="dom-band" aria-labelledby="dom-wb-h">
        <div className="dom-wrap">
          <nav className="dom-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span>
            <span>{t(c.wb.crumb)}</span><span aria-hidden>/</span><span aria-current="page">{t(c.cta)}</span>
          </nav>
          <h1 id="dom-wb-h" className="dom-h1">{t(c.wb.title)}</h1>
          <p className="dom-lead">{t(c.wb.lead)}</p>
        </div>
      </section>

      <div className="dom-wrap dom-wb">
        <div className="dom-wb-visual">
          <div className="dom-stage">
            <DomMap stage={place ? stage : 0} place={place} still={still} label={t(c.wb.map.label)} />
            <div className="dom-stage-cap" aria-live="polite">
              {place ? (
                <>
                  <span className="dom-stage-k">{captions[stage]}</span>
                  <b>{place.name}</b>
                  <span className="dom-num">{km(place.km)} {t(c.wb.map.fromDom)}</span>
                </>
              ) : (
                <>
                  <span className="dom-stage-k">{captions[0]}</span>
                  <b>{outside ? t(c.wb.map.outside) : t(c.wb.map.start)}</b>
                </>
              )}
            </div>
          </div>
          <ul className="dom-points">
            {t(c.wb.points).map((p) => <li key={p}><span className="ic"><Check /></span>{p}</li>)}
          </ul>
        </div>
        <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
          <DomForm owner={firm.ownerFirst} prefill={prefill} onReport={onReport} />
          <div className="dom-callbox">
            <p className="dom-muted" style={{ fontSize: 14 }}>{t(c.wb.call)}</p>
            <a href={firm.mobileHref}><Phone />{firm.mobile}</a>
          </div>
        </div>
      </div>
    </>
  );
}
