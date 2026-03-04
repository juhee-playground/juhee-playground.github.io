import { useTheme } from '@mui/material/styles';

import CONTENT_MAIN from '@/constants/description';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface IContentItem {
  content: string;
  link?: string;
  bold: string;
}

const SiteOverview = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  return (
    <div
      className={cn(
        'rounded-2xl p-6 flex flex-col gap-4',
        isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-black/8',
      )}
    >
      <div className='flex items-center gap-2'>
        <span className='text-xs font-black tracking-[0.2em] uppercase' style={{ color: pt }}>
          Overview
        </span>
        <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/10')} />
      </div>

      <ul className='flex flex-col gap-2'>
        {CONTENT_MAIN.map(({ content, link, bold }: IContentItem) => {
          const [prefix, suffix] = bold ? content.split(bold) : [content, ''];
          return (
            <li key={content} className={cn('flex items-start gap-2.5 text-sm leading-relaxed', isDark ? 'text-white/70' : 'text-black/65')}>
              <span className='mt-2 w-1 h-1 rounded-full shrink-0' style={{ backgroundColor: pt }} />
              <span>
                {bold ? (
                  <>
                    {prefix}
                    <a
                      href={link}
                      target='_blank'
                      rel='noreferrer'
                      className={cn('font-extrabold underline-offset-2 hover:underline', isDark ? 'text-white' : 'text-[#181717]')}
                    >
                      {bold}
                    </a>
                    {suffix}
                  </>
                ) : (
                  content
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SiteOverview;
