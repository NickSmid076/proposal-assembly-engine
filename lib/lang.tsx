"use client";
// Page language for bilingual proposal pages. Dutch is the default and what the server renders.
// A page opts in with <Bilingual />; only then does the header switch toggle NL/EN in place
// (otherwise it links to the English main site). The choice is kept per visitor in localStorage,
// and `?lang=en` in the link opens the page in English.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "nl" | "en";
/** A string (or any value) in both languages. */
export type L<T = string> = Record<Lang, T>;

const KEY = "ae-proposal-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; bilingual: boolean; setBilingual: (b: boolean) => void };
const LangContext = createContext<Ctx>({ lang: "nl", setLang: () => {}, bilingual: false, setBilingual: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");
  const [bilingual, setBilingual] = useState(false);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* private mode: keep it in memory only */ }
  }, []);

  // Only bilingual pages read the saved choice; every other page stays Dutch.
  useEffect(() => {
    if (!bilingual) { setLangState("nl"); return; }
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch { /* ignore */ }
    const pick = fromUrl ?? saved;
    if (pick === "en" || pick === "nl") setLangState(pick);
  }, [bilingual]);

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = useMemo(() => ({ lang, setLang, bilingual, setBilingual }), [lang, setLang, bilingual]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Pick the current language's version: `const t = useT(); t(copy.title)`. */
export function useT() {
  const { lang } = useLang();
  return useCallback(<T,>(v: L<T>) => v[lang], [lang]);
}

/** Render once on a page that has an English version. */
export function Bilingual() {
  const { setBilingual } = useLang();
  useEffect(() => { setBilingual(true); return () => setBilingual(false); }, [setBilingual]);
  return null;
}
