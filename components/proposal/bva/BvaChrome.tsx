"use client";
// Shared masthead, mobile menu, footer and bottom dock (cookie bar + phone action bar) for the concept.
import { useState } from "react";
import { ArrowRight, Close, Menu } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import { BvaLogo, Phone } from "./icons";
import type { BvaFirm, BvaPage, Go } from "./types";

// Menu item → page in the concept. Items without a page are shown for recognition only.
// "Woning verkopen" leads to the valuation: in the concept that is where selling starts.
const TARGET: (BvaPage | null)[] = ["aanbod", "waardebepaling", null, null, null];

export function BvaHeader({ firm, page, go }: { firm: BvaFirm; page: BvaPage; go: Go }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const nav = (p: BvaPage) => { setOpen(false); go(p); };
  return (
    <>
      <header className="bva-head">
        <div className="bva-head-in">
          <button type="button" className="bva-logo" onClick={() => nav("home")} aria-label={`${firm.name}, ${t(c.nav.home)}`}>
            <BvaLogo /><span aria-hidden>Makelaardij</span>
          </button>
          <nav className="bva-nav" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true}
                  aria-current={target === page ? "page" : undefined} onClick={() => target && nav(target)}>{label}</button>
              );
            })}
          </nav>
          <div className="bva-head-right">
            <a className="bva-phone" href={firm.phoneHref} aria-label={`${t(c.nav.call)} ${firm.phone}`}><Phone /><span>{firm.phone}</span></a>
            {page !== "waardebepaling" && <button type="button" className="bva-btn bva-btn-sm" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>}
            <button type="button" className="bva-menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <Close /> : <Menu />}{open ? t(c.nav.close) : t(c.nav.menu)}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="bva-menu">
          <nav className="bva-menu-panel" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true} onClick={() => target && nav(target)}>
                  {label}{target && <ArrowRight />}
                </button>
              );
            })}
            <button type="button" className="bva-btn" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>
          </nav>
        </div>
      )}
    </>
  );
}

export function BvaFooter({ firm, page, go }: { firm: BvaFirm; page: BvaPage; go: Go }) {
  const t = useT();
  return (
    <>
      {page !== "waardebepaling" && (
        <section className="bva-foot-cta" aria-label={t(c.footer.ctaTitle)}>
          <div className="bva-wrap">
            <h2 className="bva-h2" style={{ maxWidth: "18ch" }}>{t(c.footer.ctaTitle)}</h2>
            <button type="button" className="bva-btn bva-btn-ink" onClick={() => go("waardebepaling")}>{t(c.cta)} <ArrowRight /></button>
          </div>
        </section>
      )}
      <footer className="bva-foot">
        <div className="bva-wrap bva-foot-cols">
          <div className="bva-foot-logo"><BvaLogo full title={firm.name} /></div>
          <div>
            <p className="bva-foot-label">{t(c.footer.office)}</p>
            <p>{firm.street}<br />{firm.postcode} {firm.town}</p>
          </div>
          <div>
            <p className="bva-foot-label">{t(c.footer.contact)}</p>
            <p><a href={firm.phoneHref}>{firm.phone}</a><br /><a href={`mailto:${firm.email}`}>{firm.email}</a></p>
          </div>
          <div>
            <p className="bva-foot-label">{t(c.footer.hours)}</p>
            <p>{t(c.footer.hoursBody)[0]}<br />{t(c.footer.hoursBody)[1]}</p>
          </div>
        </div>
        <div className="bva-wrap bva-foot-legal">
          <span>© 2026 {firm.name} B.V.</span>
          <span>KvK {firm.kvk}</span>
          <span>{t(c.footer.member)} {firm.memberships.slice(0, 3).join(", ")}</span>
          <u>{t(c.footer.privacy)}</u>
          <u>{t(c.footer.cookies)}</u>
        </div>
      </footer>
    </>
  );
}

/** Cookie choice with two equal buttons, and on phones a fixed call / valuation bar. Stores nothing. */
export function BvaDock({ firm, page, go, cookie = true }: { firm: BvaFirm; page: BvaPage; go: Go; cookie?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(cookie);
  return (
    <div className="bva-dock">
      {open && (
        <div className="bva-cookie" role="region" aria-label={t(c.cookie.label)}>
          <p>{t(c.cookie.text)}</p>
          <div className="bva-cookie-btns">
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.decline)}</button>
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.accept)}</button>
          </div>
        </div>
      )}
      <nav className={`bva-bar ${page === "waardebepaling" ? "single" : ""}`} aria-label={t(c.bar.label)}>
        <a className="bva-btn bva-btn-ghost" href={firm.phoneHref}><Phone />{t(c.bar.call)}</a>
        {page !== "waardebepaling" && <button type="button" className="bva-btn" onClick={() => go("waardebepaling")}>{t(c.cta)}</button>}
      </nav>
    </div>
  );
}
