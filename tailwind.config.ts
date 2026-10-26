import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B1B33", 2: "#0F2342", 3: "#14294C", line: "#213641" },
        cobalt: { DEFAULT: "#2E5BFF", 2: "#4A73FF" },
        ice: "#EDF1FF",
        peri: "#C3D0FF",
        slate: "#5C6B85",
        muted: "#8FA0BF",
        paper: "#F5F7FB",
        ok: { DEFAULT: "#14AE5C", soft: "#E7F6EE", ink: "#0E7A42" },
        warn: { DEFAULT: "#B7791F", soft: "#FBF3E4" },
        line: { DEFAULT: "#E4E8F0", 2: "#D5DBE6" },
        sunken: "#F5F7FB",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "1100px" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: { rise: "rise .6s cubic-bezier(.2,.8,.2,1) both", fade: "fade .5s ease both" },
    },
  },
  plugins: [
    // Container-width variants for the homepage service moments (stage has container-type: inline-size).
    plugin(({ addVariant }) => {
      addVariant("cq-md", "@container (min-width: 440px)");
      addVariant("cq-lg", "@container (min-width: 560px)");
    }),
  ],
} satisfies Config;
