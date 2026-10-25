/*
 * 문제 데이터
 *  src : 'book' (교재 유형) | 'hw' (슬라이드에 Homework 표시) | 'ap' (AP 스타일) | 'concept' (개념 확인)
 *  parts[].type : 'mc' (options + answer 인덱스) | 'num' (answer 숫자, tol 상대오차 / abs 절대오차) | 'self' (자가 채점)
 *  문장은 새로 썼고 수치·정답은 직접 계산해 검증함.
 */
(function () {
  const R = String.raw;
  const T = (head, rows) =>
    `<div class="tbl-wrap"><table class="tbl"><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const RIGHT = "오른쪽(정반응) — 생성물 쪽으로";
  const LEFT = "왼쪽(역반응) — 반응물 쪽으로";
  const NONE = "이동 없음";

  window.PROBLEMS = [
    /* ===================== 13 Chemical Kinetics ===================== */
    { id: "p13-01", ch: 13, topic: "13.1 반응 속도", src: "book", srcLabel: "교재 Ex 13.1 유형", level: 1,
      stem: R`<p>$\ce{4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)}$ 의 반응 속도를 반응물 소멸·생성물 생성으로 올바르게 나타낸 것은?</p>`,
      parts: [{ type: "mc", options: [
        R`$\text{rate}=-\dfrac{\Delta[\ce{NH3}]}{\Delta t}=-\dfrac{\Delta[\ce{O2}]}{\Delta t}=\dfrac{\Delta[\ce{NO}]}{\Delta t}=\dfrac{\Delta[\ce{H2O}]}{\Delta t}$`,
        R`$\text{rate}=-\dfrac14\dfrac{\Delta[\ce{NH3}]}{\Delta t}=-\dfrac15\dfrac{\Delta[\ce{O2}]}{\Delta t}=\dfrac14\dfrac{\Delta[\ce{NO}]}{\Delta t}=\dfrac16\dfrac{\Delta[\ce{H2O}]}{\Delta t}$`,
        R`$\text{rate}=-4\dfrac{\Delta[\ce{NH3}]}{\Delta t}=-5\dfrac{\Delta[\ce{O2}]}{\Delta t}=4\dfrac{\Delta[\ce{NO}]}{\Delta t}=6\dfrac{\Delta[\ce{H2O}]}{\Delta t}$`,
        R`$\text{rate}=\dfrac{\Delta[\ce{NH3}]}{\Delta t}=\dfrac{\Delta[\ce{O2}]}{\Delta t}=\dfrac{\Delta[\ce{NO}]}{\Delta t}=\dfrac{\Delta[\ce{H2O}]}{\Delta t}$`
      ], answer: 1 }],
      solution: R`<p>각 물질의 농도 변화율을 <b>자기 계수로 나눠야</b> 하나의 반응 속도가 됩니다. 반응물에는 −를 붙이고, 계수는 곱하는 게 아니라 <b>나눕니다</b>.</p>` },

    { id: "p13-02", ch: 13, topic: "13.1 반응 속도", src: "book", srcLabel: "교재 Ex 13.2 유형", level: 1,
      stem: R`<p>$\ce{4NO2(g) + O2(g) -> 2N2O5(g)}$ 에서 어느 순간 O<sub>2</sub> 가 0.024 M/s 로 소모되고 있다.</p>`,
      parts: [
        { label: "(a)", prompt: "N<sub>2</sub>O<sub>5</sub> 가 생성되는 속도", type: "num", answer: 0.048, unit: "M/s", tol: 0.02 },
        { label: "(b)", prompt: "NO<sub>2</sub> 가 소모되는 속도", type: "num", answer: 0.096, unit: "M/s", tol: 0.02 }
      ],
      solution: R`<p>$\text{rate}=-\dfrac{\Delta[\ce{O2}]}{\Delta t}=\dfrac12\dfrac{\Delta[\ce{N2O5}]}{\Delta t}=-\dfrac14\dfrac{\Delta[\ce{NO2}]}{\Delta t}=0.024$ M/s</p>
        <p>(a) $\Delta[\ce{N2O5}]/\Delta t=2(0.024)=0.048$ M/s &nbsp;&nbsp; (b) $-\Delta[\ce{NO2}]/\Delta t=4(0.024)=0.096$ M/s</p>` },

    { id: "p13-03", ch: 13, topic: "13.2 속도 법칙", src: "book", srcLabel: "교재 Table 13.2 유형", level: 1,
      stem: R`<p>$\ce{F2(g) + 2ClO2(g) -> 2FClO2(g)}$ 의 초기 속도 데이터는 다음과 같다.</p>` +
        T(["Exp", "[F<sub>2</sub>] (M)", "[ClO<sub>2</sub>] (M)", "Initial rate (M/s)"], [["1", "0.10", "0.010", R`$1.2\times10^{-3}$`], ["2", "0.10", "0.040", R`$4.8\times10^{-3}$`], ["3", "0.20", "0.010", R`$2.4\times10^{-3}$`]]),
      parts: [
        { label: "(a)", prompt: "속도 법칙은?", type: "mc", options: [R`rate $=k[\ce{F2}]$`, R`rate $=k[\ce{ClO2}]$`, R`rate $=k[\ce{F2}][\ce{ClO2}]$`, R`rate $=k[\ce{F2}][\ce{ClO2}]^2$`], answer: 2 },
        { label: "(b)", prompt: "속도 상수 k", type: "num", answer: 1.2, unit: "M<sup>−1</sup>s<sup>−1</sup>", tol: 0.03 }
      ],
      solution: R`<p>Exp 1→2: [ClO<sub>2</sub>] ×4 → 속도 ×4 ⇒ 1차. Exp 1→3: [F<sub>2</sub>] ×2 → 속도 ×2 ⇒ 1차. 계수 2 와 상관없이 ClO<sub>2</sub> 는 1차!</p>
        <p>$k=\dfrac{1.2\times10^{-3}}{(0.10)(0.010)}=1.2\ \mathrm{M^{-1}s^{-1}}$</p>` },

    { id: "p13-04", ch: 13, topic: "13.2 속도 법칙", src: "book", srcLabel: "교재 Ex 13.3 유형", level: 2,
      stem: R`<p>$\ce{2NO(g) + 2H2(g) -> N2(g) + 2H2O(g)}$ (1280 °C) 의 초기 속도 데이터:</p>` +
        T(["Exp", "[NO] (M)", "[H<sub>2</sub>] (M)", "Initial rate (M/s)"], [["1", R`$5.0\times10^{-3}$`, R`$2.0\times10^{-3}$`, R`$1.3\times10^{-5}$`], ["2", R`$1.0\times10^{-2}$`, R`$2.0\times10^{-3}$`, R`$5.0\times10^{-5}$`], ["3", R`$1.0\times10^{-2}$`, R`$4.0\times10^{-3}$`, R`$1.0\times10^{-4}$`]]),
      parts: [
        { label: "(a)", prompt: "속도 법칙은?", type: "mc", options: [R`rate $=k[\ce{NO}][\ce{H2}]$`, R`rate $=k[\ce{NO}]^2[\ce{H2}]$`, R`rate $=k[\ce{NO}][\ce{H2}]^2$`, R`rate $=k[\ce{NO}]^2[\ce{H2}]^2$`], answer: 1 },
        { label: "(b)", prompt: "속도 상수 k", type: "num", answer: 250, unit: "M<sup>−2</sup>s<sup>−1</sup>", tol: 0.05 },
        { label: "(c)", prompt: R`$[\ce{NO}]=1.20\times10^{-2}$ M, $[\ce{H2}]=6.0\times10^{-3}$ M 일 때의 속도`, type: "num", answer: 2.16e-4, unit: "M/s", tol: 0.05 }
      ],
      solution: R`<p>Exp 1→2: [NO] ×2 ⇒ 속도 $\approx$ ×4 ⇒ 2차. Exp 2→3: [H<sub>2</sub>] ×2 ⇒ 속도 ×2 ⇒ 1차.</p>
        <p>$k=\dfrac{5.0\times10^{-5}}{(1.0\times10^{-2})^2(2.0\times10^{-3})}=2.5\times10^{2}$ &nbsp; (Exp 1 로 계산하면 $2.6\times10^2$ — 유효숫자 차이)</p>
        <p>$\text{rate}=(2.5\times10^2)(1.20\times10^{-2})^2(6.0\times10^{-3})=2.2\times10^{-4}$ M/s</p>` },

    { id: "p13-05", ch: 13, topic: "13.2 속도 법칙", src: "book", srcLabel: "교재 13.13 유형", level: 1,
      stem: R`<p>$\ce{NH4+(aq) + NO2-(aq) -> N2(g) + 2H2O(l)}$ 의 속도 법칙은 rate $=k[\ce{NH4+}][\ce{NO2-}]$, 25 °C 에서 $k=3.0\times10^{-4}\ \mathrm{M^{-1}s^{-1}}$. $[\ce{NH4+}]=0.26$ M, $[\ce{NO2-}]=0.080$ M 일 때 반응 속도는?</p>`,
      parts: [{ type: "num", answer: 6.24e-6, unit: "M/s", tol: 0.03 }],
      solution: R`<p>$\text{rate}=(3.0\times10^{-4})(0.26)(0.080)=6.2\times10^{-6}\ \mathrm{M/s}$</p>` },

    { id: "p13-06", ch: 13, topic: "13.2 속도 법칙", src: "book", srcLabel: "교재 13.16 유형", level: 2,
      stem: R`<p>360 K 에서 $\ce{X + Y -> Z}$ 의 데이터가 다음과 같다. (속도 = X 의 초기 소멸 속도)</p>` +
        T(["Exp", "Rate (M/s)", "[X] (M)", "[Y] (M)"], [["1", "0.053", "0.10", "0.50"], ["2", "0.127", "0.20", "0.30"], ["3", "1.02", "0.40", "0.60"], ["4", "0.254", "0.20", "0.60"], ["5", "0.509", "0.40", "0.30"]]),
      parts: [
        { label: "(a)", prompt: "속도 법칙은?", type: "mc", options: [R`rate $=k[\mathrm X][\mathrm Y]$`, R`rate $=k[\mathrm X]^2[\mathrm Y]$`, R`rate $=k[\mathrm X][\mathrm Y]^2$`, R`rate $=k[\mathrm X]^2[\mathrm Y]^2$`], answer: 1 },
        { label: "(b)", prompt: "[X] = 0.30 M, [Y] = 0.40 M 일 때 X 의 초기 소멸 속도", type: "num", answer: 0.381, unit: "M/s", tol: 0.03 }
      ],
      solution: R`<p>Exp 2→4 ([X]=0.20 고정): [Y] ×2 ⇒ 속도 0.127→0.254 (×2) ⇒ Y 1차.<br>Exp 2→5 ([Y]=0.30 고정): [X] ×2 ⇒ 0.127→0.509 (×4) ⇒ X 2차.</p>
        <p>$k=\dfrac{0.127}{(0.20)^2(0.30)}=10.6\ \mathrm{M^{-2}s^{-1}}$ → rate $=k[\mathrm X]^2[\mathrm Y]$ (3차). 검산: Exp 1 → $10.6(0.10)^2(0.50)=0.053$ ✓</p>
        <p>(b) $\text{rate}=10.6\,(0.30)^2(0.40)=0.38\ \mathrm{M/s}$</p>` },

    { id: "p13-07", ch: 13, topic: "13.2 속도 법칙", src: "ap", srcLabel: "AP 스타일 MC", level: 1,
      stem: R`<p>$\ce{A + B -> C + D}$, rate $=k[\mathrm A][\mathrm B]^2$ 일 때 속도 상수 $k$ 의 단위로 가능한 것은?</p>`,
      parts: [{ type: "mc", options: [R`$\mathrm{s^{-1}}$`, R`$\mathrm{s^{-1}M^{-1}}$`, R`$\mathrm{s^{-1}M^{-2}}$`, R`$\mathrm{s^{-1}M^{-3}}$`], answer: 2 }],
      solution: R`<p>$k=\dfrac{\text{rate}}{[\mathrm A][\mathrm B]^2}=\dfrac{\mathrm{M\,s^{-1}}}{\mathrm{M^3}}=\mathrm{M^{-2}s^{-1}}$ (전체 3차). 일반식 $\mathrm{M^{1-n}s^{-1}}$ 에 $n=3$.</p>` },

    { id: "p13-08", ch: 13, topic: "13.2 속도 법칙", src: "ap", srcLabel: "AP 스타일 MC", level: 1,
      stem: R`<p>$\ce{A + B -> C}$ 의 초기 속도 데이터로 알맞은 속도 법칙은?</p>` +
        T(["Exp", "[A] (M)", "[B] (M)", "Rate of formation of C (M/s)"], [["1", "0.20", "0.10", R`$3\times10^{-2}$`], ["2", "0.20", "0.20", R`$6\times10^{-2}$`], ["3", "0.40", "0.20", R`$6\times10^{-2}$`]]),
      parts: [{ type: "mc", options: [R`rate $=k[\mathrm A]$`, R`rate $=k[\mathrm A]^2$`, R`rate $=k[\mathrm B]$`, R`rate $=k[\mathrm A][\mathrm B]$`], answer: 2 }],
      solution: R`<p>Exp 1→2: [B] ×2, 속도 ×2 ⇒ B 1차. Exp 2→3: [A] ×2 인데 속도 <b>변화 없음</b> ⇒ A 0차 → rate $=k[\mathrm B]$.</p>` },

    { id: "p13-09", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "ap", srcLabel: "AP 스타일 MC", level: 1,
      stem: R`<p>$\ce{A -> B + C}$, rate $=k[\mathrm A]^2$. 이 반응에서 얻은 데이터로 그릴 수 있는 그래프는?</p>`,
      parts: [{ type: "mc", options: [R`$[\mathrm A]$ vs $t$ : 수평선`, R`$[\mathrm A]$ vs $t$ : 우하향 직선`, R`$\ln[\mathrm A]$ vs $t$ : 우하향 직선`, R`$1/[\mathrm A]$ vs $t$ : 우상향 직선`], answer: 3 }],
      solution: R`<p>2차: $\dfrac1{[\mathrm A]_t}=kt+\dfrac1{[\mathrm A]_0}$ ⇒ $1/[\mathrm A]$ 대 $t$ 는 <b>기울기 $+k$ 인 우상향 직선</b>. ($[\mathrm A]$ vs $t$ 직선은 0차, $\ln[\mathrm A]$ vs $t$ 직선은 1차.)</p>` },

    { id: "p13-10", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "hw", srcLabel: "교재 Ex 13.4 (HW)", level: 2,
      stem: R`<p>기상 시클로프로판 → 프로펜은 1차 반응이며 500 °C 에서 $k=6.7\times10^{-4}\ \mathrm{s^{-1}}$ 이다.</p>`,
      parts: [
        { label: "(a)", prompt: "처음 0.25 M 일 때 8.8 min 후의 농도", type: "num", answer: 0.1755, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: "0.25 M → 0.15 M 이 되는 데 걸리는 시간", type: "num", answer: 12.7, unit: "min", tol: 0.03 },
        { label: "(c)", prompt: "74 % 가 전환되는 데 걸리는 시간", type: "num", answer: 33.5, unit: "min", tol: 0.03 }
      ],
      solution: R`<p>(a) $t=528$ s, $[\mathrm A]=0.25\,e^{-(6.7\times10^{-4})(528)}=0.25\,e^{-0.354}=0.18$ M</p>
        <p>(b) $t=\dfrac1k\ln\dfrac{0.25}{0.15}=\dfrac{0.511}{6.7\times10^{-4}}=763\ \mathrm s=12.7$ min</p>
        <p>(c) 남은 비율 0.26: $t=\dfrac1k\ln\dfrac1{0.26}=\dfrac{1.347}{6.7\times10^{-4}}=2.0\times10^3\ \mathrm s=33.5$ min</p>` },

    { id: "p13-11", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "book", srcLabel: "교재 Ex 13.6 유형", level: 1,
      stem: R`<p>$\ce{C2H6(g) -> 2CH3(g)}$ 는 700 °C 에서 1차이고 $k=5.36\times10^{-4}\ \mathrm{s^{-1}}$ 이다. 반감기를 분(min)으로 구하시오.</p>`,
      parts: [{ type: "num", answer: 21.55, unit: "min", tol: 0.02 }],
      solution: R`<p>$t_{1/2}=\dfrac{0.693}{k}=\dfrac{0.693}{5.36\times10^{-4}}=1.29\times10^3\ \mathrm s=21.6$ min</p>` },

    { id: "p13-12", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "hw", srcLabel: "교재 Ex 13.7 (HW)", level: 2,
      stem: R`<p>$\ce{I(g) + I(g) -> I2(g)}$ 는 2차이며 23 °C 에서 $k=7.0\times10^{9}\ \mathrm{M^{-1}s^{-1}}$ 이다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$[\mathrm I]_0=0.086$ M 일 때 2.0 min 후의 농도`, type: "num", answer: 1.19e-12, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: R`$[\mathrm I]_0=0.60$ M 일 때의 반감기`, type: "num", answer: 2.38e-10, unit: "s", tol: 0.03 },
        { label: "(c)", prompt: R`$[\mathrm I]_0=0.42$ M 일 때의 반감기`, type: "num", answer: 3.40e-10, unit: "s", tol: 0.03 }
      ],
      solution: R`<p>(a) $\dfrac1{[\mathrm I]_t}=kt+\dfrac1{[\mathrm I]_0}=(7.0\times10^9)(120)+11.6\approx8.4\times10^{11}$ ⇒ $[\mathrm I]_t=1.2\times10^{-12}$ M</p>
        <p>(b)(c) $t_{1/2}=\dfrac1{k[\mathrm I]_0}$: 0.60 M → $2.4\times10^{-10}$ s, 0.42 M → $3.4\times10^{-10}$ s. 농도가 낮을수록 반감기가 <b>길다</b>(2차의 특징).</p>` },

    { id: "p13-13", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "book", srcLabel: "교재 13.28 유형", level: 2,
      stem: R`<p>2차 반응 $\ce{2NO2(g) -> 2NO(g) + O2(g)}$ 의 속도 상수가 300 °C 에서 $0.54\ \mathrm{M^{-1}s^{-1}}$ 이다. [NO<sub>2</sub>] 가 0.62 M → 0.28 M 로 줄어드는 데 몇 초 걸리는가?</p>`,
      parts: [{ type: "num", answer: 3.627, unit: "s", tol: 0.03 }],
      solution: R`<p>$\dfrac1{[\mathrm A]_t}-\dfrac1{[\mathrm A]_0}=kt\ \Rightarrow\ t=\dfrac{1/0.28-1/0.62}{0.54}=\dfrac{3.571-1.613}{0.54}=3.6\ \mathrm s$</p>` },

    { id: "p13-14", ch: 13, topic: "13.4 활성화 에너지", src: "hw", srcLabel: "교재 Ex 13.9 (HW)", level: 2,
      stem: R`<p>어떤 반응의 속도 상수가 298 K 에서 $3.46\times10^{-2}\ \mathrm{s^{-1}}$ 이다. 활성화 에너지가 50.2 kJ/mol 일 때 350 K 에서의 속도 상수는?</p>`,
      parts: [{ type: "num", answer: 0.702, unit: "s<sup>−1</sup>", tol: 0.03 }],
      solution: R`<p>$\ln\dfrac{k_2}{k_1}=\dfrac{E_a}{R}\left(\dfrac1{T_1}-\dfrac1{T_2}\right)=\dfrac{50200}{8.314}\left(\dfrac1{298}-\dfrac1{350}\right)=3.01$</p>
        <p>$k_2=(3.46\times10^{-2})e^{3.01}=0.70\ \mathrm{s^{-1}}$</p>` },

    { id: "p13-15", ch: 13, topic: "13.4 활성화 에너지", src: "book", srcLabel: "교재 13.40 유형", level: 3,
      stem: R`<p>$\ce{2N2O5(g) -> 2N2O4(g) + O2(g)}$ 의 온도별 속도 상수이다. $\ln k$ 대 $1/T$ 그래프로 활성화 에너지를 구하시오.</p>` +
        T(["T (K)", "298", "308", "318", "328", "338"], [["k (s<sup>−1</sup>)", R`$1.74\times10^{-5}$`, R`$6.61\times10^{-5}$`, R`$2.51\times10^{-4}$`, R`$7.59\times10^{-4}$`, R`$2.40\times10^{-3}$`]]),
      parts: [{ prompt: "활성화 에너지 $E_a$", type: "num", answer: 103, unit: "kJ/mol", tol: 0.06, hint: "양 끝점만 써도 됩니다: ln(k₃₃₈/k₂₉₈) = (Ea/R)(1/298 − 1/338)" }],
      solution: R`<p>5개 점을 $(1/T,\ \ln k)$ 로 바꿔 직선 회귀하면 기울기 $\approx-1.24\times10^{4}$ K.</p>
        <p>$E_a=-\text{slope}\times R=(1.24\times10^4)(8.314)=1.03\times10^5$ J/mol $\approx$ <b>103 kJ/mol</b></p>
        <p class="muted">두 점 검산: $\ln\dfrac{2.40\times10^{-3}}{1.74\times10^{-5}}=4.93$, $\dfrac1{298}-\dfrac1{338}=3.97\times10^{-4}$ ⇒ $E_a=\dfrac{4.93}{3.97\times10^{-4}}(8.314)=1.03\times10^5$ J/mol ✓</p>` },

    { id: "p13-16", ch: 13, topic: "13.5 메커니즘", src: "hw", srcLabel: "교재 Ex 13.10 (HW)", level: 2,
      stem: R`<p>$\ce{N2O}$ 의 기상 분해는 두 단계로 일어난다고 한다.</p>
        <p>Step 1: $\ce{N2O -> N2 + O}$ &nbsp; Step 2: $\ce{N2O + O -> N2 + O2}$ &nbsp; 실험 속도 법칙: rate $=k[\ce{N2O}]$</p>`,
      parts: [
        { label: "(a)", prompt: "전체 반응식은?", type: "mc", options: [R`$\ce{N2O -> N2 + O}$`, R`$\ce{2N2O -> 2N2 + O2}$`, R`$\ce{N2O + O -> N2 + O2}$`, R`$\ce{N2O -> N2 + O2}$`], answer: 1 },
        { label: "(b)", prompt: "중간체는?", type: "mc", options: [R`$\ce{N2}$`, R`$\ce{O2}$`, R`$\ce{O}$`, R`$\ce{N2O}$`], answer: 2 },
        { label: "(c)", prompt: "단계 1, 2 의 상대 속도는?", type: "mc", options: ["Step 1 이 느린 속도 결정 단계, Step 2 는 훨씬 빠름", "Step 2 가 느린 속도 결정 단계, Step 1 은 훨씬 빠름", "두 단계 속도가 같다", "알 수 없다"], answer: 0 }
      ],
      solution: R`<p>(a) 두 단계를 더하면 $\ce{2N2O + O -> 2N2 + O + O2}$, O 소거 ⇒ $\ce{2N2O -> 2N2 + O2}$.</p>
        <p>(b) Step 1 에서 생겨 Step 2 에서 소모되는 O.</p>
        <p>(c) 실험 속도식 $k[\ce{N2O}]$ 는 Step 1 만의 속도식 → Step 1 = rds(느림), Step 2 = fast.</p>` },

    { id: "p13-17", ch: 13, topic: "13.5 메커니즘", src: "book", srcLabel: "교재 13.58 유형", level: 3,
      stem: R`<p>$\ce{2H2(g) + 2NO(g) -> N2(g) + 2H2O(g)}$ 의 실험 속도 법칙은 rate $=k[\ce{H2}][\ce{NO}]^2$ 이다. 다음 메커니즘 중 이 속도 법칙에 의해 <b>배제되는</b> 것은?</p>` +
        T(["메커니즘", "단계"], [
          ["I", R`$\ce{H2 + NO -> H2O + N}$ (slow); $\ce{N + NO -> N2 + O}$ (fast); $\ce{O + H2 -> H2O}$ (fast)`],
          ["II", R`$\ce{H2 + 2NO -> N2O + H2O}$ (slow); $\ce{N2O + H2 -> N2 + H2O}$ (fast)`],
          ["III", R`$\ce{2NO <=> N2O2}$ (fast equilibrium); $\ce{N2O2 + H2 -> N2O + H2O}$ (slow); $\ce{N2O + H2 -> N2 + H2O}$ (fast)`]
        ]),
      parts: [{ type: "mc", options: ["메커니즘 I 만", "메커니즘 II 만", "메커니즘 III 만", "메커니즘 I 과 II"], answer: 0 }],
      solution: R`<p><b>I</b>: rds 가 $\ce{H2 + NO}$ → rate $=k[\ce{H2}][\ce{NO}]$ ✗ (NO 가 2차가 아님) → 배제.</p>
        <p><b>II</b>: rds $\ce{H2 + 2NO}$ → rate $=k[\ce{H2}][\ce{NO}]^2$ ✓ (3분자 단계라 현실성은 낮지만 속도식과는 일치).</p>
        <p><b>III</b>: rds 의 rate $=k_2[\ce{N2O2}][\ce{H2}]$, 빠른 평형 $[\ce{N2O2}]=K[\ce{NO}]^2$ ⇒ rate $=k_2K[\ce{H2}][\ce{NO}]^2$ ✓.</p>` },

    { id: "p13-18", ch: 13, topic: "13.2–13.5 종합", src: "ap", srcLabel: "AP FRQ 스타일", level: 3,
      stem: R`<p>$\ce{2NO(g) + Br2(g) -> 2NOBr(g)}$ 에 대해 NOBr 생성 초기 속도를 측정했다.</p>` +
        T(["Exp", "[NO] (mol/L)", "[Br<sub>2</sub>] (mol/L)", "Initial rate of NOBr formation (M/s)"], [["1", "0.02", "0.02", R`$9.6\times10^{-2}$`], ["2", "0.04", "0.02", R`$3.8\times10^{-1}$`], ["3", "0.02", "0.04", R`$1.9\times10^{-1}$`]]),
      parts: [
        { label: "(a)", prompt: "속도 법칙은?", type: "mc", options: [R`rate $=k[\ce{NO}][\ce{Br2}]$`, R`rate $=k[\ce{NO}]^2[\ce{Br2}]$`, R`rate $=k[\ce{NO}][\ce{Br2}]^2$`, R`rate $=k[\ce{NO}]^2$`], answer: 1 },
        { label: "(b)", prompt: "속도 상수 k (Exp 1 사용)", type: "num", answer: 1.2e4, unit: "M<sup>−2</sup>s<sup>−1</sup>", tol: 0.04 },
        { label: "(c)", prompt: "Exp 2 에서 처음 Br<sub>2</sub> 의 절반이 소모되었을 때 남은 [NO]", type: "num", answer: 0.02, unit: "M", tol: 0.03 },
        { label: "(d)", prompt: "(a) 의 속도 법칙과 일치하는 메커니즘은?", type: "mc", options: [
          R`I: $\ce{NO + NO <=> N2O2}$ (fast); $\ce{N2O2 + Br2 -> 2NOBr}$ (slow)`,
          R`II: $\ce{Br2 -> Br + Br}$ (slow); $\ce{2(NO + Br -> NOBr)}$ (fast)`,
          "둘 다 일치", "둘 다 불일치"], answer: 0 }
      ],
      solution: R`<p>(a) Exp 1→2: [NO] ×2 ⇒ 속도 ×3.96 ≈ 4 ⇒ 2차. Exp 1→3: [Br<sub>2</sub>] ×2 ⇒ 속도 ×1.98 ≈ 2 ⇒ 1차. rate $=k[\ce{NO}]^2[\ce{Br2}]$.</p>
        <p>(b) $k=\dfrac{9.6\times10^{-2}}{(0.02)^2(0.02)}=1.2\times10^{4}\ \mathrm{M^{-2}s^{-1}}$</p>
        <p>(c) Br<sub>2</sub> 0.02 → 0.01 (0.01 M 소모). 계수비 NO : Br<sub>2</sub> = 2 : 1 ⇒ NO 0.02 M 소모 ⇒ $0.04-0.02=0.02$ M.</p>
        <p>(d) <b>I</b>: rds 의 rate $=k_2[\ce{N2O2}][\ce{Br2}]$, 평형 $[\ce{N2O2}]=K[\ce{NO}]^2$ ⇒ $k[\ce{NO}]^2[\ce{Br2}]$ ✓. <b>II</b>: rate $=k[\ce{Br2}]$ ✗ (NO 가 안 나옴).</p>` },

    { id: "p13-19", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "ap", srcLabel: "AP FRQ 스타일", level: 3,
      stem: R`<p>$\ce{2N2O5(g) -> 4NO2(g) + O2(g)}$ 는 40 °C 에서 1차 반응이며 다음 데이터를 얻었다.</p>` +
        T(["[N<sub>2</sub>O<sub>5</sub>] (M)", "0.400", "0.289", "0.209", "0.151", "0.109"], [["Time (min)", "0.0", "20.0", "40.0", "60.0", "80.0"]]),
      parts: [
        { label: "(a)", prompt: "속도 상수 k (표의 값 사용)", type: "num", answer: 0.01625, unit: "min<sup>−1</sup>", tol: 0.03 },
        { label: "(b)", prompt: "[N<sub>2</sub>O<sub>5</sub>] = 0.350 M 이 되는 시간", type: "num", answer: 8.22, unit: "min", tol: 0.03 },
        { label: "(c)", prompt: "100. min 후의 [N<sub>2</sub>O<sub>5</sub>]", type: "num", answer: 0.0787, unit: "M", tol: 0.03 },
        { label: "(d)", prompt: R`처음(t = 0) 반응 속도 (rate $=k[\ce{N2O5}]$)`, type: "num", answer: 6.5e-3, unit: "M/min", tol: 0.03 },
        { label: "(e)", prompt: "반감기", type: "num", answer: 42.65, unit: "min", tol: 0.03 }
      ],
      solution: R`<p>(a) $k=\dfrac1t\ln\dfrac{[\mathrm A]_0}{[\mathrm A]_t}=\dfrac1{20.0}\ln\dfrac{0.400}{0.289}=1.63\times10^{-2}\ \mathrm{min^{-1}}$ (다른 행으로 계산해도 같음)</p>
        <p>(b) $t=\dfrac1k\ln\dfrac{0.400}{0.350}=\dfrac{0.1335}{0.01625}=8.2$ min</p>
        <p>(c) $[\mathrm A]=0.400\,e^{-(0.01625)(100)}=0.0787$ M</p>
        <p>(d) $\text{rate}=k[\mathrm A]_0=(0.01625)(0.400)=6.5\times10^{-3}$ M/min</p>
        <p>(e) $t_{1/2}=\dfrac{0.693}{0.01625}=42.7$ min</p>` },

    { id: "p13-20", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>어떤 1차 반응의 반감기가 20.0 min 이다.</p>`,
      parts: [
        { label: "(a)", prompt: "속도 상수 k", type: "num", answer: 0.03466, unit: "min<sup>−1</sup>", tol: 0.02 },
        { label: "(b)", prompt: "60.0 min 후 남아 있는 반응물의 비율 (소수로)", type: "num", answer: 0.125, unit: "", tol: 0.02 }
      ],
      solution: R`<p>(a) $k=\dfrac{0.693}{20.0}=3.47\times10^{-2}\ \mathrm{min^{-1}}$ &nbsp; (b) 60 min = 반감기 3번 ⇒ $(1/2)^3=1/8=0.125$</p>` },

    { id: "p13-21", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "concept", srcLabel: "개념 확인", level: 2,
      stem: R`<p>0차 반응에서 $k=0.025\ \mathrm{M\,s^{-1}}$, $[\mathrm A]_0=0.50$ M 이다.</p>`,
      parts: [
        { label: "(a)", prompt: "반감기", type: "num", answer: 10, unit: "s", tol: 0.02 },
        { label: "(b)", prompt: "A 가 모두 소모될 때까지 걸리는 시간", type: "num", answer: 20, unit: "s", tol: 0.02 }
      ],
      solution: R`<p>(a) $t_{1/2}=\dfrac{[\mathrm A]_0}{2k}=\dfrac{0.50}{2(0.025)}=10$ s &nbsp; (b) $[\mathrm A]_t=0$ ⇒ $t=\dfrac{[\mathrm A]_0}{k}=20$ s (반감기의 2배: 0차는 반감기가 짧아지므로 두 번째 반감기는 5 s, … 합이 20 s).</p>` },

    { id: "p13-22", out: "1·2차 반응", ch: 13, topic: "13.3 농도–시간", src: "concept", srcLabel: "개념 확인", level: 2,
      stem: R`<p>2차 반응($\ce{A -> product}$)에서 $[\mathrm A]_0=0.20$ M 일 때 첫 번째 반감기가 100 s 였다. 그 다음(두 번째) 반감기는 얼마인가?</p>`,
      parts: [{ type: "mc", options: ["50 s", "100 s", "200 s", "400 s"], answer: 2 }],
      solution: R`<p>2차: $t_{1/2}=\dfrac1{k[\mathrm A]_0}$. 두 번째 반감기의 시작 농도는 $0.10$ M 로 절반이므로 반감기는 <b>2배(200 s)</b>.</p>` },

    { id: "p13-23", ch: 13, topic: "13.2 속도 법칙", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>같은 온도에서 어떤 반응물의 농도를 2배로 했을 때, 반응 속도 상수 $k$ 는 어떻게 되는가?</p>`,
      parts: [{ type: "mc", options: ["2배가 된다", "절반이 된다", "변하지 않는다", "차수에 따라 달라진다"], answer: 2 }],
      solution: R`<p>$k$ 는 온도에 의존하며 <b>농도와 무관</b>합니다. 농도를 바꾸면 <b>속도(rate)</b>가 변하지 $k$ 가 변하지 않아요.</p>` },

    /* ===================== 14 Chemical Equilibrium ===================== */
    { id: "p14-01", ch: 14, topic: "14.1 평형과 K", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>$\ce{2NO(g) + O2(g) <=> 2NO2(g)}$ 의 평형 상수 $K_c$ 식은?</p>`,
      parts: [{ type: "mc", options: [R`$K_c=\dfrac{[\ce{NO2}]}{[\ce{NO}][\ce{O2}]}$`, R`$K_c=\dfrac{[\ce{NO2}]^2}{[\ce{NO}]^2[\ce{O2}]}$`, R`$K_c=\dfrac{[\ce{NO}]^2[\ce{O2}]}{[\ce{NO2}]^2}$`, R`$K_c=\dfrac{2[\ce{NO2}]}{2[\ce{NO}]+[\ce{O2}]}$`], answer: 1 }],
      solution: R`<p>생성물 / 반응물, 계수는 지수: $K_c=\dfrac{[\ce{NO2}]^2}{[\ce{NO}]^2[\ce{O2}]}$</p>` },

    { id: "p14-02", ch: 14, topic: "14.1 평형과 K", src: "book", srcLabel: "교재 Ex 14.2 유형", level: 1,
      stem: R`<p>230 °C 에서 $\ce{2NO(g) + O2(g) <=> 2NO2(g)}$ 의 평형 농도는 [NO] = 0.0542 M, [O<sub>2</sub>] = 0.127 M, [NO<sub>2</sub>] = 15.5 M 이다. $K_c$ 는?</p>`,
      parts: [{ type: "num", answer: 6.44e5, unit: "", tol: 0.03 }],
      solution: R`<p>$K_c=\dfrac{(15.5)^2}{(0.0542)^2(0.127)}=6.44\times10^{5}$</p>` },

    { id: "p14-03", ch: 14, topic: "14.1 평형과 K", src: "book", srcLabel: "교재 Ex 14.3 유형", level: 1,
      stem: R`<p>250 °C 에서 $\ce{PCl5(g) <=> PCl3(g) + Cl2(g)}$ 의 $K_P=1.05$. 평형에서 $P_{\ce{PCl5}}=0.875$ atm, $P_{\ce{PCl3}}=0.463$ atm 이다. $P_{\ce{Cl2}}$ 는?</p>`,
      parts: [{ type: "num", answer: 1.984, unit: "atm", tol: 0.02 }],
      solution: R`<p>$P_{\ce{Cl2}}=\dfrac{K_P\,P_{\ce{PCl5}}}{P_{\ce{PCl3}}}=\dfrac{(1.05)(0.875)}{0.463}=1.98$ atm</p>` },

    { id: "p14-04", ch: 14, topic: "14.1 평형과 K", src: "book", srcLabel: "교재 Ex 14.4 유형", level: 2,
      stem: R`<p>$\ce{CO(g) + 2H2(g) <=> CH3OH(g)}$ 의 $K_c=10.5$ (220 °C). 같은 온도에서 $K_P$ 는?</p>`,
      parts: [{ type: "num", answer: 6.41e-3, unit: "", tol: 0.03, hint: "Δn = 1 − 3 = −2, T = 493 K" }],
      solution: R`<p>$\Delta n=1-3=-2$, $T=493$ K: $K_P=K_c(0.0821T)^{\Delta n}=10.5\,(0.0821\times493)^{-2}=10.5/(40.5)^2=6.41\times10^{-3}$</p>` },

    { id: "p14-05", ch: 14, topic: "14.2 K의 형태", src: "book", srcLabel: "교재 14.15 유형", level: 1,
      stem: R`<p>25 °C 에서 $\ce{2HCl(g) <=> H2(g) + Cl2(g)}$ 의 $K_c=4.17\times10^{-34}$ 이다. 같은 온도에서 $\ce{H2(g) + Cl2(g) <=> 2HCl(g)}$ 의 $K_c$ 는?</p>`,
      parts: [{ type: "num", answer: 2.398e33, unit: "", tol: 0.03 }],
      solution: R`<p>반응을 <b>뒤집으면 역수</b>: $K'=1/K=\dfrac{1}{4.17\times10^{-34}}=2.40\times10^{33}$ (HCl 생성이 매우 유리)</p>` },

    { id: "p14-06", out: "Heterogeneous equilibria (X 표시)", ch: 14, topic: "14.1 평형과 K", src: "book", srcLabel: "교재 14.22 유형", level: 2,
      stem: R`<p>$\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$ 의 평형 압력(CO<sub>2</sub>)이 350 °C 에서 0.105 atm 이다. 이 반응의 $K_P$ 와 $K_c$ 를 구하시오. <span class="muted">(순수한 고체는 K 식에서 제외)</span></p>`,
      parts: [
        { label: "(a)", prompt: R`$K_P$`, type: "num", answer: 0.105, unit: "", tol: 0.02 },
        { label: "(b)", prompt: R`$K_c$`, type: "num", answer: 2.05e-3, unit: "", tol: 0.03 }
      ],
      solution: R`<p>(a) 기체는 CO<sub>2</sub> 뿐이므로 $K_P=P_{\ce{CO2}}=0.105$.</p>
        <p>(b) $\Delta n=1$, $T=623$ K: $K_c=\dfrac{K_P}{(0.0821T)^{\Delta n}}=\dfrac{0.105}{0.0821\times623}=2.05\times10^{-3}$</p>` },

    { id: "p14-07", ch: 14, topic: "14.4 Q · ICE", src: "book", srcLabel: "교재 14.25 유형", level: 3,
      stem: R`<p>1600 °C 에서 $\ce{Br2(g) <=> 2Br(g)}$. 0.980 L 플라스크에 Br<sub>2</sub> 1.05 mol 을 넣었더니 1.20 % 가 해리되었다. $K_c$ 는?</p>`,
      parts: [{ type: "num", answer: 6.25e-4, unit: "", tol: 0.04 }],
      solution: R`<ol class="steps"><li>$[\ce{Br2}]_0=1.05/0.980=1.071$ M. 해리량 $x=0.0120\times1.071=0.01286$ M.</li>
        <li>평형: $[\ce{Br2}]=1.071-0.0129=1.059$ M, $[\ce{Br}]=2x=0.02571$ M.</li>
        <li>$K_c=\dfrac{[\ce{Br}]^2}{[\ce{Br2}]}=\dfrac{(0.02571)^2}{1.059}=6.2\times10^{-4}$</li></ol>` },

    { id: "p14-08", ch: 14, topic: "14.3 속도론과 평형", src: "book", srcLabel: "교재 Review of Concepts", level: 2,
      stem: R`<p>$\ce{A <=> B + C}$ 의 $K_c=4.8\times10^{-2}$ (80 °C), 정반응 속도 상수 $k_f=3.2\times10^{2}\ \mathrm{s^{-1}}$. 역반응 속도 상수 $k_r$ 은?</p>`,
      parts: [{ type: "num", answer: 6.667e3, unit: "M<sup>−1</sup>s<sup>−1</sup>", tol: 0.03 }],
      solution: R`<p>$K_c=\dfrac{k_f}{k_r}\ \Rightarrow\ k_r=\dfrac{k_f}{K_c}=\dfrac{3.2\times10^2}{4.8\times10^{-2}}=6.7\times10^{3}\ \mathrm{M^{-1}s^{-1}}$</p>` },

    { id: "p14-09", ch: 14, topic: "14.4 Q · ICE", src: "book", srcLabel: "교재 예제 — HI", level: 2,
      stem: R`<p>430 °C 에서 $\ce{H2(g) + I2(g) <=> 2HI(g)}$ 의 $K_c=54.3$. 1.00 L 용기에 H<sub>2</sub> 0.243 mol, I<sub>2</sub> 0.146 mol, HI 1.98 mol 을 넣었다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$Q_c$ 는?`, type: "num", answer: 110.5, unit: "", tol: 0.03 },
        { label: "(b)", prompt: "순반응의 방향은?", type: "mc", options: [RIGHT, LEFT, "이미 평형"], answer: 1 }
      ],
      solution: R`<p>$Q_c=\dfrac{(1.98)^2}{(0.243)(0.146)}=111>K_c=54.3$ ⇒ 생성물이 너무 많음 ⇒ <b>역반응</b>(HI → H<sub>2</sub> + I<sub>2</sub>).</p>` },

    { id: "p14-10", ch: 14, topic: "14.4 Q · ICE", src: "book", srcLabel: "교재 Ex 14.8 유형", level: 2,
      stem: R`<p>375 °C 에서 $\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ 의 $K_c=1.2$. 3.50 L 용기에 N<sub>2</sub> 0.249 mol, H<sub>2</sub> $3.21\times10^{-2}$ mol, NH<sub>3</sub> $6.42\times10^{-4}$ mol 이 있다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$Q_c$ 는?`, type: "num", answer: 0.613, unit: "", tol: 0.04, hint: "mol 을 먼저 3.50 L 로 나눠 농도로!" },
        { label: "(b)", prompt: "순반응의 방향은?", type: "mc", options: [RIGHT, LEFT, "이미 평형"], answer: 0 }
      ],
      solution: R`<p>$[\ce{N2}]=0.0711$, $[\ce{H2}]=9.17\times10^{-3}$, $[\ce{NH3}]=1.83\times10^{-4}$ M.</p>
        <p>$Q_c=\dfrac{(1.83\times10^{-4})^2}{(0.0711)(9.17\times10^{-3})^3}=0.61&lt;K_c=1.2$ ⇒ <b>정반응</b>(NH<sub>3</sub> 생성).</p>` },

    { id: "p14-11", ch: 14, topic: "14.4 Q · ICE", src: "book", srcLabel: "교재 Practice Exercise", level: 2,
      stem: R`<p>35 °C 에서 $\ce{2NO(g) + Cl2(g) <=> 2NOCl(g)}$ 의 $K_c=6.5\times10^{4}$. 2.0 L 플라스크에 NO $2.0\times10^{-2}$ mol, Cl<sub>2</sub> $8.3\times10^{-3}$ mol, NOCl 6.8 mol 을 섞었다. 평형에 도달하기 위한 순반응의 방향은?</p>`,
      parts: [{ type: "mc", options: [RIGHT, LEFT, "이미 평형"], answer: 1 }],
      solution: R`<p>$[\ce{NO}]=0.010$, $[\ce{Cl2}]=4.15\times10^{-3}$, $[\ce{NOCl}]=3.4$ M. $Q_c=\dfrac{(3.4)^2}{(0.010)^2(4.15\times10^{-3})}=2.8\times10^{7}\gg K_c$ ⇒ <b>역반응</b>.</p>` },

    { id: "p14-12", ch: 14, topic: "14.4 Q · ICE", src: "book", srcLabel: "교재 예제 — stilbene", level: 2,
      stem: R`<p>200 °C 에서 cis-stilbene ⇌ trans-stilbene 의 $K_c=24.0$. 처음 cis-stilbene 만 0.850 mol/L 있었다. 평형에서 [trans-stilbene] 은?</p>`,
      parts: [{ type: "num", answer: 0.816, unit: "M", tol: 0.02, hint: "초기 농도를 K 식에 그냥 넣으면 안 돼요 → ICE" }],
      solution: R`<p>ICE: cis $0.850-x$, trans $x$. $24.0=\dfrac{x}{0.850-x}\Rightarrow x=\dfrac{24.0(0.850)}{25.0}=0.816$ M. (cis 는 0.034 M 만 남음)</p>` },

    { id: "p14-13", ch: 14, topic: "14.4 Q · ICE", src: "hw", srcLabel: "교재 Ex 14.9 (HW)", level: 3,
      stem: R`<p>$\ce{H2(g) + I2(g) <=> 2HI(g)}$, 430 °C, $K_c=54.3$. 1.00 L 용기에 H<sub>2</sub> 0.500 mol 과 I<sub>2</sub> 0.500 mol 만 넣었다. 평형 농도는?</p>`,
      parts: [
        { label: "(a)", prompt: "[H<sub>2</sub>] = [I<sub>2</sub>]", type: "num", answer: 0.1067, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: "[HI]", type: "num", answer: 0.7865, unit: "M", tol: 0.02 }
      ],
      solution: R`<p>ICE: H<sub>2</sub>, I<sub>2</sub> : $0.500-x$, HI : $2x$. $54.3=\dfrac{(2x)^2}{(0.500-x)^2}$ → 제곱근: $\dfrac{2x}{0.500-x}=7.37\Rightarrow x=0.393$.</p>
        <p>$[\ce{H2}]=[\ce{I2}]=0.107$ M, $[\ce{HI}]=0.787$ M. 검산: $0.787^2/0.107^2=54$ ✓</p>` },

    { id: "p14-14", ch: 14, topic: "14.4 Q · ICE", src: "book", srcLabel: "교재 14.39 유형", level: 3,
      stem: R`<p>$\ce{2SO2(g) + O2(g) <=> 2SO3(g)}$ 의 $K_P=5.60\times10^{4}$ (350 °C). 초기 부분압이 $P_{\ce{SO2}}=0.350$ atm, $P_{\ce{O2}}=0.762$ atm 이다 (합 1.112 atm).</p>`,
      parts: [
        { label: "(a)", prompt: "평형에서 전체 압력은 1.112 atm 보다?", type: "mc", options: ["작다", "크다", "같다"], answer: 0 },
        { label: "(b)", prompt: "평형에서의 전체 압력", type: "num", answer: 0.938, unit: "atm", tol: 0.02, hint: "K 가 매우 크므로 SO₂ 가 거의 다 반응한다고 근사해도 됩니다." }
      ],
      solution: R`<p>(a) 반응이 정방향으로 진행하면 기체 몰수가 3 → 2 로 줄어 <b>전체 압력 감소</b>.</p>
        <p>(b) $\ce{SO2}$ 가 $2x$ 소모: $P_{\ce{SO2}}=0.350-2x$, $P_{\ce{O2}}=0.762-x$, $P_{\ce{SO3}}=2x$. $K_P$ 가 매우 크므로 $2x\approx0.350$, $x\approx0.175$.</p>
        <p>전체 $=1.112-x\approx0.937$ atm (정확히는 0.938 atm).</p>` },

    { id: "p14-15", ch: 14, topic: "14.5 Le Châtelier", src: "book", srcLabel: "교재 14.53 유형", level: 1,
      stem: R`<p>$\ce{SO2(g) + Cl2(g) <=> SO2Cl2(g)}$ 평형에서 온도는 일정하다. 다음 스트레스에 대한 평형 이동 방향은?</p>`,
      parts: [
        { label: "(a)", prompt: "Cl<sub>2</sub> 를 더 넣는다", type: "mc", options: [RIGHT, LEFT, NONE], answer: 0 },
        { label: "(b)", prompt: "SO<sub>2</sub>Cl<sub>2</sub> 를 일부 제거한다", type: "mc", options: [RIGHT, LEFT, NONE], answer: 0 },
        { label: "(c)", prompt: "SO<sub>2</sub> 를 일부 제거한다", type: "mc", options: [RIGHT, LEFT, NONE], answer: 1 }
      ],
      solution: R`<p>(a) 반응물 추가 → 오른쪽. (b) 생성물 제거 → 오른쪽. (c) 반응물 제거 → 왼쪽(반응물을 보충하려고 SO<sub>2</sub>Cl<sub>2</sub> 가 분해).</p>` },

    { id: "p14-16", ch: 14, topic: "14.5 Le Châtelier", src: "ap", srcLabel: "AP 스타일 MC", level: 2,
      stem: R`<p>$\ce{PCl3(g) + Cl2(g) <=> PCl5(g)}$, $\Delta H=-92.5$ kJ/mol. 생성물(PCl<sub>5</sub>)을 <b>더 많이</b> 얻는 방법은?</p>`,
      parts: [{ type: "mc", options: [R`PCl<sub>3</sub> 의 농도를 줄인다`, "압력을 높인다", "온도를 높인다", "위 방법 모두 불가능"], answer: 1 }],
      solution: R`<p>(A) 반응물 제거 → 왼쪽 ✗. (B) 압력↑ → 기체 몰수가 적은 쪽(2 mol → 1 mol, 오른쪽) ✓. (C) 발열 반응에서 온도↑ → 왼쪽 ✗.</p>` },

    { id: "p14-17", ch: 14, topic: "14.2 K의 형태", src: "concept", srcLabel: "개념 확인", level: 2,
      stem: R`<p>25 °C 에서 $\ce{N2O4(g) <=> 2NO2(g)}$ 의 $K_c=4.63\times10^{-3}$ 이다.</p>`,
      parts: [
        { label: "(a)", prompt: R`$\ce{2NO2(g) <=> N2O4(g)}$ 의 $K_c$`, type: "num", answer: 216, unit: "", tol: 0.02 },
        { label: "(b)", prompt: R`$\ce{1/2N2O4(g) <=> NO2(g)}$ 의 $K_c$`, type: "num", answer: 0.0680, unit: "", tol: 0.02 }
      ],
      solution: R`<p>(a) 뒤집기 → $1/K=216$. (b) 계수 ½ 배 → $\sqrt K=\sqrt{4.63\times10^{-3}}=0.0680$.</p>` },

    { id: "p14-18", ch: 14, topic: "14.5 Le Châtelier", src: "concept", srcLabel: "개념 확인", level: 2,
      stem: R`<p>$\ce{N2O4(g) <=> 2NO2(g)}$, $\Delta H^\circ=+58.0$ kJ/mol (무색 ⇌ 갈색). 이 계를 <b>가열</b>했다.</p>`,
      parts: [
        { label: "(a)", prompt: "평형은 어느 쪽으로 이동하는가?", type: "mc", options: [RIGHT, LEFT, NONE], answer: 0 },
        { label: "(b)", prompt: R`$K_c$ 값은?`, type: "mc", options: ["증가한다", "감소한다", "변하지 않는다"], answer: 0 }
      ],
      solution: R`<p>정반응이 <b>흡열</b>이므로 온도↑ → 오른쪽(NO<sub>2</sub>, 갈색이 진해짐), 온도는 K 자체를 바꾸므로 $K_c$ <b>증가</b>.</p>` },

    { id: "p14-19", ch: 14, topic: "14.5 Le Châtelier", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>발열 반응에서 <b>평형 상수 K 의 값을 바꾸는</b> 것은?</p>`,
      parts: [{ type: "mc", options: ["반응물의 농도를 높인다", "용기의 부피를 줄인다", "온도를 높인다", "생성물을 일부 제거한다"], answer: 2 }],
      solution: R`<p>K 를 바꾸는 요인은 <b>온도뿐</b>. 농도 변화(반응물 추가·생성물 제거)와 부피(압력) 변화는 평형 위치만 이동시키고 K 값은 그대로예요.</p>` },

    { id: "p14-20", ch: 14, topic: "14.1 평형과 K", src: "concept", srcLabel: "개념 확인", level: 2,
      stem: R`<p>$\ce{N2(g) + 3H2(g) <=> 2NH3(g)}$ 의 $K_c=0.50$ (400 °C = 673 K). 같은 온도에서 $K_P$ 는?</p>`,
      parts: [{ type: "num", answer: 1.638e-4, unit: "", tol: 0.03 }],
      solution: R`<p>$\Delta n=2-4=-2$. $K_P=K_c(0.0821T)^{\Delta n}=0.50\,(0.0821\times673)^{-2}=0.50/(55.25)^2=1.6\times10^{-4}$</p>` },

    /* ===================== 15 Acids and Bases ===================== */
    { id: "p15-01", ch: 15, topic: "15.1 Brønsted · Lewis", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>$\ce{H2PO4-}$ 에 대해 답하시오.</p>`,
      parts: [
        { label: "(a)", prompt: "짝염기(conjugate base)는?", type: "mc", options: [R`$\ce{H3PO4}$`, R`$\ce{HPO4^2-}$`, R`$\ce{PO4^3-}$`, R`$\ce{OH-}$`], answer: 1 },
        { label: "(b)", prompt: "짝산(conjugate acid)은?", type: "mc", options: [R`$\ce{H3PO4}$`, R`$\ce{HPO4^2-}$`, R`$\ce{PO4^3-}$`, R`$\ce{H3O+}$`], answer: 0 }
      ],
      solution: R`<p>짝염기 = H<sup>+</sup> 하나 <b>잃은</b> 것: $\ce{HPO4^2-}$. 짝산 = H<sup>+</sup> 하나 <b>얻은</b> 것: $\ce{H3PO4}$. ($\ce{H2PO4-}$ 는 양쪽성)</p>` },

    { id: "p15-02", ch: 15, topic: "15.2 물과 Kw", src: "book", srcLabel: "교재 Ex 15.2 유형", level: 1,
      stem: R`<p>가정용 암모니아 세제의 $[\mathrm{OH^-}]=0.0025$ M 이다 (25 °C). $[\mathrm H^+]$ 는?</p>`,
      parts: [{ type: "num", answer: 4.0e-12, unit: "M", tol: 0.02 }],
      solution: R`<p>$[\mathrm H^+]=\dfrac{K_w}{[\mathrm{OH^-}]}=\dfrac{1.0\times10^{-14}}{0.0025}=4.0\times10^{-12}$ M</p>` },

    { id: "p15-03", ch: 15, topic: "15.3 pH", src: "book", srcLabel: "교재 Ex 15.3 유형", level: 1,
      stem: R`<p>와인의 $[\mathrm H^+]$ 가 개봉 직후 $3.2\times10^{-4}$ M, 한 달 방치 후 $1.0\times10^{-3}$ M 이다. 두 때의 pH 는?</p>`,
      parts: [
        { label: "(a)", prompt: "개봉 직후", type: "num", answer: 3.49, unit: "", abs: 0.02 },
        { label: "(b)", prompt: "한 달 후", type: "num", answer: 3.00, unit: "", abs: 0.02 }
      ],
      solution: R`<p>(a) $-\log(3.2\times10^{-4})=3.49$ &nbsp;&nbsp; (b) $-\log(1.0\times10^{-3})=3.00$</p>` },

    { id: "p15-04", ch: 15, topic: "15.3 pH", src: "book", srcLabel: "교재 15.18 유형", level: 1,
      stem: R`<p>다음 용액의 pH 는? (25 °C)</p>`,
      parts: [
        { label: "(a)", prompt: R`$2.8\times10^{-4}$ M $\ce{Ba(OH)2}$`, type: "num", answer: 10.75, unit: "", abs: 0.06 },
        { label: "(b)", prompt: R`$5.2\times10^{-4}$ M $\ce{HNO3}$`, type: "num", answer: 3.28, unit: "", abs: 0.02 }
      ],
      solution: R`<p>(a) Ba(OH)<sub>2</sub> 는 OH<sup>−</sup> 2개: $[\mathrm{OH^-}]=5.6\times10^{-4}$, $\mathrm{pOH}=3.25$, $\mathrm{pH}=14.00-3.25=10.75$.</p>
        <p>(b) 강산: $[\mathrm H^+]=5.2\times10^{-4}$ ⇒ $\mathrm{pH}=3.28$.</p>` },

    { id: "p15-05", ch: 15, topic: "15.3 pH", src: "book", srcLabel: "교재 15.24 유형", level: 1,
      stem: R`<p>0.360 M KOH 용액 5.50 mL 가 있다.</p>`,
      parts: [
        { label: "(a)", prompt: "KOH 의 몰수", type: "num", answer: 1.98e-3, unit: "mol", tol: 0.02 },
        { label: "(b)", prompt: "이 용액의 pOH", type: "num", answer: 0.444, unit: "", abs: 0.02 }
      ],
      solution: R`<p>(a) $n=MV=(0.360)(5.50\times10^{-3}\ \mathrm L)=1.98\times10^{-3}$ mol</p>
        <p>(b) 강염기: $[\mathrm{OH^-}]=0.360$ M ⇒ $\mathrm{pOH}=-\log0.360=0.444$ (부피와 무관!)</p>` },

    { id: "p15-06", ch: 15, topic: "15.5 약산 Ka", src: "book", srcLabel: "교재 Ex 15.8 유형", level: 2,
      stem: R`<p>0.036 M 아질산 $\ce{HNO2}$ 용액의 pH 를 구하시오. ($K_a=4.5\times10^{-4}$)</p>`,
      parts: [
        { label: "(a)", prompt: R`$x=\sqrt{K_aC_0}$ 근사를 써도 되는가?`, type: "mc", options: ["된다 (5 % 미만)", "안 된다 (약 11 % > 5 %)"], answer: 1 },
        { label: "(b)", prompt: "pH", type: "num", answer: 2.42, unit: "", abs: 0.02 }
      ],
      solution: R`<p>근사 $x=\sqrt{(4.5\times10^{-4})(0.036)}=4.0\times10^{-3}$ ⇒ $4.0\times10^{-3}/0.036=11\%>5\%$ ✗ → 이차방정식.</p>
        <p>$x^2+4.5\times10^{-4}x-1.62\times10^{-5}=0\Rightarrow x=3.8\times10^{-3}$ M ⇒ $\mathrm{pH}=2.42$</p>` },

    { id: "p15-07", ch: 15, topic: "15.5 약산 Ka", src: "book", srcLabel: "교재 본문 — HF", level: 2,
      stem: R`<p>HF 의 $K_a=7.1\times10^{-4}$ (25 °C).</p>`,
      parts: [
        { label: "(a)", prompt: "0.50 M HF 의 pH", type: "num", answer: 1.73, unit: "", abs: 0.03 },
        { label: "(b)", prompt: "0.050 M HF 의 pH", type: "num", answer: 2.25, unit: "", abs: 0.03 },
        { label: "(c)", prompt: "두 경우 중 이차방정식이 필요한 것은?", type: "mc", options: ["0.50 M", "0.050 M", "둘 다", "둘 다 아님"], answer: 1 }
      ],
      solution: R`<p>(a) $x=\sqrt{(7.1\times10^{-4})(0.50)}=0.019$ ($3.8\%<5\%$ ✓) ⇒ $\mathrm{pH}=1.72$ (정확한 이차방정식 값 1.73).</p>
        <p>(b) 근사하면 $x=6.0\times10^{-3}$ → $12\%>5\%$ ✗ ⇒ 이차방정식: $x=5.6\times10^{-3}$ ⇒ $\mathrm{pH}=2.25$.</p>` },

    { id: "p15-08", ch: 15, topic: "15.5 약산 Ka", src: "book", srcLabel: "교재 Ex 15.9 유형", level: 2,
      stem: R`<p>0.10 M 포름산(HCOOH) 용액의 pH 가 2.39 이다. $K_a$ 는?</p>`,
      parts: [{ type: "num", answer: 1.73e-4, unit: "", tol: 0.05 }],
      solution: R`<p>$[\mathrm H^+]=10^{-2.39}=4.1\times10^{-3}=[\ce{HCOO-}]$, $[\ce{HCOOH}]=0.10-0.0041=0.096$ M.<br>$K_a=\dfrac{(4.1\times10^{-3})^2}{0.096}=1.7\times10^{-4}$</p>` },

    { id: "p15-09", ch: 15, topic: "15.6 약염기 Kb", src: "book", srcLabel: "교재 본문 — NH₃", level: 2,
      stem: R`<p>0.40 M 암모니아 수용액의 pH 는? ($K_b=1.8\times10^{-5}$)</p>`,
      parts: [{ type: "num", answer: 11.43, unit: "", abs: 0.03, hint: "x = [OH⁻] → pOH → pH" }],
      solution: R`<p>$x=\sqrt{(1.8\times10^{-5})(0.40)}=2.7\times10^{-3}$ M $=[\mathrm{OH^-}]$ (0.7 % ✓). $\mathrm{pOH}=2.57$, $\mathrm{pH}=14.00-2.57=11.43$.</p>` },

    { id: "p15-10", ch: 15, topic: "15.5 약산 Ka", src: "book", srcLabel: "교재 15.44 유형", level: 3,
      stem: R`<p>아세트산(CH<sub>3</sub>COOH, 60.05 g/mol) 0.0560 g 을 물에 녹여 50.0 mL 용액을 만들었다. $K_a=1.8\times10^{-5}$.</p>`,
      parts: [
        { label: "(a)", prompt: "처음 아세트산 농도", type: "num", answer: 0.01865, unit: "M", tol: 0.02 },
        { label: "(b)", prompt: R`평형 $[\mathrm H^+]$ (=[CH<sub>3</sub>COO<sup>−</sup>])`, type: "num", answer: 5.70e-4, unit: "M", tol: 0.03 },
        { label: "(c)", prompt: "평형 [CH<sub>3</sub>COOH]", type: "num", answer: 0.0181, unit: "M", tol: 0.02 }
      ],
      solution: R`<p>(a) $n=0.0560/60.05=9.33\times10^{-4}$ mol, $C_0=9.33\times10^{-4}/0.0500=0.0187$ M.</p>
        <p>(b) 근사 $x=\sqrt{(1.8\times10^{-5})(0.0187)}=5.8\times10^{-4}$ ($3.1\%<5\%$ ✓). 이차방정식 값은 $5.7\times10^{-4}$ M.</p>
        <p>(c) $[\ce{CH3COOH}]=0.0187-0.00057=0.0181$ M</p>` },

    { id: "p15-11", ch: 15, topic: "15.6 약염기 Kb", src: "book", srcLabel: "교재 15.56 유형", level: 2,
      stem: R`<p>0.30 M 약염기 용액의 pH 가 10.66 이다. 이 염기의 $K_b$ 는?</p>`,
      parts: [{ type: "num", answer: 6.97e-7, unit: "", tol: 0.05, hint: "pH → pOH → [OH⁻] = x" }],
      solution: R`<p>$\mathrm{pOH}=14.00-10.66=3.34$ ⇒ $[\mathrm{OH^-}]=10^{-3.34}=4.6\times10^{-4}$ M $=x$.</p>
        <p>$K_b=\dfrac{x^2}{0.30-x}=\dfrac{(4.6\times10^{-4})^2}{0.30}=7.0\times10^{-7}$</p>` },

    { id: "p15-12", ch: 15, topic: "15.4 산·염기 세기", src: "book", srcLabel: "교재 15.64 유형", level: 3,
      stem: R`<p>0.040 M HCl 과 0.040 M $\ce{H2SO4}$ 의 pH 를 비교하시오. ($\ce{H2SO4}$ 의 첫 이온화는 완전, $\ce{HSO4-}$ 의 $K_a=1.3\times10^{-2}$)</p>`,
      parts: [
        { label: "(a)", prompt: "HCl 의 pH", type: "num", answer: 1.40, unit: "", abs: 0.02 },
        { label: "(b)", prompt: R`$\ce{H2SO4}$ 의 pH`, type: "num", answer: 1.31, unit: "", abs: 0.02 },
        { label: "(c)", prompt: "더 산성인 용액은?", type: "mc", options: ["HCl", "H<sub>2</sub>SO<sub>4</sub>", "같다"], answer: 1 }
      ],
      solution: R`<p>(a) $\mathrm{pH}=-\log0.040=1.40$.</p>
        <p>(b) 1단계로 $[\mathrm H^+]=[\ce{HSO4-}]=0.040$. 2단계: $\dfrac{(0.040+x)(x)}{0.040-x}=1.3\times10^{-2}$ ⇒ $x^2+0.053x-5.2\times10^{-4}=0$ ⇒ $x=8.5\times10^{-3}$. $[\mathrm H^+]=0.0485$ ⇒ $\mathrm{pH}=1.31$.</p>
        <p>(c) $\ce{H2SO4}$ 는 H<sup>+</sup> 를 더 내놓으므로 pH 가 더 낮다.</p>` },

    { id: "p15-13", ch: 15, topic: "15.8 다양성자산", src: "book", srcLabel: "교재 15.65 유형", level: 3,
      stem: R`<p>0.20 M $\ce{KHSO4}$ 용액에서 평형 농도를 구하시오. (K<sup>+</sup> 는 구경꾼 이온, $\ce{HSO4-}$ 의 $K_a=1.3\times10^{-2}$)</p>`,
      parts: [
        { label: "(a)", prompt: R`$[\mathrm H^+]=[\ce{SO4^2-}]$`, type: "num", answer: 0.0449, unit: "M", tol: 0.04 },
        { label: "(b)", prompt: R`$[\ce{HSO4-}]$`, type: "num", answer: 0.155, unit: "M", tol: 0.04 }
      ],
      solution: R`<p>$\ce{HSO4- <=> H+ + SO4^2-}$: $\dfrac{x^2}{0.20-x}=1.3\times10^{-2}$ ⇒ $x^2+0.013x-2.6\times10^{-3}=0$ ⇒ $x=0.045$ ($x/0.20=22\%$ → 이차방정식 필수).</p>
        <p>$[\mathrm H^+]=[\ce{SO4^2-}]=0.045$ M, $[\ce{HSO4-}]=0.20-0.045=0.155$ M.</p>` },

    { id: "p15-14", ch: 15, topic: "15.8 다양성자산", src: "book", srcLabel: "교재 Ex 15.11 유형", level: 3,
      stem: R`<p>0.10 M 옥살산 $\ce{H2C2O4}$ 용액의 평형 농도. ($K_{a_1}=6.5\times10^{-2}$, $K_{a_2}=6.1\times10^{-5}$)</p>`,
      parts: [
        { label: "(a)", prompt: R`$[\mathrm H^+]$`, type: "num", answer: 0.0544, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: R`$[\ce{H2C2O4}]$`, type: "num", answer: 0.0456, unit: "M", tol: 0.03 },
        { label: "(c)", prompt: R`$[\ce{C2O4^2-}]$`, type: "num", answer: 6.1e-5, unit: "M", tol: 0.05 }
      ],
      solution: R`<p>1단계: $\dfrac{x^2}{0.10-x}=6.5\times10^{-2}$ ⇒ $x=0.054$ M ⇒ $[\mathrm H^+]=[\ce{HC2O4-}]=0.054$, $[\ce{H2C2O4}]=0.046$.</p>
        <p>2단계: $\dfrac{(0.054+y)\,y}{0.054-y}\approx y=K_{a_2}$ ⇒ $[\ce{C2O4^2-}]=6.1\times10^{-5}$ M.</p>` },

    { id: "p15-15", ch: 15, topic: "15.8 다양성자산", src: "hw", srcLabel: "교재 Practice Exercise (HW)", level: 3,
      stem: R`<p>0.20 M 옥살산 용액에서 $\ce{H2C2O4}$, $\ce{HC2O4-}$, $\ce{C2O4^2-}$, $\mathrm H^+$ 의 농도를 구하시오.</p>`,
      parts: [
        { label: "(a)", prompt: R`$[\mathrm H^+]=[\ce{HC2O4-}]$`, type: "num", answer: 0.0861, unit: "M", tol: 0.03 },
        { label: "(b)", prompt: R`$[\ce{H2C2O4}]$`, type: "num", answer: 0.114, unit: "M", tol: 0.03 },
        { label: "(c)", prompt: R`$[\ce{C2O4^2-}]$`, type: "num", answer: 6.1e-5, unit: "M", tol: 0.05 }
      ],
      solution: R`<p>$x^2+0.065x-0.013=0$ ⇒ $x=\dfrac{-0.065+\sqrt{0.065^2+4(0.013)}}{2}=0.086$ M.<br>$[\ce{H2C2O4}]=0.20-0.086=0.114$ M, $[\ce{C2O4^2-}]\approx K_{a_2}=6.1\times10^{-5}$ M.</p>` },

    { id: "p15-16", ch: 15, topic: "15.5 약산 Ka", src: "ap", srcLabel: "AP 스타일 MC", level: 2,
      stem: R`<p>1 M 의 아주 약한 일양성자산 용액의 pH 가 5 이다. 이 산의 $K_a$ 는?</p>`,
      parts: [{ type: "mc", options: [R`$1\times10^{-10}$`, R`$1\times10^{-7}$`, R`$1\times10^{-5}$`, R`$1\times10^{-2}$`], answer: 0 }],
      solution: R`<p>$[\mathrm H^+]=[\mathrm A^-]=10^{-5}$ M, $[\mathrm{HA}]\approx1$ M ⇒ $K_a=\dfrac{(10^{-5})^2}{1}=1\times10^{-10}$.</p>` },

    { id: "p15-17", ch: 15, topic: "15.7 KaKb=Kw", src: "ap", srcLabel: "AP 스타일 MC", level: 2,
      stem: R`<p>$\ce{HSO4-}$ 의 $K_a=1\times10^{-2}$ 이다. $\ce{SO4^2-}$ 의 $K_b$ 는?</p>`,
      parts: [{ type: "mc", options: [R`$1\times10^{-12}$`, R`$1\times10^{-8}$`, R`$1\times10^{-2}$`, R`$1\times10^{2}$`], answer: 0 }],
      solution: R`<p>$\ce{SO4^2-}$ 는 $\ce{HSO4-}$ 의 짝염기: $K_b=\dfrac{K_w}{K_a}=\dfrac{1\times10^{-14}}{1\times10^{-2}}=1\times10^{-12}$.</p>` },

    { id: "p15-18", ch: 15, topic: "15.6 약염기 Kb", src: "ap", srcLabel: "AP FRQ 스타일", level: 3,
      stem: R`<p>아닐린 $\ce{C6H5NH2}$ 은 약염기이며 $K_b=3.8\times10^{-10}$ 이다.</p>`,
      parts: [
        { label: "(a)", prompt: "아닐린과 물의 반응식은?", type: "mc", options: [R`$\ce{C6H5NH2 + H2O <=> C6H5NH3+ + OH-}$`, R`$\ce{C6H5NH2 + H2O <=> C6H5NH- + H3O+}$`, R`$\ce{C6H5NH2 -> C6H5N + H2}$`], answer: 0 },
        { label: "(b)", prompt: R`0.25 M 용액의 평형 $[\mathrm{OH^-}]$`, type: "num", answer: 9.75e-6, unit: "M", tol: 0.03 },
        { label: "(c)", prompt: "이 용액의 pH", type: "num", answer: 8.99, unit: "", abs: 0.03 }
      ],
      solution: R`<p>(a) 염기는 물에서 H<sup>+</sup> 를 받아 짝산과 OH<sup>−</sup> 를 만든다.</p>
        <p>(b) $x=\sqrt{K_bC_0}=\sqrt{(3.8\times10^{-10})(0.25)}=9.7\times10^{-6}$ M ($[\ce{C6H5NH3+}]$ 도 같고, $[\ce{C6H5NH2}]\approx0.25$ M).</p>
        <p>(c) $\mathrm{pOH}=-\log(9.7\times10^{-6})=5.01$, $\mathrm{pH}=14.00-5.01=8.99$.</p>` },

    { id: "p15-19", ch: 15, topic: "15.7 KaKb=Kw", src: "book", srcLabel: "교재 Review of Concepts", level: 2,
      stem: R`<p>HCOOH ($K_a=1.7\times10^{-4}$) 와 HCN ($K_a=4.9\times10^{-10}$) 의 짝염기 $\ce{HCOO-}$ 와 $\ce{CN-}$ 중 더 강한 염기는?</p>`,
      parts: [{ type: "mc", options: [R`$\ce{HCOO-}$`, R`$\ce{CN-}$`, "같다"], answer: 1 }],
      solution: R`<p>$K_b=K_w/K_a$. HCN 이 훨씬 약한 산($K_a$ 작음)이므로 $K_b(\ce{CN-})$ 가 훨씬 큼 ⇒ $\ce{CN-}$ 이 더 강한 염기. (약한 산 ↔ 강한 짝염기)</p>` },

    { id: "p15-20", ch: 15, topic: "15.1 Brønsted · Lewis", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>$\ce{BF3 + NH3 -> F3B-NH3}$ 반응에서 <b>Lewis 산</b>은?</p>`,
      parts: [{ type: "mc", options: [R`$\ce{BF3}$`, R`$\ce{NH3}$`, R`$\ce{F3B-NH3}$`, "둘 다"], answer: 0 }],
      solution: R`<p>$\ce{NH3}$ 가 N 의 비공유 전자쌍을 주고(<b>Lewis 염기</b>), $\ce{BF3}$ 의 B 가 그 전자쌍을 받는다(<b>Lewis 산</b>). 양성자가 전혀 관여하지 않는 산–염기 반응이라 Brønsted 로는 설명할 수 없어요.</p>` },

    { id: "p15-21", ch: 15, topic: "15.4 산·염기 세기", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>다음 중 <b>약산</b>인 것은?</p>`,
      parts: [{ type: "mc", options: [R`$\ce{HNO3}$`, R`$\ce{HClO4}$`, R`$\ce{HF}$`, R`$\ce{HCl}$`], answer: 2 }],
      solution: R`<p>HF 는 약산($K_a=7.1\times10^{-4}$). HNO<sub>3</sub>, HClO<sub>4</sub>, HCl 은 강산(물에서 완전 이온화). HX 중 HF 만 약하다는 점 기억!</p>` },

    { id: "p15-22", ch: 15, topic: "15.7 KaKb=Kw", src: "concept", srcLabel: "개념 확인", level: 2,
      stem: R`<p>HF 의 $K_a=7.1\times10^{-4}$ 일 때 $\ce{F-}$ 의 $K_b$ 는?</p>`,
      parts: [{ type: "num", answer: 1.408e-11, unit: "", tol: 0.03 }],
      solution: R`<p>$K_b=\dfrac{K_w}{K_a}=\dfrac{1.0\times10^{-14}}{7.1\times10^{-4}}=1.4\times10^{-11}$</p>` },

    { id: "p15-23", ch: 15, topic: "15.4 산·염기 세기", src: "concept", srcLabel: "개념 확인", level: 1,
      stem: R`<p>0.010 M $\ce{Ba(OH)2}$ 수용액의 pH 는? (25 °C)</p>`,
      parts: [{ type: "num", answer: 12.30, unit: "", abs: 0.02 }],
      solution: R`<p>$[\mathrm{OH^-}]=2(0.010)=0.020$ M ⇒ $\mathrm{pOH}=1.70$ ⇒ $\mathrm{pH}=14.00-1.70=12.30$.</p>` }
  ];
})();
