# The Coffee Circle — Digital Menu

A digital menu web app for The Coffee Circle. Renders a PDF menu (`menu.pdf`) as scrollable image pages using PDF.js, with QR code generation for sharing.

## Quick Start

1. Run the server:
   ```
   Start Menu.bat
   ```
   or manually:
   ```
   node server.js
   ```
2. Open **http://localhost:8123** in your browser (opens automatically).

> Do not open `index.html` directly — PDF.js cannot load files over `file://`. The server must be running.

## Updating the Menu

Replace `menu.pdf` with your new PDF file (keep the same filename). Refresh the browser — a cache-busting query string ensures the latest PDF is always fetched.

## How It Works

1. **PDF.js** loads `menu.pdf` from the server via HTTP range requests (streaming, no full download).
2. All pages render **in parallel** to canvases at scale 1.5, then convert to JPEG images.
3. Each page displays **progressively** — shimmer placeholders appear immediately, and each page swaps in as soon as it finishes rendering.
4. Pages are laid out horizontally in a single scrollable row.
5. QR code is generated client-side from the current URL when the QR button is clicked.

## Files

| File | Purpose |
|------|---------|
| `server.js` | Node static file server with HTTP range support (port 8123) |
| `index.html` | Page structure, loads PDF.js and QRCode.js from CDN |
| `main.js` | PDF loading, parallel page rendering, scroll/nav/QR logic |
| `styles.css` | Styling, layout, animations |
| `menu.pdf` | The menu PDF (replace this to update the menu) |
| `Start Menu.bat` | Shortcut to start the server and open the browser |
| `data.js` | Additional data file |
| `vercel.json` | Deployment config for Vercel |

## Controls

- **Scroll / swipe** — browse pages horizontally
- **Arrow keys** — navigate left/right
- **Nav buttons** — click arrows on screen
- **QR button** (top-left) — generate QR code for the current URL
