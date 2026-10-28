"use client";
// Shared masthead, mobile menu, footer and bottom dock (cookie bar + phone action bar) for the concept.
import { useState } from "react";
import { ArrowRight, Close, Menu } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import { DomLogo, Phone } from "./icons";
import { WIJKEN } from "./mapModel";
import type { DomFirm, DomPage, Go } from "./types";

// Menu item → page in the concept. Items without a page are shown for recognition only.
// "Verkopen" leads to the valuation: in the concept that is where selling starts.
const TARGET: (DomPage | null)[] = ["waardebepaling", null, "aanbod", null, null];

export function DomHeader({ firm, page, go }: { firm: DomFirm; page: DomPage; go: Go }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const nav = (p: DomPage) => { setOpen(false); go(p); };
  return (
    <>
      <header className="dom-head">
        <div className="dom-head-in">
          <button type="button" className="dom-logo" onClick={() => nav("home")} aria-label={`${firm.name}, ${t(c.nav.home)}`}>
            <DomLogo />
          </button>
          <nav className="dom-nav" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true}
                  aria-current={target === page ? "page" : undefined} onClick={() => target && nav(target)}>{label}</button>
              );
            })}
          </nav>
          <div className="dom-head-right">
            <a className="dom-phone" href={firm.phoneHref} aria-label={`${t(c.nav.call)} ${firm.phone}`}><Phone /><span>{firm.phone}</span></a>
            {page !== "waardebepaling" && <button type="button" className="dom-btn dom-btn-sm" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>}
            <button type="button" className="dom-menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <Close /> : <Menu />}{open ? t(c.nav.close) : t(c.nav.menu)}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="dom-menu">
          <nav className="dom-menu-panel" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true} onClick={() => target && nav(target)}>
                  {label}{target && <ArrowRight />}
                </button>
              );
            })}
            <button type="button" className="dom-btn" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>
          </nav>
        </div>
      )}
    </>
  );
}

export function DomFooter({ firm, page, go }: { firm: DomFirm; page: DomPage; go: Go }) {
  const t = useT();
  return (
    <>
      {page !== "waardebepaling" && (
        <section className="dom-foot-cta" aria-label={t(c.footer.ctaTitle)}>
          <div className="dom-wrap">
            <h2 className="dom-h2" style={{ maxWidth: "18ch" }}>{t(c.footer.ctaTitle)}</h2>
            <button type="button" className="dom-btn dom-btn-light" onClick={() => go("waardebepaling")}>{t(c.cta)} <ArrowRight /></button>
          </div>
        </section>
      )}
      <footer className="dom-foot">
        <div className="dom-wrap dom-foot-cols">
          <div className="dom-foot-logo"><DomLogo title={firm.name} /></div>
          <div>
            <p className="dom-foot-label">{t(c.footer.office)}</p>
            <p>{firm.street}<br />{firm.postcode} {firm.town}</p>
          </div>
          <div>
            <p className="dom-foot-label">{t(c.footer.contact)}</p>
            <p><a href={firm.phoneHref}>{firm.phone}</a><br /><a href={`mailto:${firm.email}`}>{firm.email}</a></p>
          </div>
          <div className="dom-foot-wijken">
            <p className="dom-foot-label">{t(c.footer.wijken)}</p>
            <p>{WIJKEN.map((w) => w.n).join(" · ")}</p>
          </div>
        </div>
        <div className="dom-wrap dom-foot-legal">
          <span>© 2026 {firm.name} B.V.</span>
          <span>KvK {firm.kvk}</span>
          <span>{t(c.footer.member)}</span>
          <u>{t(c.footer.privacy)}</u>
          <u>{t(c.footer.cookies)}</u>
        </div>
      </footer>
    </>
  );
}

/** Cookie choice with two equal buttons, and on phones a fixed call / valuation bar. Stores nothing. */
export function DomDock({ firm, page, go, cookie = true }: { firm: DomFirm; page: DomPage; go: Go; cookie?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(cookie);
  return (
    <div className="dom-dock">
      {open && (
        <div className="dom-cookie" role="region" aria-label={t(c.cookie.label)}>
          <p>{t(c.cookie.text)}</p>
          <div className="dom-cookie-btns">
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.decline)}</button>
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.accept)}</button>
          </div>
        </div>
      )}
      <nav className={`dom-bar ${page === "waardebepaling" ? "single" : ""}`} aria-label={t(c.bar.label)}>
        <a className="dom-btn dom-btn-ghost" href={firm.mobileHref}><Phone />{t(c.bar.call)}</a>
        {page !== "waardebepaling" && <button type="button" className="dom-btn" onClick={() => go("waardebepaling")}>{t(c.cta)}</button>}
      </nav>
    </div>
  );
}
