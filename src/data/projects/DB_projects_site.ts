export type TProjectStatus = 'LIVE' | 'WIP' | 'ARCHIVED';

export interface TProject {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  status: TProjectStatus;
  links?: {
    live?: string;
    repo?: string;
    notion?: string;
  };
  // Case study sections
  problem?: string;
  solution?: string;
  architecture?: string;
  features?: string[];
  lessons?: string[];
}

export const PROJECTS_SITE: TProject[] = [
  {
    slug: 'juhee-playground',
    title: 'JUHEE PLAYGROUND',
    tagline: '채용 플랫폼에 종속되지 않는 개인 이력서 포트폴리오',
    summary:
      'GameBoy UI 인터랙션, 다크모드, 프린트 PDF 변환 지원. React + TypeScript + Tailwind로 구축된 풀 SPA 포트폴리오. Notion API를 데이터 백엔드로 활용해 별도 서버 없이 실시간 이력서를 관리한다.',
    tags: ['React', 'TypeScript', 'Tailwind', 'D3', 'Zustand', 'React Query'],
    status: 'LIVE',
    links: {
      live: 'https://juhee-playground.github.io',
    },
    problem:
      'PDF 기반 이력서는 버전 관리가 어렵고, 채용 플랫폼 전용 포맷은 개성을 표현하기 힘들다. Notion 페이지는 커스텀 UI를 적용할 수 없어 브랜딩에 한계가 있었다.',
    solution:
      'Notion API를 CMS로 사용해 데이터를 분리하고, React SPA로 완전히 커스터마이즈된 이력서 뷰를 구현했다. GameBoy 스타일의 랜딩 페이지로 첫인상을 차별화했다.',
    architecture:
      'Vite + React + TypeScript 기반 SPA. Zustand로 전역 상태(다크모드, 포인트 컬러, 프린트 모드) 관리. React Query로 Notion API 데이터 패칭 및 캐싱. D3.js 기반 커리어 타임라인 대시보드. GitHub Pages 배포.',
    features: [
      'GameBoy 스타일 인터랙티브 랜딩 페이지 (방향키/버튼 탐색)',
      'Notion API 연동 실시간 이력서 데이터',
      '다크모드 / 라이트모드 + 포인트 컬러 테마 커스터마이징',
      '프린트 PDF 최적화 레이아웃',
      'D3.js 기반 커리어 타임라인 대시보드',
      'framer-motion 마이크로 인터랙션',
    ],
    lessons: [
      'Notion API를 CMS로 활용하면 별도 서버 없이 콘텐츠를 실시간 업데이트할 수 있다',
      '독창적인 인터랙션(GameBoy UI)이 방문자 체류 시간과 기억에 남는 인상을 만든다',
      'Tailwind JIT + framer-motion 조합으로 빠르게 세련된 UI를 구현할 수 있다',
      'sticky 헤더 + scroll-mt 조합으로 앵커 링크 UX를 자연스럽게 만들 수 있다',
    ],
  },
  {
    slug: 'ohcoach-ultimate',
    title: 'OHCOACH ULTIMATE',
    tagline: '웨어러블 EPTS 기반 스포츠 데이터 시각화 플랫폼',
    summary:
      'GPS 및 심박수 센서 데이터를 실시간으로 시각화하고 선수 퍼포먼스를 분석하는 웹 플랫폼. 전문가용 대시보드, 다국어(한/영) 지원, 팀 관리 기능을 포함한다.',
    tags: ['Vue 3', 'D3.js', 'NodeJS', 'i18n'],
    status: 'ARCHIVED',
    links: {
      notion: 'https://dino100.notion.site/OHCOACH-Ultimate-fd838cf131fc4d718d2b4d89e7d42dd8',
    },
    problem:
      '스포츠 현장에서 선수의 GPS·심박수 데이터를 실시간 모니터링하고, 경기 후 분석 리포트를 빠르게 생성할 방법이 없었다. 기존 솔루션은 고가의 전용 소프트웨어에 의존하고 있었다.',
    solution:
      'Vue 기반 SPA에 D3.js로 커스텀 차트를 구현하고, 웨어러블 기기의 HTTP 스트리밍 데이터를 폴링 방식으로 실시간 업데이트하도록 설계했다. 경기 종료 후 자동 리포트를 PDF로 출력할 수 있도록 했다.',
    architecture:
      'Vue 3 + Vuex + D3.js 프론트엔드. NodeJS 미들웨어 서버를 통해 EPTS 기기 데이터를 중계. vue-i18n으로 한/영 다국어 지원. 선수·팀 데이터는 REST API 기반으로 CRUD 처리.',
    features: [
      'GPS 궤적 실시간 시각화 (필드 오버레이)',
      'D3.js 기반 심박수·속도·가속도 시계열 차트',
      '경기 후 자동 퍼포먼스 리포트 생성',
      '팀 / 선수 프로파일 관리',
      '한국어 / 영어 다국어 지원',
    ],
    lessons: [
      '실시간 데이터 폴링은 주기 설정과 상태 동기화 전략이 성능에 크게 영향을 미친다',
      'D3.js 커스텀 차트는 자유도가 높지만 진입 장벽이 높아 초기 설계가 중요하다',
      '다국어 지원은 처음부터 설계에 포함해야 나중에 텍스트 추출 비용이 적다',
    ],
  },
  {
    slug: 'erp-system',
    title: 'ERP SYSTEM',
    tagline: '운영·자문·펀딩 플랫폼 내 어드민 ERP',
    summary:
      '스포츠 에이전시의 선수 계약·정산·스케줄을 통합 관리하는 어드민. 재사용 가능한 UI 컴포넌트 시스템을 구축해 개발 속도를 높이고, PHP 백엔드와의 레거시 연동을 유지했다.',
    tags: ['React', 'TypeScript', 'PHP', 'MySQL'],
    status: 'ARCHIVED',
    problem:
      '엑셀 기반 수작업으로 처리하던 선수 계약·정산·스케줄 관리를 디지털화해야 했다. 기존 PHP 레거시 백엔드를 전면 교체하기 어려운 상황에서 현대적인 프론트엔드를 올려야 했다.',
    solution:
      'React를 프론트엔드로 도입해 SPA 어드민을 구축하고, PHP REST API와 연동했다. 반복되는 폼·테이블·모달 컴포넌트를 추상화한 내부 컴포넌트 라이브러리를 만들어 팀 개발 생산성을 높였다.',
    architecture:
      'React 17 + TypeScript + Context API. PHP Laravel REST API 연동. MySQL 기반 관계형 데이터 모델. JWT 인증. 사내 전용 배포 환경.',
    features: [
      '선수 계약·정산 통합 관리 화면',
      '스케줄 캘린더 뷰 (월·주·일 보기)',
      '역할 기반 접근 제어 (RBAC)',
      '재사용 가능한 폼·테이블·모달 컴포넌트 시스템',
      'PHP Laravel REST API 연동',
    ],
    lessons: [
      '레거시 백엔드를 유지하면서 프론트엔드만 현대화하는 전략이 리스크를 낮추면서 효과적이다',
      '내부 컴포넌트 추상화에 초기 투자를 하면 장기적으로 개발 속도가 크게 빨라진다',
      'PHP와 React의 조합은 점진적 마이그레이션 시나리오에서 유효한 선택이다',
    ],
  },
];
