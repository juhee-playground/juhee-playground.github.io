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
        'print:h-auto print:min-h-0 print:flex-none print:py-1 print:pb-1',
        !isPrintMode && 'flex-[0_0_30%] min-h-screen',
        isPrintMode && 'w-full min-h-fit flex-none border-r-0 pb-1',
        themeMode === 'light'
          ? 'bg-white text-[#181717] border-black/[0.07]'
          : 'bg-[#111111] text-white border-white/[0.07]',
        isPrintMode && mode === 'print' && 'bg-white text-black border-[#ddd]'
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center w-full gap-3',
          isPrintMode && 'grid grid-cols-[auto_1fr_1fr] items-start gap-x-8 gap-y-0 [grid-template-areas:"profile_contact_aside"]',
          isPrintMode && 'print:grid print:grid-cols-[auto_1fr_1fr] print:gap-x-8 print:grid-areas-[profile_contact_aside]',
        )}
      >
        <section
          className={cn(
            'my-1 flex w-[80%] flex-col justify-center',
            isPrintMode && 'w-auto self-center justify-center pr-2 [grid-area:profile]',
            'print:w-auto print:self-center print:justify-center print:pr-2',
          )}
        >
          <header
            className={cn(
              'mt-1 flex flex-col items-center gap-3 text-center',
              themeMode === 'light' ? 'text-[#181717]' : 'text-white',
              '[&_h2]:m-0 [&_h2]:text-[24px] [&_h2]:leading-none',
              isPrintMode && 'gap-3 [&_h2]:text-[18px]',
            )}
          >
            <h2 style={{ color: pointColor.hex }} className='pixel-font m-0'>
              BAEK
            </h2>
            <h2 className='pixel-font m-0'>JU HEE</h2>
            <p className='m-0 text-xs leading-none'>Front Developer</p>
          </header>
          {!isPrintMode && (
            <div className='name-lane' aria-hidden='true'>
              <span className='name-walker'>
                <span className='name-dribble'>
                  <svg width='34' height='28' viewBox='0 0 34 28' fill='none'>
                    <rect x='1' y='16' width='7' height='2' fill='#2f7d32' />
                    <rect x='7' y='13' width='14' height='7' fill='#43a047' />
                    <rect x='18' y='6' width='3' height='10' fill='#43a047' />
                    <rect x='18' y='3' width='9' height='4' fill='#43a047' />
                    <rect x='24' y='4' width='2' height='2' fill='#111' />
                    <rect x='9' y='20' width='2' height='6' fill='#2f7d32' />
                    <rect x='16' y='20' width='2' height='6' fill='#2f7d32' />
                  </svg>
                  <span className='name-dribble-ball' />
                </span>
              </span>
            </div>
          )}
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
