import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import { TProjectStatus } from '@/data/projects/DB_projects_site';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { getProjectBySlug } from '@/utils/getProjectBySlug';

const STATUS_COLOR: Record<TProjectStatus, string> = {
  LIVE: '#22c55e',
  WIP: '#f59e0b',
  ARCHIVED: '#888',
};

const DETAIL_SECTION_LABELS: { key: 'problem' | 'solution' | 'architecture'; label: string }[] = [
  { key: 'problem', label: 'Problem' },
  { key: 'solution', label: 'Solution' },
  { key: 'architecture', label: 'Architecture' },
];

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  const project = slug ? getProjectBySlug(slug) : undefined;

  const bg = cn(
    'min-h-screen w-full',
    isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]',
  );

  if (!project) {
    return (
      <div className={cn(bg, 'flex items-center justify-center')}>
        <div className='text-center flex flex-col items-center gap-4'>
          <p className={cn('text-7xl font-black', isDark ? 'text-white/10' : 'text-black/8')}>404</p>
          <p className={cn('text-sm', isDark ? 'text-white/50' : 'text-black/50')}>
            프로젝트를 찾을 수 없어요.
          </p>
          <Link to='/projects' className='text-sm font-semibold underline' style={{ color: pt }}>
            ← 전체 프로젝트 보기
          </Link>
        </div>
      </div>
    );
  }

  const { title, tagline, summary, tags, status, links, detail } = project;

  return (
    <div className={bg}>
      <main className='max-w-[860px] mx-auto px-6 py-16'>

        {/* Breadcrumb */}
        <nav aria-label='breadcrumb' className='mb-10'>
          <Link
            to='/projects'
            className={cn(
              'text-sm transition-colors',
              isDark ? 'text-white/40 hover:text-white/75' : 'text-black/35 hover:text-black/65',
            )}
          >
            ← All Projects
          </Link>
        </nav>

        {/* Hero */}
        <header className='mb-14 flex flex-col gap-4'>
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className='text-4xl md:text-5xl font-black tracking-tight leading-tight'
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className={cn('text-lg', isDark ? 'text-white/60' : 'text-black/55')}
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
                  className='text-xs font-semibold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-85'
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
                    'text-xs font-semibold px-4 py-2 rounded-lg border transition-all',
                    isDark ? 'border-white/20 hover:border-white/40 text-white/70' : 'border-black/15 hover:border-black/30 text-black/60',
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
                    'text-xs font-semibold px-4 py-2 rounded-lg border transition-all',
                    isDark ? 'border-white/20 hover:border-white/40 text-white/70' : 'border-black/15 hover:border-black/30 text-black/60',
                  )}
                >
                  Notion ↗
                </a>
              )}
            </motion.div>
          )}

          {/* Tags */}
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
        </header>

        <div className={cn('w-full h-px mb-14', isDark ? 'bg-white/10' : 'bg-black/8')} />

        {/* Summary */}
        <motion.section
          id='summary'
          className='mb-14 scroll-mt-20'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <p className={cn('text-base leading-relaxed', isDark ? 'text-white/70' : 'text-black/65')}>
            {summary}
          </p>
        </motion.section>

        {/* Problem / Solution / Architecture */}
        {DETAIL_SECTION_LABELS.map(({ key, label }, i) => {
          const content = detail?.[key];
          if (!content) return null;
          return (
            <motion.section
              key={key}
              id={key}
              className='mb-14 flex flex-col gap-4 scroll-mt-20'
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className='flex items-center gap-3'>
                <span
                  className='text-xs font-black tracking-[0.2em] uppercase'
                  style={{ color: pt }}
                >
                  {label}
                </span>
                <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/8')} />
              </div>
              <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/60' : 'text-black/55')}>
                {content}
              </p>
            </motion.section>
          );
        })}

      </main>

      <footer
        className={cn(
          'text-center py-8 text-xs border-t',
          isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30',
        )}
      >
        <Link
          to='/projects'
          className={cn('transition-colors', isDark ? 'hover:text-white/60' : 'hover:text-black/50')}
        >
          ← All Projects
        </Link>
      </footer>
    </div>
  );
};

export default ProjectDetailPage;
