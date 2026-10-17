import { Link } from 'react-router-dom';

import { useSettings } from '@/stores/useSettings';
import { CART_SHELL } from './cartShell';
import { CompanyCartDeco, getCompanyCartTheme } from './CompanyCartridge';
import { getGameBoyPalette } from './gameboyPalette';

interface IProjectCartridgeProps {
  readonly project: IProjectData;
  readonly index: number;
  readonly companyName?: string;
}

const COMPANY_BRAND: Record<string, string> = {
  틴들로: 'TINDLO',
  핏투게더: 'FITOGETHER',
  Fitogether: 'FITOGETHER',
  와이유파트너스: 'YU',
  YU파트너스: 'YU',
};

const toCartBrand = (companyName?: string) => {
  if (!companyName?.trim()) return 'PROJECT';
  return COMPANY_BRAND[companyName] ?? companyName.toUpperCase().replace(/\s+/g, '');
};

const formatPeriod = (period: string) => {
  if (!period?.trim()) return '';
  return period.replace(/-/g, '.').replace(/\s*~\s*/g, ' ~ ');
};

export const ProjectCartridge = ({ project, index, companyName }: IProjectCartridgeProps) => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);
  const cart = CART_SHELL[shellStyle] ?? CART_SHELL.dmg;
  const theme = getCompanyCartTheme(companyName ?? '');

  const orderLabel = String(index + 1).padStart(2, '0');
  const summary = (project.summary || project.description || '').trim();
  const tags = project.techStackOptions.slice(0, 5);
  const brand = toCartBrand(companyName);

  const { body, bodyHi, edgeHi, edgeLo, well, step, ink, muted } = cart;

  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`${project.name} 상세 보기`}
      className='group block w-full max-w-full no-underline'
    >
      {/* outer drop — 실물 카트 그림자 */}
      <div
        className='relative transition-transform duration-200 group-hover:-translate-y-0.5'
        style={{
          filter: `drop-shadow(0 3px 0 ${step}) drop-shadow(0 6px 14px rgba(0,0,0,0.22))`,
        }}
      >
        {/* bevel rim */}
        <div
          className='rounded-[14px] p-[3px]'
          style={{
            background: `linear-gradient(145deg, ${edgeHi} 0%, ${body} 42%, ${edgeLo} 100%)`,
          }}
        >
          {/* thick plastic body */}
          <div
            className='relative flex flex-col rounded-[11px] px-4 pt-3 pb-0'
            style={{
              background: `linear-gradient(180deg, ${bodyHi} 0%, ${body} 28%, ${body} 100%)`,
              boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.18), inset -1px -1px 0 rgba(0,0,0,0.18)`,
            }}
          >
            {/* top slot */}
            <div
              aria-hidden
              className='mx-auto mb-2.5 h-1.5 w-9 rounded-sm'
              style={{
                backgroundColor: edgeLo,
                boxShadow: `inset 0 1px 2px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.12)`,
              }}
            />

            {/* brand on plastic frame */}
            <div className='mb-2.5 flex items-center justify-between gap-2 px-0.5'>
              <span
                className='min-w-0 truncate text-avatar font-semibold tracking-widest'
                style={{ color: ink }}
              >
                {brand}
                <span style={{ color: muted }}> · CART {orderLabel}</span>
              </span>
            </div>

            {/* recessed label well — 좌·우·상단 플라스틱 프레임 */}
            <div
              className='rounded-md p-1.5'
              style={{
                backgroundColor: well,
                boxShadow: `inset 0 2px 4px rgba(0,0,0,0.35), inset 0 -1px 0 rgba(255,255,255,0.08)`,
              }}
            >
              <div
                className='relative flex min-h-40 flex-col overflow-hidden rounded-sm px-3.5 py-3'
                style={{
                  background: `linear-gradient(165deg, ${theme.labelFrom} 0%, ${theme.labelTo} 100%)`,
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4)',
                }}
              >
                {/* muted company deco */}
                <div className='pointer-events-none absolute inset-0 opacity-[0.28]' aria-hidden>
                  <CompanyCartDeco type={theme.deco} />
                </div>

                <div className='relative z-1 flex items-start justify-between gap-3'>
                  <span
                    className='rounded-sm px-2 py-0.5 text-body-2xs font-bold tracking-wide text-white'
                    style={{ backgroundColor: theme.accent }}
                  >
                    CART {orderLabel}
                  </span>
                  <span
                    className='shrink-0 text-avatar font-medium tabular-nums'
                    style={{ color: theme.muted }}
                  >
                    {formatPeriod(project.period)}
                  </span>
                </div>

                <div className='relative z-1 mt-2.5 flex flex-col gap-1.5'>
                  <h3
                    className='m-0 text-base font-semibold tracking-tight'
                    style={{ color: theme.ink }}
                  >
                    {project.name}
                  </h3>
                  {summary && (
                    <p
                      className='m-0 line-clamp-2 text-xs leading-relaxed'
                      style={{ color: theme.muted }}
                    >
                      {summary}
                    </p>
                  )}
                </div>

                <div className='relative z-1 mt-auto flex items-end justify-between gap-3 pt-4'>
                  <div className='flex min-w-0 flex-wrap gap-1.5'>
                    {tags.map(stack => (
                      <span
                        key={`${project.id}_${stack.id}`}
                        className='rounded-sm px-2 py-0.5 text-avatar font-semibold'
                        style={{
                          backgroundColor: theme.tagBg,
                          color: theme.ink,
                        }}
                      >
                        {stack.name}
                      </span>
                    ))}
                  </div>
                  <span
                    className='shrink-0 text-avatar font-semibold tracking-wide transition-transform group-hover:translate-x-0.5'
                    style={{ color: gb.accentText }}
                  >
                    DETAILS →
                  </span>
                </div>
              </div>
            </div>

            {/* thick bottom connector case */}
            <div
              className='mx-auto mt-3 flex w-[72%] flex-col items-center rounded-t-sm rounded-b-[10px] px-3 pb-3 pt-2.5'
              style={{
                background: `linear-gradient(180deg, ${bodyHi} 0%, ${body} 100%)`,
                boxShadow: `inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(0,0,0,0.15), 0 -1px 0 ${well}`,
              }}
            >
              <div
                aria-hidden
                className='flex h-2 w-full max-w-28 items-stretch gap-px overflow-hidden rounded-sm'
                style={{ backgroundColor: '#2a2418' }}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className='flex-1'
                    style={{
                      background: 'linear-gradient(180deg, #d4c087 0%, #a89050 55%, #8a7438 100%)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
