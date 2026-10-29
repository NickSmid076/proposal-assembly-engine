"use client";
// The whole concept site: header, current page, footer and bottom dock. Page state is controlled by the
// parent (the preview frame's tabs). Must sit inside an element with `data-scroll` (the frame's scroll area)
// and inside `.rvl-screen` (the container that the layout's container queries measure).
import { useEffect, useRef, useState } from "react";
import { RvlDock, RvlFooter, RvlHeader } from "./RvlChrome";
import RvlHome from "./RvlHome";
import RvlAanbod from "./RvlAanbod";
import RvlWaardebepaling from "./RvlWaardebepaling";
import type { RvlFirm, RvlPage, Go, Prefill } from "./types";
import "./rvl.css";

type Props = {
  firm: RvlFirm; fontClass: string; page: RvlPage; onPage: (p: RvlPage) => void;
  /** No motion: used for screenshots, and motion is also off under reduced motion. */
  still?: boolean;
  cookie?: boolean;
};

export default function RvlSite({ firm, fontClass, page, onPage, still: forceStill = false, cookie = true }: Props) {
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
      for (const e of entries) if (e.isIntersecting) { (e.target as HTMLElement).dataset.rvlIn = "1"; io.unobserve(e.target); }
    }, { root: el.closest("[data-scroll]"), threshold: 0.1 });
    el.querySelectorAll<HTMLElement>("[data-r]").forEach((n) => {
      if (n.dataset.rvlIn === "1") return;
      const row = [...(n.parentElement?.children ?? [])].filter((s) => s.hasAttribute("data-r"));
      n.style.setProperty("--i", String(Math.max(0, row.indexOf(n)) % 4));
      n.dataset.rvlIn = "0";
      io.observe(n);
    });
    return () => io.disconnect();
  }, [page, still]);

  return (
    <div ref={root} className={`rvl ${fontClass} ${still ? "" : "rvl-anim"}`}>
      <RvlHeader firm={firm} page={page} go={go} />
      <main key={page} className="rvl-page">
        {page === "home" && <RvlHome firm={firm} go={go} />}
        {page === "aanbod" && <RvlAanbod firm={firm} go={go} />}
        {page === "waardebepaling" && <RvlWaardebepaling firm={firm} go={go} prefill={prefill} />}
      </main>
      <RvlFooter firm={firm} page={page} go={go} />
      <RvlDock firm={firm} page={page} go={go} cookie={cookie} />
    </div>
  );
}
