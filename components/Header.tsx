"use client";
// Copied from Website/components/Header.tsx. Differences: Dutch strings are hardcoded (no I18nProvider),
// every link is an absolute link to the main site, and the newsletter switch is gone (it is off there too).
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ChevronDown, Menu, Close } from "./icons";
import { MAIN, NAV as t, SERVICES, main } from "@/lib/site";

function Dropdown({ label, items }: { label: string; items: { label: string; href: string; sub?: string }[] }) {
  return (
    <div className="group relative">
      <button type="button" className="focus-ring flex items-center gap-1 rounded px-1 py-2 font-display text-[15px] font-semibold text-ink" aria-haspopup="true">
        {label}<ChevronDown className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="rounded-xl border border-line bg-white p-1.5 shadow-[0_1px_2px_rgba(11,27,51,.05),0_16px_40px_-16px_rgba(11,27,51,.25)]">
          {items.map((i) => (
            <li key={i.label}><a href={i.href} className="focus-ring block rounded-lg px-3 py-2.5 hover:bg-sunken">
              <span className="block font-display text-[14px] font-semibold text-ink">{i.label}</span>
              {i.sub && <span className="mt-0.5 block text-[12.5px] text-slate">{i.sub}</span>}
            </a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// This site is Dutch only: NL is the current language, EN goes to the English main site.
function LangSwitch() {
  return (
    <a href={`${MAIN}/en`} hrefLang="en"
      className="focus-ring inline-flex h-9 items-center gap-1 rounded-md border border-line px-2.5 font-mono text-[12px] uppercase tracking-[0.08em] text-slate hover:text-ink">
      <span className="text-ink">NL</span><span aria-hidden className="text-line-2">/</span><span>EN</span>
      <span className="sr-only"> · {t.language}: EN</span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  const services = SERVICES.map((s) => ({ label: s.name, href: main(`/services/${s.slug}`), sub: s.lead }));
  const resources = [{ label: t.blog, href: main("/blog") }, { label: t.howWeWork, href: `${main()}#how-we-work` }];
  const links = [{ label: t.caseStudy, href: main("/case-studies/energielabel-breda") }, { label: t.about, href: main("/about") }, { label: t.contact, href: main("/contact") }];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center gap-8 px-5 sm:px-10">
        <a href={main()} className="focus-ring inline-flex min-h-[24px] items-center rounded" aria-label="Assembly Engine home"><Logo /></a>
        <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label="Main">
          <Dropdown label={t.services} items={services} />
          {links.slice(0, 1).map((l) => <a key={l.label} href={l.href} className="focus-ring inline-flex min-h-[24px] items-center rounded px-1 font-display text-[15px] font-semibold">{l.label}</a>)}
          <Dropdown label={t.resources} items={resources} />
          {links.slice(1).map((l) => <a key={l.label} href={l.href} className="focus-ring inline-flex min-h-[24px] items-center rounded px-1 font-display text-[15px] font-semibold">{l.label}</a>)}
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LangSwitch />
          <a href={main("/contact")} className="btn-primary focus-ring h-10 px-4 text-[14px]">{t.cta}</a>
        </div>
        <button type="button" className="focus-ring ml-auto rounded p-2 lg:hidden" aria-expanded={open} aria-label={open ? t.close : t.menu} onClick={() => setOpen(!open)}>
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="max-h-[calc(100svh-68px)] overflow-y-auto border-t border-line bg-white lg:hidden" aria-label="Mobile">
          <div className="px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate">{t.services}</p>
            <ul className="mt-2">{services.map((s) => <li key={s.label}><a href={s.href} className="block py-2.5 font-display text-[16px] font-semibold">{s.label}</a></li>)}</ul>
            <ul className="mt-3 border-t border-line pt-3">
              {[...links, { label: t.blog, href: main("/blog") }].map((l) => <li key={l.label}><a href={l.href} className="block py-2.5 font-display text-[16px] font-semibold">{l.label}</a></li>)}
            </ul>
            <div className="mt-4 flex items-center gap-3"><LangSwitch /><a href={main("/contact")} className="btn-primary h-11 flex-1">{t.cta}</a></div>
          </div>
        </nav>
      )}
    </header>
  );
}
