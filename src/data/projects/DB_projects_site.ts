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
  detail?: {
    problem?: string;
    solution?: string;
    architecture?: string;
  };
}

export const PROJECTS_SITE: TProject[] = [
  {
    slug: 'juhee-playground',
    title: 'JUHEE PLAYGROUND',
    tagline: '채용 플랫폼에 종속되지 않는 개인 이력서 포트폴리오',
    summary:
      'GameBoy UI 인터랙션, 다크모드, 프린트 PDF 변환 지원. React + TypeScript + Tailwind로 구축된 풀 SPA 포트폴리오. Notion API를 데이터 백엔드로 활용해 별도 서버 없이 실시간 이력서를 업데이트한다.',
    tags: ['React', 'TypeScript', 'Tailwind', 'D3', 'Zustand'],
    status: 'LIVE',
    links: {
      live: 'https://juhee-playground.github.io',
    },
    detail: {
      problem:
        'PDF 기반 이력서는 버전 관리가 어렵고, 채용 플랫폼 전용 포맷은 개성을 표현하기 힘들다. 그리고 Notion 페이지는 커스텀 UI를 적용할 수 없다.',
      solution:
        'Notion API를 CMS로 사용해 데이터를 분리하고, React SPA로 완전히 커스터마이즈된 이력서 뷰를 제공한다. GameBoy 스타일의 랜딩 페이지로 첫인상을 차별화했다.',
      architecture:
        'Vite + React + TypeScript 기반 SPA. Zustand로 전역 상태(다크모드, 포인트 컬러, 프린트 모드) 관리. React Query로 Notion API 데이터 패칭 및 캐싱. D3.js 기반 대시보드. GitHub Pages에 배포.',
    },
  },
  {
    slug: 'ohcoach-ultimate',
    title: 'OHCOACH ULTIMATE',
    tagline: '웨어러블 EPTS 기반 스포츠 데이터 시각화 플랫폼',
    summary:
      'GPS 및 심박수 센서 데이터를 실시간으로 시각화하고 선수 퍼포먼스를 분석하는 웹 플랫폼. 전문가용 대시보드, 다국어(한/영) 지원, 팀 관리 기능을 포함한다.',
    tags: ['Vue', 'D3', 'SCSS', 'NodeJS'],
    status: 'ARCHIVED',
    links: {
      notion: 'https://dino100.notion.site/OHCOACH-Ultimate-fd838cf131fc4d718d2b4d89e7d42dd8',
    },
    detail: {
      problem:
        '스포츠 현장에서 선수의 GPS·심박수 데이터를 실시간으로 모니터링하고, 경기 후 분석 리포트를 빠르게 생성할 방법이 필요했다.',
      solution:
        'Vue 기반 SPA에 D3.js로 커스텀 차트를 구현하고, 웨어러블 기기의 BLE/HTTP 스트리밍 데이터를 실시간 업데이트하도록 설계했다.',
      architecture:
        'Vue 3 + Vuex + D3.js. NodeJS 미들웨어 서버를 통해 EPTS 기기 데이터를 중계. i18n 다국어 지원. SCSS 기반 컴포넌트 스타일 시스템.',
    },
  },
  {
    slug: 'erp-system',
    title: 'ERP SYSTEM',
    tagline: '운영·자문·펀딩 플랫폼 내 어드민 ERP',
    summary:
      '스포츠 에이전시의 선수 계약·정산·스케줄을 통합 관리하는 어드민. 재사용 가능한 UI 컴포넌트 시스템을 구축해 개발 속도를 높이고, PHP 백엔드와의 레거시 연동을 유지했다.',
    tags: ['React', 'PHP', 'MySQL'],
    status: 'ARCHIVED',
    detail: {
      problem:
        '엑셀 기반 수작업으로 처리하던 선수 계약·정산·스케줄 관리를 디지털화해야 했다. 기존 PHP 레거시 백엔드를 유지하면서 현대적인 프론트엔드를 올려야 했다.',
      solution:
        'React를 프론트엔드로 도입해 SPA 어드민을 구축하고, PHP REST API와 연동했다. 반복되는 폼·테이블 컴포넌트를 추상화해 팀 내 개발 생산성을 높였다.',
      architecture:
        'React 17 + Context API. PHP Laravel REST API 연동. MySQL 기반 관계형 데이터 모델. 사내 전용 배포 환경.',
    },
  },
];
