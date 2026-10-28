"use client";
// Copied from Website/components/Footer.tsx. Differences: strings come from lib/site (NL, plus EN on bilingual pages), every link goes to
// the main site, and the cookie-settings button is gone (this site sets no consent cookies).
import Logo from "./Logo";
import { FOOTER, FOOTER_EN, NAV as NAV_NL, NAV_EN, SERVICES, SERVICES_EN, main as mainNl } from "@/lib/site";
import { useLang } from "@/lib/lang";

const linkCls = "focus-ring inline-flex min-h-[24px] items-center rounded-sm text-white/75 transition-colors duration-150 hover:text-white";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();
  const t = lang === "en" ? FOOTER_EN : FOOTER;
  const NAV = lang === "en" ? NAV_EN : NAV_NL;
  const main = (p?: string) => mainNl(p, lang);
  return (
    <footer className="border-t border-white/[0.08] bg-ink-2 text-white">
      <div className="frame frame-dark grid gap-12 py-16 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Logo tone="white" />
          <p className="mt-4 max-w-[300px] text-[14px] leading-[1.5] text-white/70">{t.tagline}</p>
        </div>
        <nav aria-label={t.services}>
          <p className="text-[14px] font-semibold text-white">{t.services}</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">{SERVICES.map((s, i) => <li key={s.slug}><a href={main(`/services/${s.slug}`)} className={linkCls}>{lang === "en" ? SERVICES_EN[i].name : s.name}</a></li>)}</ul>
        </nav>
        <nav aria-label={t.company}>
          <p className="text-[14px] font-semibold text-white">{t.company}</p>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            {[[NAV.about, "/about"], [NAV.caseStudy, "/case-studies/energielabel-breda"], [NAV.blog, "/blog"], [NAV.contact, "/contact"]].map(([l, p]) => <li key={l}><a href={main(p)} className={linkCls}>{l}</a></li>)}
          </ul>
        </nav>
        <div>
          <p className="text-[14px] font-semibold text-white">{t.contact}</p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-white/75">
            <li className="select-all">nick@assembly-engine.com</li>
            <li>assembly-engine.com</li>
            <li>{t.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="frame frame-dark flex flex-col gap-3 py-6 text-[13px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Assembly Engine</p>
          {/* TODO: the main site has no privacy or terms page yet (its links are "#"). Point these at them once they exist. */}
          <ul className="flex gap-5">
            <li><a href={main()} className="focus-ring inline-flex min-h-[24px] items-center rounded-sm transition-colors duration-150 hover:text-white">{t.privacy}</a></li>
            <li><a href={main()} className="focus-ring inline-flex min-h-[24px] items-center rounded-sm transition-colors duration-150 hover:text-white">{t.terms}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
