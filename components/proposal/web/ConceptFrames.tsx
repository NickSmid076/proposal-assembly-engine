"use client";
// Frames that every concept site is shown in. A concept supplies its pages and a render function;
// the frames own page state, scrolling and the desktop / mobile switch.
//
// Contract for a concept site (see components/proposal/lemmens/ for the reference one):
// - Its root sits inside `.<prefix>-screen`-style container: the frames give the scroll area `data-scroll`,
//   and the concept's own CSS should use container queries on the element with the class passed as `screenClassName`.
// - It takes `page` and `onPage` so the frame tabs and the concept's own links stay in sync.
// - It accepts `still` (no motion, used for screenshots) and `cookie` (show its cookie bar or not).
import { useEffect, useState, type ReactNode } from "react";
import { useT, type L } from "@/lib/lang";
import BrowserFrame, { type Device } from "./BrowserFrame";
import { web } from "./copy";

export type ConceptPage<P extends string> = { id: P; url: string; label: L };
type Render<P extends string> = (page: P, setPage: (p: P) => void) => ReactNode;

/** The concept in a browser window with page tabs and a desktop / mobile toggle. */
export function ConceptPreview<P extends string>({ pages, screenClassName, children }: {
  pages: ConceptPage<P>[]; screenClassName: string; children: Render<P>;
}) {
  const t = useT();
  const [page, setPage] = useState<P>(pages[0].id);
  const [device, setDevice] = useState<Device>("desktop");
  return (
    <BrowserFrame tabs={pages.map((p) => ({ id: p.id, url: p.url, label: t(p.label) }))} active={page} onChange={setPage}
      device={device} onDeviceChange={setDevice} screenClassName={screenClassName}
      labels={{ tablist: t(web.concept.tablist), device: t(web.concept.device), desktop: t(web.concept.desktop), mobile: t(web.concept.mobile) }}>
      {children(page, setPage)}
    </BrowserFrame>
  );
}

/** The concept on its own inside a phone outline, with its own page state. */
export function PhoneFrame<P extends string>({ first, screenClassName, children }: {
  first: P; screenClassName: string; children: Render<P>;
}) {
  const t = useT();
  const [page, setPage] = useState<P>(first);
  return (
    <div className="relative mx-auto w-full max-w-[340px] rounded-[46px] bg-[#0d0f14] p-[10px] shadow-[0_40px_80px_-40px_rgba(11,27,51,.6)] ring-1 ring-black/10">
      <div className="overflow-hidden rounded-[36px] bg-white">
        {/* Status bar with the camera island; the page scrolls below it. */}
        <div aria-hidden className="relative flex h-[38px] items-center justify-between px-7 text-[12px] font-semibold text-[#17120f]">
          <span>9:41</span><span className="absolute left-1/2 top-[9px] h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-[#0d0f14]" /><span>5G</span>
        </div>
        <div data-scroll tabIndex={0} role="region" aria-label={t(web.mobile.next)}
          className={`${screenClassName} h-[620px] overflow-y-auto overscroll-contain [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-peri`}>
          {children(page, setPage)}
        </div>
      </div>
    </div>
  );
}

/**
 * Full-width render of a concept for `npm run capture` (dev only, /dev/concept/<slug>).
 * `?w=390` sets the width. Hides the Assembly Engine header and footer, and paints the page below the
 * concept magenta so the capture script can find where the concept ends.
 */
export function CaptureFrame({ screenClassName, children }: { screenClassName: string; children: ReactNode }) {
  const [w, setW] = useState<number | undefined>();
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("w");
    if (q) setW(Number(q));
    document.querySelectorAll<HTMLElement>("body > header, body > footer").forEach((n) => (n.style.display = "none"));
    document.documentElement.style.background = document.body.style.background = "#ff00ff";
    document.querySelectorAll<HTMLElement>("nextjs-portal").forEach((n) => (n.style.display = "none"));
  }, []);
  return <div data-scroll className={screenClassName} style={{ width: w, overflow: "hidden", background: "#fff" }}>{children}</div>;
}
