# 포트폴리오 사이트 현황 정리

> 마지막 업데이트: 2026.03.04  
> 배포 주소: [https://juhee-playground.github.io](https://juhee-playground.github.io)

---

## 1. 프로젝트 개요

개인 이력서 포트폴리오 사이트. 채용 플랫폼에 종속되지 않고 동일한 이력서를 직접 제공하기 위해 시작한 개인 프로젝트.  
프린트 모드, 다크모드, 포인트 컬러 커스터마이징, 반응형까지 고려된 이력서 포맷을 목표로 함.

---

## 2. 페이지 구성

총 4개 라우트가 존재하며, 그 중 `/portfolio`는 현재 공사 중 상태.

| 경로 | 페이지 | 상태 |
|------|--------|------|
| `/` | 랜딩 (GameBoy UI) | ✅ 완성 |
| `/resume` | 이력서 | ✅ 완성 |
| `/dashboard` | 대시보드 | ✅ 완성 |
| `/portfolio` | 포트폴리오 | 🚧 공사 중 |

---

## 3. 각 페이지 상세

### 3-1. 랜딩 페이지 (`/`)

GameBoy 기기를 모티브로 한 인터랙티브 랜딩 페이지.

**상태 흐름:**
```
START → (A/Enter) → MENU → (A) → RESUME / DASHBOARD / PORTFOLIO
                          ← (B/Esc) ←
```

**화면(스크린) 콘텐츠:**

| 상태 | 화면 내용 |
|------|-----------|
| START | "JUHEE'S PLAYGROUND" + PRESS START 버튼 |
| MENU | RESUME / DASHBOARD 선택 메뉴 |
| RESUME | 3페이지짜리 이력서 요약 (SKILLS/EXP → PROFILE/CONTACT → EDUCATION/WORK) |
| DASHBOARD | 3페이지짜리 커리어 요약 (CAREER TIMELINE → STACK USAGE → RUNNING MODULES) |
| PORTFOLIO | 준비 중인 프로젝트 목록 UI |

**조작 방법:**
- 방향키(↑↓←→) : 메뉴 이동 / 페이지 넘기기
- `A` / `Enter` / `Space` : 선택
- `B` / `Esc` / `Backspace` : 뒤로
- `S` : START 버튼
- QUICK 버튼 : 이력서 페이지로 바로 이동
- 전원 버튼 : 화면 ON/OFF 토글 (powering-on/off 애니메이션 포함)

---

### 3-2. 이력서 페이지 (`/resume`)

2단 레이아웃 (왼쪽 사이드바 30% + 오른쪽 메인 영역 70%).

---

#### 왼쪽 패널 (LeftInfoPanel)

배경색이 다른 사이드바. 개인 기본 정보 4개 섹션으로 구성.

```
┌──────────────────────┐
│    BAEK              │  ← pointColor 적용
│    JU HEE            │
│    Front Developer   │
├──────────────────────┤
│ ⚽️ CONTACT           │
│  ─────────────────   │
│  Phone     : ***     │  ← 구직 중 아닐 때 전화번호 비공개 처리
│  Email     : ***     │
│  Github    : 링크     │
│  Portfolio : 링크     │
├──────────────────────┤
│ ⚽️ HOBBY             │
│  ─────────────────   │
│  풋살                 │
├──────────────────────┤
│ ⚽️ EDUCATION         │
│  ─────────────────   │
│  한양여자대학교  2014.02│
├──────────────────────┤
│ ⚽️ CERTIFICATION     │
│  ─────────────────   │
│  정보처리기사   2017.02│
│  컴활 1급      2016.07│
└──────────────────────┘
```

> 연락처 값은 `.env` 환경변수로 관리 (`VITE_APP_PHONE_NUMBER` 등)  
> `IS_JOB_SEEKING` 상수로 전화번호 노출 여부 제어

---

#### 오른쪽 메인 영역 (ResumeView)

**① 필터 영역** ← 프린트 모드 시 자동 숨김

```
Company │ [핏투게더 ✓] [와이유파트너스 ✓] [토이프로젝트 ✓]
Skill   │ [Vue ✓] [React ✓] [php ✓] [NodeJS ✓]
                                        정렬방법: [최신순 ▼]
```

- Company 필터: `ToggleChip` 컴포넌트 (포인트 컬러 적용)
- Skill 필터: `ToggleChip` 컴포넌트 (포인트 컬러 적용)
- 정렬: `최신순 / 오래된순` MUI Select

---

**② OVERVIEW 섹션** (PointStackCard)

자기소개 문장 리스트. `description.ts` 상수에서 관리.

```
⚽️ OVERVIEW
─────────────────────────────────────────
• 웹 프론트엔드 개발 실무 경력 3년 이상
• 팀 플레이 및 소통을 중요하게 생각하고 행동
• jest와 Storybook을 활용하여 단위테스트 코드 작성
• 1명에서 10명 이상의 개발팀으로 성장하기까지의 초기 스타트업 경험
```

> 굵게 표시된 키워드 부분은 링크 연결 가능

---

**③ CAREER 섹션** (CareerSection → CardListItem → SubListItem)

회사 필터에 따라 노출. 회사 카드가 나열되고 그 아래 프로젝트 카드가 펼쳐지는 구조.

```
⚽️ CAREER
──────────────────────────────────────────────────
[회사명]  [시작일 ~ 종료일] (근무기간)
역할 | 부서 | 설립년도: YYYY | 회사규모: N명
회사 설명 텍스트...

  WORK EXPERIENCE
  ▸ [프로젝트명]  (Notion 링크 연결, hover 시 underline)
    기간: YYYY.MM ~ YYYY.MM
    참여인원: N | 역할: 서비스 개발
    프로젝트 설명 텍스트...

    [메인 스킬 칩 (Notion 컬러)] [일반 스킬 칩 (grey)]

    ▼ 결과                ← Accordion (기본 펼쳐진 상태)
    결과 텍스트... (Notion Rich Text 렌더링)
      ▼ 문제사항
      문제 텍스트...
      ▼ 해결방안
      해결방안 텍스트...

──────────────────────────────────────────────────
[다음 회사 카드]
...
```

> 프로젝트는 선택된 회사 필터 + 스킬 필터 교차 적용  
> 회사 사이 구분선(`<hr>`) 자동 삽입, 마지막 회사는 생략

---

**④ SIDE PROJECT 섹션** (SideProjectSection)

토이프로젝트 데이터. CAREER 섹션과 동일한 CardListItem 구조 재사용.

```
⚽️ SIDE PROJECT
──────────────────────────────────────────────────
[프로젝트명]  (근무기간)
역할 | 부서 | 설립년도 | 규모
설명 텍스트...

  WORK EXPERIENCE
  ▸ [프로젝트명]
    ...
```

---

**데이터 소스:**  
Notion API 연동 + 로컬 JSON 파일 fallback (`src/data/DB_company.json`, `DB_project.json`)

---

### 3-3. 대시보드 페이지 (`/dashboard`)

흰 배경의 카드 기반 통계 시각화 페이지. 크게 2행으로 구성.

```
┌────────────────────┐  ┌────────────────────┐
│  PROJECTS          │  │  COMPANYS           │
│                    │  │                     │
│  React   [ 3 ]     │  │  Fitogether  [ 4 ] yr│
│  Vue     [ 5 ]     │  │  YU파트너스  [ 1 ] yr│
│  Php     [ 2 ]     │  │  프리랜서    [ 1 ] yr│
│                    │  │  틴들로      [ 1 ] yr│
└────────────────────┘  └────────────────────┘

┌────────────────────┐  ┌────────────────────┐
│  MAIN TECH USAGE   │  │  CAREER TIMELINE    │
│                    │  │                     │
│   [D3 파이차트]    │  │   [D3 타임라인 차트] │
│  Vue   50%         │  │  2017 ─ YU Partners │
│  React 30%         │  │  2018 ──── Fitogether│
│  PHP   20%         │  │  2023 ─ Freelance   │
│                    │  │  2025 ─ Tindlo      │
└────────────────────┘  └────────────────────┘
```

**카드 컴포넌트 (CardVersion2)**
- 아이콘(SVG) + 이름 + 숫자(count) + 단위(unit: 기본 없음 / `year` 가능) 표시

**파이차트 (D3 - `d3Pie.tsx`)**
- 데이터: `{ id, label, value, color }` 형식
- Vue 50% / React 30% / PHP 20%
- hover 시 툴팁 표시

**타임라인 차트 (D3 - `TimelineChart.tsx`)**
- 2017.05.02부터 오늘까지의 시간 축(xScale) 기준
- 회사별 막대(Bars)가 시간 위에 겹쳐져 표시
- hover 시 툴팁: `회사명 YY.MM~YY.MM (N개월)` 형식

| 회사 | 기간 |
|------|------|
| YU파트너스 | 2017.05 ~ 2018.02 |
| 핏투게더 | 2018.07 ~ 2022.11 |
| 프리랜서 | 2023.07 ~ 2023.10 |
| 틴들로 | 2025.02 ~ 현재 |

---

### 3-4. 포트폴리오 페이지 (`/portfolio`)

현재 `UnderConstruction` 컴포넌트로 대체된 상태. 미구현.

---

## 4. 공통 UI / 기능

### 헤더 (Header)

- 네비게이션: 이력서 / 대시보드 링크
- 다크모드 토글 버튼
- 프린트 모드 토글 버튼
- 오른쪽 고정 설정 버튼 → `SwipeableDrawer`로 포인트 컬러 설정 패널 열림

### 전역 설정 (Zustand - `useSettings`)

| 상태 | 설명 | 기본값 |
|------|------|--------|
| `themeMode` | 라이트 / 다크 모드 | `'light'` |
| `isPrintMode` | 프린트 모드 활성화 여부 | `false` |
| `pointColor` | 포인트 컬러 | `#5467f5` (보라 계열) |

---

## 5. 기술 스택

| 분류 | 사용 기술 |
|------|-----------|
| 언어 / 프레임워크 | TypeScript, React |
| 스타일링 | Tailwind CSS, SCSS, MUI (Material UI) |
| 상태 관리 | Zustand |
| 데이터 패칭 | React Query |
| 차트 | D3.js |
| 테스트 | Vitest, React Testing Library |
| 문서화 | Storybook |
| 빌드 | Vite, Yarn |
| CI/CD | GitHub Actions + gh-pages |

---

## 6. 디렉토리 구조 요약

```
src/
├── api/            Notion API 호출 로직
├── assets/         아이콘(SVG), 이미지, 스크린샷
├── components/
│   ├── common/     공통 Card, Chart 컴포넌트
│   ├── custom/     DChip, ToggleChip 등 커스텀 컴포넌트
│   ├── landing/    GameBoy 프레임 + 스크린 콘텐츠
│   └── resume/     이력서 관련 컴포넌트 전체
├── constants/      설정값, 아이콘 매핑, Notion 키 등
├── data/           로컬 목 데이터 JSON (회사/프로젝트/스킬/프로필)
├── hooks/          커스텀 훅, React Query 훅
├── layout/         Layout, Header, ThemeCustomized
├── lib/            queryClient 설정
├── pages/          라우트별 페이지 (landing, resume, dashboard, portfolio)
├── providers/      Providers.tsx, RouterProvider.tsx
├── queryKeys/      React Query 키 상수
├── router/         라우팅 설정 및 paths
├── stores/         Zustand 스토어 (useSettings)
├── styles/         SCSS 전역 변수, 리셋, 믹스인
├── theme/          MUI 테마 설정
├── types/          전역 타입 선언
└── utils/          포맷터, 파서, classNames 유틸
```

---

## 7. 현재 구현 상태 체크리스트

### 완료
- [x] GameBoy 인터랙티브 랜딩 페이지
- [x] 이력서 페이지 (필터, 정렬, 경력/사이드 프로젝트)
- [x] 대시보드 페이지 (D3 차트 2종)
- [x] 다크모드 / 라이트모드
- [x] 포인트 컬러 커스터마이징
- [x] 프린트 PDF 변환 모드
- [x] 반응형 디자인
- [x] Notion API 연동
- [x] Storybook 컴포넌트 문서화
- [x] 단위 테스트 (DChip, ToggleChip, FilterOption)

### 미완성 / 예정
- [ ] 포트폴리오 페이지 (`/portfolio`) - 현재 공사 중 상태
- [ ] 랜딩 PORTFOLIO 메뉴 → 실제 연결 (현재 UnderConstruction)
