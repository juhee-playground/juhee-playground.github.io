import * as React from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from 'redux/store';
import ProfileInfo from '../../data/DB_profileInfo.json';

import { useTheme } from '@mui/material/styles';

import './Nav.scss';
import ProfileInfoBox from './ProfileInfoBox';

const LeftNav = () => {
  const theme = useTheme();
  const { pointColor } = useSelector((state: RootState) => state.pointColor);
  const infos = ProfileInfo;
  return (
    <nav className={`nav__container nav__container--${theme.palette.mode}`}>
      <div className='profile'>
        <img
          className='profile__picture-img'
          src='https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-juhee-playground/dino_dinosaur_icon_153295.png'
          alt='profileImage'
        />
        <section className={`profile__info profile__info--${theme.palette.mode}`}>
          <h2 style={{ color: pointColor }} className='profile__info-first-name'>
            BAEK
          </h2>
          <h2 className='profile__info-name'>JU HEE</h2>
          <p className='profile__info-role'>Front Developer</p>
        </section>
      </div>
      {infos.map((info: NavInfoItems) => (
        <ProfileInfoBox info={info} key={info.title} />
      ))}
    </nav>
  );
};

export default LeftNav;
