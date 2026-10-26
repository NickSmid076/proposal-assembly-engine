"use client";
// Framer respects the visitor's reduced-motion setting everywhere: transform animations are skipped,
// opacity still fades. Rendering is unchanged, so this never causes a hydration mismatch.
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
