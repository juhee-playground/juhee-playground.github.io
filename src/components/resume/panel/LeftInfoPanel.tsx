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
        'grid-area-[profile] flex flex-col items-center justify-start py-6 px-3 pb-[18px]',
        themeMode === 'light' ? 'bg-[whitesmoke] text-[#181717]' : 'bg-[#181717] text-white',
        isPrintMode && mode === 'print' && 'bg-white text-black'
      )}
    >
      <div
        className={cn(
          'flex flex-wrap justify-center w-full',
          isPrintMode && 'print:grid print:grid-cols-[0.5fr_1fr_1fr] print:gap-4 print:grid-areas-[profile_contact_aside]',
          'md:grid md:grid-cols-[0.5fr_1fr_1fr] md:gap-4 md:grid-areas-[profile_contact_aside]',
          'max-md:flex'
        )}
      >
        <section className='flex flex-col justify-center my-2 w-[80%] print:w-full print:justify-start'>
          <header
            className={cn(
              'text-center mt-[11px]',
              themeMode === 'light' ? 'text-[#181717]' : 'text-white',
              '[&_h2]:mt-4 [&_h2]:m-0 [&_h2]:text-[30px]'
            )}
          >
            <h2 style={{ color: pointColor.hex }} className='m-0'>
              BAEK
            </h2>
            <h2 className='m-0'>JU HEE</h2>
            <p className='my-2'>Front Developer</p>
          </header>
        </section>
        {contactInfo && (
          <section className={cn('flex flex-col justify-center my-2 w-[80%]', isPrintMode && `profile__box--${mode}`, 'contact')}>
            <ProfileInfoBox info={contactInfo} />
          </section>
        )}

        <section className={cn('flex flex-col gap-4 my-2 w-[80%]', isPrintMode && `profile__box--${mode}`, 'aside')}>
          {asideInfos.map(info => (
            <ProfileInfoBox key={info.title} info={info} />
          ))}
        </section>
      </div>
    </aside>
  );
};

export default LeftInfoPanel;
