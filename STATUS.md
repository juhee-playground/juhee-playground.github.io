# 프로젝트 상태 점검 (renew/#1)

> 점검일: 2026.10.17
> 브랜치: `renew/#1` (main 대비 **75커밋** 앞섬)
> 빌드: `yarn build` ✅ 성공 (에러 없음)
> 미커밋 변경: `STATUS.md` (본 문서)만 untracked

이 문서는 renew 피처 작업의 현재 진행 상황과 남은 할 일을 정리한 점검 문서입니다.

---

## 1. 프로젝트 개요

개인 이력서/포트폴리오 사이트. 게임보이(8bitdo) 테마를 모티브로 한 인터랙티브 포트폴리오.

| 분류 | 기술 |
|------|------|
| 언어/프레임워크 | TypeScript, React |
| 스타일링 | Tailwind CSS + MUI |
| 애니메이션 | framer-motion |
| 상태 관리 | Zustand (`useSettings`) |
| 데이터 패칭 | React Query |
| 차트 | D3.js |
| 데이터 소스 | Notion API + 로컬 JSON fallback |
| 빌드/배포 | Vite, Yarn, GitHub Actions + gh-pages |

**라우트 구성**

| 경로 | 페이지 |
|------|--------|
| `/` | 랜딩 (게임보이 UI, 인트로 전용) |
| `/portfolio` | 포트폴리오 (메인 허브) |
| `/resume` | 이력서 |
| `/dashboard` | 대시보드 (D3 차트) |
| `/projects` | 프로젝트 목록 |
| `/projects/:slug` | 케이스 스터디 상세 |

---

## 2. renew 브랜치에서 지금까지 한 일

### 2-1. 게임보이 / 8bitdo 테마 디자인 전환
- 포트폴리오 페이지 게임보이 UI 전환
- 칩 / 카드 / 보더 8bit 스타일 적용
- 도트 포인트, 아이콘 픽셀화
- shell 스타일 3종 테마화 (`dmg` / `light` / `pocket`)
- point color에 맞춰 액센트 연동
- **DMG 배경 톤 조정** + 밝은 셸용 `accentText` (포인트 글자 대비)

### 2-2. 라우팅 / 헤더 재구성
- `/site` → `/portfolio` 라우트 리네이밍
- 모든 페이지 헤더 통일, 구조 정리
- 랜딩(게임보이)과 홈 세계관 분리 — 게임보이 페이지는 푸터에서만 진입
- 사이트맵 + 푸터 추가
- 설정 / 셸 토글 배치 정리

### 2-3. 데이터 실연동
- Notion `useCompaniesQuery` / `useProjectsQuery` 적용
- companyQuery 결과를 raw notion 구조가 아니라 바로 쓰도록 정리
- 이력서 데이터 새 방식에 맞게 반영
- stats / 프로젝트 수 하드코딩 제거 → 실제 데이터에서 집계
- `/projects` 목록 페이지를 `useProjectsQuery`(Notion)로 전환
- 회사 아이콘 추가

### 2-4. 카트리지 UI (최근) ✅
- Experience / Projects를 **게임 카트리지** 형태로 통일
- 공통 플라스틱 셸: `src/components/portfolio/cartShell.ts`
- 회사 팩: 베젤 · 리세스 라벨 · 삽입(insert) 애니메이션 유지
- 프로젝트 팩: 두꺼운 케이스 · 커넥터 핀 · 회사별 라벨 디코
- 틴들로 디코: **일간 타임라인** (월달력 X, 네온 라인 제거)
- light 셸: 순백/고스트, 회사 팩은 그림자로 배경과 구분

### 2-5. Overview / Current Status 카피 (최근) ✅
- Overview: **Product-Oriented Frontend Engineer** + 요약 + 불릿 4개
- Current Status: 틴들로 재직 · 6+ years · 사이드/포트폴리오 · Open to new opportunities
- `AS OF 2026.10` (이력서 기준)
- Stats Years Experience: **6+** 고정 (공백 구간 있어 재직 합산 대신 체감 연차)

---

## 3. ⚠️ 문서가 코드보다 뒤처져 있음

`OVERVIEW.md`가 실제 코드와 맞지 않음. 점검 중 발견한 괴리:

| OVERVIEW.md 설명 | 실제 코드 |
|---|---|
| `/site`, `src/pages/site`, `SiteSection` | `/portfolio`, `src/pages/portfolio` 로 변경 완료 |
| `TProject` 타입, `getProjectBySlug.ts` 중심 | 실제는 `Project` 타입, `DB_projects_site.ts` |
| "`/projects` 미완성 — Lambda 연동 예정" | 이미 `useProjectsQuery`(Notion)로 전환 완료 |
| "`/site` Stats 하드코딩" | 대시보드 PROJECTS stats는 Notion 데이터 기반으로 전환됨 |

➡️ OVERVIEW의 "미완성/예정" 체크리스트 중 절반 정도는 이미 끝난 상태.
➡️ **문서 현행화 필요** (`OVERVIEW.md`, `README.md`).

---

## 4. 남은 할 일 (코드 기준 실제 미완성)

### 📊 데이터 (가장 큰 덩어리)

- [ ] **대시보드 COMPANYS 카드 하드코딩 제거**
  - 현재: `Fitogether 4 / YU 1 / 틴들로 1` 수동 입력
  - timeline은 Notion 연동됐는데 이 카드만 하드코딩
  - 위치: `src/pages/dashboard/index.tsx`
- [ ] **대시보드 TECH USAGE 하드코딩 제거**
  - `COMPANY_TECH_BASE` (React 3 / Vue 5 / Php 2), `SIDE_TECH_ADDITIONS` 수동값
  - 위치: `src/pages/dashboard/index.tsx`
  - ➡️ 이미 `useCompaniesQuery`에 데이터가 있으니 timeline처럼 집계로 교체 가능
- [ ] **틴들로 데이터 넣었을 때 셀렉트(필터) 안 되는 문제** (블로커성)
- [ ] 노션 데이터 새로운 방식에 맞춰 수정
- [ ] 이력서에 틴들로 추가
- [ ] 1년 반 공백 기간 처리 방법 결정
- [ ] 사이드 프로젝트 추가: FPTI, Inside futsal, 교회 출석부
- [ ] `/projects` 상세 데이터 보강
  - 현재 로컬 목데이터 3개만 존재: OHCOACH Admin / OHCOACH Ultimate / 사내 ERP
  - 위치: `src/data/projects/DB_projects_site.ts`

### 🖼 케이스 스터디

- [ ] `/projects/:slug` Screenshots 섹션 미구현 (이미지 데이터 없음)
- [ ] 실제 케이스 스터디 내용 보강

### 🧹 리팩토링 / 정리

- [ ] 전반적 리팩토링 (데이터 문제 해결 후 진행 예정)
- [ ] `DChip.tsx`의 `FIXME` 해소 — 별도 ThemeProvider 붙인 이유 정리 필요
- [ ] `OVERVIEW.md` / `README.md` 현행화 (위 3번 참고)
- [ ] 회사 테마 객체에 쓰이지 않는 `shell` / `shellBorder` / `shellShadow` 필드 정리 (플라스틱은 `cartShell`로 이전됨)

### 🚀 배포

- [ ] 배포 에러 확인
  - 로컬 `yarn build`는 통과 → gh-pages 배포 단계 문제일 가능성
  - 확인 대상: `.github/workflows/autoBuild.yml`

---

## 5. 추천 다음 스텝 (임팩트 순)

1. **대시보드 COMPANYS / TECH 카드 하드코딩 제거**
   — 데이터가 이미 쿼리에 있어서 가장 깔끔하게 끝낼 수 있는 작업
2. **틴들로 셀렉트 버그 해결**
   — 데이터 신규 추가 시 필터가 깨지는 블로커
3. **OVERVIEW.md / README 현행화**
   — 지금 문서 믿고 작업하면 혼란 발생
4. **배포 에러 조사**
   — 로컬 빌드는 되므로 CI/워크플로우 쪽 점검
