# Design Direction — "Southern-Ocean Luminous"

**Status:** Stage 1 proposal (LAB-14) — awaiting owner approval before Stage 2 applies it to the live site.
**Review it as pixels:** build and open [`/design/`](../src/design.njk) (`bun start`, then http://localhost:8080/design/), or run `bun run design:verify` and read the screenshots in `test-results/`.

## Overview

MermaidKaz is a Tasmanian brand. Tasmanian water is not resort turquoise — it is
cold, clear, kelp-dark southern ocean, luminous where light cuts through.
The direction takes the tagline literally:

- **Light mode = above the water.** Sea-glass paper, white panels lit from above, deep-water ink.
- **Dark mode = below the water.** Abyssal blue-green (not navy), foam-white text, sea-glass secondary.
- **One accent = sunlight through water.** A coral-gold used for every call to action and highlight — and nothing else.

Depth is expressed by **tone** (the t0/t2/t3 ladder), never by drop shadows.
This is the same method as the CacheKit brochure token contract; only the palette
is native to this brand.

## Palette rationale

All values live in `src/assets/css/tokens.css` — the only file allowed raw hex.

| Token | Role | Why |
|---|---|---|
| `--color-t0/t2/t3` | page / raised / recessed | The tonal ladder does the depth work. In light mode panels get *lighter* (closer to the sun); in dark mode raised panels get *lighter too* (nearer the surface) — the metaphor holds in both. |
| `--color-ink/ink2/ink3` | text hierarchy | Blue-green cast inks instead of neutral grey — everything stays in the water. All three pass WCAG AA on `t0` in both modes (4.6:1 worst case, hand-computed, axe-gated). |
| `--color-accent` | the single accent | Coral-gold: sunlight hitting the surface, treasure below it. Deliberately warm against the cool ladder so CTAs are unmissable. It also keeps continuity with the existing site accent (`#f39c12`) — evolution, not rupture. |
| `--color-on-accent` / `--color-accent-ink` | accent contrast pair | One hue, three roles: surface, ink-on-surface, accent-as-text. This is how a "single accent" survives AA in both modes (accent text is darkened on light, the raw accent is already 9.7:1 on dark). |
| `--color-line/line2` | hairlines | Translucent + solid hairline instead of shadows. |

What was rejected: the current three-accent scheme (ocean blue + sea-foam +
coral gold competing), gradient text headings, and box-shadow depth — that is
the generic aesthetic this contract replaces.

## Type choices

Self-hosted variable fonts (`@fontsource-variable`, no CDN; latin subset, full axes):

- **Display — Fraunces Variable.** A soft, "wonky" serif with genuine storybook
  character; the tagline set in its italic with `SOFT 70, WONK 1` reads as magic
  without a single swash cliché. Editorial enough for course pages aimed at adults.
- **UI/body — Nunito Sans Variable.** Humanist, open, rounded-but-grown-up.
  Friendly to parents booking parties, legible for course details, and it holds
  small sizes far better than the current Poppins.

Poppins (Google CDN) and the Pico CDN stylesheet are replaced in Stage 2 —
Stage 1 only ships the fonts and contract.

## Moodboard / references

- Southern-ocean kelp forests, Tasmania (Great Southern Reef imagery) — the dark-mode ladder.
- Sea glass and foam lines on cold-water beaches — light-mode surfaces and hairlines.
- Bioluminescence (Tasmania's *Noctiluca* blooms) — luminous text-on-dark treatment.
- Late-afternoon light through a wave face — the one warm accent.
- Method reference: CacheKit brochure `src/styles/tokens.css` (tonal ladder + single accent + drift lock).

## How it reads against the tagline

"Magic above and below the water" is rendered structurally, not decoratively:
the two theme modes *are* above and below. The magic lives in Fraunces' wonk
and the single gold accent; the professionalism (PADI instruction, water
safety, 17 years teaching) lives in the restraint of everything else. No
gradients, no emoji bullets, no shimmer effects — a mermaid brand an adult
books a $1,800 retreat from.

## Open questions for the owner

1. Does coral-gold feel right as the *only* accent, or should Stage 2 explore a cooler (bioluminescent aqua) accent variant on the harness first?
2. Fraunces italic tagline treatment — approve as the brand's display voice?
3. Dark mode: ship user-toggleable, follow system preference, or light-only at launch?
