import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';


import { Project } from '@/data/projects/DB_projects_site';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface IProjectHeroProps {
  project: Project;
}

const ProjectHero = ({ project }: IProjectHeroProps) => {
  const { name, period, summary, url } = project;
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  return (
    <header className='mb-14 flex flex-col gap-4'>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className='text-4xl md:text-5xl font-black tracking-tight leading-tight'
      >
        {name}
      </motion.h1>

      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className='flex gap-2 flex-wrap'
        >
          <a
            href={url}
            target='_blank'
            rel='noreferrer'
            className='text-xs font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-80'
            style={{ backgroundColor: pt }}
          >
            Open ↗
          </a>
        </motion.div>
      )}

      <p className={cn('text-sm font-semibold', isDark ? 'text-white/55' : 'text-black/50')}>
        {period}
      </p>

      <div className={cn('w-full h-px mt-4', isDark ? 'bg-white/10' : 'bg-black/8')} />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className={cn('text-base leading-relaxed whitespace-pre-line', isDark ? 'text-white/70' : 'text-black/65')}
      >
        {summary}
      </motion.p>
    </header>
  );
};

export default ProjectHero;
