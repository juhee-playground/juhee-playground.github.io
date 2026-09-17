import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

import { useSettings } from '@/stores/useSettings';
import { getGameBoyPalette } from './gameboyPalette';

interface ISiteSectionProps {
  children: ReactNode;
  id: string;
  title?: string;
}

const SiteSection = ({ children, id, title }: ISiteSectionProps) => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const gb = getGameBoyPalette(isDark, pointColor.hex);

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
          <span className='animate-blink text-sm leading-none' style={{ color: gb.accent }}>
            ▶
          </span>
          <span
            className='pixel-font text-[11px] tracking-[0.15em] uppercase'
            style={{ color: gb.text }}
          >
            {title}
          </span>
          <div className='flex-1 h-[2px] rounded-[4px]' style={{ backgroundColor: gb.border }} />
        </motion.div>
      )}
      {children}
    </section>
  );
};

export default SiteSection;
