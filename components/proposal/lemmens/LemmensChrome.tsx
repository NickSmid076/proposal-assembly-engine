"use client";
// Shared masthead, mobile menu, footer and bottom dock (cookie bar + phone action bar) for the concept.
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Close, Menu } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import { Phone } from "./icons";
import type { Go, LemmensFirm, LemmensPage } from "./types";

// Menu item → page in the concept. Items without a page are shown for recognition only.
const TARGET: (LemmensPage | null)[] = ["aanbod", null, "waardebepaling", null, null];

export function LemmensHeader({ firm, page, go }: { firm: LemmensFirm; page: LemmensPage; go: Go }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const nav = (p: LemmensPage) => { setOpen(false); go(p); };
  return (
    <>
      <header className="lm-head">
        <div className="lm-head-in">
          <button type="button" className="lm-logo" onClick={() => nav("home")} aria-label={`${firm.name}, ${t(c.nav.home)}`}>
            <Image src={firm.images.logo} alt="" priority />
          </button>
          <nav className="lm-nav" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true}
                  aria-current={target === page ? "page" : undefined} onClick={() => target && nav(target)}>{label}</button>
              );
            })}
          </nav>
          <div className="lm-head-right">
            <a className="lm-phone" href={firm.phoneHref} aria-label={`${t(c.nav.call)} ${firm.phone}`}><Phone /><span>{firm.phone}</span></a>
            {page !== "waardebepaling" && <button type="button" className="lm-btn lm-btn-sm" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>}
            <button type="button" className="lm-menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <Close /> : <Menu />}{open ? t(c.nav.close) : t(c.nav.menu)}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="lm-menu">
          <nav className="lm-menu-panel" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true} onClick={() => target && nav(target)}>
                  {label}{target && <ArrowRight />}
                </button>
              );
            })}
            <a className="lm-btn" href={firm.phoneHref}><Phone />{firm.phone}</a>
          </nav>
        </div>
      )}
    </>
  );
}

export function LemmensFooter({ firm, page, go }: { firm: LemmensFirm; page: LemmensPage; go: Go }) {
  const t = useT();
  return (
    <>
      {page !== "waardebepaling" && (
        <section className="lm-foot-cta" aria-label={t(c.footer.ctaTitle)}>
          <div className="lm-wrap">
            <h2 className="lm-h2" style={{ maxWidth: "16ch" }}>{t(c.footer.ctaTitle)}</h2>
            <button type="button" className="lm-btn lm-btn-light" onClick={() => go("waardebepaling")}>{t(c.cta)} <ArrowRight /></button>
          </div>
        </section>
      )}
      <footer className="lm-foot">
        <div className="lm-wrap lm-foot-cols">
          <div className="lm-foot-logo"><Image src={firm.images.logo} alt={firm.name} /></div>
          <div>
            <p className="lm-foot-label">{t(c.footer.office)}</p>
            <p>{firm.street}<br />{firm.postcode} {firm.town}</p>
          </div>
          <div>
            <p className="lm-foot-label">{t(c.footer.contact)}</p>
            <p><a href={firm.phoneHref}>{firm.phone}</a><br /><a href={`mailto:${firm.email}`}>{firm.email}</a></p>
          </div>
          <div>
            <p className="lm-foot-label">{t(c.footer.hours)}</p>
            <p>{t(c.footer.hoursBody)[0]}<br />{t(c.footer.hoursBody)[1]}</p>
          </div>
        </div>
        <div className="lm-wrap lm-foot-legal">
          <span>© 2026 {firm.name} B.V.</span>
          <span>KvK {firm.kvk}</span>
          <span>BTW {firm.btw}</span>
          <span>{t(c.footer.member)} {firm.memberships.join(", ")}</span>
          <u>{t(c.footer.privacy)}</u>
          <u>{t(c.footer.cookies)}</u>
        </div>
      </footer>
    </>
  );
}

/** Cookie choice with two equal buttons, and on phones a fixed call / valuation bar. Stores nothing. */
export function LemmensDock({ firm, page, go, cookie = true }: { firm: LemmensFirm; page: LemmensPage; go: Go; cookie?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(cookie);
  return (
    <div className="lm-dock">
      {open && (
        <div className="lm-cookie" role="region" aria-label={t(c.cookie.label)}>
          <p>{t(c.cookie.text)}</p>
          <div className="lm-cookie-btns">
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.decline)}</button>
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.accept)}</button>
          </div>
        </div>
      )}
      <nav className={`lm-bar ${page === "waardebepaling" ? "single" : ""}`} aria-label={t(c.bar.label)}>
        <a className="lm-btn lm-btn-ghost" href={firm.phoneHref}><Phone />{t(c.bar.call)}</a>
        {page !== "waardebepaling" && <button type="button" className="lm-btn" onClick={() => go("waardebepaling")}>{t(c.cta)}</button>}
      </nav>
    </div>
  );
}
