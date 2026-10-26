// Lead types and labels. Safe to import in client components: no lead data lives here.
// The data itself is in content/leads.ts and must only be imported by server components,
// otherwise it ends up in a public JavaScript file that bypasses the overview password.

export const OFFERS = ["web", "dashboards", "automatisering"] as const;
export const STATUSES = ["verstuurd", "bekeken", "reactie", "pilot"] as const;
export const ICPS = ["1A", "1B", "2B", "3A"] as const;

export type Offer = (typeof OFFERS)[number];
export type Status = (typeof STATUSES)[number];
export type Icp = (typeof ICPS)[number];

export type Lead = {
  /** URL part of the proposal page: /v/<slug>. Lowercase, hyphens only. */
  slug: string;
  firm: string;
  town: string;
  icp: Icp;
  offer: Offer;
  status: Status;
  /** Date the proposal link was sent, ISO "YYYY-MM-DD". */
  sentAt: string;
  views: number;
  /** Private notes. Shown on /overview only, never on the proposal page. */
  notes: string;
};

export const OFFER_LABEL: Record<Offer, string> = { web: "Web", dashboards: "Dashboards", automatisering: "Automatisering" };
export const STATUS_LABEL: Record<Status, string> = { verstuurd: "Verstuurd", bekeken: "Bekeken", reactie: "Reactie", pilot: "Pilot" };

const dateFmt = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
/** "2026-10-12" → "12 okt 2026". Fixed time zone so server and browser print the same thing. */
export const formatDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`)).replace(".", "");
