"use client";
// Hero visual: the concept on a laptop and a phone. Shows a static image composition first (server-rendered,
// no layout shift), then swaps in the three.js version once it has loaded. The static version stays when
// WebGL is unavailable or the 3D view fails, so the hero never breaks.
import dynamic from "next/dynamic";
import Image, { type StaticImageData } from "next/image";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const DeviceShowcase3D = dynamic(() => import("./DeviceShowcase3D"), { ssr: false, loading: () => null });

class Boundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

type Props = { desktop: StaticImageData; mobile: StaticImageData; fold: StaticImageData; alt: string; className?: string };

/** Static stand-in: a browser window and a phone made of the same screenshots. */
function Still({ fold, mobile, hidden }: { fold: StaticImageData; mobile: StaticImageData; hidden: boolean }) {
  return (
    <div aria-hidden className={`absolute inset-0 transition-opacity duration-700 ${hidden ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute left-[2%] top-[14%] w-[80%] overflow-hidden rounded-[10px] bg-[#2b2e35] p-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]">
        <Image src={fold} alt="" sizes="(min-width: 1024px) 480px, 80vw" className="h-auto w-full rounded-[5px]" priority />
      </div>
      <div className="absolute bottom-[6%] right-[3%] w-[26%] overflow-hidden rounded-[22px] bg-[#1c1f25] p-[5px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
        <div className="relative aspect-[390/800] overflow-hidden rounded-[17px]">
          <Image src={mobile} alt="" fill sizes="160px" className="object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

export default function DeviceShowcase({ desktop, mobile, fold, alt, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<"static" | "3d">("static");
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) return;
    setMode("3d");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const onMq = () => setStill(mq.matches);
    mq.addEventListener("change", onMq);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    if (wrap.current) io.observe(wrap.current);
    // Pointer across the window, -1..1. Read in the frame loop only, never in React state.
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { io.disconnect(); mq.removeEventListener("change", onMq); window.removeEventListener("pointermove", onMove); };
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => { setMode("static"); setReady(false); }, []);

  return (
    <div ref={wrap} role="img" aria-label={alt} className={`relative ${className}`}>
      {/* Soft floor shadow: grounds the devices without a shadow render pass. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[8%] bottom-[4%] h-[18%] bg-[radial-gradient(closest-side,rgba(0,0,0,.45),transparent)]" />
      <Still fold={fold} mobile={mobile} hidden={ready} />
      {mode === "3d" && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Boundary onError={onError}>
            <DeviceShowcase3D desktop={desktop.src} mobile={mobile.src} still={still} visible={visible} pointer={pointer} onReady={onReady} />
          </Boundary>
        </div>
      )}
    </div>
  );
}
