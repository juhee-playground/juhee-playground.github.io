export interface ISiteProject {
  name: string;
  period: string;
  techStack: string[];
  slug: string;
  summary: string;
  hero: string;
  problem: string;
  solution: string;
  architecture: string;
  keyFeatures: string;
  impact: string;
  mainSkill: string;
  role: string;
  numberOfParticipants: number;
  participationRate: number;
  keywords: string[];
  url?: string;
  company: string;
}

export const PROJECTS_SITE: ISiteProject[] = [
  {
    name: 'OHCOACH Admin(백오피스)',
    period: '2020/01/02 → 2021/03/31',
    techStack: ['GitHub Actions', 'GoogleMap API', 'Javascript', 'Vue', 'Vuex'],
    slug: 'ohcoach-admin',
    summary: '관리자 업무 자동화 및 위치 기반 UI 시스템 구축',
    hero:
      '관리자 업무 자동화 및 위치 기반 경기장 설정 시스템 구축\n문서 처리 자동화와 지도 기반 UI 개선을 통해 운영 효율성과 정확도를 향상시킨 프로젝트',
    problem:
      '• 입고, 출고, 검수 등의 문서 처리가 수작업으로 이루어져\n업무 시간이 오래 걸리고 오류가 자주 발생하는 문제가 있었다.\n\n• 또한 경기장 설정 기능이 없어\n사용자가 원하는 위치를 직접 설정하는 데 불편함이 있었다.',
    solution:
      '• 문서 처리 프로세스를 개선하여\n출고 과정 내에서 문서를 자동 생성하고 다운로드할 수 있도록 기능을 통합했다.\n\n• Google Maps API의 Polygon 기능을 활용하여\n사용자가 지도 위에서 원하는 영역을 직접 설정할 수 있는 UI를 구현했다.\n\n• 또한 GitHub Actions를 도입하여\n배포 과정을 자동화하고 수동 배포 과정에서 발생하던 오류를 제거했다.',
    architecture:
      '- Vue 기반 관리자 페이지 개발\n- Google Maps API (Polygon) 기반 위치 설정 UI\n- GitHub Actions + CircleCI 기반 CI/CD 구축\n- 문서 자동 생성 및 다운로드 기능 설계',
    keyFeatures:
      '- 출고/입고/검수 문서 자동 생성 및 다운로드\n- 지도 기반 경기장 영역 설정 UI\n- 관리자 전용 페이지 분리 구조\n- 자동 배포 파이프라인 구축',
    impact:
      '- 문서 처리 속도 향상\n- 배포 오류 감소 및 배포 시간 단축\n- 지도 기반 UI 도입으로 사용자 경험 개선\n- 현장 대응력 향상',
    mainSkill: 'Vue',
    role: '서비스 배포 및 운영, 기능 개선',
    numberOfParticipants: 2,
    participationRate: 80,
    keywords: ['GoogleMap API 활용', '문서 다운로드 기능', '배포 및 운영'],
    url: 'https://dino100.notion.site/OHCOACH-Admin-19c653a2c55e4ff7a3ae601aef929362?pvs=4',
    company: '핏투게더 (https://www.notion.so/ac39715c45de4b359daa30cf52a10664?pvs=21)',
  },
  {
    name: 'OHCOACH Ultimate(자사서비스)',
    period: '2020/09/01 → 2022/11/30',
    techStack: ['D3', 'GoogleMap API', 'Highcharts.js', 'Javascript', 'Scss', 'Storybook', 'Vue', 'Vuex'],
    slug: 'ohcoach-ultimate',
    summary: '데이터 시각화를 통한 축구 분석 서비스 구조 개선 및 리포트 자동화',
    hero:
      '축구 데이터 시각화 서비스 고도화 및 관리자/사용자 구조 분리\n데이터 전달력을 높이기 위한 커스텀 차트와 리포트 시스템을 구축한 프로젝트',
    problem:
      '• 관리자 기능과 사용자 기능이 하나의 서비스에 혼합되어 있어\nUI와 기능 측면에서 사용성이 떨어지는 문제가 있었다.\n\n• 또한 기존 차트 라이브러리로는 요구사항에 맞는 복잡한 데이터 시각화를 구현하는 데 한계가 있었다.\n\n• 데이터를 효과적으로 전달하지 못해 사용자 의사결정에 어려움이 있었다.',
    solution:
      '• 관리자(Admin)와 사용자(User) 도메인을 분리하여\n각 역할에 맞는 UI와 기능을 독립적으로 구성했다.\n\n• 경기 데이터를 요약하여 PDF로 출력할 수 있는 리포트 기능을 구현하여\n데이터 전달 과정을 단순화했다.\n\n• 복잡한 시각화 요구사항을 해결하기 위해\n기존 라이브러리 대신 D3를 도입하여 커스텀 차트를 직접 구현했다.',
    architecture:
      '- Vue 기반 서비스 및 관리자 페이지 분리 구조\n- D3 기반 커스텀 데이터 시각화 시스템\n- PDF 리포트 생성 기능\n- GitHub Actions 기반 CI/CD 구축',
    keyFeatures:
      '- 관리자/사용자 도메인 분리 구조\n- 경기 데이터 요약 및 PDF 리포트 기능\n- D3 기반 커스텀 차트 구현\n- 데이터 시각화 고도화',
    impact:
      '- 관리자 UX 개선 및 사용자 인터페이스 품질 향상\n- 리포트 자동화를 통해 감독 보고 업무 효율 증가\n- 다양한 데이터 시각화 요구사항 대응 가능\n- 서비스 구조 개선으로 유지보수 효율 향상',
    mainSkill: 'Vue',
    role: '서비스 개발, 고도화 및 유지보수',
    numberOfParticipants: 3,
    participationRate: 50,
    keywords: ['D3', 'UX 개선기획', 'chart', 'pdf기능', '데이터 시각화', '리펙토링'],
    url: 'https://dino100.notion.site/OHCOACH-Ultimate-fd838cf131fc4d718d2b4d89e7d42dd8',
    company: '핏투게더 (https://www.notion.so/ac39715c45de4b359daa30cf52a10664?pvs=21)',
  },
  {
    name: '사내 ERP 시스템',
    period: '2019/01/02 → 2019/04/30',
    techStack: ['GoogleSheet API', 'Javascript', 'Slack Webhook', 'Vue', 'Zapier'],
    slug: 'erp-system',
    summary: '분산된 사내 업무를 통합하고 자동화를 통해 운영 효율을 개선한 ERP 시스템 구축',
    hero: '분산된 사내 업무를 통합하고 자동화를 통해 운영 효율을 개선한 ERP 시스템 구축',
    problem:
      '근태, 생산, 자산 관리 등 사내 업무가 각각 분리되어 있어\n데이터 접근성이 낮고 업무 처리 효율이 떨어지는 문제가 있었다.\n\n또한 출퇴근 기록과 업무 관리가 수작업으로 이루어져\n정보 공유가 늦고 오류가 발생하는 상황이 반복되었다.\n\n데이터가 분산되어 있어 의사결정에 필요한 정보를 빠르게 확인하기 어려웠다.',
    solution:
      '• 근태, 생산, 자산 관리 기능을 통합한 ERP 시스템을 구축하여\n사내 업무를 하나의 플랫폼에서 관리할 수 있도록 개선했다.\n\n• Google Sheets API를 활용하여\n경영관리팀이 데이터를 쉽게 조회하고 관리할 수 있는 구조를 설계했다.\n\n• Slack Webhook과 Zapier를 활용하여\n출퇴근 기록을 자동으로 입력하고 공유되도록 자동화했다.\n\n• QR 코드 생성 기능을 통해\n자산 추적 및 검증 과정을 자동화하고 대량 생성 기능을 구현했다.',
    architecture:
      '- Vue 기반 ERP 프론트엔드 개발\n- Google Sheets API 기반 데이터 관리 구조\n- Slack Webhook + Zapier 자동화 파이프라인\n- QR 코드 생성 및 자산 추적 시스템',
    keyFeatures:
      '- 근태 / 생산 / 자산 관리 통합 ERP 시스템\n- Google Sheets 기반 데이터 관리\n- Slack 연동 출퇴근 자동 기록 시스템\n- QR 코드 대량 생성 및 자산 추적 기능',
    impact:
      '- 수작업 업무 제거 및 업무 시간 단축\n- 데이터 입력 오류 감소 및 정보 정확도 향상\n- 자산 관리 자동화로 재고 추적 효율 개선\n- Slack 연동을 통한 실시간 업무 공유',
    mainSkill: 'Vue',
    role: '서비스 배포 및 운영',
    numberOfParticipants: 2,
    participationRate: 80,
    keywords: ['구글 시트 API', '사내 최적화 ERP 모듈 개발', '슬랙 웹 훅'],
    url: 'https://dino100.notion.site/ERP-3e2c2b03001f4989b54164f087c9f269',
    company: '핏투게더 (https://www.notion.so/ac39715c45de4b359daa30cf52a10664?pvs=21)',
  },
];
