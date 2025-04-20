import { useTheme } from '@mui/material/styles';

import ProfileInfo from '@/data/DB_profileInfo.json';
import usePrintMode from '@/hooks/usePrintMode';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

import ProfileInfoBox from './ProfileInfoBox';

import './index.scss';

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
      className={cn('nav__container', `nav__container--${themeMode}`, isPrintMode && `nav__container--${mode}`)}
    >
      <div className={cn('infos', `infos--${isPrintMode ? 'print' : themeMode}`)}>
        <section className='profile__box profile'>
          <header className={`profile__info profile__info--${themeMode}`}>
            <h2 style={{ color: pointColor.hex }} className='profile__info-first-name'>
              BAEK
            </h2>
            <h2 className='profile__info-name'>JU HEE</h2>
            <p className='profile__info-role'>Front Developer</p>
          </header>
        </section>
        {contactInfo && (
          <section className={cn('profile__box', isPrintMode && `profile__box--${mode}`, 'contact')}>
            <ProfileInfoBox info={contactInfo} />
          </section>
        )}

        <section className={cn('profile__box', isPrintMode && `profile__box--${mode}`, 'aside')}>
          {asideInfos.map(info => (
            <ProfileInfoBox key={info.title} info={info} />
          ))}
        </section>
      </div>
    </aside>
  );
};

export default LeftInfoPanel;
