"use client";
// Concept valuation page: the four-step form next to the home card that fills as the visitor answers.
// The office is chosen from the postcode (Leidsche Rijn / Vleuten-De Meern → Saffraanweg, else Prins Hendriklaan).
import { useCallback, useState } from "react";
import { useT } from "@/lib/lang";
import { officeFor } from "./address";
import { c } from "./copy";
import HomeCard from "./HomeCard";
import RvlForm, { type Report } from "./RvlForm";
import { Chat, Phone } from "./icons";
import type { Go, Prefill, RvlFirm } from "./types";

const EMPTY: Report = {
  step: 0, sent: false, lookup: "idle", address: null, photos: [],
  values: { postcode: "", number: "", street: "", town: "", type: "", area: "", rooms: "", when: "", reply: "", name: "", phone: "", email: "" },
};

export default function RvlWaardebepaling({ firm, go, prefill }: { firm: RvlFirm; go: Go; prefill?: Prefill }) {
  const t = useT();
  const [report, setReport] = useState<Report>(EMPTY);
  const onReport = useCallback((r: Report) => setReport(r), []);
  const office = officeFor(firm, report.address?.postcode ?? report.values.postcode);

  return (
    <>
      <section className="rvl-band" aria-labelledby="rvl-wb-h">
        <div className="rvl-wrap">
          <nav className="rvl-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span>
            <span>{t(c.wb.crumb)}</span><span aria-hidden>/</span><span aria-current="page">{t(c.cta)}</span>
          </nav>
          <h1 id="rvl-wb-h" className="rvl-h1">{t(c.wb.title)}</h1>
          <p className="rvl-lead">{t(c.wb.lead)}</p>
        </div>
      </section>

      <div className="rvl-wrap rvl-wb">
        <div className="rvl-wb-card">
          <HomeCard report={report} office={office} />
        </div>
        <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
          <RvlForm prefill={prefill} office={office.name} onReport={onReport} />
          <div className="rvl-callbox">
            <p>{t(c.wb.call)}</p>
            <div>
              <a href={firm.phoneHref}><Phone />{firm.phone}</a>
              <a href={firm.whatsappHref}><Chat />{t(c.bar.whatsapp)}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
