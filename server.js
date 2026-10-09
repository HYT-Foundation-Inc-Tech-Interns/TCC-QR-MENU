// Simple static file server for The Coffee Circle menu
// Run: node server.js  then open http://localhost:8123
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8123;
const DIR = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/menu.html";
  const filePath = path.join(DIR, decodeURIComponent(urlPath));
  if (!filePath.startsWith(DIR)) { res.writeHead(403); res.end("Forbidden"); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found: " + urlPath); return; }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(data);
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("The Coffee Circle menu server running:");
  console.log("  Open http://localhost:" + PORT + " in your browser");
  console.log("  Press Ctrl+C to stop");
  // Auto-open browser
  const { exec } = require("child_process");
  const start = process.platform === "win32" ? "start" : process.platform === "darwin" ? "open" : "xdg-open";
  exec(start + ' "" http://localhost:' + PORT, () => {});
});
