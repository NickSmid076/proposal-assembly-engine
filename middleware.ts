import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, tokenFor } from "./lib/auth";

// Guards /overview with the password from OVERVIEW_PASSWORD (see README). Without the env var,
// nobody gets in. Proposal pages (/v/…) are not guarded: their unguessable slug is the access.
export async function middleware(req: NextRequest) {
  const password = process.env.OVERVIEW_PASSWORD;
  const cookie = req.cookies.get(COOKIE)?.value;
  if (password && cookie && cookie === (await tokenFor(password))) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/overview", "/overview/:path*"] };
