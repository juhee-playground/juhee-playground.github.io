import { useTheme } from '@mui/material/styles';

import SiteContact from '@/components/site/SiteContact';
import SiteExperiencePreview from '@/components/site/SiteExperiencePreview';
import SiteHero from '@/components/site/SiteHero';
import SiteOverview from '@/components/site/SiteOverview';
import SiteSection from '@/components/site/SiteSection';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

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
          className='min-h-[80vh] flex flex-col justify-center py-20 gap-10 scroll-mt-10'
        >
          <SiteHero onScrollToProjects={scrollToProjects} />
          <SiteOverview />
        </section>

        {/* ─── #projects ─── */}
        <SiteSection id='projects' title='Projects'>
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
                    : 'bg-white border-black/7 hover:border-black/20',
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
        <SiteSection id='experience' title='Experience'>
          <SiteExperiencePreview />
        </SiteSection>

        {/* ─── #stats ─── */}
        <SiteSection id='stats' title='Stats'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className={cn(
                  'rounded-2xl p-6 flex flex-col gap-1',
                  isDark ? 'bg-white/5' : 'bg-white border border-black/7',
                )}
              >
                <span className='text-4xl font-black' style={{ color: pt }}>{value}</span>
                <span className={cn('text-xs font-semibold', isDark ? 'text-white/50' : 'text-black/45')}>{label}</span>
              </div>
            ))}
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
