# content/leads/&lt;slug&gt;/

Per-firm proposal content, one folder per lead. The folder name is the lead's `slug` from
`content/leads.ts`, which is also the URL: `proposal.assembly-engine.com/v/<slug>`.

## Web proposals: one template, one concept per lead

Every web proposal uses the same page: `components/proposal/web/WebProposal.tsx`. Structure, style,
3D hero, before/after slider, live concept, mobile comparison, NL/EN switch and pilot section are shared.
Per lead you only write **content** and build the **concept site** (their new website). Lemmens
(`lemmens-550127`) is the reference for both.

Sections, always in this order: hero (concept on a 3D laptop + phone) · what we noticed (pinned
screenshots of their site) · before/after · the concept, clickable · on the phone (today vs concept) ·
what changes · pilot proposal.

### Add one

1. **Lead record**: add it to `content/leads.ts` with `offer: "web"`.
2. **Folder** `content/leads/<slug>/` with:
   - `current-home.jpg` (their homepage, 1440×900), `current-mobile.jpg` (homepage on a phone,
     375 wide), plus one more 1440×900 screenshot of the page your main point is about.
   - Their own photos, logo and other material the concept uses (from their site; imported, never in `public/`).
   - `proposal.ts` exporting `proposal` typed with `satisfies WebProposalContent`
     (`components/proposal/web/types.ts`): domain, hero text, observations with pin positions, mobile
     points, changes table, pilot. Every text is `{ nl, en }`. Facts only from their site or KvK; mark
     anything unverified as an example in the concept.
3. **Concept site** in `components/proposal/<firm>/`, modelled on `components/proposal/lemmens/`:
   - All CSS scoped under one class prefix and laid out with container queries on the screen container
     (so the desktop/mobile toggle and the phone frame work). Its own fonts and palette: this is the one
     part that should look like *their* brand, not ours.
   - A site component that takes `page`, `onPage`, `still` and `cookie` (see `LemmensSite.tsx`), and
     reads text through `useT()` so it follows the NL/EN switch.
   - `<Firm>Preview.tsx` wrapping it in `ConceptPreview`, `PhoneFrame` and `CaptureFrame`
     (`components/proposal/web/ConceptFrames.tsx`).
   - `<Firm>Proposal.tsx` (server): renders `<Bilingual />` and `<WebProposal content preview phone />`,
     plus a `Capture` component.
4. **Register** the slug in `components/proposal/registry.tsx`.
5. **Capture** the concept for the 3D screens and the before/after slider: start `npm run dev`, then
   `npm run capture <slug>` (add `-- --port 3123` if dev runs elsewhere). Until then, copy any jpg to the
   three `concept-*.jpg` names so the build passes. Re-run after every change to the concept homepage.
6. Check `/v/<slug>` on desktop and phone, in NL and EN, then `npm run build && npm run lint`.

Leads without a registry entry get the "in preparation" stub.

## Rules

- Prospect-facing only. Private notes, status, views and ICP stay in `content/leads.ts`.
- Do not link to `/overview` or to other firms' proposals.
- Images are imported from this folder (so they get hashed URLs), not placed in `public/`,
  where anyone could list them by guessing names.
