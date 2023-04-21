import * as React from 'react';

import './Nav.scss';

const DenseAppBar = () => {
  const phone_number = process.env.PHONE_NUMBER;
  const email = process.env.EMAIL;

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
      <section className='profile-box'>
        <div className='profile-box__header'>
          <span className='box-icon'>⚽️</span>
          <h5 className='box-title'>CONTACT</h5>
        </div>
        <hr />
        <div className='profile-box__content'>
          <ul className='list list-subtitle'>
            {/* subtitle이 있는 list item */}
            <li className='list-item'>
              <span className='subtitle'>Phone</span>
              <span className='text--light'>{phone_number}</span>
            </li>
            <li className='list-item'>
              <span className='subtitle'>Email</span>
              <span className='text--light'>{email}</span>
            </li>
          </ul>
        </div>
      </section>
      <section className='profile-box'>
        <div className='profile-box__header'>
          <span className='box-icon'>⚽️</span>
          <h5 className='box-title'>HOBBY</h5>
        </div>
        <hr />
        <div className='profile-box__content'>
          <ul className='list list-row'>
            {/* 기본 list item row 정렬 */}
            <li className='list-item'>
              <span className='text'>풋살</span>
            </li>
            <li>
              <span className='text'>공룡</span>
            </li>
          </ul>
        </div>
      </section>
      <section className='profile-box'>
        <div className='profile-box__header'>
          <span className='box-icon'>⚽️</span>
          <h5 className='box-title'>EDUCATION</h5>
        </div>
        <hr />
        <div className='profile-box__content'>
          <ul className='list list-date'>
            {/* 기본 list item space-between 배치 */}
            <li className='list-item list-item__between'>
              <span className='text'>한양여자 대학교</span>
              <span className='date'>2014.02</span>
            </li>
          </ul>
        </div>
      </section>
      <section className='profile-box'>
        <div className='profile-box__header'>
          <span className='box-icon'>⚽️</span>
          <h5 className='box-title'>CERTIFICATION</h5>
        </div>
        <hr />
        <div className='profile-box__content'>
          <ul className='list list-date'>
            {/* 기본 list item space-between 배치 */}
            <li className='list-item list-item__between'>
              <span className='text'>정보처리기사</span>
              <span className='date'>2017.02</span>
            </li>
            <li className='list-item list-item__between'>
              <span className='text'>컴퓨터활용능력 1급</span>
              <span className='date'>2016.07</span>
            </li>
          </ul>
        </div>
      </section>
    </nav>
  );
};

export default DenseAppBar;
