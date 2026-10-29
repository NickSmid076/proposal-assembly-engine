"use client";
// The RVL concept inside the shared frames: browser preview, phone, and the capture view.
import { CaptureFrame, ConceptPreview, PhoneFrame, type ConceptPage } from "@/components/proposal/web/ConceptFrames";
import RvlSite from "./RvlSite";
import type { RvlFirm, RvlPage } from "./types";

const PAGES: ConceptPage<RvlPage>[] = [
  { id: "home", url: "rvlmakelaars.nl", label: { nl: "Homepage", en: "Homepage" } },
  { id: "aanbod", url: "rvlmakelaars.nl/aanbod", label: { nl: "Aanbod", en: "Listings" } },
  { id: "waardebepaling", url: "rvlmakelaars.nl/gratis-waardebepaling", label: { nl: "Waardebepaling", en: "Valuation" } },
];
const SCREEN = "rvl-screen"; // the container rvl.css measures

type P = { firm: RvlFirm; fontClass: string };

export default function RvlPreview({ firm, fontClass }: P) {
  return (
    <ConceptPreview pages={PAGES} screenClassName={SCREEN}>
      {(page, setPage) => <RvlSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} />}
    </ConceptPreview>
  );
}

export function RvlPhone({ firm, fontClass }: P) {
  return (
    <PhoneFrame first="home" screenClassName={SCREEN}>
      {(page: RvlPage, setPage) => <RvlSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} cookie={false} />}
    </PhoneFrame>
  );
}

export function RvlCapture({ firm, fontClass }: P) {
  return (
    <CaptureFrame screenClassName={SCREEN}>
      <RvlSite firm={firm} fontClass={fontClass} page="home" onPage={() => {}} still cookie={false} />
    </CaptureFrame>
  );
}
