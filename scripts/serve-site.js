#!/usr/bin/env node
// Minimal static server over _site/ for the Playwright design loop.
// Usage: node scripts/serve-site.js [port]   (default 8091)
// Same serving logic as test-a11y.js's embedded server; kept separate so the
// pa11y flow and the Playwright webServer don't entangle.

const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = Number(process.argv[2]) || 8091;
const ROOT = path.join(__dirname, "..", "_site");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

if (!fs.existsSync(ROOT)) {
  console.error("_site not found — run `bun run build` first");
  process.exit(1);
}

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let filePath = path.join(ROOT, path.normalize(urlPath));
    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403).end();
      return;
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`serving _site on http://127.0.0.1:${PORT}`);
  });
