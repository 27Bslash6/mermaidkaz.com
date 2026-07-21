# Design Loop — playbook

Local-first visual iteration for mermaidkaz.com. No vendor-cloud design tools;
everything runs in-repo. Ported from the CacheKit brochure loop (LAB-14).

## The loop

```
edit tokens/CSS  →  bun run design:verify  →  read screenshots  →  repeat
```

`bun run design:verify` does, in order:

1. `bun run build` — Eleventy build into `_site/`.
2. `bun run design:drift` — token-drift gate: fails if raw hex appears in any
   stylesheet other than `tokens.css` (`main.css` is grandfathered until Stage 2).
3. `bunx playwright test` — serves `_site/` and runs:
   - **axe WCAG2A/AA on `/design/`** — the deterministic pass/fail gate over
     the full token palette (light-only by owner decision, LAB-14).
   - **Screenshots** of the harness and key pages (`/`, `/about/`, `/services/`,
     `/contact/`) — pixel-locked locally via `toHaveScreenshot` (linux-only
     baselines in `tests/__screenshots__/`); capture-only in CI (artifacts, no
     pixel assert — font rendering differs across environments; axe is the gate).

Refresh baselines after an intentional visual change:

```
bun run design:update
```

## Where things live

| Thing | Path |
|---|---|
| Token contract (ONLY file with raw hex) | `src/assets/css/tokens.css` |
| Self-hosted fonts (`@font-face`) | `src/assets/css/fonts.css` + `.eleventy.js` passthrough |
| Design harness page | `src/design.njk` → `/design/` (noindex, out of sitemap/nav) |
| Harness styling (Stage-2 component proposals) | `src/assets/css/design-harness.css` |
| Playwright config + specs | `playwright.config.js`, `tests/design.spec.js` |
| Drift gate | `scripts/check-token-drift.js` |
| Brand rationale | `docs/design-direction.md` |

## How to add a component to the harness

1. Add the markup to the `panel()` macro in `src/design.njk` (it renders once
   per theme automatically). Reuse the real include from `src/_includes/`
   where one exists — the harness should exercise production markup.
2. Style it in `design-harness.css` under the `.dh` scope using **tokens only**.
3. `bun run design:verify` — axe gates contrast, drift gates hex, screenshots
   update your eyes. Commit refreshed baselines with the change.

## The drift lock

Raw palette values outside `tokens.css` are a build failure, not a code-review
nitpick. `design:drift` scans every `src/assets/css/*.css`:

- `tokens.css` — allowed (it IS the contract).
- `main.css` — grandfathered with a warning until Stage 2 migrates it onto the
  ladder; every other file fails the build on the first hex literal.

Fonts are part of the same contract: `--font-display` / `--font-ui` /
`--font-script` only — no new `font-family` declarations outside `tokens.css`.

## Relationship to the existing a11y gates (LAB-12)

`bun run test` (html-validate + pa11y-ci over the sitemap) keeps gating the
**live site pages** in CI, unchanged. The axe gate here covers the **design
harness** — which pa11y never sees (it's excluded from the sitemap) — and
therefore both theme palettes. No page is scanned twice; the tools split by
surface, not by overlap.
