import {
  canRenderArchitectureBlocks,
  parseArchitectureBlocks,
  resolveArchitectureIcon,
} from './parseArchitecture';

const TINDLO_SAAS = `**Frontend**
React, TypeScript, Vite 기반 프런트엔드. Radix UI 기반 컴포넌트 구성.
**State & Data**
Zustand를 활용한 클라이언트 상태 관리, TanStack Query를 통한 서버 데이터 조회 및 캐싱.
**Real-time Communication**
기능 특성에 따라 SSE와 WebSocket을 분리 적용.

- **SSE:** 일정 관리, 칸반, 조직 가입·탈퇴, 팀 변경 등 서버 데이터 변경 사항 실시간 반영
- **WebSocket:** 스냅스페이스에서 사용자 간 양방향 실시간 상호작용 지원. 공간(Room) 생성 및 참여·이탈 관리

**Testing & Deployment**
Vitest와 React Testing Library 기반 테스트. GitHub Actions를 활용한 AWS S3·CloudFront 배포 및 버전 태그 생성, Slack 릴리즈 알림 자동화.`;

const SITE_STACK = `**Frontend**

- Next.js App Router, TypeScript, Tailwind CSS 기반 프런트엔드 구성

**Rendering**

- SSG를 활용한 정적 페이지 생성

**Hosting & CDN**

- AWS S3를 통한 정적 파일 호스팅 및 CloudFront를 통한 콘텐츠 배포

**CI/CD**

- GitHub Actions를 활용한 빌드 및 배포 자동화`;

describe('resolveArchitectureIcon', () => {
  it.each([
    ['Frontend', 'frontend'],
    ['Application', 'frontend'],
    ['Rendering', 'frontend'],
    ['Backend', 'backend'],
    ['Core', 'backend'],
    ['Database', 'database'],
    ['Data Management', 'database'],
    ['State & Data', 'state'],
    ['State Management', 'state'],
    ['Data Visualization', 'visualization'],
    ['Data Integration', 'integration'],
    ['Communication', 'integration'],
    ['Real-time Communication', 'realtime'],
    ['Automation', 'automation'],
    ['CI/CD', 'automation'],
    ['Deployment', 'automation'],
    ['Hosting & CDN', 'infrastructure'],
    ['Testing & Deployment', 'testing'],
    ['Data Collection', 'pipeline'],
    ['Data Processing', 'pipeline'],
    ['Caching & Revalidation', 'caching'],
    ['SEO & Metadata', 'seo'],
    ['Asset Management', 'asset'],
  ] as const)('%s → %s', (title, icon) => {
    expect(resolveArchitectureIcon(title)).toBe(icon);
  });
});

describe('parseArchitectureBlocks', () => {
  it('틴들로 SaaS 형식의 섹션과 하위 항목을 파싱한다', () => {
    const blocks = parseArchitectureBlocks(TINDLO_SAAS);

    expect(blocks).toHaveLength(4);
    expect(blocks[0]).toMatchObject({
      title: 'Frontend',
      icon: 'frontend',
    });
    expect(blocks[0].description).toContain('React, TypeScript, Vite');
    expect(blocks[1].icon).toBe('state');
    expect(blocks[2].title).toBe('Real-time Communication');
    expect(blocks[2].icon).toBe('realtime');
    expect(blocks[2].children).toEqual([
      {
        title: 'SSE',
        description:
          '일정 관리, 칸반, 조직 가입·탈퇴, 팀 변경 등 서버 데이터 변경 사항 실시간 반영',
      },
      {
        title: 'WebSocket',
        description:
          '스냅스페이스에서 사용자 간 양방향 실시간 상호작용 지원. 공간(Room) 생성 및 참여·이탈 관리',
      },
    ]);
    expect(blocks[3].icon).toBe('testing');
    expect(canRenderArchitectureBlocks(blocks)).toBe(true);
  });

  it('굵은 제목 + plain bullet 형식도 카드 블록으로 파싱한다', () => {
    const blocks = parseArchitectureBlocks(SITE_STACK);

    expect(blocks).toEqual([
      {
        title: 'Frontend',
        description: 'Next.js App Router, TypeScript, Tailwind CSS 기반 프런트엔드 구성',
        children: [],
        icon: 'frontend',
      },
      {
        title: 'Rendering',
        description: 'SSG를 활용한 정적 페이지 생성',
        children: [],
        icon: 'frontend',
      },
      {
        title: 'Hosting & CDN',
        description: 'AWS S3를 통한 정적 파일 호스팅 및 CloudFront를 통한 콘텐츠 배포',
        children: [],
        icon: 'infrastructure',
      },
      {
        title: 'CI/CD',
        description: 'GitHub Actions를 활용한 빌드 및 배포 자동화',
        children: [],
        icon: 'automation',
      },
    ]);
  });

  it('bold 없이 제목만 있는 줄도 섹션으로 인식한다', () => {
    const blocks = parseArchitectureBlocks(`Frontend
React, TypeScript, Vite 기반 프런트엔드.
State & Data
Zustand 상태 관리`);

    expect(blocks.map(block => block.title)).toEqual(['Frontend', 'State & Data']);
  });
});
