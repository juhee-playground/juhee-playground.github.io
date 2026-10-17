import CONTENT_MAIN, { DEVELOPER_OVERVIEW } from '@/constants/description';
import { useSettings } from '@/stores/useSettings';
import { getGameBoyPalette } from './gameboyPalette';

interface IContentItem {
  content: string;
  link?: string;
  bold: string;
}

const SiteOverview = () => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);

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
        <span className='pixel-font text-body-2xs tracking-widest uppercase' style={{ color: gb.text }}>
          Overview
        </span>
        <div className='flex-1 h-0.5 rounded-sm' style={{ backgroundColor: gb.border }} />
      </div>

      <div className='flex flex-col gap-1.5'>
        <p className='m-0 text-base font-bold tracking-tight md:text-lg' style={{ color: gb.text }}>
          {DEVELOPER_OVERVIEW.title}
        </p>
        <p className='m-0 text-sm leading-relaxed' style={{ color: gb.textDim }}>
          {DEVELOPER_OVERVIEW.summary}
        </p>
      </div>

      <ul className='flex flex-col gap-2'>
        {CONTENT_MAIN.map(({ content, link, bold }: IContentItem) => {
          const [prefix, suffix] = bold ? content.split(bold) : [content, ''];
          return (
            <li
              key={content}
              className='flex items-start gap-2.5 text-sm leading-relaxed'
              style={{ color: gb.textDim }}
            >
              <span className='mt-2 h-1.5 w-1.5 shrink-0' style={{ backgroundColor: gb.accent }} />
              <span>
                {bold ? (
                  <>
                    {prefix}
                    {link ? (
                      <a
                        href={link}
                        target='_blank'
                        rel='noreferrer'
                        className='font-extrabold underline-offset-2 hover:underline'
                        style={{ color: gb.text }}
                      >
                        {bold}
                      </a>
                    ) : (
                      <strong className='font-extrabold' style={{ color: gb.text }}>
                        {bold}
                      </strong>
                    )}
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
