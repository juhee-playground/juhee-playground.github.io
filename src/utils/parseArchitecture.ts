export type TArchitectureIcon =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'state'
  | 'visualization'
  | 'integration'
  | 'realtime'
  | 'automation'
  | 'infrastructure'
  | 'testing'
  | 'pipeline'
  | 'caching'
  | 'seo'
  | 'asset'
  | 'default';

export type TArchitectureChild = {
  readonly title: string;
  readonly description: string;
};

export type TArchitectureBlock = {
  readonly title: string;
  readonly description: string;
  readonly children: readonly TArchitectureChild[];
  readonly icon: TArchitectureIcon;
};

/**
 * 공통 카테고리 → Notion 섹션명 alias.
 * 더 구체적인 alias를 앞에 둔다.
 */
const ARCHITECTURE_CATEGORIES: readonly {
  readonly icon: TArchitectureIcon;
  readonly aliases: readonly string[];
}[] = [
  { icon: 'realtime', aliases: ['real-time communication', 'real-time', 'realtime'] },
  { icon: 'state', aliases: ['state & data', 'state management', 'state'] },
  { icon: 'visualization', aliases: ['data visualization'] },
  { icon: 'pipeline', aliases: ['data collection', 'data processing', 'data pipeline'] },
  { icon: 'integration', aliases: ['data integration', 'communication'] },
  { icon: 'database', aliases: ['data management', 'database'] },
  { icon: 'caching', aliases: ['caching & revalidation', 'caching'] },
  { icon: 'seo', aliases: ['seo & metadata', 'seo'] },
  { icon: 'asset', aliases: ['asset management'] },
  { icon: 'testing', aliases: ['testing & deployment', 'testing'] },
  { icon: 'automation', aliases: ['ci/cd', 'automation', 'deployment'] },
  {
    icon: 'infrastructure',
    aliases: ['hosting & cdn', 'hosting', 'infrastructure', 'cdn'],
  },
  { icon: 'frontend', aliases: ['frontend', 'application', 'rendering'] },
  { icon: 'backend', aliases: ['backend', 'core'] },
];

export const resolveArchitectureIcon = (title: string): TArchitectureIcon => {
  const key = title.toLowerCase().trim();
  const matched = ARCHITECTURE_CATEGORIES.find(category =>
    category.aliases.some(alias => key === alias || key.includes(alias)),
  );
  return matched?.icon ?? 'default';
};

const stripBold = (value: string) => value.replace(/\*\*/g, '').trim();

const isSectionTitleLine = (line: string) => {
  if (line.startsWith('-')) return false;
  if (/^\*\*[^*]+\*\*$/.test(line)) return true;

  const cleaned = stripBold(line);
  if (!cleaned || cleaned.length > 48) return false;

  if (resolveArchitectureIcon(cleaned) !== 'default') return true;

  // 짧은 영문 제목만 허용 (한글 설명 줄은 제목으로 취급하지 않음)
  return /^[A-Za-z][A-Za-z0-9 +&/\-]*$/.test(cleaned) && cleaned.length <= 40;
};

const matchTitledChild = (line: string) =>
  line.match(/^-\s*\*\*(.+?):\*\*\s*(.*)$/) ??
  line.match(/^-\s*\*\*(.+?)\*\*:\s*(.*)$/) ??
  line.match(/^-\s*\*\*(.+?)\*\*\s*[—–-]?\s*(.*)$/) ??
  // Notion bold가 풀린 `- SSE: 설명`
  line.match(/^-\s*([A-Za-z][A-Za-z0-9 +&/\-]{0,24}):\s+(.+)$/);

const matchPlainBullet = (line: string) => line.match(/^-\s+(.+)$/);

const appendDescription = (current: string, next: string) =>
  current ? `${current}\n${next}` : next;

/**
 * Notion architecture 텍스트 파싱.
 *
 * 형식 A:
 *   **Frontend**
 *   React, TypeScript, Vite ...
 *   - **SSE:** ...
 *
 * 형식 B:
 *   **Frontend**
 *   - Next.js App Router ...
 *   **Rendering**
 *   - SSG를 활용한 ...
 */
export const parseArchitectureBlocks = (content: string): readonly TArchitectureBlock[] => {
  const lines = content
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim());

  const blocks: TArchitectureBlock[] = [];
  let current: {
    title: string;
    description: string;
    children: TArchitectureChild[];
    icon: TArchitectureIcon;
  } | null = null;

  const commit = () => {
    if (!current) return;
    if (!current.title && !current.description && current.children.length === 0) {
      current = null;
      return;
    }
    blocks.push({
      title: current.title,
      description: current.description.trim(),
      children: current.children,
      icon: current.icon,
    });
    current = null;
  };

  lines.forEach(line => {
    if (!line) return;

    const titledChild = matchTitledChild(line);
    if (titledChild && current) {
      const title = stripBold(titledChild[1]).replace(/:$/, '').trim();
      const description = stripBold(titledChild[2] ?? '').trim();
      if (title || description) {
        current.children.push({ title, description });
      }
      return;
    }

    // `- 설명` (제목 없는 plain bullet) → 카드 description
    const plainBullet = matchPlainBullet(line);
    if (plainBullet && current) {
      const description = stripBold(plainBullet[1]).trim();
      if (description) {
        current.description = appendDescription(current.description, description);
      }
      return;
    }

    if (isSectionTitleLine(line)) {
      commit();
      const title = stripBold(line);
      current = {
        title,
        description: '',
        children: [],
        icon: resolveArchitectureIcon(title),
      };
      return;
    }

    if (!current) {
      current = {
        title: '',
        description: stripBold(line),
        children: [],
        icon: 'default',
      };
      return;
    }

    current.description = appendDescription(current.description, stripBold(line));
  });

  commit();
  return blocks;
};

export const canRenderArchitectureBlocks = (blocks: readonly TArchitectureBlock[]) =>
  blocks.some(block => Boolean(block.title) || block.children.length > 0);
