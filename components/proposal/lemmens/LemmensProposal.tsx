// Lemmens Makelaardij (/v/lemmens-550127): the shared web proposal with the Lemmens concept in it.
// Server component: loads the concept's fonts and content, then renders the template.
// Prospect-facing: never show status, views, ICP, notes or analysis wording here.
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { firm, proposal } from "@/content/leads/lemmens-550127/proposal";
import { Bilingual } from "@/lib/lang";
import WebProposal from "@/components/proposal/web/WebProposal";
import LemmensPreview, { LemmensCapture, LemmensPhone } from "./LemmensPreview";

// The concept's own typefaces, self-hosted by next/font and scoped to the concept.
const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-geist" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-bricolage" });
const fontClass = `${geist.variable} ${bricolage.variable}`;

export function LemmensProposal() {
  return (
    <>
      <Bilingual />
      <WebProposal content={proposal}
        preview={<LemmensPreview key="preview" firm={firm} fontClass={fontClass} />}
        phone={<LemmensPhone key="phone" firm={firm} fontClass={fontClass} />} />
    </>
  );
}

/** Full-width concept for `npm run capture lemmens-550127`. */
export function LemmensConceptCapture() {
  return <LemmensCapture firm={firm} fontClass={fontClass} />;
}
