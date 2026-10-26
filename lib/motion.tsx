import type { CSSProperties, ElementType, ReactNode } from "react";

// Motion tokens (see .claude/skills/ae-motion). Use these instead of ad-hoc values.
export const EASE = [0.2, 0.8, 0.2, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const DUR = { micro: 0.15, state: 0.3, enter: 0.6 } as const;
export const STAGGER = 0.06;

// Entrances are CSS, not framer: the element renders identically on server and client (no hydration
// mismatch for reduced-motion visitors), stays visible without JavaScript (the hidden state only applies
// under `html.js`), and `components/RevealObserver` marks it `data-shown` when it scrolls into view.
// Styles: `[data-reveal]` in app/globals.css.

type RevealProps = { children: ReactNode; delay?: number; y?: number; className?: string; as?: ElementType; amount?: number; style?: CSSProperties };

/** Fade + rise once when scrolled into view. */
export function Reveal({ children, delay = 0, className, as: Tag = "div", style }: RevealProps) {
  return (
    <Tag data-reveal="" className={className} style={delay ? { ...style, ["--rd" as string]: `${delay}s` } : style}>
      {children}
    </Tag>
  );
}

/** Children appear one after another (CSS delay by position). Wrap each child in <StaggerItem>. */
export function Stagger({ children, className, as: Tag = "div" }: {
  children: ReactNode; className?: string; gap?: number; delay?: number; amount?: number; as?: ElementType;
}) {
  return <Tag data-stagger="" className={className}>{children}</Tag>;
}

export function StaggerItem({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return <Tag data-reveal="" className={className}>{children}</Tag>;
}

/** Two-tone heading (first phrase ink, later phrases in their own class). Rises once as a whole. */
export function SplitHeading({ segments, className, as: Tag = "h2", delay = 0 }: {
  segments: { text: string; className?: string }[]; className?: string; as?: ElementType; delay?: number; stagger?: number;
}) {
  return (
    <Tag data-reveal="" className={className} style={delay ? { ["--rd" as string]: `${delay}s` } : undefined}>
      {segments.map((s, i) => (
        <span key={i} className={s.className}>{i ? " " : ""}{s.text}</span>
      ))}
    </Tag>
  );
}
