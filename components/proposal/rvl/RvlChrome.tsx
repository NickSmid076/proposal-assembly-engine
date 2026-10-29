"use client";
// Shared masthead, mobile menu, footer and bottom dock (cookie bar + valuation / WhatsApp bar) for the concept.
import { useState } from "react";
import { ArrowRight, Close, Menu } from "@/components/icons";
import { useT } from "@/lib/lang";
import { c } from "./copy";
import { Chat, Phone, RvlLogo } from "./icons";
import type { Go, RvlFirm, RvlPage } from "./types";

// Menu item → page in the concept. Items without a page are shown for recognition only.
// "Verkopen" leads to the valuation: in the concept that is where selling starts.
const TARGET: (RvlPage | null)[] = ["waardebepaling", null, "aanbod", null, null];

export function RvlHeader({ firm, page, go }: { firm: RvlFirm; page: RvlPage; go: Go }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const nav = (p: RvlPage) => { setOpen(false); go(p); };
  return (
    <>
      <header className="rvl-head">
        <div className="rvl-head-in">
          <button type="button" className="rvl-logo" onClick={() => nav("home")} aria-label={`${firm.name}, ${t(c.nav.home)}`}>
            <RvlLogo />
          </button>
          <nav className="rvl-nav" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true}
                  aria-current={target === page ? "page" : undefined} onClick={() => target && nav(target)}>{label}</button>
              );
            })}
          </nav>
          <div className="rvl-head-right">
            <a className="rvl-phone" href={firm.phoneHref} aria-label={`${t(c.nav.call)} ${firm.phone}`}><Phone /><span>{firm.phone}</span></a>
            {page !== "waardebepaling" && <button type="button" className="rvl-btn rvl-btn-sm" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>}
            <button type="button" className="rvl-menu-btn" aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <Close /> : <Menu />}{open ? t(c.nav.close) : t(c.nav.menu)}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="rvl-menu">
          <nav className="rvl-menu-panel" aria-label={t(c.nav.main)}>
            {t(c.nav.items).map((label, i) => {
              const target = TARGET[i];
              return (
                <button key={label} type="button" aria-disabled={target ? undefined : true} onClick={() => target && nav(target)}>
                  {label}{target && <ArrowRight />}
                </button>
              );
            })}
            <button type="button" className="rvl-btn" onClick={() => nav("waardebepaling")}>{t(c.cta)}</button>
          </nav>
        </div>
      )}
    </>
  );
}

export function RvlFooter({ firm, page, go }: { firm: RvlFirm; page: RvlPage; go: Go }) {
  const t = useT();
  return (
    <>
      {page !== "waardebepaling" && (
        <section className="rvl-foot-cta" aria-label={t(c.footer.ctaTitle)}>
          <div className="rvl-wrap">
            <h2 className="rvl-h2">{t(c.footer.ctaTitle)}</h2>
            <button type="button" className="rvl-btn rvl-btn-dark" onClick={() => go("waardebepaling")}>{t(c.cta)} <ArrowRight /></button>
          </div>
        </section>
      )}
      <footer className="rvl-foot">
        <div className="rvl-wrap rvl-foot-cols">
          <div className="rvl-foot-logo"><RvlLogo title={firm.name} /></div>
          {firm.offices.map((o) => (
            <div key={o.id}>
              <p className="rvl-foot-label">{t(c.footer.office)(o.name)}</p>
              <p>{o.street}<br />{o.postcode} {o.town}</p>
            </div>
          ))}
          <div>
            <p className="rvl-foot-label">{t(c.footer.contact)}</p>
            <p><a href={firm.phoneHref}>{firm.phone}</a><br /><a href={firm.whatsappHref}>WhatsApp {firm.whatsapp}</a><br /><a href={`mailto:${firm.email}`}>{firm.email}</a></p>
          </div>
        </div>
        <div className="rvl-wrap rvl-foot-legal">
          <span>© 2026 {firm.legal}</span>
          <span>KvK {firm.kvk}</span>
          <span>{t(c.footer.member)}</span>
          <u>{t(c.footer.privacy)}</u>
          <u>{t(c.footer.cookies)}</u>
        </div>
      </footer>
    </>
  );
}

/** Cookie choice with two equal buttons, and on phones a fixed valuation / WhatsApp bar. Stores nothing. */
export function RvlDock({ firm, page, go, cookie = true }: { firm: RvlFirm; page: RvlPage; go: Go; cookie?: boolean }) {
  const t = useT();
  const [open, setOpen] = useState(cookie);
  return (
    <div className="rvl-dock">
      {open && (
        <div className="rvl-cookie" role="region" aria-label={t(c.cookie.label)}>
          <p>{t(c.cookie.text)}</p>
          <div className="rvl-cookie-btns">
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.decline)}</button>
            <button type="button" onClick={() => setOpen(false)}>{t(c.cookie.accept)}</button>
          </div>
        </div>
      )}
      <nav className={`rvl-bar ${page === "waardebepaling" ? "single" : ""}`} aria-label={t(c.bar.label)}>
        <a className="rvl-btn rvl-btn-ghost" href={firm.whatsappHref}><Chat />{t(c.bar.whatsapp)}</a>
        {page !== "waardebepaling" && <button type="button" className="rvl-btn" onClick={() => go("waardebepaling")}>{t(c.bar.cta)} <ArrowRight /></button>}
      </nav>
    </div>
  );
}
