import type { Metadata } from "next";
import { main } from "@/lib/site";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = { title: "Pagina niet gevonden" };

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="frame frame-light flex min-h-[60vh] flex-col justify-center py-24">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 max-w-[640px] text-[32px] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[48px]">
          Deze pagina bestaat niet. <span className="text-slate">Misschien is de link niet volledig overgenomen.</span>
        </h1>
        <p className="mt-5 max-w-[520px] text-[17px] leading-[1.55] text-slate">Controleer de link in uw e-mail, of neem contact met ons op als het probleem blijft.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={main()} className="btn-primary focus-ring">Naar assembly-engine.com <ArrowRight className="h-4 w-4" /></a>
          <a href={main("/contact")} className="btn focus-ring border border-line-2 text-ink hover:border-ink/40">Contact</a>
        </div>
      </div>
    </section>
  );
}
