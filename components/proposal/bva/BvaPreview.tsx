"use client";
// The BVA concept inside the shared frames: browser preview, phone, and the capture view.
import { CaptureFrame, ConceptPreview, PhoneFrame, type ConceptPage } from "@/components/proposal/web/ConceptFrames";
import BvaSite from "./BvaSite";
import type { BvaFirm, BvaPage } from "./types";

const PAGES: ConceptPage<BvaPage>[] = [
  { id: "home", url: "bvamakelaardij.nl", label: { nl: "Homepage", en: "Homepage" } },
  { id: "aanbod", url: "bvamakelaardij.nl/aanbod", label: { nl: "Aanbod", en: "Listings" } },
  { id: "waardebepaling", url: "bvamakelaardij.nl/woning-verkopen/waardebepaling", label: { nl: "Waardebepaling", en: "Valuation" } },
];
const SCREEN = "bva-screen"; // the container bva.css measures

type P = { firm: BvaFirm; fontClass: string };

export default function BvaPreview({ firm, fontClass }: P) {
  return (
    <ConceptPreview pages={PAGES} screenClassName={SCREEN}>
      {(page, setPage) => <BvaSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} />}
    </ConceptPreview>
  );
}

export function BvaPhone({ firm, fontClass }: P) {
  return (
    <PhoneFrame first="home" screenClassName={SCREEN}>
      {(page: BvaPage, setPage) => <BvaSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} cookie={false} />}
    </PhoneFrame>
  );
}

export function BvaCapture({ firm, fontClass }: P) {
  return (
    <CaptureFrame screenClassName={SCREEN}>
      <BvaSite firm={firm} fontClass={fontClass} page="home" onPage={() => {}} still cookie={false} />
    </CaptureFrame>
  );
}
