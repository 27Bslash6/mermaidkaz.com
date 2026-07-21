// LAB-461 scroll-driven motion layer — the two contract halves:
//  1. motion ON  (no-preference): scroll timelines actually drive the hero
//     descent and entry reveals, and the motion-active page still passes
//     axe WCAG2A/AA (pa11y guards the static page via
//     --force-prefers-reduced-motion in .pa11yci — see docs/design-loop.md).
//  2. motion OFF (reduce): no scroll animation applies at all; every reveal
//     target is fully visible without scrolling. This is the WCAG 2.3.3
//     fallback the axe/pa11y scanners and screenshot baselines rely on.
// page.emulateMedia() throughout — the reducedMotion context option is
// silently ignored in this runner setup (see playwright.config.js).
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const IDENTITY = new Set(['none', 'matrix(1, 0, 0, 1, 0, 0)']);

const scrollTo = (page, y) =>
  page.evaluate(async (top) => {
    window.scrollTo(0, top);
    await new Promise(requestAnimationFrame);
  }, y);

test.describe('motion active', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
  });

  test('axe WCAG2A/AA — home page with motion running', async ({ page }) => {
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target}`
    );
    expect(summary).toEqual([]);
  });

  // Scroll-driven animation effects attach one frame AFTER load (verified
  // empirically), so every motion-state read polls instead of one-shotting.

  test('hero descends on scroll (scroll(root) timeline)', async ({ page }) => {
    // LAB-470 moved the photo to a full-bleed .hero-banner; the descend
    // animation rides the img itself so the in-banner waterline holds still
    const hero = page.locator('.hero-banner .hero-img');
    expect(IDENTITY.has(await hero.evaluate((el) => getComputedStyle(el).transform))).toBe(true);
    await scrollTo(page, 600);
    await expect
      .poll(async () => IDENTITY.has(await hero.evaluate((el) => getComputedStyle(el).transform)))
      .toBe(false);
  });

  test('below-fold content reveals on entry (view() timeline)', async ({ page }) => {
    const band = page.locator('.cta-band');
    await expect
      .poll(async () => band.evaluate((el) => getComputedStyle(el).opacity))
      .toBe('0');
    await band.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await expect
      .poll(async () => band.evaluate((el) => getComputedStyle(el).opacity))
      .toBe('1');
  });

  test('waterline layers drift apart on scroll', async ({ page }) => {
    const layers = page.locator('.hero .wave-layer');
    await scrollTo(page, 300);
    await expect
      .poll(async () => {
        const [back, front] = await Promise.all([
          layers.nth(0).evaluate((el) => getComputedStyle(el).transform),
          layers.nth(1).evaluate((el) => getComputedStyle(el).transform)
        ]);
        return back !== front && !IDENTITY.has(front);
      })
      .toBe(true);
  });
});

test.describe('motion reduced', () => {
  test('page is fully static and nothing is hidden', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    expect(await page.locator('.cta-band').evaluate((el) => getComputedStyle(el).opacity)).toBe('1');

    await scrollTo(page, 600);
    const hero = page.locator('.hero-banner .hero-img');
    expect(await hero.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    expect(IDENTITY.has(await hero.evaluate((el) => getComputedStyle(el).transform))).toBe(true);
  });
});
