# 할일 정리

## 필수기능

1. 필터 기능 V
2. pdf 내보내는 기능
3. 시간순 정렬 (최신순 오래된순) 정렬 기능 추가 V
4. 날짜 format, 기간 출력 V
5. 반응형으로 만들기

## 빌드

1. git action으로 빌드하기
2. 서버리스 도전 (람다)

### 추가기능

- 미적으로 기능 추가

1. 테마바꾸기(dark, light)
2. 포인트 컬러 바꾸기(테마의 연장선)
   기능적으로 옵션
3. 최적화 하기(초반에 데이터 없을 때 화면 움직이는 현상 해결)
4. 컴포넌트화 하기(쪼개기)
5. 검색기능

### 4/14일 할일

[ ] 프로젝트 내용(성과부분) 가져오기
_백엔드_
[ ] - 데이터 가져오는 부분 API 구현
_프런트_
[ ] - 성과부분 가져와서 뿌려주기
[ ] - 상단 탭 필터 부분 UI 구현
_노션_
[X] - 사이드 프로젝트 프로젝트 쪽에 작성하기

### 4/16일 할일

- 레이아웃 이상한 부분 고치기 V
- stack 색 집어넣기
- 필터 UI 생각하기

### 4/17일 할일

1. filter 부분 db에서 불러오도록 수정 V
   1. 개발 스택 V
   2. role V
2. type 만들기
   1. 직군 V
   2. Dchip V
3. 컬러 정하기
   1. 메인 포인트 컬러 - (추후에 디자인 손보기)
   2. chip color V
4. 필터 기능 붙이기
5. 컴포넌트 화 하기(나중에하기)
   1. 회사기준 컴포넌트
   2. 날짜 기준 컴포넌트
   3. 프로젝트 기준 컴포넌트
      (어떻게 구성할지 생각하기!)

### 4/18일 할일

1. 필터 기능 => 하다가 맘 내일 다시하기
2. 시간순 정렬 (최신순 오래된순) 정렬 기능 추가
3. 날짜 format, 기간 출력
4. mock 데이터 만들기 V

### 4/21일 한일

1. 필터기능 회사별 필터 기능 완성(but 반대가 안된다ㅜㅜㅜ)
2. 날짜 format, 기간 출력 V

### 4/22일 할일

- 필터기능 마무리;; 제발 V - 서진님이 도와줘서 해결햬ㅆ다!!!!!!!

### 4/24일 할일

- 시간순 정렬

## 앞으로 할일

1. 시간순 정렬 V
2. pdf 내보내는 기능
3. 반응형
4. 테마

### 05/03

- 시간순 정렬 V

### 05/04

- data 파싱하기 V

### 05/05

**컴포넌트 쪼개기**
How?
[카드] : 각각의 기준으로 나눠지도록 컴포넌트 짜기.
(각각의 기준이기 보단 그냥 나누기만 함. 공통 컴포넌트까지는 못함.)
회사 기준 V
프로젝트 기준 X => 이건 안하기로
[myInfoComponent]
nav의 각각의 정보 하나의 컴포넌트에서 뷰별로 나눠서 사용하기. V

### 다음 할일

1. 필터 컴포넌트 분리(완료)
2. 테마 (완료)
3. 반응형 (완료)
4. 빌드
5. 백엔드 서버리스 구현

### 05/17

1. 포인트 컬러 변경 (완료)

### 05/19

[테마 및 css 기능 붙이기]

1. 다크모드 (완료)
2. 반응형 (완료)

### 5/21

1. 에러 처리 어떻게 할지 -> 에러처리 했지만 3개씩 나오는 문제가 있음. 네트워크 에러일 경우(백엔드 불러올 수 없을 경우 에러처리 한번만 표시해주기)
2. 빌드(깃 액션) -> 깃액션 아니고 gh-page로 빌드하기 V
   푸시하면 깃 액션으로 빌드해주는거 하는것도 나쁘지 않을듯.
3. 백엔드 서버리스로 만들기 V

### 06/10 다음 할일

-5 노션 정리 V
-4 각각의 프로젝트에 노션 페이지 연결 시켜서 0번의 상세페이지 대체하기 V

-3 리펙토링 V
-2 문서화
상세하게 적기(보강하기)
-1 테스트 코드 붙이기

0. 2번의 사전 작업 이미지 file화 해서 만들고 노션에 파일 이름 나열해서 이미지 상세페이지에 보여주도록
   상세페이지 V

1. 프린트 기능 추가
2. 각 프로젝트 상세페이지 추가하기 V (노션 페이지로 연결)
3. 그래프 추가 - 그림 그려오기 어떤식으로 짤지$$
   - 회사 타임라인 그려주기
   - Vue 사용량, react 사용량 등 수치로 표현해주기(프로그래머스처럼)
   - 그래프로 표현해줘도 좋을 듯(도넛 그래프)
4. 최적화

옵션 하면 좋고 안하면 말고
번역기능
검색기능

공부하면 좋을 것

- 스토리북 붙이기
- react query test(https://tanstack.com/query/v4/docs/react/guides/testing)
