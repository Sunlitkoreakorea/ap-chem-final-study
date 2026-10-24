/* AP Chemistry I — Final study site: app logic */
(function () {
  "use strict";

  /* ============================== utils ============================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 저장 불가 환경에서도 동작 */ } }
  };
  const MATH_OPTS = {
    delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
    throwOnError: false, ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
  };
  function renderMath(el) {
    if (typeof window.renderMathInElement === "function") {
      try { window.renderMathInElement(el, MATH_OPTS); } catch (e) { /* ignore */ }
    }
  }
  const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const SUP = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  function fmtVal(x, n = 3) {
    if (!isFinite(x)) return String(x);
    const ax = Math.abs(x);
    if (ax !== 0 && (ax < 1e-2 || ax >= 1e4)) {
      const [m, e] = x.toExponential(n - 1).split("e");
      return `${m}×10<sup>${parseInt(e, 10)}</sup>`.replace("10<sup>-", "10<sup>−");
    }
    return String(Number(x.toPrecision(n)));
  }

  /* ============================== theme ============================== */
  $("#themeBtn").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("apchem.theme", next); } catch (e) { /* ignore */ }
  });

  /* ============================== tabs / routing ============================== */
  const TABS = ["study", "memorize", "practice"];
  let currentTab = null;
  const inited = {};
  function showTab(name) {
    if (!TABS.includes(name)) name = "study";
    currentTab = name;
    TABS.forEach(t => {
      const on = t === name;
      const b = $("#tab-" + t);
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      $("#panel-" + t).hidden = !on;
    });
    store.set("apchem.tab", name);
    if (!inited[name]) {
      inited[name] = true;
      if (name === "study") initStudy();
      if (name === "memorize") initMemorize();
      if (name === "practice") initPractice();
    }
  }
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (TABS.includes(h)) { showTab(h); window.scrollTo(0, 0); return; }
    if (h) {
      const el = document.getElementById(h);
      if (el && $("#panel-study").contains(el)) {
        showTab("study");
        requestAnimationFrame(() => el.scrollIntoView());
        return;
      }
    }
    showTab(store.get("apchem.tab", "study"));
  }
  $$(".tab").forEach(b => {
    b.addEventListener("click", () => { location.hash = "#" + b.dataset.tab; });
    b.addEventListener("keydown", e => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const i = TABS.indexOf(b.dataset.tab);
      const n = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
      location.hash = "#" + n; $("#tab-" + n).focus();
    });
  });
  window.addEventListener("hashchange", route);

  /* ============================== STUDY ============================== */
  function initStudy() {
    $$("[data-widget]").forEach(el => {
      const f = WIDGETS[el.dataset.widget];
      if (f) f(el);
    });
    renderMath($("#panel-study"));
    initScrollSpy();
  }

  function initScrollSpy() {
    const toc = $("#toc");
    const links = $$("#toc a");
    const items = links.map(a => ({ a, el: document.getElementById(a.getAttribute("href").slice(1)) })).filter(x => x.el);
    let ticking = false, activeA = null;
    function update() {
      ticking = false;
      if (currentTab !== "study") return;
      let cur = items[0];
      for (const it of items) { if (it.el.getBoundingClientRect().top <= 180) cur = it; else break; }
      if (!cur || cur.a === activeA) return;
      if (activeA) activeA.classList.remove("active");
      cur.a.classList.add("active"); activeA = cur.a;
      if (toc.scrollHeight > toc.clientHeight + 2) {
        const t = cur.a.offsetTop;
        if (t < toc.scrollTop + 20 || t > toc.scrollTop + toc.clientHeight - 60) toc.scrollTop = t - 80;
      } else if (toc.scrollWidth > toc.clientWidth + 2) {
        toc.scrollLeft = cur.a.offsetLeft - toc.clientWidth / 2 + cur.a.offsetWidth / 2;
      }
    }
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- widgets ---------- */
  function miniPlot(xs, ys, ylab) {
    const W = 220, H = 150, L = 38, Rr = 10, Tp = 12, B = 26;
    const xmin = xs[0], xmax = xs[xs.length - 1];
    let ymin = Math.min(...ys), ymax = Math.max(...ys);
    if (ymax - ymin < 1e-12) { ymax += 1; ymin -= 1; }
    const pad = (ymax - ymin) * 0.06; ymin -= pad; ymax += pad;
    const X = x => L + (x - xmin) / (xmax - xmin) * (W - L - Rr);
    const Y = y => Tp + (1 - (y - ymin) / (ymax - ymin)) * (H - Tp - B);
    const d = xs.map((x, i) => (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(ys[i]).toFixed(1)).join("");
    const nf = v => Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2);
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(ylab)} 대 시간 그래프">
      <g stroke="currentColor" stroke-width="1.2" opacity=".45" fill="none"><path d="M${L} ${Tp - 4}V${H - B}H${W - Rr + 4}"/></g>
      <path d="${d}" fill="none" stroke="var(--primary)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <g fill="currentColor" font-size="10.5" font-family="system-ui,sans-serif" opacity=".8">
        <text x="${L - 4}" y="${Y(ys[0]) + 3}" text-anchor="end">${nf(ys[0])}</text>
        <text x="${L - 4}" y="${Y(ys[ys.length - 1]) + 3}" text-anchor="end">${nf(ys[ys.length - 1])}</text>
        <text x="${W - Rr}" y="${H - 8}" text-anchor="end">t</text>
        <text x="${L + 4}" y="${Tp + 4}" font-weight="700">${esc(ylab)}</text>
      </g></svg>`;
  }

  const WIDGETS = {
    "order-explorer"(el) {
      let n = 1, f = 2;
      el.innerHTML = `<div class="wt">직접 해 보기 — 농도를 바꾸면 속도는? <span class="badge">interactive</span></div>
        <div class="wrow">
          <label>차수 n <span class="seg" role="group" aria-label="차수">${[0, 1, 2, 3].map(i => `<button type="button" data-n="${i}" aria-pressed="${i === n}">${i}</button>`).join("")}</span></label>
          <label>농도를 <select aria-label="농도 배수">${[2, 3, 4, 10].map(v => `<option value="${v}">× ${v}</option>`).join("")}</select> 배 하면</label>
        </div><p class="readout" aria-live="polite"></p>`;
      const out = $(".readout", el);
      const unit = ["M s<sup>−1</sup>", "s<sup>−1</sup>", "M<sup>−1</sup>s<sup>−1</sup>", "M<sup>−2</sup>s<sup>−1</sup>"];
      const half = ["t<sub>½</sub> = [A]<sub>0</sub>/2k (농도에 비례)", "t<sub>½</sub> = 0.693/k (농도 무관)", "t<sub>½</sub> = 1/(k[A]<sub>0</sub>) (농도에 반비례)", "(교재 범위 밖)"];
      function upd() {
        out.innerHTML = `속도는 ${f}<sup>${n}</sup> = <b>× ${Math.pow(f, n)}</b> 배. &nbsp; k 의 단위: ${unit[n]} &nbsp; · 반감기: ${half[n]}`;
        $$("button[data-n]", el).forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.n === n)));
      }
      el.addEventListener("click", e => { const b = e.target.closest("button[data-n]"); if (b) { n = +b.dataset.n; upd(); } });
      $("select", el).addEventListener("change", e => { f = +e.target.value; upd(); });
      upd();
    },

    "order-plots"(el) {
      let order = 1, ks = 4, A0 = 1.0;
      el.innerHTML = `<div class="wt">차수별 그래프 비교 <span class="badge">interactive</span></div>
        <div class="wrow">
          <label>차수 <span class="seg" role="group" aria-label="차수">${[0, 1, 2].map(i => `<button type="button" data-o="${i}" aria-pressed="${i === order}">${i}차</button>`).join("")}</span></label>
          <label>k <input type="range" min="1" max="10" step="1" value="${ks}" data-r="k" aria-label="속도 상수"></label>
          <label>[A]<sub>0</sub> <input type="range" min="0.2" max="2" step="0.1" value="${A0}" data-r="a" aria-label="초기 농도"></label>
        </div>
        <div class="plots"></div><p class="readout" aria-live="polite"></p>`;
      const plots = $(".plots", el), out = $(".readout", el);
      function upd() {
        const scale = [0.012, 0.05, 0.05][order];
        const k = ks * scale;
        const tmax = order === 0 ? 0.92 * A0 / k : order === 1 ? 4 * Math.LN2 / k : 6 / (k * A0);
        const N = 50, ts = [], A = [], lnA = [], inv = [];
        for (let i = 0; i <= N; i++) {
          const t = tmax * i / N; ts.push(t);
          const a = order === 0 ? A0 - k * t : order === 1 ? A0 * Math.exp(-k * t) : 1 / (1 / A0 + k * t);
          A.push(a); lnA.push(Math.log(a)); inv.push(1 / a);
        }
        const titles = ["[A] vs t", "ln[A] vs t", "1/[A] vs t"], ys = [A, lnA, inv], labs = ["[A]", "ln[A]", "1/[A]"];
        plots.innerHTML = ys.map((y, i) => `<div class="plot${i === order ? " hit" : ""}"><div class="pt">${titles[i]}${i === order ? " — 직선 ✓" : ""}</div>${miniPlot(ts, y, labs[i])}</div>`).join("");
        const nf = v => Number(v.toPrecision(3));
        const info = [
          `0차: [A] 가 직선, 기울기 = −k = <b>−${nf(k)}</b> M/s &nbsp;·&nbsp; t<sub>½</sub> = [A]<sub>0</sub>/2k = <b>${nf(A0 / (2 * k))}</b> s`,
          `1차: ln[A] 가 직선, 기울기 = −k = <b>−${nf(k)}</b> s<sup>−1</sup> &nbsp;·&nbsp; t<sub>½</sub> = 0.693/k = <b>${nf(Math.LN2 / k)}</b> s`,
          `2차: 1/[A] 가 직선, 기울기 = +k = <b>${nf(k)}</b> M<sup>−1</sup>s<sup>−1</sup> &nbsp;·&nbsp; t<sub>½</sub> = 1/(k[A]<sub>0</sub>) = <b>${nf(1 / (k * A0))}</b> s`
        ];
        out.innerHTML = info[order] + ` <span class="muted">([A]₀ = ${A0.toFixed(1)} M)</span>`;
        $$("button[data-o]", el).forEach(b => b.setAttribute("aria-pressed", String(+b.dataset.o === order)));
      }
      el.addEventListener("click", e => { const b = e.target.closest("button[data-o]"); if (b) { order = +b.dataset.o; upd(); } });
      el.addEventListener("input", e => {
        if (e.target.dataset.r === "k") ks = +e.target.value;
        if (e.target.dataset.r === "a") A0 = +e.target.value;
        upd();
      });
      upd();
    },

    "qk-widget"(el) {
      let lq = -1, lk = 0;
      el.innerHTML = `<div class="wt">Q 와 K 를 비교해 보기 <span class="badge">interactive</span></div>
        <div class="wrow">
          <label>log Q <input type="range" min="-6" max="6" step="0.1" value="${lq}" data-r="q" aria-label="log Q"></label>
          <label>log K <input type="range" min="-6" max="6" step="0.1" value="${lk}" data-r="k" aria-label="log K"></label>
        </div>
        <div class="qk"><div class="bar q"></div><div class="bar k"></div></div><p class="readout" aria-live="polite"></p>`;
      const bq = $(".bar.q", el), bk = $(".bar.k", el), out = $(".readout", el);
      const pr = v => { const e = Math.floor(v + 1e-9); const m = Math.pow(10, v - e); return `${m.toFixed(1)}×10<sup>${e}</sup>`.replace("<sup>-", "<sup>−"); };
      function upd() {
        bq.style.width = ((lq + 7) / 14 * 100) + "%"; bk.style.width = ((lk + 7) / 14 * 100) + "%";
        bq.innerHTML = "Q = " + pr(lq); bk.innerHTML = "K = " + pr(lk);
        const d = lq - lk;
        out.innerHTML = Math.abs(d) < 0.05
          ? "<b>Q = K</b> → 이미 평형. 순변화 없음."
          : d < 0 ? "<b>Q &lt; K</b> → 생성물이 부족 → <b>정반응(→)</b> 으로 진행해 Q 가 K 에 도달."
                  : "<b>Q &gt; K</b> → 생성물이 과다 → <b>역반응(←)</b> 으로 진행해 Q 가 K 로 내려옴.";
      }
      el.addEventListener("input", e => { if (e.target.dataset.r === "q") lq = +e.target.value; if (e.target.dataset.r === "k") lk = +e.target.value; upd(); });
      upd();
    },

    "ph-slider"(el) {
      let pH = 7;
      const EX = [[0, 1, "강산 (예: 1 M HCl ≈ 0)"], [1, 2.2, "위액 · 레몬즙"], [2.2, 3.6, "식초 · 탄산음료"], [4.5, 5.5, "블랙커피"], [6.2, 6.8, "우유"], [6.9, 7.1, "순수한 물 (25 °C)"], [7.2, 7.6, "혈액"], [8, 8.5, "베이킹소다 수용액"], [10.8, 12, "가정용 암모니아수"], [12.2, 12.8, "표백제"], [13.5, 14, "강염기 (예: 1 M NaOH ≈ 14)"]];
      el.innerHTML = `<div class="wt">pH 슬라이더 <span class="badge">interactive</span></div>
        <div class="wrow"><label>pH <input type="range" min="0" max="14" step="0.1" value="${pH}" aria-label="pH" style="width:min(380px,70vw)"></label><b class="pv"></b></div>
        <div class="phbar"><i></i><span style="left:0%">0</span><span style="left:25%">3.5</span><span style="left:50%">7</span><span style="left:75%">10.5</span><span style="left:100%">14</span></div>
        <p class="readout" aria-live="polite"></p>`;
      const sl = $("input", el), mark = $(".phbar i", el), out = $(".readout", el), pv = $(".pv", el);
      const sci = v => { const e = Math.floor(Math.log10(v) + 1e-9); return `${(v / Math.pow(10, e)).toFixed(1)}×10<sup>${e}</sup>`.replace("<sup>-", "<sup>−"); };
      function upd() {
        pH = +sl.value; mark.style.left = (pH / 14 * 100) + "%";
        const h = Math.pow(10, -pH), oh = Math.pow(10, -(14 - pH));
        const kind = Math.abs(pH - 7) < 0.05 ? "중성 (neutral)" : pH < 7 ? "산성 (acidic) — [H⁺] > [OH⁻]" : "염기성 (basic) — [H⁺] < [OH⁻]";
        const ex = EX.find(x => pH >= x[0] && pH <= x[1]);
        pv.textContent = pH.toFixed(1);
        out.innerHTML = `[H⁺] = ${sci(h)} M &nbsp;·&nbsp; [OH⁻] = ${sci(oh)} M &nbsp;·&nbsp; pOH = ${(14 - pH).toFixed(1)}<br><b>${kind}</b>${ex ? ` <span class="muted">· 예: ${ex[2]}</span>` : ""}`;
      }
      sl.addEventListener("input", upd); upd();
    }
  };

  /* ============================== MEMORIZE ============================== */
  const MEM_KEY = "apchem.mem.v1";
  let memStatus = store.get(MEM_KEY, {});
  const mem = { mode: store.get("apchem.mem.mode", "flash"), ch: "all", showX: false, status: "all", idx: 0, flipped: false, order: null, search: "", written: "", checked: null, revealed: {} };

  function parseA(a) {
    const out = []; let last = 0; const re = /\[\[(.+?)\]\]/g; let m;
    while ((m = re.exec(a))) {
      if (m.index > last) out.push({ t: "txt", v: a.slice(last, m.index) });
      const alts = m[1].split("|").map(s => s.trim()).filter(Boolean);
      out.push({ t: "key", term: alts[0], alts });
      last = re.lastIndex;
    }
    if (last < a.length) out.push({ t: "txt", v: a.slice(last) });
    return out;
  }
  const answerHTML = (a, cloze) => parseA(a).map((tk, i) =>
    tk.t === "txt" ? esc(tk.v)
      : cloze ? `<button type="button" class="blank${mem.revealed[i] ? " open" : ""}" data-i="${i}" aria-label="빈칸 ${i}">${esc(tk.term)}</button>`
        : `<span class="key">${esc(tk.term)}</span>`).join("");

  // 쓰기 채점: 기호/수식형 용어는 공백·^·괄호를 무시하고, 일반 단어는 공백·하이픈·대소문자를 무시하고 비교
  const fs = s => s.toLowerCase().normalize("NFKC").replace(/[−–—‐]/g, "-").replace(/[×*]/g, "x").replace(/[\s^{}()·]/g, "");
  const nw = s => s.toLowerCase().normalize("NFKC").replace(/[^a-z0-9가-힣]/g, "");
  const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  function keyHit(alts, text) {
    const T1 = fs(text), T2 = nw(text), low = text.toLowerCase().normalize("NFKC");
    return alts.some(alt => {
      if (/[-−^\/=<>+0-9]/.test(alt)) {
        const f = fs(alt);
        if (f.length >= 2) return T1.includes(f);
        if (/^[0-9]$/.test(f)) return new RegExp("(^|[^0-9.])" + f + "($|[^0-9])").test(low);   // 한 자리 숫자는 독립된 숫자일 때만
        return f ? T1.includes(f) : false;
      }
      const n = nw(alt); if (!n) return false;
      if (/[가-힣]/.test(n)) return n.length >= 2 && T2.includes(n);
      // 짧은 영문 약어(pH, Ka, Ea 등)는 독립된 낱말일 때만 인정 (graph 속의 'ph' 같은 오인 방지)
      if (n.length <= 3) return new RegExp("(^|[^a-z0-9])" + reEsc(alt.toLowerCase().normalize("NFKC")) + "($|[^a-z0-9])").test(low);
      return T2.includes(n);
    });
  }

  function memPool() {
    let list = CONCEPTS.filter(c => (mem.showX || !c.x) && (mem.ch === "all" || c.ch === +mem.ch));
    if (mem.status !== "all") list = list.filter(c => (memStatus[c.id] || "new") === mem.status);
    if (mem.order) {
      const pos = new Map(mem.order.map((id, i) => [id, i]));
      list = list.slice().sort((a, b) => (pos.has(a.id) ? pos.get(a.id) : 1e9) - (pos.has(b.id) ? pos.get(b.id) : 1e9));
    }
    return list;
  }
  const setStatus = (id, st) => { if (st) memStatus[id] = st; else delete memStatus[id]; store.set(MEM_KEY, memStatus); };

  function initMemorize() {
    const root = $("#memorizeApp");
    root.addEventListener("click", memClick);
    root.addEventListener("input", e => {
      if (e.target.matches("textarea.ans")) mem.written = e.target.value;
      if (e.target.matches("input.search")) { mem.search = e.target.value; fillMemList(); }
    });
    root.addEventListener("change", e => {
      if (e.target.id === "memStatus") { mem.status = e.target.value; mem.idx = 0; resetCard(); renderMem(); }
      if (e.target.id === "memShowX") { mem.showX = e.target.checked; mem.idx = 0; resetCard(); renderMem(); }
    });
    document.addEventListener("keydown", memKey);
    renderMem();
  }
  function resetCard() { mem.flipped = false; mem.written = ""; mem.checked = null; mem.revealed = {}; }

  function memKey(e) {
    if (currentTab !== "memorize" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (mem.mode === "list") return;
    if (e.key === "ArrowRight") { e.preventDefault(); memMove(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); memMove(-1); }
    else if ((e.key === " " || e.key === "Enter") && mem.mode === "flash" && !/^(BUTTON|A)$/.test(e.target.tagName)) { e.preventDefault(); mem.flipped = !mem.flipped; renderMemBody(); }
    else if (e.key === "1") memMark("unsure");
    else if (e.key === "2") memMark("known");
  }

  function memMove(d) {
    const n = memPool().length; if (!n) return;
    mem.idx = (mem.idx + d + n) % n; resetCard(); renderMemBody();
  }
  function memMark(st) {
    const pool = memPool(); const c = pool[mem.idx]; if (!c) return;
    setStatus(c.id, st);
    const keepIdx = mem.status !== "all" && mem.status !== st;   // 필터에서 빠지면 같은 자리에 다음 카드가 옴
    if (!keepIdx) mem.idx = mem.idx + 1;
    const n = memPool().length; mem.idx = n ? mem.idx % n : 0;
    resetCard(); renderMem();
  }

  function memClick(e) {
    const t = e.target.closest("[data-m]"); if (!t) { const bl = e.target.closest(".blank"); if (bl) { mem.revealed[bl.dataset.i] = !mem.revealed[bl.dataset.i]; bl.classList.toggle("open"); } return; }
    const a = t.dataset.m;
    if (a === "mode") { mem.mode = t.dataset.v; store.set("apchem.mem.mode", mem.mode); mem.idx = 0; resetCard(); renderMem(); }
    else if (a === "ch") { mem.ch = t.dataset.v; mem.idx = 0; resetCard(); renderMem(); }
    else if (a === "shuffle") { mem.order = shuffle(CONCEPTS.map(c => c.id)); mem.idx = 0; resetCard(); renderMem(); }
    else if (a === "reset-order") { mem.order = null; mem.idx = 0; resetCard(); renderMem(); }
    else if (a === "flip") { mem.flipped = !mem.flipped; renderMemBody(); }
    else if (a === "prev") memMove(-1);
    else if (a === "next") memMove(1);
    else if (a === "known" || a === "unsure") memMark(a);
    else if (a === "check") memCheck();
    else if (a === "show") { mem.checked = mem.checked || { shown: true }; mem.checked.shown = true; renderMemBody(); }
    else if (a === "reveal-all") { parseA(memPool()[mem.idx].a).forEach((tk, i) => { if (tk.t === "key") mem.revealed[i] = true; }); renderMemBody(); }
    else if (a === "cover-all") { mem.revealed = {}; renderMemBody(); }
    else if (a === "wipe") { if (confirm("암기 진행 상황(알아요/헷갈려요 표시)을 모두 지울까요?")) { memStatus = {}; store.set(MEM_KEY, memStatus); renderMem(); } }
    else if (a === "set") {
      setStatus(t.dataset.id, t.dataset.v === "none" ? null : t.dataset.v);
      const d = t.closest("details"), dot = d && $(".dot", d);
      if (dot) dot.className = "dot " + (memStatus[t.dataset.id] || "");
      $("#memStats").innerHTML = memStatsHTML();
    }
  }

  function memCheck() {
    const c = memPool()[mem.idx]; if (!c) return;
    const keys = parseA(c.a).filter(x => x.t === "key");
    const res = keys.map(k => ({ term: k.term, hit: keyHit(k.alts, mem.written) }));
    mem.checked = { res, shown: true };
    renderMemBody();
  }

  function memStats() {
    const all = CONCEPTS.filter(c => (mem.showX || !c.x) && (mem.ch === "all" || c.ch === +mem.ch));
    let known = 0, unsure = 0;
    all.forEach(c => { const s = memStatus[c.id]; if (s === "known") known++; else if (s === "unsure") unsure++; });
    return { total: all.length, known, unsure, fresh: all.length - known - unsure };
  }

  function memStatsHTML() {
    const st = memStats();
    const pct = st.total ? Math.round(st.known / st.total * 100) : 0;
    return `<span>알아요 <b>${st.known}</b></span><span>헷갈려요 <b>${st.unsure}</b></span><span>아직 안 봄 <b>${st.fresh}</b></span><span>전체 <b>${st.total}</b></span>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div><b>${pct}%</b>`;
  }

  function renderMem() {
    const root = $("#memorizeApp");
    const modes = [["flash", "플래시카드"], ["write", "쓰기 연습"], ["cloze", "빈칸 채우기"], ["list", "목록 · 검색"]];
    root.innerHTML = `
      <div class="toolbar">
        <div class="grp"><span class="lbl">방식</span>${modes.map(([k, l]) => `<button type="button" class="chip" data-m="mode" data-v="${k}" aria-pressed="${mem.mode === k}">${l}</button>`).join("")}</div>
      </div>
      <div class="toolbar">
        <div class="grp"><span class="lbl">단원</span>
          ${[["all", "전체", ""], ["13", "13 Kinetics", "c13"], ["14", "14 Equilibrium", "c14"], ["15", "15 Acids·Bases", "c15"]].map(([k, l, c]) => `<button type="button" class="chip ${c}" data-m="ch" data-v="${k}" aria-pressed="${mem.ch === k}">${l}</button>`).join("")}</div>
        <div class="grp"><label class="lbl" for="memStatus">상태</label>
          <select id="memStatus" class="search" style="flex:none;max-width:none">
            ${[["all", "전체"], ["new", "아직 안 봄"], ["unsure", "헷갈려요"], ["known", "알아요"]].map(([k, l]) => `<option value="${k}"${mem.status === k ? " selected" : ""}>${l}</option>`).join("")}</select></div>
        <label class="switch"><input type="checkbox" id="memShowX"${mem.showX ? " checked" : ""}> 범위 제외(X) 항목 포함</label>
        <span class="spacer"></span>
        <button type="button" class="btn" data-m="${mem.order ? "reset-order" : "shuffle"}">${mem.order ? "순서대로" : "섞기"}</button>
        <button type="button" class="btn" data-m="wipe">진행 초기화</button>
      </div>
      <div class="mem-stats" id="memStats">${memStatsHTML()}</div>
      <div id="memBody"></div>`;
    renderMemBody();
  }

  function tagsHTML(c) {
    return `<span class="badge ch${c.ch}">${c.ch}단원</span><span class="badge">${esc(c.topic)}</span>${c.x ? '<span class="badge hw">범위 제외 표시</span>' : ""}${c.sup ? '<span class="badge">교재 보충</span>' : ""}`;
  }

  function renderMemBody() {
    const body = $("#memBody"); if (!body) return;
    const pool = memPool();
    if (mem.mode === "list") return renderMemList(body);
    if (!pool.length) { body.innerHTML = `<div class="empty">조건에 맞는 카드가 없어요. 필터를 바꿔 보세요.</div>`; return; }
    if (mem.idx >= pool.length) mem.idx = 0;
    const c = pool[mem.idx];
    const stat = memStatus[c.id] || "new";
    const nav = `<div class="fc-nav"><button type="button" class="btn" data-m="prev">← 이전</button><span><b>${mem.idx + 1}</b> / ${pool.length} <span class="dot ${stat}" title="현재 상태"></span></span><button type="button" class="btn" data-m="next">다음 →</button></div>`;
    const rate = `<div class="fc-actions"><button type="button" class="btn btn-bad" data-m="unsure">헷갈려요 ✗ <span class="kbd">1</span></button><button type="button" class="btn btn-ok" data-m="known">알아요 ✓ <span class="kbd">2</span></button></div>`;

    if (mem.mode === "flash") {
      body.innerHTML = `<div class="stage">
        <div class="fc-wrap"><div class="flashcard c${c.ch}${mem.flipped ? " flipped" : ""}" data-m="flip" tabindex="0" role="button" aria-label="카드 뒤집기" style="--accent:var(--c${c.ch})">
          <div class="fc-face fc-front" aria-hidden="${mem.flipped}"><div class="fc-meta">${tagsHTML(c)}</div><div class="fc-q">${esc(c.q)}</div><div class="muted" style="margin-top:8px">${esc(c.qk)}</div><div class="fc-hint">눌러서 답 확인 · <span class="kbd">Space</span></div></div>
          <div class="fc-face fc-back" aria-hidden="${!mem.flipped}"><div class="fc-meta">${tagsHTML(c)}</div><div class="en">${answerHTML(c.a, false)}</div><div class="ko">${esc(c.ko)}</div></div>
        </div></div>${mem.flipped ? rate : `<div class="fc-actions"><button type="button" class="btn btn-primary" data-m="flip">답 보기</button></div>`}${nav}</div>`;
      return;
    }

    if (mem.mode === "write") {
      const ck = mem.checked;
      let resHTML = "";
      if (ck && ck.res) {
        const h = ck.res.filter(r => r.hit).length, n = ck.res.length;
        const msg = h / n >= 0.8 ? "아주 좋아요!" : h / n >= 0.5 ? "조금만 더 — 빠진 핵심어를 보충해 보세요." : "다시 한 번 외워 볼까요?";
        resHTML = `<div class="score-line">핵심어 ${h} / ${n} — ${msg}</div><div class="kw-list">${ck.res.map(r => `<span class="kw ${r.hit ? "hit" : "miss"}">${r.hit ? "✓" : "✗"} ${esc(r.term)}</span>`).join("")}</div>`;
      }
      const model = ck && ck.shown ? `<div class="model"><div class="en">${answerHTML(c.a, false)}</div><div class="ko">${esc(c.ko)}</div></div>${rate}` : "";
      body.innerHTML = `<div class="stage"><div class="card write-box" style="border-top:5px solid var(--c${c.ch})">
        <div class="fc-meta">${tagsHTML(c)}</div><div class="fc-q">${esc(c.q)}</div><div class="muted" style="margin:4px 0 10px">${esc(c.qk)} — 영어로 써 보세요 (한국어 용어도 인정)</div>
        <textarea class="ans" placeholder="여기에 답을 써 보세요…" aria-label="답안 입력">${esc(mem.written)}</textarea>
        <div class="prob-actions"><button type="button" class="btn btn-primary" data-m="check">채점 도우미</button><button type="button" class="btn" data-m="show">모범답안만 보기</button></div>
        ${resHTML}${model}</div>${nav}</div>`;
      return;
    }

    if (mem.mode === "cloze") {
      body.innerHTML = `<div class="stage"><div class="card" style="border-top:5px solid var(--c${c.ch})">
        <div class="fc-meta">${tagsHTML(c)}</div><div class="fc-q">${esc(c.q)}</div><div class="muted" style="margin:4px 0 12px">${esc(c.qk)} — 빈칸을 눌러 확인하세요.</div>
        <div class="cloze-text">${answerHTML(c.a, true)}</div>
        <div class="prob-actions"><button type="button" class="btn" data-m="reveal-all">모두 보기</button><button type="button" class="btn" data-m="cover-all">다시 가리기</button></div>
        <div class="ko muted" style="margin-top:10px;font-size:.92rem">${esc(c.ko)}</div></div>${rate}${nav}</div>`;
    }
  }

  function renderMemList(body) {
    body.innerHTML = `<div class="toolbar"><input class="search" type="search" placeholder="용어 검색 (예: half-life, 반감기, Kw)" value="${esc(mem.search)}" aria-label="검색"><span class="muted" id="memCount"></span></div>
      <div class="clist" id="memList"></div>`;
    fillMemList();
  }
  // 검색창은 그대로 두고 목록만 갱신 (한글 IME 입력이 끊기지 않도록)
  function fillMemList() {
    const box = $("#memList"); if (!box) return;
    const q = mem.search.trim().toLowerCase();
    const pool = memPool();
    const list = q ? pool.filter(c => (c.q + " " + c.qk + " " + c.a + " " + c.ko + " " + c.topic).toLowerCase().includes(q)) : pool;
    $("#memCount").textContent = list.length + "개";
    box.innerHTML = list.map(c => `<details><summary><span class="dot ${memStatus[c.id] || ""}"></span>${esc(c.q)} ${tagsHTML(c)}</summary>
        <div class="body"><div class="en">${answerHTML(c.a, false)}</div><div class="ko">${esc(c.qk)} — ${esc(c.ko)}</div>
        <div class="prob-actions"><button type="button" class="btn btn-ok" data-m="set" data-id="${c.id}" data-v="known">알아요</button><button type="button" class="btn btn-bad" data-m="set" data-id="${c.id}" data-v="unsure">헷갈려요</button><button type="button" class="btn" data-m="set" data-id="${c.id}" data-v="none">표시 지우기</button></div></div></details>`).join("") || `<div class="empty">검색 결과가 없어요.</div>`;
  }

  /* ============================== PRACTICE ============================== */
  const PROB_KEY = "apchem.prob.v1";
  let probState = store.get(PROB_KEY, {});
  const prac = { mode: store.get("apchem.prac.mode", "bank"), ch: "all", src: "all", state: "all", page: 1, order: null, gen: "all", genProb: null, genStats: store.get("apchem.gen.v1", { ok: 0, tot: 0 }) };
  const PAGE = 8;
  const SRC_LABEL = { book: ["book", "교재"], hw: ["hw", "숙제(HW)"], ap: ["ap", "AP 스타일"], concept: ["", "개념 확인"], gen: ["gen", "랜덤"] };

  function parseNum(str) {
    if (!str) return NaN;
    let s = String(str).trim().toLowerCase().replace(/[−–—]/g, "-").replace(/,/g, "");
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]/g, c => ({ "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" }[c]));
    s = s.replace(/\s*(?:×|x|\*)\s*10\s*\^?\s*\(?\s*([+-]?\d+)\s*\)?/, "e$1").replace(/\s+/g, "");
    const p10 = s.match(/^10\^\(?([+-]?\d+)\)?$/); if (p10) return Math.pow(10, +p10[1]);
    const fr = s.match(/^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)\/(\d*\.?\d+(?:e[+-]?\d+)?)/);
    if (fr) return parseFloat(fr[1]) / parseFloat(fr[2]);
    const m = s.match(/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/);
    return m ? parseFloat(m[0]) : NaN;
  }
  function isRight(val, part) {
    if (!isFinite(val)) return false;
    // pH 처럼 절대오차로 채점하는 문항은 소수 둘째 자리 반올림 차이를 감안해 최소 ±0.05 허용
    if (part.abs != null) return Math.abs(val - part.answer) <= Math.max(part.abs, 0.05) + 1e-9;
    return Math.abs(val - part.answer) <= (part.tol != null ? part.tol : 0.03) * Math.abs(part.answer);
  }
  function diagnose(val, part) {
    if (!isFinite(val)) return "숫자로 읽을 수 없어요. 예) 6.4e5, 6.4×10^5, 0.0123";
    const a = part.answer;
    if (part.abs != null) {
      if (Math.abs(val - (14 - a)) <= part.abs + 0.011) return "pOH 를 구한 것 같아요 — pH = 14 − pOH 인지 확인!";
      return null;
    }
    if (a !== 0 && val !== 0) {
      const r = val / a;
      if (r < 0) return "부호를 확인해 보세요.";
      const lg = Math.log10(r);
      if (Math.abs(lg - Math.round(lg)) < 0.015 && Math.round(lg) !== 0) return "숫자는 맞는데 10의 거듭제곱(지수 자릿수)이 달라요.";
      if (Math.abs(r - Math.LN10) / Math.LN10 < 0.03 || Math.abs(r - 1 / Math.LN10) * Math.LN10 < 0.03) return "ln 과 log 를 섞어 쓰지 않았는지 확인해 보세요.";
      if (Math.abs(r - 60) / 60 < 0.03 || Math.abs(r - 1 / 60) * 60 < 0.03) return "분 ↔ 초 단위 변환을 확인해 보세요.";
      if (Math.abs(1 / r - 1) < 0.03) return "역수가 되었을 수 있어요.";
      if (Math.abs(r - 1000) / 1000 < 0.03 || Math.abs(r - 0.001) < 3e-5) return "kJ ↔ J (×1000) 단위를 확인해 보세요.";
    }
    return null;
  }

  const getPS = id => probState[id] || (probState[id] = { parts: [], seen: false });
  const savePS = () => store.set(PROB_KEY, probState);
  function overall(p, ps) {
    const rs = p.parts.map((_, i) => (ps.parts[i] && ps.parts[i].r) || null);
    if (rs.every(r => r === "ok")) return "ok";
    if (rs.some(r => r === "bad")) return "bad";
    return null;
  }

  function initPractice() {
    const root = $("#practiceApp");
    root.innerHTML = `<div class="p-layout"><div class="p-main"><div id="pControls"></div><div id="pList"></div></div>
      <aside class="p-side"><div class="card"><h4>내 진행 상황</h4><div id="pStats"></div></div>
      <div class="card"><h4>채점 팁</h4><p style="margin:0;font-size:.88rem" class="muted">숫자는 <code>6.4e5</code>, <code>6.4×10^5</code>, <code>0.0123</code> 처럼 입력해도 돼요. 유효숫자 차이는 오차 범위(보통 ±3 %)에서 정답으로 인정합니다.</p></div></aside></div>`;
    root.addEventListener("click", pracClick);
    root.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches(".numrow input")) { e.preventDefault(); const b = $('[data-act="check"]', e.target.closest(".numrow")); if (b) b.click(); } });
    root.addEventListener("change", e => {
      if (e.target.id === "gSel") { prac.gen = e.target.value; prac.genProb = null; renderPractice(); }
      if (e.target.id === "sSel") { prac.src = e.target.value; prac.page = 1; renderPractice(); }
      if (e.target.id === "stSel") { prac.state = e.target.value; prac.page = 1; renderPractice(); }
    });
    renderPractice();
  }

  function bankList() {
    let list = PROBLEMS.filter(p => (prac.ch === "all" || p.ch === +prac.ch) && (prac.src === "all" || p.src === prac.src));
    if (prac.mode === "wrong") list = list.filter(p => overall(p, getPS(p.id)) === "bad");
    else if (prac.state === "todo") list = list.filter(p => overall(p, getPS(p.id)) == null);
    else if (prac.state === "bad") list = list.filter(p => overall(p, getPS(p.id)) === "bad");
    else if (prac.state === "ok") list = list.filter(p => overall(p, getPS(p.id)) === "ok");
    if (prac.order) { const pos = new Map(prac.order.map((id, i) => [id, i])); list = list.slice().sort((a, b) => pos.get(a.id) - pos.get(b.id)); }
    return list;
  }

  function renderPractice() {
    const ctr = $("#pControls"), list = $("#pList");
    const modes = [["bank", "문제 은행"], ["gen", "랜덤 생성"], ["wrong", "오답 노트"]];
    const chips = [["all", "전체", ""], ["13", "13", "c13"], ["14", "14", "c14"], ["15", "15", "c15"]];
    let html = `<div class="mode-seg">${modes.map(([k, l]) => `<button type="button" class="btn" data-p="mode" data-v="${k}" aria-pressed="${prac.mode === k}">${l}</button>`).join("")}</div>
      <div class="toolbar"><div class="grp"><span class="lbl">단원</span>${chips.map(([k, l, c]) => `<button type="button" class="chip ${c}" data-p="ch" data-v="${k}" aria-pressed="${prac.ch === k}">${l}</button>`).join("")}</div>`;
    if (prac.mode === "bank") {
      html += `<div class="grp"><label class="lbl" for="sSel">출처</label><select id="sSel" class="search" style="flex:none;max-width:none">${[["all", "전체"], ["book", "교재"], ["hw", "숙제(HW)"], ["ap", "AP 스타일"], ["concept", "개념 확인"]].map(([k, l]) => `<option value="${k}"${prac.src === k ? " selected" : ""}>${l}</option>`).join("")}</select></div>
        <div class="grp"><label class="lbl" for="stSel">상태</label><select id="stSel" class="search" style="flex:none;max-width:none">${[["all", "전체"], ["todo", "안 푼 문제"], ["bad", "틀린 문제"], ["ok", "푼 문제"]].map(([k, l]) => `<option value="${k}"${prac.state === k ? " selected" : ""}>${l}</option>`).join("")}</select></div>
        <span class="spacer"></span><button type="button" class="btn" data-p="${prac.order ? "unshuffle" : "shuffle"}">${prac.order ? "순서대로" : "섞기"}</button>`;
    }
    html += `</div>`;
    if (prac.mode === "gen") {
      const gens = GENERATORS.filter(g => prac.ch === "all" || g.ch === +prac.ch);
      html += `<div class="gen-bar"><label class="lbl" for="gSel" style="font-size:.78rem;font-weight:800;color:var(--muted)">유형</label><select id="gSel" class="search" style="flex:none;max-width:none"><option value="all">전체 섞어서</option>${gens.map(g => `<option value="${g.key}"${prac.gen === g.key ? " selected" : ""}>${g.ch}단원 · ${g.label}</option>`).join("")}</select>
        <button type="button" class="btn btn-primary" data-p="newgen">새 문제 ▸</button><span class="muted" style="margin-left:auto">누적 <b>${prac.genStats.ok}</b> / ${prac.genStats.tot} 문제 첫 시도 정답</span></div>`;
    }
    ctr.innerHTML = html;

    list.innerHTML = "";
    if (prac.mode === "gen") {
      if (!prac.genProb) prac.genProb = makeGen();
      if (!prac.genProb) { list.innerHTML = `<div class="empty">이 단원에는 생성할 유형이 없어요.</div>`; }
      else list.appendChild(problemCard(prac.genProb, { persist: false }));
    } else {
      const all = bankList();
      const shown = all.slice(0, prac.page * PAGE);
      if (!all.length) list.innerHTML = `<div class="empty">${prac.mode === "wrong" ? "아직 틀린 문제가 없어요. 문제 은행에서 풀어 보세요!" : "조건에 맞는 문제가 없어요."}</div>`;
      const frag = document.createDocumentFragment();
      shown.forEach(p => frag.appendChild(problemCard(p, { persist: true })));
      list.appendChild(frag);
      if (all.length > shown.length) {
        const more = document.createElement("div"); more.style.textAlign = "center";
        more.innerHTML = `<button type="button" class="btn" data-p="more">더 보기 (${shown.length} / ${all.length})</button>`;
        list.appendChild(more);
      } else if (all.length) {
        const end = document.createElement("p"); end.className = "muted"; end.style.textAlign = "center"; end.textContent = `총 ${all.length}문제`; list.appendChild(end);
      }
    }
    renderPracStats();
  }

  function makeGen() {
    const gens = GENERATORS.filter(g => (prac.ch === "all" || g.ch === +prac.ch) && (prac.gen === "all" || g.key === prac.gen));
    if (!gens.length) return null;
    return gens[Math.floor(Math.random() * gens.length)].make();
  }

  function renderPracStats() {
    const box = $("#pStats"); if (!box) return;
    const rows = [13, 14, 15].map(ch => {
      const ps = PROBLEMS.filter(p => p.ch === ch);
      const ok = ps.filter(p => overall(p, getPS(p.id)) === "ok").length;
      const bad = ps.filter(p => overall(p, getPS(p.id)) === "bad").length;
      return `<div class="r"><span class="badge ch${ch}">${ch}단원</span><div class="progress"><i style="width:${ps.length ? ok / ps.length * 100 : 0}%;background:var(--c${ch})"></i></div><span>${ok}/${ps.length}${bad ? ` · <span style="color:var(--red)">✗${bad}</span>` : ""}</span></div>`;
    });
    const okAll = PROBLEMS.filter(p => overall(p, getPS(p.id)) === "ok").length;
    box.innerHTML = `<div class="ring-row">${rows.join("")}</div><p style="margin:10px 0 0;font-size:.88rem">전체 <b>${okAll}</b> / ${PROBLEMS.length} 문제 완료</p>
      <button type="button" class="btn" style="margin-top:8px" data-p="wipe">기록 초기화</button>`;
  }

  function pracClick(e) {
    const t = e.target.closest("[data-p]");
    if (t) {
      const a = t.dataset.p;
      if (a === "mode") { prac.mode = t.dataset.v; store.set("apchem.prac.mode", prac.mode); prac.page = 1; prac.genProb = null; renderPractice(); }
      else if (a === "ch") { prac.ch = t.dataset.v; prac.page = 1; prac.genProb = null; if (prac.gen !== "all" && !GENERATORS.some(g => g.key === prac.gen && (prac.ch === "all" || g.ch === +prac.ch))) prac.gen = "all"; renderPractice(); }
      else if (a === "more") { prac.page++; renderPractice(); }
      else if (a === "shuffle") { prac.order = shuffle(PROBLEMS.map(p => p.id)); prac.page = 1; renderPractice(); }
      else if (a === "unshuffle") { prac.order = null; prac.page = 1; renderPractice(); }
      else if (a === "newgen") { prac.genProb = makeGen(); renderPractice(); }
      else if (a === "wipe") { if (confirm("문제 풀이 기록을 모두 지울까요?")) { probState = {}; savePS(); prac.genStats = { ok: 0, tot: 0 }; store.set("apchem.gen.v1", prac.genStats); renderPractice(); } }
      return;
    }
  }

  /* ---------- problem card ---------- */
  function problemCard(p, opt) {
    const persist = opt.persist;
    const ps = persist ? getPS(p.id) : (p._ps || (p._ps = { parts: [], seen: false }));
    const card = document.createElement("article");
    card.className = `prob c${p.ch}`;
    card.dataset.id = p.id;
    const sl = SRC_LABEL[p.src] || ["", p.src];
    const lv = "●".repeat(p.level || 1) + "○".repeat(3 - (p.level || 1));
    const num = (p.id.match(/p(\d+)-(\d+)/) || []);
    const idTxt = persist && num.length ? `${num[1]}-${+num[2]}` : "";
    card.innerHTML = `<div class="prob-head">${idTxt ? `<span class="pid">${idTxt}</span>` : ""}<span class="badge ${sl[0]}">${esc(p.srcLabel || sl[1])}</span><span class="badge ch${p.ch}">${esc(p.topic)}</span><span class="badge" title="난이도">${lv}</span><span class="state"></span></div>
      <div class="stem">${p.stem}</div>
      ${p.parts.map((pt, i) => partHTML(pt, i)).join("")}
      <div class="prob-actions"><button type="button" class="btn" data-a="sol">풀이 보기</button><button type="button" class="btn" data-a="reset">다시 풀기</button>${opt.persist ? "" : '<button type="button" class="btn btn-primary hide" data-a="next">다음 문제 ▸</button>'}</div>
      <div class="sol hide"><h5>풀이</h5>${p.solution || ""}</div>`;
    // restore state
    p.parts.forEach((pt, i) => { const s = ps.parts[i]; if (s) applyPartState(card, p, pt, i, s, true); });
    updateCardState(card, p, ps);
    card.addEventListener("click", e => onCardClick(e, card, p, ps, persist));
    renderMath(card);
    return card;
  }

  function partHTML(pt, i) {
    const head = `<div class="ptxt">${pt.label ? `<span class="plabel">${pt.label}</span>` : ""}${pt.prompt || ""}</div>`;
    if (pt.type === "mc") {
      return `<div class="part" data-i="${i}">${head}<div class="opts">${pt.options.map((o, j) => `<button type="button" class="opt" data-a="opt" data-j="${j}"><span class="k">${"ABCDEF"[j]}</span><span>${o}</span></button>`).join("")}</div><div class="fb hide"></div></div>`;
    }
    if (pt.type === "num") {
      return `<div class="part" data-i="${i}">${head}<div class="numrow"><input type="text" inputmode="decimal" autocomplete="off" spellcheck="false" placeholder="숫자 입력 (예: 6.4e5)" aria-label="답 입력"><span class="unit">${pt.unit || ""}</span>
        <button type="button" class="btn btn-primary" data-a="check">확인</button>${pt.hint ? '<button type="button" class="btn" data-a="hint">힌트</button>' : ""}<button type="button" class="btn" data-a="giveup">정답 보기</button></div><div class="fb hide"></div></div>`;
    }
    return `<div class="part" data-i="${i}">${head}<div class="self-row"><button type="button" class="btn btn-ok" data-a="selfok">맞혔어요</button><button type="button" class="btn btn-bad" data-a="selfbad">틀렸어요</button></div><div class="fb hide"></div></div>`;
  }

  function fb(partEl, cls, html) {
    const f = $(".fb", partEl); f.className = "fb " + cls; f.innerHTML = html;
  }

  function applyPartState(card, p, pt, i, s, silent) {
    const partEl = $(`.part[data-i="${i}"]`, card);
    if (pt.type === "mc") {
      const opts = $$(".opt", partEl);
      opts.forEach(o => { o.disabled = true; });
      opts[pt.answer].classList.add("right");
      if (s.v != null && +s.v !== pt.answer && opts[+s.v]) opts[+s.v].classList.add("wrong");
      fb(partEl, s.r === "ok" ? "ok" : "bad", s.r === "ok" ? "✓ <b>정답!</b>" : `✗ <b>오답</b> — 정답은 <b>${"ABCDEF"[pt.answer]}</b>`);
    } else if (pt.type === "num") {
      const inp = $("input", partEl);
      if (s.v != null && s.v !== "") inp.value = s.v;
      if (s.r === "ok") fb(partEl, "ok", `✓ <b>정답!</b> 기준 답안 ≈ <b>${fmtVal(pt.answer)}</b> ${pt.unit || ""}`);
      else if (s.gave) fb(partEl, "info", `정답: <b>${fmtVal(pt.answer)}</b> ${pt.unit || ""}`);
      else if (s.r === "bad") fb(partEl, "bad", `✗ 다시 계산해 보세요.${s.msg ? " " + s.msg : ""}`);
    } else if (s.r) {
      fb(partEl, s.r === "ok" ? "ok" : "bad", s.r === "ok" ? "✓ 맞았다고 표시했어요" : "✗ 틀렸다고 표시했어요");
    }
  }

  function updateCardState(card, p, ps) {
    const ov = overall(p, ps);
    card.classList.toggle("done-ok", ov === "ok");
    card.classList.toggle("done-bad", ov === "bad");
    const st = $(".prob-head .state", card);
    st.className = "state " + (ov || ""); st.textContent = ov === "ok" ? "✓ 완료" : ov === "bad" ? "✗ 오답 있음" : "";
  }

  function afterAnswer(card, p, ps, persist) {
    updateCardState(card, p, ps);
    if (persist) { savePS(); renderPracStats(); if (prac.mode === "wrong" && overall(p, ps) !== "bad") { /* 목록은 다음 렌더에서 갱신 */ } }
    else {
      const done = p.parts.every((_, i) => ps.parts[i] && ps.parts[i].r);
      const nb = $('[data-a="next"]', card);
      if (done && nb) {
        nb.classList.remove("hide");
        if (!ps.counted) {
          ps.counted = true;
          const perfect = p.parts.every((_, i) => ps.parts[i].r === "ok" && !ps.parts[i].miss);
          prac.genStats.tot++; if (perfect) prac.genStats.ok++;
          store.set("apchem.gen.v1", prac.genStats);
          const lab = $(".gen-bar .muted b"); if (lab) { lab.textContent = prac.genStats.ok; lab.parentElement.lastChild.textContent = ` / ${prac.genStats.tot} 문제 첫 시도 정답`; }
        }
      }
    }
  }

  function onCardClick(e, card, p, ps, persist) {
    const b = e.target.closest("[data-a]"); if (!b || !card.contains(b)) return;
    const act = b.dataset.a;
    const partEl = b.closest(".part");
    const i = partEl ? +partEl.dataset.i : -1;
    const pt = i >= 0 ? p.parts[i] : null;

    if (act === "sol") {
      const sol = $(".sol", card); const open = sol.classList.toggle("hide") === false;
      b.textContent = open ? "풀이 숨기기" : "풀이 보기";
      if (open) { ps.seen = true; if (persist) savePS(); }
    } else if (act === "reset") {
      if (persist) { delete probState[p.id]; savePS(); } else { p._ps = null; }
      const fresh = problemCard(p, { persist }); card.replaceWith(fresh);
      if (persist) renderPracStats();
    } else if (act === "next") {
      prac.genProb = makeGen(); renderPractice(); $("#pControls").scrollIntoView({ block: "start" });
    } else if (act === "opt") {
      if (ps.parts[i] && ps.parts[i].r) return;
      const j = +b.dataset.j; const ok = j === pt.answer;
      ps.parts[i] = { r: ok ? "ok" : "bad", v: j, miss: ok ? 0 : 1 };
      applyPartState(card, p, pt, i, ps.parts[i]);
      afterAnswer(card, p, ps, persist);
    } else if (act === "check") {
      const inp = $("input", partEl); const raw = inp.value.trim();
      if (!raw) { fb(partEl, "info", "답을 입력해 주세요."); return; }
      const val = parseNum(raw); const prev = ps.parts[i] || {};
      if (isRight(val, pt)) ps.parts[i] = { r: "ok", v: raw, miss: prev.miss || 0 };
      else { const msg = diagnose(val, pt); ps.parts[i] = { r: "bad", v: raw, msg, miss: (prev.miss || 0) + 1 }; }
      applyPartState(card, p, pt, i, ps.parts[i]);
      afterAnswer(card, p, ps, persist);
    } else if (act === "hint") {
      fb(partEl, "info", "💡 " + pt.hint);
    } else if (act === "giveup") {
      const prev = ps.parts[i] || {};
      ps.parts[i] = { r: prev.r === "ok" ? "ok" : "bad", v: prev.v, gave: prev.r !== "ok", miss: (prev.miss || 0) + (prev.r === "ok" ? 0 : 1) };
      applyPartState(card, p, pt, i, ps.parts[i]);
      afterAnswer(card, p, ps, persist);
    } else if (act === "selfok" || act === "selfbad") {
      ps.parts[i] = { r: act === "selfok" ? "ok" : "bad", miss: act === "selfok" ? 0 : 1 };
      applyPartState(card, p, pt, i, ps.parts[i]);
      afterAnswer(card, p, ps, persist);
    }
  }

  /* ============================== boot ============================== */
  route();
})();
