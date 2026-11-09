import { cn } from '@/utils/classNames';
import { TArchitectureIcon } from '@/utils/parseArchitecture';

interface IArchitectureIconProps {
  readonly type: TArchitectureIcon;
  readonly className?: string;
}

export const ArchitectureIcon = ({ type, className }: IArchitectureIconProps) => {
  const common = cn('h-4 w-4 shrink-0', className);

  if (type === 'frontend') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <rect x='3' y='4' width='18' height='12' rx='1.5' stroke='currentColor' strokeWidth='1.5' />
        <path d='M8 20h8M12 16v4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      </svg>
    );
  }

  if (type === 'backend') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <rect x='4' y='3' width='16' height='6' rx='1.5' stroke='currentColor' strokeWidth='1.5' />
        <rect x='4' y='11' width='16' height='6' rx='1.5' stroke='currentColor' strokeWidth='1.5' />
        <circle cx='8' cy='6' r='1' fill='currentColor' />
        <circle cx='8' cy='14' r='1' fill='currentColor' />
      </svg>
    );
  }

  if (type === 'database') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <ellipse cx='12' cy='6' rx='7' ry='2.5' stroke='currentColor' strokeWidth='1.5' />
        <path
          d='M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6'
          stroke='currentColor'
          strokeWidth='1.5'
        />
        <path
          d='M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6'
          stroke='currentColor'
          strokeWidth='1.5'
        />
      </svg>
    );
  }

  if (type === 'state') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path
          d='M12 3 19.5 7.5v9L12 21 4.5 16.5v-9L12 3z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
        <path d='M12 12 19.5 7.5M12 12 4.5 7.5M12 12v9' stroke='currentColor' strokeWidth='1.5' />
      </svg>
    );
  }

  if (type === 'visualization') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path d='M4 19h16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
        <path d='M7 16V10M12 16V6M17 16v-4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      </svg>
    );
  }

  if (type === 'integration') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <circle cx='6' cy='12' r='2.5' stroke='currentColor' strokeWidth='1.5' />
        <circle cx='18' cy='7' r='2.5' stroke='currentColor' strokeWidth='1.5' />
        <circle cx='18' cy='17' r='2.5' stroke='currentColor' strokeWidth='1.5' />
        <path d='M8.3 11.2 15.5 8.2M8.3 12.8 15.5 15.8' stroke='currentColor' strokeWidth='1.5' />
      </svg>
    );
  }

  if (type === 'realtime') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path
          d='M5 12a7 7 0 0 1 14 0'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <path
          d='M8 12a4 4 0 0 1 8 0'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <circle cx='12' cy='12' r='1.2' fill='currentColor' />
      </svg>
    );
  }

  if (type === 'automation') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.5' />
        <path
          d='M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
        />
      </svg>
    );
  }

  if (type === 'infrastructure') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path
          d='M7 17a4 4 0 0 1 .4-7.98A5.5 5.5 0 0 1 18 10.5 3.5 3.5 0 0 1 17 17H7z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  if (type === 'testing') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path
          d='M9 3h6M10 3v6.2L6.5 18.5A2.2 2.2 0 0 0 8.5 21.5h7a2.2 2.2 0 0 0 2-3L14 9.2V3'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  if (type === 'pipeline') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path
          d='M4 7h5l3 5 3-5h5'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M4 17h16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
        <path d='M12 12v5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      </svg>
    );
  }

  if (type === 'caching') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <path
          d='M13 3 5.5 13.5H12l-1 7.5L18.5 10.5H12L13 3z'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
      </svg>
    );
  }

  if (type === 'seo') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <circle cx='11' cy='11' r='6' stroke='currentColor' strokeWidth='1.5' />
        <path d='M16 16l4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
      </svg>
    );
  }

  if (type === 'asset') {
    return (
      <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
        <rect x='3' y='5' width='18' height='14' rx='1.5' stroke='currentColor' strokeWidth='1.5' />
        <path
          d='M3 15.5 8 11l4 3.5 3-2.5 6 5'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinejoin='round'
        />
        <circle cx='9' cy='9' r='1.5' fill='currentColor' />
      </svg>
    );
  }

  return (
    <svg viewBox='0 0 24 24' fill='none' className={common} aria-hidden>
      <circle cx='12' cy='12' r='7' stroke='currentColor' strokeWidth='1.5' />
    </svg>
  );
};
