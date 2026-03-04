import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import PhpIcon from '@/assets/icon/PHP-Dark.svg';
import ReactIcon from '@/assets/icon/React.svg';
import VueIcon from '@/assets/icon/Vue.svg';

import PieChart from '@/components/chart/pie/d3Pie';
import TimelineChart from '@/components/chart/TimelineChart';
import CardV2 from '@/components/common/CardVersion2';
import { cn } from '@/utils/classNames';

const stackData = [
  { id: 'Vue', label: 'Vue', value: 50, color: 'hsl(153.5, 40%, 70%)' },
  { id: 'React', label: 'React', value: 30, color: 'hsl(188.98, 60%, 70%)' },
  { id: 'PHP', label: 'PHP', value: 20, color: 'hsl(235.93, 35%, 70%)' },
];

// 회사별 메인 스택 색상 — stackData 색상과 일치
const TECH_COLORS = {
  vue: stackData[0].color,    // hsl(153.5, 40%, 70%)  녹색
  react: stackData[1].color,  // hsl(188.98, 60%, 70%) 청록
  php: stackData[2].color,    // hsl(235.93, 35%, 70%) 파랑
};

const tasks: ITask[] = [
  {
    name: 'YU파트너스',
    startDate: dayjs('2017-05-02').format('YYYY-MM-DD'),
    endDate: dayjs('2018-02-28').format('YYYY-MM-DD'),
    color: TECH_COLORS.php,     // 메인 스택: PHP
  },
  {
    name: 'Fitogether',
    startDate: dayjs('2018-07-01').format('YYYY-MM-DD'),
    endDate: dayjs('2022-11-30').format('YYYY-MM-DD'),
    color: TECH_COLORS.vue,     // 메인 스택: Vue
  },
  {
    name: '프리랜서',
    startDate: dayjs('2023-07-03').format('YYYY-MM-DD'),
    endDate: dayjs('2023-10-13').format('YYYY-MM-DD'),
    color: TECH_COLORS.react,   // 메인 스택: React
  },
  {
    name: '틴들로',
    startDate: dayjs('2025-02-03').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'), // 현재 재직 중 → 오늘 날짜
    color: TECH_COLORS.react,   // 메인 스택: React
  },
];

export default function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isGameMode = (location.state as { gameMode?: boolean } | null)?.gameMode === true;
  const isDark = useTheme().palette.mode === 'dark';

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

  const classicContent = (
    <div className={cn('min-h-screen w-full', isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]')}>
      <main className='max-w-[1000px] mx-auto px-6 py-12 flex flex-col gap-6'>

        {/* Row 1: PROJECTS + COMPANYS */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <article className={articleClass}>
            <SectionHeader title='PROJECTS' />
            <ul className='flex flex-wrap gap-4'>
              <li><CardV2 image={ReactIcon} name='React' count={3} /></li>
              <li><CardV2 image={VueIcon} name='Vue' count={5} /></li>
              <li><CardV2 image={PhpIcon} name='Php' count={2} /></li>
            </ul>
          </article>
          <article className={articleClass}>
            <SectionHeader title='COMPANYS' />
            <ul className='flex flex-wrap gap-4'>
              <li><CardV2 name='Fitogether' count={4} unit='year' /></li>
              <li><CardV2 name='YU 파트너스' count={1} unit='year' /></li>
              <li><CardV2 name='프리랜서' count={1} unit='year' /></li>
              <li><CardV2 name='틴들로' count={1} unit='year' /></li>
            </ul>
          </article>
        </div>

        {/* Row 2: TECH USAGE + COMPANYS TIMELINE */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <article className={articleClass}>
            <SectionHeader title='MAIN TECH USAGE' />
            <div className='overflow-x-auto'>
              <PieChart data={stackData} width={410} height={280} />
            </div>
          </article>
          <article className={articleClass}>
            <SectionHeader title='COMPANYS TIMELINE' />
            <TimelineChart tasks={tasks} height={300} isDark={isDark} />
          </article>
        </div>

      </main>
    </div>
  );

  if (!isGameMode) return classicContent;

  return (
    <motion.div
      layoutId="game-screen"
      className="min-h-screen w-full bg-[#d9f99d] text-[#2d321d] flex flex-col"
    >
      {/* 8-bit 상단 헤더 바 */}
      <div className="pixel-font border-b-2 border-[#2d321d]/30 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-[10px] font-bold border border-[#2d321d] px-3 py-1 hover:bg-[#2d321d] hover:text-[#d9f99d] transition-colors"
          >
            ← BACK
          </button>
          <span className="text-[11px] font-bold tracking-widest">CAREER.LOG</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] opacity-60">
          <span className="animate-pulse">●</span>
          <span>JUHEE-OS v2.0</span>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 p-6 flex flex-col gap-6">
        <section className='w-full flex flex-wrap gap-4 items-start'>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ PROJECTS ]</h3>
            <ul className='flex flex-wrap gap-6'>
              <li><CardV2 image={ReactIcon} name='React' count={3} /></li>
              <li><CardV2 image={VueIcon} name='Vue' count={5} /></li>
              <li><CardV2 image={PhpIcon} name='Php' count={2} /></li>
            </ul>
          </article>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ COMPANIES ]</h3>
            <ul className='flex flex-wrap gap-6'>
              <li><CardV2 name='Fitogether' count={4} unit='year' /></li>
              <li><CardV2 name='YU 파트너스' count={1} unit='year' /></li>
              <li><CardV2 name='프리랜서' count={1} unit='year' /></li>
              <li><CardV2 name='틴들로' count={1} unit='year' /></li>
            </ul>
          </article>
        </section>

        <section className='w-full flex flex-wrap gap-4 items-start'>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ STACK USAGE ]</h3>
            <PieChart data={stackData} width={410} height={280} />
          </article>
          <article className='flex flex-col items-start p-5 px-6 border border-[#2d321d]/30 bg-[#d9f99d]'>
            <h3 className='pixel-font mb-6 text-sm text-[#2d321d] tracking-widest'>[ COMPANYS TIMELINE ]</h3>
            <TimelineChart tasks={tasks} height={300} />
          </article>
        </section>
      </div>
    </motion.div>
  );
}
