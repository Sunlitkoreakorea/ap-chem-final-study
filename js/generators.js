/*
 * 랜덤 문제 생성기 — 누를 때마다 숫자가 바뀌는 연습 문제
 * 각 generator: { key, label, ch, make() -> problem }  (problem 형식은 data-problems.js 와 동일)
 */
(function (root) {
  const R = String.raw;
  const RGAS = 8.314;
  let counter = 0;

  /* ---------- helpers ---------- */
  const rnd = (a, b) => a + Math.random() * (b - a);
  const rint = (a, b) => Math.floor(rnd(a, b + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const sig = (x, n) => Number(x.toPrecision(n));
  const sci = (x, n = 3) => {
    const [m, e] = x.toExponential(n - 1).split("e");
    return `${m}\\times10^{${parseInt(e, 10)}}`;
  };
  const fmt = (x, n = 3) => {
    const ax = Math.abs(x);
    if (ax !== 0 && (ax < 1e-3 || ax >= 1e5)) return sci(x, n);
    return String(Number(x.toPrecision(n)));
  };
  const pw = (m, e) => sig(m * Math.pow(10, e), 2);          // 2자리 유효숫자의 과학 표기 값
  const kUnit = n => ({ 0: "M/s", 1: "s<sup>−1</sup>", 2: "M<sup>−1</sup>s<sup>−1</sup>", 3: "M<sup>−2</sup>s<sup>−1</sup>", 4: "M<sup>−3</sup>s<sup>−1</sup>" }[n]);
  const RIGHT = "오른쪽(정반응) — 생성물 쪽으로";
  const LEFT = "왼쪽(역반응) — 반응물 쪽으로";
  const NONE = "이동 없음";

  const base = (key, ch, topic, extra) =>
    Object.assign({ id: `gen-${key}-${++counter}`, ch, topic, src: "gen", srcLabel: "랜덤 생성", level: 2 }, extra);

  /* ====================== 13 ====================== */
  const gens = [];

  gens.push({ key: "k0", label: "0차 반응: 농도·반감기·소진 시간", ch: 13, make() {
    const k = pw(rint(11, 98) / 10, -rint(2, 3));
    const A0 = sig(rnd(0.2, 2.0), 2);
    const tend = A0 / k;
    const t = sig(rnd(0.15, 0.85) * tend, 2);
    const At = A0 - k * t;
    const half = A0 / (2 * k);
    return base("k0", 13, "13.3 농도–시간 (0차)", {
      stem: R`<p>0차 반응에서 $k=${fmt(k)}\ \mathrm{M\,s^{-1}}$ 이고 처음 농도 $[\mathrm A]_0=${A0}$ M 이다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$t=${fmt(t)}$ s 후의 $[\mathrm A]$`, type: "num", answer: At, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: "반감기", type: "num", answer: half, unit: "s", tol: 0.03 },
        { label: "(c)", prompt: "A 가 모두 소모될 때까지 걸리는 시간", type: "num", answer: tend, unit: "s", tol: 0.03 }
      ],
      solution: R`<p>(a) $[\mathrm A]_t=[\mathrm A]_0-kt=${A0}-(${fmt(k)})(${fmt(t)})=${fmt(At)}$ M</p>
        <p>(b) $t_{1/2}=\dfrac{[\mathrm A]_0}{2k}=\dfrac{${A0}}{2(${fmt(k)})}=${fmt(half)}$ s</p>
        <p>(c) $[\mathrm A]_t=0$ ⇒ $t=\dfrac{[\mathrm A]_0}{k}=${fmt(tend)}$ s (반감기의 2배)</p>`
    });
  } });

  gens.push({ key: "k1", out: "1·2차 반응", label: "1차 반응: 농도·반감기", ch: 13, make() {
    const k = pw(rint(11, 98) / 10, -rint(2, 4));
    const A0 = sig(rnd(0.1, 2.0), 2);
    const kt = rnd(0.4, 2.6);
    const t = sig(kt / k, 2);
    const At = A0 * Math.exp(-k * t);
    const half = Math.LN2 / k;
    return base("k1", 13, "13.3 농도–시간", {
      stem: R`<p>1차 반응에서 $k=${fmt(k)}\ \mathrm{s^{-1}}$ 이고 처음 농도 $[\mathrm A]_0=${A0}$ M 이다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$t=${fmt(t)}$ s 후의 $[\mathrm A]$`, type: "num", answer: At, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: "반감기", type: "num", answer: half, unit: "s", tol: 0.03 }
      ],
      solution: R`<p>(a) $\ln\dfrac{[\mathrm A]_t}{[\mathrm A]_0}=-kt$ ⇒ $[\mathrm A]_t=${A0}\,e^{-(${fmt(k)})(${fmt(t)})}=${fmt(At)}$ M</p>
        <p>(b) $t_{1/2}=\dfrac{0.693}{k}=\dfrac{0.693}{${fmt(k)}}=${fmt(half)}$ s</p>`
    });
  } });

  gens.push({ key: "k2", out: "1·2차 반응", label: "1차 반응: 몇 %가 남을 때까지", ch: 13, make() {
    const unit = pick(["s", "min", "h"]);
    const th = sig(rnd(5, 60), 2);
    const Y = pick([50, 25, 12.5, 10, 5, 20, 40]);
    const t = th * Math.log2(100 / Y);
    const k = Math.LN2 / th;
    return base("k2", 13, "13.3 반감기", {
      stem: R`<p>1차 반응의 반감기가 ${th} ${unit} 이다. 반응물이 처음 양의 ${Y} % 가 남을 때까지 걸리는 시간은?</p>`,
      parts: [{ prompt: "시간", type: "num", answer: t, unit, tol: 0.03 }],
      solution: R`<p>$k=\dfrac{0.693}{t_{1/2}}=\dfrac{0.693}{${th}}=${fmt(k)}\ \mathrm{${unit}^{-1}}$</p>
        <p>$t=\dfrac1k\ln\dfrac{[\mathrm A]_0}{[\mathrm A]_t}=\dfrac1{${fmt(k)}}\ln\dfrac{100}{${Y}}=${fmt(t)}\ \mathrm{${unit}}$</p>`
    });
  } });

  gens.push({ key: "k3", out: "1·2차 반응", label: "2차 반응: 농도·반감기", ch: 13, make() {
    const k = sig(rnd(0.05, 5), 2);
    const A0 = sig(rnd(0.1, 1.0), 2);
    const kA = rnd(0.5, 5);
    const t = sig(kA / (k * A0), 2);
    const At = 1 / (1 / A0 + k * t);
    const half = 1 / (k * A0);
    return base("k3", 13, "13.3 농도–시간", {
      stem: R`<p>2차 반응 $\ce{A -> product}$ 에서 $k=${fmt(k)}\ \mathrm{M^{-1}s^{-1}}$, $[\mathrm A]_0=${A0}$ M 이다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$t=${fmt(t)}$ s 후의 $[\mathrm A]$`, type: "num", answer: At, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: "첫 번째 반감기", type: "num", answer: half, unit: "s", tol: 0.03 }
      ],
      solution: R`<p>(a) $\dfrac1{[\mathrm A]_t}=kt+\dfrac1{[\mathrm A]_0}=(${fmt(k)})(${fmt(t)})+\dfrac1{${A0}}=${fmt(1 / At)}$ ⇒ $[\mathrm A]_t=${fmt(At)}$ M</p>
        <p>(b) $t_{1/2}=\dfrac1{k[\mathrm A]_0}=\dfrac1{(${fmt(k)})(${A0})}=${fmt(half)}$ s</p>`
    });
  } });

  gens.push({ key: "k4", label: "초기 속도법: 차수와 k", ch: 13, level: 3, make() {
    const orders = [0, 1, 2];
    let x, y;
    do { x = pick(orders); y = pick(orders); } while (x + y === 0 || x + y > 3);
    const a0 = pick([0.10, 0.20, 0.050, 0.30]);
    const b0 = pick([0.10, 0.20, 0.050, 0.30]);
    const kTrue = pw(rint(11, 98) / 10, rint(-2, 2));
    const exps = [[a0, b0], [2 * a0, b0], [a0, 2 * b0]];
    const rates = exps.map(([a, b]) => sig(kTrue * Math.pow(a, x) * Math.pow(b, y), 3));
    const n = x + y;
    const kAns = rates[0] / (Math.pow(a0, x) * Math.pow(b0, y));
    const opt = ["0차", "1차", "2차", "3차"];
    // 표 안에서는 표기를 통일 (너무 작거나 크면 모두 과학 표기)
    const useSci = Math.min(...rates) < 0.01 || Math.max(...rates) >= 1000;
    const rfmt = r => useSci ? sci(r, 3) : String(Number(r.toPrecision(3)));
    return base("k4", 13, "13.2 속도 법칙", {
      level: 3,
      stem: R`<p>$\ce{A + B -> C}$ 의 초기 속도 데이터이다.</p>` +
        `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Exp</th><th>[A] (M)</th><th>[B] (M)</th><th>Initial rate (M/s)</th></tr></thead><tbody>` +
        exps.map(([a, b], i) => `<tr><td>${i + 1}</td><td>${fmt(a)}</td><td>${fmt(b)}</td><td>$${rfmt(rates[i])}$</td></tr>`).join("") + `</tbody></table></div>`,
      parts: [
        { label: "(a)", prompt: "A 에 대한 차수", type: "mc", options: opt.slice(0, 3), answer: x },
        { label: "(b)", prompt: "B 에 대한 차수", type: "mc", options: opt.slice(0, 3), answer: y },
        { label: "(c)", prompt: "속도 상수 k (Exp 1 사용)", type: "num", answer: kAns, unit: kUnit(n), tol: 0.03 }
      ],
      solution: R`<p>Exp 1→2 ([B] 고정): [A] ×2 ⇒ 속도 ×${fmt(rates[1] / rates[0])} ⇒ $2^x$ ≈ ${fmt(rates[1] / rates[0])} ⇒ <b>x = ${x}</b>.</p>
        <p>Exp 1→3 ([A] 고정): [B] ×2 ⇒ 속도 ×${fmt(rates[2] / rates[0])} ⇒ <b>y = ${y}</b>.</p>
        <p>rate $=k[\mathrm A]^{${x}}[\mathrm B]^{${y}}$ (전체 ${n}차). $k=\dfrac{${rfmt(rates[0])}}{(${fmt(a0)})^{${x}}(${fmt(b0)})^{${y}}}=${fmt(kAns)}$ ${kUnit(n)}</p>`
    });
  } });

  // 슬라이드 필기: Arrhenius 두 점 식의 변수(k1, k2, T1, T2, Ea, R) 중 5개를 주고 나머지 하나를 구하는 문제
  gens.push({ key: "a1", label: "Arrhenius: 5개 변수 주고 하나 구하기 (k₂ · Eₐ · T₂)", ch: 13, level: 3, make() {
    const Ea = rint(8, 24) * 5;                     // kJ/mol
    const T1 = rint(56, 64) * 5;                    // 280–320 K
    const T2 = T1 + rint(3, 10) * 5;
    const k1 = pw(rint(11, 98) / 10, -rint(1, 4));
    const ratio = Math.exp(Ea * 1000 / RGAS * (1 / T1 - 1 / T2));
    const k2 = sig(k1 * ratio, 3);                  // 문제에 주어지는 값(3자리)으로 답을 다시 계산
    const variant = pick(["k2", "Ea", "T2"]);
    const eq = R`\ln\dfrac{k_2}{k_1}=\dfrac{E_a}{R}\left(\dfrac1{T_1}-\dfrac1{T_2}\right)`;
    if (variant === "k2") {
      const k2x = k1 * ratio;
      return base("a1", 13, "13.4 활성화 에너지", {
        level: 3,
        stem: R`<p>어떤 반응의 활성화 에너지는 ${Ea} kJ/mol 이고 ${T1} K 에서 속도 상수 $k=${fmt(k1)}$ (단위는 생략) 이다.</p>`,
        parts: [
          { label: "(a)", prompt: `${T2} K 에서의 k`, type: "num", answer: k2x, unit: "", tol: 0.03 },
          { label: "(b)", prompt: "속도 상수는 몇 배가 되었는가?", type: "num", answer: ratio, unit: "배", tol: 0.03 }
        ],
        solution: R`<p>$${eq}=\dfrac{${Ea * 1000}}{8.314}\left(\dfrac1{${T1}}-\dfrac1{${T2}}\right)=${fmt(Math.log(ratio))}$</p>
          <p>$k_2/k_1=${fmt(ratio)}$ ⇒ $k_2=${fmt(k2x)}$ &nbsp;(Ea 를 J 로 바꾸는 것 잊지 말기!)</p>`
      });
    }
    if (variant === "Ea") {
      const lnr = Math.log(k2 / k1);
      const EaAns = RGAS * lnr / (1 / T1 - 1 / T2) / 1000;
      return base("a1", 13, "13.4 활성화 에너지", {
        level: 3,
        stem: R`<p>어떤 반응의 속도 상수가 ${T1} K 에서 $k_1=${fmt(k1)}$, ${T2} K 에서 $k_2=${fmt(k2)}$ 이다 (단위는 생략). 활성화 에너지를 kJ/mol 로 구하시오.</p>`,
        parts: [{ prompt: R`$E_a$`, type: "num", answer: EaAns, unit: "kJ/mol", tol: 0.03 }],
        solution: R`<p>$${eq}$ 를 $E_a$ 에 대해 정리: $E_a=\dfrac{R\ln(k_2/k_1)}{1/T_1-1/T_2}=\dfrac{8.314\,\ln(${fmt(k2 / k1)})}{1/${T1}-1/${T2}}=${fmt(EaAns * 1000)}$ J/mol $=${fmt(EaAns)}$ kJ/mol</p>`
      });
    }
    const T2Ans = 1 / (1 / T1 - RGAS * Math.log(k2 / k1) / (Ea * 1000));
    return base("a1", 13, "13.4 활성화 에너지", {
      level: 3,
      stem: R`<p>활성화 에너지가 ${Ea} kJ/mol 인 반응의 속도 상수가 ${T1} K 에서 $k_1=${fmt(k1)}$ 이다 (단위는 생략). 속도 상수가 $k_2=${fmt(k2)}$ 가 되는 온도는 몇 K 인가?</p>`,
      parts: [{ prompt: R`$T_2$`, type: "num", answer: T2Ans, unit: "K", tol: 0.01 }],
      solution: R`<p>$\dfrac1{T_2}=\dfrac1{T_1}-\dfrac{R\ln(k_2/k_1)}{E_a}=\dfrac1{${T1}}-\dfrac{8.314\,\ln(${fmt(k2 / k1)})}{${Ea * 1000}}$ ⇒ $T_2=${fmt(T2Ans, 4)}$ K</p>`
    });
  } });

  // 0차 반응 + Arrhenius (슬라이드 필기: Ex 13.9 옆에 t½ = [A]₀/2k)
  gens.push({ key: "k0a", label: "0차 반응 + Arrhenius: 온도를 바꾸면 반감기?", ch: 13, level: 3, make() {
    const Ea = rint(8, 22) * 5;
    const T1 = rint(56, 64) * 5;
    const T2 = T1 + rint(3, 9) * 5;
    const A0 = sig(rnd(0.2, 2.0), 2);
    const k1 = pw(rint(11, 98) / 10, -rint(2, 4));   // M/s
    const ratio = Math.exp(Ea * 1000 / RGAS * (1 / T1 - 1 / T2));
    const k2 = k1 * ratio;
    const half1 = A0 / (2 * k1), half2 = A0 / (2 * k2);
    return base("k0a", 13, "13.3·13.4 0차 + Arrhenius", {
      level: 3,
      stem: R`<p>0차 반응의 활성화 에너지는 ${Ea} kJ/mol 이다. ${T1} K 에서 $k=${fmt(k1)}\ \mathrm{M\,s^{-1}}$, 처음 농도는 $[\mathrm A]_0=${A0}$ M 이다.</p>`,
      parts: [
        { label: "(a)", prompt: `${T1} K 에서의 반감기`, type: "num", answer: half1, unit: "s", tol: 0.03 },
        { label: "(b)", prompt: `${T2} K 에서의 속도 상수`, type: "num", answer: k2, unit: "M s<sup>−1</sup>", tol: 0.03 },
        { label: "(c)", prompt: `${T2} K 에서의 반감기 (같은 처음 농도)`, type: "num", answer: half2, unit: "s", tol: 0.03 }
      ],
      solution: R`<p>(a) $t_{1/2}=\dfrac{[\mathrm A]_0}{2k}=\dfrac{${A0}}{2(${fmt(k1)})}=${fmt(half1)}$ s</p>
        <p>(b) $\ln\dfrac{k_2}{k_1}=\dfrac{E_a}{R}\left(\dfrac1{T_1}-\dfrac1{T_2}\right)=${fmt(Math.log(ratio))}$ ⇒ $k_2=${fmt(k2)}\ \mathrm{M\,s^{-1}}$</p>
        <p>(c) $t_{1/2}=\dfrac{[\mathrm A]_0}{2k_2}=${fmt(half2)}$ s — 온도가 올라 $k$ 가 ${fmt(ratio)}$ 배가 되니 반감기는 ${fmt(ratio)}$ 배 <b>짧아져요</b>.</p>`
    });
  } });

  /* ====================== 14 ====================== */
  const RXN_KP = [
    { eq: R`\ce{N2(g) + 3H2(g) <=> 2NH3(g)}`, dn: -2 },
    { eq: R`\ce{2SO2(g) + O2(g) <=> 2SO3(g)}`, dn: -1 },
    { eq: R`\ce{N2O4(g) <=> 2NO2(g)}`, dn: 1 },
    { eq: R`\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}`, dn: 1 },
    { eq: R`\ce{H2(g) + I2(g) <=> 2HI(g)}`, dn: 0 },
    { eq: R`\ce{CO(g) + 2H2(g) <=> CH3OH(g)}`, dn: -2 },
    { eq: R`\ce{2NO2(g) <=> 2NO(g) + O2(g)}`, dn: 1 }
  ];
  gens.push({ key: "e1", label: "Kc → Kp 변환", ch: 14, make() {
    const r = pick(RXN_KP);
    const Kc = pw(rint(11, 98) / 10, rint(-3, 3));
    const C = rint(20, 80) * 10;                      // 200–800 °C
    const T = C + 273;
    const Kp = Kc * Math.pow(0.0821 * T, r.dn);
    return base("e1", 14, "14.1 Kc · Kp", {
      stem: R`<p>$${r.eq}$ 의 $K_c=${fmt(Kc)}$ (${C} °C). 같은 온도에서 $K_P$ 를 구하시오.</p>`,
      parts: [
        { label: "(a)", prompt: R`$\Delta n$ (기체 생성물 몰수 − 기체 반응물 몰수)`, type: "num", answer: r.dn, unit: "", abs: 0.01 },
        { label: "(b)", prompt: R`$K_P$`, type: "num", answer: Kp, unit: "", tol: 0.03 }
      ],
      solution: R`<p>(a) $\Delta n=${r.dn}$. (b) $T=${C}+273=${T}$ K: $K_P=K_c(0.0821T)^{\Delta n}=${fmt(Kc)}\,(0.0821\times${T})^{${r.dn}}=${fmt(Kp)}$</p>`
    });
  } });

  const RXN_Q = [
    { eq: R`\ce{H2(g) + I2(g) <=> 2HI(g)}`, sp: [["H<sub>2</sub>", 1], ["I<sub>2</sub>", 1], ["HI", -2]],
      Q: c => c[2] * c[2] / (c[0] * c[1]), qtex: R`\dfrac{[\ce{HI}]^2}{[\ce{H2}][\ce{I2}]}` },
    { eq: R`\ce{N2O4(g) <=> 2NO2(g)}`, sp: [["N<sub>2</sub>O<sub>4</sub>", 1], ["NO<sub>2</sub>", -2]],
      Q: c => c[1] * c[1] / c[0], qtex: R`\dfrac{[\ce{NO2}]^2}{[\ce{N2O4}]}` },
    { eq: R`\ce{2NO(g) + O2(g) <=> 2NO2(g)}`, sp: [["NO", 1], ["O<sub>2</sub>", 1], ["NO<sub>2</sub>", -2]],
      Q: c => c[2] * c[2] / (c[0] * c[0] * c[1]), qtex: R`\dfrac{[\ce{NO2}]^2}{[\ce{NO}]^2[\ce{O2}]}` },
    { eq: R`\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}`, sp: [["PCl<sub>5</sub>", 1], ["PCl<sub>3</sub>", -1], ["Cl<sub>2</sub>", -1]],
      Q: c => c[1] * c[2] / c[0], qtex: R`\dfrac{[\ce{PCl3}][\ce{Cl2}]}{[\ce{PCl5}]}` }
  ];
  gens.push({ key: "e2", label: "Q 와 K 비교: 반응 방향", ch: 14, make() {
    const r = pick(RXN_Q);
    const V = pick([1.0, 2.0, 2.5, 5.0]);
    const mol = r.sp.map(() => sig(rnd(0.05, 1.5), 2));
    const conc = mol.map(m => m / V);
    const Q = r.Q(conc);
    const f = Math.random() < 0.5 ? rnd(0.15, 0.5) : rnd(2, 6);
    const K = sig(Q * f, 2);
    const forward = Q < K;
    const list = r.sp.map(([n], i) => `${n} ${mol[i]} mol`).join(", ");
    return base("e2", 14, "14.4 Q · ICE", {
      stem: R`<p>$${r.eq}$ 의 $K_c=${fmt(K)}$ 이다. ${V} L 용기에 ${list} 을 넣었다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$Q_c$`, type: "num", answer: Q, unit: "", tol: 0.03, hint: `mol 을 ${V} L 로 나눠 농도로 바꾼 뒤 대입` },
        { label: "(b)", prompt: "평형에 도달하기 위한 순반응의 방향은?", type: "mc", options: [RIGHT, LEFT, "이미 평형"], answer: forward ? 0 : 1 }
      ],
      solution: R`<p>농도: ${r.sp.map(([n], i) => `[${n}] = ${fmt(conc[i])} M`).join(", ")}</p>
        <p>$Q_c=${r.qtex}=${fmt(Q)}$ ${forward ? "$Q_c &lt; K_c$ ⇒ <b>정반응(오른쪽)</b>" : "$Q_c &gt; K_c$ ⇒ <b>역반응(왼쪽)</b>"}</p>`
    });
  } });

  gens.push({ key: "e3", label: "ICE 표로 평형 농도", ch: 14, level: 3, make() {
    if (Math.random() < 0.5) {
      const K = pick([0.25, 0.50, 2.0, 3.0, 4.0, 9.0, 12, 19, 24]);
      const A0 = sig(rnd(0.2, 2.0), 2);
      const x = K * A0 / (1 + K);
      return base("e3", 14, "14.4 Q · ICE", {
        level: 3,
        stem: R`<p>$\ce{A(g) <=> B(g)}$, $K_c=${K}$. 처음 $[\mathrm A]_0=${A0}$ M, $[\mathrm B]_0=0$ 이다.</p>`,
        parts: [
          { label: "(a)", prompt: R`평형 $[\mathrm B]$`, type: "num", answer: x, unit: "M", tol: 0.03 },
          { label: "(b)", prompt: R`평형 $[\mathrm A]$`, type: "num", answer: A0 - x, unit: "M", tol: 0.03 }
        ],
        solution: R`<p>ICE: A $${A0}-x$, B $x$. $${K}=\dfrac{x}{${A0}-x}$ ⇒ $x=\dfrac{${K}(${A0})}{1+${K}}=${fmt(x)}$ M.</p>
          <p>$[\mathrm B]=${fmt(x)}$ M, $[\mathrm A]=${A0}-${fmt(x)}=${fmt(A0 - x)}$ M.</p>`
      });
    }
    const K = pick([4, 9, 16, 25, 36, 49, 54.3, 64]);
    const c = sig(rnd(0.2, 1.0), 2);
    const s = Math.sqrt(K);
    const x = s * c / (2 + s);
    return base("e3", 14, "14.4 Q · ICE", {
      level: 3,
      stem: R`<p>$\ce{H2(g) + I2(g) <=> 2HI(g)}$, $K_c=${K}$. 처음 $[\ce{H2}]_0=[\ce{I2}]_0=${c}$ M, $[\ce{HI}]_0=0$ 이다.</p>`,
      parts: [
        { label: "(a)", prompt: R`평형 $[\ce{HI}]$`, type: "num", answer: 2 * x, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: R`평형 $[\ce{H2}]$`, type: "num", answer: c - x, unit: "M", tol: 0.03 }
      ],
      solution: R`<p>ICE: H<sub>2</sub>, I<sub>2</sub> : $${c}-x$, HI : $2x$. $K=\dfrac{(2x)^2}{(${c}-x)^2}$ — 완전제곱이라 제곱근: $\dfrac{2x}{${c}-x}=\sqrt{${K}}=${fmt(s)}$.</p>
        <p>$x=\dfrac{${fmt(s)}(${c})}{2+${fmt(s)}}=${fmt(x)}$ ⇒ $[\ce{HI}]=2x=${fmt(2 * x)}$ M, $[\ce{H2}]=${fmt(c - x)}$ M.</p>`
    });
  } });

  const LC = [
    { eq: R`\ce{N2(g) + 3H2(g) <=> 2NH3(g)}`, L: [["N<sub>2</sub>", 1], ["H<sub>2</sub>", 3]], Rr: [["NH<sub>3</sub>", 2]], dH: -92 },
    { eq: R`\ce{N2O4(g) <=> 2NO2(g)}`, L: [["N<sub>2</sub>O<sub>4</sub>", 1]], Rr: [["NO<sub>2</sub>", 2]], dH: 58 },
    { eq: R`\ce{2SO2(g) + O2(g) <=> 2SO3(g)}`, L: [["SO<sub>2</sub>", 2], ["O<sub>2</sub>", 1]], Rr: [["SO<sub>3</sub>", 2]], dH: -198 },
    { eq: R`\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}`, L: [["PCl<sub>5</sub>", 1]], Rr: [["PCl<sub>3</sub>", 1], ["Cl<sub>2</sub>", 1]], dH: 92.5 },
    { eq: R`\ce{CO(g) + 2H2(g) <=> CH3OH(g)}`, L: [["CO", 1], ["H<sub>2</sub>", 2]], Rr: [["CH<sub>3</sub>OH", 1]], dH: -91 },
    { eq: R`\ce{2NO2(g) <=> 2NO(g) + O2(g)}`, L: [["NO<sub>2</sub>", 2]], Rr: [["NO", 2], ["O<sub>2</sub>", 1]], dH: 114 },
    { eq: R`\ce{H2(g) + I2(g) <=> 2HI(g)}`, L: [["H<sub>2</sub>", 1], ["I<sub>2</sub>", 1]], Rr: [["HI", 2]], dH: -9.4 }
  ];
  gens.push({ key: "e5", label: "Le Châtelier 이동 방향", ch: 14, level: 1, make() {
    const r = pick(LC);
    const nL = r.L.reduce((s, x) => s + x[1], 0), nR = r.Rr.reduce((s, x) => s + x[1], 0);
    const stresses = [
      { t: () => { const s = pick(r.L); return { txt: `${s[0]} 를 더 넣는다`, shift: 0, why: `반응물 ${s[0]} 추가 → 오른쪽`, kchg: 2 }; } },
      { t: () => { const s = pick(r.Rr); return { txt: `${s[0]} 를 더 넣는다`, shift: 1, why: `생성물 ${s[0]} 추가 → 왼쪽`, kchg: 2 }; } },
      { t: () => { const s = pick(r.Rr); return { txt: `${s[0]} 를 일부 제거한다`, shift: 0, why: `생성물 ${s[0]} 제거 → 오른쪽`, kchg: 2 }; } },
      { t: () => { const s = pick(r.L); return { txt: `${s[0]} 를 일부 제거한다`, shift: 1, why: `반응물 ${s[0]} 제거 → 왼쪽`, kchg: 2 }; } },
      { t: () => ({ txt: "용기의 부피를 줄여 압력을 높인다 (온도 일정)",
          shift: nL === nR ? 2 : (nL < nR ? 1 : 0),
          why: nL === nR ? `기체 몰수가 양쪽 ${nL} 로 같음 → 이동 없음` : `기체 몰수 ${nL} (왼쪽) vs ${nR} (오른쪽): 압력↑ → 몰수가 적은 쪽(${nL < nR ? "왼쪽" : "오른쪽"})`, kchg: 2 }) },
      { t: () => ({ txt: "온도를 높인다", shift: r.dH > 0 ? 0 : 1,
          why: `ΔH = ${r.dH > 0 ? "+" : ""}${r.dH} kJ (${r.dH > 0 ? "흡열" : "발열"}) → 온도↑ 는 ${r.dH > 0 ? "오른쪽(K 증가)" : "왼쪽(K 감소)"}`, kchg: r.dH > 0 ? 0 : 1 }) },
      { t: () => ({ txt: "온도를 낮춘다", shift: r.dH > 0 ? 1 : 0,
          why: `ΔH = ${r.dH > 0 ? "+" : ""}${r.dH} kJ (${r.dH > 0 ? "흡열" : "발열"}) → 온도↓ 는 ${r.dH > 0 ? "왼쪽(K 감소)" : "오른쪽(K 증가)"}`, kchg: r.dH > 0 ? 1 : 0 }) }
    ];
    const s = pick(stresses).t();
    return base("e5", 14, "14.5 Le Châtelier", {
      level: 1,
      stem: R`<p>$${r.eq}$, $\Delta H=${r.dH > 0 ? "+" : ""}${r.dH}$ kJ/mol. 평형 상태에서 다음 조작을 했다: <b>${s.txt}</b>.</p>`,
      parts: [
        { label: "(a)", prompt: "평형은 어느 쪽으로 이동하는가?", type: "mc", options: [RIGHT, LEFT, NONE], answer: s.shift },
        { label: "(b)", prompt: R`$K_c$ 값의 변화는?`, type: "mc", options: ["증가", "감소", "변화 없음"], answer: s.kchg }
      ],
      solution: R`<p>${s.why}.</p><p>$K$ 를 바꾸는 것은 <b>온도</b>뿐입니다${s.kchg === 2 ? " — 이 조작은 온도를 바꾸지 않으므로 K 는 그대로." : "."}</p>`
    });
  } });

  /* ====================== 15 ====================== */
  gens.push({ key: "p1", label: "강산·강염기 pH", ch: 15, level: 1, make() {
    const kind = pick(["HCl", "HNO3", "HBr", "HClO4", "NaOH", "KOH", "Ba(OH)2"]);
    const C = pw(rint(11, 99) / 10, -rint(1, 4));
    let pH, why;
    if (kind === "Ba(OH)2") {
      const oh = 2 * C; pH = 14 + Math.log10(oh);
      why = R`<p>Ba(OH)<sub>2</sub> 는 OH<sup>−</sup> 2개: $[\mathrm{OH^-}]=2(${fmt(C)})=${fmt(oh)}$ M ⇒ $\mathrm{pOH}=${fmt(-Math.log10(oh), 3)}$ ⇒ $\mathrm{pH}=14.00-${fmt(-Math.log10(oh), 3)}=${fmt(pH, 4)}$</p>`;
    } else if (kind === "NaOH" || kind === "KOH") {
      pH = 14 + Math.log10(C);
      why = R`<p>강염기: $[\mathrm{OH^-}]=${fmt(C)}$ M ⇒ $\mathrm{pOH}=${fmt(-Math.log10(C), 3)}$ ⇒ $\mathrm{pH}=${fmt(pH, 4)}$</p>`;
    } else {
      pH = -Math.log10(C);
      why = R`<p>강산: $[\mathrm H^+]=${fmt(C)}$ M ⇒ $\mathrm{pH}=-\log(${fmt(C)})=${fmt(pH, 3)}$</p>`;
    }
    const f = kind === "Ba(OH)2" ? "Ba(OH)<sub>2</sub>" : kind.replace(/(\d)/g, "<sub>$1</sub>");
    return base("p1", 15, "15.4 산·염기 세기", {
      level: 1,
      stem: R`<p>${fmt(C)} M ${f} 수용액의 pH 는? (25 °C)</p>`,
      parts: [{ type: "num", answer: pH, unit: "", abs: 0.02 }],
      solution: why
    });
  } });

  const WEAK_A = [
    { n: "HF", Ka: 7.1e-4 }, { n: "HNO<sub>2</sub>", Ka: 4.5e-4 }, { n: "HCOOH", Ka: 1.7e-4 },
    { n: "CH<sub>3</sub>COOH", Ka: 1.8e-5 }, { n: "HCN", Ka: 4.9e-10 }, { n: "HClO", Ka: 3.0e-8 }
  ];
  const quad = (K, C) => (-K + Math.sqrt(K * K + 4 * K * C)) / 2;
  gens.push({ key: "p2", label: "약산 pH (5 % 규칙)", ch: 15, level: 3, make() {
    const a = pick(WEAK_A);
    const C = pick([1.0, 0.50, 0.20, 0.10, 0.050, 0.020, 0.010, 0.0050, 0.0010]);
    const xe = quad(a.Ka, C);
    const xa = Math.sqrt(a.Ka * C);
    const pct = xa / C * 100;
    const ok = pct < 5;
    return base("p2", 15, "15.5 약산 Ka", {
      level: 3,
      stem: R`<p>${a.n} 용액의 농도는 ${C} M 이다. ($K_a=${fmt(a.Ka, 2)}$, 25 °C)</p>`,
      parts: [
        { label: "(a)", prompt: R`$x=\sqrt{K_aC_0}$ 근사를 써도 되는가?`, type: "mc", options: ["된다 (5 % 미만)", "안 된다 (5 % 이상 → 이차방정식)"], answer: ok ? 0 : 1 },
        { label: "(b)", prompt: "pH", type: "num", answer: -Math.log10(xe), unit: "", abs: 0.03 }
      ],
      solution: R`<p>근사값 $x=\sqrt{(${fmt(a.Ka, 2)})(${C})}=${fmt(xa)}$ M, $\dfrac{x}{C_0}\times100=${fmt(pct, 3)}\%$ ⇒ ${ok ? "5 % 미만이라 근사 <b>OK</b>." : "5 % 이상이라 근사 <b>불가</b> → 이차방정식."}</p>
        <p>정확한 $x=\dfrac{-K_a+\sqrt{K_a^2+4K_aC_0}}{2}=${fmt(xe)}$ M ⇒ $\mathrm{pH}=-\log x=${fmt(-Math.log10(xe), 3)}$ ${ok ? "(근사로 풀어도 거의 같은 값)" : ""}</p>`
    });
  } });

  gens.push({ key: "p3", label: "pH 로부터 Ka 구하기", ch: 15, level: 2, make() {
    const a = pick(["HA", "HX", "HY"]);
    const C = pick([0.10, 0.20, 0.050, 0.50, 0.15]);
    const pH = sig(rnd(2.3, 3.8), 3);
    const h = Math.pow(10, -pH);
    const Ka = h * h / (C - h);
    return base("p3", 15, "15.5 약산 Ka", {
      stem: R`<p>${C} M 의 일양성자 약산 ${a} 용액의 pH 가 ${pH} 이다. $K_a$ 는?</p>`,
      parts: [{ type: "num", answer: Ka, unit: "", tol: 0.05 }],
      solution: R`<p>$[\mathrm H^+]=[\mathrm A^-]=10^{-${pH}}=${fmt(h)}$ M, $[\mathrm{HA}]=${C}-${fmt(h)}=${fmt(C - h)}$ M.</p>
        <p>$K_a=\dfrac{[\mathrm H^+][\mathrm A^-]}{[\mathrm{HA}]}=\dfrac{(${fmt(h)})^2}{${fmt(C - h)}}=${fmt(Ka)}$</p>`
    });
  } });

  const WEAK_B = [
    { n: "NH<sub>3</sub>", Kb: 1.8e-5 }, { n: "CH<sub>3</sub>NH<sub>2</sub>", Kb: 4.4e-4 },
    { n: "C<sub>6</sub>H<sub>5</sub>NH<sub>2</sub> (aniline)", Kb: 3.8e-10 }, { n: "C<sub>5</sub>H<sub>5</sub>N (pyridine)", Kb: 1.7e-9 }
  ];
  gens.push({ key: "p4", label: "약염기 pH", ch: 15, level: 3, make() {
    const b = pick(WEAK_B);
    const C = pick([1.0, 0.50, 0.30, 0.20, 0.10, 0.050, 0.020, 0.010]);
    const xe = quad(b.Kb, C);
    const pH = 14 + Math.log10(xe);
    return base("p4", 15, "15.6 약염기 Kb", {
      level: 3,
      stem: R`<p>${b.n} 용액의 농도는 ${C} M 이다. ($K_b=${fmt(b.Kb, 2)}$, 25 °C) 이 용액의 pH 는?</p>`,
      parts: [{ type: "num", answer: pH, unit: "", abs: 0.03, hint: "x = [OH⁻] → pOH → pH = 14 − pOH" }],
      solution: R`<p>$K_b=\dfrac{x^2}{C_0-x}$ ⇒ $x=[\mathrm{OH^-}]=${fmt(xe)}$ M ($x/C_0=${fmt(xe / C * 100, 3)}\%$).</p>
        <p>$\mathrm{pOH}=-\log x=${fmt(-Math.log10(xe), 3)}$ ⇒ $\mathrm{pH}=14.00-${fmt(-Math.log10(xe), 3)}=${fmt(pH, 4)}$</p>`
    });
  } });

  gens.push({ key: "p5", label: "Ka ↔ Kb 변환", ch: 15, level: 1, make() {
    const fromAcid = Math.random() < 0.5;
    const K = pw(rint(11, 98) / 10, -rint(3, 11));
    const ans = 1e-14 / K;
    const lhs = fromAcid ? "K_b" : "K_a", rhs = fromAcid ? "K_a" : "K_b";
    return base("p5", 15, "15.7 KaKb=Kw", {
      level: 1,
      stem: fromAcid
        ? R`<p>약산 HA 의 $K_a=${fmt(K)}$ 이다. 그 짝염기 $\mathrm A^-$ 의 $K_b$ 는? (25 °C)</p>`
        : R`<p>약염기 B 의 $K_b=${fmt(K)}$ 이다. 그 짝산 $\mathrm{BH^+}$ 의 $K_a$ 는? (25 °C)</p>`,
      parts: [{ type: "num", answer: ans, unit: "", tol: 0.03 }],
      solution: R`<p>$K_aK_b=K_w=1.0\times10^{-14}$ ⇒ $${lhs}=\dfrac{K_w}{${rhs}}=\dfrac{1.0\times10^{-14}}{${fmt(K)}}=${fmt(ans)}$</p>`
    });
  } });

  gens.push({ key: "p6", label: "pH · pOH · [H⁺] · [OH⁻]", ch: 15, level: 1, make() {
    const pH = sig(rnd(0.8, 13.2), 3);
    const h = Math.pow(10, -pH);
    const oh = 1e-14 / h;
    return base("p6", 15, "15.3 pH", {
      level: 1,
      stem: R`<p>어떤 용액의 pH 가 ${pH} 이다 (25 °C).</p>`,
      parts: [
        { label: "(a)", prompt: "pOH", type: "num", answer: 14 - pH, unit: "", abs: 0.02 },
        { label: "(b)", prompt: R`$[\mathrm H^+]$`, type: "num", answer: h, unit: "M", tol: 0.03 },
        { label: "(c)", prompt: R`$[\mathrm{OH^-}]$`, type: "num", answer: oh, unit: "M", tol: 0.03 }
      ],
      solution: R`<p>(a) $\mathrm{pOH}=14.00-${pH}=${fmt(14 - pH, 3)}$ &nbsp; (b) $[\mathrm H^+]=10^{-${pH}}=${fmt(h)}$ M &nbsp; (c) $[\mathrm{OH^-}]=10^{-${fmt(14 - pH, 3)}}=${fmt(oh)}$ M</p>
        <p>(${pH < 7 ? "산성" : pH > 7 ? "염기성" : "중성"} 용액)</p>`
    });
  } });

  root.GENERATORS = gens;
  root.GEN_UTILS = { sig, fmt, sci };
})(typeof window !== "undefined" ? window : globalThis);
