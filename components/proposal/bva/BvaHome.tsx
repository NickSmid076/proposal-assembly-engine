"use client";
// Concept homepage. Photos, listings and quotes are BVA's own (see content/leads/bva-164550/proposal.ts).
import Image from "next/image";
import { useId, type FormEvent } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { useLang, useT } from "@/lib/lang";
import { c } from "./copy";
import { BvaLogo, Calendar, Moon, Phone, Sun } from "./icons";
import ListingCard from "./ListingCard";
import type { BvaFirm, Go } from "./types";

function Hero({ firm, go }: { firm: BvaFirm; go: Go }) {
  const t = useT();
  const id = useId();

  function start(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    go("waardebepaling", { postcode: String(d.get("postcode") ?? ""), number: String(d.get("number") ?? "") });
  }

  return (
    <section className="bva-hero" aria-labelledby={`${id}-h`}>
      <div className="bva-hero-in">
        <div className="bva-hero-copy">
          <p className="bva-kicker"><BvaLogo />{t(c.hero.kicker)}</p>
          <h1 id={`${id}-h`} className="bva-h1">{t(c.hero.title)}</h1>
          <p className="bva-lead">{t(c.hero.lead)(firm.owner)}</p>
          <div className="bva-start">
            <h2>{t(c.hero.checkTitle)}</h2>
            <p>{t(c.hero.checkSub)}</p>
            <form onSubmit={start}>
              <div>
                <label htmlFor={`${id}-pc`} className="sr-only">{t(c.hero.postcode)}</label>
                <input id={`${id}-pc`} name="postcode" className="bva-input" placeholder={t(c.hero.postcode)} autoComplete="postal-code" />
              </div>
              <div>
                <label htmlFor={`${id}-nr`} className="sr-only">{t(c.hero.number)}</label>
                <input id={`${id}-nr`} name="number" className="bva-input" placeholder={t(c.hero.number)} />
              </div>
              <button type="submit" className="bva-btn">{t(c.cta)} <ArrowRight /></button>
            </form>
          </div>
        </div>
        <div className="bva-house-photo">
          <div><Image src={firm.images.bridge} alt={t(c.hero.photoAlt)} fill priority sizes="(min-width: 1100px) 560px, 100vw" style={{ objectPosition: "62% 50%" }} /></div>
        </div>
      </div>
    </section>
  );
}

function Facts({ firm }: { firm: BvaFirm }) {
  const t = useT();
  return (
    <div className="bva-wrap" style={{ paddingTop: 8 }}>
      <div className="bva-facts" aria-label={t(c.facts.title)} role="group">
        {t(c.facts.items).map(([value, label]) => (
          <div key={value} data-r><span className="bva-num">{value}</span><p>{label}</p></div>
        ))}
        <div data-r>
          <span className="bva-num">{firm.placeholder.fundaScore} <span className="bva-tag">{t(c.example)}</span></span>
          <p>{t(c.facts.funda)}</p>
        </div>
      </div>
    </div>
  );
}

function Always({ firm }: { firm: BvaFirm }) {
  const t = useT();
  const { lang } = useLang();
  const icons = [Sun, Moon, Calendar];
  return (
    <section className="bva-night bva-sec" aria-labelledby="bva-always-h">
      <div className="bva-wrap bva-night-grid">
        <h2 id="bva-always-h" className="bva-h2" style={{ maxWidth: "16ch" }} data-r>{t(c.always.title)}</h2>
        <ul className="bva-slots">
          {t(c.always.slots).map((slot, i) => {
            const Icon = icons[i];
            return (
              <li key={slot} className="bva-slot" data-r>
                <Icon /><b>{slot}</b><span><Check />{t(c.always.slotNote)}</span>
              </li>
            );
          })}
        </ul>
        <div style={{ display: "grid", gap: 24, alignContent: "start" }} data-r>
          <figure className="bva-quote" style={{ margin: 0 }}>
            <blockquote lang={lang}>“{firm.always[lang]}”</blockquote>
            <figcaption>{t(c.always.quoteBy)}{lang === "en" && ` · ${t(c.always.translated)}`}</figcaption>
          </figure>
          <a className="bva-btn bva-btn-light" href={firm.phoneHref} style={{ justifySelf: "start" }}><Phone />{t(c.always.call)} {firm.phone}</a>
        </div>
      </div>
    </section>
  );
}

export default function BvaHome({ firm, go }: { firm: BvaFirm; go: Go }) {
  const t = useT();
  const { lang } = useLang();
  const featured = firm.listings.slice(0, 3);
  const services = t(c.services.items);
  return (
    <>
      <Hero firm={firm} go={go} />
      <Facts firm={firm} />

      <section className="bva-sec" aria-labelledby="bva-aanbod-h">
        <div className="bva-wrap">
          <div className="bva-sec-head">
            <h2 id="bva-aanbod-h" className="bva-h2" data-r>{t(c.listings.title)}</h2>
            <button type="button" className="bva-link" onClick={() => go("aanbod")}>{t(c.listings.all)} ({firm.listingsTotal}) <ArrowRight /></button>
          </div>
          <div className="bva-rail" role="list" aria-label={t(c.listings.scroll)}>
            {featured.map((l) => <div key={l.street} role="listitem" data-r><ListingCard l={l} onOpen={() => go("aanbod")} /></div>)}
          </div>
          <p className="bva-note"><span className="bva-tag">{t(c.example)}</span>{t(c.listings.note)(firm.listingsDate)}</p>
        </div>
      </section>

      <section className="bva-services bva-sec" aria-labelledby="bva-services-h">
        <div className="bva-wrap bva-services-grid">
          <div className="bva-services-photo" data-r>
            <Image src={firm.images.street} alt="" fill sizes="(min-width: 1100px) 460px, 100vw" style={{ objectPosition: "35% 50%" }} />
          </div>
          <div>
            <h2 id="bva-services-h" className="bva-h2" data-r style={{ marginBottom: 28 }}>{t(c.services.title)}</h2>
            <div>
              {services.map(([title, body], n) => {
                const live = n === 0; // only "Woning verkopen" leads somewhere inside this concept
                return (
                  <button key={title} type="button" className="bva-service" data-r aria-disabled={live ? undefined : true}
                    onClick={() => live && go("waardebepaling")}>
                    <h3>{title}</h3>
                    <span className="bva-arrow" aria-hidden><ArrowRight /></span>
                    <p>{body}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Always firm={firm} />

      <section className="bva-sec" aria-labelledby="bva-about-h">
        <div className="bva-wrap bva-about">
          <div className="bva-portrait" data-r>
            <div><Image src={firm.images.jordy} alt={t(c.about.photoAlt)} fill sizes="(min-width: 1100px) 480px, 100vw" /></div>
          </div>
          <div className="bva-about-copy" data-r>
            <p className="bva-kicker">{t(firm.ownerTitle)}</p>
            <h2 id="bva-about-h" className="bva-h2">{t(c.about.title)(firm.owner)}</h2>
            <blockquote className="bva-bio" lang={lang}>“{firm.bio[lang]}”</blockquote>
            <p className="bva-lead">{t(c.about.body)(firm.street, firm.area)}</p>
            <p className="bva-muted" style={{ fontSize: 15 }}>{t(c.about.whatsapp)}</p>
            <div className="bva-contacts">
              <a className="bva-link" href={firm.phoneHref}><Phone />{firm.phone}</a>
              <a className="bva-link" href={`mailto:${firm.email}`}>{firm.email}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
