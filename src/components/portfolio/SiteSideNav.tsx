import { useEffect, useState } from 'react';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

import { getGameBoyPalette } from './gameboyPalette';

type TSection = 'overview' | 'projects' | 'experience' | 'stats' | 'contact';

const NAV_ITEMS: { id: TSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stats', label: 'Stats' },
  { id: 'contact', label: 'Contact' },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const SiteSideNav = () => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);
  const [active, setActive] = useState<TSection>('overview');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id as TSection);
        },
        { threshold: 0.25 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav
      aria-label='Site sections'
      className='hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40'
    >
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className='flex items-center gap-2.5 text-left group transition-all'
        >
          <span
            className={cn(
              'w-1.5 h-1.5 shrink-0 transition-all duration-200',
              active === id ? 'scale-125' : 'scale-100',
            )}
            style={{ backgroundColor: active === id ? gb.accent : gb.border }}
          />
          <span
            className='pixel-font text-[7px] tracking-wide transition-all duration-200'
            style={{ color: active === id ? gb.accentText : gb.textDim }}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default SiteSideNav;
