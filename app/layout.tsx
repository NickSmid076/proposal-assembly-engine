import type { Metadata } from "next";
import { Inter, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import MotionRoot from "@/components/MotionRoot";

// Same fonts and variables as the main site (Website/app/[locale]/layout.tsx).
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-plex-mono" });

export const viewport = { themeColor: "#0B1B33" };

export const metadata: Metadata = {
  title: { default: "Voorstel", template: "%s · Assembly Engine" },
  // Nothing on this domain is for search engines (next.config also sends X-Robots-Tag).
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${manrope.variable} ${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Entrance styles only hide content when scripts run (see lib/motion). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <RevealObserver />
        <MotionRoot>
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </MotionRoot>
      </body>
    </html>
  );
}
