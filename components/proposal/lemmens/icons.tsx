// Small line icons used only inside the Lemmens concept (same stroke style as components/icons).
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" /></svg>
);
export const Area = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" /></svg>
);
export const Plot = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3.5" y="3.5" width="17" height="17" rx="1.5" strokeDasharray="3 2.5" /></svg>
);
export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></svg>
);
