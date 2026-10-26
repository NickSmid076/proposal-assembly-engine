# content/leads/&lt;slug&gt;/

Per-firm proposal content goes here, one folder per lead. The folder name is the lead's `slug`
from `content/leads.ts`, which is also the URL: `proposal.assembly-engine.com/v/<slug>`.

```
content/leads/
  brouwer-lint-accountants/
    proposal.ts      # copy and data for the page (typed, shape per offer type)
    *.png / *.webp   # screenshots or mock-ups for this firm only
```

Not wired up yet. `/v/[slug]` currently renders a stub from the lead record. The page layout per
offer (Web, Dashboards, Automatisering) is still a TODO in `app/v/[slug]/page.tsx`.

Rules for whatever goes in here:

- Prospect-facing only. Private notes, status, views and ICP stay in `content/leads.ts`.
- Do not link to `/overview` or to other firms' proposals.
- Images are imported from this folder (so they get hashed URLs), not placed in `public/`,
  where anyone could list them by guessing names.
