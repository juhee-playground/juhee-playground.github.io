import { useTheme } from '@mui/material/styles';

import { IS_JOB_SEEKING } from '@/constants/config';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

type TContactKey = 'email' | 'github' | 'portfolio' | 'phone';

interface IContactCard {
  key: TContactKey;
  label: string;
  value: string | undefined;
  href: string | undefined;
  hidden?: boolean;
}

const email = import.meta.env.VITE_APP_EMAIL;
const github = import.meta.env.VITE_APP_GITHUB;
const portfolio = import.meta.env.VITE_APP_PORTFOLIO;
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
    key: 'portfolio',
    label: 'Portfolio',
    value: portfolio ?? 'https://juhee-playground.github.io',
    href: portfolio ?? 'https://juhee-playground.github.io',
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
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  const visibleCards = CONTACT_CARDS.filter(c => !c.hidden);

  return (
    <div className='flex flex-col gap-6'>
      <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/55' : 'text-black/50')}>
        새로운 기회나 협업에 열려 있습니다. 언제든지 연락주세요.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {visibleCards.map(({ key, label, value, href }) => {
          const inner = (
            <>
              <div className='flex flex-col gap-1'>
                <span
                  className='text-[10px] font-black tracking-[0.2em] uppercase'
                  style={{ color: pt }}
                >
                  {label}
                </span>
                <span
                  className={cn(
                    'text-sm break-all',
                    isDark ? 'text-white/80' : 'text-black/70',
                    href && 'group-hover:underline underline-offset-2',
                  )}
                >
                  {value}
                </span>
              </div>
              {href && (
                <span
                  className={cn(
                    'text-base shrink-0 transition-transform group-hover:translate-x-1',
                    isDark ? 'text-white/25' : 'text-black/20',
                  )}
                >
                  →
                </span>
              )}
            </>
          );

          const cardClass = cn(
            'group flex items-center justify-between p-5 rounded-2xl border transition-all',
            isDark
              ? 'bg-white/3 border-white/10 hover:border-white/25'
              : 'bg-white border-black/8 hover:border-black/20',
            !href && 'cursor-default',
          );

          return href ? (
            <a key={key} href={href} target='_blank' rel='noreferrer' className={cardClass}>
              {inner}
            </a>
          ) : (
            <div key={key} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiteContact;
