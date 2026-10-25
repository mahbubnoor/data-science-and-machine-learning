/* Intro DS & ML slide viewer. The page holds the HTML slides (#deck > .slide, step-by-step parts are .frag[data-k]),
   defines window.D (this session and the course list) and may load notes/<deck>.js first, which sets window.DECK_NOTES.
   The Notes button appears only when that file is present (instructor copy). */
(function () {
  "use strict";
  var D = window.D, N = window.DECK_NOTES || null;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var me = D.course[D.idx], prevL = D.course[D.idx - 1], nextL = D.course[D.idx + 1];
  var deck = $("deck"), stage = $("stage"), slides = [].slice.call(document.querySelectorAll("#deck .slide"));
  var old = $("nav"); if (old) old.remove();

  /* ---------- build the bar and panels ---------- */
  var ui = document.createElement("div");
  ui.innerHTML =
    '<div id="bar" role="toolbar" aria-label="Slide navigation">' +
    '<a href="index.html" title="Course home">⌂ <span class="wide">Course</span></a>' +
    '<a id="prevlec" class="mid" href="#" title="Previous session ([)">◀ <span></span></a>' +
    '<select id="lecsel" aria-label="Go to another session"></select>' +
    '<a id="nextlec" class="mid" href="#" title="Next session (])"><span></span> ▶</a>' +
    '<a id="labbtn" class="lab" href="#" title="Open the interactive lab (L)">Lab</a>' +
    '<span class="sp"></span>' +
    '<div class="grp"><button type="button" id="prevs" aria-label="Previous step">‹</button><span id="count" class="count"></span><button type="button" id="nexts" aria-label="Next step">›</button></div>' +
    '<button type="button" id="listbtn" title="Slide list (S)">☰<span class="wide">&nbsp;Slides</span></button>' +
    '<a id="pdfbtn" class="wide" href="#" title="These slides as a PDF">PDF</a>' +
    '<button type="button" id="notesbtn" class="mid" title="Speaker notes (N)">Notes</button>' +
    '<button type="button" id="fsbtn" title="Full screen (F)">⛶<span class="wide">&nbsp;Full screen</span></button>' +
    '<button type="button" id="helpbtn" class="mid" aria-label="Keyboard shortcuts">?</button></div>' +
    '<div id="prog"></div>' +
    '<div id="help" hidden><b>Keyboard</b><br><kbd>→</kbd> <kbd>Space</kbd> next step · <kbd>←</kbd> back · click the slide: right two thirds next, left third back<br>' +
    '<kbd>Home</kbd> / <kbd>End</kbd> first / last slide · type a number + <kbd>Enter</kbd> to jump<br>' +
    '<kbd>[</kbd> / <kbd>]</kbd> previous / next session' + (D.lab ? ' · <kbd>L</kbd> open the lab' : '') + ' · <kbd>S</kbd> slide list<br>' +
    '<kbd>F</kbd> full screen' + (N ? ' · <kbd>N</kbd> speaker notes' : '') + ' · <kbd>Esc</kbd> close</div>' +
    '<nav id="drawer" aria-label="Slides"><h2 id="dtitle"></h2><ol id="list"></ol></nav>' +
    '<div id="notes" hidden></div><div class="rotate">Turn your phone sideways for bigger slides.</div>';
  while (ui.firstChild) document.body.appendChild(ui.firstChild);

  var sel = $("lecsel");
  D.course.forEach(function (l, i) { var o = document.createElement("option"); o.value = l.href; o.textContent = l.label; if (i === D.idx) o.selected = true; sel.appendChild(o); });
  sel.addEventListener("change", function () { location.href = sel.value; });
  function setLink(id, l) { var a = $(id); if (l) { a.href = l.href; a.title = l.label + (id === "prevlec" ? " ([)" : " (])"); a.querySelector("span").textContent = l.short; } else { a.classList.add("dis"); a.querySelector("span").textContent = id === "prevlec" ? "Start" : "End"; } }
  setLink("prevlec", prevL); setLink("nextlec", nextL);
  if (D.lab) { $("labbtn").href = D.lab; $("labbtn").textContent = "Lab " + me.no; $("labbtn").title = D.labTitle + " (L)"; } else $("labbtn").style.display = "none";
  if (D.pdf) $("pdfbtn").href = D.pdf; else $("pdfbtn").style.display = "none";
  if (!N) $("notesbtn").style.display = "none";

  function titleOf(sl, i) { var h = sl.querySelector("h1, h2"); var t = h ? h.textContent.replace(/\s+/g, " ").trim() : ""; return t || "Slide " + (i + 1); }
  $("dtitle").textContent = me.label + " · " + slides.length + " slides";
  slides.forEach(function (sl, i) {
    var li = document.createElement("li"), b = document.createElement("button");
    b.innerHTML = '<span class="n">' + (i + 1) + '</span><span></span>' + (sl.querySelector("video") ? '<span class="tag">video</span>' : sl.classList.contains("labslide") ? '<span class="tag">lab</span>' : "");
    b.children[1].textContent = titleOf(sl, i);
    b.onclick = function () { go(i, 0); toggleList(false); }; li.appendChild(b); $("list").appendChild(li);
  });

  /* ---------- fitting the 1280 x 720 slide into the space under the bar ---------- */
  function fit() { var pad = document.body.classList.contains("fs") ? 0 : 24, w = stage.clientWidth - pad, h = stage.clientHeight - pad; deck.style.transform = "scale(" + Math.max(0.1, Math.min(w / 1280, h / 720)) + ")"; }
  window.addEventListener("resize", fit);
  stage.addEventListener("transitionend", fit);

  /* ---------- steps inside a slide ---------- */
  function steps(sl) { var ks = {}; sl.querySelectorAll(".frag").forEach(function (f) { ks[f.dataset.k] = 1; }); return Object.keys(ks).map(Number).sort(function (a, b) { return a - b; }); }
  function setShown(sl, n) { var ks = steps(sl); sl.querySelectorAll(".frag").forEach(function (f) { f.classList.toggle("on", ks.indexOf(Number(f.dataset.k)) < n); }); }

  /* ---------- state ---------- */
  var s = 0, k = 0, notesOn = false, KEY = "dsml-notes";
  try { notesOn = !!N && localStorage.getItem(KEY) === "1"; } catch (e) {}
  function nSteps(i) { return steps(slides[i]).length + 1; }
  function render() {
    slides.forEach(function (sl, i) { if (i !== s) { sl.classList.remove("active"); sl.querySelectorAll("video").forEach(function (v) { v.pause(); }); } });
    var sl = slides[s], n = nSteps(s); sl.classList.add("active"); setShown(sl, k);
    $("count").innerHTML = (s + 1) + " / " + slides.length + (n > 1 ? "<small>step " + (k + 1) + "/" + n + "</small>" : "");
    $("prog").style.width = ((s + (k + 1) / n) / slides.length * 100) + "%";
    [].forEach.call(document.querySelectorAll("#list button"), function (b, i) { b.classList.toggle("cur", i === s); });
    if (location.hash !== "#" + (s + 1) && history.replaceState) history.replaceState(null, "", "#" + (s + 1));
    document.title = me.label + " (" + (s + 1) + "/" + slides.length + ") · Intro DS & ML";
    renderNotes();
  }
  function renderNotes() {
    var box = $("notes"); $("notesbtn").classList.toggle("on", notesOn); document.body.classList.toggle("notes-on", notesOn && !!N);
    if (!notesOn || !N) { box.hidden = true; fit(); return; }
    box.hidden = false; box.innerHTML = "<b>Speaker notes · slide " + (s + 1) + "</b>"; box.appendChild(document.createTextNode(N[s] || "(no notes for this slide)")); box.scrollTop = 0; fit();
  }
  function go(i, j) { closeEnd(); s = Math.max(0, Math.min(slides.length - 1, i)); k = Math.max(0, Math.min(nSteps(s) - 1, j)); render(); }
  function next() { if ($("endcard")) return; if (k < nSteps(s) - 1) { k++; render(); } else if (s < slides.length - 1) { s++; k = 0; render(); } else endCard(); }
  function prev() { if ($("endcard")) { closeEnd(); return; } if (k > 0) { k--; render(); } else if (s > 0) { s--; k = nSteps(s) - 1; render(); } }

  function endCard() {
    var d = document.createElement("div"); d.id = "endcard";
    var h = "<div><h2>End of " + esc(me.label) + "</h2><p>" + esc(D.sub || D.title) + "</p><div class=\"row\">";
    if (nextL) h += '<a class="go" href="' + nextL.href + '">' + esc(nextL.label) + " →</a>";
    if (D.lab) h += '<a href="' + D.lab + '">' + esc(D.labTitle) + "</a>";
    h += '<a href="index.html">Course home</a><button type="button" id="stay">Stay here</button></div></div>';
    d.innerHTML = h; document.body.appendChild(d);
    $("stay").addEventListener("click", closeEnd); $("stay").focus();
    d.addEventListener("click", function (e) { if (e.target === d) closeEnd(); });
  }
  function closeEnd() { var e = $("endcard"); if (e) e.remove(); }
  function toggleList(open) { $("drawer").classList.toggle("open", open); if (open) { var c = document.querySelector("#list .cur"); if (c) c.focus(); } else if (document.activeElement && $("drawer").contains(document.activeElement)) document.activeElement.blur(); }
  function toggleNotes() { if (!N) return; notesOn = !notesOn; try { localStorage.setItem(KEY, notesOn ? "1" : "0"); } catch (e) {} renderNotes(); }
  function toggleFs() { if (!document.fullscreenElement) { var p = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); if (p && p.catch) p.catch(function () {}); } else document.exitFullscreen(); }

  $("nexts").onclick = next; $("prevs").onclick = prev;
  $("listbtn").onclick = function () { toggleList(!$("drawer").classList.contains("open")); };
  $("notesbtn").onclick = toggleNotes; $("fsbtn").onclick = toggleFs;
  $("helpbtn").onclick = function () { $("help").hidden = !$("help").hidden; };
  /* click the slide: left third back, the rest forward (not on links, buttons, videos, code or selected text) */
  deck.addEventListener("click", function (e) {
    if (e.target.closest("a, button, video, input, select, textarea, label, pre, .cc, .nbcell")) return;
    var sel = window.getSelection && String(window.getSelection()); if (sel) return;
    var r = deck.getBoundingClientRect(); (e.clientX - r.left < r.width / 3) ? prev() : next();
  });
  document.addEventListener("fullscreenchange", function () { document.body.classList.toggle("fs", !!document.fullscreenElement); fit(); poke(); });
  var idleT; function poke() { document.body.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(function () { document.body.classList.add("idle"); }, 2500); }
  document.addEventListener("mousemove", poke);

  var typed = "";
  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase(), key = e.key;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (tag === "select" || tag === "input" || tag === "textarea") return;
    if (tag === "video" && (key === " " || key === "ArrowLeft" || key === "ArrowRight")) return;
    var onCtl = tag === "button" || tag === "a";
    if (/^[0-9]$/.test(key)) { typed += key; return; }
    if (key === "Enter" && typed) { go(parseInt(typed, 10) - 1, 0); typed = ""; e.preventDefault(); return; }
    typed = "";
    if ((key === " " || key === "Enter") && onCtl) return;
    if (key === "ArrowRight" || key === "ArrowDown" || key === "PageDown" || key === " " || key === "Enter") { e.preventDefault(); next(); }
    else if (key === "ArrowLeft" || key === "ArrowUp" || key === "PageUp" || key === "Backspace") { e.preventDefault(); prev(); }
    else if (key === "Home") go(0, 0); else if (key === "End") go(slides.length - 1, 99);
    else if (key === "f" || key === "F") toggleFs();
    else if (key === "n" || key === "N") toggleNotes();
    else if (key === "s" || key === "S") toggleList(!$("drawer").classList.contains("open"));
    else if ((key === "l" || key === "L") && D.lab) location.href = D.lab;
    else if (key === "[" && prevL) location.href = prevL.href;
    else if (key === "]" && nextL) location.href = nextL.href;
    else if (key === "?") $("help").hidden = !$("help").hidden;
    else if (key === "Escape") { closeEnd(); toggleList(false); $("help").hidden = true; }
  });
  var tx = null, ty = null;
  stage.addEventListener("touchstart", function (e) { if (e.target.closest("video, a, button")) return; tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) { if (tx === null) return; var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)(); });
  /* copy buttons on code cells */
  document.querySelectorAll(".copy").forEach(function (b) {
    b.onclick = function (e) {
      e.stopPropagation(); var text = b.closest(".cc").querySelector("pre").innerText;
      function done() { b.textContent = "copied"; setTimeout(function () { b.textContent = "copy"; }, 1200); }
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done);
      else { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); done(); }
    };
  });
  window.addEventListener("hashchange", function () { var n = parseInt(location.hash.slice(1), 10); if (n >= 1 && n <= slides.length && n - 1 !== s) go(n - 1, 0); });
  var start = parseInt(location.hash.slice(1), 10); if (start >= 1 && start <= slides.length) s = start - 1;
  window.go = go; window.next = next; window.prev = prev;
  /* ---------- bigger text where there is room: each slide's content is zoomed as far as it still fits ----------
     The content keeps the slide's width (the text re-wraps), so a sparse slide gets large text and a full one stays as it is. */
  var ZMAX = 1.45;
  function grow(sl) {
    var inner = sl.querySelector(".inner");
    if (!inner || sl.classList.contains("title") || sl.querySelector("video") || inner.dataset.z) return;
    var cs = getComputedStyle(inner), base = { left: parseFloat(cs.left), right: parseFloat(cs.right), top: parseFloat(cs.top), bottom: parseFloat(cs.bottom) };
    function set(z) { inner.style.zoom = z; ["left", "right", "top", "bottom"].forEach(function (k) { inner.style[k] = (base[k] / z) + "px"; }); }
    /* measure the content at its natural height (boxes that stretch to fill the slide, or notes pushed to the bottom,
       would otherwise look "full"), then check that nothing sticks out sideways */
    function fits(z) {
      var k = sl.getBoundingClientRect().height / 720, avail = (720 - base.top - base.bottom - 10) * k, ok = true;
      inner.style.bottom = "auto";
      var r = inner.getBoundingClientRect(), need = r.height;
      [].forEach.call(inner.children, function (c) { var b = c.getBoundingClientRect(); if (b.height) need = Math.max(need, b.bottom - r.top); });
      var w = document.createTreeWalker(inner, NodeFilter.SHOW_TEXT), rg = document.createRange();
      while (ok && w.nextNode()) { if (!w.currentNode.textContent.trim()) continue; rg.selectNodeContents(w.currentNode); [].forEach.call(rg.getClientRects(), function (b) { if (b.width && b.right > r.right + 1) ok = false; need = Math.max(need, b.bottom - r.top); }); }
      [].forEach.call(inner.querySelectorAll("img, svg, canvas, table, pre"), function (e) {
        if (!ok || !e.getClientRects().length) return; var b = e.getBoundingClientRect(); if (b.right > r.right + 1) ok = false; need = Math.max(need, b.bottom - r.top);
        if ((e.tagName === "PRE" || e.tagName === "TABLE") && e.scrollWidth > e.clientWidth + 1) ok = false;
      });
      inner.style.bottom = (base.bottom / z) + "px";
      return ok && need <= avail;
    }
    sl.classList.add("measuring");
    set(1); if (!fits(1)) { ["zoom", "left", "right", "top", "bottom"].forEach(function (k) { inner.style[k] = ""; }); inner.dataset.z = "1"; sl.classList.remove("measuring"); return; }
    var lo = 1, hi = ZMAX;
    for (var it = 0; it < 7; it++) { var m = (lo + hi) / 2; set(m); if (fits(m)) lo = m; else hi = m; }
    lo = Math.floor(lo * 50) / 50; set(lo); inner.dataset.z = lo; sl.classList.remove("measuring");
  }
  function growAll() { if (!(window.CSS && CSS.supports && CSS.supports("zoom", "1.2"))) return; slides.forEach(grow); }
  window.dsmlGrow = growAll;
  fit(); render(); poke();
  var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  ready.then(function () { if (document.readyState === "complete") growAll(); else window.addEventListener("load", growAll); });
})();
