import { useTheme } from '@mui/material/styles';

import CONTENT_MAIN from '@/constants/description';
import usePrintMode from '@/hooks/usePrintMode';
import { cn } from '@/utils/classNames';

interface ICardContentProperty {
  content: string;
  link?: string;
  bold: string;
}

const contents = CONTENT_MAIN;

const PointStackCard = () => {
  const isDark = useTheme().palette.mode === 'dark';
  const { mode } = usePrintMode();

  return (
    <div className='px-3'>
      <div className='flex items-center gap-3 mb-4'>
        <span
          className={cn(
            'text-xs font-black tracking-widest uppercase shrink-0',
            isDark ? 'text-white/40' : 'text-black/40',
            mode === 'print' && '!text-[#555]',
          )}
        >
          ⚽️ OVERVIEW
        </span>
        <div
          className={cn(
            'flex-1 h-px',
            isDark ? 'bg-white/10' : 'bg-black/[0.08]',
            mode === 'print' && '!bg-[#ccc]',
          )}
        />
      </div>

      <ul className='p-1'>
        {contents.map((card: ICardContentProperty) => {
          const { content, link, bold } = card;
          const [prefix, suffix] = content.split(bold);
          return (
            <li key={content} className='text-[13px] p-1'>
              {bold ? (
                <>
                  {prefix}

                  <a href={link} className='no-underline text-inherit'>
                    <b className='font-extrabold'>{bold}</b>
                  </a>

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
