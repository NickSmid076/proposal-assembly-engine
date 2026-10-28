"use client";
// Concept homepage. Photos, listings, sold addresses and the quote are Domstad's own
// (see content/leads/domstad-897791/proposal.ts).
import Image from "next/image";
import { useId, useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { useLang, useT } from "@/lib/lang";
import { c } from "./copy";
import { DomLogo, Phone } from "./icons";
import ListingCard from "./ListingCard";
import { MapSvg } from "./DomMap";
import { WIJKEN, km, locate } from "./mapModel";
import type { DomFirm, Go } from "./types";

function Hero({ firm, go }: { firm: DomFirm; go: Go }) {
  const t = useT();
  const id = useId();

  function start(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    go("waardebepaling", { postcode: String(d.get("postcode") ?? ""), number: String(d.get("number") ?? "") });
  }

  return (
    <section className="dom-hero" aria-labelledby={`${id}-h`}>
      <div className="dom-hero-in">
        <div className="dom-hero-copy">
          <p className="dom-kicker"><DomLogo mark />{t(c.hero.kicker)}</p>
          <h1 id={`${id}-h`} className="dom-h1">{t(c.hero.title)}</h1>
          <p className="dom-lead">{t(c.hero.lead)(firm.ownerFirst)}</p>
          <form className="dom-start" onSubmit={start} aria-labelledby={`${id}-check`}>
            <h2 id={`${id}-check`}>{t(c.hero.checkTitle)}</h2>
            <div className="dom-start-row">
              <div>
                <label htmlFor={`${id}-pc`} className="sr-only">{t(c.hero.postcode)}</label>
                <input id={`${id}-pc`} name="postcode" className="dom-input" placeholder={t(c.hero.postcode)} autoComplete="postal-code" />
              </div>
              <div>
                <label htmlFor={`${id}-nr`} className="sr-only">{t(c.hero.number)}</label>
                <input id={`${id}-nr`} name="number" className="dom-input" placeholder={t(c.hero.number)} />
              </div>
              <button type="submit" className="dom-btn">{t(c.cta)} <ArrowRight /></button>
            </div>
          </form>
        </div>
        <div className="dom-hero-photo">
          <Image src={firm.images.team} alt={t(c.hero.photoAlt)} fill priority sizes="(min-width: 1100px) 640px, 100vw" style={{ objectPosition: "58% 40%" }} />
        </div>
      </div>
    </section>
  );
}

function Facts({ firm }: { firm: DomFirm }) {
  const t = useT();
  return (
    <div className="dom-wrap">
      <div className="dom-facts" aria-label={t(c.facts.title)} role="group">
        {t(c.facts.items).map(([value, label]) => (
          <div key={value} data-r><span className="dom-num">{value}</span><p>{label}</p></div>
        ))}
        <div data-r>
          <span className="dom-num">{firm.placeholder.fundaScore} <span className="dom-tag">{t(c.example)}</span></span>
          <p>{t(c.facts.funda)}</p>
        </div>
      </div>
    </div>
  );
}

/** Sold addresses from their own Verkocht page on the map of Utrecht, with the 19 wijken as a legend. */
function Sold({ firm }: { firm: DomFirm }) {
  const t = useT();
  const [hover, setHover] = useState(-1);
  const dots = useMemo(() => {
    const seen = new Map<string, number>();
    return firm.sold.flatMap((a) => {
      const p = locate(a.split(", ")[1] ?? "");
      if (!p) return [];
      // Addresses in the same 4-digit postcode would sit on one spot: fan them out a little.
      const key = `${p.x},${p.y}`, n = seen.get(key) ?? 0;
      seen.set(key, n + 1);
      const ang = n * 2.4, r = n ? 260 : 0;
      return [[p.x + Math.cos(ang) * r, p.y + Math.sin(ang) * r] as [number, number]];
    });
  }, [firm.sold]);
  const order = useMemo(() => WIJKEN.map((w, i) => ({ ...w, i })).sort((a, b) => a.km - b.km), []);

  return (
    <section className="dom-dark dom-sec" aria-labelledby="dom-sold-h">
      <div className="dom-wrap dom-sold">
        <div className="dom-sold-copy">
          <h2 id="dom-sold-h" className="dom-h2" data-r>{t(c.sold.title)}</h2>
          <p className="dom-lead" data-r>{t(c.sold.lead)(dots.length)}</p>
          <p className="dom-sold-label" data-r>{t(c.sold.wijken)}</p>
          <ul className="dom-wijken" data-r onMouseLeave={() => setHover(-1)}>
            {order.map((w) => (
              <li key={w.n} onMouseEnter={() => setHover(w.i)} data-on={hover === w.i ? "1" : undefined}>
                <span>{w.n}</span><span className="dom-num">{km(w.km)}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="dom-sold-map" data-r>
          <MapSvg lit={new Set()} dots={dots} hover={hover} />
          <figcaption>
            <span><i className="dom-key-dot" />{t(c.sold.dot)}</span>
            <span><i className="dom-key-dom" />{t(c.sold.dom)}</span>
            <span className="dom-sold-src">{t(c.sold.note)}</span>
          </figcaption>
          <span className="sr-only">{t(c.sold.mapLabel)}</span>
        </figure>
      </div>
    </section>
  );
}

export default function DomHome({ firm, go }: { firm: DomFirm; go: Go }) {
  const t = useT();
  const { lang } = useLang();
  const featured = [firm.listings[0], firm.listings[2], firm.listings[3]];
  const services = t(c.services.items);
  return (
    <>
      <Hero firm={firm} go={go} />
      <Facts firm={firm} />

      <section className="dom-sec" aria-labelledby="dom-aanbod-h">
        <div className="dom-wrap">
          <div className="dom-sec-head">
            <h2 id="dom-aanbod-h" className="dom-h2" data-r>{t(c.listings.title)}</h2>
            <button type="button" className="dom-link" onClick={() => go("aanbod")}>{t(c.listings.all)} <ArrowRight /></button>
          </div>
          <div className="dom-rail" role="list" aria-label={t(c.listings.scroll)}>
            {featured.map((l) => <div key={l.street} role="listitem" data-r><ListingCard l={l} onOpen={() => go("aanbod")} /></div>)}
          </div>
          <p className="dom-note"><span className="dom-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>

      <Sold firm={firm} />

      <section className="dom-sec" aria-labelledby="dom-services-h">
        <div className="dom-wrap dom-services-grid">
          <div className="dom-services-side">
            <div className="dom-services-photo" data-r>
              <Image src={firm.images.tekenen} alt={t(c.services.photoAlt)} fill sizes="(min-width: 1100px) 460px, 100vw" />
            </div>
            <div data-r>
              <p className="dom-sold-label" style={{ color: "var(--ink)" }}>{t(c.services.how)}</p>
              <ul className="dom-checks">
                {t(firm.presentation).map((p) => <li key={p}><Check />{p}</li>)}
              </ul>
            </div>
          </div>
          <div>
            <h2 id="dom-services-h" className="dom-h2" data-r style={{ marginBottom: 28 }}>{t(c.services.title)}</h2>
            <div>
              {services.map(([title, body], n) => {
                const live = n === 0; // only selling leads somewhere inside this concept
                return (
                  <button key={title} type="button" className="dom-service" data-r aria-disabled={live ? undefined : true}
                    onClick={() => live && go("waardebepaling")}>
                    <h3>{title}</h3>
                    <span className="dom-arrow" aria-hidden><ArrowRight /></span>
                    <p>{body}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="dom-sec dom-about-sec" aria-labelledby="dom-about-h">
        <div className="dom-wrap dom-about">
          <div className="dom-portrait" data-r>
            <Image src={firm.images.team} alt="" fill sizes="(min-width: 1100px) 420px, 100vw" style={{ objectPosition: "54% 22%" }} />
          </div>
          <div className="dom-about-copy" data-r>
            <p className="dom-kicker">{firm.ownerTitle}</p>
            <h2 id="dom-about-h" className="dom-h2">{t(c.about.title)(firm.owner)}</h2>
            <figure className="dom-quote">
              <blockquote lang={lang}>“{firm.promise[lang]}”</blockquote>
              <figcaption>{t(c.about.quoteBy)}{t(c.about.translated)}</figcaption>
            </figure>
            <p className="dom-lead">{t(c.about.body)(firm.street)}</p>
            <div className="dom-direct">
              <p>{t(c.about.direct)}</p>
              <a href={firm.mobileHref} className="dom-direct-num"><Phone />{firm.mobile}</a>
              <a className="dom-link" href={`mailto:${firm.ownerEmail}`}>{firm.ownerEmail}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
