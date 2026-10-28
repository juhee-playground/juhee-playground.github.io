import { useState } from 'react';
import { Link } from 'react-router-dom';

import { alpha, useTheme } from '@mui/material/styles';

import { NOTION_COLOR_SET } from '@/constants/notion';
import usePrintMode from '@/hooks/usePrintMode';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const readKeywordTone = (colorName: string, isDark: boolean, isPrintMode: boolean) => {
  if (colorName === 'purple') {
    return isDark && !isPrintMode
      ? { accent: '#d7b3f5', fill: '#d7b3f5', textAlpha: 0.96, fillAlpha: 0.18, borderAlpha: 0.62 }
      : { accent: '#7b1fa2', fill: '#e1bee7', textAlpha: 1, fillAlpha: isPrintMode ? 0.45 : 0.5, borderAlpha: 0.45 };
  }

  const notionColor = NOTION_COLOR_SET[colorName] ?? NOTION_COLOR_SET.default;
  const accent = notionColor.text === 'white' ? '#9ca3af' : notionColor.text;
  const fill = notionColor.bg === 'inherit' ? accent : notionColor.bg;

  return {
    accent,
    fill,
    textAlpha: isPrintMode ? 1 : isDark ? 0.82 : 0.88,
    fillAlpha: isPrintMode ? 0.45 : isDark ? 0.16 : 0.42,
    borderAlpha: isPrintMode ? 0.4 : isDark ? 0.34 : 0.28,
  };
};

const FOLDED_SECTIONS = [
  { key: 'problem', label: 'Problem' },
  { key: 'keyContributions', label: 'Key Contributions' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'keyFeatures', label: 'Key Features' },
  { key: 'impact', label: 'Impact' },
] as const;

interface IDetailBlockProps {
  label: string;
  content: string;
  isPrintMode: boolean;
  isDark: boolean;
}

const DetailBlock = ({ label, content, isPrintMode, isDark }: IDetailBlockProps) => (
  <div className='my-2'>
    <p
      className={cn(
        'm-0 mb-1 text-avatar font-bold tracking-wide',
        isPrintMode ? 'text-[#333]' : isDark ? 'text-white/45' : 'text-black/45',
      )}
    >
      {label}
    </p>
    <p
      className={cn(
        'm-0 text-sm leading-relaxed whitespace-pre-line',
        isPrintMode ? 'text-[#181717]' : isDark ? 'text-white/80' : 'text-[#181717]',
      )}
    >
      {content}
    </p>
  </div>
);

const SubListItem = ({ info }: ISubListProps) => {
  const projectData = info;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const readSection = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
  const readSections = (sections: readonly { key: keyof IProjectData; label: string }[]) => sections
    .map(section => ({ ...section, content: readSection(projectData[section.key]) }))
    .filter(section => section.content);

  const summary = readSection(projectData.summary);
  const hero = readSection(projectData.hero);
  const foldedSections = readSections(FOLDED_SECTIONS);

  const { isPrintMode } = usePrintMode();
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const periodLabel = projectData.period.replace('~', ' ~ ');
  const showFolded = isPrintMode || isDetailOpen;
  const participationRate = typeof projectData.participationRate === 'number'
    ? Math.min(100, Math.max(0, projectData.participationRate))
    : null;

  return (
    <section className='my-3' key={`project__${projectData.id}`}>
      <div className='flex flex-col gap-1 my-1'>
        <div className='flex items-center gap-2'>
          <span aria-hidden='true' className='inline-block shrink-0 text-xs font-black leading-none'>
            ▶
          </span>
          {projectData.slug ? (
            <Link to={`/projects/${projectData.slug}`} className='text-xl font-semibold leading-none m-0 hover:underline'>
              {projectData.name}
            </Link>
          ) : (
            <h6 className='text-xl font-semibold leading-none m-0'>{projectData.name}</h6>
          )}
        </div>

      </div>

      <p className='my-1 flex flex-wrap items-center gap-x-1'>
        {periodLabel && (
          <>
            <span className='text-sm leading-none m-0'>{periodLabel}</span>
            <span className='text-sm leading-none m-0'>|</span>
          </>
        )}
        <span className='text-sm leading-none m-0'>참여인원 </span>
        <span className='text-sm font-semibold leading-none m-0'>{projectData.numberOfParticipants}</span>
        {participationRate !== null && (
          <>
            <span className='text-sm leading-none m-0'> | 참여비율</span>
            <span
              role='progressbar'
              aria-valuenow={participationRate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label='참여비율'
              className={cn(
                'inline-block h-1.5 w-16 overflow-hidden rounded-full',
                isPrintMode ? 'bg-[#ddd]' : isDark ? 'bg-white/12' : 'bg-black/10',
              )}
            >
              <span
                className={cn(
                  'block h-full rounded-full',
                  isPrintMode ? 'bg-[#444]' : isDark ? 'bg-white/70' : 'bg-black/55',
                )}
                style={{ width: `${participationRate}%` }}
              />
            </span>
          </>
        )}
      </p>

      {(projectData.keywords ?? []).length > 0 && (
        <ul className='flex flex-wrap gap-1.5 list-none my-2 p-0'>
          {projectData.keywords.map(keyword => {
            const tone = readKeywordTone(keyword.color, isDark, isPrintMode);

            return (
              <li key={`keyword_${projectData.id}_${keyword.id}`}>
                <span
                  className='inline-flex items-center px-2 py-1 border rounded-sm text-[11px] font-medium leading-none'
                  style={{
                    color: alpha(tone.accent, tone.textAlpha),
                    backgroundColor: alpha(tone.fill, tone.fillAlpha),
                    borderColor: alpha(tone.accent, tone.borderAlpha),
                  }}
                >
                  {keyword.name}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {(summary || hero) && (
        <div
          className={cn(
            'my-2 flex gap-3 rounded-md px-3 py-2.5',
            isPrintMode ? 'border border-[#e6e6e6] bg-[#f7f7f7]' : isDark ? 'bg-white/5' : 'bg-black/3',
          )}
        >
          <span aria-hidden='true' className='w-0.5 shrink-0 self-stretch rounded-full' style={{ backgroundColor: pointColor.hex }} />
          <div className='flex min-w-0 flex-col gap-1'>
            {summary && (
              <p
                className={cn(
                  'm-0 text-sm leading-relaxed whitespace-pre-line',
                  isPrintMode ? 'text-[#181717]' : isDark ? 'text-white/75' : 'text-[#181717]',
                )}
              >
                {summary}
              </p>
            )}
            {hero && (
              <p className='m-0 text-sm font-semibold leading-relaxed whitespace-pre-line' style={{ color: pointColor.hex }}>
                {hero}
              </p>
            )}
          </div>
        </div>
      )}

      {!isPrintMode && foldedSections.length > 0 && (
        <button
          type='button'
          aria-expanded={isDetailOpen}
          aria-controls={`project-detail-${projectData.id}`}
          onClick={() => setIsDetailOpen(open => !open)}
          className={cn(
            'my-2 cursor-pointer border-0 bg-transparent p-0 text-[11px] font-bold tracking-wide',
            'print:hidden',
            isDark ? 'text-white/45 hover:text-white/75' : 'text-black/45 hover:text-black/75',
          )}
        >
          {isDetailOpen ? '접기' : '더보기'}
        </button>
      )}

      <ul className='flex flex-wrap gap-1.5 list-none my-2 p-0'>
        {projectData.techStackOptions.map((stack, index) => (
          <li key={`tech_stack_${projectData.id}_${stack.id}_${index}`}>
            <span
              className={cn(
                'inline-flex items-center px-2 py-1 border rounded-sm',
                'text-[11px] font-medium leading-none',
                isPrintMode
                  ? 'border-[#bbb] text-[#333]'
                  : isDark
                    ? 'border-white/15 bg-white/4 text-white/65'
                    : 'border-black/10 bg-black/3 text-black/60',
              )}
            >
              {stack.name}
            </span>
          </li>
        ))}
      </ul>

      {foldedSections.length > 0 && (
        <div id={`project-detail-${projectData.id}`} className={cn(!showFolded && 'hidden print:block')}>
          {foldedSections.map(section => (
            <DetailBlock
              key={`${projectData.id}_${section.key}`}
              label={section.label}
              content={section.content}
              isPrintMode={isPrintMode}
              isDark={isDark}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SubListItem;
