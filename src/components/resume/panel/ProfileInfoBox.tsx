import { ContactRevealButton, SecretText } from '@/components/common/SecretText';
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

  const isContact = info.title === 'CONTACT';
  const headingIcon = <i className='pixel-icon-common' aria-hidden='true' />;

  return (
    <>
      <div className='flex items-center'>
        {isContact ? <ContactRevealButton>{headingIcon}</ContactRevealButton> : headingIcon}
        <h4 style={{ color: pointColor.hex }} className='pixel-font m-0 px-1 text-[11px] leading-4'>
          {info.title}
        </h4>
      </div>

      <hr className='my-px w-full' />

      {info.isSubTitle && info.subTitle && (
        <div className='flex w-full'>
          <dl className='m-0 flex w-full list-none flex-col gap-1 p-0'>
            {info.subTitle.map((item: ISubTitleItem, index: number) => {
              const key = item.value;
              return (
                <div className='flex flex-col gap-px leading-4' key={`profile_subTitle_${index}`}>
                  <dt className='m-0 text-[12px] font-semibold'>{item.subTitle}</dt>
                  <dd className='m-0 wrap-break-word text-[11px] font-normal'>
                    {key === 'email' || key === 'phone_number' ? (
                      <SecretText value={contactInfo[key]} />
                    ) : key === 'github' || key === 'portfolio' ? (
                      <a href={contactInfo[key]} className='text-inherit underline' color='inherit'>
                        {contactInfo[key]}
                      </a>
                    ) : (
                      contactInfo[key]
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
          <ul className='m-0 flex w-full list-none flex-row flex-wrap gap-1 p-0'>
            {info.basic.map((item: IMultilangText, index: number) => (
              <li className='flex flex-col pr-2 leading-4' key={`profile_basic_${index}`}>
                <span className='m-0 text-[11px] font-normal'>{item[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {info.isSpaceBetween && info.spaceBetween && (
        <div className='flex w-full'>
          <ul className='m-0 flex w-full list-none flex-col gap-1 p-0'>
            {info.spaceBetween.map((item: IDateItem, index: number) => (
              <li className='flex flex-row justify-between leading-4' key={`spaceBetween_${index}`}>
                <span className='m-0 wrap-break-word text-[11px] font-normal'>{item.text[lang]}</span>
                <span className='text-[11px]'>{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileInfoBox;
