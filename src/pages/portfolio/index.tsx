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
import { getGameBoyPalette } from '@/components/portfolio/gameboyPalette';
import PROJECT_DATA from '@/data/DB_project.json';
import useCompaniesQuery from '@/hooks/queries/useCompaniesQuery';
import useProjectsQuery from '@/hooks/queries/useProjectsQuery';
import { parseProjectData } from '@/utils/parser';

const DB_PROJECT = (PROJECT_DATA as IProjectProperties[]).map(p => parseProjectData(p));

const PortfolioPage = () => {
  const isDark = useTheme().palette.mode === 'dark';
  const gb = getGameBoyPalette(isDark);
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
    <div className='min-h-screen w-full' style={{ backgroundColor: gb.bg, color: gb.text }}>
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
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = `5px 5px 0 ${gb.accent}`;
                  e.currentTarget.style.borderColor = gb.accent;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = `3px 3px 0 ${gb.border}`;
                  e.currentTarget.style.borderColor = gb.border;
                }}
                className='group flex flex-col gap-4 p-5 transition-all duration-150'
                style={{
                  backgroundColor: gb.panel,
                  border: `2px solid ${gb.border}`,
                  borderRadius: 4,
                  boxShadow: `3px 3px 0 ${gb.border}`,
                }}
              >
                <div className='flex-1 flex flex-col gap-2'>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='pixel-font text-[10px] tracking-wider' style={{ color: gb.text }}>
                      {project.name}
                    </span>
                    <span className='text-xs font-semibold' style={{ color: gb.textDim }}>
                      {project.period}
                    </span>
                  </div>
                  <p className='text-sm leading-relaxed' style={{ color: gb.textDim }}>
                    <span>참여인원: </span>
                    <span className='font-semibold' style={{ color: gb.text }}>
                      {typeof project.numberOfParticipants === 'number' && project.numberOfParticipants > 0
                        ? `${project.numberOfParticipants}`
                        : '-'}
                    </span>
                    <span> | 역할: </span>
                    <span className='font-semibold' style={{ color: gb.text }}>{project.role || '-'}</span>
                  </p>
                  <p className='text-sm leading-relaxed' style={{ color: gb.text }}>
                    {project.summary || project.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mt-1 [&_.dChip__label]:pixel-font [&_.dChip__label]:text-[8px]'>
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
                      className='pixel-font text-[8px] transition-transform group-hover:translate-x-1 shrink-0'
                      style={{ color: gb.accent }}
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
              className='pixel-font text-[8px] transition-transform hover:translate-x-1'
              style={{ color: gb.accent }}
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
                className='relative overflow-hidden p-5 flex flex-col gap-2 items-center text-center'
                style={{
                  backgroundColor: gb.lcd,
                  color: gb.lcdInk,
                  border: `2px solid ${gb.border}`,
                  borderRadius: 4,
                }}
              >
                <div className='scanlines absolute inset-0 opacity-20' />
                <span className='pixel-font text-lg relative z-10'>{value}</span>
                <span className='text-[11px] font-semibold relative z-10'>{label}</span>
              </motion.div>
            ))}
          </div>

          {/* Dashboard link */}
          <div className='flex justify-end mt-2'>
            <Link
              to='/dashboard'
              className='pixel-font text-[8px] transition-transform hover:translate-x-1'
              style={{ color: gb.accent }}
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
        className='mt-12 px-2 py-4 flex flex-col gap-6'
        style={{ borderTop: `2px solid ${gb.border}`, color: gb.textDim }}
      >
        {/* 사이트맵 */}
        <nav className='flex gap-6 pixel-font text-[8px]'>
          {[
            { to: '/portfolio', label: 'PORTFOLIO' },
            { to: '/resume',    label: 'RESUME' },
            { to: '/dashboard', label: 'DASHBOARD' },
            { to: '/projects',  label: 'PROJECTS' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className='transition-transform hover:translate-x-0.5'
              style={{ color: gb.textDim }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 카피라이트 + GameBoy Easter egg */}
        <div className='flex items-center justify-between text-xs'>
          <span style={{ color: gb.textDim }}>
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
