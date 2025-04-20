# 프로젝트 Description

## ✔ 프로젝트명

**백주희의 이력서**

## ✔ 개요

이력서 정보를 채용 플랫폼에 종속되지 않고, 동일한 형태로 제공하기 위해 시작한 개인 프로젝트입니다.  
프린트 모드, 테마 커스터마이징, 다크 모드, 반응형까지 고려된 완성형 이력서 포맷을 목표로 개발하였습니다.

---

## ✔ 디렉토리 구조 (2025 리팩토링 반영)

<details>
<summary>디렉토리 구조 보기</summary>

```
📁 src
 ┣ 📂api            → 외부 API 호출 로직
 ┣ 📂assets         → 이미지, 아이콘, 스크린샷 등 정적 리소스
 ┣ 📂components     → UI 컴포넌트 (공통, 커스텀, 도메인별 분리)
 ┣ 📂constants      → 상수 관리
 ┣ 📂data           → 목데이터 JSON
 ┣ 📂hooks          → 커스텀 훅 및 React Query 전용 훅
 ┣ 📂layout         → 레이아웃 및 테마 설정
 ┣ 📂lib            → queryClient 등 공통 외부 라이브러리 설정
 ┣ 📂pages          → 각 라우트별 페이지 컴포넌트
 ┣ 📂providers      → Providers.tsx, RouterProvider.tsx
 ┣ 📂queryKeys      → React Query 키 상수
 ┣ 📂router         → 라우팅 설정 및 path 정의
 ┣ 📂stores         → Zustand 전역 상태 관리 (e.g., useSettings.ts)
 ┣ 📂styles         → SCSS 전역 변수, 리셋, 믹스인, 반응형 유틸
 ┣ 📂theme          → MUI 테마 설정
 ┣ 📂types          → 전역 타입 선언
 ┣ 📂utils          → 포맷터, 파서, 클래스네임 유틸
 ┣ 📜App.tsx        → 진입 컴포넌트
 ┗ 📜main.tsx       → Vite 앱 엔트리
```

</details>

---

## ✔ 기술 스택

- **언어 / 프레임워크:** TypeScript, React
- **스타일링:** SCSS 모듈, MUI, 반응형 레이아웃, Storybook
- **상태 관리:** Zustand
- **데이터 패칭:** React Query
- **테스트:** Jest, React Testing Library
- **번들링 & 빌드:** Vite, yarn
- **CI/CD:** GitHub Actions + gh-pages

---

## ✔ 실행 방법

```bash
# 설치
yarn install

# 로컬 실행
yarn dev

# 스토리북 실행
yarn storybook
```

---

## ✔ 주요 기능

### 🌟 필수 기능

- [x] 프로젝트/회사 필터 기능
- [x] 프로젝트 정렬 기능 (최신순, 오래된 순)
- [x] 상세 페이지 링크 연결
- [x] 프린트 PDF 변환 기능

### ✨ 추가 기능

- [x] 포인트 색상 커스터마이징
- [x] 다크 모드 지원
- [x] 반응형 디자인
- [x] Storybook으로 컴포넌트 문서화
- [x] 테스트 코드 작성

### 🛠 리팩토링 및 구조 개선

- [x] Redux 제거 → Zustand 전면 도입
- [x] 레이아웃 및 ThemeProvider 분리
- [x] Context API 제거 (ColorModeContext)
- [x] API / 파서 / 유틸 모듈 정리
- [x] 디렉토리 구조 기능 단위로 정리

---

## ✔ 결과물

👉 [https://juhee-playground.github.io](https://juhee-playground.github.io)
