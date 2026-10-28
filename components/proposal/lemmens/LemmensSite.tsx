"use client";
// The whole concept site: header, current page, footer and bottom dock. Page state is controlled by the
// parent (the preview frame's tabs). Must sit inside an element with `data-scroll` (the frame's scroll area)
// and inside `.lm-screen` (the container that the layout's container queries measure).
import { useEffect, useRef, useState } from "react";
import { LemmensDock, LemmensFooter, LemmensHeader } from "./LemmensChrome";
import LemmensHome from "./LemmensHome";
import LemmensAanbod from "./LemmensAanbod";
import LemmensWaardebepaling from "./LemmensWaardebepaling";
import type { Go, LemmensFirm, LemmensPage, Prefill } from "./types";
import "./lemmens.css";

type Props = {
  firm: LemmensFirm; fontClass: string; page: LemmensPage; onPage: (p: LemmensPage) => void;
  /** No motion at all: used for screenshots, and set automatically under reduced motion. */
  still?: boolean;
  cookie?: boolean;
};

export default function LemmensSite({ firm, fontClass, page, onPage, still: forceStill = false, cookie = true }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [prefill, setPrefill] = useState<Prefill | undefined>();
  const [anim, setAnim] = useState(false);
  const still = forceStill || !anim;

  const go: Go = (p, pre) => {
    setPrefill(pre);
    onPage(p);
    root.current?.closest("[data-scroll]")?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (forceStill || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnim(true);
  }, [forceStill]);

  // Blocks marked data-r rise once as they scroll into view inside the frame (small stagger per row).
  useEffect(() => {
    const el = root.current;
    if (!el || still) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).dataset.lmIn = "1"; io.unobserve(e.target); }
    }, { root: el.closest("[data-scroll]"), threshold: 0.1 });
    el.querySelectorAll<HTMLElement>("[data-r]").forEach((n) => {
      if (n.dataset.lmIn === "1") return;
      const row = [...(n.parentElement?.children ?? [])].filter((s) => s.hasAttribute("data-r"));
      n.style.setProperty("--i", String(Math.max(0, row.indexOf(n)) % 4));
      n.dataset.lmIn = "0";
      io.observe(n);
    });
    return () => io.disconnect();
  }, [page, still]);

  return (
    <div ref={root} className={`lm ${fontClass} ${still ? "" : "lm-anim"}`}>
      <LemmensHeader firm={firm} page={page} go={go} />
      <main key={page} className="lm-page">
        {page === "home" && <LemmensHome firm={firm} go={go} still={still} />}
        {page === "aanbod" && <LemmensAanbod firm={firm} go={go} />}
        {page === "waardebepaling" && <LemmensWaardebepaling firm={firm} go={go} prefill={prefill} />}
      </main>
      <LemmensFooter firm={firm} page={page} go={go} />
      <LemmensDock firm={firm} page={page} go={go} cookie={cookie} />
    </div>
  );
}
