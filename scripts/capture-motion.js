#!/usr/bin/env node
// Records a short screen capture of the LAB-461 scroll-motion layer for PR
// review: a slow scroll down the home page (hero descent, waterline drift,
// entry reveals) then a click through to /services/ (cross-document view
// transition). Build first:
//   bun run build && node scripts/capture-motion.js
// Output: test-results/motion-capture/<hash>.webm
// Scrolling is driven from Node at wall-clock pace, NOT via an in-page
// requestAnimationFrame loop — headless screencast throttles rAF (near-stall
// on a busy box), while evaluate+sleep steps record smoothly regardless.

const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("@playwright/test");

const PORT = 8097;
const STEPS = 40;

const smoothScrollToBottom = async (page) => {
  const max = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );
  for (let i = 1; i <= STEPS; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((max * i) / STEPS));
    await page.waitForTimeout(80);
  }
};

(async () => {
  const server = spawn("node", [path.join(__dirname, "serve-site.js"), String(PORT)], {
    stdio: "ignore",
  });
  await new Promise((r) => setTimeout(r, 1000));

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    recordVideo: { dir: "test-results/motion-capture/", size: { width: 1280, height: 900 } },
  });
  const page = await context.newPage();

  await page.goto(`http://localhost:${PORT}/`);
  await page.waitForTimeout(1000); // fonts + first paint
  await smoothScrollToBottom(page);
  await page.waitForTimeout(600);

  // cross-document view transition into services, then show its reveals
  await page.click('a[href="/services/"]');
  await page.waitForTimeout(1000);
  await smoothScrollToBottom(page);
  await page.waitForTimeout(600);

  const video = page.video();
  await context.close();
  console.log("saved:", await video.path());
  await browser.close();
  server.kill();
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
