import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { useSettings } from '@/stores/useSettings';

import { getGameBoyPalette } from './gameboyPalette';

interface ISiteSectionProps {
  children: ReactNode;
  id: string;
  title?: string;
  onTitleClick?: () => void;
}

const SiteSection = ({ children, id, title, onTitleClick }: ISiteSectionProps) => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);

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
          {onTitleClick ? (
            <button
              type='button'
              tabIndex={-1}
              aria-hidden='true'
              className='m-0 flex cursor-default items-center gap-3 appearance-none border-0 bg-transparent p-0 font-[inherit] text-inherit'
              onClick={onTitleClick}
            >
              <span className='animate-blink text-sm leading-none' style={{ color: gb.accentText }}>
                ▶
              </span>
              <span
                className='pixel-font text-avatar tracking-[0.15em] uppercase'
                style={{ color: gb.text }}
              >
                {title}
              </span>
            </button>
          ) : (
            <>
              <span className='animate-blink text-sm leading-none' style={{ color: gb.accentText }}>
                ▶
              </span>
              <span
                className='pixel-font text-avatar tracking-[0.15em] uppercase'
                style={{ color: gb.text }}
              >
                {title}
              </span>
            </>
          )}
          <div className='flex-1 h-0.5 rounded-sm' style={{ backgroundColor: gb.border }} />
        </motion.div>
      )}
      {children}
    </section>
  );
};

export default SiteSection;
