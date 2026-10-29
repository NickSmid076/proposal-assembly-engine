// RVL logo, redrawn from their logo (rvlmakelaars.nl ships it only as a small embedded PNG): the yellow
// pennant with a notched foot, and the three-line wordmark. The wordmark is set in the concept's body face
// (Jost, light), close to their own thin geometric letters. Inline so the words follow currentColor.
// `mark` renders the pennant only.
export function RvlLogo({ mark = false, className, title }: { mark?: boolean; className?: string; title?: string }) {
  return (
    <svg viewBox={mark ? "0 0 14 36" : "0 0 128 36"} className={className} role={title ? "img" : undefined}
      aria-label={title} aria-hidden={title ? undefined : true}>
      <path d="M0 4.2 7 0l7 4.2V36l-7-5.2L0 36Z" fill="var(--geel, #ffe400)" />
      {!mark && (
        <g fill="currentColor" fontFamily="var(--font-jost), sans-serif" fontWeight={300} fontSize={10.2} letterSpacing={0.1}>
          <text x="21" y="9.6">ROSENBERG</text>
          <text x="21" y="21.4">VAN LEUSDEN</text>
          <text x="21" y="33.2" fill="var(--geel-ink, currentColor)">MAKELAARS</text>
        </g>
      )}
    </svg>
  );
}

type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

/** Chat bubble (WhatsApp, without their brand mark). */
export const Chat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6z" /><path d="M9 10.5h6M9 13.5h4" /></svg>
);
export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>
);
export const Camera = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 8h3l1.6-2.5h6.8L17 8h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></svg>
);
export const Year = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 20V9l8-5 8 5v11M9 20v-6h6v6" /></svg>
);

// Shared line icons (same stroke style as components/icons).
export { Phone, Area, Rooms, Moon, Sun, Calendar } from "../bva/icons";
