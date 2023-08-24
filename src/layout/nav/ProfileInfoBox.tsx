import * as React from 'react';
import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

const ProfileInfoBox = (props: NavProfileProps) => {
  const { pointColor } = useAppSelector((state: RootState) => state.settings);
  const phone_number = process.env.REACT_APP_PHONE_NUMBER;
  const email = process.env.REACT_APP_EMAIL;
  const profile = props.info;

  return (
    <section className='profile__box'>
      <div className='profile__box__header'>
        <span className='box-icon'>{profile.icon}</span>
        <h3 style={{ color: pointColor }} className='box-title'>
          {profile.title}
        </h3>
      </div>
      <hr />
      {profile.isSubTitle && profile.subTitle ? (
        <div className='profile__box__content'>
          <ul className='list list-subtitle'>
            {/* subtitle이 있는 list item */}
            {profile.subTitle.map((item: SubTitleItem, index: number) => (
              <li className='list-item' key={`profile_subTitle_${index}`}>
                <span className='subtitle'>{item.subTitle}</span>
                <span className='text--light'>{item.value === 'phone_number' ? phone_number : email}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {profile.isBasic && profile.basic ? (
        <div className='profile__box__content'>
          <ul className='list list-row'>
            {/* 기본 list item row 정렬 */}
            {profile.basic.map((item: string, index: number) => (
              <li className='list-item' key={`profile_basic_${index}`}>
                <span className='text'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {profile.isSpaceBetween && profile.spaceBetween ? (
        <div className='profile__box__content'>
          <ul className='list list-date'>
            {/* 기본 list item row 정렬 */}
            {profile.spaceBetween.map((item: DateItem, index: number) => (
              <li className='list-item list-item__between' key={`spaceBetween_${index}`}>
                <span className='text'>{item.text}</span>
                <span className='date'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
};

export default ProfileInfoBox;
