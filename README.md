# CooperKang.github.io

JaeHa Kang이 만든 서비스를 모아 둔 허브입니다. <https://cooperkang.github.io/>

| 경로 | 내용 |
|---|---|
| `/` | 서비스 허브 (`index.html`) |
| `/family-tree/` | [우리 호칭](https://github.com/CooperKang/family-tree): 양가 가계도와 호칭 안내 |
| `/squash/` | [스쿼시 코트](https://github.com/CooperKang/squash): 스쿼시 규칙·장비, 라켓 추천, 대회 현황판, 미니 게임 |
| `/first-home/` | [첫 집 계산기](https://github.com/CooperKang/first-home): 대출 한도(LTV·스트레스 DSR·장래소득), 부대비용, 미래 저축, 전월세, 분양 자금 |

## 새 서비스 추가하기

1. 서비스 저장소에서 GitHub Pages를 켜면 `https://cooperkang.github.io/<저장소 이름>/`에서 열립니다. Vite 앱이면 `base: '/<저장소 이름>/'`로 빌드하세요.
2. 대표 화면을 `images/services/<저장소 이름>.png`로 넣습니다(가로 1400px 정도).
3. `index.html` 아래쪽 `SERVICES` 목록에 항목을 하나 추가합니다.
   - `font`, `accent`: 목록에서 서비스 이름을 그 서비스의 글꼴과 색으로 보여 줍니다. 새 글꼴이면 `<head>`의 Google Fonts 주소에도 넣으세요.
   - `sampleLabel`, `samples`: 줄에 마우스를 올리면(폰에서는 화면에 보이면) 차례로 바뀌는 한 줄 맛보기입니다.
   - `live`(선택): 문자열을 돌려주는 비동기 함수. 결과가 맛보기 맨 앞에 들어갑니다(예: 스쿼시의 다음 대회).
