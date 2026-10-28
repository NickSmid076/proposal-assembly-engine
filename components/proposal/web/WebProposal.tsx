"use client";
// The page every web proposal uses (/v/<slug> for leads with offer "web"). Same structure, style and
// behaviour for every lead; only `content` and the concept site (`preview`, `phone`) differ.
//
// Sections, in order: hero with the concept on a 3D laptop and phone · section nav · what we noticed
// (pinned screenshots of their current site) · before / after slider · live concept · mobile today vs
// concept · what changes · pilot proposal.
// Text follows the header language switch (NL default, EN optional); render <Bilingual /> on the page.
import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, Check, Mail } from "@/components/icons";
import { useLang, useT } from "@/lib/lang";
import { main } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/lib/motion";
import BeforeAfter from "./BeforeAfter";
import DeviceShowcase from "./DeviceShowcase";
import { CONTACT_EMAIL, web } from "./copy";
import type { WebProposalContent } from "./types";

type Props = {
  content: WebProposalContent;
  /** The concept in a browser frame: a <ConceptPreview> from the concept's own folder. */
  preview: ReactNode;
  /** The concept in a phone: a <PhoneFrame> from the concept's own folder. */
  phone: ReactNode;
};

const H2 = "font-display text-[30px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[44px]";
const LEAD = "mt-4 max-w-[640px] text-[16.5px] leading-[1.65] text-slate sm:text-[17.5px]";
const MONO = "font-mono text-[12px] uppercase tracking-[0.08em]";

function Pin({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <span aria-hidden className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cobalt font-mono text-[13px] font-bold text-white shadow-[0_0_0_4px_rgba(46,91,255,.25),0_8px_20px_-6px_rgba(11,27,51,.5)]"
      style={{ left: `${x}%`, top: `${y}%` }}>
      <span className="absolute inset-0 rounded-full bg-cobalt/40 motion-safe:animate-[ping_2.4s_cubic-bezier(0,0,.2,1)_infinite]" />
      <span className="relative">{n}</span>
    </span>
  );
}

export default function WebProposal({ content: p, preview, phone }: Props) {
  const t = useT();
  const { lang } = useLang();
  const d = p.domain;
  const points = p.observed.points.map((pt, i) => ({ ...pt, n: i + 1 }));
  const nav: [string, string][] = [
    [t(web.sections.observed), "opgevallen"], [t(web.sections.beforeAfter), "voor-na"], [t(web.sections.concept), "concept"],
    [t(web.sections.mobile), "mobiel"], [t(web.sections.pilot), "voorstel"],
  ];

  return (
    <div lang={lang}>
      {/* Hero: the new site, on their screens */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_75%_45%,rgba(46,91,255,.32),transparent_70%),radial-gradient(40%_50%_at_10%_100%,rgba(238,46,36,.14),transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_70%_at_60%_40%,#000,transparent)]" />
        <div className="frame frame-dark grid items-center gap-4 pb-10 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.2fr] lg:gap-6 lg:pb-20 lg:pt-24">
          <div className="relative z-10">
            <Reveal><p className="font-mono text-[12.5px] uppercase tracking-[0.1em] text-white/60">{t(p.hero.eyebrow)}</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[44px] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-[68px] lg:text-[76px]">
                <span className="block">{t(p.hero.title)[0]}</span>
                <span className="block bg-gradient-to-r from-white via-peri to-[#ff8a80] bg-clip-text text-transparent">{t(p.hero.title)[1]}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15px] font-medium text-white/90">{t(p.hero.thanks)}</p>
              <p className="mt-2 max-w-[520px] text-[16.5px] leading-[1.65] text-white/70">{t(p.hero.intro)}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <a href="#concept" className="btn-primary focus-ring">{t(web.hero.primary)} <ArrowRight className="h-4 w-4" /></a>
              <a href={main("/contact", lang)} className="btn focus-ring border border-white/25 text-white hover:bg-white/10">{t(web.hero.secondary)}</a>
            </Reveal>
          </div>
          <DeviceShowcase desktop={p.shots.conceptDesktop} mobile={p.shots.conceptMobile} fold={p.shots.conceptDesktopFold}
            alt={t(web.hero.alt)(d)} className="-mx-2 h-[300px] sm:h-[440px] lg:-mr-10 lg:h-[540px]" />
        </div>
      </section>

      {/* Section nav */}
      <nav aria-label={t(web.nav.label)} className="sticky top-[68px] z-30 border-b border-line bg-white/90 backdrop-blur">
        <ul className="frame frame-light flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {nav.map(([label, id]) => (
            <li key={id}><a href={`#${id}`} className="focus-ring inline-flex h-9 items-center whitespace-nowrap rounded-md px-3 text-[14px] font-medium text-slate transition-colors duration-150 hover:bg-sunken hover:text-ink">{label}</a></li>
          ))}
        </ul>
      </nav>

      {/* What we noticed, pinned on their own screenshots */}
      <section id="opgevallen" className="scroll-mt-[120px] bg-white">
        <div className="frame frame-light py-16 sm:py-24">
          <Reveal>
            <h2 className={H2}>{t(web.observed.title)(d)}</h2>
            <p className={LEAD}>{t(p.observed.lead)}</p>
          </Reveal>
          <div className="mt-12 grid gap-16">
            {p.observed.screens.map((s) => {
              const items = points.filter((x) => x.screen === s.id);
              return (
                <div key={s.id} className="grid items-start gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
                  <Reveal as="figure" className="m-0">
                    <div className="relative overflow-hidden rounded-[14px] border border-ink/[0.1] shadow-[0_30px_60px_-45px_rgba(11,27,51,.6)]">
                      <Image src={s.image} alt={t(s.alt)} sizes="(min-width: 1024px) 640px, 100vw" className="h-auto w-full" />
                      {items.map((it) => <Pin key={it.n} n={it.n} x={it.x} y={it.y} />)}
                    </div>
                    <figcaption className={`mt-3 ${MONO} text-slate`}>{t(s.caption)} · {d}</figcaption>
                  </Reveal>
                  <Stagger as="ol" className="grid gap-6 lg:pt-4">
                    {items.map((it) => (
                      <StaggerItem as="li" key={it.n} className="grid grid-cols-[32px_1fr] gap-4">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-ice font-mono text-[13px] font-bold text-cobalt">{it.n}</span>
                        <div>
                          <h3 className="font-display text-[19px] font-bold leading-[1.3] tracking-[-0.01em]">{t(it.title)}</h3>
                          <p className="mt-2 text-[15.5px] leading-[1.6] text-slate">{t(it.body)}</p>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section id="voor-na" className="scroll-mt-[120px] border-t border-line bg-sunken">
        <div className="frame frame-light py-16 sm:py-24">
          <Reveal>
            <h2 className={H2}>{t(web.beforeAfter.title)}</h2>
            <p className={LEAD}>{t(web.beforeAfter.lead)}</p>
          </Reveal>
          <Reveal className="mt-10">
            <BeforeAfter before={p.shots.currentHome} after={p.shots.conceptDesktopFold}
              beforeLabel={t(web.beforeAfter.before)} afterLabel={t(web.beforeAfter.after)}
              beforeAlt={t(web.beforeAfter.beforeAlt)(d)} afterAlt={t(web.beforeAfter.afterAlt)(d)} sliderLabel={t(web.beforeAfter.slider)} />
          </Reveal>
        </div>
      </section>

      {/* The live concept */}
      <section id="concept" className="scroll-mt-[120px] border-t border-line bg-white">
        <div className="frame frame-light py-16 sm:py-24">
          <Reveal>
            <h2 className={H2}>{t(web.concept.title)}</h2>
            <p className={LEAD}>{t(web.concept.lead)}</p>
          </Reveal>
          <div className="mt-10">{preview}</div>
        </div>
      </section>

      {/* Mobile, today next to the concept */}
      <section id="mobiel" className="scroll-mt-[120px] border-t border-line bg-[linear-gradient(180deg,#f5f7fb,#eaeefa)]">
        <div className="frame frame-light grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center">
          <div className="flex items-end justify-center gap-6">
            <figure className="m-0 hidden w-[240px] shrink-0 md:block">
              <figcaption className={`mb-3 text-center ${MONO} text-slate`}>{t(web.mobile.now)}</figcaption>
              <div className="rounded-[38px] bg-[#0d0f14] p-[8px] opacity-90 shadow-[0_30px_60px_-40px_rgba(11,27,51,.6)]">
                <div className="overflow-hidden rounded-[30px] bg-white">
                  <Image src={p.shots.currentMobile} alt={t(web.mobile.nowAlt)(d)} sizes="240px" className="h-auto w-full" />
                </div>
              </div>
            </figure>
            <div className="w-full max-w-[340px] shrink-0">
              <p className={`mb-3 text-center ${MONO} text-cobalt`}>{t(web.mobile.next)}</p>
              {phone}
            </div>
          </div>
          <div>
            <Reveal>
              <h2 className={H2}>{t(web.mobile.title)}</h2>
              <p className={LEAD}>{t(p.mobile.lead)}</p>
            </Reveal>
            <Stagger as="ul" className="mt-8 grid gap-5">
              {p.mobile.points.map((pt) => (
                <StaggerItem as="li" key={pt.title.nl} className="grid grid-cols-[28px_1fr] gap-4">
                  <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-ok-soft text-ok-ink"><Check className="h-4 w-4" /></span>
                  <div>
                    <h3 className="font-display text-[17.5px] font-bold leading-[1.3]">{t(pt.title)}</h3>
                    <p className="mt-1 text-[15px] leading-[1.6] text-slate">{t(pt.body)}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* What changes */}
      <section className="border-t border-line bg-white">
        <div className="frame frame-light py-16 sm:py-24">
          <Reveal><h2 className={H2}>{t(web.changes.title)}</h2></Reveal>
          <Stagger className="mt-10 overflow-hidden rounded-[16px] border border-line">
            <div className={`hidden grid-cols-2 border-b border-line bg-sunken ${MONO} text-slate sm:grid`}>
              <p className="px-6 py-3">{t(web.changes.head)[0]}</p><p className="border-l border-line px-6 py-3 text-cobalt">{t(web.changes.head)[1]}</p>
            </div>
            {t(p.changes).map(([now, next], i) => (
              <StaggerItem key={now} className={`grid sm:grid-cols-2 ${i ? "border-t border-line" : ""}`}>
                <p className="px-6 pb-1 pt-5 text-[15.5px] leading-[1.55] text-slate sm:py-5"><span className="sr-only">{t(web.changes.head)[0]}: </span>{now}</p>
                <p className="flex gap-3 px-6 pb-5 pt-1 text-[15.5px] font-medium leading-[1.55] sm:border-l sm:border-line sm:py-5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-ok" /><span><span className="sr-only">{t(web.changes.head)[1]}: </span>{next}</span>
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Pilot */}
      <section id="voorstel" className="relative isolate scroll-mt-[120px] overflow-hidden bg-ink text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_20%,rgba(46,91,255,.28),transparent_70%)]" />
        <div className="frame frame-dark grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className={`${H2} text-white`}>{t(p.pilot.title)}</h2>
            <p className="mt-5 max-w-[60ch] text-[16.5px] leading-[1.7] text-white/75">{t(p.pilot.body)}</p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur sm:p-9">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/55">{t(web.pilot.stepsTitle)}</p>
            <Stagger as="ol" className="mt-5 grid gap-5">
              {t(p.pilot.steps).map((s, i) => (
                <StaggerItem as="li" key={s} className="grid grid-cols-[32px_1fr] items-start gap-3 text-[16px] leading-[1.5]">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-cobalt font-mono text-[13px] font-bold">{i + 1}</span>
                  <span className="pt-1 text-white/90">{s}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-7 border-t border-white/10 pt-5 text-[15px] leading-[1.55] text-white/70">{t(p.pilot.price)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a href={main("/contact", lang)} className="btn-primary focus-ring">{t(web.pilot.cta)} <ArrowRight className="h-4 w-4" /></a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="focus-ring inline-flex items-center gap-2 rounded text-[14.5px] text-white/75 underline-offset-4 hover:text-white hover:underline">
                <Mail className="h-4 w-4" />{t(web.pilot.mail)} {CONTACT_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
