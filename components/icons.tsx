type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export const ArrowRight = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ChevronDown = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 10l5 5 5-5" /></svg>);
export const Check = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Mail = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>);
export const Send = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" /></svg>);
export const Menu = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Close = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6L6 18" /></svg>);

const paths: Record<string, React.ReactNode> = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></>,
  pen: <><path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" /><path d="M14 7l3 3" /></>,
  code: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></>,
  rocket: <><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 15l-3-3c1-4 4.5-8 12-9-1 7.5-5 11-9 12z" /><circle cx="14.5" cy="9.5" r="1.5" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.5-4.5L3 9" /><path d="M3 4v5h5" /><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15" /><path d="M21 20v-5h-5" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></>,
  workflow: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><path d="M6.5 10v4a3 3 0 0 0 3 3H14" /></>,
  plug: <><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" /></>,
  gauge: <><path d="M4 18a8 8 0 1 1 16 0" /><path d="M12 18l4-6" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></>,
  alert: <><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17h.01" /></>,
  flag: <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
  person: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
};
export const Icon = ({ name, className }: P & { name: string }) => (<svg viewBox="0 0 24 24" className={className} {...base}>{paths[name]}</svg>);
// Added for the proposals site (not in the main site's icons.tsx).
export const Eye = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} {...base}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></svg>);
