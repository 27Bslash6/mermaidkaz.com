#!/usr/bin/env node
// Token-drift gate: raw hex belongs in tokens.css and nowhere else.
// Any other stylesheet with a hex literal fails the build. (The Stage-1
// main.css grandfather ended when Stage 2 moved it onto the token ladder.)

const fs = require("fs");
const path = require("path");

const CSS_DIR = path.join(__dirname, "..", "src", "assets", "css");
const CONTRACT = "tokens.css";
// 8 before 6 before 4/3 so #rrggbbaa isn't half-matched
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;

let failed = false;

for (const file of fs.readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"))) {
  if (file === CONTRACT) continue;
  const hits = [];
  fs.readFileSync(path.join(CSS_DIR, file), "utf8")
    .split("\n")
    .forEach((line, i) => {
      const m = line.match(HEX);
      if (m) hits.push(`  ${file}:${i + 1}  ${m.join(" ")}`);
    });
  if (hits.length === 0) continue;
  console.error(`[drift] FAIL ${file} — raw hex outside the token contract:`);
  for (const h of hits) console.error(h);
  failed = true;
}

if (failed) process.exit(1);
console.log("[drift] OK — no raw hex outside tokens.css");
