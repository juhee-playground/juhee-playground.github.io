# 프로젝트 Description

## ✔ 프로젝트명

백주희의 이력서

## ✔ 개요

이력서 정보를 채용 플랫폼에 종속되지 않고 동일하게 제공하기 위해 시작한 프로젝트

<details>
<summary> ✔ 디렉토리 구조</summary>
<code>
  ┣ 📂public
  ┃ ┣ 📜brachiosaurus.png
  ┃ ┣ 📜favicon.ico
  ┃ ┣ 📜index.html
  ┃ ┣ 📜manifest.json
  ┃ ┗ 📜robots.txt
  ┣ 📂src
  ┃ ┣ 📂api
  ┃ ┃ ┣ 📜customAxios.ts
  ┃ ┃ ┣ 📜errorHandler.ts
  ┃ ┃ ┗ 📜notion.ts
  ┃ ┣ 📂assets
  ┃ ┃ ┣ 📂images
  ┃ ┃ ┃ ┗ 📜apng_loader-ball.png
  ┃ ┃ ┗ 📂scss
  ┃ ┃ ┃ ┣ 📂font
  ┃ ┃ ┃ ┃ ┣ 📜Montserrat.scss
  ┃ ┃ ┃ ┃ ┣ 📜NotoSansKR.scss
  ┃ ┃ ┃ ┃ ┗ 📜index.scss
  ┃ ┃ ┃ ┣ 📜_mediaQueries.scss
  ┃ ┃ ┃ ┣ 📜_mixins.scss
  ┃ ┃ ┃ ┣ 📜_reset.scss
  ┃ ┃ ┃ ┗ 📜_variables.scss
  ┃ ┣ 📂components
  ┃ ┃ ┣ 📂custom
  ┃ ┃ ┃ ┣ 📜DChip.tsx
  ┃ ┃ ┃ ┗ 📜ToggleChip.tsx
  ┃ ┃ ┣ 📂utils
  ┃ ┃ ┣ 📜Loading.scss
  ┃ ┃ ┗ 📜Loading.tsx
  ┃ ┣ 📂constants
  ┃ ┃ ┗ 📜MainStack.tsx
  ┃ ┣ 📂context
  ┃ ┃ ┗ 📜ColorModeContext.ts
  ┃ ┣ 📂data
  ┃ ┃ ┣ 📜DB_company.json
  ┃ ┃ ┣ 📜DB_profileInfo.json
  ┃ ┃ ┣ 📜DB_project.json
  ┃ ┃ ┣ 📜DB_role.json
  ┃ ┃ ┗ 📜DB_stack.json
  ┃ ┣ 📂hooks
  ┃ ┣ 📂layout
  ┃ ┃ ┣ 📂header
  ┃ ┃ ┃ ┣ 📜Header.scss
  ┃ ┃ ┃ ┣ 📜Header.tsx
  ┃ ┃ ┃ ┗ 📜MenuPopupState.tsx
  ┃ ┃ ┣ 📂nav
  ┃ ┃ ┃ ┣ 📜Nav.scss
  ┃ ┃ ┃ ┣ 📜Nav.tsx
  ┃ ┃ ┃ ┗ 📜ProfileInfoBox.tsx
  ┃ ┃ ┣ 📜FixButton.scss
  ┃ ┃ ┣ 📜Layout.scss
  ┃ ┃ ┣ 📜Layout.tsx
  ┃ ┃ ┣ 📜ThemeCustomized.scss
  ┃ ┃ ┗ 📜ThemeCustomized.tsx
  ┃ ┣ 📂pages
  ┃ ┃ ┣ 📂resume
  ┃ ┃ ┃ ┣ 📂card
  ┃ ┃ ┃ ┃ ┣ 📜CardListItem.tsx
  ┃ ┃ ┃ ┃ ┗ 📜SubListItem.tsx
  ┃ ┃ ┃ ┣ 📂filter
  ┃ ┃ ┃ ┃ ┗ 📜FilterOption.tsx
  ┃ ┃ ┃ ┣ 📜Main.scss
  ┃ ┃ ┃ ┗ 📜Main.tsx
  ┃ ┃ ┗ 📜MainForProject.tsx
  ┃ ┣ 📂redux
  ┃ ┃ ┣ 📂modules
  ┃ ┃ ┃ ┗ 📜pointColor.ts
  ┃ ┃ ┣ 📜actions.ts
  ┃ ┃ ┣ 📜rootReducer.ts
  ┃ ┃ ┗ 📜store.ts
  ┃ ┣ 📂theme
  ┃ ┃ ┗ 📜Theme.tsx
  ┃ ┣ 📂types
  ┃ ┃ ┣ 📜global.d.ts
  ┃ ┃ ┗ 📜images.d.ts
  ┃ ┣ 📂utils
  ┃ ┃ ┗ 📜String.tsx
  ┃ ┣ 📜App.scss
  ┃ ┣ 📜App.tsx
  ┃ ┣ 📜index.css
  ┃ ┗ 📜index.tsx
  ┣ 📜.eslintrc.js
  ┣ 📜.gitignore
  ┣ 📜.prettierrc.json
  ┣ 📜README.md
  ┣ 📜TODO.md
  ┣ 📜craco.config.js
  ┣ 📜initSetting.md
  ┣ 📜package-lock.json
  ┣ 📜package.json
  ┣ 📜react-app-env.d.ts
  ┣ 📜tsconfig.json
  ┗ 📜tsconfig.paths.json
  </code>    
</details>

# 프로젝트 정보

## ✔ 개발스택

> Node Version: v20.12.0
>
> 코어 스택: TypeScript, React
>
> 상태 관리: React Context, React Query, Redux
>
> 스타일링: Storybook, Scss
>
> 빌드: yarn, vite
>
> CI/CD: GitHub Actions
>
> test: jest, react-testing-library

## ✔ 실행방법

> 로컬 실행
>
> cd juhee-playground
>
> yarn install
>
> yarn dev
>
> 스토리북 실행
> yarn storybook

## ✔ 구현 목록

### 필수 기능

    1. 필터 기능
    2. 정렬 기능 (최신순 오래된순)
    3. 상세페이지 붙이기(노션 페이지)
    4. 프린트 pdf 기능

### 추가 기능

    1. 테스트코드 붙이기
    2. 컴포넌트에 스토리북

### UI

    1. 다크 모드
    2. 반응형
    3. 테마 기능(포인트 컬러 변경)

### 리펙토링

    1. 컴포넌트화 시키기(프로젝트 카드, 필터 등)
    2. api 폴더안 파일 정리
        - 사용하지 않는 함수 지우기
        - api handling 하는 파일 utils로 옮기기
    3. Reacy-Query 사용 하는 방법 수정
        - 재사용 가능하도록 hooks로 파일로 관리
    4. interface, type 이름 통일
    5. 컴포넌트 props 넘길 때 `{ name, email }: DataProps` 이런식으로 넘기기

### 추후 작업 예정 목록

    1. 경력 요약 그래프(차트 페이지로 대체될 것 같음.)
    2. 페이지 나누기
        - 포폴 페이지와 이력서 페이지 분리
        - 차트 수치화 할 수 있는 데이터 따로 빼기

### 프로젝트 결과물

[백주희의 이력서](https://juhee-playground.github.io/)
