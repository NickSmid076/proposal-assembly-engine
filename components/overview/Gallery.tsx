"use client";
// Filterable card grid for /overview. Filters live in the URL (?offer=web&status=bekeken&q=…&sort=views)
// so a filtered view can be bookmarked. Leads arrive as props from the server page; never import
// content/leads here (see lib/leads.ts).
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId } from "react";
import Thumb from "./Thumb";
import { ArrowRight, Eye, Icon } from "@/components/icons";
import { OFFERS, OFFER_LABEL, STATUSES, STATUS_LABEL, formatDate, type Lead, type Offer, type Status } from "@/lib/leads";

const SORTS = { nieuwste: "Nieuwste", views: "Meeste views" } as const;
type Sort = keyof typeof SORTS;

const pick = <T extends string>(v: string | null, allowed: readonly T[]) => (allowed as readonly string[]).includes(v ?? "") ? (v as T) : null;

/** Status pill colours. Text/background pairs meet WCAG AA at 12px. */
const STATUS_CLS: Record<Status, string> = {
  verstuurd: "bg-sunken text-slate ring-line",
  bekeken: "bg-ice text-[#2347CC] ring-peri/60",
  reactie: "bg-warn-soft text-[#7A4F0F] ring-[#EBD7B0]",
  pilot: "bg-ok-soft text-ok-ink ring-[#BFE6CF]",
};

function Pills<T extends string>({ label, options, labels, value, onChange }: {
  label: string; options: readonly T[]; labels: Record<T, string>; value: T | null; onChange: (v: T | null) => void;
}) {
  const id = useId();
  const pill = (active: boolean) =>
    `focus-ring inline-flex h-9 items-center rounded-full border px-3.5 text-[14px] font-medium transition-colors duration-150 ${
      active ? "border-ink bg-ink text-white" : "border-line-2 bg-white text-ink hover:border-ink/40"}`;
  return (
    <div role="group" aria-labelledby={id} className="flex flex-wrap items-center gap-2">
      <span id={id} className="w-full shrink-0 font-mono sm:mr-1 sm:w-[76px] text-[11px] uppercase tracking-[0.1em] text-slate">{label}</span>
      <button type="button" aria-pressed={value === null} onClick={() => onChange(null)} className={pill(value === null)}>Alle</button>
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(value === o ? null : o)} className={pill(value === o)}>{labels[o]}</button>
      ))}
    </div>
  );
}

function Card({ lead }: { lead: Lead }) {
  return (
    <Link href={`/v/${lead.slug}`} className="focus-ring group flex w-full flex-col rounded-[18px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)] motion-safe:hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-ink/[0.08] bg-paper transition-shadow duration-300 group-hover:shadow-[0_24px_50px_-30px_rgba(11,27,51,.55)]">
        <Thumb slug={lead.slug} firm={lead.firm} offer={lead.offer} className="absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.05]" />
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-ink backdrop-blur">{OFFER_LABEL[lead.offer]}</span>
      </div>
      <div className="flex flex-1 flex-col px-0.5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] transition-colors group-hover:text-cobalt">{lead.firm}</h2>
          <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[12px] font-semibold ring-1 ring-inset ${STATUS_CLS[lead.status]}`}>{STATUS_LABEL[lead.status]}</span>
        </div>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[14px] text-slate">
          <span>{lead.town}</span>
          <span aria-hidden className="text-line-2">·</span>
          <span className="rounded border border-line px-1.5 font-mono text-[11.5px] leading-[18px] text-ink"><span className="sr-only">ICP </span>{lead.icp}</span>
        </p>
        {lead.notes && <p className="mt-2 line-clamp-2 text-[13.5px] leading-[1.45] text-slate">{lead.notes}</p>}
        <div aria-hidden className="h-4 shrink-0" /><div className="mt-auto flex items-center justify-between border-t border-line pt-3 font-mono text-[11.5px] uppercase tracking-[0.06em] text-slate">
          <span>Verstuurd op <time dateTime={lead.sentAt} className="text-ink">{formatDate(lead.sentAt)}</time></span>
          <span className="inline-flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5" /><span className="text-ink">{lead.views}</span> {lead.views === 1 ? "view" : "views"}
            <ArrowRight className="ml-1 h-3.5 w-3.5 text-cobalt opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Gallery({ leads }: { leads: Lead[] }) {
  const params = useSearchParams();
  const offer = pick<Offer>(params.get("offer"), OFFERS);
  const status = pick<Status>(params.get("status"), STATUSES);
  const sort: Sort = params.get("sort") === "views" ? "views" : "nieuwste";
  const q = params.get("q") ?? "";

  // Next keeps useSearchParams in sync with history.replaceState, without a server round trip.
  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    const qs = next.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  };
  const clear = () => window.history.replaceState(null, "", window.location.pathname);

  const needle = q.trim().toLocaleLowerCase("nl");
  const shown = leads
    .filter((l) => (!offer || l.offer === offer) && (!status || l.status === status) && (!needle || l.firm.toLocaleLowerCase("nl").includes(needle)))
    .sort((a, b) => sort === "views" ? b.views - a.views || b.sentAt.localeCompare(a.sentAt) : b.sentAt.localeCompare(a.sentAt));
  const filtered = Boolean(offer || status || needle);

  return (
    <>
      <div className="border-y border-ink/[0.08] py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <Pills label="Aanbod" options={OFFERS} labels={OFFER_LABEL} value={offer} onChange={(v) => set("offer", v)} />
            <Pills label="Status" options={STATUSES} labels={STATUS_LABEL} value={status} onChange={(v) => set("status", v)} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <label className="relative block w-full sm:max-w-[320px] lg:w-[280px]">
              <span className="sr-only">Zoek op kantoornaam</span>
              <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
              <input type="search" value={q} onChange={(e) => set("q", e.target.value || null)} placeholder="Zoek op kantoor"
                className="focus-ring h-10 w-full rounded-md border border-line-2 bg-white pl-9 pr-3 text-[15px] text-ink placeholder:text-slate" />
            </label>
            <div role="group" aria-label="Sorteren" className="inline-flex shrink-0 self-start rounded-md border border-line-2 p-0.5 sm:self-auto">
              {(Object.keys(SORTS) as Sort[]).map((s) => (
                <button key={s} type="button" aria-pressed={sort === s} onClick={() => set("sort", s === "nieuwste" ? null : s)}
                  className={`focus-ring h-8 rounded px-3 text-[13.5px] font-medium transition-colors ${sort === s ? "bg-sunken text-ink" : "text-slate hover:text-ink"}`}>
                  {SORTS[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-5 font-mono text-[12px] uppercase tracking-[0.08em] text-slate">
        <p aria-live="polite">{filtered ? `${shown.length} van ${leads.length} voorstellen` : `${leads.length} voorstellen`}</p>
        {filtered && <button type="button" onClick={clear} className="focus-ring rounded-sm text-cobalt underline-offset-4 hover:underline">Filters wissen</button>}
      </div>

      {shown.length ? (
        <ul data-stagger="" className="grid gap-x-6 gap-y-12 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {/* RevealObserver can mark a card shown before hydration; that attribute is meant to stay. */}
          {shown.map((l) => <li key={l.slug} data-reveal="" suppressHydrationWarning className="flex"><Card lead={l} /></li>)}
        </ul>
      ) : (
        <div className="mb-24 rounded-[18px] border border-dashed border-line-2 bg-sunken px-6 py-16 text-center">
          <p className="font-display text-[20px] font-bold">Geen voorstellen gevonden</p>
          <p className="mx-auto mt-2 max-w-[380px] text-[15px] leading-[1.5] text-slate">Geen enkel voorstel past bij deze combinatie van filters{needle ? ` en de zoekterm “${q.trim()}”` : ""}.</p>
          <button type="button" onClick={clear} className="btn-primary focus-ring mt-6 h-11">Filters wissen</button>
        </div>
      )}
    </>
  );
}
