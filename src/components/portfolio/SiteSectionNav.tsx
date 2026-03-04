import { useEffect, useState } from 'react';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

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

const SiteSectionNav = () => {
  const { pointColor, themeMode } = useSettings();
  const isDark = themeMode === 'dark';
  const [active, setActive] = useState<TSection>('overview');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav
      aria-label='Site sections'
      className={cn(
        'flex items-center overflow-x-auto scrollbar-none gap-0.5 px-1',
        '[-webkit-overflow-scrolling:touch]',
      )}
    >
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={cn(
            'shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all',
            active === id
              ? 'text-white'
              : isDark
                ? 'text-white/45 hover:text-white/75'
                : 'text-black/40 hover:text-black/65',
          )}
          style={active === id ? { backgroundColor: pointColor.hex } : {}}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default SiteSectionNav;
