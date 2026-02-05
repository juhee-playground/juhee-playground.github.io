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
      <div className='flex items-center'>
        <span className='px-1'>{info.icon}</span>
        <h4 style={{ color: pointColor.hex }} className='m-0 px-1 leading-7'>
          {info.title}
        </h4>
      </div>

      <hr className='w-full my-0.5' />

      {info.isSubTitle && info.subTitle && (
        <div className='flex w-full'>
          <dl className='w-full list-none p-0 m-0 flex flex-col gap-2'>
            {info.subTitle.map((item: ISubTitleItem, index: number) => {
              const key = item.value;
              return (
                <div className='flex flex-col gap-2 leading-6' key={`profile_subTitle_${index}`}>
                  <dt className='font-semibold text-[15px] m-0'>{item.subTitle}</dt>
                  <dd className='font-normal text-[13px] m-0 break-words'>
                    {key === 'github' || key === 'portfolio' ? (
                      <a href={contactInfo[key]} className='text-inherit underline' color='inherit'>
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
        <div className='flex w-full'>
          <ul className='w-full list-none p-0 m-0 flex flex-row flex-wrap gap-2'>
            {info.basic.map((item: IMultilangText, index: number) => (
              <li className='flex flex-col leading-6 pr-3' key={`profile_basic_${index}`}>
                <span className='font-normal text-[13px] m-0'>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {info.isSpaceBetween && info.spaceBetween && (
        <div className='flex w-full'>
          <ul className='w-full list-none p-0 m-0 flex flex-col gap-2'>
            {info.spaceBetween.map((item: IDateItem, index: number) => (
              <li className='flex flex-row justify-between leading-6' key={`spaceBetween_${index}`}>
                <span className='font-normal text-[13px] m-0 break-words'>{item.text[lang]}</span>
                <span className='text-[13px]'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileInfoBox;
