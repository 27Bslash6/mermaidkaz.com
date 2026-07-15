#!/usr/bin/env node
// Serves _site and runs pa11y-ci against the local sitemap, so
// `bun run test:accessibility` is self-contained in CI and locally.
// Run `bun run build:prod` first.

const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const PORT = 8080;
const ROOT = path.join(__dirname, "..", "_site");
const SITE_URL = require("../src/_data/site.json").url;

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
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

if (!fs.existsSync(ROOT)) {
  console.error("_site not found — run the build first");
  process.exit(1);
}

const server = http.createServer((req, res) => {
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
});

server.listen(PORT, "127.0.0.1", () => {
  // ponytail: POSIX .bin path; use require.resolve if Windows ever matters
  const pa11y = spawn(
    path.join(__dirname, "..", "node_modules", ".bin", "pa11y-ci"),
    [
      "--sitemap", `http://localhost:${PORT}/sitemap.xml`,
      "--sitemap-find", SITE_URL,
      "--sitemap-replace", `http://localhost:${PORT}`,
    ],
    { stdio: "inherit" },
  );
  pa11y.on("exit", (code) => {
    server.close();
    process.exit(code ?? 1);
  });
});
