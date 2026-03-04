import { motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

import { TProject, TProjectStatus } from '@/data/projects/DB_projects_site';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface IProjectHeroProps {
  project: TProject;
}

const STATUS_COLOR: Record<TProjectStatus, string> = {
  LIVE: '#22c55e',
  WIP: '#f59e0b',
  ARCHIVED: '#888',
};

const ProjectHero = ({ project }: IProjectHeroProps) => {
  const { title, tagline, summary, tags, status, links } = project;
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  return (
    <header className='mb-14 flex flex-col gap-4'>
      {/* Status */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span
          className='text-[10px] font-bold px-2 py-0.5 rounded text-white'
          style={{ backgroundColor: STATUS_COLOR[status] }}
        >
          {status}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.06 }}
        className='text-4xl md:text-5xl font-black tracking-tight leading-tight'
      >
        {title}
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className={cn('text-lg leading-snug', isDark ? 'text-white/60' : 'text-black/55')}
      >
        {tagline}
      </motion.p>

      {/* Links */}
      {links && Object.keys(links).length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className='flex gap-2 flex-wrap'
        >
          {links.live && (
            <a
              href={links.live}
              target='_blank'
              rel='noreferrer'
              className='text-xs font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-80'
              style={{ backgroundColor: pt }}
            >
              Live ↗
            </a>
          )}
          {links.repo && (
            <a
              href={links.repo}
              target='_blank'
              rel='noreferrer'
              className={cn(
                'text-xs font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80',
                isDark ? 'border-white/20 text-white/70' : 'border-black/15 text-black/60',
              )}
            >
              Repo ↗
            </a>
          )}
          {links.notion && (
            <a
              href={links.notion}
              target='_blank'
              rel='noreferrer'
              className={cn(
                'text-xs font-semibold px-4 py-2 rounded-lg border transition-all hover:opacity-80',
                isDark ? 'border-white/20 text-white/70' : 'border-black/15 text-black/60',
              )}
            >
              Notion ↗
            </a>
          )}
        </motion.div>
      )}

      {/* Tech stack tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.26 }}
        className='flex flex-wrap gap-1'
      >
        {tags.map(tag => (
          <span
            key={tag}
            className={cn(
              'text-[10px] px-2 py-0.5 rounded-full font-semibold',
              isDark ? 'bg-white/10 text-white/70' : 'bg-black/6 text-black/60',
            )}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Divider */}
      <div className={cn('w-full h-px mt-4', isDark ? 'bg-white/10' : 'bg-black/8')} />

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.32 }}
        className={cn('text-base leading-relaxed', isDark ? 'text-white/70' : 'text-black/65')}
      >
        {summary}
      </motion.p>
    </header>
  );
};

export default ProjectHero;
