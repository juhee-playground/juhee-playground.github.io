import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface ISiteSectionProps {
  children: ReactNode;
  id: string;
  title?: string;
}

const SiteSection = ({ children, id, title }: ISiteSectionProps) => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <section
      id={id}
      className='py-20 flex flex-col gap-8 scroll-mt-14'
    >
      {title && (
        <motion.div
          className='flex items-center gap-3'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.4 }}
        >
          <span
            className='text-xs font-black tracking-[0.2em] uppercase'
            style={{ color: pointColor.hex }}
          >
            {title}
          </span>
          <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/10')} />
        </motion.div>
      )}
      {children}
    </section>
  );
};

export default SiteSection;
