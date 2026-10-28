"use client";
// Concept valuation page under "Woning verkopen": the form sits on the page, next to a house that is built
// as the visitor fills it in. The three points paraphrase the current text on bvamakelaardij.nl/woning-verkopen.
import { useCallback, useState } from "react";
import { Check } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import BvaForm, { type Build } from "./BvaForm";
import BvaHouse from "./BvaHouse";
import type { BvaFirm, Go, Prefill } from "./types";

export default function BvaWaardebepaling({ firm, go, prefill, still }: { firm: BvaFirm; go: Go; prefill?: Prefill; still: boolean }) {
  const t = useT();
  const [build, setBuild] = useState<Build>({ stage: 0, type: "appartement" });
  const onBuild = useCallback((b: Build) => setBuild(b), []);
  const captions = t(c.wb.stage.captions);
  const types = t(c.form.types);
  const typeLabel = types[["appartement", "tussenwoning", "hoekwoning", "twee-onder-een-kap", "vrijstaand"].indexOf(build.type)];
  return (
    <>
      <section className="bva-band" aria-labelledby="bva-wb-h">
        <div className="bva-wrap">
          <nav className="bva-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span>
            <span>{t(c.wb.crumb)}</span><span aria-hidden>/</span><span aria-current="page">{t(c.cta)}</span>
          </nav>
          <h1 id="bva-wb-h" className="bva-h1">{t(c.wb.title)}</h1>
          <p className="bva-lead">{t(c.wb.lead)}</p>
        </div>
      </section>

      <div className="bva-wrap bva-wb">
        <div className="bva-wb-visual">
          <div className="bva-stage">
            <BvaHouse stage={build.stage} type={build.type} still={still} label={t(c.wb.stage.label)} />
            <div className="bva-stage-cap" aria-live="polite">
              <b>{captions[build.stage]}</b>
              {build.stage >= 1 && <span>{typeLabel}</span>}
            </div>
          </div>
          <ul className="bva-points">
            {t(c.wb.points).map((p) => <li key={p}><span className="ic"><Check /></span>{p}</li>)}
          </ul>
        </div>
        <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
          <BvaForm owner={firm.ownerFirst} prefill={prefill} onBuild={onBuild} />
          <div className="bva-callbox">
            <p className="bva-muted" style={{ fontSize: 14 }}>{t(c.wb.call)}</p>
            <a href={firm.phoneHref}>{firm.phone}</a>
            <p className="bva-muted" style={{ fontSize: 14 }}>{t(c.footer.hoursBody)[1]}</p>
          </div>
        </div>
      </div>
    </>
  );
}
