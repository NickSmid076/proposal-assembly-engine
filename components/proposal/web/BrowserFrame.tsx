"use client";
// Browser-window frame for live concept previews on a proposal page: page tabs, an address bar,
// and a desktop / mobile toggle (controlled by the parent). The content inside scrolls on its own;
// the scroll area carries `data-scroll` so content can observe it.
// Mockups that should switch layout with the toggle use container queries, not media queries.
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Tab<T extends string> = { id: T; label: string; url: string };
export type Device = "desktop" | "mobile";
type Labels = { tablist: string; device: string; desktop: string; mobile: string };

const SPRING = { type: "spring", stiffness: 420, damping: 36 } as const;
const NL: Labels = { tablist: "Pagina in het concept", device: "Weergave", desktop: "Desktop", mobile: "Mobiel" };

/** Segmented control whose active pill slides between options (state change made visible). */
function Segments<T extends string>({ id, options, value, onChange, label, role }: {
  id: string; options: { id: T; label: string }[]; value: T; onChange: (v: T) => void; label: string; role: "tablist" | "group";
}) {
  const reduce = useReducedMotion();
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (role !== "tablist" || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
    const next = options[(i + (e.key === "ArrowRight" ? 1 : options.length - 1)) % options.length];
    onChange(next.id);
    document.getElementById(`${id}-${next.id}`)?.focus();
  };
  return (
    <div role={role} aria-label={label} className="inline-flex max-w-full gap-1 overflow-x-auto rounded-[12px] border border-line-2 bg-white p-1">
      {options.map((o, i) => {
        const on = o.id === value;
        return (
          <button key={o.id} id={`${id}-${o.id}`} type="button" onClick={() => onChange(o.id)} onKeyDown={(e) => onKey(e, i)}
            {...(role === "tablist" ? { role: "tab", "aria-selected": on, "aria-controls": "bf-panel", tabIndex: on ? 0 : -1 } : { "aria-pressed": on })}
            className={`focus-ring relative h-10 shrink-0 cursor-pointer rounded-lg px-4 text-[14px] font-medium transition-colors duration-150 ${on ? "text-white" : "text-ink hover:bg-ink/[0.06]"}`}>
            {on && <motion.span layoutId={`${id}-pill`} transition={reduce ? { duration: 0 } : SPRING} className="absolute inset-0 rounded-lg bg-ink" />}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function BrowserFrame<T extends string>({ tabs, active, onChange, device, onDeviceChange, children, screenClassName = "", labels = NL }: {
  tabs: Tab<T>[]; active: T; onChange: (id: T) => void; device: Device; onDeviceChange: (d: Device) => void;
  children: ReactNode; screenClassName?: string; labels?: Labels;
}) {
  const screen = useRef<HTMLDivElement>(null);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const mobile = device === "mobile";

  // New page or device: start at the top, like a real page load.
  useEffect(() => { screen.current?.scrollTo({ top: 0 }); }, [active, device]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Segments id="bf-tab" role="tablist" label={labels.tablist} options={tabs} value={active} onChange={onChange} />
        <div className="hidden sm:block">
          <Segments id="bf-device" role="group" label={labels.device} value={device} onChange={onDeviceChange}
            options={[{ id: "desktop", label: labels.desktop }, { id: "mobile", label: labels.mobile }]} />
        </div>
      </div>

      <div className={mobile ? "sm:flex sm:justify-center sm:rounded-[24px] sm:bg-[radial-gradient(ellipse_at_top,#e9eefb,#f5f7fb_70%)] sm:py-12" : ""}>
        <div key={device} className={`overflow-hidden bg-white motion-safe:animate-fade ${mobile
          ? "w-full rounded-[16px] border border-ink/[0.12] sm:w-[392px] sm:rounded-[48px] sm:border-[11px] sm:border-[#0d0f14] sm:shadow-[0_50px_90px_-40px_rgba(11,27,51,.55)]"
          : "rounded-[16px] border border-ink/[0.12] shadow-[0_40px_80px_-50px_rgba(11,27,51,.55)]"}`}>
          {!mobile && (
            <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-3" aria-hidden>
              <span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
              <span className="mx-auto flex w-full max-w-[440px] items-center justify-center gap-2 truncate rounded-lg bg-white px-3 py-1.5 text-center font-mono text-[12px] text-slate ring-1 ring-line">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                {current.url}
              </span>
              <span className="w-[52px]" />
            </div>
          )}
          {mobile && <div aria-hidden className="hidden h-[34px] sm:block" />}
          <div id="bf-panel" role="tabpanel" aria-labelledby={`bf-tab-${current.id}`} ref={screen} tabIndex={0} data-scroll
            className={`${screenClassName} overflow-y-auto overscroll-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-peri ${mobile ? "h-[680px] sm:h-[720px] [scrollbar-width:none]" : "h-[680px] sm:h-[780px]"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
