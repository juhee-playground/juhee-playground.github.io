import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import { PROJECTS_SITE, TProjectStatus } from '@/data/projects/DB_projects_site';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const STATUS_COLOR: Record<TProjectStatus, string> = {
  LIVE: '#22c55e',
  WIP: '#f59e0b',
  ARCHIVED: '#888',
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const ProjectsPage = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  return (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>
      <main className='max-w-[900px] mx-auto px-6 py-16'>

        {/* Breadcrumb */}
        <nav aria-label='breadcrumb' className='mb-10'>
          <Link
            to='/site'
            className={cn(
              'text-sm transition-colors',
              isDark ? 'text-white/40 hover:text-white/75' : 'text-black/35 hover:text-black/65',
            )}
          >
            ← Site로 돌아가기
          </Link>
        </nav>

        {/* Page Header */}
        <header className='mb-12'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-4xl font-black tracking-tight mb-3'
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn('text-sm', isDark ? 'text-white/50' : 'text-black/50')}
          >
            지금까지 설계하고 만들어온 프로젝트들입니다.
          </motion.p>
        </header>

        {/* Grid */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
          variants={container}
          initial='hidden'
          animate='show'
        >
          {PROJECTS_SITE.map(({ slug, title, tagline, tags, status, links }) => (
            <motion.article
              key={slug}
              variants={cardVariant}
              className={cn(
                'group flex flex-col gap-4 p-6 rounded-2xl border transition-all duration-300',
                isDark
                  ? 'bg-white/3 border-white/10 hover:border-white/25 hover:bg-white/5'
                  : 'bg-white border-black/7 hover:border-black/20 hover:shadow-lg',
                'hover:-translate-y-1',
              )}
            >
              {/* Title + Status */}
              <div className='flex items-start justify-between gap-3'>
                <h2 className='text-sm font-black tracking-widest leading-tight'>{title}</h2>
                <span
                  className='shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded text-white'
                  style={{ backgroundColor: STATUS_COLOR[status] }}
                >
                  {status}
                </span>
              </div>

              {/* Tagline */}
              <p className={cn('text-sm leading-relaxed flex-1', isDark ? 'text-white/55' : 'text-black/55')}>
                {tagline}
              </p>

              {/* Tags */}
              <div className='flex flex-wrap gap-1'>
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
              </div>

              {/* Actions */}
              <div
                className={cn('flex items-center gap-2 pt-2 border-t flex-wrap')}
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
              >
                <Link
                  to={`/projects/${slug}`}
                  className='text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-85'
                  style={{ backgroundColor: pt }}
                >
                  Case Study →
                </Link>
                {links?.live && (
                  <a
                    href={links.live}
                    target='_blank'
                    rel='noreferrer'
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
                      isDark
                        ? 'border-white/20 hover:border-white/40 text-white/70'
                        : 'border-black/15 hover:border-black/30 text-black/60',
                    )}
                  >
                    Live ↗
                  </a>
                )}
                {links?.repo && (
                  <a
                    href={links.repo}
                    target='_blank'
                    rel='noreferrer'
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
                      isDark
                        ? 'border-white/20 hover:border-white/40 text-white/70'
                        : 'border-black/15 hover:border-black/30 text-black/60',
                    )}
                  >
                    Repo ↗
                  </a>
                )}
                {links?.notion && (
                  <a
                    href={links.notion}
                    target='_blank'
                    rel='noreferrer'
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all',
                      isDark
                        ? 'border-white/20 hover:border-white/40 text-white/70'
                        : 'border-black/15 hover:border-black/30 text-black/60',
                    )}
                  >
                    Notion ↗
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

      </main>

      <footer
        className={cn(
          'text-center py-8 text-xs border-t',
          isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30',
        )}
      >
        © 2025 BAEK JU HEE
      </footer>
    </div>
  );
};

export default ProjectsPage;
