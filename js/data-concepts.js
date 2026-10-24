/*
 * 개념 암기 데이터
 *  - q  : 영어 질문 (선생님이 낼 법한 형태)     - qk : 한국어 힌트
 *  - a  : 영어 모범답안. 핵심어는 [[용어|대체표현1|대체표현2]] 로 표시
 *         (첫 번째가 화면에 보이는 형태, 나머지는 쓰기 채점에서 인정하는 동의어)
 *  - ko : 한국어 설명
 *  - x  : true 이면 슬라이드에 빨간 X 표시된(범위 제외로 보이는) 항목
 *  - sup: true 이면 슬라이드에 직접 없고 교재/일반 지식으로 보충한 항목
 */
window.CONCEPTS = [
  /* ===================== 13 Chemical Kinetics ===================== */
  { id: "k01", ch: 13, topic: "13.1 Reaction rate",
    q: "Define reaction rate and give its common unit.", qk: "반응 속도의 정의와 단위",
    a: "The [[reaction rate]] is the change in [[concentration|molarity|농도]] of a reactant or product per unit [[time|시간]]. Its common unit is [[M/s|mol/(L·s)|M s-1|mol L-1 s-1]].",
    ko: "단위 시간당 반응물 또는 생성물의 농도 변화. 단위는 M/s." },

  { id: "k02", ch: 13, topic: "13.1 Reaction rate",
    q: "Why is a minus sign used when the rate is written in terms of a reactant?", qk: "반응물로 속도를 쓸 때 왜 마이너스를 붙이나?",
    a: "The reactant [[concentration]] [[decreases|decline|drops]] with time, so Δ[A] is [[negative]]. The minus sign makes the reaction rate a [[positive]] quantity.",
    ko: "반응물 농도는 줄어서 Δ[A] < 0. 마이너스를 붙여 속도를 양수로 만든다." },

  { id: "k03", ch: 13, topic: "13.1 Reaction rate",
    q: "Distinguish between the average rate and the instantaneous rate of a reaction.", qk: "평균 속도 vs 순간 속도",
    a: "The [[average rate]] is the change in concentration over a [[finite|measurable|given]] time interval (the slope of a line joining two points), while the [[instantaneous rate]] is the rate at one specific moment, given by the slope of the [[tangent|접선]] to the concentration–time curve.",
    ko: "평균 속도 = 일정 시간 구간의 평균(두 점을 잇는 기울기). 순간 속도 = 한 시점의 속도 = 접선의 기울기." },

  { id: "k04", ch: 13, topic: "13.1 Reaction rate",
    q: "What is the initial rate, and why is it used to determine a rate law?", qk: "초기 속도란? 왜 속도 법칙을 구할 때 쓰나?",
    a: "The [[initial rate]] is the instantaneous rate at [[t = 0|time zero|the start|처음]], when only [[reactants]] are present at known concentrations. Therefore [[products]] and the [[reverse reaction]] do not complicate the measurement.",
    ko: "t = 0 에서의 순간 속도. 생성물이 거의 없어 역반응의 영향이 없고 농도를 정확히 알기 때문." },

  { id: "k05", ch: 13, topic: "13.1 Reaction rate",
    q: "For aA + bB → cC + dD, how are the rates of change of the species related to the reaction rate?", qk: "계수가 다른 물질들의 속도 관계",
    a: "rate = −(1/a)Δ[A]/Δt = −(1/b)Δ[B]/Δt = (1/c)Δ[C]/Δt = (1/d)Δ[D]/Δt. Each rate of change is [[divided|divide]] by the species' [[stoichiometric coefficient|coefficient|계수]].",
    ko: "각 물질의 농도 변화율을 자기 계수로 나눠서 하나의 반응 속도로 통일한다." },

  { id: "k06", ch: 13, topic: "13.2 Rate law",
    q: "Define rate law.", qk: "속도 법칙(rate law)이란?",
    a: "A [[rate law]] expresses the reaction rate in terms of the [[rate constant]] and the [[concentrations]] of the reactants raised to some [[powers|exponents]], e.g. rate = k[A]^x[B]^y. The exponents are determined [[experimentally|by experiment|실험]].",
    ko: "속도를 rate constant 와 반응물 농도의 거듭제곱으로 나타낸 식. 지수는 실험으로 결정." },

  { id: "k07", ch: 13, topic: "13.2 Rate law",
    q: "What is the rate constant, and what does it depend on?", qk: "rate constant k 란? 무엇에 의존하나?",
    a: "The [[rate constant]] k is the [[proportionality constant|constant of proportionality]] between the rate and the reactant concentrations. It is [[independent of|not affected by|does not depend on]] concentration but depends on [[temperature|온도]] (and on a catalyst), and its [[units]] depend on the overall order.",
    ko: "속도와 농도를 이어주는 비례상수. 농도와 무관, 온도에 의존. 단위는 전체 차수에 따라 달라진다." },

  { id: "k08", ch: 13, topic: "13.2 Rate law",
    q: "Define the order of a reaction. How is the overall order obtained?", qk: "반응 차수, 전체 차수",
    a: "The [[order]] with respect to a reactant is the [[exponent|power]] of its concentration in the rate law. The [[overall order]] is the [[sum]] of the exponents of all reactants.",
    ko: "각 반응물 차수 = 속도식에서 그 농도의 지수. 전체 차수 = 지수들의 합." },

  { id: "k09", ch: 13, topic: "13.2 Rate law",
    q: "Can the order of a reaction be predicted from its balanced equation? Explain.", qk: "균형 반응식에서 차수를 알 수 있나?",
    a: "No. The orders must be determined [[experimentally|by experiment]] because the rate law depends on the [[mechanism]]; the [[stoichiometric coefficients|coefficients]] of the overall equation do not have to equal the orders.",
    ko: "아니오. 차수는 실험으로만 결정(메커니즘에 의존). 계수와 같을 수도 있지만 우연일 뿐." },

  { id: "k10", ch: 13, topic: "13.2 Rate law",
    q: "Describe the method of initial rates for finding the order of a reaction.", qk: "초기 속도법",
    a: "Carry out several experiments in which the concentration of [[one reactant at a time|only one reactant]] is changed while the others are kept [[constant]], and compare the [[initial rates]]. The ratio of the rates equals the ratio of the concentrations raised to the [[order]].",
    ko: "한 번에 한 반응물만 농도를 바꾸고 나머지는 고정, 초기 속도를 비교. rate 비 = (농도 비)^차수." },

  { id: "k11", ch: 13, topic: "13.2 Rate law",
    q: "State the units of the rate constant for a zero-, first- and second-order reaction.", qk: "0·1·2차 반응 k 의 단위",
    a: "Zero order: [[M/s|M s-1]]. First order: [[s-1|1/s|per second]]. Second order: [[M-1 s-1|1/(M·s)|1/M·s|per molar per second]]. In general the units are M^(1−n) s^-1 for order n.",
    ko: "0차 M/s, 1차 s⁻¹, 2차 M⁻¹s⁻¹. 일반적으로 M^(1−n)·s⁻¹." },

  { id: "k12", ch: 13, topic: "13.2 Rate law",
    q: "If doubling the concentration of A quadruples the rate, what is the order with respect to A? Explain.", qk: "농도 2배 → 속도 4배이면?",
    a: "The reaction is [[second order|second-order|2nd order]] in A, because rate ∝ [A]^n and 2^n = [[4]] gives n = 2.",
    ko: "2^n = 4 → n = 2 (2차)." },

  { id: "k13", ch: 13, topic: "13.3 Integrated rate laws",
    q: "Write the integrated rate law for a first-order reaction and state which plot is a straight line.", qk: "1차 반응의 적분 속도식과 직선 그래프",
    a: "ln[A]t = −kt + ln[A]0 (equivalently ln([A]t/[A]0) = −kt). A plot of [[ln[A]|ln of concentration|natural log of concentration|ln 농도]] versus [[time]] is a straight line whose [[slope]] is [[−k|-k|negative k|minus k]].",
    ko: "ln[A] 대 t 가 직선, 기울기 = −k, 절편 = ln[A]₀." },

  { id: "k14", ch: 13, topic: "13.3 Integrated rate laws",
    q: "Write the integrated rate law for a second-order reaction (A → products) and describe its linear plot.", qk: "2차 반응의 적분 속도식",
    a: "1/[A]t = kt + 1/[A]0. A plot of the [[reciprocal|1/[A]|inverse]] of the concentration versus [[time]] is a straight line with a [[positive]] slope equal to k and an intercept of 1/[A]0.",
    ko: "1/[A] 대 t 가 직선, 기울기 = +k, 절편 = 1/[A]₀." },

  { id: "k15", ch: 13, topic: "13.3 Integrated rate laws",
    q: "Write the integrated rate law for a zero-order reaction and describe its linear plot.", qk: "0차 반응의 적분 속도식",
    a: "[A]t = −kt + [A]0. A plot of [[concentration|농도]] (not its logarithm or reciprocal) versus [[time]] is a straight line with a [[negative|−k|minus]] slope. The rate is [[constant|independent of concentration|does not depend on concentration]].",
    ko: "[A] 대 t 가 직선, 기울기 = −k. 속도는 농도와 무관한 상수." },

  { id: "k16", ch: 13, topic: "13.3 Integrated rate laws",
    q: "How can the order of a reaction be identified from concentration–time data?", qk: "그래프로 차수 판별",
    a: "Plot the concentration, the [[natural logarithm|ln|log]] of the concentration, and the [[reciprocal|inverse|1/]] of the concentration against time. The plot that is a straight line identifies the order: concentration → [[zero]], ln → [[first]], reciprocal → [[second]].",
    ko: "[A], ln[A], 1/[A] 를 각각 t 에 대해 그려 직선이 되는 것이 차수(0, 1, 2차)." },

  { id: "k17", ch: 13, topic: "13.3 Half-life",
    q: "Define half-life.", qk: "반감기의 정의",
    a: "The [[half-life]] (t1/2) is the [[time]] required for the [[concentration]] of a reactant to decrease to [[half|one-half|50%|1/2]] of its [[initial|original|starting]] value.",
    ko: "반응물 농도가 처음의 절반이 되는 데 걸리는 시간." },

  { id: "k18", ch: 13, topic: "13.3 Half-life",
    q: "Give the half-life expression for a first-order reaction and explain what is special about it.", qk: "1차 반응의 반감기",
    a: "t1/2 = [[0.693/k|ln 2/k|ln2/k]]. It is [[independent of|does not depend on|not dependent on]] the initial concentration, so every successive half-life is the [[same|constant|equal]].",
    ko: "t½ = 0.693/k. 초기 농도와 무관 → 반감기마다 항상 절반." },

  { id: "k19", ch: 13, topic: "13.3 Half-life",
    q: "Give the half-life expression for a second-order reaction and describe how it changes as the reaction proceeds.", qk: "2차 반응의 반감기",
    a: "t1/2 = 1/(k[A]0). It is [[inversely proportional|inverse]] to the initial concentration, so each successive half-life is [[longer|doubles|twice as long]] than the one before.",
    ko: "t½ = 1/(k[A]₀). 농도가 묽어질수록 반감기가 길어진다(다음 반감기는 2배)." },

  { id: "k20", ch: 13, topic: "13.3 Half-life",
    q: "Give the half-life expression for a zero-order reaction and describe how it changes as the reaction proceeds.", qk: "0차 반응의 반감기",
    a: "t1/2 = [A]0/2k. It is [[directly proportional|proportional]] to the initial concentration, so successive half-lives become [[shorter|smaller|halve]].",
    ko: "t½ = [A]₀/2k. 초기 농도에 비례, 반응이 진행될수록 반감기가 짧아진다." },

  { id: "k21", ch: 13, topic: "13.3 Half-life",
    q: "What fraction of a first-order reactant remains after three half-lives?", qk: "1차 반응, 반감기 3번 후 남은 비율",
    a: "After n half-lives the fraction remaining is (1/2)^n, so after three half-lives it is [[1/8|12.5%|0.125|one-eighth]].",
    ko: "(1/2)³ = 1/8 = 12.5 %." },

  { id: "k22", ch: 13, topic: "13.4 Arrhenius",
    q: "Define activation energy.", qk: "활성화 에너지의 정의",
    a: "The [[activation energy]] (Ea) is the [[minimum|minimal|least]] [[energy]] that reactants must acquire, i.e. the energy [[barrier]], to reach the [[activated complex|transition state]] and be converted into products.",
    ko: "반응물이 생성물로 가기 위해 넘어야 하는 최소 에너지 장벽(활성화 복합체까지의 에너지)." },

  { id: "k23", ch: 13, topic: "13.4 Arrhenius",
    q: "What does the Arrhenius equation k = A e^(−Ea/RT) tell us?", qk: "아레니우스 식이 말해 주는 것",
    a: "The rate constant [[increases|rises|gets larger]] [[exponentially]] with [[temperature]] and [[decreases|gets smaller]] as the activation energy becomes larger. A is the [[frequency factor|pre-exponential factor|collision frequency]].",
    ko: "T↑ → k 지수적으로 증가, Ea↑ → k↓. A 는 빈도 인자." },

  { id: "k24", ch: 13, topic: "13.4 Arrhenius",
    q: "How can the activation energy be determined graphically?", qk: "그래프로 Ea 구하기",
    a: "Plot [[ln k]] versus [[1/T]] (T in [[kelvin|K]]). The graph is a straight line with slope [[−Ea/R|-Ea/R|negative Ea/R]], so Ea = −slope × R, using R = [[8.314]] J/(K·mol).",
    ko: "ln k 대 1/T 직선의 기울기 = −Ea/R. Ea = −기울기 × 8.314 (J/mol)." },

  { id: "k25", ch: 13, topic: "13.4 Arrhenius",
    q: "Explain why raising the temperature increases the reaction rate.", qk: "온도가 오르면 왜 빨라지나?", sup: true,
    a: "A higher temperature increases the [[fraction|proportion|number]] of molecules with [[kinetic energy|energy]] equal to or greater than the [[activation energy|Ea]], so more collisions are [[effective|successful|reactive]] and the rate constant k increases.",
    ko: "Ea 이상의 에너지를 가진 분자 비율이 늘어 유효 충돌이 많아지므로 k 증가." },

  { id: "k26", ch: 13, topic: "13.5 Mechanisms",
    q: "What is an elementary step?", qk: "elementary step",
    a: "An [[elementary step]] is a [[single|simple]] molecular-level reaction that makes up one step of a mechanism. Its rate law can be written directly from its [[coefficients|stoichiometry|molecularity]].",
    ko: "메커니즘을 이루는 단일 분자 수준의 반응. 계수가 곧 차수." },

  { id: "k27", ch: 13, topic: "13.5 Mechanisms",
    q: "Define reaction mechanism.", qk: "반응 메커니즘",
    a: "A [[reaction mechanism]] is the [[sequence|series]] of [[elementary steps]] that leads to product formation. The steps must [[add up|sum]] to the overall [[balanced equation|overall reaction]].",
    ko: "생성물을 만드는 elementary step 들의 순서. 합하면 전체 반응식이 된다." },

  { id: "k28", ch: 13, topic: "13.5 Mechanisms",
    q: "What is a reaction intermediate?", qk: "중간체",
    a: "An [[intermediate]] is a species that is [[formed|produced|generated]] in one elementary step and [[consumed|used up]] in a later step. It does [[not appear|cancel]] in the overall equation.",
    ko: "한 단계에서 생성되고 다음 단계에서 소모되는 물질. 전체 반응식에는 나타나지 않는다." },

  { id: "k29", ch: 13, topic: "13.5 Mechanisms",
    q: "What is the rate-determining step?", qk: "속도 결정 단계",
    a: "The [[rate-determining step]] is the [[slowest]] step in the mechanism. It [[limits|controls|determines]] the overall reaction rate, like the narrowest stretch of a road limits traffic.",
    ko: "가장 느린 단계. 전체 반응 속도를 좌우한다." },

  { id: "k30", ch: 13, topic: "13.5 Mechanisms",
    q: "How is the rate law derived from a mechanism when the rate-determining step contains an intermediate?", qk: "rds 에 중간체가 들어 있을 때",
    a: "The rate law cannot contain an [[intermediate]]. Use the preceding fast [[equilibrium|reversible]] step, where the forward rate equals the [[reverse rate|reverse reaction rate]], to express the intermediate's concentration in terms of the [[reactants]].",
    ko: "앞의 빠른 가역 단계에서 정반응 속도 = 역반응 속도로 중간체 농도를 반응물 농도로 바꾼다. (예: H₂ + I₂ → 2HI)" },

  { id: "k31", ch: 13, topic: "13.5 Mechanisms",
    q: "What two requirements must a proposed mechanism satisfy?", qk: "타당한 메커니즘의 조건",
    a: "(1) The elementary steps must [[add|sum]] to the [[overall equation|overall balanced equation]]. (2) The rate law predicted from the [[rate-determining step|slow step]] must agree with the [[experimental|observed|experimentally determined]] rate law.",
    ko: "① 단계의 합 = 전체 반응식 ② rds 로 얻은 속도식 = 실험 속도식." },

  { id: "k32", ch: 13, topic: "13.5 Mechanisms",
    q: "How can the rate-determining step be identified on an energy diagram?", qk: "에너지 다이어그램에서 rds",
    a: "The rate-determining step is the step with the [[highest|largest]] [[activation energy]], i.e. the [[highest peak|highest energy barrier]] on the diagram.",
    ko: "활성화 에너지가 가장 큰(가장 높은 봉우리) 단계." },

  { id: "k33", ch: 13, topic: "13.5 Mechanisms",
    q: "Distinguish unimolecular, bimolecular and termolecular elementary steps.", qk: "분자도(molecularity)", sup: true,
    a: "In a [[unimolecular]] step one molecule reacts, in a [[bimolecular]] step two species collide, and in a [[termolecular]] step three species collide (which is rare).",
    ko: "1분자 / 2분자 / 3분자 단계. 3분자는 드물다." },

  { id: "k34", ch: 13, topic: "13.6 Catalysis", x: true,
    q: "What is a catalyst and how does it work?", qk: "촉매 (범위 제외 표시)",
    a: "A [[catalyst]] is a substance that [[increases|speeds up]] the rate of a reaction by [[lowering|decreasing]] the [[activation energy]], providing an [[alternative|different]] reaction pathway. It is [[not consumed|regenerated|not used up]] in the overall reaction.",
    ko: "활성화 에너지를 낮추는 다른 경로를 제공해 속도를 높이고, 소모되지 않는 물질." },

  { id: "k35", ch: 13, topic: "13.5 Mechanisms", x: true,
    q: "How can experimental evidence support a proposed mechanism?", qk: "메커니즘의 실험적 근거 (범위 제외 표시)",
    a: "By [[detecting|identifying|isolating]] a proposed [[intermediate]] in the reacting mixture, or by testing a [[prediction|predicted effect]] of the mechanism, e.g. irradiating I2 produces I atoms and speeds up HI formation.",
    ko: "중간체를 직접 검출하거나, 메커니즘이 예측하는 현상(빛을 쬐면 I 원자 증가 → HI 생성 가속)을 확인한다." },

  /* ===================== 14 Chemical Equilibrium ===================== */
  { id: "e01", ch: 14, topic: "14.1 Equilibrium",
    q: "Define chemical equilibrium.", qk: "화학 평형의 정의",
    a: "[[Chemical equilibrium]] is the state in which the rates of the [[forward]] and [[reverse]] reactions are [[equal]] and the [[concentrations]] of reactants and products remain [[constant]].",
    ko: "정반응과 역반응의 속도가 같고, 반응물·생성물의 농도가 일정하게 유지되는 상태." },

  { id: "e02", ch: 14, topic: "14.1 Equilibrium",
    q: "Why is chemical equilibrium called a dynamic equilibrium?", qk: "왜 '동적' 평형인가?",
    a: "Because the forward and reverse reactions [[continue|keep occurring|keep going]] at the [[same rate|equal rates]], so there is no [[net change]] in concentrations even though molecules are still reacting.",
    ko: "두 반응이 같은 속도로 계속 일어나서 순변화만 없는 것." },

  { id: "e03", ch: 14, topic: "14.1 Equilibrium",
    q: "Write the equilibrium constant expression for aA + bB ⇌ cC + dD.", qk: "평형 상수 식",
    a: "K = [C]^c[D]^d / ([A]^a[B]^b): the [[equilibrium concentrations|concentrations at equilibrium]] of the [[products]] over the [[reactants]], each raised to the power of its [[stoichiometric coefficient|coefficient]].",
    ko: "평형 농도의 (생성물^계수) / (반응물^계수)." },

  { id: "e04", ch: 14, topic: "14.1 Equilibrium",
    q: "On what does the value of K depend?", qk: "K 는 무엇에 의존?",
    a: "At a given [[temperature]] K is [[constant|the same]] regardless of the [[initial concentrations|starting concentrations|initial amounts]]. It changes only when the temperature changes.",
    ko: "같은 온도에서는 처음 농도와 무관하게 일정. 온도가 바뀔 때만 변한다." },

  { id: "e05", ch: 14, topic: "14.1 Equilibrium",
    q: "What does the magnitude of K tell us about an equilibrium?", qk: "K 의 크기의 의미",
    a: "If K ≫ 1 the equilibrium lies to the [[right|products side]] and favors [[products]]; if K ≪ 1 it lies to the [[left|reactants side]] and favors [[reactants]].",
    ko: "K ≫ 1 → 생성물 유리(오른쪽), K ≪ 1 → 반응물 유리(왼쪽)." },

  { id: "e06", ch: 14, topic: "14.1 Equilibrium",
    q: "Distinguish Kc from Kp and state how they are related.", qk: "Kc 와 Kp, 둘의 관계",
    a: "Kc is written with [[molar concentrations|concentrations|mol/L]], Kp with [[partial pressures|pressures]] (atm) of gases. Kp = Kc(0.0821T)^Δn, where Δn = moles of gaseous [[products]] minus moles of gaseous [[reactants]].",
    ko: "Kc = 농도, Kp = 부분압. Kp = Kc(0.0821T)^Δn, Δn = 기체 생성물 mol − 기체 반응물 mol." },

  { id: "e07", ch: 14, topic: "14.1 Equilibrium",
    q: "What is a homogeneous equilibrium?", qk: "균일 평형",
    a: "A [[homogeneous equilibrium]] is one in which all the reacting species are in the [[same phase|one phase]].",
    ko: "모든 물질이 같은 상(예: 모두 기체)에 있는 평형." },

  { id: "e08", ch: 14, topic: "14.1 Equilibrium", x: true,
    q: "What is a heterogeneous equilibrium and how are pure solids and liquids treated in K?", qk: "불균일 평형 (범위 제외 표시, 문제 14.22 에 등장)",
    a: "A [[heterogeneous equilibrium]] involves reactants and products in [[different phases]]. Pure [[solids]] and [[liquids]] are [[omitted|left out|not included]] from the K expression because their concentrations are constant.",
    ko: "상이 다른 평형. 순수한 고체·액체는 K 식에서 제외(예: CaCO₃(s) ⇌ CaO(s) + CO₂(g) → Kp = P_CO₂)." },

  { id: "e09", ch: 14, topic: "14.2 Form of K",
    q: "How does K change when the equilibrium equation is reversed?", qk: "반응식을 뒤집으면 K 는?",
    a: "The new equilibrium constant is the [[reciprocal|inverse|1/K]] of the original: K' = 1/K.",
    ko: "역수가 된다." },

  { id: "e10", ch: 14, topic: "14.2 Form of K",
    q: "How does K change when all coefficients of the equation are multiplied by n?", qk: "계수를 n 배 하면 K 는?",
    a: "The new equilibrium constant is the original K [[raised to the power n|to the nth power|K^n]]. For example, halving the coefficients gives the [[square root]] of K.",
    ko: "K 의 n 제곱. (½ 배 → 제곱근)" },

  { id: "e11", ch: 14, topic: "14.2 Form of K",
    q: "How is K obtained when two equilibrium equations are added?", qk: "반응식을 더하면 K 는?",
    a: "The equilibrium constant of the overall reaction is the [[product|multiplication]] of the individual constants: K = K1 × K2.",
    ko: "각 K 의 곱." },

  { id: "e12", ch: 14, topic: "14.3 Kinetics and equilibrium",
    q: "Show how the equilibrium constant is related to the forward and reverse rate constants.", qk: "K = kf / kr",
    a: "At equilibrium the [[forward rate|rate of the forward reaction]] equals the [[reverse rate|rate of the reverse reaction]]: kf[reactants] = kr[products]. Rearranging gives Kc = [[kf/kr|kf over kr|ratio of the rate constants]].",
    ko: "평형에서 정반응 속도 = 역반응 속도 → Kc = kf/kr (한 단계 반응일 때)." },

  { id: "e13", ch: 14, topic: "14.3 Kinetics and equilibrium",
    q: "Explain, using rates, why K is constant at a given temperature.", qk: "K 가 일정한 이유 (속도론)",
    a: "K equals the ratio kf/kr, and both [[rate constants]] are [[constant|fixed]] at a given [[temperature]]. Hence their ratio, and therefore K, is also constant.",
    ko: "kf, kr 모두 온도가 같으면 상수이므로 비(K)도 상수." },

  { id: "e14", ch: 14, topic: "14.4 Q and ICE",
    q: "What is the reaction quotient Q and how is it used?", qk: "반응 지수 Q",
    a: "The [[reaction quotient]] Q has the [[same form|same expression]] as K but uses the concentrations (or pressures) at [[any time|any moment|a given instant|initial]]. Comparing Q with K [[predicts|shows]] the direction in which the reaction proceeds to reach equilibrium.",
    ko: "K 와 같은 식이지만 임의 시점(보통 초기)의 농도를 넣은 값. Q 와 K 를 비교해 진행 방향 예측." },

  { id: "e15", ch: 14, topic: "14.4 Q and ICE",
    q: "What happens if Q < K?", qk: "Q < K 이면?",
    a: "The ratio of [[products]] to reactants is too [[small|low]]; the net reaction proceeds to the [[right|forward direction]] (reactants → products) until Q = K.",
    ko: "생성물 비가 너무 작음 → 정반응(오른쪽)으로 진행해 Q = K 가 될 때까지." },

  { id: "e16", ch: 14, topic: "14.4 Q and ICE",
    q: "What happens if Q > K?", qk: "Q > K 이면?",
    a: "The ratio of products to reactants is too [[large|high]]; the net reaction proceeds to the [[left|reverse direction]] (products → reactants) until Q = K.",
    ko: "생성물 비가 너무 큼 → 역반응(왼쪽)으로 진행." },

  { id: "e17", ch: 14, topic: "14.4 Q and ICE",
    q: "Describe the ICE method for calculating equilibrium concentrations.", qk: "ICE 방법",
    a: "Make a table of [[Initial]], [[Change]] and [[Equilibrium]] concentrations. Express the changes in terms of x using the [[stoichiometric|coefficient|mole]] ratios, substitute the equilibrium expressions into [[K]], and solve for x.",
    ko: "I(초기) → C(계수 비로 ±x) → E 를 K 식에 대입해 x 를 구한다." },

  { id: "e18", ch: 14, topic: "14.5 Le Chatelier",
    q: "State Le Châtelier's principle.", qk: "르샤틀리에 원리",
    a: "If an external [[stress]] is applied to a system at equilibrium, the system [[adjusts|shifts|responds]] in such a way that the stress is [[partially offset|partly counteracted|reduced]] as it reaches a new equilibrium position.",
    ko: "평형계에 외부 스트레스를 가하면 그 스트레스가 부분적으로 상쇄되도록 이동하여 새 평형에 도달한다." },

  { id: "e19", ch: 14, topic: "14.5 Le Chatelier",
    q: "How does changing a concentration affect an equilibrium and K?", qk: "농도 변화의 영향",
    a: "Adding a reactant (or removing a product) shifts the equilibrium to the [[right|products]]; adding a product (or removing a reactant) shifts it to the [[left|reactants]]. The value of K is [[unchanged|not changed|constant]].",
    ko: "반응물 추가/생성물 제거 → 오른쪽, 생성물 추가/반응물 제거 → 왼쪽. K 는 그대로." },

  { id: "e20", ch: 14, topic: "14.5 Le Chatelier",
    q: "How does a change in pressure (volume) affect a gas-phase equilibrium?", qk: "압력·부피 변화의 영향",
    a: "Increasing the pressure (decreasing the volume) shifts the equilibrium toward the side with [[fewer|fewer moles|smaller number of moles]] of [[gas]]; decreasing it shifts toward the side with more moles of gas. If the moles of gas are [[equal]] on both sides there is no shift. K is unchanged.",
    ko: "압력↑(부피↓) → 기체 몰수가 적은 쪽, 압력↓ → 많은 쪽. 몰수가 같으면 이동 없음. K 불변." },

  { id: "e21", ch: 14, topic: "14.5 Le Chatelier",
    q: "How does a change in temperature affect an equilibrium and K?", qk: "온도 변화의 영향",
    a: "Raising the temperature favors the [[endothermic]] direction: K [[increases|gets larger]] for an endothermic reaction and [[decreases|gets smaller]] for an exothermic reaction. Lowering the temperature has the opposite effect.",
    ko: "온도↑ → 흡열 방향으로 이동. 흡열 반응은 K 증가, 발열 반응은 K 감소. 온도↓ 는 반대." },

  { id: "e22", ch: 14, topic: "14.5 Le Chatelier",
    q: "Which changes alter the value of K, and which only shift the position of equilibrium?", qk: "K 를 바꾸는 요인 vs 위치만 바꾸는 요인",
    a: "Only a change in [[temperature]] alters the value of K. Changes in [[concentration]], [[pressure|volume]] change only the equilibrium [[position]] and leave K unchanged.",
    ko: "K 를 바꾸는 건 온도뿐. 농도·압력·부피는 위치만 이동." },

  { id: "e23", ch: 14, topic: "14.5 Le Chatelier",
    q: "Use Q to explain why compressing N2O4 ⇌ 2NO2 shifts the equilibrium to the left.", qk: "압축하면 왼쪽으로 가는 이유 (Q 로 설명)",
    a: "Compression raises both concentrations, but Qc = [NO2]^2/[N2O4] increases more because [NO2] is [[squared]]. Thus Qc [[>|greater than|larger than]] Kc and the reaction shifts [[left|to the left|toward N2O4]] until Qc = Kc.",
    ko: "압축 시 두 농도 모두 증가하지만 분자의 [NO₂]² 때문에 Q 가 더 커져 Q > K → 왼쪽(N₂O₄)으로 이동." },

  { id: "e24", ch: 14, topic: "14.5 Le Chatelier", sup: true,
    q: "What is the effect of a catalyst on an equilibrium?", qk: "촉매가 평형에 미치는 영향",
    a: "A catalyst [[does not change|has no effect on]] the equilibrium [[position|composition]] or the value of K; it speeds up the forward and reverse reactions [[equally]], so equilibrium is reached [[faster|more quickly]].",
    ko: "평형 위치·K 모두 불변. 정·역반응을 똑같이 빠르게 해 평형 도달 시간만 단축." },

  { id: "e25", ch: 14, topic: "14.1 Equilibrium",
    q: "Can an equilibrium be approached from both directions?", qk: "양쪽 방향에서 평형 도달?",
    a: "Yes. Starting with only [[reactants]], only [[products]], or any mixture, the system reaches an equilibrium with the [[same|equal]] value of K at a given temperature.",
    ko: "예. 반응물만, 생성물만, 혼합물로 시작해도 같은 K 를 갖는 평형에 도달." },

  /* ===================== 15 Acids and Bases ===================== */
  { id: "a01", ch: 15, topic: "15.1 Brønsted · Lewis",
    q: "Define Brønsted acid and Brønsted base.", qk: "Brønsted 산·염기",
    a: "A [[Brønsted acid|Bronsted acid]] is a substance that can [[donate|give]] a [[proton|H+|hydrogen ion]]; a Brønsted base is a substance that can [[accept|receive]] a proton.",
    ko: "산 = 양성자 주개(donor), 염기 = 양성자 받개(acceptor)." },

  { id: "a02", ch: 15, topic: "15.1 Brønsted · Lewis",
    q: "What is a conjugate acid–base pair?", qk: "짝산-짝염기 쌍",
    a: "A [[conjugate acid–base pair|conjugate pair]] is an acid and its [[conjugate base]] (or a base and its [[conjugate acid]]); they differ by [[one proton|a single H+|one H+]]. The conjugate base is what remains after the acid [[loses|donates]] a proton.",
    ko: "H⁺ 하나 차이 나는 산과 염기. 산이 H⁺ 를 잃고 남은 것이 짝염기." },

  { id: "a03", ch: 15, topic: "15.1 Brønsted · Lewis",
    q: "What must a Brønsted base have in order to accept a proton?", qk: "Brønsted 염기의 구조적 조건",
    a: "The atom that accepts the H+ must have at least one [[lone pair|unshared pair|nonbonding pair]] of electrons.",
    ko: "H⁺ 를 받는 원자에 비공유 전자쌍이 있어야 한다. (NH₃, OH⁻)" },

  { id: "a04", ch: 15, topic: "15.1 Brønsted · Lewis",
    q: "Why is water described as amphoteric?", qk: "물이 양쪽성인 이유",
    a: "Water can act as an [[acid]] (donating a proton, as in its reaction with NH3) and as a [[base]] (accepting a proton, as in its reaction with HCl).",
    ko: "NH₃ 와는 산으로, HCl 과는 염기로 작용." },

  { id: "a05", ch: 15, topic: "15.1 Brønsted · Lewis",
    q: "Define Lewis acid and Lewis base.", qk: "Lewis 산·염기",
    a: "A [[Lewis acid]] is a substance that can [[accept|receive]] a [[pair of electrons|electron pair|lone pair]]; a [[Lewis base]] is a substance that can [[donate|give]] a pair of electrons.",
    ko: "Lewis 산 = 전자쌍 받개, Lewis 염기 = 전자쌍 주개." },

  { id: "a06", ch: 15, topic: "15.1 Brønsted · Lewis",
    q: "Why is the Lewis definition more general than the Brønsted definition? Give an example.", qk: "Lewis 정의가 더 일반적인 이유",
    a: "The Lewis definition does not require a [[proton|H+|hydrogen ion]], so it includes reactions without H+ transfer. For example, in BF3 + NH3 → F3B–NH3, NH3 donates a lone pair (Lewis [[base]]) to BF3 (Lewis [[acid]]), forming an [[adduct|coordinate covalent bond|new bond]].",
    ko: "H⁺ 가 없는 반응도 설명(BF₃ + NH₃ → 부가물). BF₃ = acid, NH₃ = base." },

  { id: "a07", ch: 15, topic: "15.2 Water",
    q: "What is the autoionization of water?", qk: "물의 자동이온화",
    a: "The [[autoionization]] of water is the reaction in which two water molecules react to form [[H3O+|hydronium|H+]] and [[OH-|hydroxide|OH−]]: H2O + H2O ⇌ H3O+ + OH−, which occurs to a very small extent.",
    ko: "물 분자끼리 반응해 H₃O⁺ 와 OH⁻ 를 소량 만드는 평형." },

  { id: "a08", ch: 15, topic: "15.2 Water",
    q: "Define Kw and give its value at 25 °C.", qk: "Kw 의 정의와 값",
    a: "Kw is the [[ion-product constant|ion product|equilibrium constant for the autoionization]] of water: Kw = [H+][OH−] = [[1.0 × 10^-14|1.0e-14|1e-14|1 × 10^-14|1x10^-14|10^-14]] at 25 °C.",
    ko: "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (25 °C). 산·염기 용액에서도 항상 성립." },

  { id: "a09", ch: 15, topic: "15.2 Water",
    q: "Define neutral, acidic and basic solutions in terms of [H+] and [OH−].", qk: "중성·산성·염기성 정의",
    a: "In a [[neutral]] solution [H+] = [OH−]; in an [[acidic]] solution [H+] > [OH−]; in a [[basic|alkaline]] solution [H+] < [OH−].",
    ko: "중성: [H⁺] = [OH⁻], 산성: [H⁺] > [OH⁻], 염기성: [H⁺] < [OH⁻]." },

  { id: "a10", ch: 15, topic: "15.3 pH",
    q: "Define pH.", qk: "pH 의 정의",
    a: "The [[pH]] of a solution is the [[negative logarithm|negative log|−log|-log]] of the [[hydrogen ion|hydronium ion|H+|H3O+]] concentration in mol/L: pH = −log[H+].",
    ko: "pH = −log[H⁺]. [H⁺] = 10^(−pH)." },

  { id: "a11", ch: 15, topic: "15.3 pH",
    q: "Define pOH and state the relation between pH and pOH at 25 °C.", qk: "pOH 와 pH + pOH",
    a: "pOH = [[−log[OH−]|-log[OH-]|negative logarithm of the hydroxide ion concentration|negative log of OH-]]. At 25 °C, pH + pOH = [[14.00|14]].",
    ko: "pOH = −log[OH⁻], pH + pOH = 14.00 (Kw 에서 유도)." },

  { id: "a12", ch: 15, topic: "15.4 Strength",
    q: "What is a strong acid? Give examples.", qk: "강산의 정의와 예",
    a: "A [[strong acid]] is a strong [[electrolyte]] that is assumed to [[ionize completely|completely ionize|dissociate completely]] in water, e.g. [[HCl]], [[HNO3]], [[HClO4]] and H2SO4 (first ionization).",
    ko: "물에서 완전 이온화하는 강전해질: HCl, HNO₃, HClO₄, H₂SO₄(1단계), HBr, HI." },

  { id: "a13", ch: 15, topic: "15.4 Strength",
    q: "What is a weak acid? Give examples.", qk: "약산의 정의와 예",
    a: "A [[weak acid]] ionizes only to a [[limited|small|slight|partial]] extent in water, so at equilibrium the solution contains [[nonionized|undissociated|unionized]] acid molecules, H3O+ ions and the conjugate base. Examples: [[HF]], [[CH3COOH|acetic acid]], NH4+.",
    ko: "일부만 이온화. 평형에서 비이온화 분자 + H₃O⁺ + 짝염기 공존. (HF, CH₃COOH, NH₄⁺)" },

  { id: "a14", ch: 15, topic: "15.4 Strength",
    q: "What are strong bases? Give examples.", qk: "강염기",
    a: "[[Strong bases]] are strong electrolytes that ionize [[completely]] in water. They are the [[hydroxides]] of the alkali metals and of some alkaline earth metals, e.g. [[NaOH]], [[KOH]] and [[Ba(OH)2]].",
    ko: "물에서 완전 이온화: 알칼리 금속 수산화물, Ba(OH)₂ 등." },

  { id: "a15", ch: 15, topic: "15.4 Strength",
    q: "Explain why ammonia is a weak base and how it produces OH−.", qk: "암모니아가 약염기인 이유와 OH⁻ 생성",
    a: "Ammonia is a weak electrolyte that ionizes only to a [[limited|small|slight]] extent. NH3 does not donate a proton; it [[accepts|takes]] a [[proton|H+]] from water to form [[NH4+|ammonium]] and [[OH-|hydroxide|OH−]].",
    ko: "NH₃ 는 물에서 H⁺ 를 받아 NH₄⁺ + OH⁻ 를 소량 생성하는 약염기." },

  { id: "a16", ch: 15, topic: "15.4 Strength",
    q: "How are the strength of an acid and the strength of its conjugate base related?", qk: "산의 세기와 짝염기의 세기",
    a: "The [[stronger|strong]] an acid is, the [[weaker|weak]] its conjugate base is, and vice versa. For example Cl− (conjugate base of the strong acid HCl) is an extremely weak base.",
    ko: "강한 산 ↔ 약한 짝염기 (반대로도 성립)." },

  { id: "a17", ch: 15, topic: "15.5 Weak acids",
    q: "Define the acid ionization constant Ka and explain what its magnitude tells us.", qk: "Ka 의 정의와 크기의 의미",
    a: "Ka = [H+][A−]/[HA] is the [[equilibrium constant|constant]] for the [[ionization|dissociation]] of a weak acid. The [[larger|greater|bigger]] the Ka, the [[stronger]] the acid. Only [[weak]] acids have Ka values.",
    ko: "Ka = [H⁺][A⁻]/[HA]. 클수록 강한 산. 약산에만 Ka 를 쓴다." },

  { id: "a18", ch: 15, topic: "15.5 Weak acids",
    q: "When may the approximation [HA]0 − x ≈ [HA]0 be used for a weak acid? What if it fails?", qk: "5 % 규칙",
    a: "The approximation is valid if x is [[small|less than]] [[5%|5 percent|five percent]] of the initial concentration, i.e. (x/[HA]0) × 100% < 5%. Otherwise the [[quadratic equation|quadratic formula|quadratic]] must be used (discarding the [[negative]] root).",
    ko: "x/[HA]₀ × 100 % < 5 % 이면 근사 OK. 아니면 이차방정식(음수 해 버림)." },

  { id: "a19", ch: 15, topic: "15.5 Weak acids",
    q: "Why is the [H+] of a weak acid solution much smaller than the acid concentration?", qk: "약산 용액의 [H⁺] 가 작은 이유",
    a: "A weak acid [[ionizes only partially|partially ionizes|ionizes slightly]]: the equilibrium lies far to the [[left|reactant side|nonionized side]], so most of the acid remains as [[HA|molecules|undissociated]]. A strong acid ionizes completely, so [H+] equals its concentration.",
    ko: "약산은 부분 이온화(평형이 왼쪽에 치우침). 강산은 완전 이온화라 [H⁺] = 산 농도." },

  { id: "a20", ch: 15, topic: "15.5 Weak acids",
    q: "Outline how to calculate the pH of a weak acid solution.", qk: "약산 pH 계산 절차",
    a: "Write the ionization equation and the [[Ka]] expression; set up an [[ICE|initial change equilibrium]] table with x = [H+]; solve x²/([HA]0 − x) = Ka (using the [[5%|approximation]] check or the [[quadratic]] formula); then pH = −log x.",
    ko: "반응식·Ka 식 → ICE → x²/(C₀−x) = Ka 풀기(5 % 검사/이차방정식) → pH = −log x." },

  { id: "a21", ch: 15, topic: "15.6 Weak bases",
    q: "Define the base ionization constant Kb.", qk: "Kb 의 정의",
    a: "Kb is the [[equilibrium constant|constant]] for the [[ionization|reaction with water]] of a weak base, e.g. Kb = [NH4+][OH−]/[NH3]. The concentration of [[water|H2O]] is treated as a constant and is included in Kb.",
    ko: "약염기 이온화의 평형 상수. 예: Kb(NH₃) = [NH₄⁺][OH⁻]/[NH₃]. 물 농도는 상수로 Kb 에 포함." },

  { id: "a22", ch: 15, topic: "15.7 Ka·Kb = Kw",
    q: "State the relationship between Ka of an acid and Kb of its conjugate base.", qk: "Ka·Kb = Kw",
    a: "Ka × Kb = [[Kw|1.0 × 10^-14|1.0e-14]]; equivalently Ka = Kw/Kb and Kb = Kw/Ka, and pKa + pKb = [[14]] (at 25 °C).",
    ko: "Ka × Kb = Kw. 산이 약할수록 짝염기가 강하다." },

  { id: "a23", ch: 15, topic: "15.8 Polyprotic acids",
    q: "How do diprotic and polyprotic acids ionize?", qk: "다양성자산의 이온화",
    a: "They ionize in a [[stepwise|step by step|successive]] manner, losing one [[proton|H+]] at a time, and each stage has its own [[ionization constant|Ka]] (Ka1, Ka2, …).",
    ko: "H⁺ 를 한 번에 하나씩 차례로 내놓으며 단계마다 Ka 가 있다." },

  { id: "a24", ch: 15, topic: "15.8 Polyprotic acids", sup: true,
    q: "Why is Ka2 much smaller than Ka1?", qk: "Ka2 ≪ Ka1 인 이유",
    a: "It is harder to remove a proton from an [[anion|negatively charged ion]] than from a neutral molecule because of the greater [[electrostatic attraction|attraction|negative charge]] holding the proton.",
    ko: "음이온에서 H⁺ 를 떼는 것이 더 어렵기 때문(정전기적 인력)." },

  { id: "a25", ch: 15, topic: "15.8 Polyprotic acids",
    q: "In a diprotic acid solution (Ka1 ≫ Ka2), what is the concentration of the A²⁻ ion?", qk: "이양성자산에서 [A²⁻]",
    a: "Because the second ionization is very small, [H+] ≈ [HA−] from the [[first]] ionization, and [A2−] ≈ [[Ka2]] (numerically).",
    ko: "[H⁺] ≈ [HA⁻] ≈ 1단계 값 → [A²⁻] ≈ Ka₂." },

  { id: "a26", ch: 15, topic: "15.4 Strength",
    q: "How do you find [OH−] in a solution of the strong base Ba(OH)2?", qk: "Ba(OH)₂ 의 [OH⁻]",
    a: "Ba(OH)2 ionizes completely and releases [[two]] hydroxide ions per formula unit, so [OH−] = [[2 ×|twice|double]] the concentration of Ba(OH)2.",
    ko: "[OH⁻] = 2 × [Ba(OH)₂]. 그다음 pOH → pH." },

  { id: "a27", ch: 15, topic: "15.8 Polyprotic acids",
    q: "How does sulfuric acid differ from other diprotic acids?", qk: "H₂SO₄ 의 특이점",
    a: "The first ionization of H2SO4 is [[complete|strong|100%]], while the second ionization of HSO4− is [[weak]] (Ka = 1.3 × 10^-2).",
    ko: "1단계는 강산(완전), 2단계 HSO₄⁻ 는 약산(Ka = 1.3×10⁻²)." },

  { id: "a28", ch: 15, topic: "15.9 Structure", x: true,
    q: "What molecular factors influence the strength of an acid HX?", qk: "산의 세기와 분자 구조 (범위 제외 표시)",
    a: "The strength depends on the [[bond strength|strength of the H–X bond]] and the [[polarity]] of the bond: a weaker, more polar H–X bond and a more stable conjugate base give a [[stronger]] acid.",
    ko: "H–X 결합이 약하고 극성이 클수록, 짝염기가 안정할수록 강한 산." },

  { id: "a29", ch: 15, topic: "15.10 Salts", x: true,
    q: "What is salt hydrolysis? Which ions make a solution basic or acidic?", qk: "염의 가수분해 (범위 제외 표시)",
    a: "[[Salt hydrolysis]] is the reaction of an anion or cation of a salt (or both) with [[water]]. The anion of a [[weak acid]] (e.g. CH3COO−) makes the solution basic; the cation of a [[weak base]] (e.g. NH4+) makes it acidic; ions of strong acids and bases give a [[neutral]] solution.",
    ko: "약산의 음이온 → 염기성, 약염기의 양이온 → 산성, 강산·강염기에서 온 이온 → 중성." },

  { id: "a30", ch: 15, topic: "15.11 Oxides", x: true,
    q: "Classify metal oxides and nonmetal oxides as acidic or basic.", qk: "산화물의 산·염기성 (범위 제외 표시)",
    a: "[[Metal|metallic]] oxides (e.g. Na2O) are generally [[basic]], [[nonmetal|nonmetallic]] oxides in high oxidation states (e.g. CO2, SO3) are [[acidic]], and some oxides such as Al2O3 are [[amphoteric]].",
    ko: "금속 산화물 = 염기성, 비금속 산화물 = 산성, Al₂O₃ 등은 양쪽성." }
];
