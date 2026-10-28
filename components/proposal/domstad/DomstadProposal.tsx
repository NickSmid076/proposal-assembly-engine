// Domstad Makelaars (/v/domstad-897791): the shared web proposal with the Domstad concept in it.
// Server component: loads the concept's fonts and content, then renders the template.
// Prospect-facing: never show status, views, ICP, notes or analysis wording here.
import { Hanken_Grotesk, Schibsted_Grotesk } from "next/font/google";
import { firm, proposal } from "@/content/leads/domstad-897791/proposal";
import { Bilingual } from "@/lib/lang";
import WebProposal from "@/components/proposal/web/WebProposal";
import DomPreview, { DomCapture, DomPhone } from "./DomPreview";

// The concept's own typefaces, self-hosted by next/font and scoped to the concept.
// Schibsted Grotesk for headings (tight, heavy), Hanken Grotesk for text.
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const fontClass = `${schibsted.variable} ${hanken.variable}`;

export function DomstadProposal() {
  return (
    <>
      <Bilingual />
      <WebProposal content={proposal}
        preview={<DomPreview key="preview" firm={firm} fontClass={fontClass} />}
        phone={<DomPhone key="phone" firm={firm} fontClass={fontClass} />} />
    </>
  );
}

/** Full-width concept for `npm run capture domstad-897791`. */
export function DomstadConceptCapture() {
  return <DomCapture firm={firm} fontClass={fontClass} />;
}
