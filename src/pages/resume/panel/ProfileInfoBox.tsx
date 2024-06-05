import type { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';

import Link from '@mui/material/Link';

interface IContactProperties {
  [key: string]: string | undefined;
  phone_number: string | undefined;
  email: string | undefined;
  github: string | undefined;
  portfolio: string | undefined;
}

const ProfileInfoBox = ({ info }: INavProfileProps) => {
  const { pointColor, isPrintMode } = useAppSelector((state: RootState) => state.settings);
  const contactInfo: IContactProperties = {
    phone_number: import.meta.env.VITE_APP_PHONE_NUMBER,
    email: import.meta.env.VITE_APP_EMAIL,
    github: import.meta.env.VITE_APP_GITHUB,
    portfolio: import.meta.env.VITE_APP_PORTFOLIO,
  };
  const profileClass = info.title.toLowerCase();
  const mode = isPrintMode ? 'print' : '';

  return (
    <section
      className={isPrintMode ? `profile__box profile__box--${mode} ${profileClass}` : `profile__box ${profileClass}`}
    >
      <div className='profile__box__header'>
        <span className='box-icon'>{info.icon}</span>
        <h4 style={{ color: pointColor }} className='box-title'>
          {info.title}
        </h4>
      </div>

      <hr />

      {info.isSubTitle && info.subTitle && (
        <div className='profile__box__content'>
          <ul className='list list-subtitle'>
            {/* subtitle이 있는 list item */}
            {info.subTitle.map((item: SubTitleItem, index: number) => {
              const key = item.value;
              if (key === 'github' || key === 'portfolio') {
                return (
                  <li className='list-item' key={`profile_subTitle_${index}`}>
                    <span className='subtitle'>{item.subTitle}</span>
                    <span className='text'>
                      <Link href={contactInfo[key]} color='inherit'>
                        {contactInfo[key]}
                      </Link>
                    </span>
                  </li>
                );
              } else {
                return (
                  <li className='list-item' key={`profile_subTitle_${index}`}>
                    <span className='subtitle'>{item.subTitle}</span>
                    <span className='text'>{contactInfo[key]}</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}

      {info.isBasic && info.basic && (
        <div className='profile__box__content'>
          <ul className='list list-row'>
            {/* 기본 list item row 정렬 */}
            {info.basic.map((item: string, index: number) => (
              <li className='list-item' key={`profile_basic_${index}`}>
                <span className='text'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {info.isSpaceBetween && info.spaceBetween && (
        <div className='profile__box__content'>
          <ul className='list list-date'>
            {/* 기본 list item row 정렬 */}
            {info.spaceBetween.map((item: DateItem, index: number) => (
              <li className='list-item list-item__between' key={`spaceBetween_${index}`}>
                <span className='text'>{item.text}</span>
                <span className='date'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProfileInfoBox;
