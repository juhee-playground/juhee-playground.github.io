import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import DChip from '@/components/custom/DChip';
import SiteContact from '@/components/portfolio/SiteContact';
import SiteExperiencePreview from '@/components/portfolio/SiteExperiencePreview';
import SiteHero from '@/components/portfolio/SiteHero';
import SiteOverview from '@/components/portfolio/SiteOverview';
import SiteSection from '@/components/portfolio/SiteSection';
import SiteSideNav from '@/components/portfolio/SiteSideNav';
import PROJECT_DATA from '@/data/DB_project.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';
import { parseProjectData } from '@/utils/parser';

const DB_PROJECT = (PROJECT_DATA as IProjectProperties[]).map(p => parseProjectData(p));

const PortfolioPage = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;
  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const projects = (projectQuery.data ?? DB_PROJECT).slice(0, 3);
  const companies = (companyQuery.data ?? []).filter(company => company.type === 'C');
  const projectsForStats = projectQuery.data ?? [];

  const projectCount = projectsForStats.length;
  const techStackCount = new Set(
    projectsForStats.flatMap(project => project.techStackOptions.map(stack => stack.name)),
  ).size;
  const startDates = companies
    .map(company => ({
      start: company.startDate,
      end: company.endDate ?? dayjs().format('YYYY-MM-DD'),
    }))
    .filter(period => Boolean(period.start));

  const totalWorkedMonths = startDates.reduce((acc, period) => {
    const start = dayjs(period.start);
    const end = dayjs(period.end);
    if (!start.isValid() || !end.isValid() || end.isBefore(start)) return acc;
    return acc + end.diff(start, 'month');
  }, 0);

  const yearsExperience = Math.floor(totalWorkedMonths / 12);

  const stats = [
    { value: `${Math.max(0, yearsExperience)}+`, label: 'Years Experience' },
    { value: `${projectCount}`, label: 'Projects Shipped' },
    { value: `${companies.length}`, label: 'Companies' },
    { value: `${techStackCount}+`, label: 'Tech Stacks' },
  ];

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>
      <SiteSideNav />
      <main className='max-w-[860px] mx-auto px-6 pb-24'>

        {/* ─── #overview ─── */}
        <section
          id='overview'
          className='min-h-[80vh] flex flex-col justify-center py-20 gap-10 scroll-mt-14'
        >
          <SiteHero onScrollToProjects={scrollToProjects} />
          <SiteOverview />
        </section>

        {/* ─── #projects ─── */}
        <SiteSection id='projects' title='Projects'>
          <div className='flex flex-col gap-4'>
            {projects.map((project, i) => (
              <motion.article
                key={project.id || project.slug || project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={cn(
                  'group flex flex-col gap-4 p-5 rounded-2xl border transition-all duration-300',
                  isDark
                    ? 'bg-white/3 border-white/10 hover:border-white/25 hover:bg-white/5'
                    : 'bg-white border-black/7 hover:border-black/20 hover:shadow-md',
                  'hover:-translate-y-0.5',
                )}
              >
                <div className='flex-1 flex flex-col gap-2'>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-xs font-black tracking-widest'>{project.name}</span>
                    <span className={cn('text-xs font-semibold', isDark ? 'text-white/50' : 'text-black/45')}>
                      {project.period}
                    </span>
                  </div>
                  <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/55' : 'text-black/55')}>
                    <span>참여인원: </span>
                    <span className='font-semibold'>
                      {typeof project.numberOfParticipants === 'number' && project.numberOfParticipants > 0
                        ? `${project.numberOfParticipants}`
                        : '-'}
                    </span>
                    <span> | 역할: </span>
                    <span className='font-semibold'>{project.role || '-'}</span>
                  </p>
                  <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/70' : 'text-black/70')}>
                    {project.summary || project.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {project.techStackOptions.slice(0, 6).map(stack => (
                      <DChip
                        key={`${project.id}_${stack.id}`}
                        size='small'
                        color={stack.color}
                        label={stack.name}
                        clickable={false}
                      />
                    ))}
                  </div>
                  <div className='flex justify-end mt-1'>
                    <Link
                      to={`/projects/${project.slug}`}
                      className={cn(
                        'text-sm font-semibold transition-transform group-hover:translate-x-1 shrink-0',
                        isDark ? 'text-white/45 hover:text-white/80' : 'text-black/40 hover:text-black/70',
                      )}
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>
              </motion.article>
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
            {stats.map(({ value, label }, i) => (
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
          'border-t mt-12 px-2 py-4 flex flex-col gap-6',
          isDark ? 'border-white/10 text-white/30' : 'border-black/10 text-black/30',
        )}
      >
        {/* 사이트맵 */}
        <nav className='flex gap-6 text-sm font-medium'>
          {[
            { to: '/portfolio', label: 'Portfolio' },
            { to: '/resume',    label: 'Resume' },
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/projects',  label: 'Projects' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'transition-colors',
                isDark ? 'text-white/35 hover:text-white/60' : 'text-black/35 hover:text-black/60',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 카피라이트 + GameBoy Easter egg */}
        <div className='flex items-center justify-between text-xs'>
          <span className={isDark ? 'text-white/40' : 'text-black/40'}>
            © 2025 BAEK JU HEE · Built with React + TypeScript
          </span>
          <Link to='/' title='GameBoy ver.' className='text-base transition-transform hover:scale-110'>
            🎮
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;
