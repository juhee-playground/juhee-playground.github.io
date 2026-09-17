import { useTheme } from '@mui/material/styles';

import CONTENT_MAIN from '@/constants/description';
import { useSettings } from '@/stores/useSettings';
import { getGameBoyPalette } from './gameboyPalette';

interface IContentItem {
  content: string;
  link?: string;
  bold: string;
}

const SiteOverview = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const gb = getGameBoyPalette(isDark, pointColor.hex);

  return (
    <div
      className='p-6 flex flex-col gap-4'
      style={{
        backgroundColor: gb.panel,
        border: `2px solid ${gb.border}`,
        borderRadius: 4,
        boxShadow: `3px 3px 0 ${gb.border}`,
      }}
    >
      <div className='flex items-center gap-2'>
        <span className='pixel-font text-[10px] tracking-[0.1em] uppercase' style={{ color: gb.text }}>
          Overview
        </span>
        <div className='flex-1 h-[2px] rounded-[4px]' style={{ backgroundColor: gb.border }} />
      </div>

      <ul className='flex flex-col gap-2'>
        {CONTENT_MAIN.map(({ content, link, bold }: IContentItem) => {
          const [prefix, suffix] = bold ? content.split(bold) : [content, ''];
          return (
            <li key={content} className='flex items-start gap-2.5 text-sm leading-relaxed' style={{ color: gb.textDim }}>
              <span className='mt-2 w-1.5 h-1.5 shrink-0' style={{ backgroundColor: gb.accent }} />
              <span>
                {bold ? (
                  <>
                    {prefix}
                    <a
                      href={link}
                      target='_blank'
                      rel='noreferrer'
                      className='font-extrabold underline-offset-2 hover:underline'
                      style={{ color: gb.text }}
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
