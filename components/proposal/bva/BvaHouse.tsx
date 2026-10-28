"use client";
// The house on the valuation page. It is built step by step as the visitor fills in the form:
//   stage 0 plot (dashed footprint) · 1 walls rise, shaped by the chosen house type · 2 the green BVA roof lands
//   · 3 request sent, lights on.
// The roof is the roof of BVA's own logo, extruded. The 3D version (three.js) loads only when the stage is in
// view inside the preview frame. Under `still` (screenshots), without WebGL, or until the 3D is ready, a flat
// SVG elevation of the same house is shown. Under reduced motion the 3D jumps to each state without animating.
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FLOOR, LIT_FLAT, layout, roofHeight, roofOutline } from "./houseModel";
import type { BuildStage, HouseType } from "./types";

const BvaHouse3D = dynamic(() => import("./BvaHouse3D"), { ssr: false, loading: () => null });

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

export default function BvaHouse({ stage, type, still, label }: { stage: BuildStage; type: HouseType; still: boolean; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [can3d, setCan3d] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (still) return;
    setCan3d(webglAvailable());
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [still]);

  // Only render WebGL while the stage is on screen inside the frame's scroll area.
  useEffect(() => {
    const el = box.current;
    if (!el || !can3d) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { root: el.closest("[data-scroll]"), threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [can3d]);

  const show3d = can3d && !still;
  return (
    <div ref={box} className="bva-stage-view" role="img" aria-label={label}>
      <HouseSvg stage={stage} type={type} hidden={show3d && ready} />
      {show3d && (visible || ready) && (
        <BvaHouse3D stage={stage} type={type} reduced={reduced} active={visible} onReady={() => setReady(true)} />
      )}
    </div>
  );
}

/** Flat front elevation of the same house, for screenshots and browsers without WebGL. */
function HouseSvg({ stage, type, hidden }: { stage: BuildStage; type: HouseType; hidden: boolean }) {
  const units = layout(type);
  const S = 56; // px per scene unit
  const W = 400, H = 300, ground = 262;
  const roof = roofOutline();
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden style={{ opacity: hidden ? 0 : 1, transition: "opacity .4s" }}>
      <rect x={20} y={ground} width={W - 40} height={8} fill="#cdd1ca" />
      {units.map((u, i) => {
        const x0 = W / 2 + (u.x - u.w / 2) * S, w = u.w * S, h = u.floors * FLOOR * S;
        const top = ground - h;
        if (stage === 0) {
          return <rect key={i} x={x0 + 2} y={ground - 6} width={w - 4} height={6} fill={u.lit ? "#63a70a" : "none"} stroke="#3a7310" strokeDasharray="5 4" opacity={u.lit ? 0.55 : 0.6} />;
        }
        const rw = w + 8, rh = roofHeight(u.w) * S;
        const wall = u.lit ? "#fbfbf8" : "#d6d9d2";
        const glass = stage === 3 && u.lit ? "#ffd27a" : "#2a3530";
        const windows = [];
        for (let f = 0; f < u.floors; f++) {
          for (let b = 0; b < u.bays; b++) {
            const bw = w / u.bays;
            const flat = type === "appartement" && f === LIT_FLAT.floor && b === LIT_FLAT.bay;
            const g = type === "appartement" ? (flat && stage === 3 ? "#ffd27a" : "#2a3530") : glass;
            windows.push(<rect key={`${f}-${b}`} x={x0 + b * bw + bw * 0.28} y={ground - (f + 1) * FLOOR * S + FLOOR * S * 0.22} width={bw * 0.44} height={FLOOR * S * 0.5} fill={g} />);
            if (flat) windows.push(<rect key="balcony" x={x0 + b * bw + bw * 0.12} y={ground - f * FLOOR * S - 7} width={bw * 0.76} height={6} fill="#63a70a" />);
          }
        }
        return (
          <g key={i}>
            <rect x={x0} y={top} width={w} height={h} fill={wall} stroke="#101714" strokeWidth={1.2} />
            {windows}
            {stage >= 2 && (
              <polygon fill={u.lit ? "#63a70a" : "#a9b0a6"} stroke="#101714" strokeWidth={1}
                points={roof.map(([rx, ry]) => `${x0 + w / 2 + rx * rw},${top - ry * (rh / Math.max(...roof.map((p) => p[1])))}`).join(" ")} />
            )}
          </g>
        );
      })}
    </svg>
  );
}
