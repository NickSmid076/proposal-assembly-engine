import type { Lead } from "@/lib/leads";

// ─────────────────────────────────────────────────────────────────────────────
// ALL DATA BELOW IS FICTIONAL. Firm names, towns, dates, view counts and notes are
// made up to fill the overview while it is being built. Any resemblance to a real
// firm is accidental. Replace with real leads before using this for outreach.
// ─────────────────────────────────────────────────────────────────────────────
//
// Server-only: import this from server components (pages), never from a "use client" file.
// Per-firm proposal content will live in content/leads/<slug>/ (see the README there).

export const leads: Lead[] = [
  { slug: "brouwer-lint-accountants", firm: "Brouwer & Lint Accountants", town: "Dordrecht", icp: "1A", offer: "web", status: "bekeken", sentAt: "2026-10-21", views: 6, notes: "Site uit 2016, geen mobiele weergave. Reageerde binnen een uur." },
  { slug: "kadewerf-advocaten", firm: "Kadewerf Advocaten", town: "Zwolle", icp: "3A", offer: "automatisering", status: "reactie", sentAt: "2026-10-19", views: 11, notes: "Wil intake-formulier koppelen aan dossiersysteem. Bel-afspraak volgt." },
  { slug: "van-oorschot-belastingadvies", firm: "Van Oorschot Belastingadvies", town: "Tilburg", icp: "1B", offer: "dashboards", status: "verstuurd", sentAt: "2026-10-24", views: 0, notes: "Drie vestigingen, rapportage nu in Excel." },
  { slug: "heidepoort-administratie", firm: "Heidepoort Administratie", town: "Ede", icp: "1A", offer: "automatisering", status: "pilot", sentAt: "2026-09-30", views: 23, notes: "Pilot facturatie loopt sinds 14 okt." },
  { slug: "marsdiep-juristen", firm: "Marsdiep Juristen", town: "Den Helder", icp: "3A", offer: "web", status: "verstuurd", sentAt: "2026-10-23", views: 1, notes: "Klein kantoor, twee partners." },
  { slug: "stellingwerf-partners", firm: "Stellingwerf & Partners", town: "Heerenveen", icp: "2B", offer: "dashboards", status: "bekeken", sentAt: "2026-10-15", views: 4, notes: "Adviesbureau, interesse in uren- en omzetdashboard." },
  { slug: "lindeboom-fiscaal", firm: "Lindeboom Fiscaal", town: "Amersfoort", icp: "1B", offer: "web", status: "reactie", sentAt: "2026-10-12", views: 9, notes: "Vraagt naar prijsindicatie voor nieuwe site." },
  { slug: "gravenhof-notariaat", firm: "Gravenhof Notariaat", town: "Leiden", icp: "3A", offer: "automatisering", status: "bekeken", sentAt: "2026-10-09", views: 3, notes: "Akte-voorbereiding kost veel handwerk." },
  { slug: "polderzicht-advies", firm: "Polderzicht Advies", town: "Lelystad", icp: "2B", offer: "automatisering", status: "verstuurd", sentAt: "2026-10-25", views: 0, notes: "" },
  { slug: "ter-meulen-accountancy", firm: "Ter Meulen Accountancy", town: "Enschede", icp: "1A", offer: "dashboards", status: "pilot", sentAt: "2026-09-22", views: 31, notes: "Pilot klantdashboard, evaluatie eind november." },
  { slug: "duinrand-advocatuur", firm: "Duinrand Advocatuur", town: "Haarlem", icp: "3A", offer: "dashboards", status: "verstuurd", sentAt: "2026-10-20", views: 2, notes: "" },
  { slug: "hofstede-bedrijfsadvies", firm: "Hofstede Bedrijfsadvies", town: "Breda", icp: "2B", offer: "web", status: "bekeken", sentAt: "2026-10-05", views: 7, notes: "Nieuwe huisstijl in de maak, site daarna." },
];

export const getLead = (slug: string) => leads.find((l) => l.slug === slug);
