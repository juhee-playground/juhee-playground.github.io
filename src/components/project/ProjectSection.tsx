import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface IProjectSectionProps {
  children: ReactNode;
  delay?: number;
  id: string;
  label: string;
}

const ProjectSection = ({ children, delay = 0, id, label }: IProjectSectionProps) => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';

  return (
    <motion.section
      id={id}
      className='mb-14 flex flex-col gap-5 scroll-mt-16'
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className='flex items-center gap-3'>
        <span
          className='text-xs font-black tracking-[0.2em] uppercase shrink-0'
          style={{ color: pointColor.hex }}
        >
          {label}
        </span>
        <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/8')} />
      </div>
      {children}
    </motion.section>
  );
};

export default ProjectSection;
