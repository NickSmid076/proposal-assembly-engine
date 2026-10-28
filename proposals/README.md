# Assembly Engine proposals

## Purpose

Private proposals site for Assembly Engine, to be deployed at proposal.assembly-engine.com. One Next.js app. Each lead gets one page at `/v/[slug]`. `/overview` lists all proposals and is for the owner only. This repo holds finished, lead-facing assets only. Prospect research lives outside it, in `Sales/Prospects/<firm>/`.

## Folder rules

`content/proposals/<slug>/` holds only what the lead may see:
- `proposal.json`
- `assets/`: finished images and files used on the proposal page

Never commit:
- Analysis markdown or research notes
- Screenshots of the lead's current/old website
- Personal data beyond firm name and website (no contact names, emails, phone numbers)
- Passwords, secrets, `.env` files

Local scratch goes in `_private/` at the top level. It is gitignored.

## Slug rules

- Format: `<firm>-<token>`, e.g. `examplefirm-3f9c1a`
- Token: random 6-character lowercase hex (`openssl rand -hex 3`)
- Must be unguessable. Never derive it from names or dates.
- Never reuse a slug, even after a proposal is deleted.

## proposal.json

| Field | Meaning |
|---|---|
| `slug` | Folder name and URL path (`/v/<slug>`) |
| `firm` | Legal firm name |
| `website` | Firm's website |
| `icp` | ICP segment code, e.g. `1A` |
| `template` | Template used to render the page |
| `status` | See below |
| `created` | Date created (`YYYY-MM-DD`) |
| `sent` | Date sent, or `null` |
| `expires` | Expiry date, or `null` |
| `title` | Page title |
| `intro` | Intro text |
| `sections` | Page sections |
| `notes_internal` | Owner-only note. Never rendered on the lead page. |

Allowed `status` values: `draft`, `sent`, `viewed`, `replied`, `expired`.

## Privacy

- All pages `noindex`
- No sitemap
- `/overview` is password-gated

Implementation comes later.

## Lifecycle

1. Create as `draft`.
2. Set `sent` and `expires` when sending.
3. Update `status` as the lead responds.
4. When the proposal is closed or expired, delete its folder from `content/proposals/`.
