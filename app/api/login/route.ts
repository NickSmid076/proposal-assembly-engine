import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, MAX_AGE, safeNext, tokenFor } from "@/lib/auth";

// Receives the login form (a plain HTML POST, works without JavaScript).
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const next = safeNext(form.get("next"));
  const password = process.env.OVERVIEW_PASSWORD;
  const back = (error: string) => {
    const url = new URL("/login", req.url);
    url.searchParams.set("fout", error);
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  };

  if (!password) return back("config");
  const given = form.get("password");
  if (typeof given !== "string" || (await tokenFor(given)) !== (await tokenFor(password))) return back("1");

  const res = NextResponse.redirect(new URL(next, req.url), 303);
  res.cookies.set(COOKIE, await tokenFor(password), {
    httpOnly: true,
    // Secure everywhere except `next dev` on http://localhost (Safari drops secure cookies there).
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}
