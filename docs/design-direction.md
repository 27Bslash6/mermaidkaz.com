# Design Direction — "Sunlit Lagoon & Tail-Fin Violet"

**Status:** Stage 1 proposal (LAB-14), rev 3 — awaiting owner approval before Stage 2 applies it to the live site.
**Review it as pixels:** build and open [`/design/`](../src/design.njk) (`bun start`, then http://localhost:8080/design/), or run `bun run design:verify` and read the screenshots in `test-results/`.

## Overview — this rev is built on colour analysis, not theme variables

Method (reproducible via `node scripts/live-site-analysis.js <url> <out.png>`):
the live https://www.mermaidkaz.com/ was **rendered in Playwright and its
actual pixels analysed** — a quantized dominant-colour histogram over the
full-page screenshot — then the screenshot was reviewed by eye.

What the pixels say (top families, share of page):

| Family | Measured | Share | Where it lives on the site |
|---|---|---|---|
| Soft aqua / sea-glass | `#aacccc` `#bbcccc` `#aadddd` `#99ccdd` | ~15% | water, wave foam, shallows |
| Warm sand / skin | `#aa9988` `#bb9988` `#aa8866` `#eeddcc` | ~15% | beach, performer — photography |
| Vivid turquoise | `#17d1d1`–`#4fffff` band | header/footer bands, hero script, logo | the brand's signature field |
| Purple / violet | logo script, nav links, tail-fin iridescence | accent-scale | the brand's "magic" voice |
| White | `#ffffff` | ~1.5% + fields | panels, tagline text |

Two earlier revs failed for the same root cause and are recorded here so it
can't happen again: **rev 1** invented a palette (kelp-teal/coral, no analysis);
**rev 2** trusted the Wix *theme slots* (`--color_N`), which turned out to be
mostly the template's unused defaults (midnight navy / periwinkle / gold appear
almost nowhere in the rendered pixels). The aqua ramp rev 2 dismissed is the
actual brand field. Lesson, twice paid: **analyse rendered pixels, not
configuration.**

## The direction

- **Light mode = above the water.** Sunlit foam and shallows (pale aqua ladder), deep-water ink, white panels.
- **Dark mode = below the water.** Deep lagoon teal (not navy, not black), foam text, sea-glass secondary — the measured `#aacccc` family, brightened for AA.
- **One accent = tail-fin violet.** The purple the site already uses for its logo script, nav links, and the tail's iridescence. Buttons and links speak violet; nothing else does.
- **Sand stays in the photographs.** The warm `#eeddcc` family enters through imagery (which the site is built on) — it is deliberately not a surface token, so components stay in one hue family. Stage 2 can revisit if a warm wash is wanted.
- Depth by **tone** (t0/t2/t3 ladder), never drop shadows — the CacheKit method throughout.

Vivid turquoise (`#17d1d1`) is a mid-tone: unusable as AA text on light and
unusable under white text (≤2:1 either way) — which is why the site itself
only uses it as decorative bands and display-script fills. In the contract it
lives as `--color-ink2` in light mode, cut to `#12777a` — the same hue, dark
enough to read (4.8:1) — so headlines and the tagline can carry brand
turquoise legibly. Contrast is hand-computed and axe-gated; worst pair 4.8:1.

## Type choices — validated against the live site

- **Marck Script** — confirmed by analysis: the hero "Mermaid Kaz" and logo
  script on the live site **is** Marck Script (it also appears in the site's
  own CSS). Kept for the tagline/signature flourish only. Self-hosted.
- **Outfit Variable** — display + UI. The live site's sans stack is Poppins
  (semibold headings / extralight body, with Quicksand and Raleway traces);
  Poppins ships no variable font, so Outfit — its closest variable successor —
  carries the same geometric, friendly voice in one file.
- The live site sets the tagline in an *italic serif* over the hero photo.
  Not carried over (two faces beat three — KISS); flagged as an open question.

## How it reads against the tagline

"Magic above and below the water": the modes are above and below, the magic is
the violet iridescence and the script, the professionalism is Outfit's clean
geometry and a one-accent system. This is the site's existing sunlit, vivid,
feminine character distilled into tokens — not a re-imagining of it.

## Open questions for the owner

1. Does the violet accent match your purple? (Screen-sampled from logo/nav/tail — if you have an official brand value, it drops straight into `tokens.css`.)
2. Tagline face: Marck Script (as proposed) or the live site's italic serif as a third voice?
3. Dark mode: ship user-toggleable, follow system preference, or light-only at launch?
