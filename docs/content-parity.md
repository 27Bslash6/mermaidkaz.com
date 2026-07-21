# Content parity — legacy Wix site → this build

Audited 2026-07-21 against the live site (`https://www.mermaidkaz.com/`), the
single source of truth for content and brand (LAB-15 decision: nothing is
trusted until verified against it; copy is never invented). LAB-489.

## Live page inventory

Every page the live site exposes, from the rendered nav + `sitemap.xml`:

| Live page                        | In nav? | Maps to                    | Status                                                                                                                                                                                                             |
| -------------------------------- | ------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/` (Home)                       | yes     | `/`                        | ✅ Hero = logo + "Magic above and below the water"; both present. Live home has no further copy.                                                                                                                   |
| `/about`                         | yes     | `/about/`                  | ✅ All three paragraphs migrated (third-person adaptation; facts verbatim — LAB-15 verified).                                                                                                                      |
| `/padi-mermaid-courses-retreats` | yes     | `/services/#courses`       | ✅ Live page is a single link-out to Freedive Tasmania; ours keeps that exact booking path (`freedivetasmania.com/search?q=mermaid`).                                                                              |
| `/mermaid-entertainment`         | yes     | `/services/#entertainment` | ✅ Intro paragraph migrated; the three package flyers (image-baked on the live site) are transcribed below.                                                                                                        |
| `/contact-us`                    | yes     | `/contact/`                | ⚠️ Live page is a Wix form ("Mermaid Kaz will be in touch soon!"). We link `info@mermaidkaz.com` instead — **email unverified by the live site** (it publishes no address). Owner-pending since LAB-15.            |
| Social bar (all pages)           | yes     | footer icons               | ✅ Facebook verified: `facebook.com/profile.php?id=61553609431660`. ⚠️ The live Instagram icon has **no link** (Wix renders it as a linkless div); handle `@mermaid_kaz` kept from repo data — confirm with owner. |
| Footer                           | yes     | footer                     | ✅ Live footer is "Copyright Mermaid Kaz 2024" only.                                                                                                                                                               |

### The "More" dropdown

Resolved: the live nav renders exactly the five pages above. The extra menu
entries in the page data (`Events`, `My Account`, `My Bookings`, `My Wallet`,
`Profile`) are the **Wix members-area menu** — login-gated platform chrome,
not public content. No hidden Gallery/Blog exists; no spin-out ticket needed.

### Orphaned pages (in sitemap, not linked from nav)

Published-but-unlinked Wix leftovers. None carry content the nav pages lack;
none migrated:

- `/services` — older duplicate of the entertainment page ("Nothing to book
  right now").
- `/padi-mermaid-courses` — abandoned Wix **template demo** (stock "Blue
  Canyon / Diver's Key / Whale View" dive sites, template media account
  `84770f_*`, not Kaz's `aa91af_*`).
- `/retreat-booking-request` — dated "Summer 2025 Retreat" booking form.
- `/shop` — empty Wix shop scaffold.
- `/event-list` + `/event-details/underwater-masquerade-ball` — one past
  event (Apr 2024).

## Package flyers — transcription provenance

The live entertainment packages are baked into three PNG flyers
(`static.wixstatic.com/media/aa91af_{2d513ffd…,a4e0edf6…,432639f6…}~mv2.png`,
1587×2245). Transcribed from the full-resolution images on 2026-07-21; the
copy in `src/services.md` matches them line for line, including prices:

1. **Birthday Parties — Dry Land Experience** — 1.5 hour party; photo
   opportunities; mermaid temporary tattoos; mermaid face paint; mermaid
   story time; gift for birthday child; 2 party games. **$420 all-inclusive
   for 10 children, plus travel costs.** Optional extras: plastic-free party
   bags, customised invitations.
2. **Birthday Parties — Pool or Beach Experience** — 1.5 hour party (private
   or public pools, or beach); photo opportunities; mermaid temporary
   tattoos; mermaid face paint; gift for birthday child; 1 party game; Swim
   with a Mermaid experience. **$460 all-inclusive for 10 children, plus
   travel costs.** Same optional extras.
3. **Public Appearances — Beach, Pool or On Land** — perfect for promotional
   and community events; photo opportunities; Meet and Greet a Mermaid time;
   Swim with a Mermaid experience (if in water); crafts, temp tattoos,
   facepainting. **1.5 hours minimum booking, $175 per hour, plus travel
   costs.**

This clears the LAB-15 "entertainment package details live in Wix images"
owner-pending item: the copy is now live-verified, not fabricated.

## Brand assets

- **Logo**: captured from the live site
  (`static.wixstatic.com/media/aa91af_e4791d2e99894589ae9094185ae8a2e0~mv2.png`,
  500×500 original) → self-hosted at `src/assets/images/logo.png`. No asset
  hotlinks the Wix CDN.
- **favicon.ico**: previous file was a 99-byte text placeholder. Regenerated
  from the captured logo (circular mark crop, PNG-embedded ICO, 16/32/48 px).

## Still owner-pending (flagged, not authored)

- `info@mermaidkaz.com` — live site exposes a form only, no address.
- Instagram handle `@mermaid_kaz` — live site's own Instagram icon is
  linkless; handle unverifiable from the site alone.
- Retreats — live site has no public retreats copy (only the orphaned dated
  form), so `/services/#retreats` stays deliberately minimal.
