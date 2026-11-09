import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useTheme } from '@mui/material/styles';

import { useResumeOverviewEdit } from '@/hooks/useResumeOverviewEdit';
import usePrintMode from '@/hooks/usePrintMode';
import { TOverviewItem } from '@/lib/resumeOverviewDraft';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const OverviewItemView = ({
  item,
  textClass,
  strongClass,
}: {
  readonly item: TOverviewItem;
  readonly textClass: string;
  readonly strongClass: string;
}) => {
  const [prefix, suffix] = item.bold ? item.content.split(item.bold) : [item.content, ''];

  if (!item.bold) {
    return <li className={textClass}>{item.content}</li>;
  }

  return (
    <li className={textClass}>
      {prefix}
      {item.link ? (
        <a href={item.link} target='_blank' rel='noreferrer' className={strongClass}>
          {item.bold}
        </a>
      ) : (
        <b className={strongClass}>{item.bold}</b>
      )}
      {suffix}
    </li>
  );
};

const PointStackCard = () => {
  const isDark = useTheme().palette.mode === 'dark';
  const { mode } = usePrintMode();
  const { pointColor } = useSettings();
  const {
    overview,
    draft,
    isEditing,
    startEdit,
    cancelEdit,
    commitEdit,
    resetDraftToDefault,
    updateDraftTitle,
    updateDraftSummary,
    updateDraftItemContent,
  } = useResumeOverviewEdit();

  const isPrint = mode === 'print';
  const display = isEditing ? draft : overview;
  const textClass = cn('text-sm leading-relaxed m-0', isDark ? 'text-white/80' : 'text-[#181717]');
  const strongClass = cn('font-extrabold', isDark ? 'text-white' : 'text-[#181717]');
  const inputClass = cn(
    'w-full rounded-md border px-2.5 py-2 text-sm leading-relaxed outline-none',
    isDark
      ? 'border-white/15 bg-white/5 text-white placeholder:text-white/35'
      : 'border-black/12 bg-white text-[#181717] placeholder:text-black/35',
  );
  const ghostButtonClass = cn(
    'rounded-md border px-2.5 py-1 text-xs font-medium',
    isDark ? 'border-white/20 text-white/60' : 'border-black/15 text-black/55',
  );

  return (
    <div className='p-3'>
      <div className='mb-4 flex items-center gap-3'>
        <span
          className={cn(
            'inline-flex shrink-0 items-center text-xs font-black tracking-widest uppercase',
            'pixel-font',
            'text-[#8a8a8a]',
          )}
        >
          <i className='pixel-icon pixel-icon-overview' aria-hidden='true' />
          OVERVIEW
        </span>
        <div
          className={cn(
            'h-px flex-1',
            isDark ? 'bg-white/10' : 'bg-black/8',
            isPrint && 'bg-[#ccc]!',
          )}
        />
        {!isPrint && (
          <div className='flex shrink-0 items-center gap-2'>
            {isEditing ? (
              <>
                <button type='button' onClick={resetDraftToDefault} className={ghostButtonClass}>
                  기본값
                </button>
                <button type='button' onClick={cancelEdit} className={ghostButtonClass}>
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={commitEdit}
                  className='rounded-md px-2.5 py-1 text-xs font-medium text-[#111]'
                  style={{ backgroundColor: pointColor.hex }}
                >
                  Done
                </button>
              </>
            ) : (
              <button
                type='button'
                onClick={startEdit}
                aria-label='Edit overview'
                title='Edit overview'
                className={cn(
                  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent',
                  isDark
                    ? 'text-white/55 hover:border-white/30 hover:text-white/85'
                    : 'text-black/45 hover:border-black/20 hover:text-black/75',
                )}
              >
                <EditOutlinedIcon sx={{ fontSize: 16 }} />
              </button>
            )}
          </div>
        )}
      </div>

      {isEditing && !isPrint ? (
        <div className='mb-3 flex flex-col gap-3 px-1'>
          <input
            type='text'
            value={draft.title}
            onChange={event => updateDraftTitle(event.target.value)}
            className={cn(inputClass, 'text-base font-bold')}
            aria-label='Overview title'
          />
          <textarea
            value={draft.summary}
            onChange={event => updateDraftSummary(event.target.value)}
            className={cn(inputClass, 'min-h-[96px] resize-y')}
            aria-label='Overview summary'
          />
          <ul className='flex flex-col gap-2 p-0'>
            {draft.items.map((item, index) => (
              <li key={`overview_item_${index}`} className='list-none'>
                <textarea
                  value={item.content}
                  onChange={event => updateDraftItemContent(index, event.target.value)}
                  className={cn(inputClass, 'min-h-[64px] resize-y')}
                  aria-label={`Overview item ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className='mb-3 flex flex-col gap-2 px-1'>
            <p className={cn('m-0 text-base font-bold', isDark ? 'text-white' : 'text-[#181717]')}>
              {display.title}
            </p>
            <p className={cn(textClass, 'whitespace-pre-line')}>{display.summary}</p>
          </div>

          <ul className='flex flex-col gap-1 p-1'>
            {display.items.map(item => (
              <OverviewItemView
                key={item.content}
                item={item}
                textClass={textClass}
                strongClass={strongClass}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PointStackCard;
