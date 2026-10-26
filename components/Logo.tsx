/* eslint-disable @next/next/no-img-element */
// Official wordmark from Marketing/Brand/Logo/exports (colour on light, white on dark).
export default function Logo({ tone = "ink", className = "h-[22px] w-auto" }: { tone?: "ink" | "white"; className?: string }) {
  return <img src={tone === "white" ? "/brand/wordmark-white.svg" : "/brand/wordmark.svg"} alt="assembly engine." className={className} width={180} height={22} />;
}
