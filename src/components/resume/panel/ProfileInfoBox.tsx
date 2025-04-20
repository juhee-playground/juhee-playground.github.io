import { IS_JOB_SEEKING } from '@/constants/config';
import { useSettings } from '@/stores/useSettings';

interface IContactProperties {
  [key: string]: string | undefined;
  phone_number: string | undefined;
  email: string | undefined;
  github: string | undefined;
  portfolio: string | undefined;
}

interface INavProfileProps {
  info: INavInfoItems;
}

const ProfileInfoBox = ({ info }: INavProfileProps) => {
  const { pointColor } = useSettings();
  const lang = 'ko';

  const contactInfo: IContactProperties = {
    phone_number: import.meta.env.VITE_APP_PHONE_NUMBER,
    email: import.meta.env.VITE_APP_EMAIL,
    github: import.meta.env.VITE_APP_GITHUB,
    portfolio: import.meta.env.VITE_APP_PORTFOLIO,
  };

  const displayValue = (key: keyof IContactProperties): string | undefined => {
    if (!IS_JOB_SEEKING && key === 'phone_number') return '현재 구직 중이 아니므로 연락처는 비공개입니다.';
    return contactInfo[key];
  };

  return (
    <>
      <div className='profile__box__header'>
        <span className='box-icon'>{info.icon}</span>
        <h4 style={{ color: pointColor.hex }} className='box-title'>
          {info.title}
        </h4>
      </div>

      <hr />

      {info.isSubTitle && info.subTitle && (
        <div className='profile__box__content'>
          <dl className='list list-subtitle'>
            {info.subTitle.map((item: ISubTitleItem, index: number) => {
              const key = item.value;
              return (
                <div className='list-item' key={`profile_subTitle_${index}`}>
                  <dt className='subtitle'>{item.subTitle}</dt>
                  <dd className='text'>
                    {key === 'github' || key === 'portfolio' ? (
                      <a href={contactInfo[key]} color='inherit'>
                        {displayValue(key)}
                      </a>
                    ) : (
                      displayValue(key)
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      )}

      {info.isBasic && info.basic && (
        <div className='profile__box__content'>
          <ul className='list list-row'>
            {info.basic.map((item: IMultilangText, index: number) => (
              <li className='list-item' key={`profile_basic_${index}`}>
                <span className='text'>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {info.isSpaceBetween && info.spaceBetween && (
        <div className='profile__box__content'>
          <ul className='list list-date'>
            {info.spaceBetween.map((item: IDateItem, index: number) => (
              <li className='list-item list-item__between' key={`spaceBetween_${index}`}>
                <span className='text'>{item.text[lang]}</span>
                <span className='date'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileInfoBox;
