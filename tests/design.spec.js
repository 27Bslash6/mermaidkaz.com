// Design loop verification (docs/design-loop.md):
//  1. axe WCAG2A/AA on /design/ — the deterministic gate over the full
//     token palette (light-only by owner decision, LAB-14).
//  2. Screenshots of the harness + key pages — pixel-locked locally
//     (toHaveScreenshot, linux baselines); capture-only in CI because font
//     rasterization differs across environments and axe is the gate there.
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const PAGES = [
  { path: "/design/", name: "design-harness" },
  { path: "/", name: "home" },
  { path: "/about/", name: "about" },
  { path: "/services/", name: "services" },
  { path: "/contact/", name: "contact" },
];

test("axe WCAG2A/AA — design harness", async ({ page }) => {
  await page.goto("/design/");
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const summary = results.violations.map(
    (v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target}`,
  );
  expect(summary).toEqual([]);
});

for (const { path: pagePath, name } of PAGES) {
  test(`screenshot — ${name}`, async ({ page }) => {
    // Baselines capture the static reduced-motion page: deterministic pixels
    // (no scroll-driven poses in fullPage stitches) and standing proof the
    // LAB-461 motion layer degrades cleanly. emulateMedia, not the context
    // option — the latter is silently ignored here (see playwright.config.js).
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(pagePath);
    await page.evaluate(() => document.fonts.ready);
    if (process.env.CI) {
      await page.screenshot({ path: `test-results/capture/${name}.png`, fullPage: true });
    } else {
      await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
    }
  });
}
