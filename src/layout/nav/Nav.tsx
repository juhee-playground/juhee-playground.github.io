import React from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from 'redux/store';
import ProfileInfo from '../../data/DB_profileInfo.json';

import { useTheme } from '@mui/material/styles';

import './Nav.scss';
import ProfileInfoBox from './ProfileInfoBox';

const imageBaseUrl = 'https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-juhee-playground';
// 공룡사진 - (비활성화 되있을 때): dino_dinosaur_icon_153295.png
// 이력서 사진 : juheePicture.jpg

const LeftNav = () => {
  const theme = useTheme();
  const { pointColor } = useSelector((state: RootState) => state.pointColor);
  const infos = ProfileInfo;

  return (
    <nav id='profileInfo' className={`nav__container nav__container--${theme.palette.mode}`}>
      <div className='profile'>
        <img className='profile__picture-img' src={`${imageBaseUrl}/juheePicture.jpg`} alt='profileImage' />
        <section className={`profile__info profile__info--${theme.palette.mode}`}>
          <h2 style={{ color: pointColor }} className='profile__info-first-name'>
            BAEK
          </h2>
          <h2 className='profile__info-name'>JU HEE</h2>
          <p className='profile__info-role'>Front Developer</p>
        </section>
      </div>
      <div className='infos'>
        {infos.map((info: NavInfoItems) => (
          <ProfileInfoBox info={info} key={info.title} />
        ))}
      </div>
    </nav>
  );
};

export default LeftNav;
