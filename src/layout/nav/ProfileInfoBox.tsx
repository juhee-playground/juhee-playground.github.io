import * as React from 'react';
import type { RootState } from 'redux/store';
import { useAppSelector } from 'redux/hooks';

const ProfileInfoBox = (props: NavProfileProps) => {
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const phone_number = process.env.REACT_APP_PHONE_NUMBER;
  const email = process.env.REACT_APP_EMAIL;
  const profile = props.info;
  const mode = isPrintMode ? 'print' : '';

  return (
    <section className={isPrintMode ? `profile__box profile__box--${mode}` : 'profile__box'}>
      <div className='profile__box__header'>
        <span className='box-icon'>{profile.icon}</span>
        <h4 style={{ color: pointColor }} className='box-title'>
          {profile.title}
        </h4>
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
