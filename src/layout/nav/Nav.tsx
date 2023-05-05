import * as React from 'react';

import ProfileInfo from '../../data/DB_profileInfo.json';

import './Nav.scss';
import ProfileInfoBox from './ProfileInfoBox';

const DenseAppBar = () => {
  const infos = ProfileInfo;
  return (
    //TODO: common components 로 profile-box 빼기
    <nav className='nav__container'>
      <div className='profile'>
        <img
          className='profile-picture-img'
          src='https://juhee100bucket.s3.ap-northeast-2.amazonaws.com/image-juhee-playground/dino_dinosaur_icon_153295.png'
          alt='profileImage'
        />
        <section className='profile-info'>
          <h2 className='profile-info-first-name'>BAEK</h2>
          <h2 className='profile-info-name'>JU HEE</h2>
          <p className='profile-info-role'>Front Developer</p>
        </section>
      </div>
      {infos.map((info: NavInfoItems) => (
        <ProfileInfoBox info={info} key={info.title} />
      ))}
    </nav>
  );
};

export default DenseAppBar;
