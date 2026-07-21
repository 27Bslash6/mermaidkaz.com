# Design Direction — "Midnight Water & Treasure Gold"

**Status:** Stage 1 proposal (LAB-14), rev 2 — awaiting owner approval before Stage 2 applies it to the live site.
**Review it as pixels:** build and open [`/design/`](../src/design.njk) (`bun start`, then http://localhost:8080/design/), or run `bun run design:verify` and read the screenshots in `test-results/`.

## Overview

This direction is **derived from the live site's own design language**
(https://www.mermaidkaz.com/ — the current Wix build), not invented. The Wix
theme was extracted directly from the page and its exact brand values are
carried into the token contract. The site is a professional mermaid brand
speaking in **night-water blues, periwinkle, and treasure gold**, with a
cursive signature voice. The tagline maps onto the two modes:

- **Light mode = above the water.** Periwinkle-sky paper, white panels, midnight-navy ink.
- **Dark mode = below the water.** Midnight navy at depth, moonlight text, periwinkle sea-glass.
- **One accent = treasure gold.** The site's `#ffdc21`, used for every call to action — and nothing else.

Depth is expressed by **tone** (the t0/t2/t3 ladder), never by drop shadows —
the CacheKit-brochure method; the palette is the brand's own.

## Palette rationale — traceable to the live site

Extracted from mermaidkaz.com's Wix theme custom properties:

| Live site value | Wix slot | Where it lands in `tokens.css` |
|---|---|---|
| `#152040` midnight navy | `--color_1` (primary dark) | `--color-ink` (light) / `--color-on-accent`; dark ladder is built around it |
| `#2f4890` royal blue | `--color_9` | `--color-ink2` (light), exact |
| `#afbde5` light periwinkle | `--color_7` | `--color-ink2` (dark), exact |
| `#5f7acb` periwinkle | `--color_8` (interactive) | the family `ink3`/`line2` are cut from |
| `#d9e3ff` pale periwinkle | `--color_20` | light-mode surface family (`t0`/`t3`) |
| `#ffdc21` golden yellow | `--color_5` (highlight) | `--color-accent`, exact |

The periwinkle ramp is treated as part of the **ladder** (it is the site's blue
mid-range), leaving gold as the single accent — same roles the live site
already gives them: periwinkle for structure and interaction surfaces, gold
for the pop. Contrast is hand-verified and axe-gated: worst pair 4.9:1
(dark `ink3` on raised panels); gold-as-text hits 12.6:1 on midnight.

The site also carries an aqua ramp (`#17d1d1` family) in its extended theme —
deliberately **not** promoted to a token yet (single-accent rule); available
for Stage 2 if the owner wants an aquatic secondary for illustrations.

Rejected (rev 1): a cold kelp-teal "southern-ocean" palette with coral-gold —
editorially nice, but it was not this brand. The owner's live site is the
brief, not a moodboard.

## Type choices — same architecture as the live site

The live site speaks **Poppins semibold** (headings) + **Poppins extralight**
(body) + **Marck Script** (cursive signature moments). The contract keeps that
exact architecture, self-hosted (`fontsource`, no CDN; latin subsets):

- **Outfit Variable** — display *and* UI. The variable-font successor to
  Poppins: same geometric, friendly voice, one file for every weight
  (headings ~620–640, body ~400, extralight moments ~320). Poppins itself
  ships no variable font, and the static family would cost a file per weight.
- **Marck Script** — the site's own cursive, kept for the signature flourish:
  the tagline and equivalent "magic" moments only. Never body copy.

## Moodboard / references

- The live site itself: https://www.mermaidkaz.com/ — night-water hero imagery, navy fields, gold highlights, script flourishes.
- Moonlight on open water at night — the dark-mode ladder.
- Periwinkle sky reflected on a calm morning surface — the light-mode ladder.
- Treasure glinting at depth — the gold accent.
- Method reference: CacheKit brochure `src/styles/tokens.css` (tonal ladder + single accent + drift lock).

## How it reads against the tagline

"Magic above and below the water" is rendered structurally: the two theme
modes *are* above and below. The magic lives in Marck Script and the treasure
gold; the professionalism (PADI instruction, 17 years teaching) lives in
Outfit's clean geometry and the restraint of a one-accent system. It is the
current brand, distilled into a contract — evolution the existing audience
will recognise, minus the Wix noise.

## Open questions for the owner

1. Does the harness read as *your* brand? (Every core value is lifted from your live site — flag anything that doesn't feel right.)
2. Marck Script for the tagline: keep, or reserve script for the logo only?
3. Dark mode: ship user-toggleable, follow system preference, or light-only at launch?
