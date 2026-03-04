import { ReactNode, RefCallback } from 'react';

import { useTheme } from '@mui/material/styles';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface ISiteSectionProps {
  children: ReactNode;
  id: string;
  sectionRef?: RefCallback<HTMLElement>;
  title?: string;
}

const SiteSection = ({ children, id, sectionRef, title }: ISiteSectionProps) => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <section
      id={id}
      ref={sectionRef}
      className='py-20 flex flex-col gap-8'
    >
      {title && (
        <div className='flex items-center gap-3'>
          <span
            className='text-xs font-black tracking-[0.2em] uppercase'
            style={{ color: pointColor.hex }}
          >
            {title}
          </span>
          <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/10')} />
        </div>
      )}
      {children}
    </section>
  );
};

export default SiteSection;
