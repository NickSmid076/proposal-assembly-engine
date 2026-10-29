"use client";
// Concept homepage. The team photo, headline, listings, ratings and team facts are RVL's own
// (see content/leads/rvl-831843/proposal.ts). The hero photo carries a blurred preview from the build,
// so the first screen is never grey while the full photo loads.
import Image from "next/image";
import { useId, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { useLang, useT } from "@/lib/lang";
import { c } from "./copy";
import { Chat, Pin, RvlLogo } from "./icons";
import ListingCard from "./ListingCard";
import type { Go, RvlFirm } from "./types";

function Hero({ firm, go }: { firm: RvlFirm; go: Go }) {
  const t = useT();
  const { lang } = useLang();
  const id = useId();
  const [a, b, c2] = firm.headline[lang];

  function start(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    go("waardebepaling", { postcode: String(d.get("postcode") ?? ""), number: String(d.get("number") ?? "") });
  }

  return (
    <section className="rvl-hero" aria-labelledby={`${id}-h`}>
      <div className="rvl-hero-photo">
        <Image src={firm.images.team} alt={t(c.hero.photoAlt)} fill priority placeholder="blur"
          sizes="100vw" style={{ objectPosition: "50% 30%" }} />
      </div>
      <div className="rvl-hero-in">
        <p className="rvl-kicker"><RvlLogo mark />{t(c.hero.kicker)}</p>
        <h1 id={`${id}-h`} className="rvl-h1 rvl-hero-h">{a} <em>{b}</em><br />{c2}</h1>
        <p className="rvl-lead">{t(c.hero.lead)}</p>
        <form className="rvl-start" onSubmit={start} aria-label={t(c.cta)}>
          <div>
            <label htmlFor={`${id}-pc`} className="sr-only">{t(c.hero.postcode)}</label>
            <input id={`${id}-pc`} name="postcode" className="rvl-input" placeholder={t(c.hero.postcode)} autoComplete="postal-code" />
          </div>
          <div>
            <label htmlFor={`${id}-nr`} className="sr-only">{t(c.hero.number)}</label>
            <input id={`${id}-nr`} name="number" className="rvl-input" placeholder={t(c.hero.number)} />
          </div>
          <button type="submit" className="rvl-btn">{t(c.cta)} <ArrowRight /></button>
        </form>
        <a className="rvl-hero-wa" href={firm.whatsappHref}><Chat />{t(c.hero.whatsapp)} · {firm.whatsapp}</a>
      </div>
    </section>
  );
}

function Trust({ firm }: { firm: RvlFirm }) {
  const t = useT();
  const items: [string, string][] = [
    [firm.ratings.google, t(c.trust.google)(firm.ratings.googleCount)],
    [firm.ratings.funda, t(c.trust.funda)],
    [firm.sold, t(c.trust.sold)],
    ["30+", t(c.trust.since)],
  ];
  return (
    <div className="rvl-trust" role="group" aria-label={t(c.trust.label)}>
      <div className="rvl-wrap rvl-trust-in">
        {items.map(([v, l]) => <div key={l} data-r><span className="rvl-num">{v}</span><p>{l}</p></div>)}
      </div>
    </div>
  );
}

export default function RvlHome({ firm, go }: { firm: RvlFirm; go: Go }) {
  const t = useT();
  const steps = t(c.steps.items);
  return (
    <>
      <Hero firm={firm} go={go} />
      <Trust firm={firm} />

      <section className="rvl-sec" aria-labelledby="rvl-aanbod-h">
        <div className="rvl-wrap">
          <div className="rvl-sec-head">
            <h2 id="rvl-aanbod-h" className="rvl-h2" data-r>{t(c.listings.title)}</h2>
            <button type="button" className="rvl-link" onClick={() => go("aanbod")}>{t(c.listings.all)} <ArrowRight /></button>
          </div>
          <div className="rvl-rail" role="list" aria-label={t(c.listings.scroll)}>
            {firm.listings.slice(0, 4).map((l) => <div key={l.street} role="listitem" data-r><ListingCard l={l} onOpen={() => go("aanbod")} /></div>)}
          </div>
          <p className="rvl-note"><span className="rvl-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>

      <section className="rvl-sec rvl-ink" aria-labelledby="rvl-steps-h">
        <div className="rvl-wrap">
          <div className="rvl-sec-head">
            <h2 id="rvl-steps-h" className="rvl-h2" data-r>{t(c.steps.title)}</h2>
            <span className="rvl-pill" data-r>{t(c.steps.nocure)}</span>
          </div>
          <ol className="rvl-steplist">
            {steps.map(([title, body], n) => (
              <li key={title} data-r>
                <span className="rvl-step-n">{n + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                {n === 0 && <button type="button" className="rvl-btn rvl-btn-sm" onClick={() => go("waardebepaling")}>{t(c.cta)} <ArrowRight /></button>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rvl-sec" aria-labelledby="rvl-rev-h">
        <div className="rvl-wrap rvl-reviews">
          <div data-r>
            <h2 id="rvl-rev-h" className="rvl-h2">{t(c.reviews.title)}</h2>
            <p className="rvl-score"><span className="rvl-num">{firm.ratings.google}</span><span className="rvl-stars" aria-hidden>★★★★★</span></p>
            <p className="rvl-muted">{t(c.trust.google)(firm.ratings.googleCount)} · {firm.ratings.funda} {t(c.trust.funda)}</p>
          </div>
          <ul className="rvl-review-slots">
            {Array.from({ length: firm.placeholder.reviewSlots }, (_, i) => (
              <li key={i} data-r>
                <span className="rvl-stars" aria-hidden>★★★★★</span>
                <p>{t(c.reviews.slot)}</p>
                <span className="rvl-tag">{t(c.example)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rvl-sec rvl-stone" aria-labelledby="rvl-off-h">
        <div className="rvl-wrap rvl-offices">
          <div className="rvl-offices-photo" data-r>
            <Image src={firm.images.utrecht} alt={t(c.offices.photoAlt)} fill sizes="(min-width: 1100px) 560px, 100vw" />
          </div>
          <div className="rvl-offices-copy">
            <h2 id="rvl-off-h" className="rvl-h2" data-r>{t(c.offices.title)}</h2>
            <p className="rvl-lead" data-r>{t(c.offices.lead)}</p>
            <ul className="rvl-office-list">
              {firm.offices.map((o) => (
                <li key={o.id} data-r>
                  <Pin />
                  <div><b>{t(c.footer.office)(o.name)}</b><span>{o.street}, {o.postcode} {o.town}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rvl-sec" aria-labelledby="rvl-team-h">
        <div className="rvl-wrap rvl-team">
          <div className="rvl-team-copy" data-r>
            <h2 id="rvl-team-h" className="rvl-h2">{t(c.team.title)}</h2>
            <p className="rvl-lead">{t(c.team.lead)(firm.founded)}</p>
            <p className="rvl-muted" style={{ fontSize: 14 }}>{t(c.team.kwf)}</p>
          </div>
          <ul className="rvl-team-list">
            {firm.team.map((p) => (
              <li key={p.name} data-r><b>{p.name}</b><span>{t(p.role)}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
