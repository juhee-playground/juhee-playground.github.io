import { useTheme } from '@mui/material/styles';

import ProfileInfo from '@/data/DB_profileInfo.json';
import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import ProfileInfoBox from './ProfileInfoBox';

import './LeftInfoPanel.scss';

const LeftInfoPanel = () => {
  const theme = useTheme();
  const { pointColor, isPrintMode } = useAppSelector((state: TRootState) => state.settings);

  const infos = ProfileInfo;

  const mode = isPrintMode ? 'print' : '';

  return (
    <nav
      id='profileInfo'
      className={`nav__container nav__container--${theme.palette.mode} ${isPrintMode ? `nav__container--${mode}` : ''}`}
    >
      <section className='profile'>
        {/* FIXME: dl, dt, dd 로 대체 가능한지 */}
        <section className={`profile__info profile__info--${theme.palette.mode}`}>
          <h2 style={{ color: pointColor.hex }} className='profile__info-first-name'>
            BAEK
          </h2>

          <h2 className='profile__info-name'>JU HEE</h2>

          <p className='profile__info-role'>Front Developer</p>
        </section>
      </section>

      <section className={isPrintMode ? `infos infos--${mode}` : `infos`}>
        {infos.map((info: INavInfoItems) => (
          <ProfileInfoBox info={info} key={info.title} />
        ))}
      </section>
    </nav>
  );
};

export default LeftInfoPanel;
