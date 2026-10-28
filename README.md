# Assembly Engine · Proposals

Separate Next.js site for **proposal.assembly-engine.com**. It hosts the personal pages sent to prospects
after they reply to a cold email (`/v/<slug>`), plus a private overview of all of them (`/overview`).

Same stack and pinned versions as the main site (`../../Website`): Next 15 (app router), React 19,
Tailwind 3.4, TypeScript, framer-motion, three.js (@react-three/fiber). Dutch by default, no i18n routing.
A proposal page can offer English too: render `<Bilingual />` (from `lib/lang.tsx`) and the header switch
then toggles NL/EN in place (saved per visitor; `?lang=en` in the link opens it in English). See the Lemmens page.

## Run

```bash
npm install
cp .env.example .env.local     # then set OVERVIEW_PASSWORD
npm run dev                    # http://localhost:3000 opens the overview
npm run build && npm run lint  # both must pass before deploying
```

## Routes

| Route | What |
| --- | --- |
| `/` | Redirects to https://www.assembly-engine.com (to `/overview` in `npm run dev`) |
| `/overview` | Private gallery of all proposals. Password-gated. Filters sync to the URL: `?offer=web&status=bekeken&q=kade&sort=views` |
| `/login` | Password form for the overview |
| `/v/<slug>` | Proposal page for one firm. Web proposals share one template (see `content/leads/README.md`); leads without a finished page get a stub. Unknown slugs return 404 |
| `/dev/concept/<slug>` | Dev only (404 in production): the lead's concept full width, used by `npm run capture <slug>` |
| `/robots.txt` | `Disallow: /` (there is deliberately no sitemap) |

## Add a lead

1. Add a record to `content/leads.ts`. Fields: `slug`, `firm`, `town`, `icp` (`1A`, `1B`, `2B`, `3A`),
   `offer` (`web`, `dashboards`, `automatisering`), `status` (`verstuurd`, `bekeken`, `reactie`, `pilot`),
   `sentAt` (`YYYY-MM-DD`), `views`, `notes`. Types and labels live in `lib/leads.ts`.
2. Pick a slug that is hard to guess (the slug is the only thing that "protects" a proposal page),
   e.g. `kadewerf-advocaten-7f3k`.
3. Per-firm content goes in `content/leads/<slug>/`. For a web proposal follow the checklist in
   `content/leads/README.md` (shared template, your own concept site, `npm run capture <slug>`).
4. The overview card thumbnail is generated from the slug, so there is nothing to upload.

The current leads are **fictional placeholders**. Views and status are typed in by hand for now.

Keep `content/leads.ts` server-only: import it from pages, never from a `"use client"` file, or the
data (including notes) ends up in public JavaScript that skips the password.

## Environment variables

| Name | Required | What |
| --- | --- | --- |
| `OVERVIEW_PASSWORD` | yes | Password for `/overview`. Without it nobody can log in. |

## Privacy

- Every page sends `X-Robots-Tag: noindex, nofollow, noarchive` (`next.config.mjs`) and a robots
  meta tag (`app/layout.tsx`). `robots.txt` disallows everything. No sitemap.
- Proposal pages never show status, views, ICP or notes, and never link to `/overview` or to each other.
  Header and footer only link to the main site.
- No analytics, cookies banners or third-party scripts. Fonts are self-hosted by `next/font`.

## Overview password (stopgap)

`middleware.ts` guards `/overview`. Logging in at `/login` posts to `/api/login`, which compares the
password with `OVERVIEW_PASSWORD` and sets an `ae_overview` cookie (httpOnly, SameSite=Lax, 30 days,
`Secure` in production). The cookie holds a SHA-256 hash of the password, not the password. Change the
env var to log everyone out.

This is one shared password with no rate limiting or user accounts. Replace it with real auth
(e.g. Vercel password protection, or an auth provider) before more people need access.

## What is copied from the main site

Kept in sync by hand; if the main site's design changes, copy again.

- `tailwind.config.ts`, `postcss.config.mjs` (unchanged, plus `content/` in the Tailwind content globs)
- `app/globals.css`: base styles, `.frame`, `.eyebrow`, `.btn*`, `.focus-ring`, reduced motion, reveal system
- Fonts (Manrope, Inter, IBM Plex Mono via `next/font`), favicon and app icons, `public/brand/` wordmarks
- `components/Header.tsx`, `Footer.tsx`: same design, Dutch strings hardcoded, absolute links to
  https://www.assembly-engine.com/nl/..., no I18nProvider, no feature flags, no cookie settings
- `components/Logo.tsx`, `icons.tsx` (plus an `Eye` icon), `RevealObserver.tsx`, `MotionRoot.tsx`, `lib/motion.tsx`

## Deploy

1. Create a new Git repo and a **new Vercel project** for this folder (separate from the main site).
2. Set `OVERVIEW_PASSWORD` under Project → Settings → Environment Variables (Production and Preview).
3. Deploy. The framework preset (Next.js) needs no changes.
4. Later: add the domain `proposal.assembly-engine.com` under Project → Domains and create the CNAME
   record it asks for at the DNS provider.
