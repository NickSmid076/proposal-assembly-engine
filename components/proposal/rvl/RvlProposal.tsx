// RVL Makelaars (/v/rvl-831843): the shared web proposal with the RVL concept in it.
// Server component: loads the concept's fonts and content, then renders the template.
// Prospect-facing: never show status, views, ICP, notes or analysis wording here.
import { Barlow_Condensed, Jost } from "next/font/google";
import { firm, proposal } from "@/content/leads/rvl-831843/proposal";
import { Bilingual } from "@/lib/lang";
import WebProposal from "@/components/proposal/web/WebProposal";
import RvlPreview, { RvlCapture, RvlPhone } from "./RvlPreview";

// The concept's own typefaces, self-hosted by next/font and scoped to the concept.
// Barlow Condensed for headings (heavy, upper case, like RVL's own "OMDAT UW WONING HET WAARD IS"),
// Jost for text and the wordmark (geometric and light, close to their logo letters).
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-barlow" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });
const fontClass = `${barlow.variable} ${jost.variable}`;

export function RvlProposal() {
  return (
    <>
      <Bilingual />
      <WebProposal content={proposal}
        preview={<RvlPreview key="preview" firm={firm} fontClass={fontClass} />}
        phone={<RvlPhone key="phone" firm={firm} fontClass={fontClass} />} />
    </>
  );
}

/** Full-width concept for `npm run capture rvl-831843`. */
export function RvlConceptCapture() {
  return <RvlCapture firm={firm} fontClass={fontClass} />;
}
