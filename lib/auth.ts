// Stopgap password gate for /overview (replace with real auth later).
// The cookie holds a SHA-256 hash of the password, never the password itself. Changing
// OVERVIEW_PASSWORD invalidates every existing cookie. Works in the edge (middleware) and Node runtimes.

export const COOKIE = "ae_overview";
export const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function tokenFor(password: string) {
  const data = new TextEncoder().encode(`ae-overview:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Only allow redirects back into the overview, so ?next= cannot send anyone elsewhere. */
export const safeNext = (next: unknown) =>
  typeof next === "string" && /^\/overview(?:[/?]|$)/.test(next) ? next : "/overview";
