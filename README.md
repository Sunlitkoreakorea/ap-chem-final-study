# AP Chemistry I — 기말 총정리 (Ch 13–15)

13 Chemical Kinetics · 14 Chemical Equilibrium · 15 Acids and Bases 를 한 곳에서 공부하는 정적 웹사이트입니다.

| 탭 | 내용 |
| --- | --- |
| **학습** | 단원별 개념·공식 정리, 교재 예제 풀이(HW 표시 포함), 인터랙티브 위젯(차수별 그래프, Q vs K, pH 슬라이더), 한 장 요약, 자주 하는 실수 |
| **개념 암기** | “…을 정의하시오” 유형 대비. 영어 모범답안 71개를 플래시카드 · 쓰기 연습(핵심어 채점) · 빈칸 채우기 · 목록/검색 4가지 방식으로 암기 |
| **문제 풀이** | 교재·AP 스타일 문제 56개(자동 채점·풀이·오답 노트) + 숫자가 매번 바뀌는 랜덤 문제 12유형 |

- **시험 범위 밖** 항목은 취소선/‘범위 제외’ 상자로 구분하고, 개념 암기·문제 풀이에서는 기본으로 숨깁니다(‘범위 밖 항목 포함’을 켜면 볼 수 있어요).
  - 슬라이드에 **빨간 X** 가 표시된 부분: Experimental support for mechanisms, Catalysis, Heterogeneous / Multiple equilibria, 15.9–15.11
  - 선생님 안내로 제외된 **1·2차 반응(13.3: 적분 속도식 · 반감기 · 0차 포함)**
  - 슬라이드에 없는 교재 보충 개념 카드(분자도, 온도와 속도의 관계 설명, 촉매의 평형 영향 등)
- 진행 상황(암기 표시, 푼 문제)은 브라우저 `localStorage` 에만 저장되며 서버로 전송되지 않습니다.

## 로컬에서 실행

빌드 과정이 없는 순수 HTML/CSS/JS 입니다.

```bash
python -m http.server 8000
# → http://localhost:8000
```

## 구조

```
index.html            # 레이아웃 + 학습 탭 본문
css/style.css
js/app.js             # 탭·위젯·암기·문제 풀이 로직
js/data-concepts.js   # 개념 카드 (핵심어는 [[용어|동의어]] 형식)
js/data-problems.js   # 정적 문제 은행
js/generators.js      # 랜덤 문제 생성기
vendor/katex/         # KaTeX 0.16.9 (MIT) + mhchem — 수식/화학식 렌더링
```

## 참고

수업 슬라이드(Chang, *Chemistry* 기반)를 바탕으로 직접 정리한 개인 학습 자료입니다. 문제 문장은 새로 작성했고 정답은 직접 계산해 검증했지만, 시험 전에는 선생님 풀이와 꼭 대조하세요.
