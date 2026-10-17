import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { getGameBoyPalette } from '@/components/portfolio/gameboyPalette';
import { ProjectCartridge } from '@/components/portfolio/ProjectCartridge';
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
import { parseProjectData } from '@/utils/parser';

const DB_PROJECT = (PROJECT_DATA as IProjectProperties[]).map(p => parseProjectData(p));

const PortfolioPage = () => {
  const { pointColor, shellStyle } = useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);
  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const projects = (projectQuery.data ?? DB_PROJECT).slice(0, 3);
  const companies = (companyQuery.data ?? []).filter(company => company.type === 'C');
  const companyNameById = Object.fromEntries(companies.map(company => [company.id, company.name]));
  const projectsForStats = projectQuery.data ?? [];

  const projectCount = projectsForStats.length;
  const techStackCount = new Set(
    projectsForStats.flatMap(project => project.techStackOptions.map(stack => stack.name)),
  ).size;
  // 커리어 연차 — 공백 구간이 있어 재직 합산보다 체감 연차(6+)를 사용
  const CAREER_YEARS = 6;

  const stats = [
    { value: `${CAREER_YEARS}+`, label: 'Years Experience' },
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
          <div className='flex flex-col gap-5'>
            {projects.map((project, i) => (
              <motion.div
                key={project.id || project.slug || project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <ProjectCartridge
                  project={project}
                  index={i}
                  companyName={companyNameById[project.companyId]}
                />
              </motion.div>
            ))}
          </div>

          {/* View all link */}
          <div className='flex justify-end mt-2'>
            <Link
              to='/projects'
              className='pixel-font text-[8px] transition-transform hover:translate-x-1'
              style={{ color: gb.accentText }}
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
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className='flex flex-col items-center gap-1.5 text-center'
              >
                <span className='pixel-font text-2xl' style={{ color: gb.accentText }}>
                  {value}
                </span>
                <span className='text-avatar font-medium' style={{ color: gb.textDim }}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Dashboard link */}
          <div className='flex justify-end mt-2'>
            <Link
              to='/dashboard'
              className='pixel-font text-[8px] transition-transform hover:translate-x-1'
              style={{ color: gb.accentText }}
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
