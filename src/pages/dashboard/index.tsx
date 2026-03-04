import { useState } from 'react';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import PhpDarkIcon from '@/assets/icon/PHP-Dark.svg';
import PhpLightIcon from '@/assets/icon/PHP-Light.svg';
import ReactDarkIcon from '@/assets/icon/React-Dark.svg';
import ReactLightIcon from '@/assets/icon/React-Light.svg';
import VueDarkIcon from '@/assets/icon/VueJS-Dark.svg';
import VueLightIcon from '@/assets/icon/VueJS-Light.svg';

import PieChart from '@/components/chart/pie/d3Pie';
import TimelineChart from '@/components/chart/TimelineChart';
import CardV2 from '@/components/common/CardVersion2';
import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

const STACK_COLORS = {
  vue: 'hsl(153.5, 40%, 70%)',
  react: 'hsl(188.98, 60%, 70%)',
  php: 'hsl(235.93, 35%, 70%)',
};

// 회사 프로젝트 기술 카운트 (base, 아이콘은 컴포넌트 내부에서 테마에 따라 결정)
const COMPANY_TECH_BASE = [
  { name: 'React', count: 3 },
  { name: 'Vue',   count: 5 },
  { name: 'Php',   count: 2 },
];

// 사이드 프로젝트에서 추가되는 기술 카운트
const SIDE_TECH_ADDITIONS: Record<string, number> = {
  React: 2, // juhee-playground, ohcoach
  Vue: 1,   // erp-system
};

// 회사 타임라인 (프리랜서 제외)
const COMPANY_TASKS: ITask[] = [
  { name: 'YU파트너스', startDate: '2017-05-02', endDate: '2018-02-28', color: STACK_COLORS.php },
  { name: 'Fitogether',  startDate: '2018-07-01', endDate: '2022-11-30', color: STACK_COLORS.vue },
  { name: '틴들로',       startDate: '2025-02-03', endDate: dayjs().format('YYYY-MM-DD'), color: STACK_COLORS.react },
];


export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isGameMode = (location.state as { gameMode?: boolean } | null)?.gameMode === true;
  const isDark = useTheme().palette.mode === 'dark';
  const { pointColor } = useSettings();
  const [showSideProjects, setShowSideProjects] = useState(false);

  const techIcons: Record<string, string> = {
    React: isDark ? ReactDarkIcon : ReactLightIcon,
    Vue:   isDark ? VueDarkIcon   : VueLightIcon,
    Php:   isDark ? PhpDarkIcon   : PhpLightIcon,
  };

  const techData = (showSideProjects
    ? COMPANY_TECH_BASE.map(t => ({ ...t, count: t.count + (SIDE_TECH_ADDITIONS[t.name] ?? 0) }))
    : COMPANY_TECH_BASE
  ).map(t => ({ ...t, image: techIcons[t.name] }));

  const total = techData.reduce((s, t) => s + t.count, 0);
  const pct = (name: string) => Math.round((techData.find(t => t.name === name)?.count ?? 0) / total * 100);
  const pieData = [
    { id: 'Vue',   label: 'Vue',   value: pct('Vue'),   color: STACK_COLORS.vue },
    { id: 'React', label: 'React', value: pct('React'), color: STACK_COLORS.react },
    { id: 'PHP',   label: 'PHP',   value: pct('Php'),   color: STACK_COLORS.php },
  ];

  // 타임라인은 항상 회사만 표시 (토글 영향 없음)
  const timelineTasks = COMPANY_TASKS;

  const articleClass = cn(
    'flex flex-col gap-5 p-6 rounded-2xl border',
    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/7',
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className='flex items-center gap-3'>
      <span className={cn('text-xs font-black tracking-widest uppercase shrink-0', isDark ? 'text-white/40' : 'text-black/40')}>
        {title}
      </span>
      <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/8')} />
    </div>
  );

  const ToggleButton = ({ gameMode = false }: { gameMode?: boolean }) =>
    gameMode ? (
      <button
        onClick={() => setShowSideProjects(prev => !prev)}
        className={cn(
          'pixel-font text-[8px] px-2 py-0.5 border transition-colors',
          showSideProjects
            ? 'bg-[#2d321d] text-[#d9f99d] border-[#2d321d]'
            : 'border-[#2d321d]/50 text-[#2d321d]/60 hover:border-[#2d321d]',
        )}
      >
        {showSideProjects ? '✓ SIDE ON' : '+ SIDE'}
      </button>
    ) : (
      <button
        onClick={() => setShowSideProjects(prev => !prev)}
        className={cn(
          'flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200',
          showSideProjects
            ? 'text-white border-transparent'
            : isDark
              ? 'border-white/20 text-white/45 hover:border-white/40 hover:text-white/65'
              : 'border-black/15 text-black/40 hover:border-black/30 hover:text-black/60',
        )}
        style={showSideProjects ? { backgroundColor: pointColor.hex } : {}}
      >
        <span className='text-[11px] leading-none'>{showSideProjects ? '✓' : '+'}</span>
        사이드 프로젝트 포함
      </button>
    );

  const classicContent = (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>
      <main className='max-w-[1000px] mx-auto px-6 py-12 flex flex-col gap-6'>

        {/* 토글 버튼 */}
        <div className='flex justify-end'>
          <ToggleButton />
        </div>

        {/* Row 1: PROJECTS + COMPANYS */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <article className={articleClass}>
            <SectionHeader title='PROJECTS' />
            <ul className='flex flex-wrap gap-4'>
              {techData.map(t => (
                <li key={t.name}>
                  <CardV2 image={t.image} name={t.name} count={t.count} />
                </li>
              ))}
            </ul>
          </article>
          <article className={articleClass}>
            <SectionHeader title='COMPANYS' />
            <ul className='flex flex-wrap gap-4'>
              <li><CardV2 name='Fitogether' count={4} unit='year' /></li>
              <li><CardV2 name='YU 파트너스' count={1} unit='year' /></li>
              <li><CardV2 name='틴들로' count={1} unit='year' /></li>
            </ul>
          </article>
        </div>

        {/* Row 2: TECH USAGE + TIMELINE */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <article className={articleClass}>
            <SectionHeader title='MAIN TECH USAGE' />
            <PieChart data={pieData} width={410} height={280} />
          </article>
          <article className={articleClass}>
            <SectionHeader title='COMPANYS TIMELINE' />
            <TimelineChart tasks={timelineTasks} height={300} isDark={isDark} />
          </article>
        </div>

      </main>
    </div>
  );

  if (!isGameMode) return classicContent;

  return (
    <motion.div
      layoutId='game-screen'
      className='min-h-screen w-full bg-[#d9f99d] text-[#2d321d] flex flex-col'
    >
      {/* 8-bit 상단 헤더 바 */}
      <div className='pixel-font border-b-2 border-[#2d321d]/30 px-6 py-3 flex items-center justify-between shrink-0'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => navigate('/')}
            className='text-[10px] font-bold border border-[#2d321d] px-3 py-1 hover:bg-[#2d321d] hover:text-[#d9f99d] transition-colors'
          >
            ← BACK
          </button>
          <span className='text-[11px] font-bold tracking-widest'>CAREER.LOG</span>
        </div>
        <div className='flex items-center gap-3 text-[9px]'>
          <ToggleButton gameMode />
          <span className='opacity-60 animate-pulse'>●</span>
          <span className='opacity-60'>JUHEE-OS v2.0</span>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className='flex-1 p-6 flex flex-col gap-6'>
        <section className='w-full flex flex-wrap gap-4 items-start'>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ PROJECTS ]</h3>
            <ul className='flex flex-wrap gap-6'>
              {techData.map(t => (
                <li key={t.name}><CardV2 image={t.image} name={t.name} count={t.count} /></li>
              ))}
            </ul>
          </article>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ COMPANIES ]</h3>
            <ul className='flex flex-wrap gap-6'>
              <li><CardV2 name='Fitogether' count={4} unit='year' /></li>
              <li><CardV2 name='YU 파트너스' count={1} unit='year' /></li>
              <li><CardV2 name='틴들로' count={1} unit='year' /></li>
            </ul>
          </article>
        </section>

        <section className='w-full flex flex-wrap gap-4 items-start'>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ STACK USAGE ]</h3>
            <PieChart data={pieData} width={410} height={280} />
          </article>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ COMPANYS TIMELINE ]</h3>
            <TimelineChart tasks={timelineTasks} height={300} />
          </article>
        </section>
      </div>
    </motion.div>
  );
}
