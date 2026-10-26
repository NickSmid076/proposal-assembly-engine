import type { Metadata } from "next";
import { safeNext } from "@/lib/auth";
import { Icon } from "@/components/icons";

export const metadata: Metadata = { title: "Inloggen" };

const ERRORS: Record<string, string> = {
  "1": "Dat wachtwoord klopt niet. Probeer het opnieuw.",
  config: "Er is nog geen wachtwoord ingesteld (OVERVIEW_PASSWORD).",
};

export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string; fout?: string }> }) {
  const { next, fout } = await searchParams;
  const error = fout ? ERRORS[fout] ?? ERRORS["1"] : null;
  return (
    <section className="bg-white">
      <div className="frame frame-light flex min-h-[70vh] items-center justify-center py-20">
        <div className="w-full max-w-[400px] rounded-[18px] border border-ink/[0.08] bg-white p-7 shadow-[0_1px_2px_rgba(11,27,51,.05),0_24px_60px_-36px_rgba(11,27,51,.35)] sm:p-9">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ice text-cobalt"><Icon name="lock" className="h-5 w-5" /></span>
          <p className="eyebrow mt-6">Privé</p>
          <h1 className="mt-2 text-[26px] font-bold leading-[1.2] tracking-[-0.02em]">Overzicht voorstellen</h1>
          <p className="mt-2 text-[15px] leading-[1.5] text-slate">Deze pagina is afgeschermd. Vul het wachtwoord in om verder te gaan.</p>
          <form method="post" action="/api/login" className="mt-6">
            <input type="hidden" name="next" value={safeNext(next)} />
            <label htmlFor="password" className="block text-[14px] font-semibold">Wachtwoord</label>
            <input id="password" name="password" type="password" required autoFocus autoComplete="current-password"
              aria-invalid={error ? true : undefined} aria-describedby={error ? "login-error" : undefined}
              className="focus-ring mt-2 h-12 w-full rounded-md border border-line-2 px-3.5 text-[16px] aria-[invalid=true]:border-[#C2410C]" />
            {error && <p id="login-error" role="alert" className="mt-2 text-[14px] text-[#B42318]">{error}</p>}
            <button type="submit" className="btn-primary focus-ring mt-5 w-full">Inloggen</button>
          </form>
        </div>
      </div>
    </section>
  );
}
