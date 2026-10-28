import { useTheme } from '@mui/material/styles';

import CONTENT_MAIN, { DEVELOPER_OVERVIEW } from '@/constants/description';
import usePrintMode from '@/hooks/usePrintMode';
import { cn } from '@/utils/classNames';

interface ICardContentProperty {
  content: string;
  link?: string;
  bold: string;
}

const PointStackCard = () => {
  const isDark = useTheme().palette.mode === 'dark';
  const { mode } = usePrintMode();
  const textClass = cn('text-sm leading-relaxed m-0', isDark ? 'text-white/80' : 'text-[#181717]');
  const strongClass = cn('font-extrabold', isDark ? 'text-white' : 'text-[#181717]');

  return (
    <div className='p-3'>
      <div className='flex items-center gap-3 mb-4'>
        <span
          className={cn(
            'text-xs font-black tracking-widest uppercase shrink-0 inline-flex items-center',
            'pixel-font',
            'text-[#8a8a8a]',
          )}
        >
          <i className='pixel-icon pixel-icon-overview' aria-hidden='true' />
          OVERVIEW
        </span>
        <div
          className={cn(
            'flex-1 h-px',
            isDark ? 'bg-white/10' : 'bg-black/8',
            mode === 'print' && 'bg-[#ccc]!',
          )}
        />
      </div>

      <div className='flex flex-col gap-2 px-1 mb-3'>
        <p className={cn('m-0 text-base font-bold', isDark ? 'text-white' : 'text-[#181717]')}>
          {DEVELOPER_OVERVIEW.title}
        </p>
        <p className={textClass}>{DEVELOPER_OVERVIEW.summary}</p>
      </div>

      <ul className='flex flex-col gap-1 p-1'>
        {CONTENT_MAIN.map(({ content, link, bold }: ICardContentProperty) => {
          const [prefix, suffix] = bold ? content.split(bold) : [content, ''];
          return (
            <li key={content} className={textClass}>
              {bold ? (
                <>
                  {prefix}
                  {link ? (
                    <a href={link} target='_blank' rel='noreferrer' className={strongClass}>
                      {bold}
                    </a>
                  ) : (
                    <b className={strongClass}>{bold}</b>
                  )}
                  {suffix}
                </>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PointStackCard;
