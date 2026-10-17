import { useSettings } from '@/stores/useSettings';

type TCartDeco = 'calendar' | 'pitch' | 'invest';

/** 회사 카트리지 플라스틱 — pocket 검정 / light 흰색 / dmg 크림 */
const PLASTIC_BY_SHELL = {
  dmg: {
    shell: '#f3f1ea',
    shellBorder: '#ddd8ce',
    shellShadow: '#cfc9bc',
    ink: '#2b2b28',
    muted: '#7a7a70',
  },
  light: {
    shell: '#ffffff',
    shellBorder: '#e8ebf0',
    shellShadow: '#d5dae3',
    ink: '#1a1d24',
    muted: '#8a91a0',
  },
  pocket: {
    shell: '#0c0e12',
    shellBorder: '#3a424e',
    shellShadow: '#050608',
    ink: '#e6e9ef',
    muted: '#8b95a5',
  },
} as const;

type TCartTheme = {
  readonly shell: string;
  readonly shellBorder: string;
  readonly shellShadow: string;
  readonly labelFrom: string;
  readonly labelTo: string;
  readonly accent: string;
  readonly accentSoft: string;
  readonly tagBg: string;
  readonly ink: string;
  readonly muted: string;
  readonly deco: TCartDeco;
};

interface ICompanyCartridgeItem {
  readonly id: string;
  readonly name: string;
  readonly period: string;
  readonly orderLabel: string;
  readonly logoSrc?: string;
  readonly logoEmoji?: string;
  readonly logoLabel?: string;
  readonly description?: string;
  readonly theme: TCartTheme;
  readonly isActive?: boolean;
  readonly onClick?: () => void;
}

interface ICompanyCartridgeProps {
  readonly company: ICompanyCartridgeItem;
}

/** 일간 타임라인 + 일정 카드 (틴들로) */
const TindloBackground = () => (
  <svg
    viewBox='0 0 200 200'
    preserveAspectRatio='xMidYMid slice'
    aria-hidden
    className='pointer-events-none h-full w-full'
  >
    {/* hour grid lines */}
    <g stroke='#ffffff' strokeWidth='0.8' opacity='0.22'>
      {[28, 52, 76, 100, 124, 148, 172].map(y => (
        <line key={y} x1='36' y1={y} x2='196' y2={y} />
      ))}
    </g>

    {/* track column dividers */}
    <g stroke='#ffffff' strokeWidth='0.9' opacity='0.28'>
      <line x1='36' y1='18' x2='36' y2='190' />
      <line x1='88' y1='18' x2='88' y2='190' />
      <line x1='140' y1='18' x2='140' y2='190' />
    </g>

    {/* time labels */}
    <g fill='#ffffff' opacity='0.38' fontSize='7' fontFamily='system-ui, sans-serif'>
      <text x='8' y='32'>
        08
      </text>
      <text x='8' y='56'>
        09
      </text>
      <text x='8' y='80'>
        10
      </text>
      <text x='8' y='104'>
        11
      </text>
      <text x='8' y='128'>
        12
      </text>
      <text x='8' y='152'>
        13
      </text>
      <text x='8' y='176'>
        14
      </text>
    </g>

    {/* schedule cards */}
    <g>
      {/* col1: tall meeting */}
      <rect x='40' y='40' width='42' height='52' rx='5' fill='#ffffff' opacity='0.28' />
      <rect x='44' y='46' width='22' height='3.5' rx='1' fill='#ffffff' opacity='0.55' />
      <rect x='44' y='54' width='28' height='2.5' rx='1' fill='#ffffff' opacity='0.35' />
      <circle cx='48' cy='66' r='3' fill='#ffffff' opacity='0.5' />

      {/* col2: short card */}
      <rect x='92' y='28' width='42' height='28' rx='5' fill='#ffffff' opacity='0.22' />
      <rect x='96' y='34' width='20' height='3' rx='1' fill='#ffffff' opacity='0.45' />

      {/* col2: mid card */}
      <rect x='92' y='72' width='42' height='44' rx='5' fill='#ffffff' opacity='0.3' />
      <rect x='96' y='78' width='26' height='3.5' rx='1' fill='#ffffff' opacity='0.55' />
      <rect x='96' y='86' width='18' height='2.5' rx='1' fill='#ffffff' opacity='0.35' />
      <circle cx='100' cy='98' r='3' fill='#ffffff' opacity='0.45' />

      {/* col3: featured tall card */}
      <rect x='144' y='52' width='48' height='70' rx='5' fill='#ffffff' opacity='0.34' />
      <rect x='148' y='58' width='28' height='3.5' rx='1' fill='#ffffff' opacity='0.55' />
      <rect x='148' y='66' width='32' height='2.5' rx='1' fill='#ffffff' opacity='0.35' />
      <rect x='148' y='72' width='22' height='2.5' rx='1' fill='#ffffff' opacity='0.28' />
      <circle cx='152' cy='88' r='3' fill='#ffffff' opacity='0.5' />

      {/* col1: lower short */}
      <rect x='40' y='120' width='42' height='32' rx='5' fill='#ffffff' opacity='0.24' />
      <rect x='44' y='126' width='24' height='3' rx='1' fill='#ffffff' opacity='0.45' />

      {/* col3: lower card */}
      <rect x='144' y='140' width='48' height='36' rx='5' fill='#ffffff' opacity='0.26' />
      <rect x='148' y='146' width='26' height='3' rx='1' fill='#ffffff' opacity='0.45' />
    </g>

  </svg>
);

/** 축구장 라인 (핏투게더) */
const SoccerPitch = () => (
  <svg viewBox='0 0 160 120' className='h-full w-full' preserveAspectRatio='xMidYMid slice' aria-hidden>
    <g fill='none' stroke='#ffffff' strokeWidth='1.5' opacity='0.45'>
      <rect x='8' y='8' width='144' height='104' rx='2' />
      <line x1='80' y1='8' x2='80' y2='112' />
      <circle cx='80' cy='60' r='18' />
      <circle cx='80' cy='60' r='1.5' fill='#ffffff' stroke='none' />
      <rect x='8' y='36' width='22' height='48' />
      <rect x='8' y='46' width='10' height='28' />
      <rect x='130' y='36' width='22' height='48' />
      <rect x='142' y='46' width='10' height='28' />
    </g>
  </svg>
);

/** 상승 차트 + $ (와이유 — 투자사) */
const InvestChart = () => (
  <svg viewBox='0 0 160 120' className='h-full w-full' preserveAspectRatio='xMidYMid slice' aria-hidden>
    <g opacity='0.42' fill='none' stroke='#ffffff' strokeWidth='2' strokeLinecap='square'>
      {/* baseline */}
      <line x1='28' y1='88' x2='132' y2='88' />
      {/* bars — rising */}
      <rect x='38' y='68' width='12' height='20' fill='#ffffff' opacity='0.35' stroke='none' />
      <rect x='58' y='54' width='12' height='34' fill='#ffffff' opacity='0.4' stroke='none' />
      <rect x='78' y='42' width='12' height='46' fill='#ffffff' opacity='0.45' stroke='none' />
      <rect x='98' y='28' width='12' height='60' fill='#ffffff' opacity='0.5' stroke='none' />
      {/* trend line + arrow */}
      <polyline points='44,64 64,50 84,38 104,24' />
      <polyline points='96,22 110,20 104,32' />
    </g>
    {/* dollar marks */}
    <text x='80' y='108' textAnchor='middle' fill='#ffffff' opacity='0.5' fontSize='14' fontWeight='700'>
      $
    </text>
    <text x='24' y='30' fill='#ffffff' opacity='0.28' fontSize='12' fontWeight='700'>
      $
    </text>
    <text x='136' y='48' fill='#ffffff' opacity='0.22' fontSize='11' fontWeight='700'>
      $
    </text>
  </svg>
);

export const CompanyCartDeco = ({
  type,
  compact = false,
}: {
  type: TCartDeco;
  compact?: boolean;
}) => {
  const deco =
    type === 'calendar' ? (
      <TindloBackground />
    ) : type === 'pitch' ? (
      <SoccerPitch />
    ) : (
      <InvestChart />
    );

  if (compact) {
    return (
      <div
        className='pointer-events-none absolute bottom-1 right-1 h-[72px] w-[88px] overflow-hidden opacity-55'
        aria-hidden
      >
        {deco}
      </div>
    );
  }

  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden>
      {deco}
    </div>
  );
};

export const COMPANY_CART_THEMES: Record<string, TCartTheme> = {
  틴들로: {
    shell: '#f3f1ea',
    shellBorder: '#ddd8ce',
    shellShadow: '#cfc9bc',
    labelFrom: '#cfeaf4',
    labelTo: '#b5dff0',
    accent: '#5ecfc4',
    accentSoft: '#a8e8e0',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'calendar',
  },
  핏투게더: {
    shell: '#eceef0',
    shellBorder: '#d5d9dd',
    shellShadow: '#c5cbcf',
    labelFrom: '#b8e6d4',
    labelTo: '#8fd4b8',
    accent: '#4caf7a',
    accentSoft: '#a8dcc4',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'pitch',
  },
  Fitogether: {
    shell: '#eceef0',
    shellBorder: '#d5d9dd',
    shellShadow: '#c5cbcf',
    labelFrom: '#b8e6d4',
    labelTo: '#8fd4b8',
    accent: '#4caf7a',
    accentSoft: '#a8dcc4',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'pitch',
  },
  와이유파트너스: {
    shell: '#efe8f4',
    shellBorder: '#ddd0e6',
    shellShadow: '#cbbfd6',
    labelFrom: '#e4daf8',
    labelTo: '#cfc0ef',
    accent: '#9b7bb8',
    accentSoft: '#d4c4e8',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'invest',
  },
  YU파트너스: {
    shell: '#efe8f4',
    shellBorder: '#ddd0e6',
    shellShadow: '#cbbfd6',
    labelFrom: '#e4daf8',
    labelTo: '#cfc0ef',
    accent: '#9b7bb8',
    accentSoft: '#d4c4e8',
    tagBg: 'rgba(255,255,255,0.72)',
    ink: '#1f2937',
    muted: '#6b7280',
    deco: 'invest',
  },
};

export const FALLBACK_CART_THEME: TCartTheme = {
  shell: '#f3f1ea',
  shellBorder: '#ddd8ce',
  shellShadow: '#cfc9bc',
  labelFrom: '#cfeaf4',
  labelTo: '#b5dff0',
  accent: '#5ecfc4',
  accentSoft: '#a8e8e0',
  tagBg: 'rgba(255,255,255,0.72)',
  ink: '#1f2937',
  muted: '#6b7280',
  deco: 'calendar',
};

export const getCompanyCartTheme = (name: string): TCartTheme =>
  COMPANY_CART_THEMES[name] ?? FALLBACK_CART_THEME;

export const CompanyCartridge = ({ company }: ICompanyCartridgeProps) => {
  const { theme } = company;
  const { shellStyle } = useSettings();
  const plastic = PLASTIC_BY_SHELL[shellStyle] ?? PLASTIC_BY_SHELL.dmg;
  const isPocket = shellStyle === 'pocket';

  const dropShadow = isPocket
    ? `0 2px 0 ${plastic.shellShadow}, 0 4px 10px rgba(0,0,0,0.35)`
    : `0 2px 0 ${plastic.shellShadow}, 0 4px 10px rgba(0,0,0,0.16)`;

  const faceShadow = isPocket
    ? company.isActive
      ? `inset 0 3px 8px rgba(0,0,0,0.45), inset 1px 1px 0 rgba(255,255,255,0.08)`
      : `inset 1px 1px 0 rgba(255,255,255,0.1)`
    : company.isActive
      ? `inset 0 3px 8px rgba(0,0,0,0.12), inset 1px 0 0 rgba(255,255,255,0.7)`
      : `inset 1px 0 0 rgba(255,255,255,0.8)`;

  return (
    <button
      type='button'
      onClick={company.onClick}
      aria-pressed={company.isActive}
      aria-label={`${company.name} 경력 상세 보기`}
      className='group w-full max-w-56 cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500'
    >
      {/* drop shadow outside clip — 프로젝트 팩과 동일 계열 */}
      <div
        className='rounded-b-xl transition-shadow duration-200'
        style={{ boxShadow: company.isActive ? 'none' : dropShadow }}
      >
      <div className='relative overflow-hidden rounded-b-xl'>
      <div
        className={
          company.isActive
            ? 'relative aspect-5/6 flex flex-col overflow-hidden rounded-t-xl rounded-b-[9px] px-2.5 pb-4 pt-2.5 transition-[transform,box-shadow] duration-200 translate-y-7'
            : 'relative aspect-5/6 flex flex-col overflow-hidden rounded-t-xl rounded-b-[9px] px-2.5 pb-4 pt-2.5 transition-[transform,box-shadow] duration-200 group-hover:-translate-y-1 group-active:translate-y-px'
        }
        style={{
          backgroundColor: plastic.shell,
          border: `1px solid ${plastic.shellBorder}`,
          boxShadow: faceShadow,
        }}
      >
        <div className='mb-1.5 flex items-start justify-between px-0.5'>
          <div className='flex flex-col leading-none gap-0.5'>
            <span className='text-xs font-semibold tracking-wide' style={{ color: plastic.ink }}>
              JUHEE-OS
            </span>
            <span className='text-body-2xs font-medium tracking-[0.08em]' style={{ color: plastic.muted }}>
              WORK CARTRIDGE
            </span>
          </div>
          <span className='text-avatar font-semibold tabular-nums' style={{ color: plastic.muted }}>
            {company.orderLabel}
          </span>
        </div>

        <div
          className='relative flex flex-1 flex-col overflow-hidden rounded-[7px] border px-2.5 pb-2 pt-2'
          style={{
            borderColor: 'rgba(255,255,255,0.65)',
            background: `linear-gradient(165deg, ${theme.labelFrom} 0%, ${theme.labelTo} 100%)`,
          }}
        >
          <CompanyCartDeco type={theme.deco} />

          <div className='relative z-1 flex items-start justify-between gap-2'>
            <span
              className='shrink-0 rounded-full px-2 py-0.5 text-body-2xs font-bold tracking-wide text-white'
              style={{ backgroundColor: theme.accent }}
            >
              WORK {company.orderLabel}
            </span>
            <span
              className='text-right text-avatar font-medium leading-tight tabular-nums'
              style={{ color: theme.ink }}
            >
              {company.period}
            </span>
          </div>

          <div className='relative z-1 mt-2 flex flex-1 flex-col items-center justify-center text-center'>
            <div className='mb-1.5 flex h-12 w-full items-center justify-center'>
              {company.logoLabel ? (
                <span
                  className='flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold tracking-wide'
                  style={{ backgroundColor: theme.accent, color: '#fff' }}
                >
                  {company.logoLabel}
                </span>
              ) : company.logoSrc ? (
                <img
                  src={company.logoSrc}
                  alt={`${company.name} 로고`}
                  className='block max-h-12 max-w-[78%] object-contain drop-shadow-sm'
                />
              ) : company.logoEmoji ? (
                <span className='text-[36px] leading-none drop-shadow-sm'>{company.logoEmoji}</span>
              ) : (
                <span
                  className='flex h-10 w-10 items-center justify-center rounded-full text-base font-semibold'
                  style={{ backgroundColor: theme.accentSoft, color: theme.ink }}
                >
                  {company.name.slice(0, 1)}
                </span>
              )}
            </div>
            <span className='text-base font-semibold tracking-tight' style={{ color: theme.ink }}>
              {company.name}
            </span>
            {company.description && (
              <span className='mt-0.5 text-xs font-normal text-slate-500'>
                {company.description}
              </span>
            )}
          </div>
        </div>

        {/* top / bottom cartridge notches */}
        <div
          aria-hidden
          className='absolute top-1.5 left-1/2 h-1.25 w-5 -translate-x-1/2 rounded-t-[5px] border border-t-0'
          style={{ borderColor: plastic.shellShadow }}
        />
        <div
          aria-hidden
          className='absolute bottom-1.5 left-1/2 h-1.25 w-5 -translate-x-1/2 rounded-b-[5px] border border-b-0'
          style={{ borderColor: plastic.shellShadow }}
        />

        {/* soft shade where pack enters the slot */}
        {company.isActive && (
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 bottom-0 h-14'
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.14) 100%)',
            }}
          />
        )}
      </div>

      {/* slot rim shadow — clips the sunk edge without a muddy box */}
      {company.isActive && (
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-4'
          style={{
            boxShadow: 'inset 0 10px 12px rgba(0,0,0,0.16)',
          }}
        />
      )}
      </div>
      </div>
    </button>
  );
};
