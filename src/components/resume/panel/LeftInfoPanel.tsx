import { useTheme } from '@mui/material/styles';

import ProfileInfo from '@/data/DB_profileInfo.json';
import usePrintMode from '@/hooks/usePrintMode';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

import ProfileInfoBox from './ProfileInfoBox';

const contactInfo = ProfileInfo.find(item => item.title === 'CONTACT');
const asideInfos = ProfileInfo.filter(item => item.title !== 'CONTACT');

const LeftInfoPanel = () => {
  const { mode, isPrintMode } = usePrintMode();
  const { pointColor } = useSettings();
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  return (
    <aside
      id='profileInfo'
      className={cn(
        'flex flex-col items-center justify-start py-6 px-3 pb-[18px] shrink-0 border-r',
        !isPrintMode && 'flex-[0_0_30%] min-h-screen',
        isPrintMode && 'w-full min-h-fit flex-none border-r-0 pb-4',
        themeMode === 'light'
          ? 'bg-white text-[#181717] border-black/[0.07]'
          : 'bg-[#111111] text-white border-white/[0.07]',
        isPrintMode && mode === 'print' && 'bg-white text-black border-[#ddd]'
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center w-full',
          isPrintMode && 'grid grid-cols-[0.5fr_1fr_1fr] items-start gap-2 [grid-template-areas:"profile_contact_aside"]',
          isPrintMode && 'print:grid print:grid-cols-[0.5fr_1fr_1fr] print:gap-2 print:grid-areas-[profile_contact_aside]',
        )}
      >
        <section
          className={cn(
            'my-1 flex w-[80%] flex-col justify-center',
            isPrintMode && 'w-full justify-start [grid-area:profile]',
            'print:w-full print:justify-start',
          )}
        >
          <header
            className={cn(
              'mt-1 text-center',
              themeMode === 'light' ? 'text-[#181717]' : 'text-white',
              '[&_h2]:m-0 [&_h2]:mt-1.5 [&_h2]:text-[24px]',
              isPrintMode && '[&_h2]:mt-1 [&_h2]:text-[18px]',
            )}
          >
            <h2 style={{ color: pointColor.hex }} className='pixel-font m-0'>
              BAEK
            </h2>
            <h2 className='pixel-font m-0'>JU HEE</h2>
            <p className='my-0.5 text-xs'>Front Developer</p>
          </header>
        </section>
        {contactInfo && (
          <section
            className={cn(
              'my-1 flex w-[80%] flex-col justify-center',
              isPrintMode && 'w-full [grid-area:contact]',
              isPrintMode && `profile__box--${mode}`,
              'contact',
            )}
          >
            <ProfileInfoBox info={contactInfo} />
          </section>
        )}

        <section
          className={cn(
            'my-1 flex w-[80%] flex-col gap-2.5',
            isPrintMode && 'w-full gap-2 [grid-area:aside]',
            isPrintMode && `profile__box--${mode}`,
            'aside',
          )}
        >
          {asideInfos.map(info => (
            <ProfileInfoBox key={info.title} info={info} />
          ))}
        </section>
      </div>
    </aside>
  );
};

export default LeftInfoPanel;
