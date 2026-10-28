"use client";
// Concept homepage. Photos, listings and reviews are Lemmens' own (see content/leads/lemmens-550127/proposal.ts).
import Image from "next/image";
import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { useLang, useT } from "@/lib/lang";
import { c } from "./copy";
import ListingCard from "./ListingCard";
import type { Go, LemmensFirm } from "./types";

const SLIDE_MS = 6500;

function Hero({ firm, go, still }: { firm: LemmensFirm; go: Go; still: boolean }) {
  const t = useT();
  const id = useId();
  const photos = [firm.images.straat, firm.images.kerk, firm.images.brug, firm.images.water];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (still || paused) return;
    const timer = setInterval(() => setI((n) => (n + 1) % photos.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [still, paused, photos.length]);

  function start(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    go("waardebepaling", { postcode: String(d.get("postcode") ?? ""), number: String(d.get("number") ?? "") });
  }

  return (
    <section className="lm-hero" aria-labelledby={`${id}-h`} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="lm-hero-photos" aria-hidden>
        {photos.map((p, n) => (
          <div key={p.src} className="lm-hero-photo" data-on={n === i ? "1" : "0"}>
            <Image src={p} alt="" fill priority={n === 0} sizes="(min-width: 1200px) 1240px, 100vw" />
          </div>
        ))}
      </div>
      <div className="lm-hero-in">
        <div className="lm-hero-copy">
          <p className="lm-kicker">{t(c.hero.kicker)}</p>
          <h1 id={`${id}-h`} className="lm-h1">{t(c.hero.title)}</h1>
          <p className="lm-lead">{t(c.hero.lead)(firm.owner, firm.years)}</p>
        </div>
        <div className="lm-check">
          <h2>{t(c.hero.checkTitle)}</h2>
          <p>{t(c.hero.checkSub)}</p>
          <form onSubmit={start}>
            <div className="lm-field">
              <label htmlFor={`${id}-pc`} className="sr-only">{t(c.hero.postcode)}</label>
              <input id={`${id}-pc`} name="postcode" className="lm-input" placeholder={t(c.hero.postcode)} autoComplete="postal-code" />
            </div>
            <div className="lm-field">
              <label htmlFor={`${id}-nr`} className="sr-only">{t(c.hero.number)}</label>
              <input id={`${id}-nr`} name="number" className="lm-input" placeholder={t(c.hero.number)} inputMode="numeric" />
            </div>
            <button type="submit" className="lm-btn">{t(c.cta)} <ArrowRight /></button>
          </form>
        </div>
        <div className="lm-dots" role="group" aria-label={t(c.hero.photos)}>
          {photos.map((p, n) => (
            <button key={p.src} type="button" aria-pressed={n === i} aria-label={`${t(c.hero.photo)} ${n + 1}`} onClick={() => setI(n)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews({ firm }: { firm: LemmensFirm }) {
  const t = useT();
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const n = firm.reviews.length;
  const r = firm.reviews[i];
  return (
    <section className="lm-dark lm-sec" aria-label={t(c.reviews.title)}>
      <div className="lm-wrap lm-reviews">
        <div style={{ display: "grid", gap: 24, alignContent: "space-between" }}>
          <h2 className="lm-h2" data-r>{t(c.reviews.title)}</h2>
          <div className="lm-rev-nav">
            <button type="button" className="prev" onClick={() => setI((i + n - 1) % n)} aria-label={t(c.reviews.prev)}><ArrowRight /></button>
            <button type="button" onClick={() => setI((i + 1) % n)} aria-label={t(c.reviews.next)}><ArrowRight /></button>
            <span aria-live="polite">{i + 1} {t(c.reviews.of)} {n}</span>
          </div>
        </div>
        <figure className="lm-quote" key={i}>
          <blockquote lang={lang}>{r[lang]}</blockquote>
          <figcaption><span>{t(c.reviews.by)}</span>{lang === "en" && <span>· {t(c.reviews.translated)}</span>}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function LemmensHome({ firm, go, still }: { firm: LemmensFirm; go: Go; still: boolean }) {
  const t = useT();
  const homes = firm.listings.filter((l) => l.kind === "wonen").slice(0, 3);
  const services = t(c.services.items);
  return (
    <>
      <Hero firm={firm} go={go} still={still} />

      <div className="lm-wrap">
        <div className="lm-trust">
          <div data-r><span className="lm-num">{firm.years}</span><span>{t(c.trust.years)}</span></div>
          <div data-r><span className="lm-num">{firm.placeholder.fundaScore} <span className="lm-tag">{t(c.example)}</span></span><span>{t(c.trust.funda)}</span></div>
          <div data-r><span className="lm-num small">{firm.memberships.join(" · ")}</span><span>{t(c.trust.member)}</span></div>
          <div data-r><span className="lm-num small">{t(c.trust.hours)}</span><span>{t(c.trust.reach)}</span></div>
        </div>
      </div>

      <section className="lm-sec" aria-labelledby="lm-aanbod-h">
        <div className="lm-wrap">
          <div className="lm-sec-head">
            <h2 id="lm-aanbod-h" className="lm-h2" data-r>{t(c.listings.title)}</h2>
            <button type="button" className="lm-link" onClick={() => go("aanbod")}>{t(c.listings.all)} ({firm.listings.length}) <ArrowRight /></button>
          </div>
          <div className="lm-cards">
            {homes.map((l) => <div key={l.street} data-r><ListingCard l={l} onOpen={() => go("aanbod")} /></div>)}
          </div>
          <p className="lm-note"><span className="lm-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>

      <section className="lm-services lm-sec" aria-labelledby="lm-services-h">
        <div className="lm-wrap lm-services-grid">
          <div className="lm-services-photo" data-r>
            <Image src={firm.images.westpoint} alt="" fill sizes="(min-width: 1100px) 520px, 100vw" style={{ objectPosition: "40% 50%" }} />
          </div>
          <div>
            <h2 id="lm-services-h" className="lm-h2" data-r style={{ marginBottom: 28 }}>{t(c.services.title)}</h2>
            <div className="lm-service-list">
              {services.map(([title, body], n) => {
                const live = n === 0; // only "Verkopen" leads somewhere inside this concept
                return (
                  <button key={title} type="button" className="lm-service" data-r aria-disabled={live ? undefined : true}
                    onClick={() => live && go("waardebepaling")}>
                    <h3 className="lm-h3">{title}</h3>
                    <span className="lm-arrow" aria-hidden><ArrowRight /></span>
                    <p>{body}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Reviews firm={firm} />

      <section className="lm-sec" aria-labelledby="lm-about-h">
        <div className="lm-wrap lm-about">
          <div className="lm-about-photo" data-r>
            <Image src={firm.images.office} alt={t(c.about.officeAlt)} fill sizes="(min-width: 1100px) 680px, 100vw" />
          </div>
          <div className="lm-about-copy" data-r>
            <p className="lm-kicker">{t(c.about.label)}</p>
            <h2 id="lm-about-h" className="lm-h2">{t(c.about.title)(firm.owner)}</h2>
            <p className="lm-lead">{t(c.about.body)(firm.years, firm.street, firm.town)}</p>
            <a className="lm-link" href={firm.phoneHref}>{t(c.about.visit)} <ArrowRight /></a>
          </div>
        </div>
      </section>
    </>
  );
}
