// Playwright config for the design loop (docs/design-loop.md).
// LAB-29 decision: built-in toHaveScreenshot, linux-only baselines
// (no {platform} in snapshotPathTemplate), axe as the deterministic gate.
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }]]
    : [["list"]],
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFileName}/{arg}{ext}",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
  use: {
    baseURL: "http://127.0.0.1:8091",
    ...devices["Desktop Chrome"],
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    locale: "en-AU",
    timezoneId: "Australia/Hobart",
    contrast: "no-preference",
  },
  webServer: {
    command: "node scripts/serve-site.js 8091",
    url: "http://127.0.0.1:8091/design/",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
