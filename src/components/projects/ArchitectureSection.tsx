import { ReactNode } from 'react';

import { ArchitectureIcon } from '@/components/projects/ArchitectureIcon';
import { cn } from '@/utils/classNames';
import {
  TArchitectureBlock,
  parseArchitectureBlocks,
  canRenderArchitectureBlocks,
} from '@/utils/parseArchitecture';

interface IArchitectureSectionProps {
  readonly content: string;
  readonly isDark: boolean;
  readonly fallback: ReactNode;
}

const ArchitectureCard = ({
  block,
  isDark,
}: {
  readonly block: TArchitectureBlock;
  readonly isDark: boolean;
}) => {
  const hasChildren = block.children.length > 0;

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-3 rounded-xl border px-4 py-4 md:px-5 md:py-5',
        isDark ? 'border-white/12 bg-white/3' : 'border-black/10 bg-black/2',
        hasChildren && 'md:col-span-2',
      )}
    >
      <div className='flex flex-col gap-1.5'>
        <div className='flex items-center gap-2'>
          <ArchitectureIcon
            type={block.icon}
            className={isDark ? 'text-white/70' : 'text-black/60'}
          />
          <h3
            className={cn(
              'm-0 text-sm font-bold tracking-tight md:text-md',
              isDark ? 'text-white' : 'text-[#181717]',
            )}
          >
            {block.title}
          </h3>
        </div>
        {block.description && (
          <p
            className={cn(
              'm-0 text-md leading-[1.75] md:text-base md:leading-[1.8]',
              isDark ? 'text-white/70' : 'text-black/65',
            )}
          >
            {block.description}
          </p>
        )}
      </div>

      {hasChildren && (
        <div className='flex flex-col gap-3'>
          {block.children.map(child => (
            <div
              key={`${block.title}_${child.title}`}
              className={cn(
                'flex flex-col gap-1 border-t pt-3',
                isDark ? 'border-white/8' : 'border-black/6',
              )}
            >
              <p
                className={cn(
                  'm-0 text-sm font-semibold',
                  isDark ? 'text-white/90' : 'text-[#181717]',
                )}
              >
                {child.title}
              </p>
              {child.description && (
                <p
                  className={cn(
                    'm-0 text-md leading-[1.75]',
                    isDark ? 'text-white/65' : 'text-black/60',
                  )}
                >
                  {child.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ArchitectureSection = ({
  content,
  isDark,
  fallback,
}: IArchitectureSectionProps) => {
  const blocks = parseArchitectureBlocks(content);

  if (!canRenderArchitectureBlocks(blocks)) {
    return <>{fallback}</>;
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5'>
      {blocks.map(block => (
        <ArchitectureCard
          key={block.title || block.description}
          block={block}
          isDark={isDark}
        />
      ))}
    </div>
  );
};
