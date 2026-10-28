// Dev only: a lead's concept site rendered full width, for `npm run capture <slug>`.
// Returns 404 in production builds. `?w=390` renders it at phone width.
import { notFound } from "next/navigation";
import { PROPOSALS } from "@/components/proposal/registry";

export const dynamic = "force-dynamic";

export default async function ConceptCapture({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const Capture = PROPOSALS[(await params).slug]?.Capture;
  if (!Capture) notFound();
  return <Capture />;
}
