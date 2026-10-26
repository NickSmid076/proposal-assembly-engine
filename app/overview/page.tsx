import type { Metadata } from "next";
import { Suspense } from "react";
import Gallery from "@/components/overview/Gallery";
import { leads } from "@/content/leads";
import { Reveal, SplitHeading } from "@/lib/motion";

export const metadata: Metadata = { title: "Voorstellen" };
// Behind the password cookie (middleware), so always render per request.
export const dynamic = "force-dynamic";

export default function Overview() {
  return (
    <section className="bg-white">
      <div className="frame frame-light pt-14 sm:pt-20">
        <div className="flex flex-col gap-8 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal><p className="eyebrow">Voorstellen</p></Reveal>
            <SplitHeading as="h1" className="mt-4 max-w-[720px] text-[34px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[56px]"
              segments={[{ text: "Elk voorstel," }, { text: "op één plek.", className: "text-slate" }]} />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[560px] text-[16px] leading-[1.55] text-slate sm:text-[17px]">
                Privé overzicht van alle persoonlijke voorstellen die na een reactie zijn verstuurd. Niet openbaar en niet vindbaar in zoekmachines.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="flex items-baseline gap-2 lg:pb-2">
            <span className="font-display text-[56px] font-extrabold leading-none tracking-[-0.04em] sm:text-[72px]">{leads.length}</span>
            <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-slate">voorstellen</span>
          </Reveal>
        </div>
        <Suspense>
          <Gallery leads={leads} />
        </Suspense>
      </div>
    </section>
  );
}
