"use client";
// The Lemmens concept inside the shared frames: browser preview, phone, and the capture view.
import { CaptureFrame, ConceptPreview, PhoneFrame, type ConceptPage } from "@/components/proposal/web/ConceptFrames";
import LemmensSite from "./LemmensSite";
import type { LemmensFirm, LemmensPage } from "./types";

const PAGES: ConceptPage<LemmensPage>[] = [
  { id: "home", url: "lemmens.nl", label: { nl: "Homepage", en: "Homepage" } },
  { id: "aanbod", url: "lemmens.nl/aanbod", label: { nl: "Aanbod", en: "Listings" } },
  { id: "waardebepaling", url: "lemmens.nl/gratis-waardebepaling", label: { nl: "Waardebepaling", en: "Valuation" } },
];
const SCREEN = "lm-screen"; // the container lemmens.css measures

type P = { firm: LemmensFirm; fontClass: string };

export default function LemmensPreview({ firm, fontClass }: P) {
  return (
    <ConceptPreview pages={PAGES} screenClassName={SCREEN}>
      {(page, setPage) => <LemmensSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} />}
    </ConceptPreview>
  );
}

export function LemmensPhone({ firm, fontClass }: P) {
  return (
    <PhoneFrame first="home" screenClassName={SCREEN}>
      {(page: LemmensPage, setPage) => <LemmensSite firm={firm} fontClass={fontClass} page={page} onPage={setPage} cookie={false} />}
    </PhoneFrame>
  );
}

export function LemmensCapture({ firm, fontClass }: P) {
  return (
    <CaptureFrame screenClassName={SCREEN}>
      <LemmensSite firm={firm} fontClass={fontClass} page="home" onPage={() => {}} still cookie={false} />
    </CaptureFrame>
  );
}
