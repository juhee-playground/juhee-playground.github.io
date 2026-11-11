import { SecretText } from '@/components/common/SecretText';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

import { getGameBoyPalette } from './gameboyPalette';

type TContactKey = 'email' | 'github';

interface IContactCard {
  key: TContactKey;
  label: string;
  value: string | undefined;
  href: string | undefined;
  hidden?: boolean;
}

const email = import.meta.env.VITE_APP_EMAIL;
const github = import.meta.env.VITE_APP_GITHUB;

const CONTACT_CARDS: IContactCard[] = [
  {
    key: 'email',
    label: 'Email',
    value: email ?? 'gogumangoguma@gmail.com',
    href: `mailto:${email ?? 'gogumangoguma@gmail.com'}`,
  },
  {
    key: 'github',
    label: 'GitHub',
    value: github ?? 'https://github.com/juhee-playground',
    href: github ?? 'https://github.com/juhee-playground',
  },
];

const SiteContact = () => {
  const { pointColor, shellStyle, isContactVisible } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);

  const visibleCards = CONTACT_CARDS.filter(c => !c.hidden);

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-sm leading-relaxed' style={{ color: gb.textDim }}>
        새로운 기회나 협업에 열려 있습니다. 언제든지 연락주세요.
      </p>

      <ul className='flex flex-col gap-5 m-0 p-0 list-none'>
        {visibleCards.map(({ key, label, value, href }) => {
          const isSecret = key === 'email';
          const openHref = href && (!isSecret || isContactVisible) ? href : undefined;
          const rowClass = cn(
            'group flex items-baseline justify-between gap-4',
            openHref && 'cursor-pointer',
          );

          const content = (
            <>
              <div className='flex flex-col gap-1 min-w-0'>
                <span
                  className='pixel-font text-body-2xs tracking-[0.12em] uppercase'
                  style={{ color: gb.accentText }}
                >
                  {label}
                </span>
                <span
                  className={cn('text-base break-all', openHref && 'group-hover:underline underline-offset-2')}
                  style={{ color: gb.text }}
                >
                  {isSecret ? <SecretText value={value} /> : value}
                </span>
              </div>
              {openHref && (
                <span
                  className='pixel-font text-body-2xs shrink-0 transition-transform group-hover:translate-x-1'
                  style={{ color: gb.accentText }}
                >
                  →
                </span>
              )}
            </>
          );

          return (
            <li key={key}>
              {openHref ? (
                <a
                  href={openHref}
                  target='_blank'
                  rel='noreferrer'
                  className={rowClass}
                  style={{ textDecoration: 'none' }}
                >
                  {content}
                </a>
              ) : (
                <div className={rowClass}>{content}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SiteContact;
