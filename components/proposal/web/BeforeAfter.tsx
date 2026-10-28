"use client";
// Two screenshots of the same size on top of each other; drag the line (or use the arrow keys) to compare.
// The control is a native range input, so it works with keyboard, touch and screen readers.
import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type Props = {
  before: StaticImageData; after: StaticImageData;
  beforeLabel: string; afterLabel: string; beforeAlt: string; afterAlt: string; sliderLabel: string;
};

export default function BeforeAfter({ before, after, beforeLabel, afterLabel, beforeAlt, afterAlt, sliderLabel }: Props) {
  const [pos, setPos] = useState(50);
  const tag = "pointer-events-none absolute top-4 rounded-md bg-ink/80 px-2.5 py-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-white backdrop-blur";
  return (
    <div className="group relative select-none overflow-hidden rounded-[16px] border border-ink/[0.12] bg-paper shadow-[0_40px_80px_-50px_rgba(11,27,51,.55)]">
      <Image src={after} alt={afterAlt} sizes="(min-width: 1240px) 1100px, 100vw" className="block h-auto w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} sizes="(min-width: 1240px) 1100px, 100vw" className="block h-full w-full object-cover object-top" />
      </div>
      <span className={`${tag} left-4`} style={{ opacity: pos > 12 ? 1 : 0 }}>{beforeLabel}</span>
      <span className={`${tag} right-4`} style={{ opacity: pos < 88 ? 1 : 0 }}>{afterLabel}</span>
      {/* Divider and handle follow the input value. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(11,27,51,.15)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-[0_8px_24px_-6px_rgba(11,27,51,.45)] ring-1 ring-ink/10 transition-transform duration-150 group-has-[input:focus-visible]:ring-4 group-has-[input:focus-visible]:ring-peri">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
        </span>
      </div>
      <input type="range" min={0} max={100} step={1} value={pos} onChange={(e) => setPos(Number(e.currentTarget.value))}
        aria-label={sliderLabel} aria-valuetext={`${pos}% ${beforeLabel}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0" />
    </div>
  );
}
