#!/usr/bin/env node
// One-off colour analysis of the LIVE mermaidkaz.com — screenshots real
// rendered pixels, then extracts a quantized dominant-colour histogram.
// Not part of the design loop; evidence-gathering for LAB-14 rev 3.
const { chromium } = require("playwright");
const sharp = require("sharp");

const URL = process.argv[2] || "https://www.mermaidkaz.com/";
const OUT = process.argv[3] || "live-home.png";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(3000); // Wix lazy-loads media
  await page.screenshot({ path: OUT, fullPage: true });
  await browser.close();

  // Quantize to 4 bits/channel and count — dominant colour histogram
  const { data, info } = await sharp(OUT).resize({ width: 320 }).raw().toBuffer({ resolveWithObject: true });
  const counts = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const total = data.length / info.channels;
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20);
  for (const [key, n] of top) {
    const r = ((key >> 8) & 15) * 17, g = ((key >> 4) & 15) * 17, b = (key & 15) * 17;
    const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
    console.log(`${hex}  ${((n / total) * 100).toFixed(1)}%`);
  }
})();
