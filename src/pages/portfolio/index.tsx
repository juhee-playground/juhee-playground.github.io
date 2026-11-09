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
import useProjectsQuery, { useFeaturedProjectsQuery } from '@/hooks/queries/useProjectsQuery';
import { useSettings } from '@/stores/useSettings';
import { getCareerYears } from '@/utils/getCareerYears';
import { getFeaturedProjects } from '@/utils/getFeaturedProjects';
import { parseProjectData } from '@/utils/parser';

const DB_PROJECT = (PROJECT_DATA as IProjectProperties[]).map(p => parseProjectData(p));
const DB_FEATURED_PROJECTS = getFeaturedProjects(DB_PROJECT);

const PROJECT_CARD_STAGGER = 0.08;
const STATS_CARD_STAGGER = 0.07;

const PortfolioPage = () => {
  const { pointColor, shellStyle, toggleContactVisible, showSideProjects, toggleSideProjects } =
    useSettings();
  const gb = getGameBoyPalette(shellStyle, pointColor.hex);
  const companyQuery = useCompaniesQuery();
  const projectQuery = useProjectsQuery();
  const featuredQuery = useFeaturedProjectsQuery();
  const projects = featuredQuery.data ?? DB_FEATURED_PROJECTS;
  const allCompanies = companyQuery.data ?? [];
  const companyNameById = Object.fromEntries(
    allCompanies.map(company => [company.id, company.name]),
  );
  const sideCompanyIds = new Set(
    allCompanies.filter(company => company.type === 'T').map(company => company.id),
  );
  const companies = allCompanies.filter(company => company.type === 'C');
  const careerCompanies = showSideProjects
    ? allCompanies.filter(company => company.type === 'C' || company.type === 'T')
    : companies;
  // isVisible와 무관하게 전체 프로젝트 수 집계. SIDE OFF면 사이드 회사 프로젝트만 제외.
  const projectsForStats = (projectQuery.data ?? DB_PROJECT).filter(
    project => showSideProjects || !sideCompanyIds.has(project.companyId),
  );

  const projectCount = projectsForStats.length;
  const techStackCount = new Set(
    projectsForStats.flatMap(project => project.techStackOptions.map(stack => stack.name)),
  ).size;
  const careerYears = getCareerYears(careerCompanies);

  const stats = [
    { value: `${careerYears}+`, label: 'Years Experience' },
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
          <div className='flex flex-col items-center gap-5'>
            {projects.map((project, i) => (
              <motion.div
                key={project.id || project.slug || project.name}
                className='w-full'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * PROJECT_CARD_STAGGER }}
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
          <div className='flex flex-col gap-5'>
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={toggleSideProjects}
                className='pixel-font rounded-[3px] border-2 px-2 py-1 text-[8px] tracking-wider transition-colors'
                style={
                  showSideProjects
                    ? {
                        backgroundColor: gb.accentText,
                        color: gb.bg,
                        borderColor: gb.accentText,
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: gb.textDim,
                        borderColor: gb.border,
                      }
                }
              >
                {showSideProjects ? '✓ SIDE' : '+ SIDE'}
              </button>
            </div>

            <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={`${label}_${showSideProjects ? 'side' : 'company'}`}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * STATS_CARD_STAGGER }}
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
          </div>
        </SiteSection>

        {/* ─── #contact ─── */}
        <SiteSection id='contact' title='Contact' onTitleClick={toggleContactVisible}>
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
            { to: '/resume', label: 'RESUME' },
            { to: '/projects', label: 'PROJECTS' },
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
