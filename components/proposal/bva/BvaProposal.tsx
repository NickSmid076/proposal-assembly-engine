// BVA Makelaardij (/v/bva-164550): the shared web proposal with the BVA concept in it.
// Server component: loads the concept's fonts and content, then renders the template.
// Prospect-facing: never show status, views, ICP, notes or analysis wording here.
import { Archivo, Instrument_Sans } from "next/font/google";
import { firm, proposal } from "@/content/leads/bva-164550/proposal";
import { Bilingual } from "@/lib/lang";
import WebProposal from "@/components/proposal/web/WebProposal";
import BvaPreview, { BvaCapture, BvaPhone } from "./BvaPreview";

// The concept's own typefaces, self-hosted by next/font and scoped to the concept.
// Archivo is used expanded (width axis) for headings; Instrument Sans for text.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument" });
const fontClass = `${archivo.variable} ${instrument.variable}`;

export function BvaProposal() {
  return (
    <>
      <Bilingual />
      <WebProposal content={proposal}
        preview={<BvaPreview key="preview" firm={firm} fontClass={fontClass} />}
        phone={<BvaPhone key="phone" firm={firm} fontClass={fontClass} />} />
    </>
  );
}

/** Full-width concept for `npm run capture bva-164550`. */
export function BvaConceptCapture() {
  return <BvaCapture firm={firm} fontClass={fontClass} />;
}
