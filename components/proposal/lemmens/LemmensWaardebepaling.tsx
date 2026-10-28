"use client";
// Concept "Gratis waardebepaling" page: the form sits on the page itself.
// The three points paraphrase the current text on lemmens.nl/gratis-waardebepaling.
import Image from "next/image";
import { Check } from "@/components/icons";
import { useLang, useT } from "@/lib/lang";
import { c } from "./copy";
import LemmensForm from "./LemmensForm";
import type { Go, LemmensFirm, Prefill } from "./types";

export default function LemmensWaardebepaling({ firm, go, prefill }: { firm: LemmensFirm; go: Go; prefill?: Prefill }) {
  const t = useT();
  const { lang } = useLang();
  return (
    <>
      <section className="lm-wb-hero" aria-labelledby="lm-wb-h">
        <Image src={firm.images.straat} alt="" fill priority sizes="100vw" />
        <div className="lm-wrap">
          <nav className="lm-crumb" aria-label="Breadcrumb">
            <button type="button" onClick={() => go("home")}>Home</button><span aria-hidden>/</span><span aria-current="page">{t(c.wb.crumb)}</span>
          </nav>
          <h1 id="lm-wb-h" className="lm-h1" style={{ maxWidth: "14ch" }}>{t(c.wb.title)}</h1>
          <p className="lm-lead">{t(c.wb.lead)}</p>
        </div>
      </section>

      <div className="lm-wrap lm-wb">
        <div className="lm-wb-form"><LemmensForm owner={firm.owner} prefill={prefill} /></div>
        <aside className="lm-side">
          <ul className="lm-points">
            {t(c.wb.points).map((p) => <li key={p} data-r><span className="ic"><Check /></span>{p}</li>)}
          </ul>
          <div className="lm-callbox" data-r>
            <p className="lm-muted" style={{ fontSize: 14 }}>{t(c.wb.call)}</p>
            <a href={firm.phoneHref}>{firm.phone}</a>
            <p className="lm-muted" style={{ fontSize: 14 }}>{t(c.wb.hours)}</p>
          </div>
          <figure className="lm-side-quote" data-r>
            <blockquote lang={lang}>“{firm.reviews[0][lang]}”</blockquote>
            <figcaption className="lm-muted" style={{ fontSize: 13.5 }}>{t(c.reviews.by)}{lang === "en" && ` · ${t(c.reviews.translated)}`}</figcaption>
          </figure>
        </aside>
      </div>
    </>
  );
}
