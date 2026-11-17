// Enhancements only: all content is readable without JavaScript.
(() => {
  const root = document.documentElement;
  root.classList.add("js");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const css = (name) => getComputedStyle(root).getPropertyValue(name).trim();

  /* ── Theme ───────────────────────────────────────────── */
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
    field.recolor();
  });

  /* ── Header: solid after scrolling, hides on scroll down ── */
  const header = document.getElementById("site-header");
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("solid", y > 40);
    if (!header.classList.contains("menu-open")) header.classList.toggle("hidden", y > lastY && y > 400);
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────── */
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ── Current section in nav ──────────────────────────── */
  const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
  const so = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) navLinks.forEach((l) => l.setAttribute("aria-current", String(l.hash === "#" + en.target.id)));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((l) => { const s = document.querySelector(l.hash); if (s) so.observe(s); });

  /* ── Live clock ──────────────────────────────────────── */
  const clock = document.getElementById("clock");
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
  const tick = () => { clock.textContent = fmt.format(new Date()) + " IST"; };
  tick(); setInterval(tick, 15000);

  /* ── Name: letters boot up narrow → wide on load ─────── */
  const name = document.getElementById("name");
  let n = 0;
  name.querySelectorAll(".name-line").forEach((line) => {
    const text = line.textContent;
    line.textContent = "";
    line.setAttribute("aria-hidden", "true");
    for (const c of text) {
      const s = document.createElement("span");
      s.className = "ch"; s.textContent = c; s.style.setProperty("--i", n++);
      line.appendChild(s);
    }
  });
  if (!reduceMotion) {
    name.classList.add("booting");
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() =>
      requestAnimationFrame(() => requestAnimationFrame(() => {
        name.classList.add("booted"); name.classList.remove("booting");
      })));
  }

  /* ── Hero: an embedding space you can query ──────────────
     Each labelled point is a skill. The cursor is a query vector:
     its 5 nearest neighbours light up, like top-k retrieval.     */
  const field = (() => {
    const canvas = document.getElementById("field");
    const ctx = canvas.getContext("2d");
    const top2 = document.getElementById("field-top");   // labels sit above the name
    const ctx2 = top2.getContext("2d");
    const hero = canvas.parentElement;
    let K = 5;

    // Topic clusters: [x, y] centre as a fraction of the hero, then the terms in it.
    const CLUSTERS = [
      [0.80, 0.24, ["BM25", "Hybrid retrieval", "Azure AI Search", "ChromaDB", "Exact-ID lookup", "Snowflake Cortex", "Docling"]],
      [0.62, 0.62, ["Tool calling", "MCP", "WebMCP", "Agentic workflows", "LangChain", "Cortex Agents", "Deep Research", "Azure OpenAI"]],
      [0.22, 0.30, ["Transformers", "PyTorch", "Contrastive learning", "Masked LM", "BPE tokenizer", "Text embeddings", "MiniLM"]],
      [0.88, 0.72, ["RAG", "Citations", "Evidence", "Secret redaction", "Observe-only", "LLM evaluation", "Recall@K", "MRR"]],
      [0.34, 0.78, ["Python", "TypeScript", "FastAPI", "React", "Flask", "Streamlit", "SQL", "C++"]],
      [0.50, 0.18, ["UI Automation", "Chrome extension", "JSON Schema", "PySide6", "NetworkX", "AST analysis", "Ollama"]],
    ];

    // Seeded random so the layout is stable between visits
    let seed = 42;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const gauss = () => { let u = 0, v = 0; while (!u) u = rand(); while (!v) v = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

    let w = 0, h = 0, dpr = 1, pts = [], running = false, visible = true;
    let C = {};
    const q = { x: 0, y: 0, tx: 0, ty: 0, user: false, idleSince: 0 };

    function recolor() {
      C = { pt: css("--pt"), cite: css("--cite"), hl: css("--hl"), hlInk: css("--hl-ink"), ink: css("--ink") };
      if (!running) draw(performance.now());
    }

    function build() {
      seed = 42; pts = [];
      const spread = Math.min(w, h) * 0.13;
      for (const [cx, cy0, terms] of CLUSTERS) {
        const cy = w < 760 ? 0.14 + cy0 * 0.42 : cy0;   // on phones, keep skills above the intro text
        // labelled points (skills)
        terms.forEach((label) => pts.push({ hx: cx * w + gauss() * spread, hy: cy * h + gauss() * spread * 0.8, label, ph: rand() * 6.28 }));
        // unlabelled background points in the same cluster
        const extra = Math.round((w * h) / 60000);
        for (let i = 0; i < extra; i++) pts.push({ hx: cx * w + gauss() * spread * 1.4, hy: cy * h + gauss() * spread * 1.1, label: null, ph: rand() * 6.28 });
      }
      // a light scatter across the whole space
      for (let i = 0; i < (w * h) / 9000; i++) pts.push({ hx: rand() * w, hy: rand() * h, label: null, ph: rand() * 6.28 });
      pts.forEach((p) => { p.x = p.hx; p.y = p.hy; p.k = 0; });
    }

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = top2.width = w * dpr; canvas.height = top2.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      K = w < 760 ? 3 : 5;
      build();
      if (!q.user) { q.x = q.tx = w * 0.62; q.y = q.ty = h * 0.55; }
      if (!running) draw(performance.now());
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      ctx2.clearRect(0, 0, w, h);
      const time = t * 0.001;

      // With no pointer, the query wanders slowly through the space
      if (!q.user && !reduceMotion) {
        const narrow = w < 760;   // on phones, stay above the intro text
        q.tx = w * (narrow ? 0.5 + 0.3 * Math.sin(time * 0.23) : 0.55 + 0.33 * Math.sin(time * 0.23));
        q.ty = h * (narrow ? 0.4 + 0.07 * Math.sin(time * 0.31 + 1.3) : 0.48 + 0.28 * Math.sin(time * 0.31 + 1.3));
      }
      q.x += (q.tx - q.x) * 0.09; q.y += (q.ty - q.y) * 0.09;

      // drift + find top-k among labelled points
      const top = [];
      for (const p of pts) {
        if (!reduceMotion) { p.x = p.hx + Math.sin(time * 0.5 + p.ph) * 4; p.y = p.hy + Math.cos(time * 0.4 + p.ph) * 4; }
        if (!p.label) continue;
        p.d = Math.hypot(p.x - q.x, p.y - q.y);
        if (top.length < K) { top.push(p); top.sort((a, b) => a.d - b.d); }
        else if (p.d < top[K - 1].d) { top[K - 1] = p; top.sort((a, b) => a.d - b.d); }
      }
      const hit = new Set(top);
      pts.forEach((p) => { p.k += ((hit.has(p) ? 1 : 0) - p.k) * 0.12; });

      // all points
      ctx.fillStyle = C.pt;
      for (const p of pts) {
        if (p.k > 0.05) continue;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.label ? 2.6 : 1.7, 0, 6.283); ctx.fill();
      }

      // retrieval lines (query → neighbours)
      ctx.strokeStyle = C.cite; ctx.lineWidth = 1.4;
      for (const p of pts) {
        if (p.k <= 0.05) continue;
        ctx.globalAlpha = p.k * 0.75;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // labels sit on the top layer, like highlighter annotations over the name
      const L = ctx2;
      // neighbours + their labels (highlighted, like evidence)
      L.font = "600 13px Archivo, system-ui, sans-serif";
      L.textBaseline = "middle";
      // nearest first, so the best matches get the clearest label spots
      const shown = pts.filter((p) => p.k > 0.05).sort((a, b) => b.k - a.k || a.d - b.d);
      const placed = [];
      const overlaps = (r) => placed.some((o) => r.x < o.x + o.w + 4 && r.x + r.w + 4 > o.x && r.y < o.y + o.h + 2 && r.y + r.h + 2 > o.y);
      for (const p of shown) {
        L.globalAlpha = Math.min(1, p.k * 1.2);
        L.fillStyle = C.cite;
        L.beginPath(); L.arc(p.x, p.y, 2.6 + p.k * 2.4, 0, 6.283); L.fill();
        const tw = L.measureText(p.label).width + 8;
        // try right, left, then above/below; skip the label if every spot is taken
        const spots = [[p.x + 8, p.y - 10], [p.x - 8 - tw, p.y - 10], [p.x + 8, p.y - 32], [p.x + 8, p.y + 12], [p.x - 8 - tw, p.y - 32], [p.x - 8 - tw, p.y + 12]];
        const spot = spots.map(([x, y]) => ({ x, y, w: tw, h: 20 })).find((r) => !overlaps(r) && r.x > 4 && r.x + r.w < w - 4);
        if (!spot) continue;
        placed.push(spot);
        L.fillStyle = C.hl;
        L.fillRect(spot.x, spot.y, spot.w, spot.h);
        L.fillStyle = C.hlInk;
        L.fillText(p.label, spot.x + 4, spot.y + 11);
      }
      L.globalAlpha = 1;

      // the query marker
      L.strokeStyle = C.cite; L.lineWidth = 1.6;
      L.beginPath(); L.arc(q.x, q.y, 9, 0, 6.283); L.stroke();
      L.fillStyle = C.cite;
      L.beginPath(); L.arc(q.x, q.y, 2.5, 0, 6.283); L.fill();
    }

    function loop(t) { if (!running) return; draw(t); requestAnimationFrame(loop); }
    function setRunning() {
      const should = visible && !document.hidden && !reduceMotion;
      if (should && !running) { running = true; requestAnimationFrame(loop); }
      else if (!should) running = false;
    }

    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      q.tx = e.clientX - r.left; q.ty = e.clientY - r.top; q.user = true;
      if (!running) draw(performance.now());
    });
    hero.addEventListener("pointerleave", () => { q.user = false; });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; setRunning(); }).observe(hero);
    document.addEventListener("visibilitychange", setRunning);
    new ResizeObserver(resize).observe(canvas);

    recolor(); resize(); setRunning();
    return { recolor };
  })();

  // Touch screens have no cursor: adjust the hint
  if (!finePointer) {
    const hint = document.querySelector(".intro .hint");
    if (hint) hint.textContent = "Drag across the dots: your finger is a query, and the points it finds are my skills.";
  }

  /* ── EmbedLab tile: two similar sentence vectors ─────── */
  document.querySelectorAll(".vec").forEach((el) => {
    let s = Number(el.dataset.seed) || 1;
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    let j = 99;
    const rj = () => ((j = (j * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 32; i++) {
      let a = r();
      if (el.dataset.jitter) a = Math.min(1, Math.max(0, a + (rj() - 0.5) * 0.3));
      const cell = document.createElement("i");
      cell.style.setProperty("--a", (0.12 + a * 0.88).toFixed(2));
      el.appendChild(cell);
    }
  });

  /* ── Benchmark bars grow in when scrolled into view ──── */
  const bench = document.querySelector(".viz-bench");
  if (bench) {
    new IntersectionObserver(([en], obs) => {
      if (en.isIntersecting) { bench.classList.add("in"); obs.disconnect(); }
    }, { threshold: 0.4 }).observe(bench);
  }

  /* ── Bento tiles: pointer spotlight ──────────────────── */
  if (finePointer) {
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.addEventListener("pointermove", (e) => {
        const r = tile.getBoundingClientRect();
        tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
        tile.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ── Case study panels ───────────────────────────────── */
  let opener = null;
  const closeDialog = (dlg) => {
    if (reduceMotion) { dlg.close(); return; }
    dlg.classList.add("closing");
    dlg.addEventListener("animationend", () => { dlg.classList.remove("closing"); dlg.close(); }, { once: true });
  };
  document.querySelectorAll(".open-case").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dlg = document.getElementById(btn.dataset.case);
      opener = btn; dlg.showModal(); dlg.scrollTop = 0;
    });
  });
  document.querySelectorAll("dialog.case").forEach((dlg) => {
    dlg.querySelector(".case-close").addEventListener("click", () => closeDialog(dlg));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeDialog(dlg); });
    dlg.addEventListener("cancel", (e) => { e.preventDefault(); closeDialog(dlg); });
    dlg.addEventListener("close", () => opener && opener.focus());
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
