import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import SiteContact from '@/components/site/SiteContact';
import SiteExperiencePreview from '@/components/site/SiteExperiencePreview';
import SiteHero from '@/components/site/SiteHero';
import SiteOverview from '@/components/site/SiteOverview';
import SiteSection from '@/components/site/SiteSection';
import { PROJECTS_SITE, TProjectStatus } from '@/data/projects/DB_projects_site';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const STATUS_COLOR: Record<TProjectStatus, string> = {
  LIVE: '#22c55e',
  WIP: '#f59e0b',
  ARCHIVED: '#888',
};

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '4', label: 'Companies' },
  { value: '3+', label: 'Tech Stacks' },
];

const SitePage = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>
      <main className='max-w-[860px] mx-auto px-6 pb-24'>

        {/* ─── #overview ─── */}
        <section
          id='overview'
          className='min-h-[80vh] flex flex-col justify-center py-20 gap-10 scroll-mt-20'
        >
          <SiteHero onScrollToProjects={scrollToProjects} />
          <SiteOverview />
        </section>

        {/* ─── #projects ─── */}
        <SiteSection id='projects' title='Projects'>
          <div className='flex flex-col gap-4'>
            {PROJECTS_SITE.map(({ slug, title, tagline, tags, status, links }, i) => (
              <motion.a
                key={slug}
                href={links?.live ?? links?.notion ?? '#'}
                target={links?.live || links?.notion ? '_blank' : undefined}
                rel='noreferrer'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={cn(
                  'group flex flex-col md:flex-row md:items-start gap-4 p-5 rounded-2xl border transition-all duration-300',
                  isDark
                    ? 'bg-white/3 border-white/10 hover:border-white/25 hover:bg-white/5'
                    : 'bg-white border-black/7 hover:border-black/20 hover:shadow-md',
                  'hover:-translate-y-0.5',
                )}
              >
                <div className='flex-1 flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs font-black tracking-widest'>{title}</span>
                    <span
                      className='text-[9px] font-bold px-1.5 py-0.5 rounded text-white'
                      style={{ backgroundColor: STATUS_COLOR[status] }}
                    >
                      {status}
                    </span>
                  </div>
                  <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/55' : 'text-black/55')}>
                    {tagline}
                  </p>
                  <div className='flex flex-wrap gap-1 mt-1'>
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
                </div>
                <span
                  className={cn(
                    'text-lg transition-transform group-hover:translate-x-1 mt-0.5 shrink-0',
                    isDark ? 'text-white/30' : 'text-black/25',
                  )}
                >
                  →
                </span>
              </motion.a>
            ))}
          </div>

          {/* View all link */}
          <div className='flex justify-end mt-2'>
            <Link
              to='/projects'
              className={cn(
                'text-sm font-semibold transition-colors',
                isDark ? 'text-white/45 hover:text-white/80' : 'text-black/40 hover:text-black/70',
              )}
            >
              View all projects →
            </Link>
          </div>
        </SiteSection>

        {/* ─── #experience ─── */}
        <SiteSection id='experience' title='Experience'>
          <SiteExperiencePreview />
        </SiteSection>

        {/* ─── #stats ─── */}
        <SiteSection id='stats' title='Stats'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={cn(
                  'rounded-2xl p-6 flex flex-col gap-1',
                  isDark ? 'bg-white/5' : 'bg-white border border-black/7',
                )}
              >
                <span className='text-4xl font-black' style={{ color: pt }}>{value}</span>
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/50' : 'text-black/45')}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Dashboard link */}
          <div className='flex justify-end mt-2'>
            <Link
              to='/dashboard'
              className={cn(
                'text-sm font-semibold transition-colors',
                isDark ? 'text-white/45 hover:text-white/80' : 'text-black/40 hover:text-black/70',
              )}
            >
              대시보드 전체 보기 →
            </Link>
          </div>
        </SiteSection>

        {/* ─── #contact ─── */}
        <SiteSection id='contact' title='Contact'>
          <SiteContact />
        </SiteSection>

      </main>

      <footer
        className={cn(
          'text-center py-8 text-xs border-t',
          isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30',
        )}
      >
        © 2025 BAEK JU HEE · Built with React + TypeScript
      </footer>
    </div>
  );
};

export default SitePage;
