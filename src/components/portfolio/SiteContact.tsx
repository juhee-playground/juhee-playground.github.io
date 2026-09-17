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

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {visibleCards.map(({ key, label, value, href }) => {
          const inner = (
            <>
              <div className='flex flex-col gap-1.5'>
                <span
                  className='pixel-font text-[8px] tracking-[0.1em] uppercase'
                  style={{ color: gb.accent }}
                >
                  {label}
                </span>
                <span
                  className={cn('text-sm break-all', href && 'group-hover:underline underline-offset-2')}
                  style={{ color: gb.text }}
                >
                  {value}
                </span>
              </div>
              {href && (
                <span
                  className='text-base shrink-0 transition-transform group-hover:translate-x-1'
                  style={{ color: gb.textDim }}
                >
                  →
                </span>
              )}
            </>
          );

          const cardStyle = {
            backgroundColor: gb.panel,
            border: `2px solid ${gb.border}`,
            borderRadius: 4,
            boxShadow: `3px 3px 0 ${gb.border}`,
          };
          const cardClass = cn(
            'group flex items-center justify-between p-5 transition-all',
            !href && 'cursor-default',
          );

          return href ? (
            <a key={key} href={href} target='_blank' rel='noreferrer' className={cardClass} style={cardStyle}>
              {inner}
            </a>
          ) : (
            <div key={key} className={cardClass} style={cardStyle}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteContact;
