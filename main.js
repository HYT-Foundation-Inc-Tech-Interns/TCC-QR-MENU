/* ============================================================
   The Coffee Circle — Digital Menu (Scroll Reader)
   Pure HTML/CSS/JS — no frameworks, no CDNs
   Pages are pre-rendered JPEGs loaded directly.
   ============================================================ */

(function () {
  "use strict";

  var PAGES = [
    "pages/page-1.jpg",
    "pages/page-2.jpg",
    "pages/page-3.jpg",
    "pages/page-4.jpg",
    "pages/page-5.jpg",
    "pages/page-6.jpg",
    "pages/page-7.jpg"
  ];

  // ---------- Elements ----------
  var scrollContainer = document.getElementById("scrollContainer");
  var scrollTrack = document.getElementById("scrollTrack");
  var loader = document.getElementById("loader");
  var pageCounter = document.getElementById("pageCounter");
  var hint = document.getElementById("hint");

  // ---------- State ----------
  var currentPage = 0;

  // ---------- Build page elements ----------
  function buildPages() {
    scrollTrack.innerHTML = "";
    PAGES.forEach(function (src, i) {
      var item = document.createElement("div");
      item.className = "page-item";
      item.dataset.page = i;

      var placeholder = document.createElement("div");
      placeholder.className = "page-placeholder";
      item.appendChild(placeholder);

      var img = new Image();
      img.alt = "Menu page " + (i + 1);
      img.decoding = "async";
      img.onload = function () {
        item.innerHTML = "";
        item.appendChild(img);
        if (i === 0) {
          loader.hidden = true;
          updateUI();
        }
      };
      img.onerror = function () {
        if (i === 0) { loader.hidden = true; }
      };
      img.src = src + "?t=" + Date.now();

      scrollTrack.appendChild(item);
    });
  }

  // ---------- Scroll tracking ----------
  function getCurrentPage() {
    var items = scrollTrack.querySelectorAll(".page-item");
    if (items.length === 0) return 0;
    var containerRect = scrollContainer.getBoundingClientRect();
    var containerCenter = containerRect.top + containerRect.height / 2;
    var closest = 0;
    var closestDist = Infinity;
    items.forEach(function (item, i) {
      var rect = item.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var dist = Math.abs(center - containerCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  function scrollToPage(index) {
    var items = scrollTrack.querySelectorAll(".page-item");
    if (!items[index]) return;
    var containerHeight = scrollContainer.clientHeight;
    var itemTop = items[index].offsetTop;
    var itemHeight = items[index].offsetHeight;
    // Center the page in the viewport
    var target = itemTop - (containerHeight - itemHeight) / 2;
    if (target < 0) target = 0;
    scrollContainer.scrollTo({ top: target, behavior: "smooth" });
  }

  function updateUI() {
    var total = PAGES.length;
    pageCounter.textContent = (currentPage + 1) + " / " + total;

    var items = scrollTrack.querySelectorAll(".page-item");
    items.forEach(function (item, i) {
      if (i === currentPage) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // ---------- Scroll event (throttled via rAF) ----------
  var ticking = false;
  scrollContainer.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var newPage = getCurrentPage();
        if (newPage !== currentPage) {
          currentPage = newPage;
          updateUI();
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ---------- Keyboard ----------
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      hideHint();
      if (currentPage > 0) { currentPage--; scrollToPage(currentPage); updateUI(); }
    }
    else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      hideHint();
      if (currentPage < PAGES.length - 1) { currentPage++; scrollToPage(currentPage); updateUI(); }
    }
  });

  // ---------- Hint ----------
  var hintTimer;
  function hideHint() {
    hint.classList.add("hidden");
    clearTimeout(hintTimer);
  }
  hintTimer = setTimeout(hideHint, 6000);

  // ---------- Init ----------
  buildPages();
})();
