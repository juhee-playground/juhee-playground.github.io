import { useTheme } from '@mui/material/styles';

import ProfileInfo from '@/data/DB_profileInfo.json';
import usePrintMode from '@/hooks/usePrintMode';
import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import ProfileInfoBox from './ProfileInfoBox';

import './index.scss';

const contactInfo = ProfileInfo.find(item => item.title === 'CONTACT');
const asideInfos = ProfileInfo.filter(item => item.title !== 'CONTACT');

const LeftInfoPanel = () => {
  const { pointColor } = useAppSelector((state: TRootState) => state.settings);
  const { mode, isPrintMode } = usePrintMode();
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  return (
    <aside
      id='profileInfo'
      className={`nav__container nav__container--${themeMode} ${isPrintMode ? `nav__container--${mode}` : ''}`}
    >
      <div className={`infos infos--${isPrintMode ? 'print' : theme.palette.mode}`}>
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
          <section className={isPrintMode ? `profile__box--${mode} contact` : `profile__box contact`}>
            <ProfileInfoBox info={contactInfo} />
          </section>
        )}

        <section className={isPrintMode ? `profile__box--${mode} aside` : `profile__box aside`}>
          {asideInfos.map(info => (
            <ProfileInfoBox key={info.title} info={info} />
          ))}
        </section>
      </div>
    </aside>
  );
};

export default LeftInfoPanel;
