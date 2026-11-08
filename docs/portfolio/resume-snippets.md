# 이력서·포트폴리오에 붙일 문장

이 저장소에 들어가 있는 구현만 적었다.  
목적은 채용 사이트에 같은 내용을 여러 번 적지 않고, 인쇄한 PDF를 파일로 올려 제출하는 것이다.

## 1. 프로젝트 한 줄 + 기술 스택

채용 사이트에 경력을 반복 입력하지 않고, 이력서 화면을 브라우저 인쇄로 PDF 저장해 파일로 제출하는 개인 웹앱.

기술 스택: TypeScript, React 18, Vite 5 (SWC), React Router 7, MUI 5, Tailwind CSS 4, Zustand, React Query 3, Axios, Framer Motion, Day.js, Jest, Testing Library, Storybook 8, GitHub Actions, GitHub Pages.

## 2. 이력서 불릿

골라 쓴다. 한 항목은 한 가지 구현이다.

- 회사·스킬 칩으로 목록을 켜고 끄고, 회사 경력을 최신순·오래된순으로 정렬하는 이력서 화면을 만들었다.
- 인쇄 모드에서 라이트 테마로 전환하고 프로필을 가로 그리드로 바꾼 뒤 `window.print()`로 인쇄 대화상자를 연다. 접힌 프로젝트 상세는 인쇄 시 펼친다.
- 회사·프로젝트·스킬은 Axios로 `GET /company`, `/project`, `/options`를 호출하고, 쿼리 데이터가 없으면 저장소 JSON으로 목록을 그린다. 프로필 문구는 정적 JSON이다.
- React Query로 조회를 캐시한다. staleTime 10분, 창 포커스·재연결 시 재요청 없음, retry 없음. 네트워크 단절은 토스트로 알린다.
- Zustand로 라이트/다크, 포인트 컬러, 인쇄 모드, 포트폴리오 셸(DMG / LIGHT / POCKET)을 두고, 컬러 피커로 포인트 색을 바꾼다.
- 라우트는 lazy 로드한다. `/` 게임보이 랜딩, `/portfolio`, `/resume`, `/projects`, `/projects/:slug`. 없는 경로는 NotFound. `/dashboard`는 `/portfolio`로 보낸다.
- 프로젝트 상세는 같은 프로젝트 쿼리에서 slug로 찾아 요약, 문제, 해결, 구조, 기능, 임팩트, 기술 스택을 보여 준다. 없으면 Project not found.
- `main` 푸시 시 GitHub Actions가 `yarn build` 후 `gh-pages`로 배포한다. `public/404.html`과 `index.html`의 리다이렉트 스크립트로 GitHub Pages에서 SPA 경로를 복구한다.
- 필터 칩 등 일부 UI에 Jest + Testing Library 테스트와 Storybook 스토리가 있다.

## 3. 포트폴리오

### 짧은 개요

개인 이력서 사이트. 경력·프로젝트를 한 화면에서 걸러 보고, 인쇄 레이아웃으로 바꾼 뒤 브라우저 인쇄로 PDF를 저장한다. 채용 사이트 입력란에 같은 내용을 반복해서 넣지 않고 그 PDF를 파일로 올린다.

### 한 블록 초안

채용 사이트마다 경력을 다시 적지 않으려고 만든 이력서 웹앱이다. 회사·프로젝트·스킬은 백엔드 API에서 가져오고, 응답이 없으면 로컬 JSON으로 보여 준다. 화면에서는 회사·스킬 필터와 정렬로 내용을 고르고, 인쇄 모드에서는 라이트 테마와 가로 프로필 배치로 바꾼 다음 브라우저 인쇄 대화상자를 연다. 접어 둔 프로젝트 설명은 인쇄본에 펼쳐진다. 결과물은 서버가 만든 PDF 파일이 아니라, 그 인쇄 화면을 PDF로 저장해 제출하는 파일이다. Vite + React + TypeScript로 만들었고, GitHub Actions로 GitHub Pages에 배포한다.

### 3줄 압축

채용 사이트에 같은 경력을 반복 입력하지 않으려고 만든 개인 이력서 웹앱.  
회사·스킬 필터와 정렬로 내용을 고른 뒤, 인쇄 레이아웃에서 브라우저 인쇄로 PDF를 저장한다.  
데이터는 Axios + React Query이고, 전역 설정은 Zustand, 배포는 GitHub Actions → GitHub Pages.

## 4. 미구현·한계, 쓰지 말 것

미구현·화면과 연결되지 않은 코드

- PDF를 만들어 내려받는 API나 라이브러리는 없다. 인쇄는 `window.print()`다.
- Next.js middleware는 없다. Vite SPA다.
- `package.json`의 `@notionhq/client`, `notion-client`, `styled-components`는 `src`에서 import되지 않는다. Notion 데이터는 백엔드 HTTP로 받는다.
- `src/api/projectsApi.ts`의 Lambda 교체(Phase 2), `useProjectsListQuery`, `useProjectDetailQuery`는 페이지에 연결되어 있지 않다.
- `src/pages/projects/detail.tsx`(로컬 `DB_projects_site`)는 라우터에 없다. 실제 상세 라우트는 `ProjectDetailPage.tsx`다.
- D3 타임라인·파이 차트는 `src/pages/dashboard/index.tsx`에 있다. `/dashboard`는 `/portfolio`로 리다이렉트되어 그 화면은 열리지 않는다.
- 헤더의 사이드 프로젝트 토글은 pathname이 `/dashboard`일 때만 그린다. 이력서의 SIDE PROJECT 섹션은 그와 별개로 항상 렌더된다.
- `UnderConstruction`은 라우트에 없다.
- 포트폴리오의 연차 숫자(`CAREER_YEARS = 6`)와 대시보드 파일의 기술 카운트는 코드에 적은 상수다.

쓰지 말 것

- 트래픽, 검색 노출, 지원 전환, 공식 가이드와의 일치, 성능 개선 %.
- 빌드 로그의 gzip 크기를 성능 수치로 쓰는 것.
- “PDF 자동 생성”, “Notion SDK 연동”, “대시보드 차트 제공”, “린트 클린”, “테스트 전부 통과”.
- Redux 제거처럼, 현재 파일에 과정이 남아 있지 않은 과거 작업.

## 확인

패키지 매니저는 yarn (`yarn.lock`). pnpm 스크립트는 없어 `yarn lint`, `yarn build`, `yarn jest --watchAll=false --ci`로 봤다.  
`yarn build` (`tsc && vite build`) 통과. `yarn lint` 실패 (warning 13, max-warnings 0).  
테스트는 없음이 아니다. Jest 파일 3개, 15개 중 9개 통과, 6개 실패.

## 프로젝트 properties

```
mainSkill
techStack
company
period
url
slug
description
summary
hero
problem
architecture
keyFeatures
impact
keywords
domain
numberOfParticipants
participationRate
role
isVisible
projectType
isFeatured
featuredOrder
background
result
mainWork
solution
keyContributions
details
```
