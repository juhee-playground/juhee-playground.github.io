import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import SiteHero from '@/components/site/SiteHero';
import SiteOverview from '@/components/site/SiteOverview';
import SiteSection from '@/components/site/SiteSection';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

type TSection = 'overview' | 'projects' | 'experience' | 'stats' | 'contact';

const NAV_ITEMS: { id: TSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stats', label: 'Stats' },
  { id: 'contact', label: 'Contact' },
];

const PROJECTS = [
  {
    title: 'JUHEE PLAYGROUND',
    desc: '채용 플랫폼에 종속되지 않는 개인 이력서 포트폴리오. GameBoy UI 인터랙션, 다크모드, 프린트 PDF 변환 지원.',
    tags: ['React', 'TypeScript', 'Tailwind', 'D3', 'Zustand'],
    status: 'LIVE' as const,
    link: 'https://juhee-playground.github.io',
  },
  {
    title: 'OHCOACH ULTIMATE',
    desc: '웨어러블 EPTS 기반 스포츠 데이터 시각화 플랫폼. 전문가용 대시보드 및 다국어 지원.',
    tags: ['Vue', 'D3', 'SCSS', 'NodeJS'],
    status: 'SHIPPED' as const,
    link: 'https://dino100.notion.site/OHCOACH-Ultimate-fd838cf131fc4d718d2b4d89e7d42dd8',
  },
  {
    title: 'ERP SYSTEM',
    desc: '운영·자문·펀딩 플랫폼 내 ERP 어드민. 재사용 가능한 UI 컴포넌트 시스템 구축.',
    tags: ['React', 'PHP', 'MySQL'],
    status: 'SHIPPED' as const,
    link: '#',
  },
];

const EXPERIENCE = [
  {
    company: '틴들로 (Tindlo)',
    role: 'Frontend Developer',
    period: '2025.02 — Present',
    desc: '프론트엔드 시스템 설계 및 개발.',
    current: true,
  },
  {
    company: '프리랜서',
    role: 'Frontend Developer',
    period: '2023.07 — 2023.10',
    desc: '단기 프로젝트 및 컨설팅.',
    current: false,
  },
  {
    company: '핏투게더 (Fitogether)',
    role: 'Frontend Developer',
    period: '2018.07 — 2022.11',
    desc: '스포츠 데이터 시각화 SaaS 플랫폼 개발. 1인 → 10인 이상 팀으로 성장하는 초기 스타트업 경험.',
    current: false,
  },
  {
    company: '와이유파트너스 (YU Partners)',
    role: 'Web Developer',
    period: '2017.03 — 2018.02',
    desc: '운영·자문·펀딩 플랫폼 개발.',
    current: false,
  },
];

const STATS = [
  { value: '5+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '4', label: 'Companies' },
  { value: '3+', label: 'Tech Stacks' },
];

const SitePage = () => {
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const [activeSection, setActiveSection] = useState<TSection>('overview');
  const sectionRefs = useRef<Record<TSection, HTMLElement | null>>({
    overview: null,
    projects: null,
    experience: null,
    stats: null,
    contact: null,
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: TSection) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  const pt = pointColor.hex;

  return (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>

      {/* ─── Sticky section nav ─── */}
      <nav
        className={cn(
          'sticky top-0 z-30 flex justify-center gap-1 py-2 border-b text-sm',
          isDark ? 'bg-[#181717]/90 border-white/10' : 'bg-[#fafafa]/90 border-black/10',
          'backdrop-blur-sm',
        )}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={cn(
              'px-3 py-1 rounded-full transition-all text-xs font-semibold',
              activeSection === id
                ? 'text-white'
                : isDark
                  ? 'text-white/50 hover:text-white/80'
                  : 'text-black/40 hover:text-black/70',
            )}
            style={activeSection === id ? { backgroundColor: pt } : {}}
          >
            {label}
          </button>
        ))}
      </nav>

      <main className='max-w-[860px] mx-auto px-6 pb-24'>

        {/* ─── #overview ─── */}
        <section
          id='overview'
          ref={el => { sectionRefs.current.overview = el; }}
          className='min-h-[80vh] flex flex-col justify-center py-20 gap-10'
        >
          <SiteHero onScrollToProjects={() => scrollTo('projects')} />
          <SiteOverview />
        </section>

        {/* ─── #projects ─── */}
        <SiteSection id='projects' title='Projects' sectionRef={el => { sectionRefs.current.projects = el; }}>
          <div className='flex flex-col gap-4'>
            {PROJECTS.map(({ title, desc, tags, status, link }) => (
              <a
                key={title}
                href={link}
                target='_blank'
                rel='noreferrer'
                className={cn(
                  'group flex flex-col md:flex-row md:items-start gap-4 p-5 rounded-2xl border transition-all',
                  isDark
                    ? 'bg-white/3 border-white/10 hover:border-white/25'
                    : 'bg-white border-black/[0.07] hover:border-black/20',
                  'hover:-translate-y-0.5',
                )}
              >
                <div className='flex-1 flex flex-col gap-2'>
                  <div className='flex items-center gap-2'>
                    <span className='text-xs font-black tracking-widest'>{title}</span>
                    <span
                      className='text-[9px] font-bold px-1.5 py-0.5 rounded text-white'
                      style={{ backgroundColor: status === 'LIVE' ? pt : '#888' }}
                    >
                      {status}
                    </span>
                  </div>
                  <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/55' : 'text-black/55')}>{desc}</p>
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
                    'text-lg transition-transform group-hover:translate-x-1 mt-0.5',
                    isDark ? 'text-white/30' : 'text-black/25',
                  )}
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </SiteSection>

        {/* ─── #experience ─── */}
        <SiteSection id='experience' title='Experience' sectionRef={el => { sectionRefs.current.experience = el; }}>
          <ol className='relative flex flex-col gap-0'>
            {EXPERIENCE.map(({ company, role, period, desc, current }, i) => (
              <li key={company} className='flex gap-5'>
                {/* Timeline line */}
                <div className='flex flex-col items-center'>
                  <div
                    className='w-3 h-3 rounded-full mt-1 shrink-0 ring-2'
                    style={{
                      backgroundColor: current ? pt : 'transparent',
                      border: `2px solid ${pt}`,
                    }}
                  />
                  {i < EXPERIENCE.length - 1 && (
                    <div className={cn('w-px flex-1 my-1', isDark ? 'bg-white/10' : 'bg-black/10')} />
                  )}
                </div>

                <div className='pb-10 flex flex-col gap-1'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <span className='font-bold text-sm'>{company}</span>
                    {current && (
                      <span className='text-[9px] font-bold px-1.5 py-0.5 rounded text-white' style={{ backgroundColor: pt }}>
                        NOW
                      </span>
                    )}
                  </div>
                  <p className={cn('text-xs font-semibold', isDark ? 'text-white/50' : 'text-black/45')}>
                    {role} · {period}
                  </p>
                  <p className={cn('text-sm leading-relaxed mt-1', isDark ? 'text-white/55' : 'text-black/55')}>{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </SiteSection>

        {/* ─── #stats ─── */}
        <SiteSection id='stats' title='Stats' sectionRef={el => { sectionRefs.current.stats = el; }}>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className={cn(
                  'rounded-2xl p-6 flex flex-col gap-1',
                  isDark ? 'bg-white/5' : 'bg-white border border-black/[0.07]',
                )}
              >
                <span className='text-4xl font-black' style={{ color: pt }}>{value}</span>
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/50' : 'text-black/45')}>{label}</span>
              </div>
            ))}
          </div>
        </SiteSection>

        {/* ─── #contact ─── */}
        <SiteSection id='contact' title='Contact' sectionRef={el => { sectionRefs.current.contact = el; }}>
          <div
            className={cn(
              'rounded-2xl p-8 flex flex-col gap-6',
              isDark ? 'bg-white/5' : 'bg-white border border-black/[0.07]',
            )}
          >
            <p className={cn('text-sm leading-relaxed', isDark ? 'text-white/60' : 'text-black/55')}>
              새로운 기회나 협업에 열려 있습니다. 언제든지 연락주세요.
            </p>
            <div className='flex flex-col gap-3'>
              {[
                { label: 'Email', value: 'gogumangoguma@gmail.com', href: 'mailto:gogumangoguma@gmail.com' },
                { label: 'GitHub', value: 'github.com/juhee-playground', href: 'https://github.com/juhee-playground' },
                { label: 'Portfolio', value: 'juhee-playground.github.io', href: 'https://juhee-playground.github.io' },
              ].map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noreferrer'
                  className={cn(
                    'flex items-center justify-between p-4 rounded-xl transition-colors group',
                    isDark ? 'hover:bg-white/5' : 'hover:bg-black/3',
                  )}
                >
                  <div className='flex flex-col gap-0.5'>
                    <span className='text-[10px] font-bold tracking-widest uppercase' style={{ color: pt }}>{label}</span>
                    <span className={cn('text-sm', isDark ? 'text-white/80' : 'text-black/70')}>{value}</span>
                  </div>
                  <span className={cn('transition-transform group-hover:translate-x-1', isDark ? 'text-white/30' : 'text-black/25')}>→</span>
                </a>
              ))}
            </div>
          </div>
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
