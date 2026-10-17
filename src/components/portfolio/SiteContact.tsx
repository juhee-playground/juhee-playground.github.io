import { IS_JOB_SEEKING } from '@/constants/config';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { getGameBoyPalette } from './gameboyPalette';

type TContactKey = 'email' | 'github' | 'phone';

interface IContactCard {
  key: TContactKey;
  label: string;
  value: string | undefined;
  href: string | undefined;
  hidden?: boolean;
}

const email = import.meta.env.VITE_APP_EMAIL;
const github = import.meta.env.VITE_APP_GITHUB;
const phone = import.meta.env.VITE_APP_PHONE_NUMBER;

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
  {
    key: 'phone',
    label: 'Phone',
    value: IS_JOB_SEEKING ? phone : '현재 구직 중이 아니므로 비공개입니다.',
    href: IS_JOB_SEEKING && phone ? `tel:${phone}` : undefined,
    hidden: !IS_JOB_SEEKING,
  },
];

const SiteContact = () => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);

  const visibleCards = CONTACT_CARDS.filter(c => !c.hidden);

  return (
    <div className='flex flex-col gap-6'>
      <p className='text-sm leading-relaxed' style={{ color: gb.textDim }}>
        새로운 기회나 협업에 열려 있습니다. 언제든지 연락주세요.
      </p>

      <ul className='flex flex-col gap-5 m-0 p-0 list-none'>
        {visibleCards.map(({ key, label, value, href }) => {
          const rowClass = cn(
            'group flex items-baseline justify-between gap-4',
            href && 'cursor-pointer',
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
                  className={cn('text-base break-all', href && 'group-hover:underline underline-offset-2')}
                  style={{ color: gb.text }}
                >
                  {value}
                </span>
              </div>
              {href && (
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
              {href ? (
                <a
                  href={href}
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
