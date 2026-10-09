/* ============================================================
   The Coffee Circle — Digital Menu (Scroll Reader)
   ------------------------------------------------------------
   Loads menu.pdf via PDF.js, renders each page to an image,
   and lays ALL pages out horizontally in a single scrollable
   row. Includes auto-generated QR code from the current URL.
   ============================================================ */

(function () {
  "use strict";

  // ---------- Elements ----------
  const scrollContainer = document.getElementById("scrollContainer");
  const scrollTrack = document.getElementById("scrollTrack");
  const loader = document.getElementById("loader");
  const emptyState = document.getElementById("emptyState");
  const navPrev = document.getElementById("navPrev");
  const navNext = document.getElementById("navNext");
  const pageCounter = document.getElementById("pageCounter");
  const hint = document.getElementById("hint");

  // ---------- State ----------
  let pages = [];      // { img: dataURL, bg: "#rrggbb" }
  let currentPage = 0;

  // ---------- PDF.js worker ----------
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  }

  // ---------- Sample background color ----------
  function sampleBackground(canvas) {
    try {
      const ctx = canvas.getContext("2d");
      const w = canvas.width, h = canvas.height;
      const pts = [[2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3], [Math.floor(w / 2), 2], [2, Math.floor(h / 2)], [w - 3, Math.floor(h / 2)]];
      let r = 0, g = 0, b = 0;
      for (const [x, y] of pts) { const d = ctx.getImageData(x, y, 1, 1).data; r += d[0]; g += d[1]; b += d[2]; }
      const n = pts.length;
      return "#" + [r, g, b].map(v => Math.round(v / n).toString(16).padStart(2, "0")).join("");
    } catch (e) { return "#fdfaf4"; }
  }

  // ---------- Load & render PDF ----------
  async function loadPdf() {
    try {
      if (!window.pdfjsLib) throw new Error("PDF.js not loaded");
      const pdf = await pdfjsLib.getDocument("menu.pdf").promise;
      const total = pdf.numPages;

      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;
        pages.push({ img: canvas.toDataURL("image/jpeg", 0.9), bg: sampleBackground(canvas) });
      }

      buildPages();
      loader.hidden = true;
      updateUI();
    } catch (err) {
      console.error("Failed to load PDF:", err);
      loader.hidden = true;
      emptyState.hidden = false;
    }
  }

  // ---------- Build page elements ----------
  function buildPages() {
    scrollTrack.innerHTML = "";
    pages.forEach((p, i) => {
      const item = document.createElement("div");
      item.className = "page-item";
      item.dataset.page = i;

      const img = document.createElement("img");
      img.src = p.img;
      img.alt = `Menu page ${i + 1}`;
      img.style.background = p.bg;
      item.appendChild(img);

      scrollTrack.appendChild(item);
    });
  }

  // ---------- Scroll tracking ----------
  function getCurrentPage() {
    const items = scrollTrack.querySelectorAll(".page-item");
    if (items.length === 0) return 0;
    const containerRect = scrollContainer.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closest = 0;
    let closestDist = Infinity;
    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const dist = Math.abs(center - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  function scrollToPage(index) {
    const items = scrollTrack.querySelectorAll(".page-item");
    if (!items[index]) return;
    items[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
  }

  function updateUI() {
    const total = pages.length;
    if (total === 0) return;
    pageCounter.textContent = `${currentPage + 1} / ${total}`;
    navPrev.disabled = (currentPage <= 0);
    navNext.disabled = (currentPage >= total - 1);
  }

  // ---------- Scroll event (throttled via rAF) ----------
  let ticking = false;
  scrollContainer.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const newPage = getCurrentPage();
        if (newPage !== currentPage) {
          currentPage = newPage;
          updateUI();
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ---------- Nav buttons ----------
  navPrev.addEventListener("click", () => {
    hideHint();
    if (currentPage > 0) {
      currentPage--;
      scrollToPage(currentPage);
      updateUI();
    }
  });
  navNext.addEventListener("click", () => {
    hideHint();
    if (currentPage < pages.length - 1) {
      currentPage++;
      scrollToPage(currentPage);
      updateUI();
    }
  });

  // ---------- Keyboard ----------
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      hideHint();
      if (currentPage > 0) { currentPage--; scrollToPage(currentPage); updateUI(); }
    }
    else if (e.key === "ArrowRight") {
      e.preventDefault();
      hideHint();
      if (currentPage < pages.length - 1) { currentPage++; scrollToPage(currentPage); updateUI(); }
    }
    else if (e.key === "Escape") closeQr();
  });

  // ---------- Hint ----------
  let hintTimer;
  function hideHint() {
    hint.classList.add("hidden");
    clearTimeout(hintTimer);
  }
  hintTimer = setTimeout(hideHint, 6000);

  // ---------- QR code auto-generation ----------
  const qrTrigger = document.getElementById("qrTrigger");
  const qrModal = document.getElementById("qrModal");

  function getCurrentUrl() {
    return window.location.href;
  }

  function generateQrCodeUrl(url) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(url)}`;
  }

  qrTrigger.addEventListener("click", () => {
    qrModal.hidden = false;
    const placeholder = qrModal.querySelector(".qr-placeholder");
    const caption = qrModal.querySelector(".qr-caption");
    const sub = qrModal.querySelector(".qr-sub");

    const url = getCurrentUrl();
    const qrSrc = generateQrCodeUrl(url);

    placeholder.innerHTML = `<img src="${qrSrc}" alt="QR code for ${url}" width="180" height="180" />`;
    caption.textContent = "Scan to open this menu on your phone";
    sub.textContent = url;
  });

  qrModal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-qr]")) closeQr();
  });

  function closeQr() { qrModal.hidden = true; }

  // ---------- Init ----------
  loadPdf();
})();
