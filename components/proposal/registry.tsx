// Leads with a finished proposal page. Everyone else gets the "in preparation" stub in app/v/[slug].
// Web proposals all render through components/proposal/web/WebProposal.tsx (same structure and style);
// each entry only brings its own content and concept site. See content/leads/README.md to add one.
import type { JSX } from "react";
import { BvaConceptCapture, BvaProposal } from "./bva/BvaProposal";
import { LemmensConceptCapture, LemmensProposal } from "./lemmens/LemmensProposal";

type Entry = {
  /** The proposal page. */
  Page: () => JSX.Element;
  /** The concept rendered full width, for `npm run capture <slug>` (dev only). */
  Capture?: () => JSX.Element;
};

export const PROPOSALS: Record<string, Entry> = {
  "lemmens-550127": { Page: LemmensProposal, Capture: LemmensConceptCapture },
  "bva-164550": { Page: BvaProposal, Capture: BvaConceptCapture },
};
