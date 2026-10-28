import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLead, leads } from "@/content/leads";
import { OFFER_LABEL } from "@/lib/leads";
import { main } from "@/lib/site";
import { ArrowRight } from "@/components/icons";
import { Reveal, SplitHeading } from "@/lib/motion";
import { PROPOSALS } from "@/components/proposal/registry";

// Prospect-facing page. Show only what the prospect may see: never status, views, ICP or notes.
// Do not link to /overview or to other proposals from here.

export const dynamicParams = false; // unknown slugs → 404
export const generateStaticParams = () => leads.map((l) => ({ slug: l.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lead = getLead((await params).slug);
  return lead ? { title: `Voorstel voor ${lead.firm}` } : {};
}

export default async function Proposal({ params }: Props) {
  const lead = getLead((await params).slug);
  if (!lead) notFound();
  // Finished proposals (components/proposal/registry.tsx). Web proposals share one template.
  const Custom = PROPOSALS[lead.slug]?.Page;
  if (Custom) return <Custom />;

  // Not ready yet: "in preparation" stub. TODO: templates for the dashboards and automatisering offers.
  return (
    <section className="bg-white">
      <div className="frame frame-light pb-28 pt-16 sm:pt-24">
        <Reveal><p className="eyebrow">Voorstel · {OFFER_LABEL[lead.offer]}</p></Reveal>
        <SplitHeading as="h1" className="mt-4 max-w-[820px] text-[34px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[56px]"
          segments={[{ text: `Voorstel voor ${lead.firm}.` }, { text: `Opgesteld voor uw kantoor in ${lead.town}.`, className: "text-slate" }]} />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[600px] text-[17px] leading-[1.6] text-slate">
            Dank voor uw reactie. Op deze pagina leest u binnenkort ons voorstel voor {lead.firm}: wat we zien, wat we zouden bouwen en wat het u oplevert.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 rounded-[18px] border border-dashed border-line-2 bg-sunken p-8 sm:p-10">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-slate">In voorbereiding</p>
          <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55]">Dit voorstel wordt op dit moment voor u uitgewerkt. Wilt u er alvast over praten? Plan dan een kort gesprek in.</p>
          <a href={main("/contact")} className="btn-primary focus-ring mt-6">Plan een gesprek <ArrowRight className="h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>
  );
}
