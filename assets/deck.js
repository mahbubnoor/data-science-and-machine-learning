(function () {
  var deck = document.getElementById("deck");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var count = document.getElementById("count");
  var cur = 0;

  function fitDeck() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    deck.style.transform = "scale(" + s + ")";
  }
  function steps(sl) {
    var ks = {};
    sl.querySelectorAll(".frag").forEach(function (f) { ks[f.dataset.k] = 1; });
    return Object.keys(ks).map(Number).sort(function (a, b) { return a - b; });
  }
  function shown(sl) { return Number(sl.dataset.shown || 0); }
  function setShown(sl, n) {
    sl.dataset.shown = n;
    var ks = steps(sl);
    sl.querySelectorAll(".frag").forEach(function (f) {
      f.classList.toggle("on", ks.indexOf(Number(f.dataset.k)) < n);
    });
  }
  function pauseVideos(sl) { sl.querySelectorAll("video").forEach(function (v) { v.pause(); }); }
  function show(i, allShown) {
    if (i < 0 || i >= slides.length) return;
    pauseVideos(slides[cur]);
    slides[cur].classList.remove("active");
    cur = i;
    var sl = slides[cur];
    sl.classList.add("active");
    setShown(sl, allShown ? steps(sl).length : 0);
    count.textContent = (cur + 1) + " / " + slides.length;
    if (history.replaceState) history.replaceState(null, "", "#" + (cur + 1));
  }
  function next() {
    var sl = slides[cur], n = shown(sl);
    if (n < steps(sl).length) setShown(sl, n + 1); else show(cur + 1, false);
  }
  function prev() {
    var sl = slides[cur], n = shown(sl);
    if (n > 0) setShown(sl, n - 1); else show(cur - 1, true);
  }
  document.getElementById("next").onclick = next;
  document.getElementById("prev").onclick = prev;
  document.getElementById("fs").onclick = function () {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    else document.exitFullscreen && document.exitFullscreen();
  };
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "VIDEO" && (e.key === " " || e.key === "ArrowLeft" || e.key === "ArrowRight")) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].indexOf(e.key) >= 0) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "PageUp", "Backspace"].indexOf(e.key) >= 0) { e.preventDefault(); prev(); }
    else if (e.key === "Home") show(0, false);
    else if (e.key === "End") show(slides.length - 1, true);
    else if (e.key === "f" || e.key === "F") document.getElementById("fs").onclick();
  });
  var sx = null, sy = null;
  document.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
    sx = null;
  }, { passive: true });
  document.querySelectorAll(".copy").forEach(function (b) {
    b.onclick = function (e) {
      e.stopPropagation();
      var text = b.closest(".cc").querySelector("pre").innerText;
      function done() { b.textContent = "copied"; setTimeout(function () { b.textContent = "copy"; }, 1200); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done);
      else { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); done(); }
    };
  });
  window.addEventListener("resize", fitDeck);
  window.addEventListener("hashchange", function () {
    var k = parseInt(location.hash.slice(1), 10) - 1;
    if (!isNaN(k) && k !== cur) show(Math.max(0, Math.min(k, slides.length - 1)), false);
  });
  fitDeck();
  var start = parseInt((location.hash || "#1").slice(1), 10) - 1;
  slides[0].classList.add("active");
  show(isNaN(start) ? 0 : Math.max(0, Math.min(start, slides.length - 1)), false);
})();
