// Pre-renders menu.pdf pages to JPEG images using mupdf (WASM, no native deps)
import mupdf from "mupdf";
import fs from "fs";
import path from "path";

const OUT_DIR = path.join(import.meta.dirname, "pages");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

console.log("Loading PDF...");
const pdfBuf = fs.readFileSync(path.join(import.meta.dirname, "menu.pdf"));
const doc = mupdf.Document.openDocument(pdfBuf, "application/pdf");
const total = doc.countPages();
console.log(`Rendering ${total} pages...`);

for (let i = 0; i < total; i++) {
  const page = doc.loadPage(i);
  // Render at 1.5x scale for good quality
  const pixmap = page.toPixmap([1.5, 0, 0, 1.5, 0, 0], mupdf.ColorSpace.DeviceRGB, false, true);
  const jpgBuf = pixmap.asJPEG(85);
  const outPath = path.join(OUT_DIR, `page-${i + 1}.jpg`);
  fs.writeFileSync(outPath, jpgBuf);
  console.log(`  page ${i + 1}/${total} -> ${outPath} (${(jpgBuf.length / 1024).toFixed(0)} KB)`);
}

console.log("Done!");
