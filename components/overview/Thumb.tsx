// Placeholder thumbnail for a proposal card: a gradient and line drawing in the site palette.
// Same slug, same picture (seeded by the slug), so server and browser render identical SVG.
// The drawing hints at the offer: a web page, a dashboard, or an automated flow.
import type { Offer } from "@/lib/leads";

function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) h = Math.imul(h ^ slug.charCodeAt(i), 16777619);
  let a = h >>> 0;
  // mulberry32
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Tone = { bg: [string, string]; glow: string; fg: string; panel: string; accent: string; soft: string };
const TONES: Tone[] = [
  { bg: ["#0B1B33", "#14294C"], glow: "#2E5BFF", fg: "#FFFFFF", panel: "rgba(255,255,255,.05)", accent: "#4A73FF", soft: "#C3D0FF" },
  { bg: ["#2E5BFF", "#4A73FF"], glow: "#C3D0FF", fg: "#FFFFFF", panel: "rgba(255,255,255,.1)", accent: "#0B1B33", soft: "#EDF1FF" },
  { bg: ["#F5F7FB", "#EDF1FF"], glow: "#C3D0FF", fg: "#0B1B33", panel: "#FFFFFF", accent: "#2E5BFF", soft: "#C3D0FF" },
  { bg: ["#EDF1FF", "#C3D0FF"], glow: "#FFFFFF", fg: "#0B1B33", panel: "#FFFFFF", accent: "#2E5BFF", soft: "#4A73FF" },
];

const initials = (firm: string) =>
  firm.split(/[\s&]+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

export default function Thumb({ slug, firm, offer, className }: { slug: string; firm: string; offer: Offer; className?: string }) {
  const r = seeded(slug);
  const t = TONES[Math.floor(r() * TONES.length)];
  const id = `th-${slug}`;
  const stroke = { stroke: t.fg, strokeOpacity: 0.32, strokeWidth: 1 };
  const glowX = 20 + r() * 60;

  // A window that runs off the bottom edge, like a screenshot crop.
  const wx = 34 + Math.round(r() * 24);
  const wy = 26 + Math.round(r() * 12);
  const ww = 320 - wx * 2 + 40;
  const win = (
    <>
      <rect x={wx} y={wy} width={ww} height={220} rx={8} fill={t.panel} {...stroke} />
      <path d={`M${wx} ${wy + 14}H${wx + ww}`} fill="none" {...stroke} />
      {[0, 1, 2].map((i) => <circle key={i} cx={wx + 9 + i * 7} cy={wy + 7} r={2} fill={t.fg} fillOpacity={0.3} />)}
    </>
  );

  let body: React.ReactNode;
  if (offer === "web") {
    const hx = wx + 16, hy = wy + 52;
    const w1 = 90 + r() * 50, w2 = 60 + r() * 50;
    const phone = r() > 0.45;
    body = (
      <>
        {win}
        <text x={hx} y={wy + 32} fontSize={9} fontWeight={800} fill={t.fg} fillOpacity={0.85} style={{ fontFamily: "var(--font-manrope), sans-serif" }}>{initials(firm)}</text>
        {[0, 1, 2].map((i) => <rect key={i} x={wx + ww - 70 + i * 20} y={wy + 26} width={14} height={4} rx={2} fill={t.fg} fillOpacity={0.25} />)}
        <rect x={hx} y={hy} width={w1} height={9} rx={2} fill={t.fg} fillOpacity={0.8} />
        <rect x={hx} y={hy + 14} width={w2} height={9} rx={2} fill={t.fg} fillOpacity={0.8} />
        {[0, 1].map((i) => <rect key={i} x={hx} y={hy + 34 + i * 8} width={110 - i * 30} height={3} rx={1.5} fill={t.fg} fillOpacity={0.3} />)}
        <rect x={hx} y={hy + 58} width={52} height={14} rx={3} fill={t.accent} />
        <rect x={wx + ww - 110} y={hy - 6} width={84} height={84} rx={6} fill={t.soft} fillOpacity={0.35} {...stroke} />
        <circle cx={wx + ww - 68} cy={hy + 36} r={20 + r() * 10} fill="none" {...stroke} strokeOpacity={0.5} />
        {phone && (
          <g>
            <rect x={wx + ww - 52} y={wy + 70} width={56} height={110} rx={9} fill={t.bg[0]} {...stroke} strokeOpacity={0.6} />
            <rect x={wx + ww - 44} y={wy + 90} width={36} height={5} rx={2} fill={t.fg} fillOpacity={0.8} />
            <rect x={wx + ww - 44} y={wy + 99} width={26} height={5} rx={2} fill={t.fg} fillOpacity={0.8} />
            <rect x={wx + ww - 44} y={wy + 114} width={30} height={9} rx={2} fill={t.accent} />
          </g>
        )}
      </>
    );
  } else if (offer === "dashboards") {
    const px = wx + 14, py = wy + 26, pw = ww - 28;
    const tile = (pw - 16) / 3;
    const n = 9;
    const pts = Array.from({ length: n }, (_, i) => [px + (i * (pw * 0.62)) / (n - 1), py + 112 - (18 + r() * 52 + i * 3)] as const);
    const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
    const bx = px + pw * 0.7;
    body = (
      <>
        {win}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={px + i * (tile + 8)} y={py} width={tile} height={34} rx={4} fill={t.panel} {...stroke} />
            <rect x={px + i * (tile + 8) + 8} y={py + 9} width={24} height={3} rx={1.5} fill={t.fg} fillOpacity={0.35} />
            <rect x={px + i * (tile + 8) + 8} y={py + 18} width={18 + r() * 22} height={8} rx={2} fill={i === 0 ? t.accent : t.fg} fillOpacity={i === 0 ? 1 : 0.75} />
          </g>
        ))}
        <path d={`${line}L${pts[n - 1][0]} ${py + 112}L${px} ${py + 112}Z`} fill={t.accent} fillOpacity={0.18} />
        <path d={line} fill="none" stroke={t.accent} strokeWidth={1.8} strokeLinejoin="round" />
        <path d={`M${px} ${py + 112.5}H${px + pw * 0.62}`} fill="none" {...stroke} />
        {Array.from({ length: 5 }, (_, i) => {
          const h = 16 + r() * 50;
          return <rect key={i} x={bx + i * 14} y={py + 112 - h} width={8} height={h} rx={2} fill={t.fg} fillOpacity={i === 3 ? 0.85 : 0.28} />;
        })}
      </>
    );
  } else {
    // Automation: source → two steps → result, joined by curved wires.
    const y0 = 100 + (r() - 0.5) * 20;
    const spread = 34 + r() * 16;
    const nodes = [
      { x: 30, y: y0, w: 58 },
      { x: 128, y: y0 - spread, w: 64 },
      { x: 128, y: y0 + spread, w: 64 },
      { x: 232, y: y0, w: 58 },
    ];
    const lit = 1 + Math.floor(r() * 2);
    const wire = (a: (typeof nodes)[number], b: (typeof nodes)[number]) => {
      const x1 = a.x + a.w, x2 = b.x, mx = (x1 + x2) / 2;
      return `M${x1} ${a.y}C${mx} ${a.y} ${mx} ${b.y} ${x2} ${b.y}`;
    };
    body = (
      <>
        {[wire(nodes[0], nodes[1]), wire(nodes[0], nodes[2]), wire(nodes[1], nodes[3]), wire(nodes[2], nodes[3])].map((d, i) => (
          <path key={i} d={d} fill="none" stroke={i % 2 === lit - 1 ? t.accent : t.fg} strokeOpacity={i % 2 === lit - 1 ? 1 : 0.35} strokeWidth={1.4} strokeDasharray={i % 2 === lit - 1 ? undefined : "3 3"} />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <rect x={n.x} y={n.y - 15} width={n.w} height={30} rx={6} fill={i === lit ? t.accent : t.panel} {...stroke} strokeOpacity={i === lit ? 0 : 0.4} />
            <rect x={n.x + 9} y={n.y - 5} width={n.w * 0.5} height={3} rx={1.5} fill={i === lit ? "#FFFFFF" : t.fg} fillOpacity={i === lit ? 0.95 : 0.5} />
            <rect x={n.x + 9} y={n.y + 2} width={n.w * 0.32} height={3} rx={1.5} fill={i === lit ? "#FFFFFF" : t.fg} fillOpacity={i === lit ? 0.6 : 0.25} />
          </g>
        ))}
        <circle cx={nodes[3].x + nodes[3].w} cy={y0} r={3} fill={t.accent} />
      </>
    );
  }

  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.bg[0]} />
          <stop offset="1" stopColor={t.bg[1]} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx={`${glowX}%`} cy="110%" r="75%">
          <stop offset="0" stopColor={t.glow} stopOpacity={0.55} />
          <stop offset="1" stopColor={t.glow} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${id}-bg)`} />
      <rect width="320" height="200" fill={`url(#${id}-glow)`} />
      {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${(i + 1) * 20} 0V200`} stroke={t.fg} strokeOpacity={0.05} />)}
      {body}
    </svg>
  );
}
