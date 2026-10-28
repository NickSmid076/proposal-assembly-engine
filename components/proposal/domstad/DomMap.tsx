"use client";
// The map of Utrecht on the valuation page. It follows the visitor through the form:
//   stage 0 the whole city with the Domtoren · 1 a valid postcode: the camera flies to that wijk and it rises
//   in Domstad red · 2 a small house marks the home · 3 request sent: a red line runs from the Dom to the home.
// The 3D version (three.js) loads only when the map is in view inside the preview frame. Under `still`
// (screenshots), without WebGL, or until the 3D is ready, a flat SVG of the same map in the same state is shown.
// Under reduced motion the 3D jumps to each state without animating.
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BOUNDS, BUURTEN, litBuurten, type Place } from "./mapModel";
import type { MapStage } from "./types";

const DomMap3D = dynamic(() => import("./DomMap3D"), { ssr: false, loading: () => null });

function webglAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

export default function DomMap({ stage, place, still, label }: { stage: MapStage; place: Place | null; still: boolean; label: string }) {
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

  // Only render WebGL while the map is on screen inside the frame's scroll area.
  useEffect(() => {
    const el = box.current;
    if (!el || !can3d) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { root: el.closest("[data-scroll]"), threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [can3d]);

  const show3d = can3d && !still;
  const lit = litBuurten(place);
  return (
    <div ref={box} className="dom-map-view" role="img" aria-label={label}>
      <MapSvg lit={lit} pin={stage >= 1 ? place : null} arc={stage === 3} hidden={show3d && ready} />
      {show3d && (visible || ready) && (
        <DomMap3D stage={stage} place={place} reduced={reduced} active={visible} onReady={() => setReady(true)} />
      )}
    </div>
  );
}

const PAD = 400; // metres around the city
/** SVG path for all rings of one buurt; y is flipped (north up). */
const ringPath = (i: number) => BUURTEN[i].r.map((r) => `M${r.map(([x, y]) => `${x},${-y}`).join("L")}Z`).join("");

/**
 * Flat map of Utrecht: buurten, the 19 Domstad wijken a shade lighter, lit buurten in red, the Domtoren at the
 * origin. Optional: a pin with a line from the Dom (valuation), sold addresses as dots and a hovered wijk (home).
 */
export function MapSvg({ lit, pin, arc = false, dots, hover = -1, hidden = false, className }: {
  lit: Set<number>; pin?: { x: number; y: number } | null; arc?: boolean;
  dots?: [number, number][]; hover?: number; hidden?: boolean; className?: string;
}) {
  const { minX, maxX, minY, maxY } = BOUNDS;
  const vb = `${minX - PAD} ${-maxY - PAD} ${maxX - minX + PAD * 2} ${maxY - minY + PAD * 2}`;
  return (
    <svg viewBox={vb} className={className} aria-hidden preserveAspectRatio="xMidYMid meet"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity .5s" }}>
      <g strokeWidth={28} stroke="var(--avond)" strokeLinejoin="round">
        {BUURTEN.map((b, i) => (
          <path key={i} d={ringPath(i)}
            fill={lit.has(i) || (hover >= 0 && b.w === hover) ? "var(--rood)" : b.w >= 0 ? "var(--tile-own)" : "var(--tile)"} />
        ))}
      </g>
      {dots?.map(([x, y], i) => <circle key={i} cx={x} cy={-y} r={95} fill="#fff" stroke="var(--rood)" strokeWidth={40} />)}
      {pin && arc && <path d={`M0,0 Q${pin.x / 2},${-pin.y / 2 - Math.hypot(pin.x, pin.y) * 0.35} ${pin.x},${-pin.y}`} fill="none" stroke="#fff" strokeWidth={60} strokeDasharray="160 110" />}
      {pin && (
        <g transform={`translate(${pin.x},${-pin.y})`}>
          <circle r={260} fill="none" stroke="#fff" strokeWidth={50} />
          <circle r={110} fill="#fff" />
        </g>
      )}
      {/* The Domtoren: a small white tower glyph at the origin. */}
      <g transform="translate(0,0)" fill="#fff">
        <rect x={-120} y={-560} width={240} height={560} />
        <rect x={-85} y={-820} width={170} height={260} />
        <path d="M-60,-820 L0,-990 L60,-820Z" />
      </g>
    </svg>
  );
}

