# 포트폴리오 사이트 현황 정리

> 마지막 업데이트: 2026.03.04 (/portfolio 제거, /site → 포트폴리오로 대체 확정)  
> 배포 주소: [https://juhee-playground.github.io](https://juhee-playground.github.io)

---

## 1. 프로젝트 개요

개인 이력서 포트폴리오 사이트. 채용 플랫폼에 종속되지 않고 동일한 이력서를 직접 제공하기 위해 시작한 개인 프로젝트.  
프린트 모드, 다크모드, 포인트 컬러 커스터마이징, 반응형까지 고려된 이력서 포맷을 목표로 함.

---

## 2. 페이지 구성

총 6개 라우트가 존재하며, `/site`가 포트폴리오 역할을 대체함.

| 경로 | 페이지 | 상태 |
|------|--------|------|
| `/` | 랜딩 (GameBoy UI) | ✅ 완성 |
| `/resume` | 이력서 | ✅ 완성 |
| `/dashboard` | 대시보드 | ✅ 완성 |
| `/site` | 포트폴리오 랜딩 (구 /portfolio 대체) | ✅ 완성 |
| `/projects` | 프로젝트 목록 | ✅ Phase 1 완성 (목 데이터) |
| `/projects/:slug` | 프로젝트 케이스 스터디 상세 | ✅ Phase 1 완성 (목 데이터) |

> `/portfolio` 라우트는 제거됨. GameBoy 랜딩의 PROJECTS 메뉴도 `/site`로 연결됨.

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

### 3-4. 포트폴리오 (`/site`)

헤더의 **포트폴리오** 배지 버튼으로 진입. 기존 `/portfolio`를 완전히 대체하는 프로페셔널 포트폴리오 페이지.  
기존 `/resume`, `/dashboard` 데이터를 공유·재사용하면서, 별도의 디자인 언어(카드, 2컬럼 그리드)로 구성.

#### 레이아웃 구조

```
[Header - 홈 링크 + 다크모드 아이콘 + 설정 기어만 표시]
│
[SiteSideNav - 뷰포트 왼쪽 고정 (xl+ 전용)]
│  ● Overview  Projects  Experience  Stats  Contact
│
[main .max-w-[860px]]
├── #overview  (min-h-80vh, SiteHero + SiteOverview)
├── #projects  (SiteSection + "View all projects →")
├── #experience (SiteSection)
├── #stats     (SiteSection + "대시보드 전체 보기 →")
└── #contact   (SiteSection)
[footer]
```

#### 헤더 동작

- `/site` 접속 시 헤더 왼쪽에는 **홈** 링크만 표시 (이력서/대시보드/Projects/Site 숨김)
- 오른쪽에는 다크모드 토글 + 설정 기어(컬러 설정 드로어)만 표시
- 각 섹션 내부 링크로 `/resume`, `/dashboard`, `/projects` 이동 가능

#### 사이드 네비 (`SiteSideNav`)

- 뷰포트 왼쪽에 `fixed` 포지셔닝 (`xl` 1280px+ 에서만 표시)
- IntersectionObserver로 스크롤 위치 감지 → 활성 섹션 포인트 컬러 하이라이트
- 클릭 시 `scrollIntoView({ behavior: 'smooth' })`

#### 섹션별 상세

**`#overview` — SiteHero + SiteOverview**

```
┌──────────────────────────┐  ┌───────────────────────────┐
│ Frontend Developer       │  │ ● Current Status          │
│                          │  │ ─────────────────────     │
│ BAEK                     │  │ • Building at Tindlo      │
│ JU HEE                   │  │ • Open to opportunities   │
│                          │  │ • Side projects running   │
│ 복잡한 워크플로우를...        │  │ ─────────────────────     │
│                          │  │ Last update   2025.03     │
│ [Projects 보기] [이력서]    │  └───────────────────────────┘
└──────────────────────────┘
[ SiteOverview: description.ts 공유 · 불릿 리스트 카드 ]
```

- framer-motion stagger 애니메이션 (좌측 텍스트 순차, 우측 카드 slide-in)

---

**`#projects` — PROJECTS_SITE 카드 리스트**

- `DB_projects_site.ts`의 `PROJECTS_SITE` 데이터 사용 (3개)
- 태그 칩, LIVE/WIP/ARCHIVED 뱃지, hover 시 translateY + border 강조
- whileInView 스태거 애니메이션
- **"View all projects →"** 링크 → `/projects`

---

**`#experience` — SiteExperiencePreview**

- `useCompaniesQuery` + `useProjectsQuery` 재사용 (Notion API + JSON fallback)
- 상위 회사 2개, 회사당 프로젝트 2개로 slice
- 기존 `CardListItem` / `SubListItem` 컴포넌트 그대로 재사용
- "전체 이력서 보기 →" 링크 → `/resume`

---

**`#stats` — 숫자 카드 그리드**

```
[ 5+          ] [ 10+         ] [ 4           ] [ 3+          ]
  Years Exp       Projects       Companies       Tech Stacks
```

- scale 기반 whileInView 스태거 애니메이션
- **"대시보드 전체 보기 →"** 링크 → `/dashboard`

---

**`#contact` — SiteContact**

- `VITE_APP_EMAIL` / `VITE_APP_GITHUB` / `VITE_APP_PORTFOLIO` 환경변수 사용
- `IS_JOB_SEEKING = false`이면 Phone 카드 숨김
- 2컬럼 그리드 (sm 이상)

---

#### 컴포넌트 목록

| 파일 | 역할 |
|------|------|
| `src/pages/site/index.tsx` | 페이지 진입점, 섹션 조합 |
| `src/components/site/SiteSideNav.tsx` | 뷰포트 왼쪽 고정 세로 앵커 네비 (xl+) |
| `src/components/site/SiteSection.tsx` | 섹션 래퍼 (label 애니메이션 포함) |
| `src/components/site/SiteHero.tsx` | 2컬럼 히어로 + Status 카드 (framer-motion) |
| `src/components/site/SiteOverview.tsx` | description.ts 재사용 불릿 카드 |
| `src/components/site/SiteExperiencePreview.tsx` | 상위 2사 · 2프로젝트 미리보기 |
| `src/components/site/SiteContact.tsx` | 연락처 카드 (env + IS_JOB_SEEKING) |

---

### 3-5. 프로젝트 목록 (`/projects`)

`/site`의 **View all projects →** 또는 헤더 **Projects** 링크로 진입.

```
[Breadcrumb: ← Site로 돌아가기]
[h1: Projects]
[p: 설명]

┌─────────────────────┐  ┌─────────────────────┐
│ TITLE          LIVE │  │ TITLE       ARCHIVED │
│                     │  │                     │
│ tagline...          │  │ tagline...           │
│                     │  │                     │
│ [React][TS][Tailwind]│  │ [Vue][D3][NodeJS]   │
│ ─────────────────── │  │ ─────────────────── │
│ [Case Study] [Live] │  │ [Case Study][Notion] │
└─────────────────────┘  └─────────────────────┘
```

- 1컬럼(모바일) / 2컬럼(md+) grid
- framer-motion variants stagger 애니메이션
- 각 카드 hover 시 translateY(-4px) + border/shadow 강조
- **Case Study →** 버튼: `/projects/:slug` 이동
- **Live / Repo / Notion** 버튼: 외부 링크

---

### 3-6. 프로젝트 케이스 스터디 (`/projects/:slug`)

각 프로젝트의 상세 케이스 스터디 페이지.  
slug가 없거나 잘못된 경우 페이지 내 404 UI 렌더 (크래시 없음).

```
[Breadcrumb: ← All Projects]

Hero
  [STATUS]
  TITLE
  tagline
  [Live ↗] [Notion ↗]
  [React] [TypeScript] ...
  ─────────────────────
  summary 텍스트 (overview)

PROBLEM ──────────────────
  문제 배경 텍스트

SOLUTION ─────────────────
  해결 방법 텍스트

ARCHITECTURE ─────────────
  기술 스택 설명 (monospace)

KEY FEATURES ─────────────
  ● feature 1
  ● feature 2
  ● feature 3

LESSONS ──────────────────
  01  lesson 1
  02  lesson 2

[footer: ← All Projects]
```

각 섹션은 `ProjectSection` 공유 래퍼 사용 (whileInView fade-up 애니메이션).

#### 컴포넌트 목록

| 파일 | 역할 |
|------|------|
| `src/pages/projects/index.tsx` | 프로젝트 목록 페이지 |
| `src/pages/projects/detail.tsx` | 케이스 스터디 상세 페이지 |
| `src/components/project/ProjectSection.tsx` | 섹션 공유 래퍼 (label + 구분선 + 애니메이션) |
| `src/components/project/ProjectHero.tsx` | status / title / tagline / links / tags / summary |
| `src/components/project/ProjectProblem.tsx` | Problem 텍스트 섹션 |
| `src/components/project/ProjectSolution.tsx` | Solution 텍스트 섹션 |
| `src/components/project/ProjectArchitecture.tsx` | Architecture 섹션 (monospace) |
| `src/components/project/ProjectFeatures.tsx` | Key Features 불릿 리스트 |
| `src/components/project/ProjectLessons.tsx` | Lessons 번호 리스트 |

#### 데이터 구조 (`TProject`)

```ts
interface TProject {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  status: 'LIVE' | 'WIP' | 'ARCHIVED';
  links?: { live?: string; repo?: string; notion?: string; };
  // Case study sections
  problem?: string;
  solution?: string;
  architecture?: string;
  features?: string[];
  lessons?: string[];
}
```

#### Phase 2 준비 구조

```
src/
├ api/projectsApi.ts              fetchProjects / fetchProjectBySlug
│                                 → Phase 2에서 Lambda 엔드포인트로 교체
├ queryKeys/projects.ts           projectQueryKeys.list() / .detail(slug)
└ hooks/queries/
    ├ useProjectsListQuery.ts     프로젝트 목록 React Query hook
    └ useProjectDetailQuery.ts    단일 프로젝트 React Query hook
```

**Phase 2 전환**: `projectsApi.ts`의 `Promise.resolve(MOCK)` 부분만  
`fetch('https://lambda/.../projects')` 로 교체하면 나머지 코드 변경 없음.

---

### ~~3-7. 포트폴리오 페이지 (`/portfolio`)~~ ← 제거됨

`/site`가 포트폴리오 역할을 완전히 대체. 라우트 및 `UnderConstruction` 컴포넌트 참조 모두 제거.

---

## 4. 공통 UI / 기능

### 헤더 (Header)

- **기본 nav (비-site 페이지)**: 홈 / 이력서 / 대시보드 / Projects / **포트폴리오** (→ `/site` 배지)
- **`/site` 접속 시**: 왼쪽 nav는 **홈만** 표시 (나머지 숨김)
- 다크모드 토글 아이콘 (항상 표시)
- 프린트 모드 토글 아이콘 **(`/resume` 에서만 표시)**
- 오른쪽 고정 설정 버튼 → `SwipeableDrawer`로 포인트 컬러 설정 패널 열림
- 헤더 sticky (`sticky top-0 z-50`) 고정

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
| 스타일링 | Tailwind CSS, MUI (Material UI) ← SCSS 제거 완료 |
| 애니메이션 | framer-motion (site, projects 페이지) |
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
├── api/
│   ├── notion.ts         Notion API 호출
│   └── projectsApi.ts    프로젝트 API (Phase 1: 목 데이터 / Phase 2: Lambda)
│
├── assets/               아이콘(SVG), 이미지, 스크린샷
│
├── components/
│   ├── common/           공통 Card, Chart 컴포넌트
│   ├── custom/           DChip, ToggleChip 등 커스텀 컴포넌트
│   ├── landing/          GameBoy 프레임 + 스크린 콘텐츠
│   ├── project/          /projects 케이스 스터디 섹션 컴포넌트
│   │                     (ProjectSection, ProjectHero, ProjectProblem,
│   │                      ProjectSolution, ProjectArchitecture,
│   │                      ProjectFeatures, ProjectLessons)
│   ├── resume/           이력서 관련 컴포넌트 전체
│   └── site/             /site 페이지 전용 컴포넌트
│                         (SiteSideNav, SiteSection, SiteHero,
│                          SiteOverview, SiteExperiencePreview, SiteContact)
│
├── constants/            설정값, 아이콘 매핑, Notion 키 등
│
├── data/
│   ├── DB_company.json   회사 목 데이터
│   ├── DB_project.json   프로젝트 목 데이터 (Notion fallback)
│   └── projects/
│       └── DB_projects_site.ts   케이스 스터디 데이터 (TProject 타입)
│
├── hooks/
│   └── queries/          React Query 훅
│       ├── useCompaniesQuery.ts
│       ├── useProjectsQuery.ts   (Notion 프로젝트)
│       ├── useProjectsListQuery.ts  (site용 목록)
│       └── useProjectDetailQuery.ts (site용 상세)
│
├── layout/               Layout, Header, ThemeCustomized
├── lib/                  queryClient 설정
│
├── pages/
│   ├── landing/          GameBoy 랜딩
│   ├── resume/           이력서
│   ├── dashboard/        대시보드
│   ├── site/             프로페셔널 포트폴리오 랜딩
│   ├── projects/
│   │   ├── index.tsx     프로젝트 목록
│   │   └── detail.tsx    케이스 스터디 상세
│   └── portfolio/        공사 중 (UnderConstruction)
│
├── providers/            Providers.tsx, RouterProvider.tsx
│
├── queryKeys/
│   ├── notion.ts         Notion 쿼리 키
│   └── projects.ts       프로젝트 쿼리 키
│
├── router/               라우팅 설정 및 paths
├── stores/               Zustand 스토어 (useSettings)
├── styles/               CSS 전역 변수, 리셋, 애니메이션 (SCSS 제거 완료)
├── theme/                MUI 테마 설정
├── types/                전역 타입 선언
└── utils/
    ├── classNames.ts     cn() 유틸
    ├── getProjectBySlug.ts  slug → TProject 조회
    └── ...               포맷터, 파서 등
```

---

## 7. 현재 구현 상태 체크리스트

### 완료
- [x] GameBoy 인터랙티브 랜딩 페이지
- [x] 이력서 페이지 (필터, 정렬, 경력/사이드 프로젝트)
- [x] 대시보드 페이지 (D3 차트 2종)
- [x] 다크모드 / 라이트모드
- [x] 포인트 컬러 커스터마이징
- [x] 프린트 PDF 변환 모드 (`/resume` 전용)
- [x] 반응형 디자인
- [x] Notion API 연동
- [x] Storybook 컴포넌트 문서화
- [x] 단위 테스트 (DChip, ToggleChip, FilterOption)
- [x] `/site` 포트폴리오 랜딩 페이지 (`/portfolio` 대체 확정)
- [x] SiteSideNav — 뷰포트 왼쪽 고정 세로 앵커 네비 (xl+)
- [x] SiteHero — 2컬럼 히어로 + Status 카드 + framer-motion 애니메이션
- [x] SiteOverview — description.ts 재사용
- [x] SiteExperiencePreview — 기존 resume 컴포넌트/데이터 재사용
- [x] SiteContact — env 변수 + IS_JOB_SEEKING 룰 적용
- [x] `/site` 마이크로 애니메이션 (framer-motion whileInView stagger)
- [x] `/site` → `/projects` 연결 ("View all projects →")
- [x] `/site` → `/dashboard` 연결 ("대시보드 전체 보기 →")
- [x] `/projects` 프로젝트 목록 페이지 (Phase 1 목 데이터)
- [x] `/projects/:slug` 케이스 스터디 상세 페이지 (Phase 1 목 데이터)
- [x] `TProject` 타입 정의 (slug/title/tagline/summary/tags/status/links/problem/solution/architecture/features/lessons)
- [x] `projectsApi.ts` — Phase 2 Lambda 전환 대비 API 레이어 stub
- [x] `useProjectsListQuery` / `useProjectDetailQuery` React Query hook
- [x] 헤더 /site 전용 동작 (홈 링크만, print 아이콘 숨김)
- [x] 헤더 sticky 고정
- [x] SCSS 제거 — Tailwind CSS 단일 스타일링으로 전환
- [x] `src/utils/getProjectBySlug.ts` 유틸 추가
- [x] `/portfolio` 라우트 제거 — `/site`(포트폴리오)로 완전 대체
- [x] 헤더 배지명 "Site" → "포트폴리오" 변경
- [x] GameBoy 랜딩 PROJECTS 버튼 → `/site` 연결

### 미완성 / 예정
- [ ] `/projects` Phase 2: Lambda API 연동 (`projectsApi.ts` 교체)
- [ ] `/projects` 실제 케이스 스터디 내용 작성 (현재 목 플레이스홀더)
- [ ] `/site` Stats 섹션 동적 집계 (현재 하드코딩)
- [ ] `/projects/:slug` Screenshots 섹션 (이미지 데이터 미구현)
