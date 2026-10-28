"use client";
// The Domstad concept inside the shared frames: browser preview, phone, and the capture view.
import { CaptureFrame, ConceptPreview, PhoneFrame, type ConceptPage } from "@/components/proposal/web/ConceptFrames";
import DomSite from "./DomSite";
import type { DomFirm, DomPage } from "./types";

const PAGES: ConceptPage<DomPage>[] = [
  { id: "home", url: "domstadmakelaars.nl", label: { nl: "Homepage", en: "Homepage" } },
  { id: "aanbod", url: "domstadmakelaars.nl/aanbod", label: { nl: "Aanbod", en: "Listings" } },
  { id: "waardebepaling", url: "domstadmakelaars.nl/verkopen/waardebepaling", label: { nl: "Waardebepaling", en: "Valuation" } },
];
const SCREEN = "dom-screen"; // the container dom.css measures

type P = { firm: DomFirm; fontClass: string };

export default function DomPreview({ firm, fontClass }: P) {
  return (
    <ConceptPreview pages={PAGES} screenClassName={SCREEN}>
      {(page, setPage) => <DomSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} />}
    </ConceptPreview>
  );
}

export function DomPhone({ firm, fontClass }: P) {
  return (
    <PhoneFrame first="home" screenClassName={SCREEN}>
      {(page: DomPage, setPage) => <DomSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} cookie={false} />}
    </PhoneFrame>
  );
}

export function DomCapture({ firm, fontClass }: P) {
  return (
    <CaptureFrame screenClassName={SCREEN}>
      <DomSite firm={firm} fontClass={fontClass} page="home" onPage={() => {}} still cookie={false} />
    </CaptureFrame>
  );
}
